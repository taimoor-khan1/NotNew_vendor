import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon, IconType, MyTouchableOpacity} from '../components';
import {COLORS, SIZES} from '../constants';

export default function BackButton(props) {
  const {backArrowColor, backArrowStyle} = props;
  const navigation = useNavigation();

  return (
    <MyTouchableOpacity
      style={[styles.container, backArrowStyle]}
      onPress={() => navigation.goBack()}>
      <Icon
        type={IconType.MaterialIcons}
        name="keyboard-arrow-left"
        style={{
          color: backArrowColor || COLORS.black,
          fontSize: SIZES.twentyFive,
        }}
      />
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.brownGray,
    height: SIZES.twentyFive * 2,
    width: SIZES.twentyFive * 2,
    borderRadius: SIZES.fifty,
  },
});
