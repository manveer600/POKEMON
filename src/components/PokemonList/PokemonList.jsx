// PokemonList.jsx
import React from "react";
import { useState } from "react";
import Pokemon from "../Pokemon/Pokemon.jsx";
import Search from "../Search/Search.jsx";
import "./pokemonList.css";
import usePokemonList from "../../hooks/usePokemonList.js";
import PokemonDetails from "../PokemonDetails/PokemonDetails.jsx";
function PokemonList() {
  const [pokemonState,setPokemonState] = usePokemonList('https://pokeapi.co/api/v2/pokemon/');
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div>
      <Search updateSearchTerm={setSearchTerm}/>
      {/* {searchTerm} */}

    {!searchTerm ? <div>
      <div className="pokemon-wrapper">
        {pokemonState.loading
          ? "loading...."
          : pokemonState.data.map((pokemon) => (
              <Pokemon
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
                key={pokemon.id}
                id={pokemon.id}
              />
            ))}
      </div>

      <div className="buttons">
        <button
          disabled={pokemonState.prev == null}
          onClick={() =>
            // setPokedexUrl(prev)
            {
              const urlToSet = pokemonState.prev;
              setPokemonState({ ...pokemonState, pokedexUrl: urlToSet });
            }
          }
        >
          Prev
        </button>
        <button
          disabled={pokemonState.next == null}
          onClick={() => {
            const urlToSet = pokemonState.next;
            setPokemonState({ ...pokemonState, pokedexUrl: urlToSet });
          }}
        >
          Next
        </button>
      </div>
      </div> : <PokemonDetails key={searchTerm} pokemonName={searchTerm}/>}
    </div>
  );
}
export default PokemonList;
