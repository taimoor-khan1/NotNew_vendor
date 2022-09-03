import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {COLORS, FONTS, IMAGES, SIZES, STYLES} from '../constants';

export default function ListEmptyComponent(props) {
  const {text} = props;

  return (
    <View style={[STYLES.shadow, styles.emptyListContainer]}>
      {text.map((item, index) => (
        <Text
          key={index}
          style={[
            FONTS.mediumFont12,
            {textAlign: 'center', color: COLORS.primary},
          ]}>
          {item}
        </Text>
      ))}

      <LottieView
        loop
        autoPlay
        source={IMAGES.emptyListGif}
        style={styles.emptyGifStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyListContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: SIZES.fifty,
    padding: SIZES.twenty,
    borderRadius: SIZES.fifteen,
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.twenty,
  },
  emptyGifStyle: {
    width: SIZES.fifty * 5,
    height: SIZES.fifty * 5,
  },
});
