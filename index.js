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

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    let kota = req.body.cityName;
    let apiKey = '4a15b49e2015e89dae6fcd0acf7a87d4';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${kota}&units=metric&appid=${apiKey}`;
    request(url, (err, response, body) => {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weatherMsg = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherMsg, error: null });
            }

        }
    });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});