import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../constants';
import MyTouchableOpacity from './MyTouchableOpacity';
import Icon, {IconType} from './Icons';
import BackButton from './BackButton';

export default function CustomHeader(props) {
  const {
    title,
    showBackButton,
    showMoreIcon,
    showLogo,
    showProfilePic,
    showEditIcon,
    onEditIconPress,
    backArrowColor,
    backArrowStyle,
    showNextBtn,
    onNextBtnPress,
  } = props;
  const navigation = useNavigation();
  const user = useSelector(state => state.profile.profile);

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        {showBackButton ? (
          <BackButton
            backArrowColor={backArrowColor}
            backArrowStyle={backArrowStyle}
          />
        ) : showMoreIcon ? (
          <MyTouchableOpacity
            style={[styles.moreIconView, STYLES.shadow]}
            onPress={() => navigation.toggleDrawer()}>
            <Image
              resizeMode="contain"
              source={IMAGES.moreIcon}
              style={styles.moreIconStyle}
            />
          </MyTouchableOpacity>
        ) : null}
      </View>

      <View style={{flex: 1, alignItems: 'center'}}>
        {title ? (
          <Text style={FONTS.boldFont22}>{title}</Text>
        ) : showLogo ? (
          <Image
            resizeMode="contain"
            source={IMAGES.notNewHeaderLogo}
            style={styles.logoStyle}
          />
        ) : null}
      </View>

      <View style={{flex: 0.2, alignItems: 'flex-end'}}>
        {showProfilePic ? (
          <MyTouchableOpacity
            onPress={() => navigation.navigate(SCREENS.Profile)}>
            <Image
              source={{uri: CONSTANTS.API_URLS.IMAGE_URL + user?.image}}
              style={styles.profilePicStyle}
            />
          </MyTouchableOpacity>
        ) : showEditIcon ? (
          <MyTouchableOpacity onPress={onEditIconPress}>
            <Icon
              type={IconType.Feather}
              name={'edit'}
              style={{
                color: COLORS.primary,
                fontSize: SIZES.twentyFive * 1.4,
              }}
            />
          </MyTouchableOpacity>
        ) : showNextBtn ? (
          <MyTouchableOpacity
            style={styles.nextBtnStyle}
            onPress={onNextBtnPress}>
            <Text style={[FONTS.mediumFont10, {color: COLORS.white}]}>
              Next
            </Text>
          </MyTouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? SIZES.twenty * 1.5 : 0,
    padding: SIZES.fifteen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoStyle: {
    width: SIZES.fifty * 3.5,
    height: SIZES.twentyFive * 1.6,
  },
  moreIconStyle: {
    width: SIZES.twenty,
    height: SIZES.twenty,
  },
  profilePicStyle: {
    width: SIZES.twentyFive * 2,
    height: SIZES.twentyFive * 2,
    borderRadius: SIZES.fifty * 2,
  },
  moreIconView: {
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.twentyFive * 2,
    height: SIZES.twentyFive * 2,
    borderRadius: SIZES.fifty * 2,
    backgroundColor: COLORS.white,
  },
  nextBtnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.five,
    height: SIZES.twentyFive,
    width: SIZES.twentyFive * 2,
    backgroundColor: COLORS.primary,
  },
});
