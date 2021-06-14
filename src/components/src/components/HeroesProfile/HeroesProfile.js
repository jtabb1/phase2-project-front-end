import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './HeroesProfile.css';

function HeroesProfile() {
    const [hero, setHero] = useState([]);
    const params = useParams();
    const id = params.id;

    //Recover the data
    useEffect(() => (
        fetch(`https://json-server-pj-backend.herokuapp.com/heroes/${id}`)
            .then((response) => response.json())
            .then((heroData) => {
                setHero(heroData)
            })
            .catch(err => console.error(err))
        ),[]);
    
    return (
        <div className="card" >
            <h2>{hero.name}</h2>
            <img
                src={hero.image}
                alt={hero.name}
                className="hero-avatar"
            />
            <div ><strong>Real Name:</strong> {hero.realname} <br/> <strong>Publisher:</strong> {hero.publisher} <br/> <strong>Alignment:</strong> {hero.alignment} </div>
        </div>
    );
}

export default HeroesProfile;