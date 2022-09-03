import React, {useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoader, showLoader, uploadProduct} from '../../redux/slices';
import {COLORS, FONTS, SCREENS, SIZES, STYLES} from '../../constants';
import {showSimpleMessage} from '../../utils/flashMessage';
import utils from '../../utils';
import {
  Icon,
  IconType,
  PickerModal,
  CustomHeader,
  CustomButton,
  CustomTextInput,
  MyTouchableOpacity,
  UploadPhotoModal,
} from '../../components';

export default function ProductInformation(props) {
  const {navigation, route} = props;
  const {category} = route?.params;
  const dispatcher = useDispatch();
  const {brands} = useSelector(state => state.content);
  const user = useSelector(state => state.profile.profile);

  const brandModalizeRef = useRef(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [imgModal, setImgModal] = useState(false);

  const onUploadProduct = async () => {
    if (productImages.length === 0) {
      showSimpleMessage('warning', {
        message: 'Please add atleast one product image',
      });
      return;
    }

    const data = {
      name: name,
      price: Number(price),
      vendorId: user?._id,
      image: productImages,
      tags: selectedTags,
      brandId: brand?._id,
      categoryId: category?._id,
      description: description,
    };

    dispatcher(showLoader());

    dispatcher(uploadProduct(data))
      .unwrap()
      .then(_response => {
        dispatcher(hideLoader());

        showSimpleMessage('warning', {
          message: 'Product uploaded successfully.',
        });

        navigation.navigate(SCREENS.Home);
      })
      .catch(err => {
        dispatcher(hideLoader());
        showSimpleMessage('danger', {
          message: err.message,
        });
      });
  };

  const onImageSelect = images => {
    const selectedImages = images.map(i => `data:image/png;base64,${i.data}`);
    const temp = [...productImages, ...selectedImages];
    setProductImages(temp);
  };

  // const onImageSelect = async images => {
  //   const selectedImages = [];
  //   for (let i = 0; i < images.length; i++) {
  //     const element = images[i];
  //     const img = await utils.handleBase64(element.path);
  //     selectedImages.push(`data:image/png;base64,${img}`);
  //   }
  //   const temp = [...productImages, ...selectedImages];
  //   setProductImages(temp);
  // };

  const onRemoveImg = ind => {
    const temp = [...productImages];
    temp.splice(ind, 1);
    setProductImages(temp);
  };

  const handleTagPress = item => {
    var arr = [...selectedTags];
    const index = arr.findIndex(i => i === item);

    if (index > -1) {
      arr.splice(index, 1);
    } else {
      arr.push(item);
    }

    setSelectedTags(arr);
  };

  const RenderTag = ({item, selected}) => {
    return (
      <MyTouchableOpacity
        style={[
          styles.itemStyle2,
          {backgroundColor: selected ? COLORS.primary : null},
        ]}
        onPress={() => handleTagPress(item.title)}>
        <Text
          style={[
            FONTS.mediumFont10,
            {color: selected ? COLORS.white : COLORS.gray},
          ]}>
          {item.title}
        </Text>
      </MyTouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="Product Information" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Text style={[FONTS.boldFont18, {marginTop: SIZES.ten}]}>
          Product Data
        </Text>

        <CustomTextInput
          value={name}
          placeholder="Name"
          onChangeText={setName}
        />

        <CustomTextInput
          value={price}
          placeholder="Price"
          onChangeText={setPrice}
        />

        <CustomTextInput
          multiline
          value={description}
          placeholder="Description"
          onChangeText={setDescription}
        />

        <Text style={[FONTS.boldFont18, {marginTop: SIZES.fifteen * 1.5}]}>
          Choose Tags
        </Text>

        <View style={styles.itemsContainer}>
          {tagList.map((item, index) => (
            <View key={index}>
              <RenderTag
                item={item}
                selected={selectedTags.findIndex(i => i === item.title) > -1}
              />
            </View>
          ))}
        </View>

        <Text style={[FONTS.boldFont18, {marginTop: SIZES.fifteen}]}>
          Choose Brand
        </Text>

        <MyTouchableOpacity
          style={styles.brandPickerView}
          onPress={() => brandModalizeRef?.current?.open()}>
          <Text
            numberOfLines={1}
            style={[FONTS.mediumFont14, styles.brandTextStyle]}>
            {brand?.title || 'Select a brand'}
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

        <Text style={[FONTS.boldFont18, {marginTop: SIZES.twentyFive}]}>
          Upload Images
        </Text>

        <Text
          style={[
            FONTS.mediumFont14,
            {marginTop: SIZES.ten, color: COLORS.gray},
          ]}>
          Please upload your real product images
        </Text>

        <MyTouchableOpacity
          style={styles.uploadPhotoView}
          onPress={() => setImgModal(true)}>
          <View
            style={styles.addIconBtn}
            onPress={() => navigation.navigate(SCREENS.SelectCategory)}>
            <Icon
              name="plus"
              type={IconType.Feather}
              style={{
                color: COLORS.primary,
                fontSize: SIZES.twentyFive * 1.4,
              }}
            />
          </View>

          <Text
            style={[
              FONTS.mediumFont12,
              {marginTop: SIZES.fifteen, color: COLORS.gray},
            ]}>
            Upload photo
          </Text>
        </MyTouchableOpacity>

        {productImages.length > 0 && (
          <>
            <Text style={[FONTS.boldFont18, {marginTop: SIZES.twentyFive}]}>
              Product Images
            </Text>

            <View style={styles.photosView}>
              {productImages.map((item, index) => (
                <View
                  key={index}
                  style={{
                    marginRight: SIZES.twenty,
                    marginBottom: SIZES.twenty,
                  }}>
                  <Image source={{uri: item}} style={styles.dummyImgStyle} />

                  <MyTouchableOpacity
                    style={styles.crossBtnStyle}
                    onPress={() => onRemoveImg(index)}>
                    <Icon
                      type={IconType.Entypo}
                      name="cross"
                      style={{
                        color: COLORS.white,
                        fontSize: SIZES.twenty,
                      }}
                    />
                  </MyTouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )}

        <CustomButton
          title="Upload"
          onPress={onUploadProduct}
          btnStyle={{marginTop: SIZES.twentyFive * 1.5}}
          disabled={utils.isBtnDisable([name, price, description, brand])}
        />
      </ScrollView>

      <PickerModal
        data={brands}
        heading="Select Brand"
        modalizeRef={brandModalizeRef}
        onSelect={setBrand}
        onCancel={() => brandModalizeRef?.current?.close()}
      />

      <UploadPhotoModal
        multiple
        includeBase64
        visibility={imgModal}
        setVisibility={setImgModal}
        onImageSelected={onImageSelect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: SIZES.fifty,
    paddingHorizontal: SIZES.fifteen,
  },
  itemsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.twenty,
  },
  itemStyle1: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.primary,
    borderRadius: SIZES.five,
    paddingVertical: SIZES.five + 1,
    paddingHorizontal: SIZES.twenty,
    backgroundColor: COLORS.primary,
    marginBottom: SIZES.ten,
    marginRight: SIZES.ten,
  },
  itemStyle2: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.gray,
    borderRadius: SIZES.five,
    paddingVertical: SIZES.five + 1,
    paddingHorizontal: SIZES.twenty,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.ten,
    marginRight: SIZES.ten,
  },
  brandPickerView: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.ten,
    borderColor: COLORS.gray,
    marginTop: SIZES.twenty,
    paddingHorizontal: SIZES.twenty,
    paddingVertical: SIZES.fifteen,
  },
  brandTextStyle: {
    flex: 1,
    color: COLORS.gray,
    marginRight: SIZES.ten,
  },
  uploadPhotoView: {
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    marginTop: SIZES.twentyFive,
    padding: SIZES.twenty,
    borderRadius: SIZES.ten,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIconBtn: {
    borderWidth: 1,
    height: SIZES.fifty,
    width: SIZES.fifty,
    borderRadius: SIZES.fifty,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.gray,
    backgroundColor: COLORS.transparent,
  },
  dummyImgStyle: {
    // borderWidth: 1,
    height: SIZES.fifty,
    width: SIZES.fifty,
    // borderStyle: 'dashed',
    // borderColor: COLORS.gray,
    borderRadius: SIZES.ten,
  },
  photosView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: SIZES.twenty,
  },
  crossBtnStyle: {
    top: -SIZES.five * 1.6,
    right: -SIZES.five * 1.6,
    position: 'absolute',
    height: SIZES.twenty * 1.2,
    width: SIZES.twenty * 1.2,
    borderRadius: SIZES.twenty * 1.2,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const tagList = [
  {id: 1, title: 'Women'},
  {id: 2, title: 'Men'},
  {id: 3, title: 'Beauty'},
  {id: 4, title: 'Skin Care'},
  {id: 5, title: 'Jewellery'},
  {id: 6, title: 'Cosmetics'},
  {id: 7, title: 'Sandals'},
];
