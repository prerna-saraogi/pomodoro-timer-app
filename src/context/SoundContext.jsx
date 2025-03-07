import { createContext, useContext, useState, useEffect } from "react";

const SoundContext = createContext();

const getInitialSound = () => {
    const saved = localStorage.getItem("sound");
    return saved === null ? true : JSON.parse(saved);
};

const getInitialVolume = () => {
    const vol = localStorage.getItem("volume");
    return vol === null ? 50 : Number(vol); // Default volume is set to 50
};

const getInitialAlert = () => {
    return localStorage.getItem("alertSound") || "completionAlert.mp3";
};

export const SoundProvider = ({ children }) => {
    const [isSoundOn, setIsSoundOn] = useState(getInitialSound);
    const [volume, setVolume] = useState(getInitialVolume);
    const [selectedAlert, setSelectedAlert] = useState(getInitialAlert); //Alert sound after completing timer

    const toggleSound = () => setIsSoundOn((prev) => !prev);

    useEffect(() => {
        localStorage.setItem("sound", JSON.stringify(isSoundOn));
    }, [isSoundOn]);

    useEffect(() => {
        localStorage.setItem("volume", JSON.stringify(volume));
    }, [volume]);

    useEffect(() => {
        localStorage.setItem("alertSound", selectedAlert);
        console.log(`Alert sound set to: ${selectedAlert}`);
    }, [selectedAlert]);

    return (
        <SoundContext.Provider
            value={{
                isSoundOn,
                setIsSoundOn,
                toggleSound,
                volume,
                setVolume,
                selectedAlert,
                setSelectedAlert,
            }}
        >
            {children}
        </SoundContext.Provider>
    );
};

export const useSoundSettings = () => useContext(SoundContext);
