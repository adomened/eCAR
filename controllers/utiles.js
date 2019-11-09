/*EL usuario debe ser un usuario con el rol de cliente o rol_id igual a 636c69656e7465*/
// TODO:  Mirar el protocolo para mejorar estas descripciones
exports.customerOnly = (req, res, next) => {
 let user = req.user;
 if(user.profile.rol_id ==='636c69656e7465')
   return next();
 res.status(303).json({ msg:'unauthorized' });
}

/*EL usuario debe ser un usuario con el rol de administrador o rol_id igual a 61646d696e6973*/
exports.adminOnly = (req, res, next) => {
  let user = req.user;
  if(user.profile.rol_id ==='61646d696e6973')
    return next();
  next('route');
}

/*EL usuario debe ser un usuario con el rol de tecnico o rol_id igual a 7465636e69636f*/
exports.techOnly = (req, res, next) => {
  let user = req.user;
  if(user.profile.rol_id ==='7465636e69636f')
    return next();
  next('route');
}

/*EL usuario debe ser un usuario con el rol de tecnico o administrador*/
exports.techAndAdmin = (req, res, next) => {
  let user = req.user;
  if(user.profile.rol_id ==='7465636e69636f' || user.profile.rol_id ==='61646d696e6973')
    return next();
  next('route'); // TODO mas info. Arroja un error interno 500 cuando llama a next('route');
}

// function employeeOnly(req, res, next){
//  var user = req.session.passport.user;
//  if(user && req.role==='employee') return next();
//  next('route');
// }
