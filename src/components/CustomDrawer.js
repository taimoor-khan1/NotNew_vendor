/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {COLORS, CONSTANTS, FONTS, IMAGES, SCREENS, SIZES} from '../constants';
import MyTouchableOpacity from './MyTouchableOpacity';
import {PermissionModal} from './modals';
import {logout} from '../redux/slices';
import ItemCard from './ItemCard';
import {IconType} from './Icons';

export default function CustomDrawer(props) {
  const {navigation} = props;
  const dispatcher = useDispatch();
  const user = useSelector(state => state.profile.profile);

  const [logoutModal, setLogoutModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);

  const onLogout = () => {
    dispatcher(logout(''));
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      <MyTouchableOpacity
        style={styles.headerContainer}
        onPress={() => navigation.navigate(SCREENS.Profile)}>
        <Image
          resizeMode="contain"
          style={styles.dpStyle}
          source={{uri: CONSTANTS.API_URLS.IMAGE_URL + user?.image}}
        />

        <View style={{marginLeft: SIZES.fifteen}}>
          <Text style={FONTS.mediumFont16}>{user?.name}</Text>
          {/* <Text style={[FONTS.mediumFont10, {color: COLORS.brownGray}]}>
            Aug 2, 2021
          </Text> */}
        </View>
      </MyTouchableOpacity>

      <View style={{flex: 1}}>
        {drawerTabs.map((item, index) => (
          <View key={index}>
            <ItemCard
              label={item.label}
              iconName={item.iconName}
              iconType={item.iconType}
              onPress={() => {
                if (item.label === 'Delete Account') {
                  // setDeleteAccountModal(true);
                }
                if (item.screen !== '') {
                  navigation.navigate(item.screen);
                }
              }}
            />
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <ItemCard
          label="Logout"
          iconName="logout"
          iconType={IconType.MaterialCommunityIcons}
          onPress={() => setLogoutModal(true)}
        />
      </View>

      <PermissionModal
        visible={logoutModal}
        setVisible={setLogoutModal}
        title="Are you sure you want to logout?"
        onDone={onLogout}
        onCancel={() => {}}
      />

      <PermissionModal
        visible={deleteAccountModal}
        setVisible={setDeleteAccountModal}
        title="Are you sure you want to delete account?"
        onDone={onLogout}
        onCancel={() => {}}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    borderTopRightRadius: SIZES.twentyFive,
    borderBottomRightRadius: SIZES.twentyFive,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.twenty,
    marginTop: SIZES.twenty * 2,
    paddingHorizontal: SIZES.twenty,
  },
  drawerItemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.twenty,
    borderRadius: SIZES.fifteen,
    paddingVertical: SIZES.fifteen,
    paddingHorizontal: SIZES.ten,
  },
  footer: {
    marginVertical: SIZES.ten,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dpStyle: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    borderRadius: SIZES.fifty,
  },
});

const drawerTabs = [
  {
    label: 'My Orders',
    screen: SCREENS.MyOrders,
    iconName: 'shoppingcart',
    iconType: IconType.AntDesign,
  },
  {
    label: 'Shipping',
    screen: SCREENS.ShippingMethod,
    iconName: 'package',
    iconType: IconType.Feather,
  },
  // {
  //   label: 'Store',
  //   screen: SCREENS.Home,
  //   iconName: 'storefront-outline',
  //   iconType: IconType.MaterialCommunityIcons,
  // },
  {
    label: 'My Profile',
    screen: SCREENS.Profile,
    iconName: 'user-o',
    iconType: IconType.FontAwesome,
  },
  {
    label: 'Notifications',
    screen: SCREENS.Noitification,
    iconName: 'bell',
    iconType: IconType.Fontisto,
  },
  {
    label: 'Support',
    screen: '',
    iconName: 'help-circle',
    iconType: IconType.Feather,
  },
  {
    label: 'Settings',
    screen: SCREENS.Settings,
    iconName: 'settings',
    iconType: IconType.Feather,
  },
  {
    label: 'Terms & Conditions',
    screen: SCREENS.TermsAndConditions,
    iconName: 'file-check-outline',
    iconType: IconType.MaterialCommunityIcons,
  },
  {
    label: 'Delete Account',
    screen: '',
    iconName: 'deleteuser',
    iconType: IconType.AntDesign,
  },
];
