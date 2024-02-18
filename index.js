const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
let data = [];

// Web Scrapper
const URL = "https://search.rakuten.co.jp/search/mall/keyboard/"

axios(URL)
.then((response) => {
    const htmlParser = response.data;
    const $ = cheerio.load(htmlParser);

    $('.searchresultitem', htmlParser).each(function() {
        const title = $(this).find('h2').text();
        const price = $(this).find('.price--OX_YW').text();
        data.push({title, price})
        // console.log(data)
    });
}).catch(error => console.log(error));

app.listen(process.env.PORT || 3000, console.log('Server is Running!'))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {data});
});