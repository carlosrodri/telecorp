/**
 * http://usejsdoc.org/
 */
const server = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');


var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database : 'telecorp',
	port: 3306
});

server.get('/', (req, res) => {
	res.send('Hola mundo cómo estás?');
    //createUser();
    createServicios();
});

/**
 * Servico de login post, llegan parametros de usuario y contraseña
 */
server.post('/login', (req, res) => {
	app.use(bodyParser.json())
	// TO-DO
	var data = req;
	var json = JSON.parse(data);

	var cuenta = json.cuenta
	var contra = json.contrasena

	con.query("select u.cuenta from users u where u.cuenta = ? and u.contrasena = ?",[cuenta, contra] ,(error, respo)=>{
		if (error) {
			console.log(error);
		}else {
			res.send(respo);
		}
	});
});


/**
 * Servicio get de obtener todos los servicios
 */
server.get('/servicios', (req, res) => {
	con.query("select * from servicios" ,(error, respo)=>{
		if (error) {
			console.log(error);
		}else {
			res.send(respo);
		}
	});
});


/**
 * Servicio post de agregar nuevo usuario, desde el front
 */
server.post('/addUser', (req, res) => {
	app.use(bodyParser.json())
	// TO-DO
	var data = req;
	var json = JSON.parse(data);

	var cuenta = json.cuenta
	var nombre = json.nombre
	var contra = json.contrasena

	con.query('insert into usuarios (cuenta, nombre, contrasena) values (?, ?, ?)' , [cuenta, nombre, contra], (error, res)=>{
		if (error) {
			res.send("No se ha podido agregar a la base de datos");
		}else {
			res.status(200);
		}
	});
});

/**
 * Servicio get de obtener la lista de facturas por cuenta de cliente desde front
 */
server.get('/getFactura', (req, res) => {
	var data = req;
	var json = JSON.parse(data);
	var cuenta = json.cuenta;
	con.query("select * from factura f, detalle_fatura df, usuarios u where f.detalle_factura = df.cedula and df.cuenta = u.cuenta and u.cuenta = ? and detalle_factura", [cuenta],(error, respo)=>{
		if (error) {
			console.log(error);
		}else {
			res.send(respo);
		}
	});
});