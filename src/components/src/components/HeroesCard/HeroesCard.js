import React, { useState } from 'react';
import "./HeroesCard.css";
import { Link } from 'react-router-dom';

function HeroesCard({ hero, onDeleteHero }) {
  const { id, name, publisher, isFavorite } = hero;
  const [isFav, setFav] = useState(isFavorite);

  function handleDeleteClick(e) {
    fetch(`https://json-server-pj-backend.herokuapp.com/heroes/${id}`, {
        method: "DELETE",
      });
      onDeleteHero(id);
  }

  function handleUpdateClick() {
    fetch(`https://json-server-pj-backend.herokuapp.com/heroes/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            isFavorite: !isFav
        }),
        })
    .then((response) => response.json())
    .then((updateHero) => {
    });
  }

    return (
        <div className="hero">
        <h2>
          <Link to={`/heroes/${id}`}>{name}</Link>
        </h2>
        <div className="hero-desc">
          <p>Publisher: {publisher}</p>
        </div>
        <div className="details">
            {isFav ? (
                <button onClick={() => {handleUpdateClick(); setFav(false)}} className="emoji-button favorite active">★</button>
                ) : (
                <button onClick={() => {handleUpdateClick(); setFav(true)}} className="emoji-button favorite">☆</button>
                )}
                <button onClick={handleDeleteClick} className="emoji-button delete">🗑</button>
        </div>
      </div>
    );
}

export  default HeroesCard;