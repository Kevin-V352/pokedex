import { useState, useEffect } from 'react';

import axios from 'axios';

import pokemonApi from '../api/pokemonAPI';
import elementsPalette from '../data/elementsPalette';
import { DefenseRatePercentage, ElementTypeResponse } from '../interfaces/ElementTypesInterface';
import { Generation } from '../interfaces/elementTypesInterface';
import { Type } from '../interfaces/pokemonsInterfaces';

// >>> Hook >>>

const useStatsData = (currentPokemonTypes: Type[]) => {
  const source = axios.CancelToken.source();
  const requestConfig = { cancelToken: source.token };

  const [defenseRatePercentages, setDefenseRatePercentages] = useState<DefenseRatePercentage[]>([]);

  const getPercentages = async () => {
    try {
      const promisesElementTypesDetails = currentPokemonTypes.map(({ type: { url } }) => (
        pokemonApi.get<ElementTypeResponse>(url, requestConfig)
      ));
      const elementTypesDetailsResponse = await Promise.all(promisesElementTypesDetails);
      const elementTypesDetails = elementTypesDetailsResponse.map((item) => item.data);

      setDefenseRatePercentages(calculateMultipliersByType(elementTypesDetails));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    };
  };

  // >>> Auxiliary functions >>>

  const calculateMultipliersByType = (elementTypesDetails: ElementTypeResponse[]) => {
    // eslint-disable-next-line prefer-const
    let doubleDamageFrom: any[] = [];
    // eslint-disable-next-line prefer-const
    let halfDamageFrom: any[] = [];
    // eslint-disable-next-line prefer-const
    let noDamageFrom: any[] = [];
    // eslint-disable-next-line prefer-const
    let arrA: any[] = [];
    // eslint-disable-next-line prefer-const
    let arrB: any = [];

    // We map the array with the information of the types and extract the properties we need.

    // eslint-disable-next-line camelcase
    const damageMultipliers = elementTypesDetails.map(({ name, damage_relations }) => {
      // eslint-disable-next-line camelcase
      const { double_damage_from, half_damage_from, no_damage_from } = damage_relations;

      return {
        double_damage_from,
        half_damage_from,
        no_damage_from,
        name
      };
    });

    // If there is more than one type we merge the arrays.
    damageMultipliers.forEach((item) => {
      doubleDamageFrom = [...doubleDamageFrom, ...item.double_damage_from];
      halfDamageFrom = [...halfDamageFrom, ...item.half_damage_from];
      noDamageFrom = [...noDamageFrom, ...item.no_damage_from];
    });

    // We added the respective damage multiplication values to all items within each array.
    doubleDamageFrom = doubleDamageFrom.map((item) => addValues(item, doubleDamageFrom, 2));
    halfDamageFrom = halfDamageFrom.map((item) => addValues(item, halfDamageFrom, 0.5));
    noDamageFrom = noDamageFrom.map((item) => addValues(item, noDamageFrom, 0));

    // We filter duplicate objects (if they exist) within each array.
    doubleDamageFrom = doubleDamageFrom.filter(filterDoubleItems);
    halfDamageFrom = halfDamageFrom.filter(filterDoubleItems);
    noDamageFrom = noDamageFrom.filter(filterDoubleItems);

    // We join the arrangements of each category.
    arrA = [...doubleDamageFrom, ...halfDamageFrom, ...noDamageFrom];

    // We calculate the final values of all types.
    arrA = arrA.map((item, index, arr) => calculateFinalValue(item, arr));

    // We eliminate duplicate elements.
    arrA = arrA.filter(filterDoubleItems);

    // We add a new arrangement that will contain the remaining elements.
    arrB = Object.keys(elementsPalette).map((name) => ({ name, value: 1 }));

    // We eliminate the elements that already exist inside "arrA".
    arrB = arrB.filter((item: any) => (
      arrA.findIndex((t) => t.name === item.name) === -1));

    // We return a single array with all multipliers calculated.
    return [...arrA, ...arrB];
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>

  const calculateFinalValue = (item: any, arr: any[]) => {
    let finalValue: number = 0;

    arr.forEach(({ name, value }) => {
      if (name === item.name) finalValue = (finalValue === 0) ? value : (finalValue * value);
    });

    return {
      ...item,
      value: finalValue
    };
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>

  const addValues = (item: Generation, arr: any[], value: number) => {
    let valueAdded: number = 0;

    arr.forEach(({ name }) => {
      if (name === item.name) valueAdded = (valueAdded === 0) ? value : (valueAdded * value);
    });

    if (valueAdded === 0) valueAdded = value;

    return {
      name: item.name,
      value: valueAdded
    };
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>

  const filterDoubleItems = (item: any, index: number, arr: any[]) => (
    index === arr.findIndex((t) => (t.name === item.name)));

  useEffect(() => {
    getPercentages();

    return () => {
      source.cancel('Aborting requests for component disassembly');
    };
  }, []);

  return { defenseRatePercentages };
};

export default useStatsData;
