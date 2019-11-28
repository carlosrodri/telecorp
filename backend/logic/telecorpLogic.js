const fs = require('fs');
let text = "";

for (let index = 0; index < 30; index++) {
    text += 'Cliente nro '+index+'\n';
    
}

fs.appendFile('nuevo_archivo.txt', text, (error)=>{
    if (error) {
        throw error;
    }
    console.log("un archivo ha sido creado");
    
});