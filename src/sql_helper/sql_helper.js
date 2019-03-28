const should = require('chai'.should());
const mysql = require('mysql');


class SqlHelper{
    
    constructor(){
        should.exist(process.env.DB_USER, 'Environment variable DB_USER not set.');
        should.exist(process.env.DB_PASSWORD, 'Environment variable DB_PASSWORD not set.');
        should.exist(process.env.DB_NAME, 'Environment variable DB_PASSWORD not set.');
        should.exist(process.env.DB_HOST, 'Environment variable DB_PASSWORD not set.');
        should.exist(process.env.DB_PORT, 'Environment variable DB_PASSWORD not set.');

        this.connection = mysql.createConnection({
          host     : process.env.DB_HOST,
          port     : process.env.DB_PORT,
          user     : process.env.DB_USER,
          password : process.env.DB_PASSWORD,
          database : process.env.DB_NAME
        });
    }

    connect(){
        this.connection.connect();
    };

    disconnect(){
        this.connection.end();
    }

    query(query, values=null){
        return this.connection.query({
            sql: query,
            timeout: 30000, // 30s
            values: values
          })
    }
}

module.exports = SqlHelper;