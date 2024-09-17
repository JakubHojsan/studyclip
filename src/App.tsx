import React, { useState , useEffect } from 'react';
import './App.css';
import NavBar from './components/Nav';
import Navbar from './components/landing/heading';
import { Button, Checkbox, Dropdown, makeStyles, TabList, tokens, Radio, RadioGroup, Field, SkeletonContextProvider } from "@fluentui/react-components";
import Flashcard from './flashcard';

import main from './ChatCompletion';

const App: React.FC = () => {

  // LIst of focus areas for flashcards
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== value));
    }
  };

  const [selectedRadio, setSelectedRadio] = useState<string>('');

  // Call the ChatCompletion function and store the result of the async function

  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await main();
      setResult(result);
      console.log("Result: ", result);
    };

    fetchData();
  }, []);

  console.log("Result: ", result);
  
  return (
    // Create a new TabList component
    <>
      <NavBar />
      <TabList>
      </TabList>
      <div id="Wtf are we doing">
        <Field label="CHOOSE ONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!">
        <RadioGroup value={selectedRadio} layout="horizontal" onChange={(_, data) => setSelectedRadio(data.value)}>
          <Radio value="john oliver" label="Small"/>
            <Radio value="conan o'brien" label="Medium"/>
            <Radio value="jon stewart" label="Large"/>
          </RadioGroup>
        </Field>
      </div>

      <p>Selected host: {selectedRadio}</p>


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

      <Flashcard frontText={result} backText="Back of the card" />
    </>
  );
};

export default App;
