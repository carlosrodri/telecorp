//import getJson from '../logic/ClientLogin.js';

const express = require('express');
const server = express();
const fs = require('fs');
const login = require('../logic/ClientLogin.js');

var mysql = require('mysql');

var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database : 'telecorp',
	  port: 3306
	});
const fileManager = require('../logic/telecorpLogic.js');

server.get('/', (req, res) => {
    res.send('Hola mundo cómo estás?');
    createUser();
});

con.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");
	  
	});

var query = con.query('insert into detallefactura (id) values (?)' , [3], (error, res)=>{
	if (error) {
		console.log(error);
	}else {
		console.log('agregado');
	}
});

var createUser = function(){
	var list = login.json();
	console.log(list);
	var aux = list.split("\r\n");
	var user;
	for (var i = 0; i < aux.length; i++) {
		   user = aux[i].split("|");
		   con.query('insert into users (cuenta, nombre, contrasena) values (?, ?, ?)' , [user[0], user[1], user[2]], (error, res)=>{
				if (error) {
					console.log(error);
				}else {
					console.log('agregado');
				}
			});
		}
	console.log(aux);
}

/*server.get('/file', (req, res) => {
    fs.readFile('../Files/detalle_factura.txt', 'utf-8',(error, filecontent) => {
        if (error) {
            throw error;
        } else {
        	res.send(filecontent);
            return filecontent;
        }
    });
})*/

server.listen(3000, ()=>{
    console.log('servidor en el puerto 3000 arriba');
});