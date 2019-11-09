const { promisify } = require('util');
const crypto = require('crypto');
const randomBytesAsync = promisify(crypto.randomBytes);
const mongoose = require('mongoose');
const User = require("../models/User");
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const settings = require('../config/settings');

/**
 * GET /resetear/:token
 * Se comprueba si se puede realizar el cambio de contraseña
 */
exports.getReset = (req, res, next) => {
  User
    .findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .exec((err, user) => {
      if (err) { return next(err); }
      if (!user) {
        return res.json({ success: false, msg: 'El token asociado al reseteo de la contraseña es invalido o ha expirado' });
      }
      res.status(200).json({ success: true, email:user.email, msg: 'El token asociado al reseteo de la contraseña es valido' });
    });
};

/**
 * POST /resetear/:token
 * Cambia la contraseña del usuario.
 */
exports.postReset = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const resetPassword = () =>
    User
      .findOne({ passwordResetToken: req.params.token })
      .where('passwordResetExpires').gt(Date.now())
      .then((user) => {
        if (!user) {
          return Promise.reject({ toClient: true, msg: 'El token asociado al reseteo de la contraseña es invalido o ha expirado' })
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        return user.save();
      });

  const sendResetPasswordEmail = (user) => {
    if (!user) { return; }
    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: 'do-not-reply@ecar-uned.herokuapp.com',
      subject: 'Su contraseña en eCAR ha sido cambiada con exito',
      text: `Hola,\n\n Esto es una confirmación de que la constraseña asociada a la cuenta ${user.email} acaba de ser cambiada con exito.\n`
    };
    return transporter.sendMail(mailOptions)
      .then(() => {
        res.status(200).json({ success: true, msg: 'Su contraseña ha sido cambiada con exito. Inicie sesion con esta nueva contraseña' });
      });
  };

  resetPassword()
    .then(sendResetPasswordEmail)
    .catch(error => {
      if (error.toClient) return res.json({ success: false, msg: error.msg });
      next(error);
    });
}

/**
 * POST /forgot-password
 * Crea un token random, entonces envia un correo electronico con un enlace
 */
exports.forgotPassword = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const createRandomToken = randomBytesAsync(32)
    .then(buf => buf.toString('hex'));

  const setRandomToken = token =>
    User
      .findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return Promise.reject({ toClient: true, msg: 'No existe una cuenta asociada al email facilitado' })
        } else {
          user.passwordResetToken = token;
          user.passwordResetExpires = Date.now() + 3600000; // 1 hour
          user = user.save()
        }
        return user;
      });

  const sendForgotPasswordEmail = (user) => {
    if (!user) { return; }
    const token = user.passwordResetToken;
    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: 'do-not-reply@ecar-uned.herokuapp.com',
      subject: 'Su solicitud de reseteo de su contraseña',
      text: `Has recibido este correo electronico porque has solicitado el cambio para tu contraseña.
        Por favor haz clic en el siguiente enlace para completar el proceso de cambio de contraseña: \n\n
        https://${req.headers.host}/resetear/${token}\n\n
        Si no ha solicitado el cambio de contraseña, por favor, ignore este mensaje.\n
        Reciba un cordial y afectuso saludo.\n
        Antonio.`
    };
    return transporter.sendMail(mailOptions)
      .then(() => {
        res.status(200).json({ success: true, msg: `Un email ha sido enviado a ${user.email} con las instrucciones pertinentes` });
      });
  };

  createRandomToken
    .then(setRandomToken)
    .then(sendForgotPasswordEmail)
    .catch(error => {
      if (error.toClient) return res.json({ success: false, msg: error.msg });
      next(error);
    });
}

/**
 * POST /register
 * Crea un token random, entonces envia un correo electronico con un enlace
 */
exports.register = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  if (!req.body.privacidad) {
    return res.status(422).json({ errors: [{ msg: 'Debe aceptar la politica de privacidad' }]});
  }

  const createRandomToken = randomBytesAsync(32)
    .then(buf => buf.toString('hex'));

  const sendActivateAccountEmail = (user) => {
    if (!user) { return; }
    const token = user.activoToken;
    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: 'do-not-reply@ecar-uned.herokuapp.com',
      subject: 'Activar tu cuenta en ecar-uned',
      text: `Gracias por registrarte en nuestra web. Esperamos darte nuestro mejor servicio siempre que lo necesites.
        Por favor haz clic en el siguiente enlace para completar el proceso de registro: \n\n
        https://${req.headers.host}/activar/${token}\n\n
        Si no ha solicitado tal proceso, por favor, ignore este mensaje.\n
        Reciba un cordial y afectuso saludo.\n
        Antonio.`
    };
    return transporter.sendMail(mailOptions)
      .then(() => {
        res.json({success: true, msg: `Un email ha sido enviado a ${user.email} con las instrucciones pertinentes`});
      });
  };

  const setRandomToken = token => {
    const newUser = new User({
      password: req.body.password,
      email: req.body.email,
      nickname: req.body.email,
      activoToken: token,
      activoExpires: Date.now() + 3600000, /*1 hour*/

    });
    return newUser.save() // retorna Promise si usamos save sin pasarle un callback
  }

  createRandomToken
    .then(setRandomToken)
    .then(sendActivateAccountEmail)
    .catch(function(error){
      if(error.code === 11000){
        res.json({ success: false, msg: 'El correo electrónico utilizado ya se encuentra en uso'})
      } else {
        next(error);
      }
    });

}

/**
 * POST /login
 * Se comprueba que exista una cuenta con ese email, entonces se comprueba la igualdad en la contraseña
 */
exports.login = (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err){
      throw err;
    }

    if (!user) {
      res.status(401).send({success: false, msg: 'Autenticación fallida. Usuario no encontrado'});
    } else {
      if(!user.activo){
        return res.status(401).send({success: false, msg: `Autenticación fallida. Se le envió un correo a
          ${user.email} con las instrucciones necesarias para activar su cuenta`});
      }
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token, rol_id: user.profile.rol_id});
        } else {
          res.status(401).send({success: false, msg: 'Autenticación fallida. Contraseña incorrecta'});
        }
      });
    }
  });
}

/**
 * Aplana la entrada
 */
exports.plainEntries = (req, res, next) => {
  let obj = {...req.body[0], ...req.body[1], ...req.body[2], ...req.body[3]}
  req.body = obj
  console.log(req.body);
  next()
}

/**
 * Se comprueba que existan todos los campos requeridos
 */
exports.checkEntries = (req, res, next) => {
  let requireContain = ['genero', 'apellidos', 'nombre', 'fecha', 'localidad', 'domicilio', 'provincia', 'cp']
  let keys = req.body.map(function(fields) {
    return Object.keys(fields);
  }).reduce((acc, val) => acc.concat(val), []);

  keys = requireContain.map(function(value) {
    if (keys.includes(value)) return true
    return val;
  })

  if (keys.every(x => x === true))
    return next()
  else return res.status(500).json({success: false, msg: 'No se han facilitado los campos requeridos(*)' });
}

/**
 * Se comprueba que la disponibilidad del nickname del usuario
 */
exports.checkNickname = (req, res, next) => {
  let apodo = req.body[0].apodo
  if (/^(?!\d)(?:(?![@# ])[a-zñ_à-ÿ\d]{6,})+$/.test(apodo) && apodo !== undefined)
    return next();
  else
    return res.status(500).json({success: false, msg: 'El formato de apodo no es correcto' });
}

/**
 * Se comprueba que la disponibilidad del nickname del usuario
 */
exports.disponible = (req, res) => {
  if (/^(?!\d)(?:(?![@# ])[a-zñ_à-ÿ\d]{6,})+$/.test(req.body.apodo) && req.body.apodo !== undefined)
    User
      .findOne({ nickname: req.body.apodo })
      .exec((err, user) => {
        if (err) { return next(err); }
        if (!user) {
          return res.json({success: true, msg: 'El apodo esta disponible para usar'});
        }
        res.status(500).json({success: false, msg: 'El apodo no esta disponible' });
      });
    else
      return res.status(500).json({success: false, msg: 'El formato de apodo no es correcto. ' +
      '(minimo 6 caracteres, en miniscúlas, sin numeros de inicio y sin caracteres especiales)' });
}

/**
 * GET /activar/:token
 * Se comprueba si se puede activar la cuenta
 */
exports.getActivar = (req, res) => {
  let query = User.findOne({ activoToken: req.params.slug })
  query.where('activoExpires').gt(Date.now())
    .exec((err, user) => {
      if (err) { return next(err); }
      if (!user) {
        return res.json({ success: false, msg: `El token facilitado no es valido o ha expirado. Lo sentimos,
          debe volver a iniciar el proceso de registro.` });
      }
      res.json({ success: true, msg: 'El token facilitado es valido y puedes activar tu cuenta', email: user.email });
    });
}

/**
 * POST /activar/:token
 * Se activa y se completan los atributos de la instancia del modelo User
 */
exports.postActivar = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const saveUser = () =>
    User
      .findOne({ activoToken: req.params.slug })
      .where('activoExpires').gt(Date.now())
      .then((user) => {
        if (!user) {
          return Promise.reject({ toClient: true, msg: 'El token facilitado no es valido o ha expirado' })
        }
        user.activo = true;
        user.activoToken = undefined;
        user.activoExpires = undefined;
        user.profile.gender = req.body.genero;
        user.profile.surname = req.body.apellidos;
        user.profile.name = req.body.nombre;
        user.nickname = req.body.apodo
        user.profile.birth = new Date(req.body.fecha);
        user.profile.localidad = req.body.localidad;
        user.profile.domicilio = req.body.domicilio;
        user.profile.planta = req.body.planta;
        user.profile.puerta = req.body.puerta;
        user.profile.provincia = req.body.provincia;
        user.profile.cp = req.body.cp;
        return user.save()
      });
  saveUser()
    .then((user) => {
      // logIn es un metodo que añade Passport (ej. facebook) al objeto req
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        res.json({success: true, msg: 'El estado de su perfil se ha actualizado con exito. Ya puedes iniciar sesion' });
      });
    })
    .catch(err => {
      if (error.toClient) return res.json({ success: false, msg: error.msg });
      next(err)
    });
}
