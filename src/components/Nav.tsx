import React, { useState } from 'react';
import { Stack, IStackTokens } from '@fluentui/react';
import { FileSelectorProps } from './FileUploader';
import { tokens } from '@fluentui/react-components';
import UploadModal  from './UploadModal';
import { Button, makeStyles } from '@fluentui/react-components';
import {ReactComponent as StudyLogoTitle} from '../assets/studylogotitle.svg';

interface NavProps {
  fileSelectorProps: FileSelectorProps;
  handleSendFiles: ()=> void;
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

const NavBar: React.FC<FileSelectorProps> = (props) => {
  const styles = useStyles();
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
      <StudyLogoTitle className={styles.logo}/>

      {/* Right section: Navigation Links */}
      <Stack horizontal tokens={stackTokens}>
        {/*<FileReader setSelectedFiles={props.setSelectedFiles}/>*/}
        <UploadModal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      </Stack>
      <Button onClick={() => setIsDialogOpen(true)} appearance="primary"> Create Flashcards </Button>
    </Stack>
  );
}

export default NavBar;
