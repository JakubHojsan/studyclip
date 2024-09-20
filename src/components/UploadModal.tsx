import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Input, Label, makeStyles } from '@fluentui/react-components';
import FileSelector, { FileData } from "./FileUploader";
import { FlashcardData, FlashcardListProps } from "./FlashcardList";
import type { InputProps } from "@fluentui/react-components";

interface ModalProps {
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    setFlashcards: (flashcards: FlashcardData[]) => void;
    setLoading: (loading: boolean) => void;
}

const useStyles = makeStyles({
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
  });

const UploadModal: React.FC<ModalProps> = ({isDialogOpen, setIsDialogOpen, setFlashcards, setLoading}) => {

  const [selectedFiles, setSelectedFiles] = useState<FileData[]>([]);
  const styles = useStyles();
  const [studyGoal, setStudyGoal] = useState<string>("To review");
  const [numFlashcards, setNumFlashcards] = useState<number>(20);

  const handleSendFiles = async () => {
    const sendFiles = async () => {
      console.log("Number of files sent: ", selectedFiles.length);
      console.log("File: ", selectedFiles.toString());

      const sometext = selectedFiles[0].content;
      console.log("sometext: ", sometext);

      fetchFlashcards(sometext);
    };

    if (selectedFiles.length > 0) {
      sendFiles();
    } else {
      console.log('No files uploaded');
    };
  };

  async function fetchFlashcards(prompt: string): Promise<void> {
    setLoading(true);

    const response = await fetch("http://localhost:5001/api/generateFlashcards", {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },  
      // add prompt
      body: JSON.stringify({ prompt: prompt, studyGoal: studyGoal, numCards: numFlashcards}),
    });

    const data = await response.json() as FlashcardListProps;

    console.log("data", data);
    
    setFlashcards(data.flashcards);

    setLoading(false);
  }
  
  // Automatically open the dialog on page load
  useEffect(() => {
    setIsDialogOpen(true);
  }, []);

  // Reset selected files when the dialog is opened
  useEffect(() => {
    if (isDialogOpen) {
      setSelectedFiles([]);
    }
  }, [isDialogOpen]);

  const onChange: InputProps["onChange"] = (ev, data) => {
    if (data.value.length <= 20) {
      setStudyGoal(data.value);
    }
  };

  const onChangeFlashCards: InputProps["onChange"] = (ev, data) => {
    if (data.value) {
      const numValue = parseInt(data.value, 10); // Use parseFloat for decimals
      if (!isNaN(numValue)) {  // Check if the parsed value is a valid number
        setNumFlashcards(numValue);  // Set the numeric value to state
      }
    }
  };

  return (
    // Dialog component
    <>
        <Dialog open={isDialogOpen} onOpenChange={(_, data) => setIsDialogOpen(data.open)} modalType={"alert"}>
          <DialogSurface>
            <DialogBody>
                <DialogTitle>Customize your deck</DialogTitle>
                <FileSelector selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/>
                <DialogContent className={styles.content}>
                    <Label htmlFor="study-goals-input">
                    Study Goals
                    </Label>
                    <Input id="study-goals-input" onChange={onChange}/>
                    <Label htmlFor="num-flashcards-input">
                    How many flashcards do you want?
                    </Label>
                    <Input id="num-flashcards-input" type="number" onChange={onChangeFlashCards} style={{marginBottom: 10}}/>
                </DialogContent>
                <DialogActions>
                    <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">Cancel</Button>
                    </DialogTrigger>
                    <Button appearance="primary" disabled={selectedFiles?.length <= 0} onClick={() => {handleSendFiles(); setIsDialogOpen(false)}}>Create StudyClips</Button>
                </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
    </>
  );
};

export default UploadModal;