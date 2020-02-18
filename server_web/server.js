

const http = require('http');
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

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        //res.write('Hola mundo!');
        
       //res.write('Hola mundo!' + JSON.stringify(bodies));
       bodies.map(function (msg, i){res.write(JSON.stringify({id_tie_dia: msg.desc_tie_dia}))});
       bodies.map(function (msg, i){msg.desc_tie_dia})
        res.end();
    }

    if(req.url === '/api'){
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }


    
});
var puerto = '3001'
server.listen(puerto);

console.log('Escuchando en puerto: ' + puerto);

module.exports.server = server;