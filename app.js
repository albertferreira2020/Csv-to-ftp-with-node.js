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
var sqlselect = "SELECT * FROM YOURTABLE"
rs.query(sqlselect).then(function(recordset){
//    console.log(recordset);

var day = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
var today = day.split("-", 3);
var daymonth = today[2].split(" ")
today = daymonth[0] + today[1] + today[0]

    
var opts = {
    data: recordset, //fonte dos dados para exportar
    wrap  : '',
    doubleQuotes:'', //elimina aspas duplas se houver
    quotes:'', //elimina aspas duplas por padrão
    del:';', //determina o separador
    hasCSVColumnTitle:false, //determina se mostra os campos ou não
};
var csv = json2csv(opts);
var filename = 'YOURFILE_' + today + '.csv' 
    
                        
fs.writeFile('files/' + filename, csv, function(err) {
    if (err) {
        res.status(501).send(err);
    } else {


    
        

        client.connect(function () {
            
            client.upload(['files/' + filename], '/envio/', {
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