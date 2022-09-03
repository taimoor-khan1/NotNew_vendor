import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, FONTS, SIZES} from '../constants';

export default function SeeAllComp(props) {
  const {heading, onPressSeeAll, containerStyle} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[FONTS.boldFont20, styles.textStyle]}>{heading}</Text>

      <MyTouchableOpacity onPress={onPressSeeAll}>
        <Text style={[FONTS.mediumFont12, styles.textStyle]}>See All</Text>
      </MyTouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.fifteen,
  },
  textStyle: {
    color: COLORS.black,
  },
});
