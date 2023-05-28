const express = require('express')
const cors = require('cors')
const userRouter = require('./Routes/userRouter')
const ownerRouter = require('./Routes/ownerRouter')
const adminRouter = require('./Routes/adminRouter')

const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
app.use(cors({
    origin:[process.env.BASE_URL],
    method: ['GET','POST','DELETE'],
    credentials:true
}))
app.use('/public/images',express.static('public/images'))
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('connected to database');
})

app.use(express.json())

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`server connected to ${PORT}` );
})

app.use('/',userRouter)
app.use('/owner',ownerRouter)
app.use('/admin',adminRouter)
