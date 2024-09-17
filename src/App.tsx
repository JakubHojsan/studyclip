import React, { useState } from 'react';
import './App.css';
import Navbar from './components/landing/heading';
import { Button, Checkbox, Dropdown, makeStyles, TabList, tokens } from "@fluentui/react-components";

const App: React.FC = () => {

  // List of checkbox options
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  // Initialize state to track selected checkboxes as a list of strings
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  // Handle checkbox selection/deselection
  const handleCheckboxChange = (value: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Add the checkbox value to the list of selected checkboxes
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    } else {
      // Remove the checkbox value from the list of selected checkboxes
      setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== value));
    }
  };


  return (
    <>
      <TabList>
      </TabList>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {options.map(option => (
          <Checkbox
            key={option}
            label={option}
            checked={selectedCheckboxes.includes(option)}
            onChange={handleCheckboxChange(option)}
          />
        ))}
      </div>
      
      <p>Selected options: {selectedCheckboxes.length > 0 ? selectedCheckboxes.join(', ') : 'None'}</p>
    </>
  );
};

export default App;
