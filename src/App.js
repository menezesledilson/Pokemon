// App.js
import React, { useState } from "react";
import './App.css';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        throw new Error('Pokémon não encontrado.');
      }
      const data = await response.json();
      setPokemonData({
        name: data.name.toUpperCase(),
        spriteUrl: data.sprites.front_default
      });
      setIsLoading(false);
      setModalOpen(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <button 
        className="search-button"
        style={{ borderRadius: '20px', fontWeight: 'bold' }}
        onClick={() => setModalOpen(true)}
      >
        Buscar Pokémon
      </button>
      {modalOpen && (
        <div className="modal">
          <input
            type="text"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            placeholder="Digite o nome do Pokémon"
          />
          <button onClick={handleSearch}>Buscar</button>
          <button onClick={() => setModalOpen(false)}>Fechar</button>
        </div>
      )}

      {isLoading && <div>Carregando...</div>}
      
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      {pokemonData && (
        <div className="card">
          <img src={pokemonData.spriteUrl} alt={pokemonData.name} />
          <h2>{pokemonData.name}</h2>
        </div>
      )}

      {!pokemonData && (
        <div className="card">
          <h2>Quem é esse Pokémon</h2>
        </div>
      )}
    </div>
  );
}

export default App;
