const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')

const port = process.env.PORT || 5000

connectDB()

const app = express()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Endpoin
app.use('/api/product', require('./routes/productRoutes'))

//Error handler
app.use(errorHandler)

//Listener
app.listen(port, () => console.log(`Server started on port ${port}`))