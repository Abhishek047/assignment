import { useState, useCallback, useEffect, useMemo } from "react";
export const useTimer = () => {
    // I can avoid using it if you want just used in case i need to find other things too
    const [timerValue, setTimerValue] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const startTimer = useCallback((time) => {
        setTimerValue(time);
        setCurrentTime(time);
    }, []);

    const continueTimer = useCallback(() => {
        if (currentTime) {
            setTimeout(() => setCurrentTime(currentTime - 1), 1000);
        }
    }, [currentTime]);

    const pauseTimer = useCallback(() => {
        clearInterval(intervalId);
    }, [intervalId]);

    const stopTimer = useCallback(() => {
        pauseTimer();
        setCurrentTime(0);
    }, [pauseTimer]);

    useEffect(() => {
        if (!currentTime || currentTime < 0) {
            return;
        }
        const id = setInterval(() => setCurrentTime(currentTime - 1), 1000);
        setIntervalId(id);

        return () => clearInterval(id);
    }, [currentTime]);

    const percentComplete = useMemo(() => {
        if (!timerValue) {
            return 100;
        }
        if (currentTime) {
            return Math.trunc((currentTime * 100) / timerValue);
        } else {
            return 100;
        }
    }, [currentTime, timerValue]);

    return { currentTime, percentComplete, stopTimer, startTimer, pauseTimer, continueTimer };
};
