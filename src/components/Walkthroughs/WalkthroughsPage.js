import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Text } from "react-sheikah-ui";
import "./WalkthroughsPage.css";

export const WalkthroughsPage = () => {
  const [walkthroughs, setWalkthroughs] = useState([]);

  useEffect(() => {
    fetchWalkthroughs();
    console.log(walkthroughs);
  }, []);

  const fetchWalkthroughs = async () => {
    try {
      const response = await axios.get("https://localhost:7248/api/Walkthrough");
      setWalkthroughs(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="walkthroughs-page">
      <h1 className="page-title">Walkthroughs</h1>
      <div className="walkthroughs-list">
        {walkthroughs.map((walkthrough) => (
          <div key={walkthrough.id} className="walkthrough-card">
            <div className="walkthrough-details">
              <Text variant="title-2" className="walkthrough-title">
                {walkthrough.title}
              </Text>
              <Text className="game-description">{walkthrough.gameDescription}</Text>
              <img
                src={walkthrough.gameImage}
                alt={walkthrough.gameTitle}
                className="game-image"
              />
              <Text><Link className="Link" to={walkthrough.walkthroughUrl}>
                Click here for walkthroughs
              </Link></Text>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
