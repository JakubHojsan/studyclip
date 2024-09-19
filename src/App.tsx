import React, { useState , useEffect } from 'react';
import './App.css';
import NavBar from './components/Nav';
import Navbar from './components/landing/heading';
import { Button, Checkbox, Dropdown, makeStyles, TabList, tokens, Radio, RadioGroup, Field, SkeletonContextProvider, } from "@fluentui/react-components";
import FlashcardList, { FlashcardData, FlashcardListProps } from './components/FlashcardList';
import Lottie from 'react-lottie';
import animationData from './assets/loadinganimation.json';
import { FileSelectorProps } from './components/FileUploader';

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
  const [prompt, setPrompt] = useState<string>('');
  useEffect(() => {
    fetchFlashcards();
  }, [prompt]);
  const handleSendFiles = ()  => {
    const sendFiles = async () => {
      console.log("Number of files sent: ", selectedFiles.length);
      console.log("File: ", selectedFiles.toString());

      const reader = new FileReader();
      const sometext = selectedFiles[0].content;
      console.log("sometext: ", sometext);

      setPrompt(sometext);
    };
    if (selectedFiles.length > 0) {
      sendFiles();
    } else {
      console.log('No files uploaded');
    };
  };
  
  const animationDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);

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
  
  const fileSelectorProps: FileSelectorProps = {
    selectedFiles,
    setSelectedFiles
  };

  return (
    // Create a new TabList component
    <>
      <NavBar fileSelectorProps={fileSelectorProps} handleSendFiles={handleSendFiles}/>
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
      
      <Button id="sendFilesButton" onClick={handleSendFiles}>MUH CARDS</Button>

      {flashcards?.length > 0 && <FlashcardList flashcards={flashcards} />}

    </>
  );
};


export default App;
