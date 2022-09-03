import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {LogBox, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';
import {PersistGate} from 'redux-persist/integration/react';
import MainNavigation from './src/navigation/MainNavigation';
import {Icon, IconType, LoaderModal} from './src/components';
import {COLORS, FONTS, SIZES} from './src/constants';
import {persistor, store} from './src/redux/store';

export default function App() {
  const [networkState, setNetworkState] = useState(true);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    const unsubscribe = NetInfo.addEventListener(async state => {
      setTimeout(() => {
        if (
          state.isInternetReachable !== null &&
          state.isInternetReachable !== undefined
        ) {
          setNetworkState(state.isInternetReachable);
        }
      }, 1000);
    });

    return () => unsubscribe();
  });

  return networkState ? (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />

        <FlashMessage
          position="top"
          floating={true}
          style={{paddingRight: SIZES.twentyFive}}
        />

        <LoaderModal />
      </PersistGate>
    </Provider>
  ) : (
    <View style={styles.noInternetView}>
      <View style={styles.imgStyle}>
        <Icon
          name={'wifi-off'}
          type={IconType.Feather}
          size={SIZES.fifty * 1.75}
          color={COLORS.white}
        />
      </View>
      <Text style={[FONTS.boldFont22, styles.headingStyle]}>No Internet</Text>
      <Text style={[FONTS.boldFont22, styles.headingStyle]}>
        Connection Available
      </Text>
      <View style={{marginTop: SIZES.twenty}}>
        <Text style={[FONTS.mediumFont14, styles.textStyle]}>
          Your device is not connected to internet
        </Text>
        <Text style={[FONTS.mediumFont14, styles.textStyle]}>
          Please make sure your connection is working
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noInternetView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.twentyFive,
    backgroundColor: COLORS.primary,
  },
  imgStyle: {
    marginBottom: SIZES.twentyFive,
  },
  textStyle: {
    textAlign: 'center',
    color: COLORS.white,
  },
  headingStyle: {
    color: COLORS.white,
  },
});
