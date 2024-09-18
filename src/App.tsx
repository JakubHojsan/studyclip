import React, { useState , useEffect } from 'react';
import './App.css';
import NavBar from './components/Nav';
import Navbar from './components/landing/heading';
import { Button, Checkbox, Dropdown, makeStyles, TabList, tokens, Radio, RadioGroup, Field, SkeletonContextProvider } from "@fluentui/react-components";
import FlashcardList, { FlashcardData, FlashcardListProps } from './components/FlashcardList';


const App: React.FC = () => {
  
  const [selectedFiles, setSelectedFiles] = useState<{ name: string; content: string }[]>([]);

  // LIst of focus areas for flashcards
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const handleCheckboxChange = (value: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== value));
    }
  };

  const [selectedRadio, setSelectedRadio] = useState<string>('');
  
  const sampleFlashcards: FlashcardData[] = [
    { frontText: 'What is the capital of France?', backText: 'Paris' },
    { frontText: 'Who wrote "To Kill a Mockingbird"?', backText: 'Harper Lee' },
    { frontText: 'What is the chemical symbol for water?', backText: 'H2O' },
    { frontText: 'What year did the Titanic sink?', backText: '1912' },
    { frontText: 'Who painted the Mona Lisa?', backText: 'Leonardo da Vinci' },
    { frontText: 'What is the smallest planet in our solar system?', backText: 'Mercury' },
    { frontText: 'What is the speed of light?', backText: '299,792,458 meters per second' },
    { frontText: 'Who discovered penicillin?', backText: 'Alexander Fleming' },
    { frontText: 'What is the largest desert in the world?', backText: 'Sahara Desert' },
    { frontText: 'Who was the first man to walk on the moon?', backText: 'Neil Armstrong' }
  ];

  const [flashcards, setFlashcards] = useState<FlashcardData[]>(sampleFlashcards);
  
  const prompt = "NASA is a space org. Janna is a software engineer.";

  async function fetchFlashcards() {

    const response = await fetch("http://localhost:5001/api/generateFlashcards", {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },  
      // add prompt
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await response.json() as FlashcardListProps;

    console.log("data", data);
    
    setFlashcards(data.flashcards);

    setLoading(false);
  }

  useEffect(() => {
    fetchFlashcards();
  }, []);
  
  
  return (
    // Create a new TabList component
    <>
      <NavBar setSelectedFiles={setSelectedFiles}/>
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

      <FlashcardList flashcards={flashcards} />
    </>
  );
};

export default App;
