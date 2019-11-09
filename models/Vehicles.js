const mongoose = require('mongoose');
const Stat = require("./Statistic");

/* Puede que no este disponible porque este en uso por un cliente
  o este no disponible por causas mecanicas */

var VehiclesSchema = new mongoose.Schema({
  marca: String,
  clase: String,
  localizacion: String,
  matricula: {
    type:String,
    unique:true
  },
  idPublic: {
    type: mongoose.Schema.Types.ObjectId,
    unique:true
  },
  picture: String,
  description: String,
  incidence: String,
  enUsoPor: String,
  autonomia: Number,
  disponible: {
    type: Boolean,
    default: true
  },
  reserva:{
    type: Boolean,
    default: false
  },
  expiraReserva: {
    type: Date,
    default: undefined
  },
  reservadoPor: String,
  numPlazas: Number,
  numPuertas: Number,
  tipo: String,
  capCarga: Number,
  lat: String,
  long: String,
  modificadoPor: String,
}, { timestamps: true });

/*
Puedo hacer que el valor de reservadoPor sea unico. Que un usuario solo tenga la oportunidad
de alquilar solo un vehiculo.
*/

VehiclesSchema.pre('save', function(next) {
  let stats = new Stat()
  let clase = this.clase.toUpperCase()
  if (this.reservadoPor && this.isDirectModified('reserva') && clase === 'CLASE A') {
    stats.updateStats('reservasVehiculosCA', function(err){
      if(err) { next(err) }
    })
  } else if (this.reservadoPor && this.isDirectModified('reserva') && clase === 'CLASE S') {
    stats.updateStats('reservasVehiculosCS', function(err){
      if(err) { next(err) }
    })
  } else if (this.reservadoPor && this.isDirectModified('reserva') && clase === 'CLASE X') {
    stats.updateStats('reservasVehiculosCX', function(err){
      if(err) { next(err) }
    })
  }
  next()
});

VehiclesSchema.pre('save', function(next) {
  let clase = this.clase.toUpperCase()
  if (this.enUsoPor && this.isDirectModified('reserva') && clase === 'CLASE A') {
    let stats = new Stat()
    stats.updateStats('alquilerVehiculosCA', function(err){
      if(err) { next(err) }
    })
  } else if (this.enUsoPor && this.isDirectModified('reserva') && clase === 'CLASE S') {
    let stats = new Stat()
    stats.updateStats('alquilerVehiculosCS', function(err){
      if(err) { next(err) }
    })
  } else if (this.enUsoPor && this.isDirectModified('reserva') && clase === 'CLASE X') {
    let stats = new Stat()
    stats.updateStats('alquilerVehiculosCX', function(err){
      if(err) { next(err) }
    })
  }
  next()
});

module.exports = mongoose.model('Vehicles', VehiclesSchema);
