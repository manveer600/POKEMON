import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {

    const [pokemonState, setPokemonState] = useState({
        prev: "",
        next: "",
        loading: true,
        data: [],
        pokedexUrl: "https://pokeapi.co/api/v2/pokemon/",
      });


      async function callback() {
        const response = await axios.get(pokemonState.pokedexUrl);
        // setNext(response.data.next);
        // setPrev(response.data.previous);
        if (response?.data?.results) {
          setPokemonState((state) =>({ ...state, loading: false }));
        }
        setPokemonState((state) => ({
          ...state,
          next: response.data.next,
          prev: response.data.previous,
    
        }));
    
        const pokemonPromise = response.data.results.map((pokemonNameAndUrl) =>
          axios.get(pokemonNameAndUrl.url)
        );
        const pokemonData = await axios.all(pokemonPromise);
        const finalData = pokemonData.map((pokemon) => {
          return {
            id: pokemon.data.id,
            name: pokemon.data.name,
            image: pokemon.data.sprites.other.dream_world.front_default,
            types: pokemon.data.types,
          };
        });
        // setData(finalData);
        setPokemonState((state) => ({ ...state, data: finalData }));
      }



      useEffect(() => {
        callback();
      }, [pokemonState.pokedexUrl]);

    return ( 
        [pokemonState,setPokemonState]
     );
}

export default usePokemonList;