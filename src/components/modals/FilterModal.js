import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from 'react-native-slider';
import {Modalize} from 'react-native-modalize';
import MyTouchableOpacity from '../MyTouchableOpacity';
import {COLORS, FONTS, height, SIZES} from '../../constants';
import CustomButton from '../CustomButton';
import Icon, {IconType} from '../Icons';

export default function FilterModal(props) {
  const {modalizeRef, onDone, onCancel} = props;

  const [price, setPrice] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const onReset = () => {
    setPrice(1);
    setSelectedSize('');
    setSelectedCategory('');
    setSelectedBrand('');
  };

  const RenderHeader = () => (
    <View style={styles.headerStyle}>
      <View style={{flex: 0.2}}>
        <Icon
          name="x"
          type={IconType.Octicons}
          onPress={onCancel}
          style={{
            color: COLORS.black,
            fontSize: SIZES.twentyFive * 1.1,
          }}
        />
      </View>

      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={[FONTS.boldFont22, {color: COLORS.black}]}>Filter</Text>
      </View>

      <MyTouchableOpacity
        onPress={onReset}
        style={{flex: 0.2, alignItems: 'flex-end'}}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.gray}]}>Reset</Text>
      </MyTouchableOpacity>
    </View>
  );

  const RenderItem = ({title, onPress, selected}) => (
    <MyTouchableOpacity
      style={selected === title ? styles.itemStyle1 : styles.itemStyle2}
      onPress={onPress}>
      <Text
        style={[
          FONTS.mediumFont16,
          {color: selected === title ? COLORS.white : COLORS.gray},
        ]}>
        {title}
      </Text>
    </MyTouchableOpacity>
  );

  return (
    <Modalize
      ref={modalizeRef}
      withHandle={false}
      modalHeight={height * 0.95}
      modalStyle={styles.modalStyle}
      HeaderComponent={<RenderHeader />}
      scrollViewProps={{showsVerticalScrollIndicator: false}}>
      <View style={{marginTop: SIZES.twentyFive}}>
        <Text style={[FONTS.mediumFont18, {color: COLORS.black}]}>Price</Text>

        <Slider
          step={1}
          value={price}
          minimumValue={1}
          maximumValue={10000}
          trackStyle={{height: 2.5}}
          thumbTintColor={COLORS.primary}
          maximumTrackTintColor={COLORS.black}
          minimumTrackTintColor={COLORS.primary}
          onValueChange={val => setPrice(val)}
          style={styles.sliderStyle}
        />

        <View style={styles.flexRow}>
          <Text style={[FONTS.mediumFont12, {color: COLORS.gray}]}>
            ${price}
          </Text>
          <Text style={[FONTS.mediumFont12, {color: COLORS.gray}]}>
            $10,000
          </Text>
        </View>
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <Text style={[FONTS.mediumFont18, {color: COLORS.black}]}>Size</Text>

        <View style={styles.itemsContainer}>
          {sizes.map((item, index) => (
            <View key={index}>
              <RenderItem
                title={item.title}
                selected={selectedSize}
                onPress={() => setSelectedSize(item.title)}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <Text style={[FONTS.mediumFont18, {color: COLORS.black}]}>
          Category
        </Text>

        <View style={styles.itemsContainer}>
          {categories.map((item, index) => (
            <View key={index}>
              <RenderItem
                title={item.title}
                selected={selectedCategory}
                onPress={() => setSelectedCategory(item.title)}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <Text style={[FONTS.mediumFont18, {color: COLORS.black}]}>Brand</Text>

        <View style={styles.itemsContainer}>
          {brands.map((item, index) => (
            <View key={index}>
              <RenderItem
                title={item.title}
                selected={selectedBrand}
                onPress={() => setSelectedBrand(item.title)}
              />
            </View>
          ))}
        </View>
      </View>

      <CustomButton
        title="Apply"
        onPress={() => {
          onDone();
          onCancel();
          onReset();
        }}
        btnStyle={styles.btnStyle}
      />
    </Modalize>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    paddingVertical: SIZES.twenty,
    paddingHorizontal: SIZES.twenty,
    borderTopLeftRadius: SIZES.twentyFive,
    borderTopRightRadius: SIZES.twentyFive,
    backgroundColor: COLORS.white,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderStyle: {
    width: '100%',
    marginTop: SIZES.ten,
  },
  itemsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.twenty,
  },
  itemStyle1: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.primary,
    borderRadius: SIZES.fifteen,
    paddingVertical: SIZES.fifteen,
    paddingHorizontal: SIZES.twenty,
    backgroundColor: COLORS.primary,
    marginRight: SIZES.twentyFive,
    marginBottom: SIZES.twentyFive,
  },
  itemStyle2: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.gray,
    borderRadius: SIZES.fifteen,
    paddingVertical: SIZES.fifteen,
    paddingHorizontal: SIZES.twenty,
    backgroundColor: COLORS.white,
    marginRight: SIZES.twentyFive,
    marginBottom: SIZES.twentyFive,
  },
  btnStyle: {
    height: 60,
    marginVertical: SIZES.twentyFive * 1.2,
    marginHorizontal: SIZES.fifty * 1.5,
  },
});

const brands = [{title: 'Puma'}, {title: 'Adidas'}];
const sizes = [{title: 'S'}, {title: 'M'}, {title: 'L'}, {title: 'XL'}];
const categories = [
  {title: 'Women'},
  {title: 'Men'},
  {title: 'Kids'},
  {title: 'All'},
];
