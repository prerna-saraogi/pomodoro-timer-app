import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import useSound from '../hooks/useSound';
import completionAlert from '../assets/completionAlert.mp3';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const defaultDurations = {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
    };

    const [activeTab, setActiveTab] = useState('pomodoro');
    const [durations, setDurations] = useState(defaultDurations);
    const [timeLeft, setTimeLeft] = useState(durations[activeTab] * 60);
    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef(null);

    const playCompletion = useSound(completionAlert);

    // Sync timeLeft when timer tab changes or duration updates
    useEffect(() => {
        setTimeLeft(durations[activeTab] * 60);
        setIsRunning(false);
    }, [activeTab, durations]);

    // Countdown logic
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev === 0) {
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        playCompletion();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const value = {
        activeTab,
        setActiveTab,
        durations,
        setDurations,
        timeLeft,
        setTimeLeft,
        isRunning,
        setIsRunning,
    };

    return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimer = () => useContext(TimerContext);