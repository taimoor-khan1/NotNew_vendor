import React, {useRef, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SCREENS, SIZES, STYLES} from '../../constants';
import {showSimpleMessage} from '../../utils/flashMessage';
import {
  CustomButton,
  Icon,
  IconType,
  MyTouchableOpacity,
  PickerModal,
} from '../../components';
import utils from '../../utils';

export default function SignUp(props) {
  const {navigation} = props;

  const countryModalizeRef = useRef(null);
  const [country, setCountry] = useState(null);

  const onPressContinue = () => {
    if (country !== null) {
      navigation.navigate(SCREENS.RegistrationForm, {
        country: country?.name,
      });
    } else {
      showSimpleMessage('warning', {
        message: 'Please select country',
      });
    }
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

        <Text
          style={[
            FONTS.mediumFont14,
            {marginTop: SIZES.ten, color: COLORS.gray},
          ]}>
          Enter your detail here
        </Text>

        <Text style={[FONTS.mediumFont16, {marginTop: SIZES.twentyFive * 1.5}]}>
          Before starting, please ensure you have the following handy
        </Text>

        <Text
          style={[
            FONTS.mediumFont14,
            {marginTop: SIZES.twentyFive, color: COLORS.primary},
          ]}>
          Business & Contact Address
        </Text>
        <Text
          style={[
            FONTS.mediumFont14,
            {marginTop: SIZES.fifteen, color: COLORS.primary},
          ]}>
          Mobile & Telephone Number
        </Text>
        <Text
          style={[
            FONTS.mediumFont14,
            {marginTop: SIZES.fifteen, color: COLORS.primary},
          ]}>
          Chargable Credit Card
        </Text>
        <Text
          style={[
            FONTS.mediumFont14,
            {marginTop: SIZES.fifteen, color: COLORS.primary},
          ]}>
          Identity Details
        </Text>

        <Text style={[FONTS.mediumFont16, {marginTop: SIZES.twentyFive * 1.5}]}>
          Business Location
        </Text>

        <MyTouchableOpacity
          onPress={() => countryModalizeRef?.current?.open()}
          style={styles.countryPickerView}>
          <Text
            numberOfLines={1}
            style={[FONTS.mediumFont14, styles.countryTextStyle]}>
            {country?.name || 'Select a country'}
          </Text>

          <Icon
            type={IconType.MaterialIcons}
            name="keyboard-arrow-down"
            style={{
              color: COLORS.gray,
              fontSize: SIZES.twentyFive,
            }}
          />
        </MyTouchableOpacity>

        <Text
          style={[
            FONTS.mediumFont14,
            {marginTop: SIZES.fifteen, color: COLORS.gray},
          ]}>
          We may require additional information or documents later
        </Text>

        <Text
          style={[
            FONTS.mediumFont14,
            {marginTop: SIZES.twentyFive, color: COLORS.gray},
          ]}>
          Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        <Text
          style={[
            FONTS.mediumFont14,
            {marginTop: SIZES.twentyFive, color: COLORS.gray},
          ]}>
          Duis aute irure dolor in reprehenderit in volup tate velit esse cillum
          dolore
        </Text>

        <CustomButton
          title="Agree & Continue"
          onPress={onPressContinue}
          disabled={utils.isBtnDisable([country])}
          btnStyle={{marginTop: SIZES.twentyFive}}
        />

        <View style={styles.signupTextView}>
          <Text style={FONTS.mediumFont14}>
            Already have an account?{' '}
            <Text
              style={[FONTS.mediumFont14, styles.signupTextStyle]}
              onPress={() => navigation.navigate(SCREENS.Login)}>
              Log In
            </Text>
          </Text>
        </View>
      </ScrollView>

      <PickerModal
        data={countriesList}
        heading="Select Country"
        modalizeRef={countryModalizeRef}
        onSelect={setCountry}
        onCancel={() => countryModalizeRef?.current?.close()}
      />
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
  countryPickerView: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.ten,
    borderColor: COLORS.gray,
    marginTop: SIZES.fifteen,
    paddingHorizontal: SIZES.twenty,
    paddingVertical: SIZES.fifteen,
  },
  countryTextStyle: {
    flex: 1,
    color: COLORS.gray,
    marginRight: SIZES.ten,
  },
});

const countriesList = [
  {name: 'United States'},
  {name: 'South Africa'},
  {name: 'Pakistan'},
];
