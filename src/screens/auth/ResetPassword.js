import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {showSimpleMessage} from '../../utils/flashMessage';
import {FONTS, IMAGES, SCREENS, SIZES, STYLES} from '../../constants';
import {hideLoader, resetPassword, showLoader} from '../../redux/slices';
import utils from '../../utils';
import {
  IconType,
  BackButton,
  CustomButton,
  CustomTextInput,
} from '../../components';

export default function ResetPassword(props) {
  const {navigation, route} = props;
  const {email} = route?.params;
  const dispatcher = useDispatch();

  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const onResetPassword = async () => {
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
    if (confirmPass !== password) {
      showSimpleMessage('warning', {
        message: 'Passwords did not match',
      });
      return;
    }

    const data = {
      email: email,
      password: password,
      password_confirmation: confirmPass,
    };

    dispatcher(showLoader());

    dispatcher(resetPassword(data))
      .unwrap()
      .then(_response => {
        dispatcher(hideLoader());

        showSimpleMessage('warning', {
          message: 'Password changed successfully. Please login to continue.',
        });

        navigation.navigate(SCREENS.Login);
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
          Reset Password
        </Text>

        <Text style={[FONTS.mediumFont16, {marginTop: SIZES.ten}]}>
          Enter new password to login
        </Text>

        <View style={{marginTop: SIZES.fifty}}>
          <CustomTextInput
            hasIcon
            password
            iconName="lock"
            iconType={IconType.SimpleLineIcons}
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
          />

          <CustomTextInput
            hasIcon
            password
            iconName="lock"
            iconType={IconType.SimpleLineIcons}
            value={confirmPass}
            placeholder="Confirm Password"
            onChangeText={setConfirmPass}
          />
        </View>

        <CustomButton
          title="Reset"
          onPress={onResetPassword}
          btnStyle={{marginTop: SIZES.fifty * 2}}
          disabled={utils.isBtnDisable([password, confirmPass])}
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
