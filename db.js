const mysql = require('mysql2');
// var express = require('express');


const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'feb'
});
// const app =express();
db.connect((err) => {
  if (err) {
    console.error('Error conectándose a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos como ID ' + db.threadId);
});



module.exports = db;
