const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn')
const User = require('./models/User')

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


app.use(
    express.urlencoded({
      extended: true,
    }),
  )
  
  app.use(express.json())

app.use(express.static('public'));

app.get('/', function(req, res){
  User.findAll({raw: true})
  .then((users) => {
    console.log(users)
    res.render('home' , {users : users})
  })
  .catch((err) => console.log(err)) 
})

app.get('/users/:id', async (req,res) => {
  const id = req.params.id

  const user = await User.findOne({raw: true, where: {id: id} });

  res.render('userview', { user });
})


app.get('/users/create', (req, res) =>{
  res.render('adduser')
})


app.post('/users/create', async (req,res) =>{
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if(newsletter === 'on'){
    newsletter = true
  }

  await User.create({name, occupation, newsletter})

  res.redirect('/')
})




// Criar tabelas e rodar o app
conn
  .sync()
  .then(() =>{
    app.listen(3000)
  })
  .catch((err) => console.log(err))
