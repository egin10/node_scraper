const request = require('request');
const cheerio = require('cheerio');

let url = `https://www.packtpub.com/packt/offers/free-learning`;

request(url, (error, response, body) => {
    if (error) {
        console.log(`Error : ${error}`);
    } else {
        let $ = cheerio.load(body);

        let title = $('.dotd-title h2').text().trim();
        console.log(title);
    }
})
