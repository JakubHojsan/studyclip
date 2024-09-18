import React, { useEffect, useState } from 'react';
import { Stack, Text, IStackTokens } from '@fluentui/react';
import {Button} from '@fluentui/react-components'
import Flashcard from './Flashcard'; // Import the Flashcard component

// Define spacing tokens
const stackTokens: IStackTokens = { childrenGap: 10 };

export interface FlashcardData {
  frontText: string;
  backText: string;
}

export interface FlashcardListProps {
  flashcards: FlashcardData[];
}

const FlashcardList: React.FC<FlashcardListProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Manage the current flashcard index
  const [isFlipped, setIsFlipped] = useState<boolean>(false); // Manage flip state

  // Reset flip state when navigating to a different flashcard
  useEffect(() => {
    setIsFlipped(false); // Reset the flip state when currentIndex changes
  }, [currentIndex]);
  
  // Function to go to the next flashcard
  const goToNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to go to the previous flashcard
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Stack horizontalAlign="center" verticalAlign="center" tokens={stackTokens}>
      {/* Render the current flashcard */}
      <Flashcard 
        frontText={flashcards[currentIndex].frontText} 
        backText={flashcards[currentIndex].backText} 
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
      />

      {/* Navigation Buttons */}
      <Stack horizontal tokens={stackTokens} horizontalAlign="center">
        <Button
          onClick={goToPrevious}
          disabled={currentIndex === 0} // Disable if on the first card
          appearance="secondary"
        >
        Previous
        </Button>
        <Text variant="mediumPlus">{`${currentIndex + 1} / ${flashcards.length}`}</Text>
        <Button
          onClick={goToNext}
          disabled={currentIndex === flashcards.length - 1} // Disable if on the last card
          appearance="secondary"
          >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};

export default FlashcardList;
