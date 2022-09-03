import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, CONSTANTS, FONTS, SIZES, STYLES} from '../../constants';
import {hideLoader, showLoader, updateProfile} from '../../redux/slices';
import {showSimpleMessage} from '../../utils/flashMessage';
import utils from '../../utils';
import {
  Icon,
  IconType,
  CustomButton,
  CustomHeader,
  CustomTextInput,
  UploadPhotoModal,
  MyTouchableOpacity,
} from '../../components';

export default function Profile(props) {
  const dispatcher = useDispatch();
  const user = useSelector(state => state.profile.profile);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgModal, setProfileImgModal] = useState(false);

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setAddress(user?.address);
    setPhoneNumber(user?.country_code + user?.phone);
    setImage(CONSTANTS.API_URLS.IMAGE_URL + user?.image);
  }, [user]);

  const onUpdateProfile = () => {
    var data = {
      name: name,
      email: email,
      address: address,
    };

    if (profileImg) {
      data.image = profileImg;
    }

    dispatcher(showLoader());

    dispatcher(updateProfile(data))
      .unwrap()
      .then(response => {
        // console.log('updateProfile response: ', response);
        showSimpleMessage('success', {
          message: response.message,
        });
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
      <CustomHeader showBackButton title="Profile" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <MyTouchableOpacity
          style={styles.headerContainer}
          onPress={() => setProfileImgModal(true)}>
          <View style={styles.dpContainer}>
            <Image
              resizeMode="contain"
              style={styles.dpStyle}
              source={{uri: profileImg || image}}
            />

            <View style={styles.cameraIconView}>
              <Icon
                type={IconType.Feather}
                name="camera"
                style={{
                  fontSize: SIZES.twenty - 2,
                  color: COLORS.primary,
                }}
              />
            </View>
          </View>

          <Text style={[FONTS.mediumFont16, {color: COLORS.white}]}>
            Change your photo
          </Text>
        </MyTouchableOpacity>

        <View style={{flex: 1}}>
          <CustomTextInput
            hasIcon
            iconName="user-o"
            iconType={IconType.FontAwesome}
            value={name}
            placeholder="Name"
            onChangeText={setName}
          />

          <CustomTextInput
            email
            hasIcon
            iconName="mail"
            iconType={IconType.Feather}
            value={email}
            placeholder="Email"
            onChangeText={setEmail}
          />

          <CustomTextInput
            hasIcon
            iconName="location-pin"
            iconType={IconType.SimpleLineIcons}
            value={address}
            placeholder="Address"
            onChangeText={setAddress}
          />

          <CustomTextInput
            hasIcon
            editable={false}
            iconName="phone"
            iconType={IconType.AntDesign}
            value={phoneNumber}
            placeholder="Email"
            onChangeText={setPhoneNumber}
          />
        </View>

        <CustomButton
          title="Save"
          onPress={onUpdateProfile}
          btnStyle={{marginTop: SIZES.twentyFive}}
          disabled={utils.isBtnDisable([name, email, address])}
        />
      </ScrollView>

      <UploadPhotoModal
        isCircle
        cropping
        includeBase64
        visibility={profileImgModal}
        setVisibility={setProfileImgModal}
        onImageSelected={image =>
          setProfileImg(`data:image/png;base64,${image?.data}`)
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: SIZES.ten,
    paddingBottom: SIZES.twentyFive,
    paddingHorizontal: SIZES.fifteen,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.twenty,
    paddingHorizontal: SIZES.twenty,
    paddingVertical: SIZES.twenty,
    borderRadius: SIZES.twentyFive,
    backgroundColor: COLORS.primary,
  },
  dpContainer: {
    height: SIZES.fifty * 1.4,
    width: SIZES.fifty * 1.4,
    marginBottom: SIZES.fifteen,
  },
  dpStyle: {
    height: SIZES.fifty * 1.4,
    width: SIZES.fifty * 1.4,
    borderRadius: SIZES.fifty,
  },
  cameraIconView: {
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    height: SIZES.twentyFive * 1.3,
    width: SIZES.twentyFive * 1.3,
    borderRadius: SIZES.twentyFive * 1.3,
    backgroundColor: COLORS.white,
  },
});
