const express = require("express")
const app = express();
require('dotenv').config();
const convertRoutes = require("./routes/convertRoutes");


app.use(express.json());
app.use("/api/convert", convertRoutes);


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