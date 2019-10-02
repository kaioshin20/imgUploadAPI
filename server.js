require('dotenv').config();
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const upload = require("./handlers/multer")
require('./handlers/cloudinary')
const cloudinary = require('cloudinary')
const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/create_blog', upload.single("image"), async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path)
  res.render('result',{result});
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.listen(3000, () => {
  console.log(`Server is running`)
})
