module.exports = {
 
    dbconfig: {

    server: "192.168.16.208",
    user: "sa",
    password: "sa",
    options: {
        port: 1433,//49161,
        database: 'CLIENTE',
        connectionTimeout : 150000,
        //instancename: 'SQLEXPRESS'
      }

},



//conect ftp
configftp: {
    host: 'ftpconvenio.fidelize.com.br',
    port: 21,
    user: 'ftp_unimed_curvelo',
    password: 'KZQiBTFV'
},
options :{
    logging: 'basic'
}


}
