import React, { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { MinimalInformation } from '../interfaces/pokemonsInterfaces';
import Loader from './Loader';
import PokemonCard from './PokemonCard';
import WarningMessage from './WarningMessage';

interface Props {
  data: MinimalInformation[];
  onEndReached: () => void;
  numberOfItems: number;
};

const getItemLayout = (data: any, index: number) => (
  { length: hp(19), offset: (hp(19) * index), index }
);

const ListOfPokemons = ({ data, numberOfItems, onEndReached }: Props) => {
  const renderItem = useCallback(({ item }) => <PokemonCard pokemon={item} />, []);
  const keyExtractor = useCallback(({ id }) => id.toString(), []);
  const renderFooterLoader = useCallback(() => <Loader customStyles={styles.footerLoader} />, []);
  const renderFooterMessage = useCallback((text: string) => (
    <WarningMessage
      text={text}
      customContainerStyles={styles.footerMessage}
    />
  ), []);

  const selectFooter = () => {
    if (numberOfItems === 0) {
      return renderFooterMessage('Without results');
    }
    if (numberOfItems === data.length) {
      return renderFooterMessage('End of the list');
    }

    return renderFooterLoader();
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      ListFooterComponent={selectFooter}
      getItemLayout={getItemLayout}
      contentContainerStyle={styles.listContianerStyle}
    />
  );
};

const styles = StyleSheet.create({
  listContianerStyle: {
    alignItems: 'center',
    width: wp(100)
  },
  footerLoader: {
    height: hp(22),
    flex: 0
  },
  footerMessage: {
    flex: 0,
    marginVertical: hp(3)
  }
});

export default ListOfPokemons;
