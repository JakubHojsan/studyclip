import React, { useState } from 'react';

const FileUploader: React.FC = () => {
  // Define state with the type of the file content being a string
  const [fileContent, setFileContent] = useState<string>('');

  // Function to handle file selection and read file content
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Optional chaining in case no file is selected

    if (file) {
      const reader = new FileReader(); // Create a new FileReader

      // Read the file as a text string
      reader.readAsText(file);

      // On file load, set the content to state
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const text = e.target?.result as string; // Typecast the result to string
        setFileContent(text); // Update state with file content
      };

      // Handle file reading errors
      reader.onerror = () => {
        console.error('File reading error');
      };
    }
  };

  return (
    <div>
      {/* Hidden file input field */}
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }} // Hide the file input
        onChange={handleFileChange}
        accept=".txt" // Optional: accept only text files
      />

      {/* Button to trigger file input */}
      <button onClick={() => document.getElementById('fileInput')?.click()}>
        Upload File
      </button>

      {/* Display the unformatted file content */}
      {fileContent && (
        <div>
          <h3>File Content:</h3>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
