import React from 'react';
import {StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';
import {COLORS} from '../constants';

export default function StarRatingComp(props) {
  const {disabled, starSize, rating, containerStyle} = props;

  return (
    <StarRating
      maxStars={5}
      starSize={starSize}
      disabled={disabled}
      rating={Number(rating)}
      fullStarColor={COLORS.star}
      halfStarColor={COLORS.star}
      emptyStarColor={COLORS.star}
      containerStyle={[styles.containerStyle, containerStyle]}
    />
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'flex-start',
  },
});
