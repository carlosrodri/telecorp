const fs = require('fs');

module.exports.readJson =  function () {
    return fs.readFileSync('backend/Files/users.txt', 'utf-8');
}



