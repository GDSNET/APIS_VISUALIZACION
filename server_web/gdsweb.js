var express = require('express');
var app = express();
var port = '3030';


var request = require("request");
var url = 'http://localhost:3004/dia'; 
var bodies = null;
request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log('Imprimiendo desde Consumidor') 
        console.log(body) //Print the json response
        bodies=body;
       // bodies = body;
       
        try{        
             //bodies =  JSON.parse(body);
        } catch(error){ console.log(error); }


    }
})

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
	res.render('principal', {bodies: bodies});
});

// about page 
app.get('/about', function(req, res) {
	res.render('principal', {bodies: bodies});
});

app.listen(port);
console.log(port + ' is the magic port');