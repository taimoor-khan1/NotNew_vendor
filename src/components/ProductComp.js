import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, CONSTANTS, FONTS, SIZES, STYLES, width} from '../constants';
import StarRatingComp from './StarRatingComp';

export default function ProductComp(props) {
  const {item} = props;

  return (
    <View style={[styles.container, STYLES.shadow]}>
      <Image
        resizeMode="cover"
        style={styles.imgStyle}
        source={{uri: CONSTANTS.API_URLS.IMAGE_URL + item.image[0]}}
      />

      <View style={styles.mainView}>
        <Text style={[FONTS.boldFont18, styles.headingStyle]}>{item.name}</Text>

        <Text numberOfLines={1} style={[FONTS.mediumFont10, styles.decpStyle]}>
          {item.description}
        </Text>

        <View style={styles.ratingPriceView}>
          {/* <StarRatingComp
            disabled={true}
            starSize={SIZES.fifteen * 1.1}
            rating={Number(item?.rating)}
          /> */}

          <Text style={[FONTS.boldFont22, styles.priceStyle]}>
            ${item.price}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width / 2.3,
    borderRadius: SIZES.fifteen,
    marginBottom: SIZES.twentyFive,
  },
  mainView: {
    paddingBottom: SIZES.fifteen,
    borderBottomLeftRadius: SIZES.ten,
    borderBottomRightRadius: SIZES.ten,
    backgroundColor: COLORS.gray + 20,
  },
  imgStyle: {
    width: width / 2.3,
    height: SIZES.fifty * 2,
    borderTopLeftRadius: SIZES.ten,
    borderTopRightRadius: SIZES.ten,
    backgroundColor: COLORS.gray + 20,
  },
  headingStyle: {
    color: COLORS.black,
    textAlign: 'center',
    marginTop: SIZES.fifteen,
    marginHorizontal: SIZES.ten,
  },
  decpStyle: {
    color: COLORS.black,
    textAlign: 'center',
    marginTop: SIZES.ten,
    marginHorizontal: SIZES.twenty,
  },
  ratingPriceView: {
    alignItems: 'center',
    marginTop: SIZES.fifteen,
    paddingHorizontal: SIZES.twentyFive,
  },
  priceStyle: {
    color: COLORS.primary,
  },
});
