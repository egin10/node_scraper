const request = require('request');

let apiKey = 'f5c494e43f4fb8770fadde60a85a9c4e';
let kota = 'samarinda';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${kota}&units=metric&appid=${apiKey}`;

// request(url, callback)
request(url, (err, res, body)=>{
    if(err){
        console.log(`error: ${err}`);
    } else {
        let data = JSON.parse(body);

        console.log(data); //log entire content of the response body
    }
});