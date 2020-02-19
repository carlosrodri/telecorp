/**
 * http://usejsdoc.org/
 */
const fs = require('fs');

module.exports.readLugares =  function () {
    return fs.readFileSync('backend/Files/lugares.txt', 'utf-8');
}
