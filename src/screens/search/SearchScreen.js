import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CustomHeader,
  FilterModal,
  MyTouchableOpacity,
  SearchBar,
} from '../../components';
import {COLORS, FONTS, IMAGES, SIZES, STYLES} from '../../constants';

export default function SearchScreen(props) {
  const filterModalizeRef = useRef(null);
  const [searchText, setSearchText] = useState('');

  const renderItem = ({item, index}) => (
    <MyTouchableOpacity key={index} style={styles.itemContainer}>
      <Image source={item.image} style={styles.imgStyle} />

      <View style={styles.itemContentView}>
        <Text
          numberOfLines={1}
          style={[FONTS.mediumFont14, {color: COLORS.black}]}>
          {item.name}
        </Text>
        <Text
          numberOfLines={1}
          style={[FONTS.mediumFont12, {color: COLORS.gray}]}>
          {item.description}
        </Text>
      </View>

      <View style={styles.priceTagStyle}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
          ${item.price}
        </Text>
      </View>
    </MyTouchableOpacity>
  );

  return (
    <SafeAreaView style={STYLES.container}>
      <View style={styles.headerView}>
        <View style={{flex: 0.17}}>
          <CustomHeader showBackButton />
        </View>

        <View style={{flex: 1}}>
          <SearchBar
            showFilterIcon
            searchText={searchText}
            setSearchText={setSearchText}
            onPressFilter={() => filterModalizeRef?.current?.open()}
            containerStyle={{
              borderWidth: 1,
              borderRadius: SIZES.ten,
              height: SIZES.twentyFive * 2,
            }}
          />
        </View>
      </View>

      <FlatList
        data={data.filter(i => i.name.includes(searchText))}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistStyle}
      />

      <FilterModal
        modalizeRef={filterModalizeRef}
        onDone={() => {}}
        onCancel={() => filterModalizeRef?.current?.close()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatlistStyle: {
    flexGrow: 1,
    paddingHorizontal: SIZES.fifteen,
    paddingBottom: SIZES.twentyFive,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: COLORS.gray,
    paddingVertical: SIZES.fifteen,
  },
  imgStyle: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    borderRadius: SIZES.fifty,
  },
  itemContentView: {
    flex: 1,
    marginHorizontal: SIZES.fifteen,
  },
  priceTagStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.ten,
    height: SIZES.twentyFive * 1.3,
    paddingHorizontal: SIZES.twentyFive,
    backgroundColor: COLORS.primary,
  },
});

const data = [
  {
    id: 0,
    price: 80,
    image: IMAGES.shoes,
    name: 'Vintage Shoes',
    description: 'New arrival',
  },
  {
    id: 1,
    price: 50,
    image: IMAGES.watches,
    name: 'Awesome Watch',
    description: 'New arrival',
  },
  {
    id: 2,
    price: 60,
    image: IMAGES.womenShoe,
    name: 'Women Shoe',
    description: 'New arrival',
  },
  {
    id: 3,
    price: 40,
    image: IMAGES.menTshirt,
    name: 'Men T-Shirt',
    description: 'New arrival',
  },
  {
    id: 4,
    price: 80,
    image: IMAGES.printedTshirt,
    name: 'Printed T-Shirt',
    description: 'New arrival',
  },
];
