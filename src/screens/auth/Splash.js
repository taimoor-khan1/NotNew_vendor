import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Icon, IconType, MyTouchableOpacity} from '../../components';
import {
  SIZES,
  IMAGES,
  COLORS,
  FONTS,
  width,
  height,
  SCREENS,
} from '../../constants';

export default function Splash(props) {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={IMAGES.notNewLogo}
        style={styles.logoStyle}
      />

      <View style={{marginTop: SIZES.twentyFive * 1.5}}>
        <Text style={[FONTS.mediumFont18, styles.textStyle]}>
          You can sell just about anything,
        </Text>
        <Text style={[FONTS.mediumFont18, styles.textStyle]}>
          as long as it's "Not New"
        </Text>
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <Text style={[FONTS.mediumFont18, styles.headingStyle]}>
          Best Classified
        </Text>
        <Text style={[FONTS.mediumFont18, styles.headingStyle]}>
          Listing & Products
        </Text>
      </View>

      <MyTouchableOpacity
        style={styles.btnContainer}
        onPress={() => navigation.navigate(SCREENS.Login)}>
        <Icon
          name="arrowright"
          type={IconType.AntDesign}
          style={{
            fontSize: 35,
            color: COLORS.white,
          }}
        />
      </MyTouchableOpacity>

      <Image
        resizeMode="contain"
        source={IMAGES.notNewBg}
        style={styles.bgImgStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.twenty,
    backgroundColor: COLORS.white,
  },
  logoStyle: {
    height: SIZES.fifty * 1.8,
    width: SIZES.fifty * 1.8,
    marginTop: SIZES.fifty * 1.8,
  },
  textStyle: {
    color: COLORS.seaGreen,
  },
  headingStyle: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: SIZES.h24 * 1.5,
  },
  bgImgStyle: {
    zIndex: -10,
    width: width,
    height: height * 0.5,
    position: 'absolute',
    right: -SIZES.twentyFive,
    bottom: -height * 0.06,
  },
  btnContainer: {
    height: 65,
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.fifteen,
    alignSelf: 'center',
    position: 'absolute',
    bottom: SIZES.twentyFive * 1.5,
    backgroundColor: COLORS.primary,
  },
});
