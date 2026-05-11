const fs = require("fs");
const pdfParse = require("pdf-parse");

const ConvertPdtToWord = async (req, res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                success: "false",
                message: "No file uploaded",
            });
        }

        const filePath = req.file.path;
        const pdfBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(pdfBuffer);

        res.status(200).json({
            success: true,
            extractedText: data.text
        })

    }catch(err){
        console.log(err.message)
        res.status(500).json({
            success: "false",
            message: "Error extracting text from PDF",
        });
    }
};

module.exports = ConvertPdtToWord