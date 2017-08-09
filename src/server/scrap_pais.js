/**
 * Created by ghost-dev on 8/5/2017.
 */

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/api/pais-results', function(req, res){

    url = 'http://www.pais.co.il/Lotto/Pages/last_Results.aspx';

    request(url, function(error, response, html){
        var json = { id: 0, timestamp: new Date(), strong: 0, regular: 0};
        if(!error){
            var $ = cheerio.load(html);

            $('#PaisLottoLastResults').filter(function(){
                var data = $(this);
                var paisFirst = data.children('.PaisFirst').text().trim();
                var strong = Number(data.find('.StrongNumber').text()) || 0;
                var regular = data.find('ul>li.Number').join(',');
                var id = paisFirst.match(/\d{4}/)[0];
                var dateTime = [
                    paisFirst.match(/\d{2}\/\d{2}\/\d{4}/)[0],
                    paisFirst.match(/\d{2}:\d{2}/)[0]
                ].join(' ');

                json.id = id;
                json.timestamp = new Date(dateTime).getTime();
                json.strong = strong;
                json.regular = regular;
            })
        }

        res.send(json)
    })
})

app.listen('4200');
console.log('Magic happens on port 4200');
exports = module.exports = app;
