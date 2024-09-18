import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Input, Label, makeStyles } from '@fluentui/react-components';

interface ModalProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const useStyles = makeStyles({
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
  });

const UploadModal: React.FC<ModalProps> = (props) => {

  // Automatically open the dialog on page load
  useEffect(() => {
    props.setIsDialogOpen(true);
  }, []);

  // Function to close the dialog
  const closeDialog = () => {
    props.setIsDialogOpen(false);
  };  

  const styles = useStyles();
  const handleModalSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    console.log("Modal submitted");
  };

  return (
    // Dialog component
    <>
      {props.isDialogOpen && (
        <Dialog open={props.isDialogOpen} onOpenChange={(_, data) => props.setIsDialogOpen(data.open)}>
          <DialogSurface>
            <form onSubmit={handleModalSubmit}>
              <DialogBody>
                <DialogTitle>Add Notes</DialogTitle>
                <DialogContent className={styles.content}>
                  <Label htmlFor="study-goals-input">
                    Study Goals
                  </Label>
                  <Input id="study-goals-input" />
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">Close</Button>
                  </DialogTrigger>
                  <Button appearance="primary">Do Something</Button>
                </DialogActions>
              </DialogBody>
            </form>
          </DialogSurface>
        </Dialog>
      )}
    </>
  );
};

export default UploadModal;