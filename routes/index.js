module.exports = function(io) {
	console.log(io);
	var tweetBank = require('../tweetBank');
	var express = require('express');
	var router = express.Router();
	// could use one line instead: var router = require('express').Router();

	router.get('/', function (req, res) {
	  var tweets = tweetBank.list();
	  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
	});

	router.get('/users/:name', function(req, res) {
	  var name = req.params.name;
	  var tweets = tweetBank.find( {name: name} );
	  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: tweets, name: name, showForm: true } );
	});

	router.get('/users/:name/tweets/:id', function(req, res) {
	  var name = req.params.name;
	  var id = Number(req.params.id);
	  var tweets = tweetBank.find( {id: id} );
	  res.render( 'index', { title: 'Twitter.js - Post by '+name, tweets: tweets } );
	});

	router.post('/submit', function(req, res) {
	  var name = req.body.name;
	  var text = req.body.text;
	  tweetBank.add(name, text);
	  var id = tweetBank.length + 1;
	  io.sockets.emit('new_tweet', { name: name, text: text, id: id });
	  // res.redirect('/');
	});


	return router;
};