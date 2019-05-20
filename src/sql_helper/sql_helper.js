const should = require('chai').should();
const mysql = require('mysql2/promise');


class SqlHelper{
    
    constructor(){
        should.exist(process.env.DB_USER, 'Environment variable DB_USER not set.');
        should.exist(process.env.DB_PASSWORD, 'Environment variable DB_PASSWORD not set.');
        should.exist(process.env.DB_NAME, 'Environment variable DB_NAME not set.');
        should.exist(process.env.DB_HOST, 'Environment variable DB_HOST not set.');
        should.exist(process.env.DB_PORT, 'Environment variable DB_PORT not set.');
        
        this.db = mysql.createPool({
            connectionLimit: 10,
            host     : process.env.DB_HOST,
            port     : process.env.DB_PORT,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME,
          });
    }

    async closeConnectionPool(){
        await this.db.end();
    }

    async query(query, values=null){
        const connection = await this.db.getConnection();
        console.log(query, values);
        const [rows] = await connection.execute(query, values)
        if (rows.length < 1) {
            throw new Error(`No data found for selected query: ${query} with the following values: ${values}`);
          }
        connection.release();
        return rows;
    }
}

module.exports = SqlHelper;