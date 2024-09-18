import React, { useEffect } from 'react';
import { Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, Button } from '@fluentui/react-components';
interface ModalProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const UploadModal: React.FC<ModalProps> = (props) => {

  // Automatically open the dialog on page load
  useEffect(() => {
    props.setIsDialogOpen(true);
  }, []);

  // Function to close the dialog
  const closeDialog = () => {
    props.setIsDialogOpen(false);
  };

  return (
    <>
      {/* Dialog component */}
      {props.isDialogOpen && (
        <Dialog open={props.isDialogOpen} onOpenChange={(_, data) => props.setIsDialogOpen(data.open)}>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque eaque?
              </DialogContent>
              <DialogActions>
                <Button appearance="secondary" onClick={closeDialog}>Close</Button>
                <Button appearance="primary">Do Something</Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      )}
    </>
  );
};

export default UploadModal;
