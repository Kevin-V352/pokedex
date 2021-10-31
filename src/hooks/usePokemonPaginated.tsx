import { useEffect, useRef, useState } from 'react';

import pokemonApi from '../api/pokemonAPI';
import { PokemonPaginatedResponse, PokemonResponse } from '../interfaces/pokemonsInterfaces';

const usePokemonPaginated = () => {
  const nextPageUrl = useRef<string>('https://pokeapi.co/api/v2/pokemon?limit=20');

  const [pokemonList, setPokemonList] = useState<PokemonResponse[]>([]);

  const loadPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
    nextPageUrl.current = resp.data.next;

    const PromisesPokemonDetails = resp.data.results.map(({ url }) => (
      pokemonApi.get<PokemonResponse>(url)
    ));
    const pokemonDetailsResponse = await Promise.all(PromisesPokemonDetails);
    const pokemonDetails = pokemonDetailsResponse.map((item) => item.data);

    setPokemonList((previusState) => ([...previusState, ...pokemonDetails]));
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    pokemonList,
    loadPokemons
  };
};

export default usePokemonPaginated;
