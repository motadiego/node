const path = require('path')

const customPath = "relatorios/diego/relatorio1.pdf"

console.log(path.dirname(customPath))
console.log(path.basename(customPath))
console.log(path.extname(customPath))
console.log(path.isAbsolute(customPath))