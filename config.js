module.exports = {
 
    dbconfig: {

    server: "iphost",
    user: "userdatabase",
    password: "passwddatabase",
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
