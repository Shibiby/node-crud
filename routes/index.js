var express = require('express');
var router = express.Router();
var path = require('path');

var mysql = require('mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_crud',
  debug: false
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testconnection', function(req, res, next) {
  if (db != null) {
      res.send('Database Connected Successfully');
  } else {
    res.send('Failed to Connect to Database');
  }
});

//show data
router.get('/select', function(req, res, next) {
  db.query('SELECT * FROM tb_book', function (err, rs) {
    res.render('select', { books: rs});
  });
});

//insert data
router.get('/form', function(req, res, next) {
res.render('form', { book: {} });
});

router.post('/form', function(req, res, next) { 
  db.query('INSERT INTO tb_book SET ?', req.body, function (err, rs) {
   res.redirect('/form');
   
  });
});

//delete data
router.get('/delete', function (req, res, next) {
  db.query('DELETE FROM tb_book WHERE id = ?', req.query.id, function (err, rs) {
    res.redirect('/select');
  });
});

//edit data
router.get('/edit', function (req, res, next) {
  db.query('SELECT * FROM tb_book WHERE id = ?', req.query.id, function (err, rs) {
    res.render('form', { book: rs[0] });
  })
});

router.post('/edit', function (req, res, next) {
  var param = [
    req.body, //data for update
    req.query.id //condition for update
  ]
  db.query('UPDATE tb_book SET ? WHERE id = ?' , param, function (err, rs) {
    res.redirect('/select');
  });
});


module.exports = rout