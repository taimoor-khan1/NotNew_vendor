import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {height, IMAGES, COLORS, SIZES} from '../../constants';

export default function LoaderModal(props) {
  const visibility = useSelector(state => state.loader.isVisible);

  return (
    <Modal
      statusBarTranslucent
      visible={props.visible || visibility}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      deviceHeight={height * height}
      style={{margin: 0}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.white + 95,
        }}>
        <LottieView
          loop
          autoPlay
          source={IMAGES.loaderGif}
          style={{width: SIZES.fifty * 4, height: SIZES.fifty * 4}}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
