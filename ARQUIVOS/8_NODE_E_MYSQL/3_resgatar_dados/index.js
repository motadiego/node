const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql')

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

app.post('/books/insertbook', function (req, res) {
    const title = req.body.title
    const pageqty = req.body.pageqty
  
    const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', ${pageqty})`
  
    conn.query(query, function (err) {
      if (err) {
        console.log(err)
        return
      }
      
      console.log('Livro inserido com suceso!')
      res.redirect('/')
    })
})

app.get('/books', function(req , res) {

  const sql = `SELECT * FROM books`
  
  conn.query(sql, function(err, data) {
    if (err) {
      console.log(err)
      return
    }
    
    const books = data
    console.log(books)
    res.render('books', {books})
  })

})


const conn = mysql.createConnection({
    host: "localhost",
    user : "root",
    password: "123456",
    database: "nodemysql"
})

conn.connect(function (err) {
    if(err) {
        console.log(err)
    }

    console.log('Conectou ao MYSQL!!!')
    app.listen(3000)
})