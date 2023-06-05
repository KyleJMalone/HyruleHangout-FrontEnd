import React from "react";
import { Route, Routes } from "react-router-dom";
import { MusicPage } from "../MusicPage/MusicPage";
import { GamesPage } from "../GamesPage/Games";
import { ForumsPage } from "../Forums/ForumsPage";
import NavBar from "../NavBar/NavBar"; // Correct the import statement

export const ApplicationViews = () => {
  const localProjectUser = localStorage.getItem("capstone_user");
  const projectUserObject = JSON.parse(localProjectUser);
  
  return (
    <>
      <NavBar /> {/* Include the NavBar component */}
      <Routes>
        <Route path="/music" element={<MusicPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/forums" element={<ForumsPage />} />

      </Routes>
    </>
  );
};
