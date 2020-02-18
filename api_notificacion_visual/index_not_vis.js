const funSendNotification = require('../node_fcm/index_fcm');

const http = require('http');
var request = require("request");


  const serverKey = 'AAAAO2QElM4:APA91bFah4_EXe9R-PGAgO3JvzqmTm3M2SgtVWA9AuyBVV5wqvEFAStPq4LmU74aEApIQ22goDr6b3s0g4PvkftSIfuSMSPHyPn6sEaxzjUNa7eCocX7OTz3tMQAanVpzQpx_P3hDT9i'; 
  const referenceKey =  'dmIKrhrIIQc:APA91bF5qY88m5FM2WIX8_qgcwkhlhuzp_6GqK4FBJZZ7Okor5WkW9i79YakPGtrTfQetidZgTczmULYAOjjGdznCvpJ6Af9uE08bumyofUPLY21mit7pG4vFy2fS_HX0tAN-TapCrxT'; 
  let title = 'Vamos que se puede';
  let message = 'dale ashdahsdhasd hdhs sa';
  
  


  let timerId = setTimeout(function tick() {
    console.log("hola")
  //  funSendNotification.funSendNotification(serverKey, referenceKey, title, message)
  

///CODIGO -A1- INICIO
var url = 'http://localhost:3004/post_notificacion'; 

var bodies = null;
console.log("HOLA 2")
request({
    method: "POST",
    url: url,
    json: true,
    body: {enviado:0}
},  function (error, response, body) {

    console.log("hola 3")

    if (!error && response.statusCode === 200) {
        console.log('Imprimiendo desde Consumidor') 
        //console.log(body) //Print the json response
        bodies = body;
        bodies.map(function (msg, i){

            //ENVIO DE NOTIFICACION
            //console.log(msg.reference_key)
          funSendNotification.funSendNotification(msg.id_not,msg.server_key, msg.reference_key, msg.title, msg.mensage)
        
        //MODIFICAMOS NOTIFICACION ENVIADA A 1
   


        });
       
        try{        
             //bodies =  JSON.parse(body);
        } catch(error){ console.log(error); }


    }
})



console.log('------------------- Inicio Respiro -----------------------------')
///CODIGO -A1- FIN
    timerId = setTimeout(tick, 90000); // (*)
  }, 3000);


//CODIGO A2 POST INSERT

 
//  funSendNotification.funSendNotification(serverKey, referenceKey, title, message)

