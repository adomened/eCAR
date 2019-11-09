const mongoose = require('mongoose');
const crypto = require('crypto'); // Se ha incorporado a vanilla Nodejs
const bcrypt = require('bcrypt-nodejs');
const Statistic = require("./Statistic");
const YEAR_START_BUSINESS = 2017;

/*
cliente -> 636c69656e7465
administrador -> 61646d696e6973
tecnico -> 7465636e69636f
*/

var UserSchema = new mongoose.Schema({
  nickname: { type:String, unique:true, index: true },
  email: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  validado: { type: Boolean, default: false },
  enProcesoDeValidacion: { type: Boolean, default: false },
  carnet: Array,
  passwordResetToken: String,
  passwordResetExpires: Date,
  facebook: String,
  twitter: String,
  google: String,
  instagram: String,
  github: String,
  tokens: Array,
  activo:{ type: Boolean, default: false },
  activoToken:String,
  activoExpires:Date,
  profile: {
    name: String,
    surname: String,
    department: String,
    rol_id: { type:String, default:'636c69656e7465' },
    gender: String, // Buscar enum en Mongoose
    birth: Date,
    domicilio: String,
    planta: String,
    puerta: String,
    provincia: String,
    localidad: String,
    cp: String,
    picture: String
  },
  stats: {
    travels: { type: Number, default: 0 },
    avgKilometres: { type: Number, default: 0 },
    avgAmount: { type: Number, default: 0 }
  },
  reservaActiva: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicles' }
}, { timestamps: true });

/*
TODO Añadir otra propiedad al Scheme para cuando un token expire el usuario pueda volver a iniciar el
proceso de registro. Actualmente seria rechazo tal proceso al intentar un registro con el mismo correo
electronico
*/

UserSchema.post('remove', function(user, next) {
  let stats = new Statistic()
  stats.updateStats('baja_usuarios', function(err){
    if(err) { return next(err) }
    next()
  })
});

UserSchema.pre('save', function(next) {
  try {
    if (this.isDirectModified('activo')) {
      let stats = new Statistic()
      stats.updateStats('activo_usuarios', function(err){
        if(err) { next(err) }
      })
    }
    next()
  }
  catch(error) {
    console.error(error);
  }
});

UserSchema.pre('save', function(next) {
  if (this.isDirectModified('validado')) {
    let stats = new Statistic()
    stats.updateStats('validado_usuarios', function(err){
      if(err) { next(err) }
    })
  }
  next()
});

UserSchema.pre('save', function (next) {
    var user = this;

    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

/**
 * Helper method for getting user's gravatar.
 */
UserSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

module.exports = mongoose.model('User', UserSchema);
