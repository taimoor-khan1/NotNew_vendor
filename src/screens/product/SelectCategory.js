import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {CustomHeader, MyTouchableOpacity} from '../../components';
import {showSimpleMessage} from '../../utils/flashMessage';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  height,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../constants';

export default function SelectCategory(props) {
  const {navigation} = props;
  const {categories} = useSelector(state => state.content);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // useFocusEffect(
  //   useCallback(() => {
  //     StatusBar.setBarStyle('dark-content');
  //     Platform.OS === 'android' && StatusBar.setTranslucent(false);
  //     Platform.OS === 'android' && StatusBar.setBackgroundColor(COLORS.white);
  //   }, []),
  // );

  const renderItem = ({item, index}) => (
    <MyTouchableOpacity
      key={index}
      style={styles.categoryViewStyle}
      onPress={() => setSelectedCategory(item)}>
      <Image
        resizeMode="contain"
        source={{uri: CONSTANTS.API_URLS.IMAGE_URL + item.image}}
        style={[
          styles.categoryImgStyle,
          {
            tintColor:
              selectedCategory?.title === item.title
                ? COLORS.primary
                : COLORS.black,
          },
        ]}
      />
      <Text
        style={[
          FONTS.mediumFont12,
          styles.categoryTextStyle,
          {
            color:
              selectedCategory?.title === item.title
                ? COLORS.primary
                : COLORS.black,
          },
        ]}>
        {item.title}
      </Text>
    </MyTouchableOpacity>
  );

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader
        showBackButton
        showNextBtn
        title="Select Category"
        onNextBtnPress={() => {
          if (selectedCategory) {
            navigation.navigate(SCREENS.ProductInformation, {
              category: selectedCategory,
            });
          } else {
            showSimpleMessage('warning', {
              message: 'Please select category',
            });
          }
        }}
      />

      <FlatList
        numColumns={3}
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatlistStyle: {
    flexGrow: 1,
    paddingTop: SIZES.ten,
    paddingBottom: height * 0.015,
    paddingHorizontal: SIZES.fifteen,
  },
  categoryViewStyle: {
    flex: 1 / 3,
    alignItems: 'center',
    paddingBottom: SIZES.fifteen,
    marginBottom: SIZES.fifteen,
  },
  categoryImgStyle: {
    height: SIZES.twentyFive * 1.7,
    width: SIZES.twentyFive * 1.7,
  },
  categoryTextStyle: {
    marginTop: SIZES.five,
    textAlign: 'center',
    width: SIZES.twentyFive * 3,
  },
});

const categoriesList = [
  {
    title: 'Women Fashion',
    image: IMAGES.highHeelsOutline,
  },
  {
    title: 'Men Fashion',
    image: IMAGES.suitsOutline,
  },
  {
    title: 'Men/Women Watches',
    image: IMAGES.watchOutline,
  },
  {
    title: 'Jewellery Collection',
    image: IMAGES.necklaceOutline,
  },
  {
    title: 'Kids Fashion',
    image: IMAGES.bibOutline,
  },
];
