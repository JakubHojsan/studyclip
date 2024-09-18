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
  
  const prompt: string = `Key Terms and Concepts
Assignment 5
Social Darwinism     
Ideas of racial superiority backed by Darwinism used to justify imperialism in the late 19th century                                       
Benedict Anderson and “Imagined Communities”
Nation: an imagined political community that is imagined as both inherently limited (finite but elastic) and sovereign.
Groups of people claiming common bond
Ernst Renan and “What is a Nation?”
Nations come into play historically; nations have soul and spiritual principle. The past is built upon memories and the present is founded on the will to continue. 
People’s wish, self determination → post Enlightenment age
Italian Unification
‘What is a nation’ in Italian context
Italy was a fragmented nation, consisted of competing city states with Piedmont as the most powerful. Austria had the north of Italy.
Built on idea of going back to the past, heavily idealized past
Wanted to return to Roman Empire/ Renaissance Italy; risorgimento (resurgence, unification). 
Giuseppe Mazzini
Source #1: 1831, ‘Young Italy’
Held very idealistic and optimistic view of Italy, new unified Italy was predestined
Source #2: 1852, ‘On Nationality’
Written after Marxist threat in 1848 in France
Raised social question of capital/labor
What is nationality? → common language, culture, united passion
Source is more pragmatic than previous source`;

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
