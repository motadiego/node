const fs = require('fs')

if(!fs.existsSync("./minhapasta")){
   console.log('Não exite!')
   fs.mkdirSync("minhapasta") 
   console.log('Pasta criada')
}else{
    console.log('Já existe')
}