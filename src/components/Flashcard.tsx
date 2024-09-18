import React, { useState } from 'react';
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
      <Card style={{margin: 0}}>
        <Button onClick={handleFlip} appearance="transparent" style={{padding: 0}}>
        {isFlipped ? backText : frontText}
        </Button>
      </Card>
    </Stack>
  );
};

export default Flashcard;
