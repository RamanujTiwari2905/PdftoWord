import {useState} from "react";
import axios from "axios";

function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e)=> setSelectedFile(e.target.files[0]);
  const handleConvert = async ()=>{
    if(!selectedFile){
      alert("Please select a PDF file")
      return;
    }
    try{
      setLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post("http://localhost:4000/api/convert", 
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data],
        {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }
      ));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("downlaod", "converted.docx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    }catch(err){
      alert("Error converting file");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-2">PDF To Word</h1>
        <p className="text-gray-300 text-center mb-8">Convert your PDF files into DOCX easily</p>
        <label className="border-2 border-dashed border-gray-400 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover: border-white transition duration-300">
        <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden"/>
        <p className="text-white text-lg font-medium">Click to upload PDF</p>
        <p className="text-gray-400 text-sm mt-2">Only PDF files allowed</p>
        </label>
        {selectedFile && (<div className="mt-4 bg-white/10 p-3 rounded-xl">
          <p className="text-green-400 text-sm"> Selected: {selectedFile.name}</p>
        </div>)}
        <button onClick={handleConvert} disabled={loading} className="w-full mt-6 bg-white text-black font-semibold py-3 rounded-2xl hover:bg-gray-200 transition duration-300 disabled:opacity-50">
          {loading ? "Converting...." : "Converted to Word"}
        </button>
      </div>
    </div>
  )
}

export default App
