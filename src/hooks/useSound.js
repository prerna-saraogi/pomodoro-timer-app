import { useRef } from "react";

const useSound = (soundPath) => {
  const soundRef = useRef(null);

  if (!soundRef.current) {
    soundRef.current = new Audio(soundPath);
    soundRef.current.load();
  }

  const play = () => {
    soundRef.current.currentTime = 0;
    soundRef.current.play().catch((error) => {
      console.warn("Sound playback failed:", error);
    });
  };
  return play;
};

export default useSound;
