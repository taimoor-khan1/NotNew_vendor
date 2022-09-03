import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  CustomHeader,
  Icon,
  IconType,
  ItemCard,
  MyTouchableOpacity,
} from '../../components';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../constants';

export default function Settings(props) {
  const {navigation} = props;
  const user = useSelector(state => state.profile.profile);

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="Settings" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <MyTouchableOpacity
          style={styles.headerContainer}
          onPress={() => navigation.navigate(SCREENS.Profile)}>
          <Image
            resizeMode="contain"
            style={styles.dpStyle}
            source={{uri: CONSTANTS.API_URLS.IMAGE_URL + user?.image}}
          />

          <View style={{flex: 1, marginHorizontal: SIZES.fifteen}}>
            <Text style={[FONTS.mediumFont18, {color: COLORS.white}]}>
              {user?.name}
            </Text>
            <Text
              style={[
                FONTS.mediumFont12,
                {color: COLORS.white, marginTop: SIZES.five},
              ]}>
              Personal info
            </Text>
          </View>

          <Icon
            type={IconType.MaterialIcons}
            name="keyboard-arrow-right"
            style={{
              fontSize: SIZES.twentyFive,
              color: COLORS.white,
            }}
          />
        </MyTouchableOpacity>

        {tabs.map((item, index) => (
          <View key={index}>
            <ItemCard
              rightIcon
              label={item.label}
              iconName={item.iconName}
              iconType={item.iconType}
              onPress={() => navigation.navigate(item.screen)}
              containerStyle={{marginHorizontal: 0, paddingLeft: 0}}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: SIZES.ten,
    paddingBottom: SIZES.twenty,
    paddingHorizontal: SIZES.fifteen,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.twenty,
    paddingHorizontal: SIZES.twenty,
    paddingVertical: SIZES.twentyFive,
    borderRadius: SIZES.twentyFive,
    backgroundColor: COLORS.primary,
  },
  dpStyle: {
    height: SIZES.fifty * 1.2,
    width: SIZES.fifty * 1.2,
    borderRadius: SIZES.fifty,
  },
});

const tabs = [
  {
    label: 'Account',
    screen: SCREENS.Profile,
    iconName: 'user-o',
    iconType: IconType.FontAwesome,
  },
  {
    label: 'Ship to',
    screen: SCREENS.ShippingMethod,
    iconName: 'flag-checkered',
    iconType: IconType.FontAwesome,
  },
  {
    label: 'About App',
    screen: SCREENS.AboutUs,
    iconName: 'info',
    iconType: IconType.Feather,
  },
  {
    label: 'Support',
    screen: SCREENS.Settings,
    iconName: 'help-circle',
    iconType: IconType.Feather,
  },
];
