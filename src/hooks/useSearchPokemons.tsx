import { useEffect, useRef, useState } from 'react';

import pokemonApi from '../api/pokemonAPI';
import {
  PokemonResponse,
  MinimalInformation,
  PokemonPaginatedResponse
} from '../interfaces/pokemonsInterfaces';

interface InformationToFilter {
  name: string;
  url: string;
  id: string;
};

const useSearchPokemons = () => {
  const allPokemons = useRef<InformationToFilter[]>([]);
  const pokemonsExtracted = useRef<InformationToFilter[]>([]);
  const lenghtPokemonsExtracted = useRef<number>(0);
  const lengthOfAllPokemons = useRef<number>(0);

  const [pokemonsSearched, setPokemonsSearched] = useState<MinimalInformation[]>([]);
  const [loadingSearchItems, setLoadingSearchItems] = useState<boolean>(true);

  const loadAllPokemons = async () => {
    const { data: { results, count } } = await pokemonApi
      .get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200');

    const minimalInformationArr = results
      .map(({ name, url }) => ({ name, url, id: idExtractor(url) }));

    lengthOfAllPokemons.current = count;
    allPokemons.current = minimalInformationArr;

    setLoadingSearchItems(false);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>

  const getTypesOfPokemons = async (startIndex: number) => {
    if (pokemonsExtracted.current.length > 0) {
      const arr = pokemonsExtracted.current
        .slice(startIndex, (startIndex + 15));

      const pokemonsBasicDataPromises = arr.map(({ url }) => pokemonApi.get<PokemonResponse>(url));
      const pokemonsBasicDataResponses = await Promise.all(pokemonsBasicDataPromises);

      return pokemonsBasicDataResponses
        .map(({ data: { name, id, types, sprites } }) => ({
          name,
          id,
          types,
          img: sprites.other?.['official-artwork'].front_default
        }));
    };

    return [];
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>

  const loadSearchItems = async () => {
    if (pokemonsSearched.length < pokemonsExtracted.current.length) {
      const pokemonsToAdd = await getTypesOfPokemons(pokemonsSearched.length);

      setPokemonsSearched([...pokemonsSearched, ...pokemonsToAdd]);
    };
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>

  const filterPokemons = async (searchTerm: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(searchTerm))) {
      pokemonsExtracted.current = allPokemons.current
        .filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      const pokemonFound = allPokemons.current.find(({ id }) => id === searchTerm);
      pokemonsExtracted.current = pokemonFound ? [pokemonFound] : [];
    };

    lenghtPokemonsExtracted.current = pokemonsExtracted.current.length;

    const newPokemonToShow = await getTypesOfPokemons(0);

    setPokemonsSearched(newPokemonToShow);
  };

  useEffect(() => {
    loadAllPokemons();
  }, []);

  return {
    filterPokemons,
    loadSearchItems,
    pokemonsSearched,
    lengthOfAllPokemons,
    loadingSearchItems,
    lenghtPokemonsExtracted
  };
};

const idExtractor = (url: string) => {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 2];
};

export default useSearchPokemons;
