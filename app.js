var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);



var mongo = require('mongodb').MongoClient;
//var url = '192.168.1.10:27000'
var url = 'mongodb://192.168.1.10:27000/test';
mongo.connect(url, function(err, db) {
    if (err) console.log('DB Error');

    console.log("Connected correctly to server");

    var col = db.collection('test');

    col.insert([{a:1, b:1}, {a:2, b:2}, {a:3, b:3} , {a:4, b:4}], {w:1}, function(err, result) { });

    setTimeout( function () { 
      col.find({}).toArray(function(err, items) {
        console.log(items); 
      });
    });

    
//    for (property in db) { 
//      console.log(property);
//    }

//    var c = db.collection('test');

//    c.insert({b: 'chickin butt'});

//    setTimeout( function () { 
//      c.find({}, function (a) { 
//        console.log(a);
//      });
//    }, 100);
//    db.collection.insert({"granny":"fanny"})


    setTimeout( function () { db.close() }, 5000);
});








// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
