const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const User = require("../models/User");
const Vehicles = require("../models/Vehicles");
const Travel = require("../models/Travel");
const Query = require("../models/Query");
const Statistic = require("../models/Statistic");
const vehiculosIniciales = require('../models/vehicles.json');
const statistics = require('../models/statistics.json');
const { validationResult } = require('express-validator/check');

/**
* Poblar la base de datos; Coleccion statistics
*/
const populateStatistics = function (req, res) {
    let newStatistic = new Statistic({
      altaUsuarios: statistics.altaUsuarios,
      bajaUsuarios: statistics.bajaUsuarios,
      activosUsuarios: statistics.activosUsuarios,
      validadosUsuarios: statistics.validadosUsuarios,
      reservasVehiculosCA: statistics.reservasVehiculosCA,
      reservasVehiculosCS: statistics.reservasVehiculosCS,
      reservasVehiculosCX: statistics.reservasVehiculosCX,
      reservasPVehiculosCA: statistics.reservasPVehiculosCA,
      reservasPVehiculosCS: statistics.reservasPVehiculosCS,
      reservasPVehiculosCX: statistics.reservasPVehiculosCX,
      m_AltaUsuarios: statistics.m_AltaUsuarios,
      m_bajaUsuarios: statistics.m_bajaUsuarios,
      m_activosUsuarios: statistics.m_activosUsuarios,
      m_validadosUsuarios: statistics.m_validadosUsuarios,
      m_reservasVehiculosCA: statistics.m_reservasVehiculosCA,
      m_reservasVehiculosCS: statistics.m_reservasVehiculosCS,
      m_reservasVehiculosCX: statistics.m_reservasVehiculosCX,
      m_reservasPVehiculosCA: statistics.m_reservasPVehiculosCA,
      m_reservasPVehiculosCS: statistics.m_reservasPVehiculosCS,
      m_reservasPVehiculosCX: statistics.m_reservasPVehiculosCX,
      v_validadosUsuarios: statistics.v_validadosUsuarios,
      v_reservasPVehiculosCA: statistics.v_reservasPVehiculosCA,
      v_reservasPVehiculosCS: statistics.v_reservasPVehiculosCS,
      v_reservasPVehiculosCX: statistics.v_reservasPVehiculosCX,
      mejorTasaAlquiler: statistics.mejorTasaAlquiler,
      tendenciaClaseVehiculo: statistics.tendenciaClaseVehiculo,
      ingresosTotalAnual: statistics.ingresosTotalAnual,
      ingresos_vehiculo: statistics.ingresos_vehiculo,
      porcentaje: statistics.porcentaje
    })

    newStatistic.save(function(err){
      if (err) return res.status(500).json({ success: false, msg: 'Fallo al poblar la base de datos.' });
      res.status(200).json({ success: true, msg: 'Exito al poblar la base de datos.' });
    })
}

/**
 * GET /api/admin/admin-get-sidebar
 * Recupera las acciones permitidas por el usuario
 */
exports.adminGetSidebar = function (req, res) {
  if(req.user.profile.rol_id === '61646d696e6973'){
    res.json({sidebar: ['DASHBOARD', 'PERFIL', 'CLIENTES', 'MENSAJES', 'PAGOS', 'VEHICULOS', 'EMPLEADOS']})
  } else if (req.user.profile.rol_id === '7465636e69636f') {
    res.json({sidebar: ['DASHBOARD', 'PERFIL', 'CLIENTES', 'MENSAJES', 'PAGOS', 'VEHICULOS']})
  } else {
    res.json({sidebar: ['NONE']})
  }
}

/**
 * GET /api/admin/search-employee-bynombre
 * Recupera una serie de empleados
 */
exports.searchEmployeebynombre = function (req, res) {
  let reg = new RegExp(req.query.q,'i')
  User.find({ $or: [{ 'profile.name': reg }, { 'profile.surname': reg }]  })
   .$where(function () {
     return this.profile.rol_id === '61646d696e6973' || this.profile.rol_id === '7465636e69636f';
   })
   .exec(function (err, employees) {
      if (err) {
        return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
      }
      let images = []
      for (var i = 0; i < employees.length; i++) {
        images[i] = employees[i].gravatar()
      }
      res.json({ success: true, employees: employees, images: images })
  });
}

/**
 * POST /api/admin/search-employee-bynickname
 * Recupera una serie de empleados
 */
exports.searchEmployeebynickname = function (req, res) {
  let reg = new RegExp(req.query.q,'i')
  User.find({ 'nickname': reg })
   .$where(function () {
     return this.profile.rol_id === '61646d696e6973' || this.profile.rol_id === '7465636e69636f';
   })
   .exec(function (err, employees) {
      if (err) {
        return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
      }
      let images = []
      for (var i = 0; i < employees.length; i++) {
        images[i] = employees[i].gravatar()
      }
      res.json({ success: true, employees: employees, images: images })
  });
}

/**
 * GET /api/admin/search-employee-byemail
 * Recupera una serie de empleados
 */
exports.searchEmployeebyemail = function (req, res) {
  let reg = new RegExp(req.query.q,'i')
  User.find({ 'email': reg })
   .$where(function () {
     return this.profile.rol_id === '61646d696e6973' || this.profile.rol_id === '7465636e69636f';
   })
   .exec(function (err, employees) {
      if (err) {
        return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
      }
      let images = []
      for (var i = 0; i < employees.length; i++) {
        images[i] = employees[i].gravatar()
      }
      res.json({ success: true, employees: employees, images: images })
  });
}

/**
 * GET /api/admin/search-nicknames
 * Recupera una serie de nicknames
 */
exports.searchNicknames = function (req, res) {
  let reg = new RegExp(`^${req.query.nick}`,'i')
  User.find({ nickname: reg }, 'nickname', function (err, nicknames) {
    if (err) {
      return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
    }
    console.table(nicknames);
    res.json({ success: true, nicknames: nicknames })
  })
}

/**
 * GET /api/admin/search-customer-bynombre
 * Recupera una serie de clientes
 */
exports.searchCustomerbynombre = function (req, res) {
  let reg = new RegExp(req.query.q,'i')
  User.find({ $or: [{ 'profile.name': reg }, { 'profile.surname': reg }]  })
   .where('profile.rol_id').equals('636c69656e7465')
   .exec(function (err, profiles) {
    if (err) {
      return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
    }
    let images = []
    for (var i = 0; i < profiles.length; i++) {
      images[i] = profiles[i].gravatar()
    }
    res.json({ success: true, customers: profiles, images: images })
  });
}

/**
 * GET /api/admin/search-customer-bynickname
 * Recupera una serie de clientes
 */
exports.searchCustomerbynickname = function (req, res) {
  let reg = new RegExp(req.query.q,'i')
  User.find({ 'nickname': reg })
    .where('profile.rol_id').equals('636c69656e7465')
    .exec(function (err, profiles) {
    if (err) {
      return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
    }
    let images = []
    for (var i = 0; i < profiles.length; i++) {
      images[i] = profiles[i].gravatar()
    }
    res.json({ success: true, customers: profiles, images: images })
  });
}

/**
 * GET /api/admin/search-customer-byemail
 * Recupera una serie de clientes
 */
exports.searchCustomerbyemail = function (req, res) {
  let reg = new RegExp(req.query.q,'i')
  User.find({ 'email': reg })
    .where('profile.rol_id').equals('636c69656e7465')
    .exec(function (err, profiles) {
    if (err) {
      return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
    }
    let images = []
    for (var i = 0; i < profiles.length; i++) {
      images[i] = profiles[i].gravatar()
    }
    res.json({ success: true, customers: profiles, images: images })
  });
}

/**
 * GET /api/admin/search-payments
 * Recupera una serie de pagos
 */
exports.searchPayments = function (req, res) {
  let reg = new RegExp(req.query.q,'i')
  Travel.find({ 'usuario': reg }, function (err, travels) {
    if (err) {
      return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
    }
    res.json({ success: true, travels: travels })
  });
}

/**
 * GET /api/admin/search-vehicles-bymarca
 * Recupera una serie de vehiculos
 */
exports.searchVehiclesbymarca = function (req, res) {
  let reg = new RegExp(req.query.q,'i')
  Vehicles.find({ 'marca': reg }, function (err, vehicles) {
    if (err) {
      return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
    }
    res.json({ success: true, vehicles: vehicles })
  });
}

/**
 * GET /api/admin/search-vehicles-bylocalizacion
 * Recupera una serie de vehiculos
 */
exports.searchVehiclesbylocalizacion = function (req, res) {
  let reg = new RegExp(req.query.q,'i')
  Vehicles.find({ 'localizacion': reg }, function (err, vehicles) {
    if (err) {
      return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
    }
    res.json({ success: true, vehicles: vehicles })
  });
}

/**
 * GET /api/admin/search-vehicles-bymatricula
 * Recupera una serie de vehiculos
 */
exports.searchVehiclesbymatricula = function (req, res) {
  let reg = new RegExp(req.query.q,'i')
  Vehicles.find({ 'matricula': reg }, function (err, vehicles) {
    if (err) {
      return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
    }
    res.json({ success: true, vehicles: vehicles })
  });
}

/**
 * GET /api/admin/search-vehicles-byid
 * Recupera una serie de vehiculos
 */
exports.searchVehiclesbyid = function (req, res) {
  Vehicles.find({ 'idPublic': req.query.q }, function (err, vehicles) {
    if (err) {
      return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
    }
    res.json({ success: true, vehicles: vehicles })
  });
}

/**
 * GET /api/admin/search-vehicles-bycarga
 * Recupera una serie de vehiculos
 */
exports.searchVehiclesbycarga = function (req, res) {
  let n = Number(req.query.q)
  if(req.query.c === 'menor'){
    Vehicles.find()
            .where('capCarga').lt(n)
            .exec(function(err, vehicles){
              if (err) {
                return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
              }
              res.json({ success: true, vehicles: vehicles })
            });
  } else {
    Vehicles.find()
            .where('capCarga').gt(n)
            .exec(function(err, vehicles){
              if (err) {
                return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
              }
              res.json({ success: true, vehicles: vehicles })
            });
  }
}

/**
 * GET /api/admin/search-messages
 * Recupera una serie de mensajes
 */
exports.searchMessages = function (req, res) {
  let reg = new RegExp(req.query.q,'i')
  Query.find({ 'usuario': reg }, function (err, messages) {
    if (err) {
      return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
    }
    res.json({ success: true, messages: messages })
  });
}

/**
 * POST /api/admin/admin-new-query
 * Crea una nueva consulta
 */
exports.adminNewQuery = function (req, res, next) {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const checkTitleQuery = () =>
    Query
      .find({usuario: req.body.nickname}) // A QUIEN IRA DIRIDIDO EL MENSAJE  ???????
      .where('titulo').equals(req.body.titulo)
      .then(query => { // VER QUE PARAMETROS SE PASAN AL METODO THEN ...
        if (query.length !== 0) {
          return Promise.reject({ toClient: true, msg: 'Error al crear la consulta. Ya exite un tema con ese mismo titulo.' });
        }
      });


  const createQuery = () => {
    const newQ = new Query({
      titulo: req.body.titulo,
      usuario: req.body.nickname
    });
    newQ.children = [{}]
    newQ.children[0].mensajeOUT = req.body.contenido
    newQ.children[0].fechaOUT = Date.now()
    newQ.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Se ha producido un problema al guardar la consulta en la BBDD.'});
      }
      res.json({success: true, msg: 'Se ha registrado su consulta con exito.'});
    });
  }

  checkTitleQuery()
    .then(createQuery)
    .catch(function(error){
      console.log('log en catch()');
      if (error.toClient) return res.status(500).json({ success: false, msg: error.msg });
      next(error);
    });

}

/**
 * POST /api/admin/admin-new-interaction
 * Añade una nueva iteracion a la consulta
 */
exports.adminNewInteraction = function (req, res, next) {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Query
    .findOne({usuario: req.body.nickname})
    .where('titulo').equals(req.body.titulo)
    .where('enProcesoRespuesta').equals(true)
    .exec((err, query) => {
      if (err)
        return res.status(500).json({success: false, msg: 'Se ha producido un problema al acceder a la consulta en la BBDD.'});
      if (!query)
        return res.json({ success: false, msg: 'Error.' });
      query.enProcesoRespuesta = false;
      query.enProcesoRespuestaAuth = undefined;
      query.enTramite = false;
      query.children[query.children.length - 1].mensajeOUT = req.body.contenido
      query.children[query.children.length - 1].fechaOUT = Date.now()
      query.save(function (err) {
        if (err) return res.json({success: false, msg: 'Se ha producido un problema al guardar la consulta en la BBDD.'});
        res.json({success: true, msg: 'Se ha registrado su consulta con exito.'});
      });
    });

}

/**
 * POST /api/admin/pay-travel
 * Se cambia el estado a pagado
 */
exports.payTravel = function (req, res) {
  // Travel.update()
  // (node:1525) DeprecationWarning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.
  var query = { _id: req.body.id };
  Travel.update(query, { 'importe.estado': true }, function(err, travel){
    if (err) {
      return res.status(500).json({ success: false, msg: 'Error al acceder a la BBDD' })
    }
    res.json({success: true, msg: 'Exito en la operacion'})
  });
}

/**
 * POST /api/admin/validate-customer
 * Se cambio el estado a validado
 */
exports.validateCustomer = function (req, res, next) {
  User.findById(req.body.id)
    .exec(function(err, user){
      if (err) {
        return next(err)
      }
      user.validado = true
      user.enProcesoDeValidacion = false
      user.save(function(err){
        if (err) {
          return next(err)
        }
        return res.json({ success: true, msg: 'El cliente ha sido validado con exito', user: user })
      })
    })
}

/**
 * POST /api/admin/delete-user
 * Borra la instancia del modelo User
 */
exports.deleteUser = function (req, res, next) {
  User.deleteOne({ _id: req.body.id }, function(err){
    if(err) return next(err)
    res.json({ success: true, msg: 'Se ha borrado el usuario con exito' })
  })
}

/**
 * POST /api/admin/delete-query
 * Borrar una instancia del modelo Query
 */
exports.deleteQuery = function (req, res, next) {
  Query.deleteOne({ _id: req.body.id }, function(err){
    if(err) return next(err)
    res.json({ success: true, msg: 'Se ha borrado la consulta con exito' })
  })
}

/**
 * POST /api/admin/delete-customer
 * Borrar una instancia del modelo User
 */
exports.deleteCustomer = function (req, res, next) {
  User.deleteOne({ _id: req.body.id }, function(err){
    if(err) return next(err)
    res.json({ success: true, msg: 'Se ha borrado el usuario con exito' })
  })
}

/**
 * POST /api/admin/delete-vehicle
 * Borrar una instancia del modelo Vehicles
 */
exports.deleteVehicle = function (req, res, next) {
  Vehicles.deleteOne({ _id: req.body.id }, function(err){
    if(err) return next(err)
    res.json({ success: true, msg: 'Se ha borrado el vehiculo con exito' })
  })
}

/**
 * POST /api/admin/open-incidence
 * Se cambio el estado a validado a no disponible
 */
exports.openIncidence = function (req, res, next) {
  Vehicles.findByIdAndUpdate(req.body.id,
    { modificadoPor: req.user.email, disponible: false, reserva: false, incidence: req.body.incidence })
    .exec(function(err){
      if (err) return next(err)
      return res.json({ success: true, msg: 'El estado del vehiculo ha sido cambiado con exito' })
    })
}

/**
 * POST /api/admin/change-rented
 * Se cambio el estado de disponibilidad del vehiculo
 */
exports.changeRented = function (req, res, next) {
  Vehicles.findOne({ _id: req.body.id })
    .exec(function(err, vehicle){
      if (err) return next(err)
      if(vehicle.reservadoPor) {
        vehicle.modificadoPor = req.user.email
        vehicle.expiraReserva = undefined
        vehicle.disponible = false
        vehicle.reserva = false
        vehicle.enUsoPor = vehicle.reservadoPor
        vehicle.reservadoPor = undefined
        vehicle.save(function(err){
          if(err) return next(err)
          return res.json({ success: true, msg: 'El estado del vehiculo ha sido cambiado con exito' })
        })
      } else {
        return res.json({ success: true, msg: 'El estado no puede ser modicado debido a que inicialmente debe estar reservado' })
      }

    })
}

/**
 * POST /api/admin/change-available
 * Se cambio el estado del vehiculo a disponible
 */
exports.changeAvailable = function (req, res, next) {
  Vehicles.findOne({ _id: req.body.id })
    .exec(function(err, vehicle){
      if (err) return next(err)
      if(vehicle.enUsoPor) {
        vehicle.modificadoPor = req.user.email
        vehicle.disponible = true
        vehicle.reserva = false
        vehicle.enUsoPor = undefined
        vehicle.save(function(err){
          if(err) return next(err)
          return res.json({ success: true, msg: 'El estado del vehiculo ha sido cambiado con exito' })
        })
      } else {
        return res.json({ success: true, msg: 'El estado no puede ser modicado debido a que inicialmente debe estar alquilado' })
      }

    })
}

/**
 * POST /api/admin/close-incidence
 * Se cambia el estado de vehiculo a disponible
 */
exports.closeIncidence = function (req, res, next) {
  Vehicles.findOne({ _id: req.body.id })
    .exec(function(err, vehicle){
      if (err) return next(err)
      vehicle.modificadoPor = req.user.email
      vehicle.disponible = true
      vehicle.reserva = false
      vehicle.incidence = undefined
      vehicle.save(function(err){
        if(err) return next(err)
        return res.json({ success: true, msg: 'El estado del vehiculo ha sido cambiado con exito' })
      })
    })
}

/**
 * GET /api/admin/tasa-alquiler-2018
 * Recupera estadistica para el usuario
 */
exports.tasaAlquiler2018 = function (req, res, next) {
  Statistic.findById({ _id: process.env.ID_STATISTIC })
    .exec(function(err, stats){
      if (err) {
        return next(err)
      }
      let mtaCA = 0, mtaCS = 0, mtaCX = 0, mmtaCA, mmtaCS, mmtaCX;     //     Hay un error al llamar a alquilerVehiculosCA sin el uso de this
      for (let i = 0; i < stats.alquilerVehiculosCA[1].length; i++) {
        if (stats.alquilerVehiculosCA[1][i] > mtaCA) {
          mtaCA = stats.alquilerVehiculosCA[1][i]
          mmtaCA = i
        }
        if (stats.alquilerVehiculosCS[1][i] > mtaCS) {
          mtaCS = stats.alquilerVehiculosCS[1][i]
          mmtaCS = i
        }
        if (stats.alquilerVehiculosCX[1][i] > mtaCX) {
          mtaCX = stats.alquilerVehiculosCX[1][i]
          mmtaCX = i
        }
      }
      stats.mejorTasaAlquiler2018 = [
        { tasaAlquilerCA: mtaCA, mes: mmtaCA },
        { tasaAlquilerCS: mtaCS, mes: mmtaCS },
        { tasaAlquilerCX: mtaCX, mes: mmtaCX }
      ]
      stats.save(function(err){
        if (err) {
          return next(err)
        }
        res.json({ success: true, msg: 'Exito en la operación' })
      })
    })
}

/**
 * GET /api/admin/tasa-alquiler-2017
 * Recupera estadistica para el usuario
 */
exports.tasaAlquiler2017 = function (req, res, next) {
  Statistic.findById({ _id: process.env.ID_STATISTIC })
    .exec(function(err, stats){
      if (err) {
        return next(err)
      }
      let mtaCA = 0, mtaCS = 0, mtaCX = 0, mmtaCA, mmtaCS, mmtaCX;
      for (let i = 0; i < stats.alquilerVehiculosCA[0].length; i++) {
        if (stats.alquilerVehiculosCA[0][i] > mtaCA) {
          mtaCA = stats.alquilerVehiculosCA[0][i]
          mmtaCA = i
        }
        if (stats.alquilerVehiculosCS[0][i] > mtaCS) {
          mtaCS = stats.alquilerVehiculosCS[0][i]
          mmtaCS = i
        }
        if (stats.alquilerVehiculosCX[0][i] > mtaCX) {
          mtaCX = stats.alquilerVehiculosCX[0][i]
          mmtaCX = i
        }
      }
      stats.mejorTasaAlquiler2017 = [
        { tasaAlquilerCA: mtaCA, mes: mmtaCA },
        { tasaAlquilerCS: mtaCS, mes: mmtaCS },
        { tasaAlquilerCX: mtaCX, mes: mmtaCX }
      ]
      stats.save(function(err){
        if (err) {
          return next(err)
        }
        res.json({ success: true, msg: 'Exito en la operación' })
      })
    })
}

/**
 * GET /api/admin/tendencia-clase-2017
 * Recupera estadistica para el usuario
 */
exports.tendenciaClase2017 = function (req, res, next) {
  Statistic.findById({ _id: process.env.ID_STATISTIC })
    .exec(function(err, stats){
      if (err) {
        return next(err)
      }
      let alquilerTotal = 0, alquilerCA = 0, alquilerCS = 0, alquilerCX = 0;
      for (let i = 0; i < stats.alquilerVehiculosCA[0].length; i++) {
        alquilerCA += stats.alquilerVehiculosCA[0][i]
        alquilerCS += stats.alquilerVehiculosCS[0][i]
        alquilerCX += stats.alquilerVehiculosCX[0][i]
        alquilerTotal += stats.alquilerVehiculosCA[0][i] + stats.alquilerVehiculosCS[0][i] + stats.alquilerVehiculosCX[0][i]
      }
      stats.tendenciaClaseVehiculo2017 = [
        { tendeciaCA: alquilerCA / alquilerTotal },
        { tendeciaCS: alquilerCS / alquilerTotal },
        { tendeciaCX: alquilerCX / alquilerTotal }
      ]
      stats.save(function(err){
        if (err) {
          return next(err)
        }
        res.json({ success: true, msg: 'Exito en la operación' })
      })
    })
}

/**
 * GET /api/admin/tendencia-clase-2018
 * Recupera estadistica para el usuario
 */
exports.tendenciaClase2018 = function (req, res, next) {
  Statistic.findById({ _id: process.env.ID_STATISTIC })
    .exec(function(err, stats){
      if (err) {
        return next(err)
      }
      let alquilerTotal = 0, alquilerCA = 0, alquilerCS = 0, alquilerCX = 0;
      for (let i = 0; i < stats.alquilerVehiculosCA[1].length; i++) {
        alquilerCA += stats.alquilerVehiculosCA[1][i]
        alquilerCS += stats.alquilerVehiculosCS[1][i]
        alquilerCX += stats.alquilerVehiculosCX[1][i]
        alquilerTotal += stats.alquilerVehiculosCA[1][i] + stats.alquilerVehiculosCS[1][i] + stats.alquilerVehiculosCX[1][i]
      }
      stats.tendenciaClaseVehiculo2018 = [
        { tendeciaCA: alquilerCA / alquilerTotal },
        { tendeciaCS: alquilerCS / alquilerTotal },
        { tendeciaCX: alquilerCX / alquilerTotal }
      ]
      stats.save(function(err){
        if (err) {
          return next(err)
        }
        res.json({ success: true, msg: 'Exito en la operación' })
      })
    })
}

/**
 * GET /api/admin/get-stats
 * Recupera y calcula estadisticas para el usuario
 */
exports.getStats = function (req, res, next) {
  let s_vehicles
  const vehiclesStats = () => {
    return Vehicles.aggregate([
      {
        $group: {
          _id: { clase:"$clase", disponible: "$disponible", reserva: "$reserva" },
          vehicles: { $sum: 1 }
        }
      },{
        $project: {
          _id: 0,
          clase: "$_id.clase",
          disponible: "$_id.disponible",
          reserva: "$_id.reserva",
          vehicles: "$vehicles"
        }
      }]).exec();
  }

  const generalStats = () => {
    return Statistic.findById({ _id: process.env.ID_STATISTIC }).exec();
  }

  vehiclesStats()
    .then(result => {
      s_vehicles = result
      return generalStats();
    })
    .then(result => {
      return res.json({ success: true,
        msg: 'Exito en la operación',
        m_activoUsuarios: result.m_activoUsuarios,
        mv_bajaUsuarios: result.mv_bajaUsuarios,
        vehiclesStats: s_vehicles,
        generalStats: result })
    })
    .catch(err => next(err))
}

/**
 * GET /api/admin/update-ingresos-anuales
 * Recupera y calcula estadisticas para el usuario
 */
exports.updateIngresosAnuales = function (req, res, next) {
  return Travel.aggregate([
     {
       $addFields: {
         year: { $cond: { if: { $eq: [ "$estado", "iniciado" ] }, then: 0, else: {$year: "$fechaFinal"} } },
         kilometres: "$distanciaRecorrida",
         cuantia: "$importe.cuantia"
       }
     },{
       $group: {
         _id: "$year",
         travels: { $sum: 1 },
         total: { $sum: "$cuantia" },
         kilo_mtrs: { $sum: "$kilometres" },
       }
     },{
       $project: {
         _id: 0,
         year: "$_id",
         travels: "$travels",
         total: "$total",
         kilometres: "$kilo_mtrs",
       }
     }]).exec(function(err, result){
       if (err) {
         return next(err)
       }
       Statistic.findByIdAndUpdate({ _id: process.env.ID_STATISTIC }, { ingresosAnuales: result }).exec(
         function(err){
           if (err) {
             return next(err)
           }
           res.json({ success: true, msg: 'Exito en la operación', ingresosAnuales: result })
         }
       );
     });
}

/**
 * GET /api/admin/update-alta-usuarios
 * Recupera y calcula estadisticas para el usuario
 */
exports.updateAltaUsuarios = function (req, res, next) {
  return User.aggregate([
    {
      $project: {
        year: {$year: "$createdAt"},
        month: {$month: "$createdAt"}
      }
    },{
      $group: {
        _id: { year: "$year", month: "$month" },
        users: { $sum: 1 }
      }
    },{
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        users: "$users"
      }
     }]).exec(function(err, result){
       if (err) {
         return next(err)
       }
       Statistic.findByIdAndUpdate({ _id: process.env.ID_STATISTIC }, { alta_usuarios: result }).exec(
         function(err){
           if (err) {
             return next(err)
           }
           res.json({ success: true, msg: 'Exito en la operación', altaUsuarios: result })
         }
       );
     });
}

/**
 * POST /api/admin/update-user
 * Actualiza los atributos de la instancia del modelo User
 */
exports.updateUser = function (req, res, next) {
  User
    .findOne({ email: req.body.userEmail })
    .then((user) => {
      if (!user) {
        return res.json({ success: false, msg: 'No existe una cuenta asociada al email facilitado.' });
      } else {
        user.profile.birth = req.body.userBirth;
        user.nickname = req.body.nickname;
        user.profile.surname = req.body.userSurname;
        user.profile.name = req.body.userName;
        user.profile.gender = req.body.userGender;
        user.profile.localidad = req.body.userLocalidad;
        user.profile.provincia = req.body.userProvincia;
        user.profile.cp = req.body.userCP;
        user.profile.domicilio = req.body.userDomicilio;
        user.email = req.body.userEmail;
        user.save();
      }
      res.json({success: true, msg: 'Exito en la operacion'})
    });
}

/**
 * GET /api/admin/admin-get-perfil
 * Recupera los datos del perfil
 */
exports.adminGetPerfil = function (req, res, next) {
  let perfil = {
    userName: req.user.profile.name,
    userGender: req.user.profile.gender,
    userEmail: req.user.email,
    userImage: req.user.gravatar(),
    userSurname: req.user.profile.surname,
    userDomicilio: req.user.profile.domicilio,
    userRol: req.user.profile.rol_id === '61646d696e6973' ? 'Administrador' : 'Técnico',
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
    enProcesoDeValidacion: req.user.enProcesoDeValidacion
  };
  res.json({ success: true, perfil: perfil })
}

/**
 * POST /api/admin/status-query
 * Recupera el estado de la consulta
 */
exports.statusQuery = function (req, res, next) {
  Query.findOne({usuario: req.body.usuario})
    .where('titulo').equals(req.body.titulo)
    .exec(function(err, query){
      if(err) return next(err)
      res.json({ success: query.enProcesoRespuesta })
    })
}

/**
 * POST /api/admin/change-status-query
 * Cambia el estado de la consulta
 */
exports.changeStatusQuery = function (req, res, next) {
  Query.findOne({usuario: req.body.usuario})
    .where('titulo').equals(req.body.titulo)
    .exec(function(err, query){
      if(err) {
        return next(err)
      }
      query.enProcesoRespuesta = !query.enProcesoRespuesta
      if(query.enProcesoRespuesta) {
        query.enProcesoRespuestaAuth = req.user.email
      } else {
        query.enProcesoRespuestaAuth = undefined
      }
      query.save(function(err){
        if(err) return next(err)
        res.json({ success: true, msg: 'Exito en la operación' })
      })
    })
}

/**
 * POST /api/admin/admin-random-messages
 * Recupera un serie de mensajes por su antiguedad
 */
exports.adminRandomMessages = function (req, res, next) {
  var promise = Query.aggregate([
    {
      $match: {
        cerrada: false
      }
    },
    {
      $sort : {
        updatedAt : 1
      }
    },
    {
      $limit : 35
    },
    {
      $project: {
         _id: 1,
         titulo: "$titulo",
         cerrada: "$cerrada",
         children: "$children",
         usuario: "$usuario",
         createdAt: "$createdAt",
         updatedAt: "$updatedAt",
         enProcesoRespuesta: "$enProcesoRespuesta",
         enProcesoRespuestaAuth: "$enProcesoRespuestaAuth"
      }
    }
  ]).exec();

  promise.then( function (result) {
    res.json({success: true, msg: 'exito en la operación', result: result})
  })
  .catch(function(err){
    next(err)
  })
}

/**
 * POST /api/admin/update-customer
 * Actuliza los atributos de la instancia del modelo User
 */
exports.updateCustomer = function (req, res) {
  User
    .findOne({ email: req.body.userEmail })
    .then((user) => {
      if (!user) {
        return res.json({ success: false, msg: 'No existe una cuenta asociada al email facilitado.' });
      } else {
        user.profile.birth = req.body.userBirth;
        user.nickname = req.body.nickname;
        user.profile.surname = req.body.userSurname;
        user.profile.name = req.body.userName;
        user.profile.gender = req.body.userGender;
        user.profile.localidad = req.body.userLocalidad;
        user.profile.provincia = req.body.userProvincia;
        user.profile.cp = req.body.userCP;
        user.profile.domicilio = req.body.userDomicilio;
        user.email = req.body.userEmail;
        user = user.save();
      }
      res.json({success: true, msg: 'Exito en la operacion'})
    });
}

/**
 * POST /api/admin/update-vehicle
 * Actuliza los atributos de la instancia del modelo Vehicles
 */
exports.updateVehicle = function (req, res) {
  Vehicles
    .findOne({ idPublic: req.body.idPublic })
    .then((vehicle) => {
      if (!vehicle) {
        return res.json({ success: false, msg: 'No existe un vehiculo asociado al id facilitado.' });
      } else {
        vehicle.lat = req.body.lat,
        vehicle.long = req.body.long,
        vehicle.tipo = req.body.tipo,
        vehicle.marca = req.body.marca,
        vehicle.description = req.body.description,
        // vehicle.picture = req.body.picture,
        vehicle.modificadoPor = req.user.email,
        vehicle.clase = req.body.clase,
        vehicle.localizacion = req.body.localizacion,
        vehicle.matricula = req.body.matricula,
        vehicle.autonomia = req.body.autonomia,
        vehicle.numPlazas = req.body.numPlazas,
        vehicle.numPuertas = req.body.numPuertas,
        vehicle.capCarga = req.body.capCarga
        vehicle = vehicle.save();
      }
      res.json({success: true, msg: 'Exito en la operacion'})
    });
}

/**
 * POST /api/admin/new-user
 * Crea una instancia del modelo User
 */
exports.newUser = function (req, res, next) {
  const setUser = () => {
    const newUser = new User({
      profile: {
        rol_id: req.body.rol === 'Tecnico' ? '7465636e69636f' : '61646d696e6973',
        name: req.body.userName,
        department: req.body.department,
        birth: req.body.userBirth,
        cp: req.body.userCP,
        gender: req.body.userGender,
        provincia: req.body.userProvincia,
        domicilio: req.body.userDomicilio,
        localidad: req.body.userLocalidad,
        surname: req.body.userSurname
      },
      activo: true,
      password: req.body.password,
      email: req.body.userEmail,
      nickname: req.body.userNickname
    });

    return newUser.save().then(() => new Promise ((resolve) => {
      resolve();
    }));
    // save() no me retorna un objeto Promise; simplemente es un thennable
  }

  setUser()
    .then(() => {
      return res.json({success: true, msg: 'Exito en la operacion'})
    })
    .catch(function(error){
      res.status(500).json({success: false, err: error})
    });
}

/**
 * POST /api/admin/new-vehicle
 * Crea una instancia del modelo Vehicles
 */
exports.newVehicle = function (req, res) {
  const createRandomToken = randomBytesAsync(16)
    .then(buf => buf.toString('hex'));

  const setVehicle = () => {
    const newVehicle = new Vehicles({
      idPublic: new mongoose.Types.ObjectId,
      lat: req.body.lat,
      long: req.body.long,
      tipo: req.body.tipo,
      marca: req.body.marca,
      description: req.body.descripcion,
      // picture: req.body.picture,
      modificadoPor: req.user.email,
      clase: req.body.clase,
      localizacion: req.body.localizacion,
      matricula: req.body.matricula,
      autonomia: req.body.autonomia,
      numPlazas: req.body.numPlazas,
      numPuertas: req.body.numPuertas,
      capCarga: req.body.capCarga
    });

    return newVehicle.save().then(() => new Promise ((resolve) => {
      resolve();
    }));
  }

  setVehicle()
    .then(() => {
      return res.json({success: true, msg: 'Exito en la operacion'})
    })
    .catch(function(error){
      res.status(500).json({success: false, err: error})
    });
}
