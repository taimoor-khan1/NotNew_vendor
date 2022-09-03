import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  AnimatedCheckbox,
  CustomButton,
  CustomHeader,
  Icon,
  IconType,
  MyTouchableOpacity,
} from '../../components';
import {COLORS, FONTS, IMAGES, SCREENS, SIZES, STYLES} from '../../constants';

export default function ShippingMethod(props) {
  const {navigation} = props;
  const [selectedMethod, setSelectedMethod] = useState(null);

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="Shipping Method" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {addressList.map((item, index) => (
          <MyTouchableOpacity
            key={index}
            onPress={() => setSelectedMethod(item)}
            style={[
              styles.itemContainer,
              {
                borderColor:
                  selectedMethod?.id === item.id ? COLORS.primary : COLORS.gray,
              },
            ]}>
            <View style={styles.flexRow}>
              <Text style={[FONTS.boldFont18]}>{item.name}</Text>
              <Image
                resizeMode="contain"
                source={item.image}
                style={styles.logoStyle}
              />
            </View>

            <View style={{marginTop: SIZES.fifteen}}>
              <Text style={[FONTS.mediumFont14, {color: COLORS.gray}]}>
                {item.title}
              </Text>
            </View>

            <AnimatedCheckbox
              checked={selectedMethod?.id === item.id}
              rippleEffect={false}
              touchableLabel={false}
              checkMarkColor={COLORS.white}
              onValueChange={val => {
                if (val) setSelectedMethod(item);
                else setSelectedMethod(null);
              }}
              checkedBackgroundColor={COLORS.primary}
              containerStyle={{marginTop: SIZES.fifteen}}
              labelStyle={{color: COLORS.black}}
              label={
                <Text style={[FONTS.mediumFont12, {color: COLORS.gray}]}>
                  Use as the shipping method
                </Text>
              }
            />
          </MyTouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.btnContainer}>
        <CustomButton
          title="Continue"
          onPress={() => {}}
          btnStyle={{
            flex: 1,
            marginRight: SIZES.fifteen,
          }}
        />

        <MyTouchableOpacity
          style={styles.addIconBtn}
          onPress={() => navigation.navigate(SCREENS.NewShippingMethod)}>
          <Icon
            name="plus"
            type={IconType.Feather}
            style={{
              color: COLORS.white,
              fontSize: SIZES.twentyFive * 1.4,
            }}
          />
        </MyTouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: SIZES.ten,
    paddingBottom: SIZES.fifteen,
    paddingHorizontal: SIZES.fifteen,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.fifteen,
    marginBottom: SIZES.twentyFive,
  },
  addIconBtn: {
    width: 65,
    height: 65,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  itemContainer: {
    borderWidth: 1.5,
    padding: SIZES.fifteen,
    borderRadius: SIZES.fifteen,
    marginBottom: SIZES.twentyFive,
  },
  logoStyle: {
    height: SIZES.twenty * 2.5,
    width: SIZES.fifty * 1.5,
  },
});

const addressList = [
  {
    id: 0,
    name: 'U.S.P.S.',
    title: 'Set up U.S.P.S. to enable up to 71 shipping methods.',
    image: IMAGES.uspsLogo,
  },
  {
    id: 1,
    name: 'FedEx',
    title: 'Set up FedEx to enable up to 23 shipping methods.',
    image: IMAGES.fedexLogo,
  },
  {
    id: 2,
    name: 'DHL Express',
    title: 'Set up DHL Express to enable up to 23 shipping methods.',
    image: IMAGES.dhlLogo,
  },
];
