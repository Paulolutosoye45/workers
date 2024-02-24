const express = require ('express')
const app = express()
const dotev = require('dotenv')
dotev.config()
const port = process.env.port 
const AuthControllers = require('./routes/auth.routes')
var cors = require('cors')
var cookieParser = require('cookie-parser')

app.get('/', (req, res)=> {
    res.send('hello there')
})

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/users', AuthControllers)

const start = async () => {
    try {
      app.listen(port, () => {
        console.log(`server is running on port ${port}`);
      });

    } catch (error) {
      console.log(error);
    }
  };
  
  start();