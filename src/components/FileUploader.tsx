import React, { useState, useEffect } from 'react';
import { useFilePicker } from 'use-file-picker';
import {Button} from '@fluentui/react-components';
import { useStyles } from "./FileUploader.styles";

const FileSelector: React.FC = () => {
  var classes = useStyles();
  const [selectedFiles, setSelectedFiles] = useState<{ name: string; content: string }[]>([]);
  const { filesContent, openFilePicker } = useFilePicker({
    accept: '.txt,.pdf',
    multiple: true,
  });

  useEffect(() => {
    if (filesContent.length) {
      setSelectedFiles(filesContent);
    }
  }, [filesContent]);

  return (
      <Button appearance="primary" className={classes.filePickerButton} onClick={() => openFilePicker()}>Select Files</Button>
  );
};

export default FileSelector;
