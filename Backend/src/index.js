const express = require("express")
const app = express();
require('dotenv').config();


app.use(express.json());


const InitalizeConnection = async ()=>{
    try{
        app.listen(process.env.PORT, ()=>{
            console.log("Server listening at port number :"+ process.env.PORT)
        })
    }
    catch(err){
        console.log("Error "+err);
    }
}

InitalizeConnection();