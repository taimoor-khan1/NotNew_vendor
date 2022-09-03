import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShippingMethod, NewShippingMethod} from '../screens/shipping';
import {AboutUs, TermsAndConditions} from '../screens/content';
import {Noitification} from '../screens/noitification';
import {SearchScreen} from '../screens/search';
import {Settings} from '../screens/settings';
import {COLORS, SCREENS} from '../constants';
import {CustomDrawer} from '../components';
import {Profile} from '../screens/profile';
import {MyOrders} from '../screens/order';
import {Home} from '../screens/home';
import {
  Products,
  EditProduct,
  ProductDetail,
  SelectCategory,
  ProductInformation,
} from '../screens/product';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const stackScreenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const screenOptions = {
  headerShown: false,
  drawerStyle: {
    backgroundColor: COLORS.transparent,
  },
};

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      initialRouteName={SCREENS.Home}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name={SCREENS.DrawerNavigator} component={_Stack} />
    </Drawer.Navigator>
  );
}

function _Stack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name={SCREENS.Home} component={Home} />
      <Stack.Screen name={SCREENS.AboutUs} component={AboutUs} />
      <Stack.Screen name={SCREENS.Settings} component={Settings} />
      <Stack.Screen
        name={SCREENS.TermsAndConditions}
        component={TermsAndConditions}
      />
      <Stack.Screen name={SCREENS.Profile} component={Profile} />
      <Stack.Screen name={SCREENS.Noitification} component={Noitification} />
      <Stack.Screen name={SCREENS.SearchScreen} component={SearchScreen} />
      <Stack.Screen name={SCREENS.ProductDetail} component={ProductDetail} />
      <Stack.Screen name={SCREENS.ShippingMethod} component={ShippingMethod} />
      <Stack.Screen
        name={SCREENS.NewShippingMethod}
        component={NewShippingMethod}
      />
      <Stack.Screen name={SCREENS.SelectCategory} component={SelectCategory} />
      <Stack.Screen
        name={SCREENS.ProductInformation}
        component={ProductInformation}
      />
      <Stack.Screen name={SCREENS.MyOrders} component={MyOrders} />
      <Stack.Screen name={SCREENS.Products} component={Products} />
      <Stack.Screen name={SCREENS.EditProduct} component={EditProduct} />
    </Stack.Navigator>
  );
}
