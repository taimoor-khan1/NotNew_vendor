import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hideLoader, showLoader, updateProfile} from '../../redux/slices';
import {showSimpleMessage} from '../../utils/flashMessage';
import {
  Icon,
  IconType,
  SeeAllComp,
  ProductComp,
  UploadPhotoModal,
  MyTouchableOpacity,
} from '../../components';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  height,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../constants';

export default function Home(props) {
  const {navigation} = props;
  const dispatcher = useDispatch();
  const user = useSelector(state => state.profile.profile);

  const [coverImgModal, setCoverImgModal] = useState(false);
  const [profileImgModal, setProfileImgModal] = useState(false);
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProfileImg(CONSTANTS.API_URLS.IMAGE_URL + user?.image);
    setCoverImg(
      user?.cover_image && CONSTANTS.API_URLS.IMAGE_URL + user?.cover_image,
    );
    setProducts(user?.products);
  }, [user]);

  const onUpdateProfile = imgData => {
    dispatcher(showLoader());

    dispatcher(updateProfile(imgData))
      .unwrap()
      .then(response => {
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

  const RenderHeader = () => (
    <View style={{marginBottom: SIZES.ten}}>
      <View style={styles.topView}>
        <MyTouchableOpacity
          style={[styles.moreIconView, STYLES.shadow]}
          onPress={() => navigation.toggleDrawer()}>
          <Image
            resizeMode="contain"
            source={IMAGES.moreIcon}
            style={styles.moreIconStyle}
          />
        </MyTouchableOpacity>

        <MyTouchableOpacity
          opacity={0.9}
          style={styles.changeCoverBtn}
          onPress={() => setCoverImgModal(true)}>
          <Text style={[FONTS.mediumFont10, {color: COLORS.white}]}>
            Change Cover
          </Text>
        </MyTouchableOpacity>
      </View>

      {coverImg ? (
        <Image source={{uri: coverImg}} style={styles.imgStyle} />
      ) : (
        <MyTouchableOpacity
          opacity={0.9}
          style={styles.imgStyle}
          onPress={() => setCoverImgModal(true)}>
          <LinearGradient
            start={{x: 0, y: -1}}
            end={{x: 1, y: 0}}
            colors={['#5ad3d7', '#55a6d6', '#964ed4']}
            style={[StyleSheet.absoluteFill]}
          />
        </MyTouchableOpacity>
      )}

      <View style={styles.dpContainer}>
        <MyTouchableOpacity
          onPress={() => navigation.navigate(SCREENS.Profile)}>
          <Image
            resizeMode="contain"
            style={styles.dpStyle}
            source={{uri: profileImg}}
          />

          <MyTouchableOpacity
            style={styles.cameraIconView}
            onPress={() => setProfileImgModal(true)}>
            <Icon
              type={IconType.Feather}
              name="camera"
              style={{
                fontSize: SIZES.fifteen + 1,
                color: COLORS.primary,
              }}
            />
          </MyTouchableOpacity>
        </MyTouchableOpacity>
      </View>

      <Text style={[FONTS.boldFont18, {marginHorizontal: SIZES.fifteen}]}>
        Quanzhou Frizzo Import & Export Trading Co, Ltd.
      </Text>
    </View>
  );

  const RenderProductList = () => (
    <View style={styles.productsListView}>
      {products?.slice(0, 6).map((item, index) => (
        <MyTouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate(SCREENS.ProductDetail, {product: item})
          }>
          <ProductComp item={item} />
        </MyTouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={STYLES.container}>
      <RenderHeader />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <SeeAllComp
          heading="Products"
          containerStyle={{marginTop: SIZES.fifteen}}
          onPressSeeAll={() => navigation.navigate(SCREENS.Products)}
        />

        {products?.length > 0 ? (
          <RenderProductList />
        ) : (
          <Text style={[FONTS.mediumFont12, styles.emptyTextStyle]}>
            No products to show!
          </Text>
        )}
      </ScrollView>

      <MyTouchableOpacity
        style={styles.addIconBtn}
        onPress={() => navigation.navigate(SCREENS.SelectCategory)}>
        <Icon
          name="plus"
          type={IconType.Feather}
          style={{
            color: COLORS.white,
            fontSize: SIZES.twentyFive * 1.4,
          }}
        />
      </MyTouchableOpacity>

      <UploadPhotoModal
        isCircle
        cropping
        includeBase64
        visibility={profileImgModal}
        setVisibility={setProfileImgModal}
        onImageSelected={image => {
          setProfileImg(`data:image/png;base64,${image?.data}`);
          onUpdateProfile({image: `data:image/png;base64,${image?.data}`});
        }}
      />

      <UploadPhotoModal
        includeBase64
        visibility={coverImgModal}
        setVisibility={setCoverImgModal}
        onImageSelected={image => {
          setCoverImg(`data:image/png;base64,${image?.data}`);
          onUpdateProfile({
            cover_image: `data:image/png;base64,${image?.data}`,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: SIZES.ten,
    paddingBottom: SIZES.twentyFive,
  },
  bannerStyle: {
    width: '100%',
    height: SIZES.fifty * 2.6,
    borderRadius: SIZES.twenty,
  },
  categoryImgStyle: {
    height: SIZES.twentyFive * 1.7,
    width: SIZES.twentyFive * 1.7,
  },
  categoryViewStyle: {
    alignItems: 'center',
    marginRight: SIZES.twenty,
    width: SIZES.twentyFive * 3,
  },
  categoryTextStyle: {
    color: COLORS.primary,
    marginTop: SIZES.five,
    textAlign: 'center',
  },
  storeViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.fifteen,
    marginRight: SIZES.twenty,
    backgroundColor: COLORS.halfWhite,
    paddingHorizontal: SIZES.twentyFive,
    paddingVertical: SIZES.ten,
  },
  storeImgStyle: {
    height: SIZES.twenty * 2,
    width: SIZES.twenty * 2,
  },
  productsListView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SIZES.twentyFive,
    paddingHorizontal: SIZES.fifteen,
  },
  addIconBtn: {
    width: 65,
    height: 65,
    borderRadius: 65,
    right: SIZES.twenty,
    bottom: SIZES.twentyFive,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  imgStyle: {
    width: '100%',
    height: height * 0.25,
  },
  topView: {
    zIndex: 10,
    left: 0,
    right: 0,
    top: Platform.OS === 'ios' ? getStatusBarHeight(true) : SIZES.twenty,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.fifteen,
  },
  changeCoverBtn: {
    borderRadius: SIZES.five,
    paddingVertical: SIZES.five,
    paddingHorizontal: SIZES.ten,
    backgroundColor: COLORS.primary,
  },
  dpContainer: {
    height: SIZES.fifty * 1.5,
    width: SIZES.fifty * 1.5,
    marginBottom: SIZES.fifteen,
    marginLeft: SIZES.fifteen,
    marginTop: -SIZES.fifty * 0.75,
  },
  dpStyle: {
    borderWidth: 1.5,
    borderColor: COLORS.white,
    height: SIZES.fifty * 1.5,
    width: SIZES.fifty * 1.5,
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
    backgroundColor: COLORS.white,
    height: SIZES.twentyFive * 1.1,
    width: SIZES.twentyFive * 1.1,
    borderRadius: SIZES.twentyFive * 1.1,
  },
  moreIconView: {
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.twentyFive * 2,
    height: SIZES.twentyFive * 2,
    borderRadius: SIZES.fifty * 2,
    backgroundColor: COLORS.white,
  },
  moreIconStyle: {
    width: SIZES.twenty,
    height: SIZES.twenty,
  },
  emptyTextStyle: {
    textAlign: 'center',
    color: COLORS.primary,
    marginTop: SIZES.twenty,
    marginHorizontal: SIZES.twentyFive,
  },
});

const productsList = [
  {
    price: 78,
    rating: 3,
    name: 'Vinta Shoes',
    description: 'Lorem ipsum dolor sit amitconsectetur',
    image: IMAGES.shoes,
  },
  {
    price: 78,
    rating: 4,
    name: 'Men T-Shirt',
    description: 'Lorem ipsum dolor sit amitconsectetur',
    image: IMAGES.menTshirt,
  },
  {
    price: 78,
    rating: 3,
    name: 'Printed T-Shirt',
    description: 'Lorem ipsum dolor sit amitconsectetur',
    image: IMAGES.printedTshirt,
  },
  {
    price: 78,
    rating: 4,
    name: 'Women Shoe',
    description: 'Lorem ipsum dolor sit amitconsectetur',
    image: IMAGES.womenShoe,
  },
  {
    price: 78,
    rating: 3,
    name: 'Classic Watch',
    description: 'Lorem ipsum dolor sit amitconsectetur',
    image: IMAGES.watches,
  },
  {
    price: 78,
    rating: 3,
    name: 'Vintage T-Shirt',
    description: 'Lorem ipsum dolor sit amitconsectetur',
    image: IMAGES.vintageTshirt,
  },
];
