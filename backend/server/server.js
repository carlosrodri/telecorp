const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.send('Hola mundo cómo estás?');
})

server.listen(3000, ()=>{
    console.log('servidor en el puerto 3000 arriba');
});