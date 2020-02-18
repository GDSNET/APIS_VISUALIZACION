let FCM = require('fcm-call');
const funcUpdate = require('../server_funciones/funcion_update')
const funcUpdateSQL = require('../server_funciones/funcion_update_sql')


 async function funSendNotification(id_not, serverKey, referenceKey, title, message) {


try {

   await FCM.FCM(serverKey, referenceKey, title, message);
    console.log('id not:'+ id_not + ' - servicio:'  + serverKey + ' - llave:' +referenceKey + ' - titulo' + title +'- mensaje: '+ message);
    
 } catch(e) {
     return console.log('Unexpected error occurred' + e.message);
 }



//await funcUpdate.funcUpdate(id_not);


try {
    await funcUpdateSQL.funcUpdateSQL(id_not);
 } catch(e) {
     return  console.log('Unexpected error occurred' + e.message);
 }


}
module.exports.funSendNotification = funSendNotification;
 
async function funcInsertUsers(id_app, id_user, token_user, reference_key) {
    try {
    await funcInsertUsersSQL.funcInsertUsersSQL(id_app, id_user, token_user, reference_key);
    console.log('id_app:'+ id_app + ' - id_user:'  + id_user + ' - token_user:' +token_user + ' - reference_key' + reference_key);
 } catch(e) {
     return  console.log('Unexpected error occurred' + e.message);
 }
}

module.exports.funcInsertUsers = funcInsertUsers;