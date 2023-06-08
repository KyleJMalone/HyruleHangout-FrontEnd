import React from "react";
import { Route, Routes } from "react-router-dom";
import { MusicPage } from "../MusicPage/MusicPage";
import { GamesPage } from "../GamesPage/Games";
import { WalkthroughsPage } from "../Walkthroughs/WalkthroughsPage";
import NavBar from "../NavBar/NavBar";
import { ForumsPage } from "../Forums/ForumsPage";
import { CommentsPage } from "../CommentsPage/CommentsPage";
import PostPage from "../PostPage/PostPage"; // Import the PostPage component

export const ApplicationViews = () => {
  const localProjectUser = localStorage.getItem("capstone_user");
  const projectUserObject = JSON.parse(localProjectUser);
  
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/music" element={<MusicPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/walkthroughs" element={<WalkthroughsPage />} />
        <Route path="/forums/*" element={<ForumsPage />} /> {/* Nest the ForumsPage route */}
        <Route path="/forums/*/post" element={<PostPage />} /> {/* Add the PostPage route */}
        <Route path="/comments/comments*" element={<CommentsPage />} /> {/* Nest the CommentsPage route */}
      </Routes>
    </>
  );
};
