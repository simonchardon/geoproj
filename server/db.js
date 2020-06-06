const Pool = require('pg').Pool

// pg module for use pgClient on all file
module.exports = new Pool({
    host: 'postgres',
    port: 5432,
    user: 'admin',
    password: '7wzpfrc25500',
    database: 'geoideproj'
});