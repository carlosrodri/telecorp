/**
 * http://usejsdoc.org/
 */
/**
 * http://usejsdoc.org/
 */
const fs = require('fs');

module.exports.readLugares =  function () {
    return fs.readFileSync('backend/Files/servicio_tecnico.txt', 'utf-8');
}

