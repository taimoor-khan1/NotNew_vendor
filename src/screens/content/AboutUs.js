import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {COLORS, FONTS, SIZES, STYLES} from '../../constants';
import {CustomHeader} from '../../components';
import {useSelector} from 'react-redux';

export default function AboutUs(props) {
  const {content} = useSelector(state => state.content);

  const RendorAboutApp = () => {
    return (
      <View style={styles.contentView}>
        {/* <View style={styles.dotStyle} /> */}

        <Text style={[FONTS.mediumFont14, styles.textStyle]}>
          {content?.about_us_paragraph_a}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="About App" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <RendorAboutApp />
        {/* <RendorAboutApp />
        <RendorAboutApp /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: SIZES.ten,
    paddingBottom: SIZES.twenty,
    paddingHorizontal: SIZES.twenty,
  },
  contentView: {
    flexDirection: 'row',
    marginBottom: SIZES.fifteen,
  },
  dotStyle: {
    height: SIZES.ten,
    width: SIZES.ten,
    marginTop: SIZES.ten,
    borderRadius: SIZES.ten,
    backgroundColor: COLORS.primary,
  },
  textStyle: {
    flex: 1,
    textAlign: 'justify',
    // marginLeft: SIZES.ten,
  },
});
