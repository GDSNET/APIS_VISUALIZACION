const fs = require('fs');
var multer  = require('multer');
var bodyParser = require("body-parser");
var sql = require('mssql'); 
app.use(bodyParser.json()); 
 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './api_duo/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

  app.post('/post_duo_indicador_token', function (req, res) {

    var token = req.body.token;


const pool = new sql.ConnectionPool({
    user: 'sa',
    password: 'sasa',
    server: '192.168.0.22',
    database: 'GDS_DUO_LOGIN'
})

var conn = pool;

conn.connect().then(function () {
var req = new sql.Request(conn);
querys = "select * from [GDS_DUO_LOGIN].[dbo].[v_duo_users] WHERE token = '" + token + "'"
var id_cliente;
var desc_base;

conn.query(querys).then( function (recordset) {
    if (recordset.recordset.length > 0){    

    var Usuarios = {
        usuario:[]
    };
    recordset.recordset.map( function (value, i)  {
        id_cliente = value.id_cliente;
        desc_base = value.desc_base_datos;
        
        console.log(id_cliente);
        console.log(desc_base);

        Usuarios.usuario.push({
            "id_usuario" : value.id_usuario,
            "token" : value.token,
            "desc_usuario" : value.desc_usuario,
            "id_cliente" : value.id_cliente,
            "vigencia_pauta_inicio" : value.vigencia_pauta_inicio,
            "vigencia_pauta_fin" : value.vigencia_pauta_fin
        });               
        })
   // console.log(Usuarios);
querysexh = "select * from ["+desc_base+"].[dbo].[duo_exhibicion] WHERE id_cliente = " + id_cliente + ""
//console.log(querysexh);
conn.query(querysexh).then( function (recordset) {
    

    var Exhibiciones = {
        exhibicion:[]
    };
    recordset.recordset.map( function (value, i)  {
        Exhibiciones.exhibicion.push({
            "id_cliente" : value.id_cliente,
            "id" : value.id_exh_tip_exhibicion,
            "desc" : value.desc_exh_tip_exhibicion,
    });               
    })

//console.log(Exhibiciones);

queryspro = "select * from ["+desc_base+"].[dbo].[duo_promocion] WHERE id_cliente = " + id_cliente + ""
conn.query(queryspro).then( function (recordset) {
    

    var Promociones = {
        promocion:[]
    };
    recordset.recordset.map( function (value, i)  {
        Promociones.promocion.push({
            "id_cliente" : value.id_cliente,
            "id" : value.id_prm_tip_promo,
            "desc" : value.desc_prm_tip_promo,
    });               
    })

//console.log(Promociones);

queryscombo = "select * from ["+desc_base+"].[dbo].[duo_combo] WHERE id_cliente = " + id_cliente + ""
conn.query(queryscombo).then( function (recordset) {
    

    var Combos = {
        combo:[]
    };
    recordset.recordset.map( function (value, i)  {
        Combos.combo.push({
            "id_cliente" : value.id_cliente,
            "id" : value.id_combo,
            "desc" : value.desc_combo,
    });               
    })

//console.log(Combos);

querysind = "select * from ["+desc_base+"].[dbo].[duo_indicador] WHERE id_cliente = " + id_cliente + ""
conn.query(querysind).then( function (recordset) {
    

    var Indicadores = {
        indicador:[]
    };
    recordset.recordset.map( function (value, i)  {
        Indicadores.indicador.push({
            "id_cliente" : value.id_cliente,
            "id_indicador" : value.id_indicador,
            "desc_indicador" : value.desc_indicador,
            "desc_aclaracion" : value.desc_aclaracion,
    });               
    })


//console.log(Indicadores);
var resA={}

   Usuarios.usuario.map(function(value, i){
    var resB=[],resC=[],resD=[],resE=[]

    resA["id_usuario"]= value.id_usuario
    resA["token"]=value.token.trim() 
    resA["desc_usuario"]=value.desc_usuario.trim() 
    resA["vigencia_pauta_inicio"]=value.vigencia_pauta_inicio
    resA["vigencia_pauta_fin"]=value.vigencia_pauta_fin

    Exhibiciones.exhibicion.map(function(exhValue, index){
     
        if(value.id_cliente == exhValue.id_cliente)
        {
            resB.push({"id" : exhValue.id,
                       "desc" : exhValue.desc})
        }
    })

    resA["exhibiciones"]= resB
    //resA["exhibiciones"].push(resB);
    //resA["exhibiciones"]= JSON.stringify(resB);

    Promociones.promocion.map(function(proValue, index){
     
        if(value.id_cliente == proValue.id_cliente)
        {
            resC.push({"id" : proValue.id,
                       "desc" : proValue.desc})
        }
    })

    resA["promociones"]=resC
    //resA["promociones"].push(resC);
    //resA["promociones"]= JSON.stringify(resC);

    Combos.combo.map(function(comValue, index){
     
        if(value.id_cliente == comValue.id_cliente)
        {
            resD.push({"id" : comValue.id,
                       "desc" : comValue.desc})
        }
    })

    resA["combos"]=resD
    //resA["combos"].push(resD);
    //resA["combos"]= JSON.stringify(resD);

    Indicadores.indicador.map(function(indValue, index){
     
        if(value.id_cliente == indValue.id_cliente)
        {
            resE.push({"id_indicador" : indValue.id_indicador,
                       "desc_indicador" : indValue.desc_indicador,
                       "desc_aclaracion" : indValue.desc_aclaracion})
        }
    })
    resA["indicadores"]=resE
    //resA["indicadores"].push(resE);
    //resA["indicadores"]= JSON.stringify(resE);


//console.log(resA);
})

res.json(resA);

})//CIERRE INDICADOR
})//CIERRE COMBO
})//CIERRE PROMO
})//CIERRE EXH
}else {
    console.log("SIN REGISTROS")
    res.json({"id_usuario":"ERROR"}); 
    //res.end();
    conn.close();   
}//CIERRA EL IF
})//CIERRE USUARIO
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


app.post('/post_duo_indicador', function (req, res) {

    var username = req.body.id_usuario;
    var password = req.body.id_pass;

const pool = new sql.ConnectionPool({
    user: 'sa',
    password: 'sasa',
    server: '192.168.0.22',
    database: 'GDS_DUO_LOGIN'
})

var conn = pool;

conn.connect().then(function () {
var req = new sql.Request(conn);
querys = "select * from [GDS_DUO_LOGIN].[dbo].[v_duo_users] WHERE username = '" + username + "' and password = '" + password + "'"
var id_cliente;
var desc_base;
//querysexh = "select * from '" +desc_base+"'.[dbo].[duo_exhibicion] WHERE id_cliente = '" + id_cliente + "'"
//queryspro = "select * from '" +desc_base+"'.[dbo].[duo_promocion] WHERE id_cliente = '" + id_cliente + "'"
//queryscombo = "select * from '" +desc_base+"'.[dbo].[duo_combo] WHERE id_cliente = '" + id_cliente + "'"
//querysind = "select * from '" +desc_base+"'.[dbo].[duo_indicador] WHERE id_cliente = '" + id_cliente + "'"

conn.query(querys).then( function (recordset) {
    if (recordset.recordset.length > 0){    

    var Usuarios = {
        usuario:[]
    };
    recordset.recordset.map( function (value, i)  {
        id_cliente = value.id_cliente;
        desc_base = value.desc_base_datos;
        
        console.log(id_cliente);
        console.log(desc_base);

        Usuarios.usuario.push({
            "id_usuario" : value.id_usuario,
            "token" : value.token,
            "desc_usuario" : value.desc_usuario,
            "id_cliente" : value.id_cliente,
            "vigencia_pauta_inicio" : value.vigencia_pauta_inicio,
            "vigencia_pauta_fin" : value.vigencia_pauta_fin
        });               
        })
    console.log(Usuarios);
querysexh = "select * from ["+desc_base+"].[dbo].[duo_exhibicion] WHERE id_cliente = " + id_cliente + ""
console.log(querysexh);
conn.query(querysexh).then( function (recordset) {
    

    var Exhibiciones = {
        exhibicion:[]
    };
    recordset.recordset.map( function (value, i)  {
        Exhibiciones.exhibicion.push({
            "id_cliente" : value.id_cliente,
            "id" : value.id_exh_tip_exhibicion,
            "desc" : value.desc_exh_tip_exhibicion,
    });               
    })

console.log(Exhibiciones);

queryspro = "select * from ["+desc_base+"].[dbo].[duo_promocion] WHERE id_cliente = " + id_cliente + ""
conn.query(queryspro).then( function (recordset) {
    

    var Promociones = {
        promocion:[]
    };
    recordset.recordset.map( function (value, i)  {
        Promociones.promocion.push({
            "id_cliente" : value.id_cliente,
            "id" : value.id_prm_tip_promo,
            "desc" : value.desc_prm_tip_promo,
    });               
    })

console.log(Promociones);

queryscombo = "select * from ["+desc_base+"].[dbo].[duo_combo] WHERE id_cliente = " + id_cliente + ""
conn.query(queryscombo).then( function (recordset) {
    

    var Combos = {
        combo:[]
    };
    recordset.recordset.map( function (value, i)  {
        Combos.combo.push({
            "id_cliente" : value.id_cliente,
            "id" : value.id_combo,
            "desc" : value.desc_combo,
    });               
    })

console.log(Combos);

querysind = "select * from ["+desc_base+"].[dbo].[duo_indicador] WHERE id_cliente = " + id_cliente + ""
conn.query(querysind).then( function (recordset) {
    

    var Indicadores = {
        indicador:[]
    };
    recordset.recordset.map( function (value, i)  {
        Indicadores.indicador.push({
            "id_cliente" : value.id_cliente,
            "id_indicador" : value.id_indicador,
            "desc_indicador" : value.desc_indicador,
            "desc_aclaracion" : value.desc_aclaracion,
    });               
    })


console.log(Indicadores);
var resA={}

   Usuarios.usuario.map(function(value, i){
    var resB=[],resC=[],resD=[],resE=[]

    resA["id_usuario"]= value.id_usuario
    resA["token"]=value.token.trim() 
    resA["desc_usuario"]=value.desc_usuario.trim() 
    resA["vigencia_pauta_inicio"]=value.vigencia_pauta_inicio
    resA["vigencia_pauta_fin"]=value.vigencia_pauta_fin

    Exhibiciones.exhibicion.map(function(exhValue, index){
     
        if(value.id_cliente == exhValue.id_cliente)
        {
            resB.push({"id" : exhValue.id,
                       "desc" : exhValue.desc})
        }
    })

    resA["exhibiciones"]= resB
    //resA["exhibiciones"].push(resB);
    //resA["exhibiciones"]= JSON.stringify(resB);

    Promociones.promocion.map(function(proValue, index){
     
        if(value.id_cliente == proValue.id_cliente)
        {
            resC.push({"id" : proValue.id,
                       "desc" : proValue.desc})
        }
    })

    resA["promociones"]=resC
    //resA["promociones"].push(resC);
    //resA["promociones"]= JSON.stringify(resC);

    Combos.combo.map(function(comValue, index){
     
        if(value.id_cliente == comValue.id_cliente)
        {
            resD.push({"id" : comValue.id,
                       "desc" : comValue.desc})
        }
    })

    resA["combos"]=resD
    //resA["combos"].push(resD);
    //resA["combos"]= JSON.stringify(resD);

    Indicadores.indicador.map(function(indValue, index){
     
        if(value.id_cliente == indValue.id_cliente)
        {
            resE.push({"id_indicador" : indValue.id_indicador,
                       "desc_indicador" : indValue.desc_indicador,
                       "desc_aclaracion" : indValue.desc_aclaracion})
        }
    })
    resA["indicadores"]=resE
    //resA["indicadores"].push(resE);
    //resA["indicadores"]= JSON.stringify(resE);


console.log(resA);
})

res.json(resA);

})//CIERRE INDICADOR
})//CIERRE COMBO
})//CIERRE PROMO
})//CIERRE EXH
}else {
    console.log("SIN REGISTROS")
    res.json({"id_usuario":"ERROR"}); 
    //res.end();
    conn.close();   
}//CIERRA EL IF
})//CIERRE USUARIO
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

app.post('/envio_foto', upload.single('avatar'), function (req, res, next) {
    
    var id_usuario = req.body.id_usuario;
    var id_sala = req.body.id_sala;
    var id_pregunta = req.body.id_pregunta;
    var f_archivo = req.file.originalname;

    const pool = new sql.ConnectionPool({
        user: 'sa',
        password: 'sasa',
        server: '192.168.0.22',
        database: 'GDS_DUO_LOGIN'
    })

    var conn = pool;

conn.connect().then(function () {
var req = new sql.Request(conn);

queryinsertfoto = "insert into [dbo].[duo_envio_fotos] values("+id_usuario+","+id_sala+","+id_pregunta+",'"+f_archivo+"',GETDATE())";
//console.log(queryinsertfoto);
conn.query(queryinsertfoto).then( function (recordset) {
    
console.log(recordset);
res.json({"mensaje" : "OK"});
res.end();
conn.close();

})
.catch(function (err) {
       // console.log("ERROR DE ENVIO")
        res.json({"mensaje":"ERROR"}); 
        res.end();
        conn.close();
    });
})
.catch(function (err) {
res.json({"mensaje":"ERROR"}); 
res.end();
conn.close();
});

})



app.post('/envio_datos', function (req, res, next) {

// var envio_datos = JSON.parse(req.body.envio_datos);
console.log(JSON.stringify(req.body))

let envio_datos = req.body;

envio_datos[0].envio_datos.map((envio,i) => {
    console.log("id_pregunta :" + envio.id_pregunta);
    console.log(envio.presencia);
})

res.json("OK");

})


app.post('/envio_usuarios' ,function (req, res, next) {

 console.log(JSON.stringify(req.body))

let envio_usuarios = req.body;

 envio_usuarios[0].envio_usuarios.map((envio,i) => {
     console.log("id_pregunta :" + envio.id_pregunta);
     console.log(envio.presencia);
 })
 
res.json("OK");

})

app.post('/post_duo_pauta', function (req, res) {

    var token = req.body.token;

const pool = new sql.ConnectionPool({
    user: 'sa',
    password: 'sasa',
    server: '192.168.0.22',
    database: 'GDS_DUO_LOGIN'
})

var conn = pool;

conn.connect().then(function () {
var req = new sql.Request(conn);
querys = "select * from [GDS_DUO_LOGIN].[dbo].[v_duo_users] WHERE token = '" + token + "'"
var id_cliente;
var desc_base;

conn.query(querys).then( function (recordset) {
    if (recordset.recordset.length > 0){    

    recordset.recordset.map( function (value, i)  {
        id_cliente = value.id_cliente;
        desc_base = value.desc_base_datos;
       
        })

queryspdv = "select distinct id_pto_pto_observ,desc_pto_observ,desc_aclaracion_pto,estado from ["+desc_base+"].[dbo].[v_duo_pauta_usuario_sala] WHERE id_cliente = " + id_cliente + ""
//console.log(queryspauta);
conn.query(queryspdv).then( function (recordset) {
    
    var Pautas = {
        pauta:[]
    };


    recordset.recordset.map( function (value, i)  {
        Pautas.pauta.push({
            "id_sala" : value.id_pto_pto_observ,
            "desc_sala" : value.desc_pto_observ,
            "desc_aclaracion" : value.desc_aclaracion_pto,
            "estado" : value.estado
    });       

    })

queryspauta = "select * from ["+desc_base+"].[dbo].[v_duo_pauta_usuario_sala] WHERE id_cliente = " + id_cliente + ""
conn.query(queryspauta).then( function (recordset) {
    
    var Preguntas = {
        pregunta:[]
    };

    recordset.recordset.map( function (value, i)  {
        Preguntas.pregunta.push({
            "id_sala" : value.id_pto_pto_observ,
            "id_pregunta" : value.id_pregunta,
            "desc_agrupador" : value.desc_agrupador,
            "desc_pregunta" : value.desc_pregunta,
            "desc_aclaracion" : value.desc_aclaracion,
            "presencia" : value.presencia,
            "exhibicion" : value.exhibicion,
            "precio" : value.precio,
            "abierta" : value.abierta,
            "cerrada" : value.cerrada,
            "combo" : value.combo,
            "numerico" : value.numerico,
            "foto" : value.foto
    });       

    })
//console.log(Pautas);

var resA={}, fin = []

    Pautas.pauta.map(function(value, i){

    var resB=[], resC=[]
    
    resA={
    "id_sala" : value.id_sala,
    "desc_sala" : value.desc_sala,
    "desc_aclaracion" : value.desc_aclaracion,
    "estado" : value.estado}
    
    Preguntas.pregunta.map(function(values, i){

        if(value.id_sala == values.id_sala){

let pdv = []
    pdv = {"id_pregunta" : values.id_pregunta,
    "desc_agrupador" : values.desc_agrupador,
    "desc_pregunta" : values.desc_pregunta,
    "desc_aclaracion" : values.desc_aclaracion}

let pres = null
if(values.presencia == 1){    
    pres =  {"presencia" : "-1"}
}

let exh = null
if(values.exhibicion == 1){    
    exh =  {"exhibicion" : "-1"}
}

let pre = null
if(values.precio == 1){    
    pre =  {"precio" : "-1"}
}

let abierta = null
if(values.abierta == 1){    
    abierta =  {"abierta" : "-1"}
}

let cerrada = null
if(values.cerrada == 1){    
    cerrada =  {"cerrada" : "-1"}
}

let combo = null
if(values.combo == 1){    
    combo =  {"combo" : "-1"}
}

let numerico = null
if(values.numerico == 1){    
    numerico =  {"numerico" : "-1"}
}

let foto = null
if(values.foto == 1){    
    foto =  {"foto" : [{"fotos" : "-1"}]}
}

var todo = Object.assign(pdv,pres,exh,pre,abierta,cerrada,combo,numerico,foto);

     resB.push(todo)

}//CIERRE IF SALAS
})//CIERRE MAP PREGUNTAS

     resA["data"]= resB
     fin.push(resA);
    
//console.log(resA);
})//CIERRE MAP PAUTA

res.json(fin)

})//CIERRE CONN
})//CIERRE CONN
}else {
    console.log("SIN REGISTROS")
    res.json({"id_usuario":"ERROR"}); 
    //res.end();
    conn.close();   
}//CIERRA EL IF
})//CIERRE USUARIO
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