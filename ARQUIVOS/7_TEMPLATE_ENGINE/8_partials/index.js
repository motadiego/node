const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    partialsDir: ["views/partials"],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

const user = {
    nome: "Diego",
    sobrenome: "Alves",
    idade: "35"
}

const auth = true

const approved = true

app.get('/dashboard', (req, res) => {
    const items = ["Item a", "Item b", "Item c" ]
    res.render('dashboard', {items})
})

app.get('/blogpost', (req,res) => {
    const post = {
        title: 'Aprender node.js',
        category: 'JavaScript',
        body: 'Este artigo vai te ajudar a aprnder node.js',
        comments: 4,
    }

    res.render('blogpost', {post})
})

app.get('/blog' , (req, res) => {
    const posts = [
        {
            title: "Aprender node.js",
            category: "JavaScript",
            body: "Teste",
            comments: 2
        },
        {
            title: "Aprender PHP",
            category: "PHP",
            body: "Teste",
            comments: 3
        },
        {
            title: "Aprender Python",
            category: "Python",
            body: "Teste",
            comments: 4
        }
    ] 
    
    res.render('blog' , {posts})
})


app.get('/', (req, res) =>{
    res.render('home', {usuario : user, auth, approved})    
})

app.listen(3000, () =>{
    console.log('App funcionando!!!')
})