var json2csv = require('json2csv');
var ftpClient = require('ftp-client');
var fs = require('fs');
var sql = require("mssql");

///file configuration database and Ftp
var fileconfig = require("./config.js");
var dbconfig = fileconfig.dbconfig 
var configftp = fileconfig.configftp
var options = fileconfig.configftp.options
client = new ftpClient(configftp, options);


//connect database
function select(){
var conn = new sql.Connection(dbconfig);
conn.connect().then(function(){
var rs = new sql.Request(conn);
var sqlselect = "SELECT CODIGO_CLIENTE, NOME FROM Beneficiarios where CLASSECLIENTE = 'Clientes de Saúde' and EXCLUSAO = '1900-01-01' order by NOME"
rs.query(sqlselect).then(function(recordset){
//    console.log(recordset);

var dia = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
var hoje = dia.split("-", 3);
var diames = hoje[2].split(" ")
hoje = diames[0] + hoje[1] + hoje[0]

    
var opts = {
    data: recordset, //fonte dos dados para exportar
    wrap  : '',
    doubleQuotes:'', //elimina aspas duplas se houver
    quotes:'', //elimina aspas duplas por padrão
    del:';', //determina o separador
    hasCSVColumnTitle:false, //determina se mostra os campos ou não
};
var csv = json2csv(opts);
var nomefile = 'UNIMED_GERAISDEMINAS_' + hoje + '.csv' 
    
                        
fs.writeFile('files/' + nomefile, csv, function(err) {
    if (err) {
        res.status(501).send(err);
    } else {


    
        

        client.connect(function () {
            
            client.upload(['files/' + nomefile], '/envio/', {
                baseDir: 'files',
                overwrite: 'none'   //all none ou older
            }, function (result) {
                console.log(result);
            });
            
            
            });

        


    }
});



    conn.close();
})
.catch(function(err){
    console.log(err);
    conn.close();
})
})
}

select();