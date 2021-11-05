import { useEffect, useState } from 'react';

import axios from 'axios';

import pokemonApi from '../api/pokemonAPI';
import { PokemonResponse } from '../interfaces/pokemonsInterfaces';

const usePokemonDetails = (id: number) => {
  const source = axios.CancelToken.source();
  const requestConfig = { cancelToken: source.token };

  const [pokemonDetails, setPokemonDetails] = useState<PokemonResponse>({} as PokemonResponse);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(true);

  const loadPokemonDetails = async () => {
    try {
      const { data } = await pokemonApi
        .get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`, requestConfig);

      setPokemonDetails(data);
      setLoadingDetails(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    };
  };

  useEffect(() => {
    loadPokemonDetails();

    return () => {
      source.cancel('Aborting requests for component disassembly');
    };
  }, []);

  return {
    pokemonDetails,
    loadingDetails
  };
};

export default usePokemonDetails;
