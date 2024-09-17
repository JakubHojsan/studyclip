// App.tsx
import React from 'react';
import './App.css';
import Navbar from './components/landing/heading'
import { Button, TabList } from "@fluentui/react-components";
import FileUploader from './components/FileUploader';

const App: React.FC = () => {
  return (
    // Create a new TabList component
    <>
    <TabList>
      <FileUploader />
    </TabList>
    <Button appearance="primary">dASIDJFIADJFIDf</Button>
    </>
  );
};

export default App;
