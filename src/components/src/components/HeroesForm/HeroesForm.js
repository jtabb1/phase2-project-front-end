import React, { useState } from "react";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const BASE_URL = 'https://json-server-pj-backend.herokuapp.com/heroes';

function HeroesForm({ onAddHero }) {
  const[form, setForm] = useState({
    name: '',
    realname: '',
    publisher: '',
    alignment: '',
    gender: '',
    image: ''
  });

function handleSubmit(e) {
    e.preventDefault();
    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        realname: form.realname,
        publisher: form.publisher,
        alignment: form.alignment,
        image: form.image,
        isFavorite: false,
      }),
    })
    .then((response) => response.json())
    .then((newHero) => onAddHero(newHero));
  }

  const updateField = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="form">
            <form  noValidate autoComplete="on" onSubmit={handleSubmit} >
                <Input 
                type="text"
                name="name"
                placeholder="Enter a hero's name..."
                value={form.name}
                onChange={updateField}
                />
                
                <Input
                type="text"
                name="realname"
                placeholder="Enter a hero's real name..."
                className="Input-text"
                value={form.realname}
                onChange={updateField}
                />
                
                <Input
                type="text"
                name="publisher"
                placeholder="Enter a hero's publisher..."
                className="Input-text"
                value={form.publisher}
                onChange={updateField}
                />
                
                <Input
                type="text"
                name="alignment"
                placeholder="Enter a hero's alignment..."
                className="Input-text"
                value={form.alignment}
                onChange={updateField}
                />
                
                <Input
                type="text"
                name="image"
                placeholder="Enter a hero's image URL..."
                className="Input-text"
                value={form.image}
                onChange={updateField}
                />
                <br />
                <Button type="submit"variant="outlined" color="secondary">Create Hero</Button>                
            </form>
        </div>
  );
}

export default HeroesForm;