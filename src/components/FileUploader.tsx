import React, { useEffect } from 'react';
import { useFilePicker } from 'use-file-picker';
import {Button} from '@fluentui/react-components';
import { useStyles } from "./FileUploader.styles";

export type FileData = {
  name: string;
  content: string;
};

export interface FileSelectorProps {
  selectedFiles: FileData[];
  setSelectedFiles: (files: FileData[]) => void;
}

const FileSelector: React.FC<FileSelectorProps> = (props) => {
  var classes = useStyles();
  const { filesContent, openFilePicker } = useFilePicker({
    accept: '.txt,.pdf',
    multiple: true,
  });

  useEffect(() => {
    if (filesContent.length) {
      props.setSelectedFiles(filesContent);
    }
  }, [filesContent]);

  return (
      <Button appearance="primary" className={classes.filePickerButton} onClick={() => openFilePicker()}>Select Files</Button>
  );
};

export default FileSelector;
