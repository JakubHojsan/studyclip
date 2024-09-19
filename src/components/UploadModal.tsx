import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Input, Label, makeStyles } from '@fluentui/react-components';
import FileSelector, { FileData } from "./FileUploader";
import { FlashcardData, FlashcardListProps } from "./FlashcardList";

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
      body: JSON.stringify({ prompt: prompt }),
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

  return (
    // Dialog component
    <>
        <Dialog open={isDialogOpen} onOpenChange={(_, data) => setIsDialogOpen(data.open)}>
          <DialogSurface>
            <DialogBody>
                <DialogTitle>Add Notes</DialogTitle>
                <FileSelector selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/>
                <DialogContent className={styles.content}>
                    <Label htmlFor="study-goals-input">
                    Study Goals
                    </Label>
                    <Input id="study-goals-input" />
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