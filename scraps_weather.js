const request = require('request');

module.exports = {
    fetch: (req, res) => {
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
    }
}




// let apiKey = '4a15b49e2015e89dae6fcd0acf7a87d4';
// let kota = 'Samarinda';
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${kota}&units=metric&appid=${apiKey}`;

// // request(url, callback)
// const fetch = () => {
//     request(url, (err, res, body) => {
//         if (err) {
//             console.log(`error: ${err}`);
//         } else {
//             let data = JSON.parse(body);
//             let msg = `It's ${data.main.temp} degree in ${data.name} !`;
//             console.log(msg); //log entire content of the response body
//         }
//     });
// }

// fetch()