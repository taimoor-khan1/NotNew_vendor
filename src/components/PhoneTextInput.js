import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {COLORS, SIZES} from '../constants';

export default function PhoneTextInput(props) {
  const {phone, setPhone, setCountryCode} = props;

  const phoneInput = useRef(null);
  const [borderColor, setBorderColor] = useState(COLORS.charcoalGrey);

  const onSelect = country => {
    setCountryCode(
      !country.callingCode[0].includes('+')
        ? `+${country.callingCode[0]}`
        : country.callingCode[0],
    );
  };

  return (
    <View>
      <PhoneInput
        layout="first"
        defaultCode="US"
        ref={phoneInput}
        defaultValue={phone}
        onChangeCountry={onSelect}
        onChangeText={text => setPhone(text)}
        textInputStyle={styles.textInputStyle}
        textContainerStyle={styles.textContainerStyle}
        countryPickerButtonStyle={styles.countryPickerButtonStyle}
        containerStyle={[styles.containerStyle, {borderColor: borderColor}]}
      />

      {phone.length && !phoneInput.current?.isValidNumber(phone) ? (
        <Text style={styles.textStyle}>Invalid phone number</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    padding: 0,
  },
  countryPickerButtonStyle: {
    backgroundColor: COLORS.transparent,
  },
  textContainerStyle: {
    backgroundColor: COLORS.transparent,
  },
  containerStyle: {
    height: 65,
    width: '100%',
    borderWidth: 1,
    borderRadius: SIZES.fifteen,
    marginTop: SIZES.fifteen * 1.3,
  },
  textStyle: {
    color: 'red',
    fontSize: SIZES.body10,
    marginLeft: SIZES.twenty,
    marginTop: SIZES.five,
  },
});
