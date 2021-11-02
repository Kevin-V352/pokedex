/* eslint-disable camelcase */
import { useEffect, useState } from 'react';

import axios from 'axios';

import pokemonApi from '../api/pokemonAPI';
import { formatName, formatIndexNumber } from '../helpers/textFormatters';
import { ElementTypeResponse } from '../interfaces/ElementTypesInterface';
import { Ability, GameIndex, PokemonResponse, Stat } from '../interfaces/pokemonsInterfaces';
import { SpecieResponse } from '../interfaces/speciesInterfaces';
import { AboutItem } from '../interfaces/useAboutDataInterfaces';

interface AboutState {
  desc: string;
  pokedexData: AboutItem[];
  training: AboutItem[];
  breeding: AboutItem[];
  location: AboutItem[];
};

// >>> Hook >>>

const useAboutData = (pokemon: PokemonResponse) => {
  const { types, species } = pokemon;

  const source = axios.CancelToken.source();
  const requestConfig = { cancelToken: source.token };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [aboutData, setAboutData] = useState<AboutState>({
    desc: '',
    pokedexData: [],
    training: [],
    breeding: [],
    location: []
  });

  const loadData = async () => {
    try {
      const { data: specieResponse } = await pokemonApi
        .get<SpecieResponse>(species.url, requestConfig);

      const promisesElementTypesDetails = types.map(({ type: { url } }) => (
        pokemonApi.get<ElementTypeResponse>(url, requestConfig)
      ));
      const elementTypesDetailsResponse = await Promise.all(promisesElementTypesDetails);
      const elementTypesDetails = elementTypesDetailsResponse.map((item) => item.data);

      setAboutData(rearrangeData(specieResponse, elementTypesDetails, pokemon));

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
    ...aboutData,
    isLoading
  };
};

// >>> Auxiliary functions >>>

const rearrangeData = (
  species: SpecieResponse,
  elementTypesDetails: ElementTypeResponse[],
  pokemon: PokemonResponse
): AboutState => {
  let pokedexData: AboutItem[] = [];
  let training: AboutItem[] = [];
  let breeding: AboutItem[] = [];
  let location: AboutItem[] = [];

  const {
    height,
    weight,
    abilities,
    stats,
    base_experience,
    game_indices
  } = pokemon;

  const {
    genera,
    egg_groups,
    growth_rate,
    gender_rate,
    capture_rate,
    hatch_counter,
    base_happiness,
    flavor_text_entries
  } = species;

  pokedexData = [
    { title: 'Species', payload: searchPropertiesByLanguage(genera, 'en', 'genus'), type: 'simple' },
    { title: 'Height', payload: `${(height / 10)}m (${toFeet(height)})`, type: 'simple' },
    { title: 'Weight', payload: `${(weight / 10)}kg (${((weight / 10) * 2.2).toFixed(1)}) lbs`, type: 'simple' },
    { title: 'Abilities', payload: separateSkills(abilities), type: 'abilities-arr' },
    { title: 'Weaknesses', payload: calculateWeaknesses(elementTypesDetails), type: 'weaknesses-arr' }
  ];

  training = [
    { title: 'EV Yield', payload: filterSkillsWithEffort(stats), type: 'ev-shield-arr' },
    { title: 'Catch Rate', payload: capture_rate, type: 'simple' },
    { title: 'Base Friendship', payload: base_happiness, type: 'simple' },
    { title: 'Base Exp', payload: base_experience, type: 'simple' },
    { title: 'Growth Rate', payload: formatNamesWithSpacing(growth_rate.name), type: 'simple' }
  ];

  breeding = [
    { title: 'Gender', payload: calculateGenderPercentage(gender_rate), type: 'genre-arr' },
    { title: 'Egg Groups', payload: egg_groups.map(({ name }) => formatName(name)).join(', '), type: 'simple' },
    { title: 'Egg Cycles', payload: hatch_counter, type: 'simple' }
  ];

  location = sortLocations(game_indices);

  return {
    desc: searchPropertiesByLanguage(flavor_text_entries, 'en', 'flavor_text').replace(/\n/g, ' '),
    pokedexData,
    training,
    breeding,
    location
  };
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>

const sortLocations = (gameIndices: GameIndex[]) => {
  const result: any[] = [];

  gameIndices.forEach(({ game_index }) => {
    const location: GameIndex[] = [];

    if (result.findIndex(({ title }) => title === game_index) === -1) {
      gameIndices.forEach((item) => (
        (game_index === item.game_index) && location.push(item)
      ));

      result.push({
        title: game_index,
        payload: location.map(({ version: { name } }) => formatNamesWithSpacing(name)),
        type: 'locations-arr'
      });
    };
  });

  return result.map((item) => ({ ...item, title: formatIndexNumber(item.title) }));
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>

const formatNamesWithSpacing = (text: string) => (
  text
    .split('-')
    .map((item) => formatName(item))
    .join(' ')
);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>

const filterSkillsWithEffort = (stats: Stat[]) => (
  stats
    .filter(({ effort }) => effort > 0)
    .map(({ stat: { name }, effort }) => ({
      name: formatNamesWithSpacing(name),
      effort
    }))
);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>

const separateSkills = (abilities: Ability[]) => {
  const normal: string[] = [];
  const hidden: string[] = [];

  abilities.forEach(({ ability: { name }, is_hidden }) => {
    const formattedName: string = formatNamesWithSpacing(name);
    return is_hidden ? hidden.push(formattedName) : normal.push(formattedName);
  });

  return {
    normal,
    hidden
  };
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>

const toFeet = (n: number) => {
  const realFeet = (((n * 10) * 0.393700) / 12);
  const feet = Math.floor(realFeet);
  const inches = Math.round((realFeet - feet) * 12);
  return `${feet}'${inches}"`;
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>

const searchPropertiesByLanguage = (arr: any[], language: string, search: string) => {
  const index = arr.findIndex((t) => t.language.name === language);
  return arr[index][search];
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>

const calculateGenderPercentage = (genderRate: number) => {
  if (genderRate !== -1) {
    const femamlePercentaje: number = ((genderRate / 8) * 100);

    return ({
      femalePercentage: `${femamlePercentaje}%`,
      malePercentage: `${(100 - femamlePercentaje)}%`
    });
  };
  return 'No gender';
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>

const calculateWeaknesses = (typeDetails: ElementTypeResponse[]) => {
  let result: any[] = [];

  const doubleDamageArr = typeDetails.map(({ damage_relations: { double_damage_from: ddf } }) => (
    ddf
  ));
  doubleDamageArr.forEach((arr) => { result = [...result, ...arr]; });

  result = result.filter(filterDoubleItems);

  return result.map(({ name }) => name);
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>

const filterDoubleItems = (item: any, index: number, arr: any[]) => (
  index === arr.findIndex((t) => (t.name === item.name)));

export default useAboutData;
