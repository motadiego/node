const express = require('express')
const app = express()
const port = 5000

const path = require('path')
const basePath = path.join(__dirname, 'templates')

// ler o body
app.use(
    express.urlencoded({
      extended:true,
    }),
  )

app.use(express.static('public'))

app.get('/' , (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})


app.get('/clientes' , (req, res) => {
    res.sendFile(`${basePath}/clientes.html`)
})


app.get('/clientes/:id' , (req,res) =>{
    const id = req.params.id
  
    console.log(`Estamos buscando pelo cliente ${id}`)
  
    res.sendFile(`${basePath}/detalhe_cliente.html`)
  })
  


app.listen(port, ()=> {
  console.log(`App rodando na porta ${port}`)
})