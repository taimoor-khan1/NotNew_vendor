import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, IMAGES, SIZES} from '../constants';

export default function SearchBar(props) {
  const {
    searchText,
    setSearchText,
    showFilterIcon,
    showSearchIcon,
    onPressFilter,
    onPressSearch,
    containerStyle,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <MyTouchableOpacity style={styles.searchView} onPress={onPressSearch}>
        {showSearchIcon && (
          <Image
            resizeMode="contain"
            source={IMAGES.searchIcon}
            style={[styles.iconStyle, {marginRight: SIZES.ten}]}
          />
        )}

        <TextInput
          value={searchText}
          placeholder="Search"
          editable={!onPressSearch}
          onChangeText={setSearchText}
          placeholderTextColor={COLORS.black}
          style={styles.textInputStyle}
        />
      </MyTouchableOpacity>

      {showFilterIcon && (
        <MyTouchableOpacity
          onPress={onPressFilter}
          style={{marginLeft: SIZES.ten}}>
          <Image
            resizeMode="contain"
            source={IMAGES.filterIcon}
            style={styles.iconStyle}
          />
        </MyTouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SIZES.fifteen,
    paddingHorizontal: SIZES.twenty,
  },
  iconStyle: {
    width: SIZES.twenty,
    height: SIZES.twenty,
  },
  textInputStyle: {
    flex: 1,
    height: 40,
    color: COLORS.black,
  },
  searchView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
