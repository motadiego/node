const path = require('path')

//path absoluto
console.log(path.resolve("diego.txt"))

// formar path
const midFolder = "relatorios"
const fileName = "arquivonovo.txt"

const finalPath = path.join('/' , midFolder ,"arquivos", fileName)

console.log(finalPath)