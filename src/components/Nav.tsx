import React, { useState } from 'react';
import { Stack, Link, Text, IStackTokens } from '@fluentui/react';
import { tokens } from '@fluentui/react-components';
import UploadModal  from './UploadModal';
import { Button, makeStyles } from '@fluentui/react-components';
import {ReactComponent as StudyLogoTitle} from '../assets/studylogotitle.svg';
import { FlashcardData } from './FlashcardList';

interface NavProps {
  flashcards: FlashcardData[]
  setFlashcards: (flashcards: FlashcardData[]) => void;
  setLoading: (loading: boolean) => void;
}

// Define spacing between the navigation items
const stackTokens: IStackTokens = { childrenGap: 20 };

const useStyles = makeStyles({
    logo: {
      width: 'auto',
      height: '32px',
      color: tokens.colorBrandForeground1
    },
});

const NavBar: React.FC<NavProps> = ({ setFlashcards, flashcards, setLoading }) => {
  const styles = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Function to export flashcards in TSV format for Anki
  const exportFlashcardsToAnki = () => {
    // Create TSV format (tab-separated values)
    const ankiData = flashcards
      .map(flashcard => `${flashcard.frontText}\t${flashcard.backText}`)
      .join('\n');

    // Create a blob from the data
    const blob = new Blob([ankiData], { type: 'text/tab-separated-values' });

    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'flashcards.tsv';
    link.click();
  };

  return (
    <Stack
      horizontal
      horizontalAlign="space-between" // Aligns items with space between
      verticalAlign="center"
      tokens={stackTokens}
      styles={{
        root: {
          padding: '10px 20px',
          width: '100%',
          backgroundColor: tokens.colorNeutralBackground3,
        },
      }}
    >
      {/* Left section: Brand or Logo */}
      <StudyLogoTitle className={styles.logo}/>

      {/* Right section: Navigation Links */}
      <Stack horizontal tokens={stackTokens}>
        <UploadModal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} setFlashcards={setFlashcards} setLoading={setLoading}/>
      <Button onClick={exportFlashcardsToAnki} appearance="primary"> Export to Anki </Button>
      <Button onClick={() => setIsDialogOpen(true)} appearance="primary"> Create Flashcards </Button>
      </Stack>
    </Stack>
  );
}

export default NavBar;