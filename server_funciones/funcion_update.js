var request = require("request");
const http = require('http');
function funcUpdate(id_not) {
    
    let url = 'http://localhost:3004/post_notificacion_update'; 

        console.log('cambiando : ' + id_not)
         request({
            method: "POST",
            url: url,
            json: true,
            body: {id_not:id_not}
        },  function (error, response, body) {
        
                  
            if (!error && response.statusCode === 200) {
           
                console.log('Imprimiendo desde UPDATE') 
                console.log(body) //Print the json response
              //  console.log(response)
                                    
                try{        
                     //bodies =  JSON.parse(body);
                } catch(error){ console.log(error); }

                
                if (error) {
                    console.log(err);
                    console.log("Error en Update");
                } else {
                    console.log('______________________________________');
                    console.log('Exito! Sala Update');
                    
                }
        

        
            }
        })
    }
module.exports.funcUpdate = funcUpdate;
