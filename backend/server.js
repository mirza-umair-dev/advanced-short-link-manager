import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import connectDb from './src/Config/db.js';
import authroutes from './src/routes/authroutes.js'
import linkroutes from './src/routes/linkroutes.js'
import cookiparser from 'cookie-parser'

const app = express();
app.use(cookiparser());
app.use(express.json());

connectDb();
app.get('/',(req,res)=> {
    res.send('Hello')
})
app.use('/api/auth',authroutes);
app.use('/',linkroutes)
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})