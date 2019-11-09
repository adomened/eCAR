const mongoose = require('mongoose');

var Interaction = new mongoose.Schema({
  fechaIN: Date,
  mensajeIN: String,
  mensajeOUT: String,
  fechaOUT: Date,
});

var QuerySchema = new mongoose.Schema({
  usuario:{
    type: String,
    required: true
  },
  children: [Interaction],
  enProcesoRespuesta: {
    type: Boolean,
    default: false
  },
  enProcesoRespuestaAuth: String,
  enTramite: {
    type: Boolean,
    default: false
  },
  etiqueta: String, // or label (referencia a una instancia del modelo Travel)
  titulo: {
    type: String,
    required: true
  },
  cerrada: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Query', QuerySchema);
