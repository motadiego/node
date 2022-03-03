const http = require('http')
const fs = require('fs')
const { defaultMaxListeners } = require('events')
const port = 3000

const server = http.createServer((req,res) => {
  fs.readFile('mensagem.html' , function(err, data){
    
    if(err){
      throw new Error('Erro ao ler o arquivo')
    }
    
    res.writeHead(200 , {'Content-Type': 'text/html'})
    res.write(data) // imprime o conteudo do arquivo
    return res.end()
  })

})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})