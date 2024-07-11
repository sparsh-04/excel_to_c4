// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  const [xml, setXml] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setXml(response.data.xml);
      console.log(response.data.xml);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(xml);
  };
  const fetchFileContent = async () => {
    try {
      const response = await fetch('http://localhost:5001/output');
      const data = await response.text();
      setFileContent(data);
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };


  return (
    <div>
      <h1>Excel to XML Converter</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {xml && (
        <div>
        <textarea value={xml} readOnly rows="10" cols="50"></textarea>
          <button onClick={handleCopy}>Copy to Clipboard</button>
        </div>
      )}
      <button onClick={fetchFileContent}>Show Output File</button>
      {fileContent && (
        <div>
          <h2>Output File Content:</h2>
          <textarea value={fileContent} readOnly rows="10" cols="50"></textarea>
        </div>
      )}
    </div>
  );
}

export default App;