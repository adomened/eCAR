const passport = require('passport');
const authController = require('../controllers/authController');
/**
 * API keys and Passport configuration. CONFIGURACION DE LA ESTRATEGIA (y API keys)
 * Antes de solicitar a Passport que autentique una solicitud, debe configurarse
 * la estrategia (o estrategias) utilizada por la aplicación.
 */
const passportConfig = require('../config/passport');
const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const express = require('express');
const router = express.Router();

router.get('/resetear/:token', authController.getReset);

router.post('/resetear/:token', [
  body('password')
    .isLength({ min: 6 }).withMessage('El campo nueva contraseña debe tener un minimo de 6 caracteres.')
    .custom((value, { req }) => value === req.body.confirmPassword).withMessage('Las contraseñas nuevas no coinciden.')
], authController.postReset);

router.post('/forgot-password', [
  body('email')
    .isEmail().withMessage('Introduzca un correo electronico valido.')
    .normalizeEmail()
], authController.forgotPassword);

router.post('/register', [
  body('email')
    .isEmail().withMessage('Introduzca un correo electronico valido.')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('El campo contraseña debe tener minimo 6 caracteres.')
    .custom((value, { req }) => value === req.body.confirmPassword).withMessage('Las contraseñas no coinciden.'),
  sanitizeBody('privacidad').toBoolean()
], authController.register);

router.post('/login', [
  body('email')
    .isEmail().withMessage('Introduzca un correo electronico valido.')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('El campo contraseña debe tener minimo de 6 caracteres.')
], authController.login);

router.post('/disponible', authController.disponible);

router.get('/activar/:slug', authController.getActivar);

// Funcion/Endpoint/Router para guardar al usuario con sus datos completos
// https://es.stackoverflow.com/questions/81041/expresion-regular-para-validar-letras-con-acentos-y-%C3%B1
// .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g)
router.post('/activar/:slug', authController.checkNickname, authController.checkEntries, authController.plainEntries, [
  body('nombre')
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).withMessage('El campo nombre debe contener solo letras.')
    .isLength({ min: 4, max: 15 }).withMessage('El campo nombre debe tener minimo de 4 caracteres, maximo 15.'),
  body('apellidos')
    .matches(/^(?!\d)[a-zA-ZñÑ ]+$/).withMessage('Formato del campo apellidos no adecuado.')
    .isLength({ min: 4, max: 40 }).withMessage('El campo apellidos debe tener minimo de 4 caracteres, maximo 40.'),
  body('genero')
    .isIn(['Masculino','Femenino'])
    .withMessage('El campo genero debe ser uno de los valores predeterminados.'),
  body('fecha')
    .matches(/[\d]{4}-[\d]{2}-[\d]{2}/)
    .withMessage('El campo fecha no tiene el formato adecuado.'),
  body('localidad')
    .isAlpha().withMessage('El campo localidad debe contener solo letras.')
    .isLength({ min: 3, max: 20 }).withMessage('El campo localidad debe tener minimo de 3 caracteres, maximo 20.'),
  body('domicilio')
    .matches(/^(?!\d)[a-zA-ZñÑ ,\d]{3,}$/).withMessage('El campo domicilio no tiene el formato adecuado.')
    .isLength({ max: 40 }).withMessage('El campo domicilio debe tener minimo de 3 caracteres, maximo 40.'),
  body(['planta','puerta'])
    .isLength({ max: 3 })
    .withMessage('Los campos adjuntos al domicilio debe tener maximo 3 caracteres.'),
  body('provincia')
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).withMessage('El campo provincia debe contener solo letras.')
    .isLength({ min: 3, max: 20 }).withMessage('El campo provincia debe tener minimo de 3 caracteres, maximo 20.'),
  body('cp')
    .isPostalCode('ES')
    .withMessage('El campo cp debe ser un codigo postal valido.')
], authController.postActivar);

module.exports = router;
