const { MongoClient } = require('mongodb');

//127.0.0.1
let connectionUrl=`mongodb://127.0.0.1:27017`
let client=new MongoClient(connectionUrl)

let dbConnection=async ()=>{
    await client.connect() //Connection Create

    let db=await client.db(process.env.DBNAME) //DataBase Create
    return db
}

module.exports={dbConnection}