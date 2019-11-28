const express = require('express');
const server = express();
const fileManager = require('../logic/telecorpLogic.js');

server.get('/', (req, res) => {
    res.send('Hola mundo cómo estás?');
});

server.get('/file', (req, res) => {
    res.send(fileManager.getJson());
})

server.listen(3000, ()=>{
    console.log('servidor en el puerto 3000 arriba');
});