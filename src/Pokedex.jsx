import { useState } from "react";
import axios from "axios";
import "./Pokedex.css";

const API_BASE = "http://localhost:8080/api/pokemon";

// Different color for each stat bar
const statColors = {
  "hp":              "#E24B4A",
  "attack":          "#D85A30",
  "defense":         "#378ADD",
  "special-attack":  "#533AB7",
  "special-defense": "#0F6E56",
  "speed":           "#ef9f27",
};

// Random color for loader bar - changes every search
const COLORS = ["#E24B4A", "#378ADD", "#97c459", "#ef9f27", "#afa9ec", "#ed93b1", "#5DCAA5"];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function Pokedex() {

  // State variables
  const [query,   setQuery]   = useState("");   // search input value
  const [pokemon, setPokemon] = useState(null); // fetched pokemon data
  const [loading, setLoading] = useState(false);// show/hide loader
  const [error,   setError]   = useState("");   // error message
  const [loaderColor, setLoaderColor] = useState(COLORS[0]); // random color each search

  // Search function - called on button click or Enter key
  const handleSearch = async () => {

    // Show error if input is empty
    if (!query.trim()) {
      setError("Please enter a Pokemon name!");
      return;
    }

    // Reset state before new search
    setError("");
    setPokemon(null);
    setLoaderColor(randomColor()); // pick new random color
    setLoading(true);

    try {
      // Fetch pokemon data from backend
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
      setLoading(false); // always stop loader
    }
  };

  // Trigger search on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="pokedex">

      {/* Header */}
      <div className="header">
        <h1>Pokédex</h1>
        <p>Search any Pokemon by name</p>
      </div>

      {/* Search Bar */}
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

      {/* Error Message - only shown when error exists */}
      {error && (
        <div className="error-box">{error}</div>
      )}

      {/* Loader - only shown while fetching */}
      {loading && (
        <div className="loader">
          <div className="loader-bar" style={{ background: loaderColor }} />
        </div>
      )}

      {/* Pokemon Card - only shown when data is available */}
      {pokemon && (
        <div className="card">

          {/* Top Section: Image + Basic Info */}
          <div className="card-top">
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-img" />

            <div className="pokemon-info">
              <p className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</p>
              <h2 className="pokemon-name">{pokemon.name}</h2>

              {/* Type Badges */}
              <div className="type-badges">
                {pokemon.types.map((type) => (
                  <span key={type} className={`badge ${type}`}>{type}</span>
                ))}
              </div>

              {/* Height, Weight, Base XP */}
              <div className="meta-row">
                <span className="meta-pill">Height: <strong>{(pokemon.height / 10).toFixed(1)}m</strong></span>
                <span className="meta-pill">Weight: <strong>{(pokemon.weight / 10).toFixed(1)}kg</strong></span>
                <span className="meta-pill">Base XP: <strong>{pokemon.baseExperience}</strong></span>
              </div>
            </div>
          </div>

          {/* Bottom Section: Stats + Abilities */}
          <div className="card-body">

            {/* Base Stats */}
            <p className="section-label">Base Stats</p>
            <div className="stats-grid">
              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="stat-row">
                  <span className="stat-name">{s.stat.name}</span>
                  <span className="stat-val">{s.base_stat}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${Math.round((s.base_stat / 255) * 100)}%`,
                        background: statColors[s.stat.name] || "#888"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Abilities */}
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