module.exports = {
 
    dbconfig: {

    server: "192.168.16.208",
    user: "sa",
    password: "sa",
    options: {
        port: 1433,//49161,
        database: 'YOURTABLE',
        connectionTimeout : 150000,
        //instancename: 'SQLEXPRESS'
      }

},



//conect ftp
configftp: {
    host: 'ftp.yourhost.com',
    port: 21,
    user: 'user',
    password: 'passwd'
},
options :{
    logging: 'basic'
}


}
