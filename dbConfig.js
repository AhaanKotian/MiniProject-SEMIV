require('dotenv').config();

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const connectionString2 = `postgres://mohak:pPsLrXH4zbTm986HSLj82qe8np3qgSlc@dpg-ch0im7rh4hsukp30s5ig-a.oregon-postgres.render.com/liber_lxys?ssl=true`;
const connectionString3 = `postgres://mohak:pPsLrXH4zbTm986HSLj82qe8np3qgSlc@dpg-ch0im7rh4hsukp30s5ig-a/liber_lxys`;

// const pool = new Pool({
//     connectionString: isProduction ? process.env.DATABASE_URL : connectionString3, 
//     ssl: isProduction
// });

const pool = new Pool({
    host: 'dpg-ch0im7rh4hsukp30s5ig-a.oregon-postgres.render.com',
    port: '5432',
    database: 'liber_lxys',
    user: 'mohak',
    password: 'pPsLrXH4zbTm986HSLj82qe8np3qgSlc',
    ssl: true
  });

module.exports = { pool };