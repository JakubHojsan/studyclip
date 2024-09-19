import React, { useState , useEffect } from 'react';
import './App.css';
import NavBar from './components/Nav';
import Navbar from './components/landing/heading';
import { Button, Checkbox, Dropdown, makeStyles, TabList, tokens, Radio, RadioGroup, Field, SkeletonContextProvider, Spinner } from "@fluentui/react-components";
import FlashcardList, { FlashcardData, FlashcardListProps } from './components/FlashcardList';
import animationData from './assets/loadinganimation.json';
import UploadModal from './components/UploadModal';
import { FileSelectorProps } from './components/FileUploader';

const App: React.FC = () => {

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

  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const animationDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }; 
  
  return (
    <>
      {/*<NavBar setSelectedFiles={setSelectedFiles}/>*/}
      <NavBar setFlashcards={setFlashcards} setLoading={setLoading}/>

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

      {loading ?
        <div className="spinner-container">
          <Spinner label="Generating Flashcards" />
        </div> :
        flashcards?.length > 0 && <FlashcardList flashcards={flashcards} />
      }


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
