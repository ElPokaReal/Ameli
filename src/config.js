const {config} = require('dotenv')

config();

module.exports={
    db:{
    user:process.env.bd_usuario,
    password:process.env.bd_pass,
    host:process.env.bd_host,
    port:process.env.bd_puerto,
    database:process.env.bd_db
    }
}