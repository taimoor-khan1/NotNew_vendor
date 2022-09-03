import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {hideLoader, showLoader, signup} from '../../redux/slices';
import {showSimpleMessage} from '../../utils/flashMessage';
import utils from '../../utils';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../constants';
import {
  BackButton,
  CustomButton,
  CustomTextInput,
  PhoneTextInput,
  AnimatedCheckbox,
} from '../../components';

export default function RegistrationForm(props) {
  const {navigation, route} = props;
  const {country} = route?.params;
  const dispatcher = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [address, setAddress] = useState('');
  // const [area, setArea] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [checked, setChecked] = useState(false);

  const signUpUser = async () => {
    if (utils.isEmptyOrSpaces(name)) {
      showSimpleMessage('warning', {
        message: 'Invalid name',
      });
      return;
    }
    if (!utils.validateEmail(email)) {
      showSimpleMessage('warning', {
        message: 'Invalid email',
      });
      return;
    }
    if (utils.isEmptyOrSpaces(phoneNumber)) {
      showSimpleMessage('warning', {
        message: 'Phone number is required',
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
    if (confirmPass !== password) {
      showSimpleMessage('warning', {
        message: 'Passwords did not match',
      });
      return;
    }
    if (utils.isEmptyOrSpaces(address)) {
      showSimpleMessage('warning', {
        message: 'Invalid address',
      });
      return;
    }
    if (utils.isEmptyOrSpaces(zipCode)) {
      showSimpleMessage('warning', {
        message: 'Invalid zip code',
      });
      return;
    }
    if (!checked) {
      showSimpleMessage('warning', {
        message: 'Please mark check to our Terms & Conditions',
      });
      return;
    }

    const data = {
      name: name,
      email: email,
      phone: phoneNumber,
      country: country,
      country_code: countryCode,
      address: address,
      zipcode: zipCode,
      password: password,
      password_confirmation: confirmPass,
      // latitude: "24.65656",
      // longitude: "67.66666",
    };

    dispatcher(showLoader());

    dispatcher(signup(data))
      .unwrap()
      .then(response => {
        console.log('signup response: ', response);

        navigation.navigate(SCREENS.Verification, {
          from: CONSTANTS.DESTINATIONS.SIGN_UP,
          email: email,
        });

        dispatcher(hideLoader());
      })
      .catch(error => {
        console.log('error: ', error);
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
        <BackButton />

        <Image
          resizeMode="contain"
          source={IMAGES.notNewLogo}
          style={styles.logoStyle}
        />

        <Text style={[FONTS.mediumFont18, {marginTop: SIZES.fifteen * 1.5}]}>
          Seller Registration Form
        </Text>

        <Text
          style={[
            FONTS.mediumFont14,
            {marginTop: SIZES.ten, color: COLORS.gray},
          ]}>
          We may require additional information or documents
        </Text>

        <View style={{marginTop: SIZES.fifteen}}>
          <Text style={[FONTS.mediumFont18, {marginTop: SIZES.fifteen * 1.5}]}>
            Main Contact
          </Text>

          <CustomTextInput
            value={name}
            placeholder="Full Name"
            onChangeText={setName}
          />

          <CustomTextInput
            email
            value={email}
            placeholder="Email Address"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PhoneTextInput
            phone={phoneNumber}
            setPhone={setPhoneNumber}
            setCountryCode={setCountryCode}
          />

          <CustomTextInput
            password
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
          />

          <CustomTextInput
            password
            value={confirmPass}
            placeholder="Confirm Password"
            onChangeText={setConfirmPass}
          />
        </View>

        <View style={{marginTop: SIZES.fifteen}}>
          <Text style={[FONTS.mediumFont18, {marginTop: SIZES.fifteen * 1.5}]}>
            Operational Information
          </Text>

          <CustomTextInput
            value={address}
            placeholder="Address"
            onChangeText={setAddress}
          />

          {/* <CustomTextInput
            value={area}
            placeholder="Area"
            onChangeText={setArea}
          /> */}

          <CustomTextInput
            value={zipCode}
            placeholder="Zip Code/Postal Code"
            onChangeText={setZipCode}
          />
        </View>

        <AnimatedCheckbox
          checked={checked}
          rippleEffect={false}
          touchableLabel={false}
          checkMarkColor={COLORS.white}
          onValueChange={val => setChecked(val)}
          checkedBackgroundColor={COLORS.primary}
          containerStyle={{marginTop: SIZES.fifteen}}
          labelStyle={{color: COLORS.black}}
          label={
            <Text style={FONTS.mediumFont12}>
              I agree to the{' '}
              <Text
                style={[FONTS.mediumFont12, {color: COLORS.primary}]}
                onPress={() => {}}>
                Terms & Conditions{' '}
              </Text>
              and{' '}
              <Text
                style={[FONTS.mediumFont12, {color: COLORS.primary}]}
                onPress={() => {}}>
                Privacy Policy
              </Text>
            </Text>
          }
        />

        <CustomButton
          title="Submit"
          onPress={signUpUser}
          btnStyle={{marginTop: SIZES.twentyFive}}
          disabled={utils.isBtnDisable([
            name,
            email,
            phoneNumber,
            password,
            confirmPass,
            address,
            zipCode,
          ])}
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
  },
  signupTextView: {
    alignSelf: 'center',
    marginTop: SIZES.twentyFive,
  },
  signupTextStyle: {
    fontWeight: 'bold',
    color: COLORS.seaGreen,
  },
  checkMarkView: {
    flexDirection: 'row',
    marginTop: SIZES.fifteen,
  },
  logoStyle: {
    alignSelf: 'center',
    height: SIZES.fifty * 1.6,
    width: SIZES.fifty * 1.6,
  },
});
