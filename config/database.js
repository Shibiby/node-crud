var mysql = require('mysql');
var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_crud',
    debug: false
  });
var database = module.exports;