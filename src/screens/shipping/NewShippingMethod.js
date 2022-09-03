import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {CustomButton, CustomHeader, CustomTextInput} from '../../components';
import {SIZES, STYLES} from '../../constants';

export default function NewShippingMethod(props) {
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="New Shipping Method" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={{flex: 1}}>
          <CustomTextInput
            value={label}
            placeholder="Label"
            onChangeText={setLabel}
          />

          <CustomTextInput
            value={address}
            placeholder="Address"
            onChangeText={setAddress}
          />

          <CustomTextInput
            value={city}
            placeholder="City"
            onChangeText={setCity}
          />

          <CustomTextInput
            value={province}
            placeholder="State/Province/Region"
            onChangeText={setProvince}
          />

          <CustomTextInput
            value={zipCode}
            placeholder="Postal Code/Zip Code"
            onChangeText={setZipCode}
          />

          <CustomTextInput
            value={country}
            placeholder="Country"
            onChangeText={setCountry}
          />
        </View>

        <CustomButton
          title="Save & Finish"
          onPress={() => {}}
          btnStyle={{marginTop: SIZES.twentyFive}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: SIZES.twentyFive,
    paddingHorizontal: SIZES.fifteen,
  },
});
