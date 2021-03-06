var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var mongoose = require('mongoose');
var Question = require('./Models/Question.js');
var ObjectId = require("mongodb").ObjectId;
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017/questiondb", function(err, client){
  if(err){
    return console.log(err);
  }
  db = client.db("questiondb");
  console.log("Connected to DB");
  app.listen(3001, function () {
  console.log("App running on port " + this.address().port);
  });
});

app.get('/', function(req, res){
  res.sendFile(__dirname + "client/src/app.js");
});
app.get("/questions", function(req, res){
  db.collection("questions").find().toArray(function(err, results){
	  if(err){
		return console.log(err);
	  }
	  res.json(results);
	});
});

app.post("/new-question", function(req, res){
  var newQuestion = new Question(req.body);
  db.collection("questions").save(newQuestion, function(err, result){
		if(err) {
			console.log(err);
		}
		console.log("Saved to database.");
		res.json('ok');
	});
});

//delete all
app.delete("/questions/delete", function(req, res){
  db.collection("questions").remove(function(err, result){
    if(err){
      console.log(err);
    }
    console.log("Deleted all");
  });
});

//delete by id

app.delete("/questions/delete/:id", function(req, res){
  console.log('hit the delete by id route');
  db.collection("questions").remove({"_id": ObjectId(req.params.id)}, function(err, result){
    if(err){
      console.log(err);
      console.log("deleting didn't work");
    }
    console.log("deleted individual successfully");
  });
});


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
