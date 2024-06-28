import React, { useState, useEffect, useRef } from "react";
import { GiSoundOn, GiSoundOff } from "react-icons/gi";

const sound = "/assets/sound3.mp3";

const SoundControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(new Audio(sound));

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying, volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="fixed top-[9.5%] left-[65%] items-center flex">
      <button onClick={handlePlayPause}>
        {!isPlaying ? (
          <div className="flex ml-4  items-center">
            <GiSoundOff size={32} className="text-red-500" />
            <p className="text-xs font-medium italic ">Sound Off</p>
          </div>
        ) : (
          <div className="flex  ml-4 items-center">
            <GiSoundOn size={32} className="text-green-500" />
            <p className="text-xs font-medium italic ">Sound On</p>
          </div>
        )}
      </button>
    </div>
  );
};

export default SoundControl;
