const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const { Strategy: FacebookStrategy } = require('passport-facebook');

// load up the user model
var User = require('../models/User');
var settings = require('../config/settings'); // get settings file

passport.serializeUser((user, done) => {
  done(null, user.id);
  // El _id se registra directamente en la session (pero no es la cookie ID que ve el usuario en su navegador)
  // La cookie ID se firma con la propiedad secret del middleware de Session para detectar cualquier modificacion ulterior
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => { // Se trata de _id que identifica al documento en mongodb
    done(err, user);
  });
});


var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = settings.secret;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  // En nuestro caso jwt_payload es el objeto usuario cargado en la base de datos (con lo que se contruyó el token)
  // console.log('\n id del usuario: ' + JSON.stringify(jwt_payload._id) + '\n\n' + JSON.stringify(jwt_payload) + '\n\n');
  User.findOne({_id: jwt_payload._id}, function(err, user) {
        if (err) {
          // console.log('hola');
          return done(err, false);
        }
        if (user) {
          // console.log('usuario: ' + JSON.stringify(user));
          done(null, user);
        } else {
          // console.log('hola2');
          done(null, false);
        }
    });
}));


/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: `${process.env.BASE_URL}/api/auth/facebook/callback`, /* app.get('/auth/facebook/callback', passport.authenticate('face ... (En app.js) */
  profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'gender'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    User.findOne({ facebook: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        console.log('There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.');
        // Establecer un registro en la base de datos de errores con estos datos de arriba
        //req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken });
          user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.save((err) => {
            console.log('Facebook account has been linked.');
            //req.flash('info', { msg: 'Facebook account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ facebook: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        console.log('Existing user');
        req.session.returnTo = "algo";
        //req.flash('info', { msg: 'Existing user' });
        return done(null, existingUser);
      }
      User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
          console.log('There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.');
          //req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
          done(err);
        } else {
          const user = new User();
          user.email = profile._json.email;
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken });
          user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
          user.profile.gender = profile._json.gender;
          user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.profile.location = (profile._json.location) ? profile._json.location.name : '';
          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }
}));

/**
 * Login Required middleware. (Para requerir que el usuario este logeado)
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { // Es un metodo que adjunta Express al objeto Request
    return next();
  }
  res.redirect('/login');
};

/**
 * Authorization Required middleware. (Verifica la autorizacion del usuario)
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0]; // TODO: Quiza deba que cambiar esto para que no dependa del path pasado por el usuario
  console.log("provider: " + provider);
  const token = req.user.tokens.find(token => token.kind === provider);
  console.log("token: " + token);
  if (token) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
