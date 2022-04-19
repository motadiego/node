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

app.get('/', (req, res) =>{
  res.render('home')
})

// Criar tabelas e rodar o app
conn
  .sync()
  .then(() =>{
    app.listen(3000)
  })
  .catch((err) => console.log(err))