const   mysql   =require('mysql')
const dotev = require('dotenv')
dotev.config()

 const db = mysql.createConnection({
  host:process.env.Host,
  user:process.env.user,
  password:process.env.password,
  database:process.env.database,
})


    db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });

module.exports={db}