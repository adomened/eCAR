const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');
const utiles = require('../controllers/utiles');
const profileController = require('../controllers/profileController');
const { body } = require('express-validator/check');

router.post('/close-query', passport.authenticate('jwt', { session: false }), utiles.customerOnly, profileController.closeQuery);

router.post('/new-interaction', passport.authenticate('jwt', { session: false }), utiles.customerOnly, [
  body('titulo')
    .isLength({ min: 3, max: 50 }).withMessage('El campo titulo debe tener minimo de 3 caracteres, maximo 50.'),
  body('contenido')
    .isLength({ min: 3, max: 250 }).withMessage('El campo contenido debe tener minimo de 3 caracteres, maximo 250.')
], profileController.newInteraction);

router.post('/new-query', passport.authenticate('jwt', { session: false }), utiles.customerOnly, [
  body('titulo')
    .isLength({ min: 3, max: 50 }).withMessage('El campo titulo debe tener minimo de 3 caracteres, maximo 50'),
  body('contenido')
    .isLength({ min: 3, max: 250 }).withMessage('El campo contenido debe tener minimo de 3 caracteres, maximo 250')
], profileController.newQuery);

router.get('/queries', passport.authenticate('jwt', { session: false }), utiles.customerOnly, profileController.queries);

router.get('/vehicle', passport.authenticate('jwt', { session: false}), utiles.customerOnly, profileController.vehicle);

router.post('/remove-travel', passport.authenticate('jwt', { session: false }), utiles.customerOnly, profileController.removeTravel);

router.post('/subtract-favorite-travel', passport.authenticate('jwt', { session: false }), utiles.customerOnly, profileController.subtractFavoriteTravel);

router.post('/add-favorite-travel', passport.authenticate('jwt', { session: false }), utiles.customerOnly, profileController.addfavoriteTravel);

router.get('/travels', passport.authenticate('jwt', { session: false }), utiles.customerOnly, profileController.travels);

router.get('/travel', passport.authenticate('jwt', { session: false }), utiles.customerOnly, profileController.travel);

router.post('/pay-travel', passport.authenticate('jwt', { session: false }), utiles.customerOnly, profileController.payTravel);

router.post('/start-travel', passport.authenticate('jwt', { session: false }), utiles.customerOnly, profileController.bypassViajeIniciado, profileController.startTravel);

router.post('/current-travel', passport.authenticate('jwt', { session: false }), utiles.customerOnly, profileController.currentTravel);

router.get('/finish-travel', passport.authenticate('jwt', { session: false }), utiles.customerOnly, profileController.finishTravel);

router.get('/', passport.authenticate('jwt', { session: false }), utiles.customerOnly, profileController.root);

router.post('/update-password', passport.authenticate('jwt', { session: false }), [
  body('passActual')
    .isLength({ min: 6 }).withMessage('El campo contraseña actual tiene minimo 6 caracteres.')
    .custom((value, { req }) => value !== req.body.passNuevo).withMessage('La nueva contraseña y la contraseña actual no tiene sentido que coincidan.'),
  body('passNuevo')
    .isLength({ min: 6 }).withMessage('El campo nueva contraseña debe tener un minimo de 6 caracteres.')
    .custom((value, { req }) => value === req.body.confirmPassNuevo).withMessage('Las contraseñas nuevas no coinciden.')
], utiles.customerOnly, profileController.updatePassword);

router.get('/delete', passport.authenticate('jwt', { session: false }), utiles.customerOnly, profileController.delete);

router.post('/update-user', passport.authenticate('jwt', { session: false }), [
  body('userName')
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).withMessage('El campo nombre debe contener solo letras.')
    .isLength({ min: 4, max: 15 }).withMessage('El campo nombre debe tener minimo de 4 caracteres, maximo 15.'),
  body('userSurname')
    .matches(/^(?!\d)[a-zA-ZñÑ ]+$/).withMessage('Formato del campo apellidos no es adecuado.')
    .isLength({ min: 4, max: 40 }).withMessage('El campo apellidos debe tener minimo de 4 caracteres, maximo 40.'),
  body('userGender')
    .isIn(['Masculino','Femenino'])
    .withMessage('El campo genero debe ser uno de los valores predeterminados.'),
  body('userBirth')
    .matches(/[\d]{4}-[\d]{2}-[\d]{2}/)
    .withMessage('El campo fecha no tiene el formato adecuado.'),
  body('userLocalidad')
    .isAlpha().withMessage('El campo localidad debe contener solo letras.')
    .isLength({ min: 3, max: 20 }).withMessage('El campo localidad debe tener minimo de 3 caracteres, maximo 20.'),
  body('userDomicilio')
    .matches(/^(?!\d)[a-zA-ZñÑ ,\d]{3,}$/).withMessage('El campo domicilio no tiene el formato adecuado.')
    .isLength({ max: 40 }).withMessage('El campo domicilio debe tener minimo de 3 caracteres, maximo 40.'),
  body(['planta','puerta'])
    .isLength({ max: 3 })
    .withMessage('Los campos adjuntos al domicilio debe tener maximo 3 caracteres.'),
  body('userProvincia')
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).withMessage('El campo provincia debe contener solo letras.')
    .isLength({ min: 3, max: 20 }).withMessage('El campo provincia debe tener minimo de 3 caracteres, maximo 20.'),
  body('userCP')
    .isPostalCode('ES')
    .withMessage('El campo cp debe ser un codigo postal valido.')
], utiles.customerOnly, profileController.saveUser);

module.exports = router;
