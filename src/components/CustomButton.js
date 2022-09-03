import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MyTouchableOpacity, Icon} from '../components';
import {COLORS, FONTS, SIZES} from '../constants';

export default function CustomButton(props) {
  const {
    hasIcon,
    iconName,
    iconColor,
    iconType,
    title,
    onPress,
    btnStyle,
    titleStyle,
    disabled,
  } = props;

  return (
    <MyTouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        {backgroundColor: disabled ? `${COLORS.primary}99` : COLORS.primary},
        btnStyle,
      ]}>
      {hasIcon ? (
        <View style={{flex: 0.2, alignItems: 'center'}}>
          <Icon
            name={iconName}
            type={iconType}
            style={{
              color: iconColor || COLORS.white,
              fontSize: SIZES.twentyFive * 1.2,
            }}
          />
        </View>
      ) : (
        <View style={{flex: 0.2}} />
      )}

      <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>

      <View style={{flex: 0.2}} />
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.fifteen,
    paddingHorizontal: SIZES.twentyFive,
  },
  titleStyle: [
    FONTS.boldFont22,
    {
      flex: 1,
      textAlign: 'center',
      color: COLORS.white,
    },
  ],
});
