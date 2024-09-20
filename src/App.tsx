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

  const loadingStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const flashcardStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  
  return (
    <>
      <NavBar setFlashcards={setFlashcards} loading={loading} setLoading={setLoading} flashcards={flashcards}/>

      {loading ?
        <div style={loadingStyle}>
          <Spinner label="Generating Flashcards..." size="large"/>
        </div> :
        flashcards?.length > 0 && 
        <div style={flashcardStyle}>
          <FlashcardList flashcards={flashcards} setFlashcards={setFlashcards} />
        </div>
      }
    </>
  );
};


export default App;