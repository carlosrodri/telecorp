//import getJson from '../logic/ClientLogin.js';

const express = require('express');
const server = express();
const fs = require('fs');
const login = require('../logic/ClientLogin.js');
const servicio = require('../logic/Servicios.js');
const serv_tec = require('../logic/ServicioTecnico.js');
const lug = require('../logic/Lugares.js');
const atencion = require('../logic/AtencionUsuario.js');
const det_factura = require('../logic/Detalles.js');

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
	//createUser();
	//createServicios();
	//createServicioTecnico();
	//createLugares();
	//createAtencionUsuario();
	createDetalles();
	//toDate("Nov 02/19");
});



con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");

});

/**
 * leer el archivo de servicios y poblacion de la BD
 */
var createServicios = function(){
	var list = servicio.readServicios();
	var aux = list.split("\r\n");
	var user;
	for (var i = 0; i < aux.length; i++) {
		user = aux[i].split("|");
		con.query('insert into servicio (cuenta, tv, internet,telefonofijo,movil, largadistancia,revista) values (?, ?, ?, ?, ?, ?, ?)' , [user[0], user[1], user[2],user[3],user[4],user[5],user[6]], (error, res)=>{
			if (error) {
				console.log(error);
			}else {
				console.log('agregado');
			}
		});
	}
};

/**
 * leer el archivo de lugares y poblacion de la BD
 */
var createLugares = function(){
	var list = lug.readLugares();
	var aux = list.split("\r\n");
	var user;
	for (var i = 0; i < aux.length; i++) {
		user = aux[i].split("|");
		con.query('insert into lugares (nombre) values (?)' , [user[0]], (error, res)=>{
			if (error) {
				console.log(error);
			}else {
				console.log('agregado');
			}
		});
	}
};


/**
 * leer el archivo de servicios tecnicos y poblacion de la BD
 */
var createServicioTecnico = function(){
	var list = serv_tec.readServicioTecnico();
	var aux = list.split("\r\n");
	var user;
	for (var i = 0; i < aux.length; i++ ) {
		user = aux[i].split("|");
		for (var j = 1; j < user.length; j += 2) {
			con.query('insert into servicio_tecnico (cuenta, nombre_servicio, costo) values (?, ?, ?)' , [user[0], user[j], user[j+1]], (error, res)=>{
				if (error) {
					console.log(error);
				}else {
					console.log('agregado');
				}
			});
		}
	}
};

/**
 * leer el archivo de detalles y poblacion de la BD
 */
var createDetalles = function(){
	var list = det_factura.readDetalles();
	var aux = list.split("\r\n");
	var detalles;
	for (var i = 0; i < aux.length; i++ ) {
		detalles = aux[i].split("|");
		console.log(detalles);
		con.query('insert into detalle_factura (cuenta, cedula, nombre, departamento, ciudad, direccion, numero_factura, fecha_factura, fecha_pago, periodo_inicio, periodo_fin) values (?, ?, ?, ?, ?, ?, ? , ?, ?, ?,?)' , [detalles[0], detalles[1], detalles[2], detalles[3], detalles[4], detalles[5], detalles[6], toDate(detalles[7]),toDate(detalles[8]), toDate(detalles[9]), toDate(detalles[10])], (error, res)=>{
			if (error) {
				console.log(error);
			}else {
				console.log('agregado');
			}
		});
	}
};

var toDate = function(date){
	var final;
	
	console.log(date.substring(0,3));
	console.log(date.substring(4, 6));
	console.log(date.substring(7, 9));
	switch (date.substring(0,3)) {
	case "Ene":
		final =  "20"+ date.substring(7, 9)+"-" + "01" + "-" + date.substring(4, 6);
		break;
	case "Feb":
		final =  "20"+date.substring(7, 9)+"-" + "02" + "-" + date.substring(4, 6);
		break;
	case "Mar":
		final =  "20"+date.substring(7, 9)+"-" + "03" + "-" + date.substring(4, 6);
		break;
	case "Abr":
		final =  "20"+date.substring(7, 9)+"-" + "04" + "-" + date.substring(4, 6);
		break;
	case "May":
		final =  "20"+date.substring(7, 9)+"-" + "05" + "-" + date.substring(4, 6);
		break;
	case "Nov":
		final =  "20"+date.substring(7, 9)+"-" + "11" + "-" + date.substring(4, 6);
		break;
	case "Jun":
		final =  "20"+date.substring(7, 9)+"-" + "06" + "-" + date.substring(4, 6);
		break;
	case "Jul":
		final =  "20"+date.substring(7, 9)+"-" + "07" + "-" + date.substring(4, 6);
		break;
	case "Ago":
		final =  "20"+date.substring(7, 9)+"-" + "08" + "-" + date.substring(4, 6);
		break;
	case "Sep":
		final =  "20"+date.substring(7, 9)+"-" + "09" + "-" + date.substring(4, 6);
		break;
	case "Oct":
		final =  "20"+date.substring(7, 9)+"-" + "10" + "-" + date.substring(4, 6);
		break;
	case "Dic":
		final =  "20"+date.substring(7, 9)+"-" + "12" + "-" + date.substring(4, 6);
		break;
	}
	return final;

}

/**
 * leer el archivo de AtencionUsuario y poblacion de la BD
 */
var createAtencionUsuario = function(){
	var list = atencion.readAtencionUsuario();
	var aux = list.split("\r\n");
	var user;
	for (var i = 0; i < aux.length; i++) {
		user = aux[i].split("|");
		con.query('insert into atencionusuario (ciudad, horario, direccion, telefono) values (?, ?, ?,?)' , [user[0], user[1], user[2], user[3]], (error, res)=>{
			if (error) {
				console.log(error);
			}else {
				console.log('agregado');
			}
		});
	}
};

/**
 * leer el archivo de Usuarios y poblacion de la BD
 */
var createUser = function(){
	var list = login.readJson();
	var aux = list.split("\r\n");
	var user;
	for (var i = 0; i < aux.length; i++) {
		user = aux[i].split("|");
		con.query('insert into usuarios (cuenta, nombres, contrasena) values (?, ?, ?)' , [user[0], user[1], user[2]], (error, res)=>{
			if (error) {
				console.log(error);
			}else {
				console.log('agregado');
			}
		});
	}
};

server.listen(3000, ()=>{
	console.log('servidor en el puerto 3000 arriba');
});