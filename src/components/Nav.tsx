import React, { useState } from 'react';
import { Stack, Link, Text, IStackTokens } from '@fluentui/react';
import FileReader, { FileSelectorProps } from './FileUploader';
import {tokens} from '../index';
import UploadModal  from './UploadModal';
import { Button } from '@fluentui/react-components';

interface NavProps {
  fileSelectorProps: FileSelectorProps;
  handleSendFiles: ()=> void;
}
// Define spacing between the navigation items
const stackTokens: IStackTokens = { childrenGap: 20 };
const NavBar: React.FC<NavProps> = (props) => {
  
const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
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
      <Text variant="xLarge">
       Studyclip
      </Text>

      {/* Right section: Navigation Links */}
      <Stack horizontal tokens={stackTokens}>
        <UploadModal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} fileSelectorProps={props.fileSelectorProps} handleSendFiles={props.handleSendFiles}/>
      </Stack>
      <Button onClick={() => setIsDialogOpen(true)} appearance="primary"> Create Flashcards </Button>
    </Stack>
  );
}

export default NavBar;
