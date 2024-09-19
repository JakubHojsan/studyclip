import React, { useEffect, useRef, useState } from 'react';
import { Stack, Text } from '@fluentui/react';
import {Card, Button} from '@fluentui/react-components';

interface FlashcardProps {
  frontText: string;
  backText: string;
  isFlipped: boolean;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>
}

const Flashcard: React.FC<FlashcardProps> = ({ frontText, backText, isFlipped, setIsFlipped }) => {

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };


  useEffect(() => {
    //const ref = useRef(null);

    const handleSpaceBar = (event: KeyboardEvent) => {
      if (event.key === " ") {
        console.log('space pressed');
        event.preventDefault();
        handleFlip();
        console.log(isFlipped);
      }
    }
    window.addEventListener('keydown', handleSpaceBar);
    console.log('registered');
    return () => {
      console.log('de-registered');
      window.removeEventListener('keydown', handleSpaceBar);
    };
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === " ") {
      console.log('space pressed');
      e.preventDefault();
      handleFlip();
      console.log(isFlipped);
    }
    
    //const element = ref.current;
    //element!.addEventListener('keydown', handleSpaceBar);
  }


  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      styles={{
        root: {
          width: '300px',
          margin: '0',
          textAlign: 'center',
        },
      }}
      //onKeyDown={(e) => handleKeyPress(e)}
    >
      {/* Card Component */}
      <Card style={{ 
          width: '350px',
          height: '200px',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden', // Ensure text doesn't overflow outside the card
          textAlign: 'center',}}
        onClick={handleFlip} 
        appearance="outline">
        <Button appearance="transparent">
        {isFlipped ? backText : frontText}
        </Button>
      </Card>
    </Stack>
  );
};

export default Flashcard;
