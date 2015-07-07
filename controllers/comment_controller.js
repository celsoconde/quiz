var models = require('../models/models.js');

// GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
  res.render('comments/new', {quizid: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments
exports.create = function(req, res) {
  var comment = models.Comment.build(
    {
      texto: req.body.comment.texto,
      QuizId : req.params.quizId
    });
  var errors = comment.validate();
  if (errors) {
    var i=0;
    var errores = new Array();
    for (var prop in errors) {
      errores[i++] = {message:errors[prop]}
    }
    res.render('comments/new',{comment: comment, quizid: req.params.quizId, errors: errores});
  } else {
    //guarda en DB el campo texto de comment
    comment.save().then(function() {
      res.redirect('/quizes/'+ req.params.quizId); // Redireccion HTTP a lista de preguntas
      })
  }
};
