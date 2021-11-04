import { useEffect, useRef, useState } from 'react';

import pokemonApi from '../api/pokemonAPI';
import {
  PokemonResponse,
  MinimalInformation,
  PokemonPaginatedResponse
} from '../interfaces/pokemonsInterfaces';

const usePokemonsPaginated = () => {
  const nextPageUrl = useRef<string>('https://pokeapi.co/api/v2/pokemon?limit=15');

  const [pokemonsListPaged, setPokemonsListPaged] = useState<MinimalInformation[]>([]);
  const [loadingPaginatedList, setLoadingPaginatedList] = useState<boolean>(true);

  const loadPaginatedListItems = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
    nextPageUrl.current = resp.data.next;

    const promisesPokemonDetails = resp.data.results.map(({ url }) => (
      pokemonApi.get<PokemonResponse>(url)
    ));
    const pokemonDetailsResponse = await Promise.all(promisesPokemonDetails);
    const pokemonDetails = pokemonDetailsResponse
      .map(({ data: { name, id, types, sprites } }) => ({
        name,
        id,
        types,
        img: sprites.other?.['official-artwork'].front_default
      }));

    setPokemonsListPaged((previusState) => ([...previusState, ...pokemonDetails]));
    setLoadingPaginatedList(false);
  };

  useEffect(() => {
    loadPaginatedListItems();
  }, []);

  return {
    pokemonsListPaged,
    loadingPaginatedList,
    loadPaginatedListItems
  };
};

export default usePokemonsPaginated;
