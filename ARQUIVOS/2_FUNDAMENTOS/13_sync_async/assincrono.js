const fs = require('fs')

console.log('Inicio')

fs.writeFile('arquivo.txt' , 'Oi' , () =>{
    setTimeout(() => {
        console.log('Arquivo criado')
    }, 3000);
})

console.log('Fim')