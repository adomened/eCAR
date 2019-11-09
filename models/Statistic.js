const mongoose = require('mongoose');
// const Travel = require("./Travel");
// const User = require("./User");
// const Vehicles = require("./Vehicles");
const YEAR_START_BUSINESS = 2017;

var StatisticSchema = new mongoose.Schema({
  descripcion: String,
  alta_usuarios: [Object],
  baja_usuarios: [[Number]],
  activo_usuarios: [[Number]],
  validado_usuarios: [[Number]],
  reservasVehiculosCA: [[Number]],
  reservasVehiculosCS: [[Number]],
  reservasVehiculosCX: [[Number]],
  alquilerVehiculosCA: [[Number]],
  alquilerVehiculosCS: [[Number]],
  alquilerVehiculosCX: [[Number]],
  mejorTasaAlquiler2017: [Object],
  mejorTasaAlquiler2018: [Object],
  tendenciaClaseVehiculo2017: [Object],
  tendenciaClaseVehiculo2018: [Object],
  ingresosAnuales: [Object]
}, { timestamps: true });

// ┌─────────┬──────┬─────────┬────────────────────┬────────────────────┐
// │ (index) │ year │ travels │       total        │     kilometres     │
// ├─────────┼──────┼─────────┼────────────────────┼────────────────────┤
// │    0    │ 2019 │    4    │ 70.97715733333334  │ 0.2855317466415183 │
// │    1    │ 2018 │    3    │ 280.79999999999995 │       622.92       │
// └─────────┴──────┴─────────┴────────────────────┴────────────────────┘

// StatisticSchema.virtual('ingresosAnuales').get(function () { // Return a Promise
//   return Travel.aggregate([
//     {
//       $addFields: {
//         year: { $cond: { if: { $eq: [ "$estado", "iniciado" ] }, then: 0, else: {$year: "$fechaFinal"} } },
//         kilometres: "$distanciaRecorrida",
//         cuantia: "$importe.cuantia"
//       }
//     },{
//       $group: {
//         _id: "$year",
//         travels: { $sum: 1 },
//         total: { $sum: "$cuantia" },
//         kilo_mtrs: { $sum: "$kilometres" },
//       }
//     },{
//       $project: {
//         _id: 0,
//         year: "$_id",
//         travels: "$travels",
//         total: "$total",
//         kilometres: "$kilo_mtrs",
//       }
//     }]).exec();
// });

// ┌─────────┬──────┬───────┬───────┐
// │ (index) │ year │ month │ users │
// ├─────────┼──────┼───────┼───────┤
// │    0    │ 2019 │   2   │   3   │
// │    1    │ 2019 │   1   │   1   │
// │    2    │ 2018 │  10   │   1   │
// │    3    │ 2018 │   9   │  13   │
// └─────────┴──────┴───────┴───────┘

// StatisticSchema.virtual('alta_usuarios').get(function () {
//   return User.aggregate([
//     {
//       $project: {
//         year: {$year: "$createdAt"},
//         month: {$month: "$createdAt"}
//       }
//     },{
//       $group: {
//         _id: { year: "$year", month: "$month" },
//         users: { $sum: 1 }
//       }
//     },{
//       $project: {
//         _id: 0,
//         year: "$_id.year",
//         month: "$_id.month",
//         users: "$users"
//       }
//     }]).exec();
// });

// media de viajes realizados por usuario
// SALIDA (result) DE EJEMPLO DEL GET 'PORTCENTAJE':
// ┌─────────┬───────────┬────────────┬─────────┬──────────┐
// │ (index) │   clase   │ disponible │ reserva │ vehicles │
// ├─────────┼───────────┼────────────┼─────────┼──────────┤
// │    0    │ 'Clase A' │   false    │  false  │    10    │
// │    1    │ 'Clase X' │   false    │  false  │    6     │
// │    2    │ 'Clase A' │    true    │  false  │    23    │
// │    3    │ 'Clase X' │    true    │  false  │    26    │
// │    4    │ 'Clase S' │    true    │  false  │    34    │
// │    5    │ 'Clase S' │   false    │  false  │    6     │
// └─────────┴───────────┴────────────┴─────────┴──────────┘

// StatisticSchema.virtual('vehiculos').get(function () { // 'porcentaje' a pasado a llamarse 'vehiculos' hasta encontrar un mejor nombre
//   return Vehicles.aggregate([
//     {
//       $group: {
//         _id: { clase:"$clase", disponible: "$disponible", reserva: "$reserva" },
//         vehicles: { $sum: 1 }
//       }
//     },{
//       $project: {
//         _id: 0,
//         clase: "$_id.clase",
//         disponible: "$_id.disponible",
//         reserva: "$_id.reserva",
//         vehicles: "$vehicles"
//       }
//     }]).exec();
// });

// StatisticSchema.virtual('tendenciaClaseVehiculo2017').get(function () { // <-- TODO: colocar esto en un endpoint y almacenarlo como un dato 'muerto'
//   let alquilerTotal = 0, alquilerCA = 0, alquilerCS = 0, alquilerCX = 0;
//   for (let i = 0; i < this.alquilerVehiculosCA[0].length; i++) {
//     alquilerCA += alquilerVehiculosCA[0][i]
//     alquilerCS += alquilerVehiculosCS[0][i]
//     alquilerCX += alquilerVehiculosCX[0][i]
//     alquilerTotal += alquilerVehiculosCA[0][i] + alquilerVehiculosCS[0][i] + alquilerVehiculosCX[0][i]
//   }
//   return [
//     { tendeciaCA: alquilerCA / alquilerTotal },
//     { tendeciaCS: alquilerCS / alquilerTotal },
//     { tendeciaCX: alquilerCX / alquilerTotal }
//   ]
// });

// StatisticSchema.virtual('mejorTasaAlquiler2017').get(function () { // <-- TODO: colocar esto en un endpoint y almacenarlo como un dato 'muerto'
//   let mtaCA = 0, mtaCS = 0, mtaCX = 0, mmtaCA, mmtaCS, mmtaCX;     //     Hay un error al llamar a alquilerVehiculosCA sin el uso de this
//   for (let i = 0; i < alquilerVehiculosCA[0].length; i++) {
//     if (alquilerVehiculosCA[0][i] > mtaCA) {
//       mtaCA = alquilerVehiculosCA[0][i]
//       mmtaCA = i
//     }
//     if (alquilerVehiculosCS[0][i] > mtaCS) {
//       mtaCS = alquilerVehiculosCS[0][i]
//       mmtaCS = i
//     }
//     if (alquilerVehiculosCX[0][i] > mtaCX) {
//       mtaCX = alquilerVehiculosCX[0][i]
//       mmtaCX = i
//     }
//   }
//   return [
//     { tasaAlquilerCA: mtaCA, mes: mmtaCA },
//     { tasaAlquilerCS: mtaCS, mes: mmtaCS },
//     { tasaAlquilerCX: mtaCX, mes: mmtaCX }
//   ]
// });

// StatisticSchema.virtual('mejorTasaAlquiler2018').get(function () { // <-- TODO: colocar esto en un endpoint y almacenarlo como un dato 'muerto'
//   let mtaCA = 0, mtaCS = 0, mtaCX = 0, mmtaCA, mmtaCS, mmtaCX;
//   for (let i = 0; i < alquilerVehiculosCA[1].length; i++) {
//     if (alquilerVehiculosCA[1][i] > mtaCA) {
//       mtaCA = alquilerVehiculosCA[1][i]
//       mmtaCA = i
//     }
//     if (alquilerVehiculosCS[1][i] > mtaCS) {
//       mtaCS = alquilerVehiculosCS[1][i]
//       mmtaCS = i
//     }
//     if (alquilerVehiculosCX[1][i] > mtaCX) {
//       mtaCX = alquilerVehiculosCX[1][i]
//       mmtaCX = i
//     }
//   }
//   return [
//     { tasaAlquilerCA: mtaCA, mes: mmtaCA },
//     { tasaAlquilerCS: mtaCS, mes: mmtaCS },
//     { tasaAlquilerCX: mtaCX, mes: mmtaCX }
//   ]
// });

StatisticSchema.virtual('mv_bajaUsuarios').get(function () {
  let mean_array = this.baja_usuarios.map(function(array) {
    return array.reduce((sum, value) => sum + value, 0) / 12;
  });
  let variance_array = []
  for (let i=0; i < this.baja_usuarios.length; i++) {
    variance_array[i] = Math.sqrt(this.baja_usuarios[i].reduce((pre, cur) => pre + Math.pow((cur - mean_array[i]), 2), 0) / 12);
  }
  return { m_bajaUsuarios: mean_array, v_bajaUsuarios: variance_array }
});

StatisticSchema.virtual('m_activoUsuarios').get(function () {
  return this.activo_usuarios.map(function(array) {
    return array.reduce(function (sum, value) {
      return sum + value;
    }, 0) / array.length;
  });
});

StatisticSchema.virtual('mv_validadoUsuarios').get(function () {
  let mean_array = this.validado_usuarios.map(function(array) {
    return array.reduce((sum, value) => sum + value, 0) / array.length;
  });
  let variance_array = []
  for (let i=0; i < this.validado_usuarios.length; i++) {
    variance_array[i] = Math.sqrt(this.validado_usuarios[i].reduce((pre, cur) => pre + Math.pow((cur - mean_array[i]), 2), 0) / 12);
  }
  return { m_bajaUsuarios: mean_array, v_validadoUsuarios: variance_array }
});

StatisticSchema.virtual('m_reservasVehiculosCA').get(function () {
  return this.reservasVehiculosCA.map(function(array) {
    return array.reduce(function (sum, value) {
      return sum + value;
    }, 0) / array.length;
  });
});

StatisticSchema.virtual('m_reservasVehiculosCS').get(function () {
  return this.reservasVehiculosCS.map(function(array) {
    return array.reduce(function (sum, value) {
      return sum + value;
    }, 0) / array.length;
  });
});

StatisticSchema.virtual('m_reservasVehiculosCX').get(function () {
  return this.reservasVehiculosCX.map(function(array) {
    return array.reduce(function (sum, value) {
      return sum + value;
    }, 0) / array.length;
  });
});

StatisticSchema.virtual('m_alquilerVehiculosCA').get(function () {
  return this.alquilerVehiculosCA.map(function(array) {
    return array.reduce(function (sum, value) {
      return sum + value;
    }, 0) / array.length;
  });
});

StatisticSchema.virtual('m_alquilerVehiculosCS').get(function () {
  return this.alquilerVehiculosCS.map(function(array) {
    return array.reduce(function (sum, value) {
      return sum + value;
    }, 0) / array.length;
  });
});

StatisticSchema.virtual('m_alquilerVehiculosCX').get(function () {
  return this.alquilerVehiculosCX.map(function(array) {
    return array.reduce(function (sum, value) {
      return sum + value;
    }, 0) / array.length;
  });
});

StatisticSchema.methods.updateStats = function(field, cb) {
  return this.model('Statistic').findOne({ _id: process.env.ID_STATISTIC }, field, function (err, statistic) {
    if (err) {
      return next(err)
    }
    let date = new Date();
    let obj_index = { y: date.getFullYear() - YEAR_START_BUSINESS, m: date.getMonth() };
    if(!statistic[field][obj_index.y]) {
      let arr = new Array(12).fill(0,0,12);
      let doc = {}
      arr[obj_index.m] += 1;
      statistic[field][obj_index.y] = arr;
      doc[field] = statistic[field]
      statistic.updateOne(doc).exec(cb);
    } else {
      let doc = {}
      statistic[field][obj_index.y][obj_index.m] += 1;
      doc[field] = statistic[field]
      statistic.updateOne(doc).exec(cb);
    }
  });
};

module.exports = mongoose.model('Statistic', StatisticSchema);
