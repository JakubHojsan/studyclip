import React from 'react';

import {
    Card,
    CardFooter,
    CardHeader,
    CardPreview,
    makeStyles,
} from "@fluentui/react-components";

const useStyles = makeStyles({
    card: {
        width: "720px",
        maxWidth: "100%",
        height: "480px",
        maxHeight: "100%",
        margin: "auto",
        size : "large",
    },
});

export interface IFlashcard {
    frontText: string;
    backText: string;
}

const Flashcard: React.FC<IFlashcard> = ({ frontText, backText }) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader>
                <h2>{frontText}</h2>
            </CardHeader>
            <CardPreview>
                <h2>{backText}</h2>
            </CardPreview>
            <CardFooter>
                <button>Flip</button>
            </CardFooter>
        </Card>
    );
};

export default Flashcard;

