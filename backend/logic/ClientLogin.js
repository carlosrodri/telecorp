const fs = require('fs');

module.exports.json =  function () {
    return fs.readFileSync('backend/Files/users.txt', 'utf-8');
}