import React, { useEffect, useState } from "react";
import { Card, Text, Button } from "react-sheikah-ui";
import axios from "axios";
import "./MusicPage.css";

export const MusicPage = () => {
  const [music, setMusic] = useState([]);

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    try {
      const response = await axios.get("https://localhost:7248/api/Music");
      setMusic(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlay = (track) => {
    const audioElement = new Audio(track.audioUrl);
    audioElement.addEventListener("canplaythrough", () => {
      audioElement.play();
    });
    console.log("Playing track:", track.title);
  };

  return (
    <div className="music-page">
      <h1 className="page-title">SongBook</h1>
      <div className="music-list">
        {music.map((track) => (
          <Card key={track.id} className="music-card" withBorder>
            <img
              src={track.albumImg}
              alt={track.title}
              className="music-image"
            />
            <div className="music-details">
              <Text variant="title-2" className="music-title">
                {track.title}
              </Text>
              <Text variant="small" className="music-description">
                Genre: {track.genre}
              </Text>
              <Text variant="small" className="music-description">
                Artist: {track.artistName}
              </Text>
              <Text variant="small" className="music-description">
                Released: {track.dateReleased}
              </Text>
              <Button
                variant="primary"
                onClick={() => handlePlay(track)}
                className="play-button"
              >
                Play: {track.title}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
