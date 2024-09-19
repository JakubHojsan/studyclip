import React, { useState , useEffect } from 'react';
import './App.css';
import NavBar from './components/Nav';
import Navbar from './components/landing/heading';
import { Button, Checkbox, Dropdown, makeStyles, TabList, tokens, Radio, RadioGroup, Field, SkeletonContextProvider, Spinner } from "@fluentui/react-components";
import FlashcardList, { FlashcardData, FlashcardListProps } from './components/FlashcardList';
import Lottie from 'react-lottie';
import animationData from './assets/loadinganimation.json';
import UploadModal from './components/UploadModal';

const App: React.FC = () => {
  
  const [selectedFiles, setSelectedFiles] = useState<{ name: string; content: string }[]>([]);

  /*
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
  */ 

  const [loading, setLoading] = useState<boolean>(true);

  const handleFormSubmit = (formData: { studyGoals: string }) => {
    console.log('Form Data:', formData);
    // Handle the form data (e.g., send it to a server or update state)
  };

  
  

  
  const [prompt, setPrompt] = useState<string>('NASA is a space org. Janna is a software engineer.');
  
  const handleSendFiles = () => {
    const sendFiles = async () => {
      console.log("Number of files sent: ", selectedFiles.length);
      console.log("File: ", selectedFiles.toString());

      const sometext = selectedFiles[0].content;
      console.log("sometext: ", sometext);

      setPrompt(sometext);
      fetchFlashcards();
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
    setLoading(true);

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
      {/*
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
      */}

      {flashcards?.length > 0 && <FlashcardList flashcards={flashcards} />}
      {(flashcards?.length === 0 || loading) && 
      <div className="spinner-container">
        <Spinner label="Generating Flashcards" />
      </div>}
      {/*
        <div style={{ float: 'left'}}>
          <Lottie 
          options={animationDefaultOptions}
            height={100}
            width={100}
          />
        </div>
      */}

    </>
  );
};


export default App;
