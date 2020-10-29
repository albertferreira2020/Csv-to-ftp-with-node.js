# app node.js to send csv files by ftp protocol

## csv-to-ftp

This app is node file for create a csv file from database Microsoft Sql Server and posteriorly send to ftp. Also you can send to email using framework nodemailer.
This project has the frameworks json2csv, ftp-client, mssql and fs native.

##
var json2csv = require('json2csv'); <br>
var ftpClient = require('ftp-client'); <br>
var fs = require('fs'); <br>
var sql = require("mssql");<br><br>

///file configuration database and Ftp<br>
var fileconfig = require("./config.js");<br>
var dbconfig = fileconfig.dbconfig <br>
var configftp = fileconfig.configftp<br>
var options = fileconfig.configftp.options<br>
client = new ftpClient(configftp, options);<br><br><br>


//connect database<br>
function select(){<br>
var conn = new sql.Connection(dbconfig);<br>
conn.connect().then(function(){<br>
var rs = new sql.Request(conn);<br>
var sqlselect = "SELECT * FROM YOURTABLE"<br>
rs.query(sqlselect).then(function(recordset){<br>
//    console.log(recordset);<br><br>

var day = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')<br>
var today = day.split("-", 3);<br>
var daymonth = today[2].split(" ")<br>
today = daymonth[0] + today[1] + today[0]<br><br>

    
var opts = {<br>
    data: recordset, //get jsondata<br>
    wrap  : '',<br>
    doubleQuotes:'', //delete quotation marks<br>
    quotes:'', //delete double quotes<br>
    del:';', //define the separator<br>
    hasCSVColumnTitle:false, //show or hiden columns<br>
};<br>
var csv = json2csv(opts);<br>
var filename = 'YOURFILE_' + today + '.csv' <br>
    
                        
fs.writeFile('files/' + filename, csv, function(err) {<br>
    if (err) {<br>
        res.status(501).send(err);<br>
    } else {<br>
        client.connect(function () {<br>
            client.upload(['files/' + filename], '/envio/', {<br>
                baseDir: 'files',<br>
                overwrite: 'none'   //all none ou older<br>
            }, function (result) {<br>
                console.log(result);<br>
            });<br>
        }); <br>   
    }<br>
});<br>
    conn.close();<br>
})<br>
.catch(function(err){<br>
    console.log(err);<br>
    conn.close();<br>
})<br>
})<br>
}<br><br>

select();<br>

