import React from 'react';
import { View, StyleSheet } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { AboutItem as AboutItemInterface } from '../interfaces/useAboutDataInterfaces';
import fontPresets from '../theme/fontPresets';
import AboutItem from './AboutItem';
import AppText from './AppText';

interface Props {
  title: string;
  data: AboutItemInterface[];
  typeColor: string;
};

const Section = ({ title, typeColor, data }: Props) => {
  if (title === 'Location' && data.length < 1) {
    return <View style={styles.footer} />;
  };

  return (
    <View style={{ marginBottom: hp(-2) }}>
      <AppText
        text={title}
        customStyles={{
          ...styles.titleSection,
          color: typeColor
        }}
      />
      {
      data.map((item) => (
        <AboutItem
          item={item}
          key={item.title}
        />
      ))
    }
    </View>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    marginVertical: hp(3),
    fontFamily: fontPresets.weights.bold
  },
  footer: { marginBottom: hp(1) }
});

export default Section;
