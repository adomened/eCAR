const express = require('express');
const router = express.Router();
const passport = require('passport');
const filesController = require('../controllers/filesController');
/**
 * API keys and Passport configuration. CONFIGURACION DE LA ESTRATEGIA (y API keys)
 * Antes de solicitar a Passport que autentique una solicitud, debe configurarse
 * la estrategia (o estrategias) utilizada por la aplicación.
 */
const passportConfig = require('../config/passport');

router.post('/add', passport.authenticate('jwt', { session: false}), filesController.enProcesoDeValidacion, filesController.uploadMulter.single('file'), filesController.sendUploadToGCS, filesController.add);

router.post('/upload', passport.authenticate('jwt', { session: false}), filesController.uploadMulter.single('file'), filesController.upload);

module.exports = router;
