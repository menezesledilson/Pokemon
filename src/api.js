export async function fetchPokemonData(pokemonName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  if (!response.ok) {
    throw new Error('Pokémon não encontrado.');
  }
  const data = await response.json();
  return {
    name: data.name,
    spriteUrl: data.sprites.front_default,
  };
}
