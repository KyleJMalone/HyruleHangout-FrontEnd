import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { MusicPage } from "../MusicPage/MusicPage";
import { GamesPage } from "../GamesPage/Games";
import { WalkthroughsPage } from "../Walkthroughs/WalkthroughsPage";
import NavBar from "../NavBar/NavBar";
import { ForumsPage } from "../Forums/ForumsPage";
import { CommentsPage } from "../CommentsPage/CommentsPage";
import PostPage from "../PostPage/PostPage";
import "./ApplicationViewsStyling.css";

export const ApplicationViews = () => {
  const localProjectUser = localStorage.getItem("capstone_user");
  const projectUserObject = JSON.parse(localProjectUser);
  const location = useLocation();

  return (
    <>
      <NavBar />
      {projectUserObject && (
        <div className="banner">
          Logged in as: {projectUserObject.userName}
        </div>
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Add the landing page route */}
        <Route path="/music" element={<MusicPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/walkthroughs" element={<WalkthroughsPage />} />
        <Route path="/forums/*" element={<ForumsPage />} /> {/* Update the forums route */}
        <Route path="/forums/:forumId/AddPost" element={<PostPage />} />
        <Route path="/comments/comments/" element={<CommentsPage />} />
      </Routes>
    </>
  );
};
// Add the LandingPage component
const LandingPage = () => {
  return (
    <div className="landing-page">
      <video className="landing-video" autoPlay muted loop>
        <source src="https://cdn.artstation.com/p/video_sources/001/355/814/zelda-tears-of-the-kingdom-artwork-live-wallpaper.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
