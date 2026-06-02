import { useState } from "react";
import axios from "axios";
import "./Pokedex.css";

const API_BASE = "http://localhost:8080/api/pokemon";

export default function Pokedex() {

  const [query,   setQuery]   = useState("");   
  const [pokemon, setPokemon] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");   

  
  const handleSearch = async () => {

    
    if (!query.trim()) {
      setError("Please enter a Pokemon name!");
      return;
    }

   
    setError("");
    setPokemon(null);
    setLoading(true);

    try {
      
      const response = await axios.get(`${API_BASE}/${query.trim().toLowerCase()}`);
      setPokemon(response.data);

    } catch (err) {
      // Handle errors
      if (err.response?.status === 404) {
        setError(`"${query}" not found!`);
      } else {
        setError("Something went wrong. Please try again!");
      }
    } finally {
      setLoading(false); 
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="pokedex">

     
      <div className="header">
        <h1>Pokédex</h1>
        <p>Search any Pokemon by name</p>
      </div>

     
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. pikachu, charizard..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && (
        <div className="error-box">{error}</div>
      )}

     
      {loading && (
        <div className="loader">Loading...</div>
      )}

     
      {pokemon && (
        <div className="card">

          
          <div className="card-top">
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-img" />

            <div className="pokemon-info">
              <p className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</p>
              <h2 className="pokemon-name">{pokemon.name}</h2>

             
              <div className="type-badges">
                {pokemon.types.map((type) => (
                  <span key={type} className={`badge ${type}`}>{type}</span>
                ))}
              </div>

              
              <div className="meta-row">
                <span className="meta-pill">Height: <strong>{(pokemon.height / 10).toFixed(1)}m</strong></span>
                <span className="meta-pill">Weight: <strong>{(pokemon.weight / 10).toFixed(1)}kg</strong></span>
                <span className="meta-pill">Base XP: <strong>{pokemon.baseExperience}</strong></span>
              </div>
            </div>
          </div>

          
          <div className="card-body">

           
            <p className="section-label">Base Stats</p>
            <div className="stats-grid">
              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="stat-row">
                  <span className="stat-name">{s.stat.name}</span>
                  <span className="stat-val">{s.base_stat}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ width: `${Math.round((s.base_stat / 255) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

           
            <p className="section-label">Abilities</p>
            <div className="abilities-row">
              {pokemon.abilities.map((a) => (
                <span key={a} className="badge ability">{a}</span>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}