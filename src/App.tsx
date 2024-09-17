// App.tsx
import React from 'react';
import './App.css';
import NavBar from './components/Nav';
import { Button, TabList } from "@fluentui/react-components";

const App: React.FC = () => {
  return (
    // Create a new TabList component
    <TabList>
      <NavBar />
      <Button> Select Files </Button>
    </TabList>
  );
};

export default App;
