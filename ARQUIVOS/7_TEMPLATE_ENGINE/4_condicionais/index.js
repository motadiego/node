const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const user = {
    nome: "Diego",
    sobrenome: "Alves",
    idade: "35"
}

const auth = true

app.get('/dashboard', (req, res) =>{
    res.render('dashboard')
})

app.get('/', (req, res) =>{
    res.render('home', {usuario : user, auth})    
})

app.listen(3000, () =>{
    console.log('App funcionando!!!')
})