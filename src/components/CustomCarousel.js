import React from 'react';
import {Image, Linking, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {SIZES, width} from '../constants';
import MyTouchableOpacity from './MyTouchableOpacity';

const baseOptions = {
  vertical: false,
  width: width,
  height: SIZES.fifty * 2.6,
};

export default function CustomCarousel(props) {
  const {data} = props;

  return (
    <Carousel
      {...baseOptions}
      data={data}
      autoPlay={true}
      style={{width: '100%'}}
      autoPlayInterval={2000}
      pagingEnabled={false}
      renderItem={({item, index}) => (
        <MyTouchableOpacity
          key={index}
          style={{paddingHorizontal: SIZES.fifteen}}
          onPress={() => Linking.openURL(item.url)}>
          <Image source={item.image} style={styles.bannerStyle} />
        </MyTouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  bannerStyle: {
    width: '100%',
    height: SIZES.fifty * 2.6,
    borderRadius: SIZES.twenty,
  },
});
