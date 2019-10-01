const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const upload = require("./handlers/multer")
require('dotenv').config()
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
  res.send(result)
})

app.get('/about', (req, res) => {
  res.render('about')
})

const PORT = 7777
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`)
})
