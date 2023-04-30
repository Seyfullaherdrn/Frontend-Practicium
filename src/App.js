import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import ReactAudioPlayer from 'react-audio-player';

function App() {
  const [starships, setStarships] = useState([]);
  const [selectedStarship, setSelectedStarship] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const ref = useRef();
  const [audioPlaying, setAudioPlaying] = useState(true);

  useEffect(() => {
    axios.get('https://swapi.dev/api/starships')
      .then(response => {
        setStarships(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const fallbackImage = 'https://via.placeholder.com/150';

  function handleStarshipClick(starship) {
    setSelectedStarship(starship);
  }

  const filteredStarships = starships.filter(starship =>
    starship.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSelectedStarship(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  function toggleAudio() {
    setAudioPlaying(!audioPlaying);
  }

  return (
    <div className="App">
      <ReactAudioPlayer
        src="https://soundcloud.com/i-m-sidan/star-wars-theme-song-dl-link-to-description?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
        autoPlay
        loop
        volume={0.2}
        muted={!audioPlaying}
      />
      <div className="header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png" alt="Star Wars logo" />
      </div>
      <div className="audio-toggle" onClick={toggleAudio}></div>
      <div className="search-bar">
        <input type="text" placeholder="Search for a starship" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
      </div>
      <div className="container">
        {filteredStarships.map(starship => (
          <div key={starship.name} className="card" onClick={() => handleStarshipClick(starship)}>
            <h2>{starship.name}</h2>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Starwars_Ringraumer3_13.09.2019.png" alt="Star Wars logo" />
            <p>Model: {starship.model}</p>
            <p>Hyperdrive Rating: {starship.hyperdrive_rating}</p>
          </div>
        ))}
      </div>
      {selectedStarship && (
        <div className="selected-starship" ref={ref}>
          <h2>{selectedStarship.name}</h2>
          <p>Model: {selectedStarship.model}</p>
          <p>Manufacturer: {selectedStarship.manufacturer}</p>
          <p>Cost in Credits: {selectedStarship.cost_in_credits}</p>
          <p>Length: {selectedStarship.length}</p>
          <p>Crew: {selectedStarship.crew}</p>
          <p>Passengers: {selectedStarship.passengers}</p>
          <p>Cargo Capacity: {selectedStarship.cargo_capacity}</p>
          <p>Consumables: {selectedStarship.consumables}</p>
    <p>Hyperdrive Rating: {selectedStarship.hyperdrive_rating}</p>
    <p>MGLT: {selectedStarship.MGLT}</p>
    <p>Starship Class: {selectedStarship.starship_class}</p>
    </div>
    )}
    </div>
    );
    }
    
    export default App;