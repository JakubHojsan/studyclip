import React from 'react';
import { Stack, Link, Text, IStackTokens } from '@fluentui/react';
import FileReader, { FileSelectorProps } from './FileUploader';
import {tokens} from '../index';

// Define spacing between the navigation items
const stackTokens: IStackTokens = { childrenGap: 20 };

const NavBar: React.FC<FileSelectorProps> = (props) => {
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
        <FileReader setSelectedFiles={props.setSelectedFiles}/>
      </Stack>
    </Stack>
  );
};

export default NavBar;
