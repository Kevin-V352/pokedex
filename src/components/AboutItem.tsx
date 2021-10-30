/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import elementsPalette from '../data/elementsPalette';
import fontPresets from '../theme/fontPresets';
import AppText from './AppText';
import SquareTypeIcon from './SquareTypeIcon';

interface SubArr {
  title: string;
  payload: any;
  type: string
};

interface Props {
  item: SubArr
};

const AboutItem = ({ item: { title, payload, type } }: Props) => {
  const { currentTheme: { primaryColor, secondaryColor } } = useContext(ThemeContext);

  const renderSimpleItem = () => (
    <AppText
      text={payload}
      customStyles={{
        ...styles.normalText,
        color: secondaryColor
      }}
    />
  );

  const renderSkillItems = () => (
    <View style={styles.abilityContainer}>
      {
        payload.normal.map((item: string, index: number) => (
          <AppText
            text={`${index + 1}. ${item}`}
            key={item}
            customStyles={{
              ...styles.abilityNormalText,
              color: secondaryColor
            }}
          />
        ))
      }
      {
        payload.hidden.map((item: string) => (
          <AppText
            text={`${item} (hidden ability)`}
            key={item}
            customStyles={{
              ...styles.abilityHiddenText,
              color: secondaryColor
            }}
          />
        ))
      }
    </View>
  );

  const renderWeaknessItems = () => (
    <View style={styles.containerOfWeaknesses}>
      {
        payload.map((item: string, index: number) => (
          <SquareTypeIcon
            name={item}
            key={item}
            customStyles={{
              ...styles.elementTypeIcon,
              marginRight: (index === 4) ? 0 : wp(2)
            }}
          />
        ))
      }
    </View>
  );

  const renderPerformanceItemsEv = () => (
    <View style={styles.evYieldContainer}>
      {
        payload.map((item: any) => (
          <AppText
            text={`${item.effort} ${item.name}`}
            key={item.name}
            customStyles={{
              ...styles.evYieldText,
              color: secondaryColor
            }}
          />
        ))
      }
    </View>
  );

  const renderGenderItem = () => (

    typeof payload === 'string'
      ? renderSimpleItem()
      : (
        <View style={styles.genderContainer}>
          <Icon
            name="female"
            size={fontPresets.sizes.tertiarySize}
            color={elementsPalette.fairy}
            style={styles.genderIcon}
          />
          <AppText
            text={payload.femalePercentage}
            customStyles={{
              ...styles.genderText,
              color: elementsPalette.fairy
            }}
          />
          <AppText
            text=", "
            customStyles={{
              ...styles.genderText,
              color: secondaryColor
            }}
          />
          <Icon
            name="male"
            size={fontPresets.sizes.tertiarySize}
            color={elementsPalette.water}
            style={styles.genderIcon}
          />
          <AppText
            text={payload.malePercentage}
            customStyles={{
              ...styles.genderText,
              color: elementsPalette.water
            }}
          />
        </View>
      )
  );

  const renderLocalizationItems = () => (
    <View style={styles.locationsContainer}>
      {
        payload.map((item: string) => (
          <AppText
            text={item}
            key={item}
            customStyles={{
              ...styles.locationsText,
              color: secondaryColor
            }}
          />
        ))
      }
    </View>
  );

  return (
    <View style={styles.container}>
      <AppText
        text={title}
        customStyles={{
          ...styles.titleText,
          color: primaryColor,
          marginTop: type === 'weaknesses-arr' ? hp(0.2) : hp(-1)
        }}
      />
      {
        type === 'simple'
          ? renderSimpleItem()
          : type === 'abilities-arr'
            ? renderSkillItems()
            : type === 'weaknesses-arr'
              ? renderWeaknessItems()
              : type === 'ev-shield-arr'
                ? renderPerformanceItemsEv()
                : type === 'genre-arr'
                  ? renderGenderItem()
                  : renderLocalizationItems()
      }
    </View>
  );
};

const sharedContainerStyles = { width: wp(48.5) };
const sharedTextStyles = {
  marginTop: hp(-1),
  marginBottom: hp(0.5)
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: hp(2)
  },
  titleText: {
    fontSize: fontPresets.sizes.tertiarySize,
    fontFamily: fontPresets.weights.bold,
    marginRight: 'auto'
  },
  normalText: {
    marginTop: hp(-1),
    fontSize: fontPresets.sizes.tertiarySize,
    position: 'absolute',
    left: wp(41.5)
  },
  abilityContainer: { ...sharedContainerStyles },
  abilityNormalText: {
    fontSize: fontPresets.sizes.tertiarySize,
    ...sharedTextStyles
  },
  abilityHiddenText: { fontSize: fontPresets.sizes.quaternarySize },
  containerOfWeaknesses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: wp(-2),
    ...sharedContainerStyles
  },
  elementTypeIcon: { marginBottom: wp(2) },
  evYieldContainer: { ...sharedContainerStyles },
  evYieldText: {
    fontSize: fontPresets.sizes.tertiarySize,
    ...sharedTextStyles
  },
  genderContainer: {
    flexDirection: 'row',
    ...sharedContainerStyles
  },
  genderText: {
    fontSize: fontPresets.sizes.tertiarySize,
    marginTop: hp(-1)
  },
  genderIcon: { marginTop: hp(-0.5) },
  locationsContainer: { ...sharedContainerStyles },
  locationsText: {
    fontSize: fontPresets.sizes.tertiarySize,
    ...sharedTextStyles
  }
});

export default AboutItem;
