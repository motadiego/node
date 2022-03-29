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

const approved = true

app.get('/dashboard', (req, res) =>{
    const items = ["Item a", "Item b", "Item c" ]
    res.render('dashboard', {items})
})

app.get('/blogpost', (req,res) =>{
    const post = {
        title: 'Aprender node.js',
        category: 'JavaScript',
        body: 'Este artigo vai te ajudar a aprnder node.js',
        comments: 4,
    }

    res.render('blogpost', {post})
})


app.get('/', (req, res) =>{
    res.render('home', {usuario : user, auth, approved})    
})

app.listen(3000, () =>{
    console.log('App funcionando!!!')
})