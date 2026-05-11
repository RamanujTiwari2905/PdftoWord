const fs = require("fs");
const pdfParse = require("pdf-parse");
const {Document, Packer, Paragraph, TextRun} = require("docx");

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
        const paragraphs = data.text.split("\n").filter((line)=> line.trim()!=="").map((line)=>{
            return new Paragraph({
                children: [
                    new TextRun(line),
                ],
            });
        });
        const doc = new Document({
            sections:[
                {
                    properties: {},
                    children: paragraphs,
                },
            ],  
        });

        const buffer = await Packer.toBuffer(doc);
        const outputPath = `src/converted/${Date.now()}.docx`;
        fs.writeFileSync(outputPath, buffer);

        res.download(outputPath);

    }catch(err){
        console.log(err.message)
        res.status(500).json({
            success: "false",
            message: "Error extracting text from PDF",
        });
    }
};

module.exports = ConvertPdtToWord