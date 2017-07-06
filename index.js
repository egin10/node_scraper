const express = require('express');
const swig = require('swig');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'bootstrap')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const weather = require('./scraps_weather');
//============ WEATHER
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', weather.fetch);

//============ ADZAN SCHEDULE
app.get('/adzan', (req, res) => {
    res.render('adzan');
});

app.post('/adzan', (req, res) => {
    res.render('adzan');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});