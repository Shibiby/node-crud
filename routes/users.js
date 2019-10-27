var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const passport = require('passport');

var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_crud',
    debug: false
  });

/* Show Register Page. */
router.get('/register', function(req, res, next) {
 res.render('register');
});

//Add User

router.post('/register', function(req, res, next) { 
    db.query('INSERT INTO users SET ?', req.body, function (err, rs) {
      res.send('insert success');
    });
  });

  //login
  router.get('/login', function(req, res, next){
    res.render('login');
  });

module.exports = router;
