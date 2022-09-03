import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {COLORS, FONTS, height, SIZES} from '../../constants';
import CustomButton from '../CustomButton';
import Icon, {IconType} from '../Icons';

export default function PickerModal(props) {
  const {modalizeRef, data, onCancel, onSelect, heading} = props;

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
        <Text style={[FONTS.boldFont22, {color: COLORS.black}]}>{heading}</Text>
      </View>

      <View style={{flex: 0.2}} />
    </View>
  );

  return (
    <Modalize
      ref={modalizeRef}
      withHandle={false}
      modalHeight={height * 0.6}
      modalStyle={styles.modalStyle}
      HeaderComponent={<RenderHeader />}
      scrollViewProps={{showsVerticalScrollIndicator: false}}>
      <View style={{paddingBottom: SIZES.twentyFive}}>
        {data.map((item, index) => (
          <View key={index}>
            <CustomButton
              title={item.name || item.title}
              btnStyle={styles.btnStyle}
              titleStyle={styles.btnTitleStyle}
              onPress={() => {
                onSelect(item);
                onCancel();
              }}
            />
          </View>
        ))}
      </View>
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
    marginBottom: SIZES.fifteen,
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
    borderWidth: 1,
    marginTop: SIZES.twenty,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
  },
  btnTitleStyle: {
    color: COLORS.gray,
    fontSize: SIZES.h18,
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
