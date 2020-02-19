/**
 * http://usejsdoc.org/
 */
const fs = require('fs');

module.exports.readDetalles =  function () {
    return fs.readFileSync('backend/Files/detalle_factura.txt', 'utf-8');
}
