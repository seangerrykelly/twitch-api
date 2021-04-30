var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');
const API = require('./lib/API');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var topGamesRouter = require('./routes/topGames');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/topGames', topGamesRouter);


//Get data on game with specified ID
app.get('/getGames/:id', (request, response) => {
  let id = request.params.id

  axios.get("https://api.twitch.tv/helix/games?id=" + id, {
        headers: API.headers()
    })
    .then((res) => {
        //response.json(res.data);
        console.log(res.data.data);
        response.send(res.data.data);
    })
    .catch((error) => {
        console.log(error);
    })
})

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
