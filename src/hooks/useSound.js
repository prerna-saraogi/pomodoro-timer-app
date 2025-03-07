import { useEffect, useRef } from "react";
import { useSoundSettings } from "../context/SoundContext";

const useSound = (soundPath) => {
  const soundRef = useRef(null);
  const { isSoundOn, volume } = useSoundSettings();

  useEffect(() => {
    if (!soundPath) return;
    const audio = new Audio(`/assets/sounds/${soundPath}`);
    audio.volume = volume / 100;
    audio.load();
    soundRef.current = audio;
    console.log(`Sound loaded: ${soundPath}`);
  }, [soundPath]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume = volume / 100;
    }
  }, [volume]);

  const play = () => {
    if (!isSoundOn || !soundRef.current) return;

    soundRef.current.currentTime = 0;
    soundRef.current.play().catch((error) => {
      console.warn("Sound playback failed:", error);
    });
  };
  return play;
};

export default useSound;
