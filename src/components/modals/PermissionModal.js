import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS, FONTS, height, SIZES} from '../../constants';
import MyTouchableOpacity from '../MyTouchableOpacity';

export default function PermissionModal(props) {
  const {visible, setVisible, title, onDone, onCancel} = props;

  return (
    <Modal
      statusBarTranslucent
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      deviceHeight={height * height}
      onBackdropPress={() => setVisible(false)}>
      <View style={styles.mainView}>
        <Text style={[FONTS.boldFont22, styles.headingStyle]}>Not New</Text>

        <Text style={[FONTS.mediumFont14, styles.titleStyle]}>{title}</Text>

        <View style={styles.btnContainer}>
          <MyTouchableOpacity
            onPress={() => {
              setVisible(false);
              setTimeout(() => {
                onDone();
              }, 500);
            }}
            style={styles.btnStyle}>
            <Text style={[FONTS.mediumFont12, {color: COLORS.white}]}>Yes</Text>
          </MyTouchableOpacity>

          <MyTouchableOpacity
            onPress={() => {
              setVisible(false);
              onCancel();
            }}
            style={styles.btnStyle}>
            <Text style={[FONTS.mediumFont12, {color: COLORS.white}]}>No</Text>
          </MyTouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainView: {
    borderWidth: 1.5,
    padding: SIZES.ten * 2,
    borderRadius: SIZES.ten,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  headingStyle: {
    color: COLORS.primary,
    marginTop: SIZES.five,
    textAlign: 'center',
  },
  titleStyle: {
    textAlign: 'center',
    marginVertical: SIZES.twenty,
  },
  btnContainer: {
    marginTop: SIZES.five,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnStyle: {
    padding: SIZES.ten,
    width: SIZES.fifty,
    alignItems: 'center',
    borderRadius: SIZES.ten,
    marginHorizontal: SIZES.five,
    backgroundColor: COLORS.primary,
  },
});
