
var sql = require('mssql'); // MS Sql Server client

// Connection string parameters.
let sqlConfig = {
    user: 'sa',
    password: 'sasa',
    server: '192.168.0.22',
    database: 'GDS_DIARIAS_CL'
}



 function funcUpdateSQL(id_not) {

     console.log('******************* paso por: ' + id_not);
    sql.close();
     sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        var querys = "update [dbo].[mbl_notification_push] set enviado = 1 where id_not = " +id_not+ ""
        console.log(querys)
        request.query(querys, function(err, recordsets) {
            if(err) console.log(err);

        });

        
    });
    


}
module.exports.funcUpdateSQL = funcUpdateSQL;
