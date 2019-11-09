const passport = require('passport');
const adminController = require('../controllers/adminController');
/**
 * API keys and Passport configuration. CONFIGURACION DE LA ESTRATEGIA (y API keys)
 * Antes de solicitar a Passport que autentique una solicitud, debe configurarse
 * la estrategia (o estrategias) utilizada por la aplicación.
 */
const passportConfig = require('../config/passport');
const { body } = require('express-validator/check');
const express = require('express');
const router = express.Router();
const utiles = require('../controllers/utiles');


router.get('/admin-get-sidebar', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.adminGetSidebar);

router.get('/search-employee-bynombre', passport.authenticate('jwt', { session: false }), utiles.adminOnly, adminController.searchEmployeebynombre);

router.get('/search-employee-bynickname', passport.authenticate('jwt', { session: false }), utiles.adminOnly, adminController.searchEmployeebynickname);

router.get('/search-employee-byemail', passport.authenticate('jwt', { session: false }), utiles.adminOnly, adminController.searchEmployeebyemail);

router.get('/search-nicknames', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.searchNicknames);

router.get('/search-customer-bynombre', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.searchCustomerbynombre);

router.get('/search-customer-bynickname', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.searchCustomerbynickname);

router.get('/search-customer-byemail', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.searchCustomerbyemail);

router.get('/search-payments', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.searchPayments);

router.get('/search-vehicles-bymarca', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.searchVehiclesbymarca);

router.get('/search-vehicles-bylocalizacion', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.searchVehiclesbylocalizacion);

router.get('/search-vehicles-bymatricula', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.searchVehiclesbymatricula);

router.get('/search-vehicles-byidentificador', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.searchVehiclesbyid);

router.get('/search-vehicles-bycarga', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.searchVehiclesbycarga);

router.get('/search-messages', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.searchMessages);

router.post('/admin-new-query', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, [
  body('titulo')
    .isLength({ min: 3, max: 50 }).withMessage('El campo titulo debe tener minimo de 3 caracteres, maximo 50.'),
  body('contenido')
    .isLength({ min: 3, max: 250 }).withMessage('El campo contenido debe tener minimo de 3 caracteres, maximo 250.')
], adminController.adminNewQuery);

router.post('/admin-new-interaction', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, [
  body('titulo')
    .isLength({ min: 3, max: 50 }).withMessage('El campo titulo debe tener minimo de 3 caracteres, maximo 50.'),
  body('contenido')
    .isLength({ min: 3, max: 250 }).withMessage('El campo contenido debe tener minimo de 3 caracteres, maximo 250.')
], adminController.adminNewInteraction);

router.post('/pay-travel', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.payTravel);

router.post('/validate-customer', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.validateCustomer);

router.post('/delete-user', passport.authenticate('jwt', { session: false }), utiles.adminOnly, adminController.deleteUser);

router.post('/delete-query', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.deleteQuery);

router.post('/delete-customer', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.deleteCustomer);

router.post('/delete-vehicle', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.deleteVehicle);

router.post('/open-incidence', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.openIncidence);

router.post('/change-rented', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.changeRented);

router.post('/change-available', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.changeAvailable);

router.post('/close-incidence', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.closeIncidence);

router.get('/tasa-alquiler-2018', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.tasaAlquiler2018);

router.get('/tasa-alquiler-2017', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.tasaAlquiler2017);

router.get('/tendencia-clase-2017', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.tendenciaClase2017);

router.get('/tendencia-clase-2018', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.tendenciaClase2018);

router.get('/get-stats', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.getStats);

router.get('/update-ingresos-anuales', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.updateIngresosAnuales);

router.get('/update-alta-usuarios', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.updateAltaUsuarios);

router.post('/update-user', passport.authenticate('jwt', { session: false }), utiles.adminOnly, adminController.updateUser);

router.get('/admin-get-perfil', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.adminGetPerfil);

router.post('/status-query', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.statusQuery);

router.post('/change-status-query', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.changeStatusQuery);

router.get('/admin-random-messages', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.adminRandomMessages);

router.post('/update-customer', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.updateCustomer);

router.post('/update-vehicle', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.updateVehicle);

router.post('/new-user', passport.authenticate('jwt', { session: false }), utiles.adminOnly, adminController.newUser);

router.post('/new-vehicle', passport.authenticate('jwt', { session: false }), utiles.techAndAdmin, adminController.newVehicle);

module.exports = router;
