const { Client } = require('pg');

const dbConnection = async () => {
    const connectionString = process.env.POSTGRESQL_CONNECTION_STR;
    const client = new Client({ connectionString });
    await client.connect();
    
    return client;
};

module.exports = { dbConnection };