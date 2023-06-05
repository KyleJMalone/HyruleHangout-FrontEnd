import React, { useEffect } from "react";
import { MusicPage } from "../MusicPage/Music";

const initYouTubePlayer = () => {
  // Load the YouTube Player API
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/player_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Function called when YouTube API is ready
  window.onYouTubePlayerAPIReady = () => {
    // Create a new YouTube player
    new YT.Player("youtube-player", {
      videoId: "GdzrrWA8e7A", // Replace with your YouTube video ID
      width: 640,
      height: 360,
      playerVars: {
        // Add any additional player parameters here
      },
      events: {
        // Add any player events you want to handle here
      },
    });
  };
};

const MusicPage = () => {
  useEffect(() => {
    initYouTubePlayer();
  }, []);

  return (
    <div>
      <h1>My Music</h1>
      <div id="youtube-player"></div>
      {/* Rest of your music page content */}
    </div>
  );
};

export default MusicPage;
