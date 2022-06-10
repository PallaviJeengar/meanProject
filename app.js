var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./swagger.json");

var app = express();

const winston=require('./utils/winston');
// app.use(logger('combined', { stream: winston.stream }));
winston.log("error","hello");

// console.log(swaggerJsdoc(swaggerDocument));

//swagger
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerJsdoc(swaggerDocument))
);


var indexRouter = require('./routes/index');

const userRoutes=require('./routes/users');
const bookRoutes=require('./routes/books');
const db=require('./config');
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRoutes);
app.use('/books',bookRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
