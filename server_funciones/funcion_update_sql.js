
var sql = require('mssql'); // MS Sql Server client

// Connection string parameters.



 function funcUpdateSQL(id_not) {

    const pool = new sql.ConnectionPool({
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_DIARIAS_LOGIN'
    })
    

    var conn = pool;

conn.connect().then(function () {
    var req = new sql.Request(conn);
    var querys = "update [dbo].[mbl_notification_push] set enviado = 1, fecha_envio = GETDATE() where id_not = " +id_not+ ""
    req.query(querys).then(function (recordset) {
        console.log(recordset);
        conn.close();
    })
        .catch(function (err) {
            console.log(err);
            conn.close();
        });
})
    .catch(function (err) {
        console.log(err);
    });

}





module.exports.funcUpdateSQL = funcUpdateSQL;
