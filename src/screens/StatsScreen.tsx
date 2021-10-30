import React, { useContext } from 'react';
import { ScrollView, StyleProp, StyleSheet, TextStyle, View } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import AppText from '../components/AppText';
import DefenseMultiplier from '../components/DefenseMultiplier';
import Loader from '../components/Loader';
import StatBar from '../components/StatBar';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import elementsPalette from '../data/elementsPalette';
import { calculateMaxAndMinValuesOfStats } from '../helpers/calculators';
import { formatName } from '../helpers/textFormatters';
import useStatsData from '../hooks/useStatsData';
import { PokemonResponse } from '../interfaces/pokemonsInterfaces';
import fontPresets from '../theme/fontPresets';
import globalStyles from '../theme/globalStyles';

interface Props {
  pokemon: PokemonResponse;
};

// eslint-disable-next-line max-len
const desc1: string = 'The ranges shown on the right are for a level 100 Pokémon. Maximum values are based on a beneficial nature, 252 EVs, 31 IVs; minimum values are based on a hindering nature, 0 EVs, 0 IVs.';

const sharedStylesOfValues: StyleProp<TextStyle> = {
  marginTop: hp(-1),
  fontSize: fontPresets.sizes.tertiarySize,
  fontFamily: fontPresets.weights.bold,
  width: wp(11),
  textAlign: 'right'
};

const StatsScreen = ({ pokemon: { name, types, stats } }: Props) => {
  const typeColor: string = elementsPalette[types[0].type.name];

  const desc2: string = `The effectiveness of each type on ${formatName(name)}.`;

  const { currentTheme: { primaryColor, secondaryColor } } = useContext(ThemeContext);

  const { defenseRatePercentages } = useStatsData(types);

  const { formattedStatistics, total } = calculateMaxAndMinValuesOfStats(stats);

  if (defenseRatePercentages.length === 0) return <Loader />;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={globalStyles.screenContainer}>
        <AppText
          text="Base Stats"
          customStyles={{
            ...styles.titleSection,
            color: typeColor
          }}
        />
        {
          formattedStatistics.map((item) => (
            <StatBar
              statValues={item}
              typeColor={typeColor}
              key={item.title}
            />
          ))
        }
        <View style={styles.statFooter}>
          <AppText
            text="Total"
            customStyles={{
              ...styles.titleText,
              color: primaryColor
            }}
          />
          <AppText
            text={total}
            customStyles={{
              ...sharedStylesOfValues,
              marginRight: 'auto',
              color: primaryColor
            }}
          />
          <AppText
            text="Min"
            customStyles={{
              ...sharedStylesOfValues,
              color: primaryColor
            }}
          />
          <AppText
            text="Max"
            customStyles={{
              ...sharedStylesOfValues,
              color: primaryColor
            }}
          />
        </View>
        <AppText
          text={desc1}
          customStyles={{
            fontSize: fontPresets.sizes.quaternarySize,
            textAlign: 'justify',
            color: secondaryColor
          }}
        />
        <AppText
          text="Types Defenses"
          customStyles={{
            ...styles.titleSection,
            color: typeColor
          }}
        />
        <AppText
          text={desc2}
          customStyles={{
            fontSize: fontPresets.sizes.tertiarySize,
            color: secondaryColor
          }}
        />
        <View style={styles.rowTypes}>
          {
            defenseRatePercentages.map((item, index) => (
              <DefenseMultiplier
                type={item}
                key={item.name}
                customStyles={{ marginRight: (index === 8 || index === 17) ? 0 : wp(2) }}
              />
            ))
          }
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    marginVertical: hp(3),
    fontFamily: fontPresets.weights.bold
  },
  rowTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp(3),
    justifyContent: 'space-between'
  },
  titleText: {
    marginTop: hp(-1),
    fontSize: fontPresets.sizes.tertiarySize,
    fontFamily: fontPresets.weights.bold,
    width: wp(19)
  },
  statFooter: {
    flexDirection: 'row',
    marginBottom: hp(3)
  }
});

export default StatsScreen;
