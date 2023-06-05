import React, { useEffect, useState } from "react";
import { Card, Text } from "react-sheikah-ui";
import "./GamesPage.css";

export const GamesPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7248/api/Games")
      .then((response) => response.json())
      .then((gamesData) => {
        setGames(gamesData);
      });
  }, []);

  return (
    <div className="games-page">
      <h1 className="page-title">Games</h1>
      <div className="games-list">
        {games.map((game) => (
          <Card key={game.id} className="game-card" withBorder>
            <img src={game.gameImg} alt={game.title} className="game-image" />
            <div className="game-details">
              <Text variant="title-2" className="game-title">
                {game.title}
              </Text>
              <Text variant="small" className="game-description">
                Release Year: {game.dateReleased}
              </Text>
              <Text variant="small" className="game-description">
                Description: {game.description}
              </Text>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
