var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./models');
var app = express();
const port = process.env.PORT || 3001;


var indexRouter = require('./routes/index');
var jugadoresRouter = require('./routes/jugador');
var representanteRouter = require('./routes/representante');
var contactoRouter = require('./routes/contacto');
var documentoRouter = require('./routes/documentacion');
var transferenciaRouter = require('./routes/transferencia');
var clubRouter = require('./routes/club');

app.use(express.json());
app.use('/', indexRouter);
app.use('/jugadores', jugadoresRouter);
app.use('/representantes', representanteRouter);
app.use('/transferencias', transferenciaRouter);
app.use('/contactos', contactoRouter);
app.use('/documentacion', documentoRouter);
app.use('/club', clubRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor sequelize escuchando en http://localhost:${port}`);
  });
}).catch(err => {
  console.error('No se pudo conectar a la base de datos:', err);
}); 
//error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});






module.exports = app;
