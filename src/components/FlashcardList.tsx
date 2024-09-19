import React, { useCallback, useEffect, useState } from 'react';
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
  setFlashcards: React.Dispatch<React.SetStateAction<FlashcardData[]>>
}

const FlashcardList: React.FC<FlashcardListProps> = ({ flashcards, setFlashcards}) => {
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

  // Function to go to the previous flashcard
  const goToBeginning = () => {
      setCurrentIndex(0);
  };

  // Function to go to the previous flashcard
  const goToEnd = () => {
      setCurrentIndex(flashcards.length - 1);
  };
  // Shuffle function using Fisher-Yates algorithm
  const shuffleFlashcards = () => {
    const shuffled = [...flashcards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setFlashcards(shuffled);
    setCurrentIndex(0); // Reset to the first card
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goToNext(); // Right arrow key to go to the next card
      } else if (event.key === 'ArrowLeft') {
        goToPrevious(); // Left arrow key to go to the previous card
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]); // Dependencies include currentCardIndex to make sure it updates correctly

  return (
    <Stack horizontalAlign="center" tokens={stackTokens} style={{ marginTop: '150px'}}>
      {/* Render the current flashcard */}
      <Flashcard 
        frontText={flashcards[currentIndex].frontText} 
        backText={flashcards[currentIndex].backText} 
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
      />

      {/* Navigation Buttons */}
      <Stack horizontal tokens={stackTokens} verticalAlign='center'  style={{ marginTop: '15px', marginBottom: '5px'}}>
        <Button
          onClick={goToBeginning}
          disabled={currentIndex === 0} // Disable if on the first card
          appearance="secondary"
        >
        Go to first
        </Button>
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
        <Button
          onClick={goToEnd}
          disabled={currentIndex === flashcards.length - 1} // Disable if on the last card
          appearance="secondary"
          >
          Go to end
        </Button>
      </Stack>
      <Button
          onClick={shuffleFlashcards}
          appearance="primary"
          style={{width: "15%"}}
          >
          Shuffle
      </Button>
    </Stack>
  );
};

export default FlashcardList;
