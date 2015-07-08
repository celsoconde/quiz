//MW de autorizacion de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
  if(req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};
//Get /login --Formulario dde login
exports.new = function(req, res){
  var errors = req.session.errors || {};
  req.session.errors = {};

  res.render('sessions/new' , {errors: errors});
};

//POST /login --Crear sesion
exports.create = function(req, res){
  var login = req.body.login;
  var password = req.body.password;

  var useController = require('./user_controller');
  useController.autenticar(login, password, function(error, user) {
    if (error) {  //si hay error retornamos mensajes de error de la sesion
      req.session.errors = [{"message":'Se ha producido un error: ' + error}];
      res.redirect('/login');
      return;
    }
    //Crear req.session.user y guardar campos id y username
    //la sesion se define por la existencia de: req.session.user
    req.session.user = {id:user.id, username:user.username};
    res.redirect(req.session.redir.toString());
  });
};

//DELETE /logout --Derstruir sesion
exports.destroy = function(req, res){
    delete req.session.user;
    res.redirect(req.session.redir.toString());
};
