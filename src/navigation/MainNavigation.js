import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import {CONSTANTS, SCREENS} from '../constants';
import {LoaderModal} from '../components';
import {
  getContent,
  getProfile,
  getAllBrands,
  getAllCategories,
  saveAccessToken,
  getAllOrders,
} from '../redux/slices';
import {
  Login,
  SignUp,
  Splash,
  Verification,
  ResetPassword,
  ForgotPassword,
  RegistrationForm,
} from '../screens/auth';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

export default function MainNavigation() {
  const dispatcher = useDispatch();
  const token = useSelector(state => state.auth.accessToken);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    getUserAccessToken();
  }, [token]);

  const getUserAccessToken = async () => {
    if (token !== null && token !== undefined) {
      await dispatcher(saveAccessToken(token));
      getUserProfile();
    } else {
      setTimeout(() => {
        setAppLoading(false);
      }, 2000);
    }
  };

  const getUserProfile = async () => {
    dispatcher(getProfile(''))
      .unwrap()
      .then(response => {
        // console.log('getProfile response: ', response);
        dispatcher(getAllCategories(''));
        dispatcher(getAllBrands(''));
        dispatcher(getContent(''));
        dispatcher(getAllOrders(''));
        setAppLoading(false);
      })
      .catch(error => {
        setAppLoading(false);
        console.log('getProfile error: ', error);
      });
  };

  return (
    <>
      {appLoading ? (
        <LoaderModal visible={appLoading} />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={screenOptions}
            initialRouteName={SCREENS.Splash}>
            {token !== null && token !== undefined ? (
              <Stack.Screen
                name={SCREENS.DrawerNavigation}
                component={DrawerNavigation}
              />
            ) : (
              <>
                <Stack.Screen name={SCREENS.Splash} component={Splash} />
                <Stack.Screen name={SCREENS.Login} component={Login} />
                <Stack.Screen name={SCREENS.SignUp} component={SignUp} />
                <Stack.Screen
                  name={SCREENS.ForgotPassword}
                  component={ForgotPassword}
                />
                <Stack.Screen
                  name={SCREENS.Verification}
                  component={Verification}
                />
                <Stack.Screen
                  name={SCREENS.ResetPassword}
                  component={ResetPassword}
                />
                <Stack.Screen
                  name={SCREENS.RegistrationForm}
                  component={RegistrationForm}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
