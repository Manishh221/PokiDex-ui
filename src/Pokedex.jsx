import { useState, useEffect } from "react";
import axios from "axios";
import "./Pokedex.css";

// ─── Constants ────────────────────────────────────────────────────────────────

const API_BASE = "http://localhost:8080/api/pokemon";

const statColors = {
  "hp":              "#E24B4A",
  "attack":          "#D85A30",
  "defense":         "#185FA5",
  "special-attack":  "#533AB7",
  "special-defense": "#0F6E56",
  "speed":           "#BA7517",
};

const statLabels = {
  "hp":              "HP",
  "attack":          "Attack",
  "defense":         "Defense",
  "special-attack":  "Sp. Atk",
  "special-defense": "Sp. Def",
  "speed":           "Speed",
};

// ─── StatBar Component ────────────────────────────────────────────────────────

function StatBar({ stat }) {
  const [width, setWidth] = useState(0);

  const pct   = Math.min(100, Math.round((stat.base_stat / 255) * 100));
  const color = statColors[stat.stat.name] || "#888";
  const label = statLabels[stat.stat.name] || stat.stat.name;

  // Animate bar on mount
  useEffect(() => {
    const timer = setTimeout(() => setWidth(pct), 80);
    return () => clearTimeout(timer);
  }, [pct]);

  return (
    <div className="stat-row">
      <span className="stat-name">{label}</span>
      <span className="stat-val">{stat.base_stat}</span>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ─── Main Pokedex Component ───────────────────────────────────────────────────

export default function Pokedex() {
  const [query,   setQuery]   = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  // ── Search handler ──
  const handleSearch = async () => {
    const name = query.trim().toLowerCase();

    if (!name) {
      setError("Please Enter Any Pokemon Name!");
      return;
    }

    setError("");
    setPokemon(null);
    setLoading(true);

    try {
      const response = await axios.get(`${API_BASE}/${name}`);
      setPokemon(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError(`"${name}" not found. Is the name correct?`);
      } else {
        setError("An error occurred. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Enter key support ──
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="pokedex">

      {/* Header */}
      <div className="header">
        <h1>Pokédex</h1>
        <p>Search Any Pokemon By Their Name</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. charizard, pikachu, bulbasaur..."
        />
        <button onClick={handleSearch}>🔍 Search</button>
      </div>

      {/* Error Box */}
      {error && <div className="error-box">{error}</div>}

      {/* Loader */}
      {loading && (
        <div className="loader">
          <span className="spin">⚙️</span> Loading...
        </div>
      )}

      {/* Pokemon Card */}
      {pokemon && (
        <div className="card">

          {/* Top: Image + Info */}
          <div className="card-top">
            <img
              className="pokemon-img"
              src={pokemon.image}
              alt={pokemon.name}
            />
            <div className="pokemon-info">
              <div className="pokemon-id">
                #{String(pokemon.id).padStart(3, "0")}
              </div>
              <div className="pokemon-name">{pokemon.name}</div>

              {/* Type Badges */}
              <div className="type-badges">
                {pokemon.types.map((type) => (
                  <span key={type} className={`badge ${type}`}>{type}</span>
                ))}
              </div>

              {/* Meta Pills */}
              <div className="meta-row">
                <span className="meta-pill">Height: <span>{(pokemon.height / 10).toFixed(1)}m</span></span>
                <span className="meta-pill">Weight: <span>{(pokemon.weight / 10).toFixed(1)}kg</span></span>
                <span className="meta-pill">Base XP: <span>{pokemon.baseExperience}</span></span>
              </div>
            </div>
          </div>

          {/* Body: Stats + Abilities */}
          <div className="card-body">

            <div className="section-label">Base Stats</div>
            <div className="stats-grid">
              {pokemon.stats.map((s) => (
                <StatBar key={s.stat.name} stat={s} />
              ))}
            </div>

            <div className="section-label">Abilities</div>
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
