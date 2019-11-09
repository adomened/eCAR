var express = require('express')
const session = require('express-session')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
const chalk = require('chalk')
const dotenv = require('dotenv')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport');
const lusca = require('lusca'); // Web application security middleware. +INFO https://www.npmjs.com/package/lusca
const history = require('connect-history-api-fallback');

dotenv.load({ path: '.env' })

var profile = require('./routes/profile')
var auth = require('./routes/auth')
var vehicles = require('./routes/vehicles')
var files = require('./routes/files')
var admin = require('./routes/admin')
var app = express()

/**
 * API keys and Passport configuration. CONFIGURACION DE LA ESTRATEGIA (y API keys)
 * Antes de solicitar a Passport que autentique una solicitud, debe configurarse
 * la estrategia (o estrategias) utilizada por la aplicación.
 */
// const passportConfig = require('./config/passport');

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
mongoose.connection.on('error', (err) => {
  console.error(err)
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'))
  process.exit()
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended': 'false'}))

app.use(session({
  resave: true,
  // resave: false,
  saveUninitialized: true,
  // saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
}));
app.use(passport.initialize()); // Passport
app.use(passport.session()); // Passport

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');

/* middleware que puse para consultar el objeto session mantenido en el lado del servidor
app.use((req, res, next) => {
  console.log(JSON.stringify(req.session));
  next();
});
*/

// app.use(express.static(path.join(__dirname, 'dist')));
// app.use('/books', express.static(path.join(__dirname, 'dist')))
app.use(history({
  verbose: true,
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));

app.use(express.static(path.join(__dirname, 'dist'), { maxAge: 31557600000 }))

app.use('/profile', profile)
app.use('/api/auth', auth)
app.use('/vehicles', vehicles)
app.use('/api/files', files)
app.use('/api/admin', admin)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// restful api error handler
app.use(function (err, req, res, next) {
  // console.log('Llamada a next(err): ' + err)

  if (req.app.get('env') !== 'development') {
    delete err.stack
  }

  res.status(err.statusCode || 500).json(err)
})

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'))
  console.log('  Press CTRL-C to stop\n')
})

module.exports = app
