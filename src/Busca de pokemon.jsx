import { useEffect, useState } from "react";

function PokemonSearch({ pokemonName }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    setIsLoaded(false); // Reset isLoaded state before making a new request
    setError(null); // Reset error state

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Pokemon not found");
        }
        return res.json();
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setPokemonData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [pokemonName]); // Trigger effect when pokemonName prop changes

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h2>{pokemonData.name}</h2>
        <img
          src={pokemonData.sprites.front_default}
          alt={pokemonData.name}
        />
        <p>Weight: {pokemonData.weight}</p>
        <p>Height: {pokemonData.height}</p>
      </div>
    );
  }
}

export default PokemonSearch;
