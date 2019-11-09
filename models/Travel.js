const mongoose = require('mongoose');

var TravelSchema = new mongoose.Schema({
  usuario:{
    type: String,
    required: true
  },
  vehiculo: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicles' },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFinal: Date,
  estado: {
    type: String,
    default: 'iniciado'
  },
  idPublic: {
    type: mongoose.Schema.Types.ObjectId,
    unique:true,
    index: true
  },
  localizacionGeoInicio: {
    lat: Number,
    long: Number
  },
  localizacionGeoFinal: {
    lat: Number,
    long: Number
  },
  localizacionGeo: Array,
  favorito: {
    type: Boolean,
    default: false
  },
  importe: {
    moneda: {
      type: String,
      default: 'EUR'
    },
    cuantia: Number,
    estado: {
      type: Boolean,
      default: false
    } // True: pagado, False: aun no pagado
  },
  distanciaRecorrida: Number
});


module.exports = mongoose.model('Travel', TravelSchema);
