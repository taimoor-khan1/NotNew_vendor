import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {BackButton, CustomButton} from '../../components';
import {showSimpleMessage} from '../../utils/flashMessage';
import {
  hideLoader,
  saveAccessToken,
  showLoader,
  verifyOtp,
} from '../../redux/slices';
import utils from '../../utils';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../constants';

export default function Verification(props) {
  const {navigation, route} = props;
  const {from, email} = route?.params;
  const dispatcher = useDispatch();

  const inputRef = useRef(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    setTimeout(() => {
      inputRef?.current?.focusField(0);
    }, 500);
  }, []);

  const onVerifyOtp = async () => {
    if (utils.isEmptyOrSpaces(code)) {
      showSimpleMessage('warning', {
        message: 'Invalid Code',
      });
      return;
    }

    dispatcher(showLoader());

    dispatcher(verifyOtp({email, otp: code}))
      .unwrap()
      .then(_response => {
        dispatcher(hideLoader());

        if (from === CONSTANTS.DESTINATIONS.SIGN_UP) {
          dispatcher(saveAccessToken(_response.data.token));
        } else {
          navigation.navigate(SCREENS.ResetPassword, {email});
        }
      })
      .catch(err => {
        dispatcher(hideLoader());
        showSimpleMessage('danger', {
          message: err.message,
        });
      });
  };

  return (
    <SafeAreaView style={STYLES.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <BackButton />

        <Image
          resizeMode="contain"
          source={IMAGES.notNewLogo}
          style={styles.logoStyle}
        />

        <Text style={[FONTS.boldFont24, styles.headingStyle]}>
          Verification
        </Text>

        <Text style={[FONTS.mediumFont16, {marginTop: SIZES.ten}]}>
          Enter the verification code that we have sent to your email
        </Text>

        <View style={{marginTop: SIZES.fifty}}>
          <OTPInputView
            code={code}
            pinCount={4}
            ref={inputRef}
            autoFocusOnLoad={false}
            onCodeChanged={code => setCode(code)}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            style={styles.otpContainer}
          />
        </View>

        <CustomButton
          title="Verify"
          btnStyle={{marginTop: SIZES.fifty * 2}}
          onPress={() => onVerifyOtp()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: SIZES.twentyFive,
    paddingHorizontal: SIZES.fifteen,
  },
  headingStyle: {
    fontWeight: 'bold',
    fontSize: SIZES.h24,
    marginTop: SIZES.twentyFive * 1.5,
  },
  underlineStyleBase: {
    width: SIZES.fifty,
    height: SIZES.fifty,
    borderWidth: 2,
    borderRadius: SIZES.fifteen,
    borderColor: COLORS.gray,
    fontSize: SIZES.h22,
    color: COLORS.black,
    fontFamily: FONTFAMILY.Light,
  },
  underlineStyleHighLighted: {
    width: SIZES.fifty,
    height: SIZES.fifty,
    borderWidth: 2,
    borderRadius: SIZES.fifteen,
    borderColor: COLORS.primary,
    fontSize: SIZES.h22,
    fontFamily: FONTFAMILY.Light,
  },
  otpContainer: {
    width: '100%',
    height: SIZES.twenty * 5,
  },
  logoStyle: {
    alignSelf: 'center',
    marginTop: SIZES.ten,
    height: SIZES.fifty * 1.6,
    width: SIZES.fifty * 1.6,
  },
});
