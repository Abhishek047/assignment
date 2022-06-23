import {
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useTimer } from "./useTimer";

export const Clock = () => {
    const [timeInput, setTimeInput] = useState(180);
    const [time, setTime] = useState(180);

    const { currentTime, percentComplete, startTimer, stopTimer, pauseTimer, continueTimer } =
        useTimer();

    const start = async () => {
        setTime(timeInput);
        startTimer(timeInput);
        setTimeInput(0);
    };

    return (
        <Container maxWidth='lg'>
            <Typography align='center' variant='h2' gutterBottom>
                Timer
            </Typography>
            <Box
                my={2}
                display='grid'
                style={{
                    placeItems: "center",
                }}>
                <TextField
                    label='Time in seconds'
                    value={timeInput}
                    type='number'
                    onChange={(e) => setTimeInput(Math.abs(e.target.value))}
                />
            </Box>

            {/* CLOCK */}
            <Box mx='auto' width='fit-content' position={"relative"}>
                <CircularProgress size='5em' variant='determinate' value={percentComplete} />
                <Box
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -60%)",
                    }}>
                    {currentTime > 0 && <Typography>{currentTime}</Typography>}
                </Box>
            </Box>

            {/* CLOCK CONTROL */}
            <Box my={2}>
                <Typography variant='subtitle2' align='center'>
                    Current Timer is of - {time} seconds
                </Typography>
            </Box>

            <Box
                my={2}
                display='grid'
                style={{
                    placeItems: "center",
                }}>
                <ButtonGroup variant='contained' aria-label='outlined primary button group'>
                    <Button onClick={start}>Start</Button>
                    <Button onClick={continueTimer}>Continue</Button>
                    <Button onClick={pauseTimer}>Pause</Button>
                    <Button onClick={stopTimer}>Reset</Button>
                </ButtonGroup>
            </Box>
        </Container>
    );
};
