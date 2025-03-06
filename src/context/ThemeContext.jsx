import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const getInitialTheme = () => {
    return localStorage.getItem('theme') || 'purple';
};
const getInitialMode = () => {
    return localStorage.getItem('mode') || 'dark';
}

export const ThemeProvider = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState(getInitialTheme);
    const [mode, setMode] = useState(getInitialMode);

    useEffect(() => {
        localStorage.setItem('theme', selectedTheme);
    }, [selectedTheme]);

    useEffect(() => {
        localStorage.setItem('mode', mode);
        document.documentElement.classList.toggle('dark', mode === 'dark');
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme, mode, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);