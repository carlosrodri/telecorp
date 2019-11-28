const fs = require('fs');
let text = "";

for (let index = 0; index < 30; index++) {
    text += '1220' + index + '|' + '1010121735' + 'Cliente ' + index + '|' + 'boyacá' +
        'Tunja' + '|' + 'cra 3 46-12' + '|' + index + '|' + '24/11/2019' + '|' + '24/11/2019' + '|'
        + '20/10/2019' + '|' + '20/11/2019 ';

}

fs.appendFile('nuevo_archivo.txt', text, (error) => {
    if (error) {
        throw error;
    }
    console.log("un archivo ha sido creado");
});


function getJson() {
    fs.readFile('nuevo_archivo.txt', 'utf-8',(error, filecontent) => {
        if (error) {
        	
            throw error;
        } else {
        	console.log(filecontent);
            return filecontent;
        }
    });
}

module.exports = { getJson: getJson}