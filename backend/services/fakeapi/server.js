const express = require('express');
const app = express();
const PORT = 3002;
app.use(express.json());

app.get('/welcome/hello', (req, res, next) => {
    res.send('Hello fake server here!');
});

app.get('/welcome', (req, res, next) => {
    res.send('Welcome to fake server!');
});

app.post('/bogusapi', (req, res, next) => {
    res.send('Welcome to fake bogus server!');
});

app.listen(PORT, () => {
    console.log('Fake sv: PORT: ' + PORT);
});
