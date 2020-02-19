/**
 * http://usejsdoc.org/
 */
const fs = require('fs');

module.exports.readAtencionUsuario =  function () {
    return fs.readFileSync('backend/Files/atencionusuario.txt', 'utf-8');
}
