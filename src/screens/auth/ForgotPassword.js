import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {hideLoader, showLoader, forgotPassword} from '../../redux/slices';
import {showSimpleMessage} from '../../utils/flashMessage';
import utils from '../../utils';
import {
  CONSTANTS,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../constants';
import {
  IconType,
  BackButton,
  CustomButton,
  CustomTextInput,
} from '../../components';

export default function ForgotPassword(props) {
  const {navigation} = props;
  const dispatcher = useDispatch();

  const [email, setEmail] = useState('');

  const onForgotPassword = () => {
    if (!utils.validateEmail(email)) {
      showSimpleMessage('warning', {
        message: 'Invalid Email',
      });
      return;
    }

    dispatcher(showLoader());

    dispatcher(forgotPassword({email}))
      .unwrap()
      .then(_response => {
        // console.log('forgotPassword _response: ', _response);

        dispatcher(hideLoader());
        navigation.navigate(SCREENS.Verification, {
          email: email,
          from: CONSTANTS.DESTINATIONS.FORGOT_PASSWORD,
        });
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
          Forgot Password?
        </Text>

        <Text style={[FONTS.mediumFont16, {marginTop: SIZES.ten}]}>
          Enter your email & we will send you a verification code
        </Text>

        <View style={{marginTop: SIZES.fifty}}>
          <CustomTextInput
            email
            hasIcon
            iconName="user-o"
            iconType={IconType.FontAwesome}
            value={email}
            placeholder="Email"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <CustomButton
          title="Continue"
          onPress={onForgotPassword}
          disabled={utils.isBtnDisable([email])}
          btnStyle={{marginTop: SIZES.fifty * 2}}
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
  logoStyle: {
    alignSelf: 'center',
    marginTop: SIZES.ten,
    height: SIZES.fifty * 1.6,
    width: SIZES.fifty * 1.6,
  },
});
