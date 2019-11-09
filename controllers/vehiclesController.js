const mongoose = require('mongoose');
const Vehicles = require('../models/Vehicles');
const User = require('../models/User');
const vehiculosIniciales = require('../models/vehicles.json');

/**
* Poblar la base de datos; Coleccion vehicles
*/
const seedingInitialData = function (req, res, next) {
  Vehicles.find(function(err, vehicles){
    if(err) return cosole.error(err);
    if(vehicles.length) return next();
    let v;
    for (v=0; v<vehiculosIniciales.length; v++) {
      new Vehicles({
        idPublic: vehiculosIniciales[v].idPublic,
        description: vehiculosIniciales[v].description,
        picture: vehiculosIniciales[v].picture,
        marca: vehiculosIniciales[v].marca,
        clase: vehiculosIniciales[v].clase,
        localizacion: vehiculosIniciales[v].localizacion,
        matricula: vehiculosIniciales[v].matricula,
        autonomia: vehiculosIniciales[v].autonomia,
        disponible: vehiculosIniciales[v].disponible,
        reserva: vehiculosIniciales[v].reserva,
        expiraReserva: vehiculosIniciales[v].expiraReserva,
        lat: vehiculosIniciales[v].lat,
        long: vehiculosIniciales[v].long,
        numPlazas: vehiculosIniciales[v].numPlazas,
        numPuertas: vehiculosIniciales[v].numPuertas,
        tipo: vehiculosIniciales[v].tipo,
        capCarga: vehiculosIniciales[v].capCarga,
        modificadoPor: vehiculosIniciales[v].modificadoPor.toLowerCase()
      }).save();
    }
    next();
  });
};

/**
 * POST /vehicles/reserve
 * Comprobar que el vehiculo se puede alquilar dado el estado del usuario y del vehiculo, a
 * continuacion, se cambia el estado de la instancia del modelo Vehicles
 */
exports.reserve = function(req, res, next) {
  let expireReserve = Date.now() + 1800000;
  const saveVehicle = (user) =>
    Vehicles
      .findOne({
        idPublic: req.body.idPublic,
        disponible: true,
        $or: [{ reserva: false }, { expiraReserva: { $lte: Date.now() } }]
       })
      .then((vehicle) => {
        if (!vehicle) {
          return Promise.reject({
            toClient: true,
            msg: 'El vehiculo no ha podido ser reservado. <<Sugerencia: escoja otro vehículo>>'
          })
        }
        vehicle.reserva = true;
        vehicle.disponible = false;
        vehicle.reservadoPor = req.user.nickname
        vehicle.expiraReserva = expireReserve;
        vehicle.save(function(err, vehicle){
          if(err) return console.log(err);
          console.log({vehicle});
        });
        user.updateOne({ reservaActiva: vehicle._id }).exec(function(err, user){
          if(err) return console.log(err);
          console.log({user});
        });
      });

  const userReserve = () =>
    User
      .findById(req.user._id)
      .where('reservaActiva').equals(undefined)
      .where('validado').equals(true)
      .then(user => {
        if (!user) {
          return Promise.reject({
            toClient: true,
            msg: 'Solo puede realizarse la reserva de un único vehiculo por usuario validado.'
          })
        } else {
          return Promise.resolve(user)
        }
      });

  userReserve()
    .then(saveVehicle)
    .then(() => {
      return res.json({success: true, msg: 'La reserva se ha realizado satisfactoriamente.'});
    })
    .catch(function(error){
      if (error.toClient) return res.status(500).json({ success: false, msg: error.msg });
      next(error);
    });
}

/**
 * POST /vehicles/get-vehicle/:id
 * Recupera una instancia del modelo Vehicles identificada por su id publico
 */
exports.getVehiclebyId = function(req, res, next) {
  Vehicles
    .findOne({idPublic: req.params.id}, '-_id -modificadoPor')
    .exec(function(err, vehicle){
      if(err) next(err)
      res.json({success: true, msg: 'La operación ha concluido con exito', vehicle: vehicle})
    })
}

/**
 * POST /vehicles/
 * Recupera una serie de vehiculos gracias a los campos facilitados por el usuario
 */
exports.root = function(req, res, next) {
  if (Object.keys(req.body).length >= 2) {
    let indicadorAutonomia = req.body.selectAutonomia, autonomia, query;
    delete req.body.selectAutonomia

    if (req.body.autonomia) {
      autonomia = req.body.autonomia
      delete req.body.autonomia
    }

    let filter = {...req.body}
    if (filter.marca) {
      filter.marca = new RegExp(`^${filter.marca}`,'i')
    }

    query = Vehicles.find(filter)
    if (autonomia) {
      switch (indicadorAutonomia) {
        case 'mayor a':
          console.log(indicadorAutonomia + ' mayor a');
          query.find({ autonomia: { $gte: autonomia }});
          break;
        case 'igual a':
          console.log(indicadorAutonomia + ' igual a');
          query.find({ autonomia: { $eq: autonomia }});
          break;
        default:
          console.log(indicadorAutonomia + ' menor a en default');
          query.find({ autonomia: { $lte: autonomia }});
      }
    }
    // query.select('-_id'); https://github.com/Automattic/mongoose/issues/3638 (No me deja 'save' sin _id presente)
    query.exec((err, vehicles) => {
      if (err) { return next(err); }
      if (!vehicles || vehicles.length === 0) {
        return res.json({success: false, msg: 'No existe ningun vehiculo con esas especificaciones', vehicles: [], noStandartOutput: []});
      }
      let arrVehicles = [], nsoutput = []
      for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].expiraReserva < Date.now()){
          vehicles[i].expiraReserva = undefined
          vehicles[i].disponible = true
          vehicles[i].reserva = false
          vehicles[i].reservadoPor = undefined
          nsoutput.push(vehicles[i].idPublic)
          vehicles[i].save()
        }
        arrVehicles.push({
          matricula: vehicles[i].matricula,
          idPublic: vehicles[i].idPublic,
          marca: vehicles[i].marca,
          localizacion: vehicles[i].localizacion,
          clase: vehicles[i].clase,
          autonomia: vehicles[i].autonomia,
          tipo: vehicles[i].tipo,
          disponible: vehicles[i].disponible,
          picture: vehicles[i].picture,
          reserva: vehicles[i].reserva
        })
      }

      res.json({success: true, msg: 'La busqueda ha sido satisfactoria', vehicles: arrVehicles, noStandartOutput: nsoutput});
    });
  } else {
    res.status(400).json({success: false, msg: 'Personalice su busqueda completando algun campo', vehicles: [], noStandartOutput: []});
  }

}
