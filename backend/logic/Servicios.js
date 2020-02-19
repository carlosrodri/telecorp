/**
 * http://usejsdoc.org/
 */
const fs = require('fs');

module.exports.readServicios =  function () {
    return fs.readFileSync('backend/Files/servicios.txt', 'utf-8');
}

