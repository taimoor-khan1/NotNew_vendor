import React, {useState} from 'react';
import {Text, View, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {COLORS, FONTS, SCREENS, SIZES, STYLES} from '../../constants';
import {hideLoader, showLoader, login} from '../../redux/slices';
import {showSimpleMessage} from '../../utils/flashMessage';
import utils from '../../utils';
import {
  IconType,
  CustomButton,
  CustomTextInput,
  MyTouchableOpacity,
} from '../../components';

export default function Login(props) {
  const {navigation} = props;
  const dispatcher = useDispatch();

  const [email, setEmail] = useState(__DEV__ ? 'test_vendor@yopmail.com' : '');
  const [password, setPassword] = useState(__DEV__ ? '12345678' : '');

  const loginUser = async () => {
    if (!utils.validateEmail(email)) {
      showSimpleMessage('warning', {
        message: 'Invalid email',
      });
      return;
    }

    if (utils.isEmptyOrSpaces(password)) {
      showSimpleMessage('warning', {
        message: 'Invalid password',
      });
      return;
    }

    if (password.length < 6) {
      showSimpleMessage('warning', {
        message: 'Password should not be less than 6 digits',
      });
      return;
    }

    dispatcher(showLoader());

    dispatcher(login({email, password}))
      .unwrap()
      .then(response => {
        // console.log('login response: ', response);

        if (response.status === 2) {
          navigation.navigate(SCREENS.Verification, {
            from: CONSTANTS.DESTINATIONS.SIGN_UP,
            email: email,
          });
        }
        dispatcher(hideLoader());
      })
      .catch(error => {
        dispatcher(hideLoader());
        showSimpleMessage('danger', {
          message: error.message,
        });
      });
  };

  return (
    <SafeAreaView style={STYLES.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Text style={[FONTS.boldFont24, styles.headingStyle]}>
          Hello there!
        </Text>

        <Text style={[FONTS.mediumFont16, {marginTop: SIZES.ten}]}>
          Sign In to Continue
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

          <CustomTextInput
            hasIcon
            password
            iconName="lock"
            iconType={IconType.SimpleLineIcons}
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
          />
        </View>

        <MyTouchableOpacity
          style={styles.forgotTextView}
          onPress={() => navigation.navigate(SCREENS.ForgotPassword)}>
          <Text style={FONTS.mediumFont14}>Forgot Password?</Text>
        </MyTouchableOpacity>

        <CustomButton
          title="Log In"
          onPress={loginUser}
          disabled={utils.isBtnDisable([email, password])}
        />

        <View style={styles.signupTextView}>
          <Text style={FONTS.mediumFont14}>
            Don't have an account?{' '}
            <Text
              style={[FONTS.mediumFont14, styles.signupTextStyle]}
              onPress={() => navigation.navigate(SCREENS.SignUp)}>
              Sign Up
            </Text>
          </Text>
        </View>

        {/* {Platform.OS === 'ios' && (
          <CustomButton
            hasIcon
            iconName="apple-o"
            iconType={IconType.AntDesign}
            title="Continue with Apple"
            titleStyle={styles.btnTitleStyle}
            btnStyle={{
              backgroundColor: COLORS.black,
              marginBottom: SIZES.twenty,
            }}
          />
        )} */}

        {/* <CustomButton
          hasIcon
          iconName="facebook-square"
          iconType={IconType.AntDesign}
          title="Continue with Facebook"
          titleStyle={styles.btnTitleStyle}
          btnStyle={{backgroundColor: COLORS.blue}}
        />

        <CustomButton
          hasIcon
          iconName="google"
          iconType={IconType.AntDesign}
          title="Continue with Google"
          titleStyle={styles.btnTitleStyle}
          btnStyle={{backgroundColor: COLORS.orange, marginTop: SIZES.twenty}}
        /> */}
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
  },
  forgotTextView: {
    alignSelf: 'flex-end',
    marginVertical: SIZES.twentyFive * 1.5,
  },
  signupTextView: {
    alignSelf: 'center',
    marginVertical: SIZES.twentyFive * 1.5,
  },
  signupTextStyle: {
    fontWeight: 'bold',
    color: COLORS.seaGreen,
  },
  btnTitleStyle: {
    fontSize: SIZES.h20,
    fontWeight: 'normal',
  },
});
