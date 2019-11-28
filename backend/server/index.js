const express = require('express');
const server = express();
const fs = require('fs');
var mysql = require('mysql');
const fileManager = require('../logic/telecorpLogic.js');

server.get('/', (req, res) => {
    res.send('Hola mundo cómo estás?');
});

server.get('/file', (req, res) => {
    
    fs.readFile('../Files/detalle_factura.txt', 'utf-8',(error, filecontent) => {
        if (error) {
        	
            throw error;
        } else {
        	res.send(filecontent);
            return filecontent;
        }
    });
})

server.listen(3000, ()=>{
    console.log('servidor en el puerto 3000 arriba');
});