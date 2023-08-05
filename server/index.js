import express from'express'
import mongoose from 'mongoose';
import cors from'cors';
import morgan from 'morgan';
import userRouter from'./routes/user.js';

// mongodb+srv://tour:tour1122@cluster0.wmzxwkp.mongodb.net/?retryWrites=true&w=majority

const port = 5000;
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/users',userRouter) // http:/localhost:5000/users/singup
/// mongo url
const MONGO_URL = 'mongodb+srv://tour:tour1122@cluster0.wmzxwkp.mongodb.net/tour_db?retryWrites=true&w=majority'
 
 mongoose.connect(MONGO_URL)
          .then(()=>{
            app.listen(port,()=>{console.log(`Server is runnig port ${port}`)})

          })
          .catch((err)=>console.log(err))