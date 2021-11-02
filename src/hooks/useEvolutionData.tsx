import { useEffect, useState } from 'react';

import axios from 'axios';

import pokemonApi from '../api/pokemonAPI';
import { EvolutionResponse, Chain, Species, EvolutionItem } from '../interfaces/evolutionInterfaces';
import { PokemonResponse } from '../interfaces/pokemonsInterfaces';
import { SpecieResponse } from '../interfaces/speciesInterfaces';

// >>> Hook >>>

const useEvolutionData = (species: Species) => {
  const source = axios.CancelToken.source();
  const requestConfig = { cancelToken: source.token };

  const [evolutions, setEvolutions] = useState<EvolutionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const { data: { evolution_chain: { url } } } = await pokemonApi
        .get<SpecieResponse>(species.url, requestConfig);

      const { data: { chain } } = await pokemonApi
        .get<EvolutionResponse>(url, requestConfig);

      if (chain.evolves_to.length !== 0) {
        const evolutionArr = iterateNestedObjects(chain);

        const promisesDetailsPokemon = [...evolutionArr, evolutionArr[evolutionArr.length - 1]]
          .map(({ prevPokemon, nextPokemon }, index) => {
            const currentPokemon = (index !== evolutionArr.length - 1) ? prevPokemon : nextPokemon;
            return pokemonApi
              .get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`, requestConfig);
          });
        const pokemonDetailsResponse = await Promise.all(promisesDetailsPokemon);
        const pokemonDetails = pokemonDetailsResponse.map((item) => item.data);

        setEvolutions(rearrangeData(pokemonDetails, evolutionArr));
      };

      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    };
  };

  useEffect(() => {
    loadData();

    return () => {
      source.cancel('Aborting requests for component disassembly');
    };
  }, []);

  return {
    evolutions,
    isLoading
  };
};

// >>> Auxiliary functions >>>

const rearrangeData = (pokemonDetails: PokemonResponse[], evolutionArr: any[]) => (
  evolutionArr.map(({ prevPokemon, nextPokemon, minLevel }) => {
    const prevObj = pokemonDetails[pokemonDetails.findIndex((t) => t.name === prevPokemon)];
    const nextObj = pokemonDetails[pokemonDetails.findIndex((t) => t.name === nextPokemon)];

    return {
      prevPokemon: {
        name: prevObj.name,
        id: prevObj.id,
        img: prevObj.sprites.other!['official-artwork'].front_default
      },
      nextPokemon: {
        name: nextObj.name,
        id: nextObj.id,
        img: nextObj.sprites.other!['official-artwork'].front_default
      },
      minLevel
    };
  })
);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>

const iterateNestedObjects = (evolutionData: Chain) => {
  let loopCut: boolean = true;
  let currentEvolutionObject: Chain = evolutionData;
  const evolutionArr = [];

  while (loopCut) {
    if (currentEvolutionObject.evolves_to[0]) {
      evolutionArr.push({
        prevPokemon: currentEvolutionObject.species.name,
        minLevel: currentEvolutionObject.evolves_to[0].evolution_details[0].min_level,
        nextPokemon: currentEvolutionObject.evolves_to[0].species.name
      });

      // eslint-disable-next-line prefer-destructuring
      currentEvolutionObject = currentEvolutionObject.evolves_to[0];
    } else {
      loopCut = false;
    };
  };

  return evolutionArr;
};

export default useEvolutionData;
