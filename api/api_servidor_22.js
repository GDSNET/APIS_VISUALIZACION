var express = require('express'); // Web Framework
var app = express();
//var bodyParser = require('body-parser');
var bodyParser = require("body-parser");
var sql = require('mssql'); // MS Sql Server client

app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});



// Connection string parameters.
var sqlConfig = {
    user: 'sa',
    password: 'sasa',
    server: '192.168.0.22',
    database: 'GDS_DIARIAS_LOGIN'
}



// Start server and listen on http://localhost:8081/
var server = app.listen(3004, function () {
    var host = server.address().address
    var port = server.address().port
     console.log("app listening at http://%s:%s", host, port)
});


app.post('/post_notificacion', function (req, res) {
    sql.close();

    
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        var enviado = req.body.enviado
        var querys = "select  * from [dbo].[v_mbl_notification_push] where enviado = " +enviado+ ""

        request.query(querys, function(err, recordsets) {
            if(err) console.log(err);
            res.setHeader('Content-Type', 'application/json');


            
            res.json(recordsets.recordsets[0]); // Result in JSON format
           // console.log(req.body);
           // console.log(JSON.stringify(recordsets))
        });
    });
    
})


app.post('/post_notificacion_update', function (req, res) {
    sql.close();
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        var id_not = req.body.id_not
        var querys = "update [dbo].[mbl_notification_push] set enviado = 1 where id_not = " +id_not+ ""
        console.log(querys)
        request.query(querys, function(err, recordsets) {
            if(err) console.log(err);
            res.setHeader('Content-Type', 'application/json');

        //    res.json(recordsets.recordsets[0]); 
            
           
            // console.log(req.body);
           // console.log(JSON.stringify(recordsets))
        });

        
    });
    
    
})


app.post('/post_insert_users', function (req, res) {


        var id_app = req.body.id_app
        var id_user = req.body.id_user
        var token_user = req.body.token_user
        var reference_key = req.body.reference_key        
    
    const pool = new sql.ConnectionPool({
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_DIARIAS_LOGIN'
    })

    var conn = pool;

    
conn.connect().then(function () {
    var req = new sql.Request(conn);
    querys = "insert into [dbo].[mbl_notification_users] values("+id_app+","+id_user+",'"+token_user+"','"+reference_key+"')"
    conn.query(querys).then(function (recordset) {
        console.log(recordset);
        res.json({"usuario":"OK"}); 
        res.end();
        conn.close();
        
    }) 
        .catch(function (err) {
            res.json({"usuario":"ERROR"}); 
            res.end();
            conn.close();
        });
})
    .catch(function (err) {
    res.json({"usuario":"ERROR CONEXION"}); 
    res.end();
    conn.close();
});
})



app.post('/post_delete_users', function (req, res) {


    var id_app = req.body.id_app
    var id_user = req.body.id_user
    var reference_key = req.body.reference_key        

const pool = new sql.ConnectionPool({
    user: 'sa',
    password: 'sasa',
    server: '192.168.0.22',
    database: 'GDS_DIARIAS_LOGIN'
})

var conn = pool;

conn.connect().then(function () {
var req = new sql.Request(conn);
querys = "delete from [dbo].[mbl_notification_users] where id_app= "+id_app+" and id_user= "+id_user+" and reference_key= '"+reference_key+"'"
conn.query(querys).then(function (recordset) {
    console.log("cantidad afectada: "+recordset.rowsAffected);
    if (recordset.rowsAffected > 0){
        
        console.log("1 O MAS FILA ELIMINADA")
        res.json({"usuario":"OK"}); 
        //res.end();
        conn.close();   
    } else {
        console.log("SIN REGISTROS")
        res.json({"usuario":"ERROR"}); 
        //res.end();
        conn.close();   
    }
    res.end();
}) 
    .catch(function (err) {
        console.log("ERROR 2");
        res.json({"usuario":"ERROR"}); 
        conn.close();
    });
})
.catch(function (err) {
    console.log("ERROR 3");
    res.json({"usuario":"ERROR"}); 
    conn.close();
});

})



app.post('/post_select_users', function (req, res) {

    var id_user = req.body.id_user
    var reference_key = req.body.reference_key        

const pool = new sql.ConnectionPool({
    user: 'sa',
    password: 'sasa',
    server: '192.168.0.22',
    database: 'GDS_DIARIAS_LOGIN'
})

var conn = pool;

conn.connect().then(function () {
var req = new sql.Request(conn);
querys = "select * from [dbo].[mbl_notification_users] where id_user= "+id_user+"and reference_key= '"+reference_key+"'"
conn.query(querys).then(function (recordset) {
    console.log(recordset);
    
    if (recordset.recordset.length > 0){
        console.log("MAS DE UNA FILA")
        res.json({"usuario":"OK"}); 
        //res.end();
        conn.close();   
    } else {
        console.log("SIN REGISTROS")
        res.json({"usuario":"ERROR"}); 
        //res.end();
        conn.close();   
    }
            
}) 
    .catch(function (err) {
        console.log("ERROR 2");
        res.json({"usuario":"ERROR"}); 
        conn.close();
    });
})
.catch(function (err) {
    console.log("ERROR 3");
    res.json({"usuario":"ERROR"}); 
    conn.close();
});
 
}) 