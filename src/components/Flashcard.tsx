import React, { useEffect, useState } from 'react';
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
        onClick={handleFlip} appearance="outline">
        <Button appearance="transparent">
        {isFlipped ? backText : frontText}
        </Button>
      </Card>
    </Stack>
  );
};

export default Flashcard;
