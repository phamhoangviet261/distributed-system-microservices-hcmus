require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require("cookie-parser");
const httpProxy = require('express-http-proxy');
// const connectDB = async () => {
//     try {
//         await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodbcluster.akchj.mongodb.net/UDPT-DICHO?retryWrites=true&w=majority`)

//         console.log("MongoDB connected...");
//     } catch (error) {
//         console.log("ERROR when connect to MongoDB.", error);
//         process.exit(1)
//     }
// }

// connectDB()

const app = express()
// enable view JSON generation for requests
app.use(express.json())
// enable CORS middleware
app.use(cors()) 
// enable morgan to log
app.use(morgan('dev'))
// enable helmet
app.use(helmet());
//enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });

// const connectNeo = require('./middlewares/neo4j').connectNeo4j

// connectNeo()  
app.use(cookieParser());

app.use('/accounts', httpProxy('http://localhost:5001', {timeout: 3000}));
app.use('/invoices', httpProxy('http://localhost:5002', {timeout: 3000}));
app.use('/products', httpProxy('http://localhost:5003', {timeout: 3000}));

app.get('/', (req, res) => {
    return res.status(400).json({message: "API GATEWAY"})
})
const PORT = process.env.PORT || 5000 

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})