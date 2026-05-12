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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">PDF To Word Converter</h1>
        <input type="file" accept="pdf" onChange={handleFileChange} className="w-full border border-gray-300 rounded-lg p-3 mb-4"/>
        {selectedFile && (<p className="text-sm text-gray-600 mb-4">Selected File : {selectedFile.name}</p>)}
        <button onClick={handleConvert} disabled={loading} className="w-full bg-black text-white py-3 rounded-lg hover: bg-gray-800 transition duration disabled: bg-gray-400">
          {loading ? "Converting...." : "Converted to Word"}
        </button>
      </div>
    </div>
  )
}

export default App
