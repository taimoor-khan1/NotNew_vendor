import React from 'react';
import {Text, View, Image, ScrollView, StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {CustomButton, CustomHeader, StarRatingComp} from '../../components';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  height,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../../constants';

const baseOptions = {
  vertical: false,
  width: width,
  height: height * 0.3,
};

export default function ProductDetail(props) {
  const {navigation, route} = props;
  const {product} = route?.params;

  return (
    <View style={STYLES.container}>
      <View style={styles.headerView}>
        <CustomHeader
          showEditIcon
          showBackButton
          backArrowColor={COLORS.primary}
          backArrowStyle={{borderColor: COLORS.primary}}
          onEditIconPress={() =>
            navigation.navigate(SCREENS.EditProduct, {product})
          }
        />
      </View>

      <Carousel
        {...baseOptions}
        autoPlay={true}
        pagingEnabled={true}
        data={product?.image}
        style={[
          STYLES.shadow,
          {
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: COLORS.gray + 40,
          },
        ]}
        autoPlayInterval={2000}
        renderItem={({item, index}) => (
          <>
            <Image
              key={index}
              resizeMode="contain"
              style={styles.imgStyle}
              source={{uri: CONSTANTS.API_URLS.IMAGE_URL + item}}
            />

            {/* <View style={styles.shadowStyle} /> */}
          </>
        )}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.flexRow}>
            <Text style={[FONTS.boldFont22, styles.itemNameStyle]}>
              {product?.name}
            </Text>
            <Text style={[FONTS.boldFont24, styles.itemPriceStyle]}>
              ${product?.price}
            </Text>
          </View>

          <View style={styles.tagsView}>
            {product?.tags?.map((item, index) => (
              <Text
                key={index}
                style={[
                  FONTS.mediumFont12,
                  {color: COLORS.primary, marginRight: SIZES.ten},
                ]}>
                #{item}
              </Text>
            ))}
          </View>

          {/* <View style={[styles.flexRow, {marginTop: SIZES.ten}]}>
            <StarRatingComp
              rating={4}
              disabled={true}
              starSize={SIZES.twenty}
            />
            <Text style={[FONTS.mediumFont14, styles.ratingTextStyle]}>
              4.0 (17.8k)
            </Text>
          </View> */}

          <Text style={[FONTS.boldFont20, {marginTop: SIZES.twentyFive}]}>
            Brand
          </Text>

          <Text style={[FONTS.mediumFont14, styles.itemDespStyle]}>
            {product?.brandId}
          </Text>

          <Text style={[FONTS.boldFont20, {marginTop: SIZES.twentyFive}]}>
            Description
          </Text>

          <Text style={[FONTS.mediumFont14, styles.itemDespStyle]}>
            {product?.description}
          </Text>
        </View>

        {/* <CustomButton
          title="Buy Now"
          onPress={() => navigation.goBack()}
          btnStyle={styles.btnStyle}
        /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: SIZES.fifteen,
    paddingHorizontal: SIZES.fifteen,
    paddingBottom: SIZES.twentyFive,
  },
  headerView: {
    top: getStatusBarHeight(true),
    left: 0,
    right: 0,
    zIndex: 20,
    position: 'absolute',
  },
  imgStyle: {
    width: '100%',
    height: height * 0.3,
    backgroundColor: COLORS.gray + 20,
  },
  shadowStyle: {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: height * 0.3,
    position: 'absolute',
    backgroundColor: COLORS.black + 45,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNameStyle: {
    flex: 1,
    color: COLORS.black,
  },
  itemPriceStyle: {
    color: COLORS.primary,
  },
  itemDespStyle: {
    marginTop: SIZES.fifteen,
    textAlign: 'justify',
  },
  btnStyle: {
    marginTop: SIZES.twentyFive,
  },
  ratingTextStyle: {
    marginLeft: SIZES.fifteen,
    color: COLORS.gray,
  },
  tagsView: {
    width: '60%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.five,
  },
});

const imagesData = [
  {id: 0, image: IMAGES.olivesBanner},
  {id: 1, image: IMAGES.watches},
  {id: 2, image: IMAGES.menTshirt},
];
