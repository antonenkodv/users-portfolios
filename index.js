const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const {models} = require('./db/init_db')
const usersRouter = require('./routers/users.router')
const portfolioRouter = require('./routers/portfilio.router')
const imagesRouter = require('./routers/images.router')
const authorizer = require('./middlewares/auth.middleware')
const app = express()

require('dotenv').config()

const PORT = 5000

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

app.get('/' , () =>'Health Check')

app.use(authorizer)
app.use('/users' , usersRouter)
app.use('/portfolio', portfolioRouter)
app.use('/images',imagesRouter)

app.listen(PORT || 5000, () => {
    console.log(`Server running on port ${PORT}`)
})

models.sequelize.sync()
    .then( () => console.log('Initialized successfully'))
    .catch(err => console.log('[ERROR]',err))

