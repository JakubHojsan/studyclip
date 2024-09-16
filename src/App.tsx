// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FileUploader from './FileUploader';  // Import the FileUploader component

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/upload">Upload File</Link>
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<h2>Welcome to the Home Page</h2>} />
          <Route path="/upload" element={<FileUploader />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
