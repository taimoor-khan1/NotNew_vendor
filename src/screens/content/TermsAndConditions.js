import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {CustomHeader} from '../../components';
import {FONTS, SIZES, STYLES} from '../../constants';

export default function TermsAndConditions(props) {
  const {content} = useSelector(state => state.content);

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="Terms & Conditions" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Text style={FONTS.mediumFont14}>
          {content?.terms_condition_paragraph}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: SIZES.ten,
    paddingBottom: SIZES.twenty,
    paddingHorizontal: SIZES.fifteen,
  },
});
