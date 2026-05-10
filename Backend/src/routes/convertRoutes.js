const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware")

const convertPdfToWord = require("../controllers/convertController");


router.post("/",upload.single("file"), convertPdfToWord);


// router.post("/",(req,res)=>{
//     upload.single("file")(req,res, function(err){
//         if(err){
//             console.log(err);
//             return res.status(500).json({
//                 success:"false",
//                 error:err.message,
//             });
//         }
//         console.log(req.file);

//         res.json({
//             succes:"true",
//             file: req.file,
//         })
//     })
// })
module.exports = router;