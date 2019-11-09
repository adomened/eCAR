const mongoose = require('mongoose');
const Travel = require('../models/Travel');
const Vehicles = require('../models/Vehicles');
const Query = require('../models/Query');
const User = require('../models/User');
const { validationResult } = require('express-validator/check');
const geocode = require('../controllers/geocode');
const viajesIniciales = require('../models/travels.json');
const queries = require('../models/queries.json');

/**
* Covierte de grados a radianes
*/
const degreesToRadians = function (degrees) {
  return degrees * Math.PI / 180;
}

/**
* Calcula la distancia entre dos puntos de coordenadas
*/
const distanceInKmBetweenEarthCoordinates = function (lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2-lat1);
  var dLon = degreesToRadians(lon2-lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return earthRadiusKm * c;
}

/**
* Poblar la base de datos; Coleccion travels
*/
const loopTravel = async function (res) {
    for (let t=0; t<viajesIniciales.length; t++) {
      await new Travel({
        usuario: viajesIniciales[t].usuario,
        vehiculo: viajesIniciales[t].vehiculo,
        fechaInicio: viajesIniciales[t].fechaInicio,
        fechaFinal: viajesIniciales[t].fechaFinal,
        estado: viajesIniciales[t].estado,
        localizacionGeoInicio: viajesIniciales[t].localizacionGeoInicio,
        localizacionGeoFinal: viajesIniciales[t].localizacionGeoFinal,
        importe: viajesIniciales[t].importe,
        distanciaRecorrida: viajesIniciales[t].distanciaRecorrida,
      }).save();
    }
    return res.status(200).json({ success: true, msg: 'Exito al poblar la base de datos; recarge la pagina (pulse F5).' });
}

/**
* Poblar la base de datos; Coleccion queries
*/
const loopQueries = async function (res) {
  for (let q=0; q<queries.length; q++) {
    await new Query({
      titulo: queries[q].titulo,
      children: queries[q].children,
      cerrada: queries[q].cerrada,
      usuario: queries[q].usuario,
    }).save();
  }
  return res.status(200).json({ success: true, msg: 'Exito al poblar la base de datos; recarge la pagina (pulse F5).' });
};

/**
 * POST /pay-travel
 * Se cambia el estado a pagado en la instancia del modelo Travel
 */
exports.payTravel = function (req, res) {
  var query = { idPublic: req.body.id };
  Travel.update(query, { 'importe.estado': true }, function(err, travel){
    if (err) {
      return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
    }
    res.json({success: true, msg: 'Exito en la operacion'})
  });
}

/**
 * POST /close-query
 * Cerramos la consulta; se entiende que resuelta satisfactoriamente ya que es cliente/usuario quien la cierra
 */
exports.closeQuery = function (req, res, next) {
  Query
    .updateOne({ usuario: req.user.nickname, titulo: req.body.titulo }, { enTramite: false, cerrada: true })
    .exec((err, query) => {
      if (err)
        return res.status(500).json({success: false, msg: 'Se ha producido un problema al acceder a la consulta en la BBDD'});
      if (!query)
        return res.json({ success: false, msg: 'No existe ninguna consulta con los parametros pasados' });
      res.json({success: true, msg: 'La consulta se ha cerrado con exito'});
    });
}

/**
 * POST /new-interaction
 * Recupera el usuario (ej. indalo) en req.user.nickname; donde/where el titulo de la consulta coincida.
 * Crea una nueva entrada en el array Interaction
 */
exports.newInteraction = function (req, res, next) {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Query
    .findOne({usuario: req.user.nickname})
    .where('titulo').equals(req.body.titulo)
    .where('enTramite').equals(false)
    .where('cerrada').equals(false)
    .exec((err, query) => {
      if (err)
        return res.status(500).json({success: false, msg: 'Se ha producido un problema al acceder a la consulta en la BBDD'});
      if (!query)
        return res.json({ success: false, msg: 'Esta consulta esta en el tramite de ser respondida' });
      query.enTramite = true;
      query.children.push({ mensajeIN: req.body.contenido, fechaIN: Date.now() });
      query.save(function (err) {
        if (err) return res.json({success: false, msg: 'Se ha producido un problema al guardar la consulta en la BBDD'});
        res.json({success: true, msg: 'Se ha registrado su nuevo mensaje con exito <<Sugerencia: maximo de 48h para su respuesta>>'});
      });
    });
}

/**
 * POST /new-query
 * Crea una nueva consulta con un elemento en array children del schema Interaction
 */
exports.newQuery = function (req, res, next) {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // then(callback resolve, callback reject)
  const checkTitleQuery = () =>
    Query
      .find({usuario: req.user.nickname})
      .where('titulo').equals(req.body.titulo)
      .then(query => {
        if (query.length)
          return Promise.reject({ toClient: true, msg: 'Error al crear la consulta. Ya exite un consulta con este mismo asunto' });
      });

  const createQuery = () => {
    const newQ = new Query({
      titulo: req.body.titulo,
      etiqueta: req.body.label,
      usuario: req.user.nickname,
      enTramite: true
    });
    newQ.children = [{}]
    newQ.children[0].mensajeIN = req.body.contenido
    newQ.children[0].fechaIN = Date.now()
    newQ.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Se ha producido un problema al guardar la consulta en la BBDD'});
      }
      res.json({success: true, msg: 'Se ha registrado su consulta con exito. <<Sugerencia: maximo de 48h para su respuesta>>'});
    });
  }

  checkTitleQuery()
    .then(createQuery)
    .catch(function(error){
      if (error.toClient) return res.status(500).json({ success: false, msg: error.msg });
      next(error);
    });
}

/**
 * GET /profile/queries
 * Recuperar los consultas efectuadas por un usuario en concreto
 */
exports.queries = function (req, res, next) {
  Query
    .find({usuario: req.user.nickname})
    .exec((err, queries) => {
      if (err) return console.error(err);
      if (queries.length === 0) return res.status(200).json({ success:false, msg: 'no hay resultados disponibles.' });
      if (queries && queries.length) {
        return res.status(200).json({ success: true, queries: queries });
      }
      // loopQueries(res); // Una vez poblada la BBDD podemos comentar la llamada a la funcion
    });
};

/**
 * POST /profile/start-travel
 * Comprueba que no exista un viaje iniciado
 */
exports.bypassViajeIniciado = function (req, res, next) {
  Travel
    .findOne({usuario: req.user.nickname})
    .where('estado').equals('iniciado')
    .exec((err, travel) => {
      if (err) return next(err);
      if (travel === null) return next();
      return res.status(500).json({ success:true, msg: 'Ya hay un viaje en curso' });
    });
}

/**
 * GET /vehicle
 * Recupera el vehiculo del cliente si existe o la reserva no expiró
 */
exports.vehicle = function(req, res, next) {
  User
    .findById(req.user._id)
    .populate('reservaActiva')
    .exec(function(err, user){
      if (err) {
        next(err)
      }
      if (!user.reservaActiva || user.reservaActiva.disponible) {
        user.reservaActiva = undefined;
        user.save();
        return res.json({
          success: false,
          msg: `La reserva activa expiró o se efectuó la devolución del vehiculo.`
        });
      }

      let vehicle = {
        tipo: user.reservaActiva.tipo,
        reserva: user.reservaActiva.reserva,
        disponible: user.reservaActiva.disponible,
        marca: user.reservaActiva.marca,
        expiraReserva: user.reservaActiva.expiraReserva,
        numPlazas: user.reservaActiva.numPlazas,
        numPuertas: user.reservaActiva.numPlazas,
        capCarga: user.reservaActiva.capCarga,
        idPublic: user.reservaActiva.idPublic,
        autonomia: user.reservaActiva.autonomia,
        matricula: user.reservaActiva.matricula,
        localizacion: user.reservaActiva.localizacion,
        lat: user.reservaActiva.lat,
        long: user.reservaActiva.long
      }

      if(vehicle.reserva) {
        return res.json({
          success: true,
          msg: `Esta reserva expira en 30 minutos desde el momento que se inicia el tramite. No podrá iniciar ningun
          viaje hasta que recoja el vehiculo y nuestro personal refleje que el coche se encuentra en uso.`,
          vehicle: vehicle
        });
      } else {
        res.json({
          success: true,
          msg: `El vehiculo se encuentra en tu posesión y puedes realizar todos los viajes que precises hacer.`,
          vehicle: vehicle
        });
      }
    })
}

/**
 * POST /remove-travel
 * Borra un determinado (identificado por el atributo idPublic) viaje a peticion del usuario
 */
exports.removeTravel = function(req, res, next){
  Travel.deleteOne({ idPublic: req.body.id }, function(err){
    if(err) return next(err)
    res.json({ success: true, msg: 'Se ha borrado el viaje con exito' })
  })
}

/**
 * POST /subtract-favorite-travel
 * Modifica el atributo favorito a false
 */
exports.subtractFavoriteTravel = function(req, res, next){
  Travel.updateOne({ idPublic: req.body.id }, { favorito: false }, function(err, result){
    if(err) return next(err)
    res.json({ success: true, msg: 'Se ha quitado el viaje de favoritos' })
  })
}

/**
 * POST /add-favorite-travel
 * Modifica el atributo favorito a true
 */
exports.addfavoriteTravel = function(req, res, next){
  Travel.updateOne({ "idPublic": req.body.id, "importe.estado": true }, {  favorito: true }, function(err, result){
    if(err) return next(err)
    if(result.nModified) {
      res.json({ success: true, msg: 'Se ha añadido el viaje a favoritos' })
    } else {
      res.json({ success: false, msg: 'No se ha podido añadir el viaje a favoritos. Consejo: Un viaje debe estar en pagado para incluirlo en favoritos' })
    }
  })
}

/**
 * GET /profile/travels
 * Recuperar los viajes finalizados
 */
exports.travels = function (req, res, next) {
  Travel
    .find({usuario: req.user.nickname}, '-_id')
    .where('estado').equals('finalizado')
    .populate('vehiculo', '-_id idPublic')
    .exec((err, travels) => {

      if (err) return console.error(err);
      if (!travels.length) return res.status(200).json({ success:false, msg: 'no hay resultados disponibles.' });
      if (travels && travels.length) {

        return res.status(200).json({ success: true, travels: travels });
      }
      // loopTravel(res); // Una vez poblada la BBDD podemos comentar la llamada a la funcion
    });
}

/**
 * GET /profile/travel
 * Comprueba si hay un viaje en curso
 */
exports.travel = function (req, res, next) {
  Travel
    .findOne({usuario: req.user.nickname}, '-_id')
    .where('estado').equals('iniciado')
    .populate('vehiculo', '-_id idPublic')
    .exec((err, travel) => {
      if (err) return console.error(err);
      if (travel === null) return res.status(200).json({ success: false, msg: 'Ningún viaje iniciado' });
      return res.status(200).json({ success: true, msg: 'Hay un viaje en curso', travel: travel });
    });
}

/**
 * POST /profile/start-travel
 * Crear la instancia de Travel y registrar la primera coodenada y momento de inicio
 */
exports.startTravel = function(req, res, next){
  const buscarVehiculo = () => {
    return Vehicles
      .findOne({idPublic: req.body.vehiculo}, '_id')
      .exec()
  }

  const nuevoViaje = (vehicle) => {
    const newTravel = new Travel({
      vehiculo: vehicle._id,
      usuario: req.user.nickname,
      localizacionGeo: [[req.body.latitude, req.body.longitude]],
      idPublic: new mongoose.Types.ObjectId,
      fechaInicio: new Date(),
      estado: 'iniciado',
    });
    return newTravel.save();
  }

  buscarVehiculo()
    .then(nuevoViaje)
    .then(function(travel){
      res.json({success: true, msg: 'Viaje iniciado con exito', travel: travel});
    })
    .catch(function(error){
      next(error);
    });
}

/**
 * POST /profile/current-travel
 * Registra unas nuevas coordenadas en el viaje actual.
 */
exports.currentTravel = function(req, res, next){
  Travel
    .findOne({usuario:req.user.nickname})
    .populate('vehiculo', 'idPublic')
    .where('estado').equals('iniciado')
    .exec(function(err, travel){
      travel.localizacionGeo.push([req.body.latitude, req.body.longitude])
      travel.save(function(err, travel){
        if (err) {
          return next(err)
        }
        res.json({ success: true, msg: 'La coordenada se ha registrado de forma satisfactoria', travel: travel })
      })
    })
}

/**
 * GET /profile/finish-travel
 * Calcula el importe del viaje, la distancia recorrida y actualiza la estadistica de usuario.
 */
exports.finishTravel = function(req, res, next){
  Travel
    .findOne({usuario:req.user.nickname})
    .populate('vehiculo', 'clase')
    .where('estado').equals('iniciado')
    .exec(function(err, travel){
      let fechaFinal = new Date()
      let duracion = fechaFinal.getTime() - travel.fechaInicio.getTime()
      let diferencia_minutos = duracion / 60000;
      let total
      switch (travel.vehiculo.clase) {
        case 'Clase A':
          total = diferencia_minutos * 0.18
        case 'Clase S':
          total = diferencia_minutos * 0.22
        case 'Clase X':
          total = diferencia_minutos * 0.32
      }

      let distancia = 0, size = travel.localizacionGeo.length
      for(let i=0; i < size-1; i++){
        distancia += distanceInKmBetweenEarthCoordinates(travel.localizacionGeo[i][0],travel.localizacionGeo[i][1],travel.localizacionGeo[i+1][0],travel.localizacionGeo[i+1][1])
      }

      travel.distanciaRecorrida = distancia
      travel.fechaFinal = fechaFinal
      travel.estado = 'finalizado'
      travel.localizacionGeoFinal = {
        lat: travel.localizacionGeo[size-1][0],
        long: travel.localizacionGeo[size-1][1]
      }
      travel.localizacionGeoInicio = {
        lat: travel.localizacionGeo[0][0],
        long: travel.localizacionGeo[0][1]
      }
      travel.importe.cuantia = total
      travel.localizacionGeo = undefined

      // geocode.reverseGeocode({lat: req.body.latitude, long: req.body.longitude}, function(err, data){
      //   if(err) console.error(err);
      //   // console.log({coords: coords});
      //   return res.json({success: true, msg: 'El viaje se dá por finalizado', total: total, travel: travel, data: data});
      // })

      let promise = travel.save();

      // ┌─────────┬──────────────┬────────┬────────────────────┬────────────────────┐
      // │ (index) │     _id      │ viajes │     avgImporte     │   avgKilometros    │
      // ├─────────┼──────────────┼────────┼────────────────────┼────────────────────┤
      // │    0    │ 'alpha_cent' │   7    │ 50.253879619047616 │ 103.86758862444026 │
      // └─────────┴──────────────┴────────┴────────────────────┴────────────────────┘

      promise.then(function(travel){
        Travel.aggregate([
              {
                $match: {
                  usuario: req.user.nickname,
                }
              }, {
                  $group: {
                      _id: "$usuario",
                      viajes: { $sum: 1 },
                      avgImporte: { $avg: "$importe.cuantia" },
                      avgKilometros: { $avg: "$distanciaRecorrida" }
                    }
                }
          ]).exec(function(err,result){
            if (err) {
              console.error(err);
            }
            User.findByIdAndUpdate({ _id: req.user._id }, {
              "stats.travels": result[0].viajes,
              "stats.avgKilometres": result[0].avgKilometros,
              "stats.avgAmount": result[0].avgImporte
            }).exec();
          });

        return res.json({success: true, msg: 'El viaje se dá por finalizado', total: total, travel: travel});
      })
      .catch(function(err){
        return next(err)
      })
    })
}

/**
 * GET /profile/
 * Recuperar los datos del perfil de usuario.
 */
exports.root = (req, res) => {
  let usuario = {
    userName: req.user.profile.name,
    userGender: req.user.profile.gender,
    userEmail: req.user.email,
    userImage: req.user.gravatar(),
    userSurname: req.user.profile.surname,
    userDomicilio: req.user.profile.domicilio,
    planta: req.user.profile.planta,
    puerta: req.user.profile.puerta,
    userLocalidad: req.user.profile.localidad,
    userProvincia: req.user.profile.provincia,
    userCP: req.user.profile.cp,
    userNickname: req.user.nickname,
    userBirth: req.user.profile.birth,
    messagesIN: req.user.profile.messagesIN,
    messagesOUT: req.user.profile.messagesOUT,
    validado: req.user.validado,
    userStats: req.user.stats,
    enProcesoDeValidacion: req.user.enProcesoDeValidacion
  };
  res.status(200).json({success: true, user: usuario});
}

/**
 * POST /profile/update-password
 * Actualizar la actual contraseña.
 */
exports.updatePassword = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    return new Promise((resolve, reject) => {
      user.comparePassword(req.body.passActual, function (err, isMatch) {
        if (isMatch && !err) {
          user.password = req.body.passNuevo;
          resolve()
        } else {
          reject('Cambio de contraseña fallido. Contraseña actual incorrecta.');
        }
      })
    })
    .then(function () {
      return user.save();
    })
    .then(function() {
      res.json({success: true, msg: 'Su contraseña ha sido cambiada con exito.'});
    })
    .catch(function(err){
      res.status(500).json({success: false, msg: err});
    });
  })
}

/**
 * POST /profile/delete
 * Borra la cuenta del usuario.
 */
exports.delete = (req, res, next) => {
  User.findOne({ _id: req.user.id }, (err, user) => {
    if (err) { return next(err); }
    // logOut es un metodo que añade Passport (ej. la implementacion de la estrategia de facebook) al objeto req
    req.logout();
    user.remove(function (err, user) {
      if (err) {
        return next(err)
      }
      res.status(200).json({success: true, msg: 'Su cuenta ha sido borrada.'});
    })

  });
}

/**
 * POST /profile/update-user
 * Funcion/Endpoint/Router para guardar al usuario con sus datos completos
 */
exports.saveUser = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('log de req.body: ' + JSON.stringify(req.body));
    return res.status(422).json({ errors: errors.array() });
  }

  const saveUser = () =>
    User
      .findOne({ _id: req.user.id })
      .then((user) => {
        if (!user) {
          return res.json({success: false, msg: 'No se encuentra el usuario.' });
        }
        user.profile.gender = req.body.userGender;
        user.profile.surname = req.body.userSurname;
        user.profile.name = req.body.userName;
        user.profile.birth = new Date(req.body.userBirth);
        user.profile.localidad = req.body.userLocalidad;
        user.profile.domicilio = req.body.userDomicilio;
        user.profile.planta = req.body.planta;
        user.profile.puerta = req.body.puerta;
        user.profile.provincia = req.body.userProvincia;
        user.profile.cp = req.body.userCP;

        return user.save().then(() => new Promise((resolve, reject) => {
          req.logIn(user, (err) => { // logIn es un metodo que añade Passport (ej. facebook) a req (TODO REVISAR)
            if (err) { return reject(err); }
            resolve(user);
          });
        }));
      });

  saveUser()
    .then(() => { res.json({success: true, msg: 'El estado de su cuenta se ha actualizado con exito' }); })
    .catch(err => next(err));
}
