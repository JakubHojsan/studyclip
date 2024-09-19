import React, { useState, useEffect } from 'react';
import { useFilePicker } from 'use-file-picker';
import {Button} from '@fluentui/react-components';
import { useStyles } from "./FileUploader.styles";

export interface FileSelectorProps {
  selectedFiles: {
    name: string;
    content: string;
}[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<{
    name: string;
    content: string;
}[]>>
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
