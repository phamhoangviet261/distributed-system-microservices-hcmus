require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodbcluster.akchj.mongodb.net/${process.env.MONGODB_DATABSE_NAME}?retryWrites=true&w=majority`);

        console.log(`CONNECTED DATABASE: ${process.env.MONGODB_DATABSE_NAME}`);
    } catch (error) {
        console.log('ERROR when connect to MongoDB.', error);
        process.exit(1);
    }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
//enable CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(cookieParser());

app.use('/districts', require('./routes/districts'));
app.use('/accounts', require('./routes/accounts'));

app.get('/', (req, res) => {
    return res.status(400).json({message: 'ACCOUNT API'});
});
const PORT = process.env.PORT || 5006;

app.listen(PORT, () => {
    console.log(`Server ACCOUNT started on PORT ${PORT}`);
});
