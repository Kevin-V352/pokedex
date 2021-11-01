import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import AppText from '../components/AppText';
import CustomIcon from '../components/CustomIcon';
import ListTypesOfElements from '../components/ListTypesOfElements';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import elementsPalette from '../data/elementsPalette';
import { formatName, formatIndexNumber } from '../helpers/textFormatters';
import { colorSelector } from '../helpers/themeSelectors';
import MaterialTopTabNavigator from '../navigators/MaterialTopTabNavigator';
import { RootStackParams } from '../navigators/StackNavigator';
import fontPresets from '../theme/fontPresets';

interface Props extends StackScreenProps<RootStackParams, 'DetailsScreen'> { };

const DetailsScreen = ({ navigation: { navigate }, route: { params } }: Props) => {
  const typeColor: string = elementsPalette[params.types[0].type.name];

  const uri = params.sprites.other!['official-artwork'].front_default;

  const { currentTheme } = useContext(ThemeContext);

  const { top } = useSafeAreaInsets();

  return (
    <View style={{
      ...styles.container,
      backgroundColor: typeColor,
      paddingTop: top,
      height: hp(100)
    }}
    >
      <StatusBar
        animated
        backgroundColor={typeColor}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('HomeScreen')}>
          <Icon name="arrow-back" size={wp(9)} color="white" />
        </TouchableOpacity>
        <View style={styles.row}>
          <AppText
            text={formatName(params.name)}
            customStyles={{
              ...styles.title,
              color: colorSelector(currentTheme)
            }}
          />
          <AppText
            text={formatIndexNumber(params.id)}
            customStyles={{
              ...styles.indexNumber,
              color: colorSelector(currentTheme)
            }}
          />
        </View>
        <ListTypesOfElements types={params.types} />
        <FastImage
          source={{
            uri,
            priority: 'high'
          }}
          style={styles.pokemonFrontSprite}
        />
        <CustomIcon
          name="pokeball"
          size={hp(25)}
          color={colorSelector(currentTheme)}
          style={styles.pokeballIcon}
        />
        <CustomIcon
          name="grid-6x3"
          size={hp(5)}
          color={colorSelector(currentTheme)}
          style={styles.gridPointsIcons}
        />
        <View style={{
          ...styles.roundedTopEdge,
          backgroundColor: currentTheme.tertiaryColor
        }}
        />
      </View>
      <MaterialTopTabNavigator pokemon={params} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: fontPresets.sizes.primarySize,
    fontFamily: fontPresets.weights.bold,
    color: 'white'
  },
  indexNumber: {
    color: 'white',
    fontFamily: fontPresets.weights.bold,
    alignSelf: 'flex-end'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2)
  },
  header: {
    height: hp(50),
    width: wp(100),
    paddingHorizontal: wp(5),
    paddingTop: hp(2)
  },
  roundedTopEdge: {
    backgroundColor: 'white',
    height: hp(5),
    width: wp(100),
    borderTopLeftRadius: wp(14),
    borderTopRightRadius: wp(14),
    position: 'absolute',
    bottom: 0
  },
  pokemonFrontSprite: {
    height: hp(30),
    width: hp(30),
    zIndex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0
  },
  pokeballIcon: {
    position: 'absolute',
    opacity: 0.3,
    zIndex: -1,
    bottom: hp(3),
    right: wp(-6)
  },
  gridPointsIcons: {
    opacity: 0.3,
    position: 'absolute',
    top: hp(25),
    left: wp(18)
  }
});

export default DetailsScreen;
