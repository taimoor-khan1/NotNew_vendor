import {Dimensions, Platform, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const {width, height} = Dimensions.get('window');

/* *************** Colors ********** */

export const COLORS = {
  primary: '#a836d3',
  black: '#000000',
  white: '#ffffff',
  blue: '#3e76d2',
  gray: '#767577',
  star: '#f3b206',
  golden: '#FFD700',
  purple: '#4e1789',
  lightPurple: '#871af6',
  brownGray: '#5d536a',
  trueGreen: '#1eaf08',
  halfWhite: '#eeeeee',
  charcoalGrey: '#4a4b4d',
  veryLightpink: '#ffeef2',
  transparent: 'transparent',
  seaGreen: '#5bd7d7',
  orange: '#ee4336',
  red: '#b03f3d',
  lightRed: '#ddb2b0',
  yellow: '#f3b206',
  lightYellow: '#f9e0aa',
  green: '#63ff58',
  lightGreen: '#b2ffc0',
};

const appTheme = {COLORS};

export default appTheme;

/* * Fonts * */
export const FONTFAMILY = {
  Bold: 'Montserrat-Bold',
  Light: 'Montserrat-Light',
  Medium: 'Montserrat-Medium',
  Regular: 'Montserrat-Regular',
};

/* * Images * */
export const IMAGES = {
  loaderGif: require('../assets/images/Loader.json'),
  emptyListGif: require('../assets/images/empty-list-gif.json'),
  notNewLogo: require('../assets/images/not-new-logo.png'),
  notNewBg: require('../assets/images/not-new-bg.png'),
  profilePic: require('../assets/images/profile-pic.jpeg'),
  notNewHeaderLogo: require('../assets/images/notnew-header-logo.png'),
  bibOutline: require('../assets/images/bib-outline.png'),
  highHeelsOutline: require('../assets/images/high-heels-outline.png'),
  necklaceOutline: require('../assets/images/necklace-outline.png'),
  suitsOutline: require('../assets/images/suits-outline.png'),
  watchOutline: require('../assets/images/watch-outline.png'),
  featurePic: require('../assets/images/feature-pic.png'),
  adidasLogo: require('../assets/images/adidas-logo.png'),
  pumaLogo: require('../assets/images/puma-logo.png'),
  triangularLogo: require('../assets/images/triangular-logo.png'),
  menTshirt: require('../assets/images/men-tshirt.png'),
  printedTshirt: require('../assets/images/printed-tshirt.png'),
  shoes: require('../assets/images/shoes.png'),
  vintageTshirt: require('../assets/images/vintage-tshirt.png'),
  watches: require('../assets/images/watches.png'),
  womenShoe: require('../assets/images/women-shoe.png'),
  olivesBanner: require('../assets/images/olives-banner.png'),
  moreIcon: require('../assets/images/more-icon.png'),
  searchIcon: require('../assets/images/search-icon.png'),
  filterIcon: require('../assets/images/filter-icon.png'),
  deleteIcon: require('../assets/images/delete-icon.png'),
  dhlLogo: require('../assets/images/dhl-logo.png'),
  fedexLogo: require('../assets/images/fedex-logo.png'),
  uspsLogo: require('../assets/images/usps-logo.png'),
};

/* * Screens * */
export const SCREENS = {
  Login: 'Login',
  SignUp: 'SignUp',
  Splash: 'Splash',
  ResetPassword: 'ResetPassword',
  ForgotPassword: 'ForgotPassword',
  Verification: 'Verification',
  NewPassword: 'NewPassword',
  Home: 'Home',
  Noitification: 'Noitification',
  Payment: 'Payment',
  Settings: 'Settings',
  NewOrder: 'NewOrder',
  OrderHistory: 'OrderHistory',
  OrderDetails: 'OrderDetails',
  Additem: 'Additem',
  Profile: 'Profile',
  EditProfile: 'EditProfile',
  SelectType: 'SelectType',
  AboutUs: 'AboutUs',
  TermsAndConditions: 'TermsAndConditions',
  DrawerNavigation: 'DrawerNavigation',
  DrawerNavigator: 'DrawerNavigator',
  SearchScreen: 'SearchScreen',
  ProductDetail: 'ProductDetail',
  ShippingMethod: 'ShippingMethod',
  NewShippingMethod: 'NewShippingMethod',
  RegistrationForm: 'RegistrationForm',
  SelectCategory: 'SelectCategory',
  ProductInformation: 'ProductInformation',
  MyOrders: 'MyOrders',
  Products: 'Products',
  EditProduct: 'EditProduct',
};

export const SIZES = {
  // global sizes
  five: height * 0.0055,
  ten: height * 0.011,
  fifteen: height * 0.017,
  twenty: height * 0.023,
  twentyWidth: width * 0.05,
  twentyFive: height * 0.03,
  twentyFiveWidth: width * 0.08,
  fifty: height * 0.075,
  fiftyWidth: width * 0.13,

  // font sizes
  h16: width * 0.034,
  h18: width * 0.038,
  h20: width * 0.042,
  h22: width * 0.048,
  h24: width * 0.055,
  body08: width * 0.024,
  body10: width * 0.028,
  body12: width * 0.032,
  body14: width * 0.036,
  body16: width * 0.04,
  body18: width * 0.045,
};

export const FONTS = {
  boldFont16: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h16,
    color: COLORS.black,
  },
  boldFont18: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h18,
    color: COLORS.black,
  },
  boldFont20: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h20,
    color: COLORS.black,
  },
  boldFont22: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h22,
    color: COLORS.black,
  },
  boldFont24: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h24,
    color: COLORS.black,
  },
  semiBoldFont16: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h16,
    color: COLORS.black,
  },
  semiBoldFont18: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h18,
    color: COLORS.black,
  },
  semiBoldFont20: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h20,
    color: COLORS.black,
  },
  semiBoldFont22: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h22,
    color: COLORS.black,
  },
  semiBoldFont24: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h24,
    color: COLORS.black,
  },
  mediumFont10: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.body10,
    color: COLORS.black,
  },
  mediumFont12: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.body12,
    color: COLORS.black,
  },
  mediumFont14: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.body14,
    color: COLORS.black,
  },
  mediumFont16: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.body16,
    color: COLORS.black,
  },
  mediumFont18: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.body18,
    color: COLORS.black,
  },
  regularFont10: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: SIZES.body10,
    color: COLORS.black,
  },
  regularFont12: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: SIZES.body12,
    color: COLORS.black,
  },
  regularFont14: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: SIZES.body14,
    color: COLORS.black,
  },
  regularFont16: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: SIZES.body16,
    color: COLORS.black,
  },
  regularFont18: {
    fontFamily: FONTFAMILY.Regular,
    fontSize: SIZES.body18,
    color: COLORS.black,
  },
  lightFont08: {
    fontFamily: FONTFAMILY.Light,
    fontSize: SIZES.body08,
    color: COLORS.black,
  },
  lightFont10: {
    fontFamily: FONTFAMILY.Light,
    fontSize: SIZES.body10,
    color: COLORS.black,
  },
  lightFont12: {
    fontFamily: FONTFAMILY.Light,
    fontSize: SIZES.body12,
    color: COLORS.black,
  },
  lightFont14: {
    fontFamily: FONTFAMILY.Light,
    fontSize: SIZES.body14,
    color: COLORS.black,
  },
  lightFont16: {
    fontFamily: FONTFAMILY.Light,
    fontSize: SIZES.body16,
    color: COLORS.black,
  },
  lightFont18: {
    fontFamily: FONTFAMILY.Light,
    fontSize: SIZES.body18,
    color: COLORS.black,
  },
};

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop:
    //   Platform.OS === 'android'
    //     ? SIZES.twentyFive * 1.2
    //     : getStatusBarHeight(true),
    backgroundColor: COLORS.white,
  },
  splashLogo: {
    width: SIZES.fifteen * 13,
    height: SIZES.fifteen * 13,
    alignSelf: 'center',
  },
  loginView: {
    flex: 1,
    width: '100%',
    marginTop: SIZES.twenty,
    paddingHorizontal: SIZES.twenty,
  },
  lightText: {
    fontFamily: FONTFAMILY.Light,
  },
  mediumText: {
    fontFamily: FONTFAMILY.Medium,
  },
  boldText: {
    fontFamily: FONTFAMILY.Bold,
  },
  headingText: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.twenty + 5,
    color: COLORS.black,
  },
  paragraphText: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.fifteen - 1,
    color: COLORS.black,
  },
  drawerItem: {
    alignItems: 'baseline',
    borderRadius: SIZES.fifteen,
    paddingVertical: SIZES.fifteen,
    paddingHorizontal: SIZES.fifteen,
  },
  drawerIcon: {
    fontSize: SIZES.fifteen + 10,
  },
  drawerText: {
    fontSize: SIZES.fifteen,
    fontFamily: FONTFAMILY.Medium,
    color: COLORS.black,
    marginHorizontal: SIZES.fifteen - 5,
  },
  horLine: {
    height: 0.3,
    marginVertical: SIZES.fifteen,
    backgroundColor: COLORS.brownGrey,
  },
  shadow: {
    elevation: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.0,
    shadowColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
});

export const CONSTANTS = {
  REDUX_ACTIONS: {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SIGNUP: 'SIGNUP',
    ACCESSTOKEN: 'ACCESSTOKEN',
    AUTHENTICATE: 'AUTHENTICATE',
  },

  API_URLS: {
    // BASE_URL: 'http://not-new.reignsol.net/api/v1/',
    // BASE_VENDOR: 'http://not-new.reignsol.net/api/v1/vendor/',
    // IMAGE: 'http://not-new.reignsol.net/',

    BASE_URL: 'http://192.168.18.6:3000/api/v1/',
    BASE_VENDOR: 'http://192.168.18.6:3000/api/v1/vendor/',
    IMAGE_URL: 'http://192.168.18.6:3000/',

    LOGIN: 'login',
    LOGOUT: 'sign-out',
    SIGN_UP: 'register',
    VERIFY_OTP: 'verify-otp',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
    CHANGE_PASSWORD: 'change-password',
    GET_PROFILE: 'get-profile',
    UPDATE_PROFILE: 'update-profile',
    GET_CATEGORIES: 'product/getAllCategories',
    GET_BRANDS: 'product/getAllBrands',
    GET_CONTENT: 'content',
    UPLOAD_PRODUCT: 'product/create',
    UPDATE_PRODUCT: 'product/update',
    GET_ORDERS: 'order/getOrdersByVendor',
    DELETE_ACCOUNT: 'delete-account',
    SAVE_DEVICE_TOKEN: '',
  },

  /* * FirebaseConstants * */
  FIREBASE: {
    CHAT: 'Chat',
    MESSAGES: 'messages',
    USERS: 'Users',
    CHATHEADS: 'ChatHeads',
    READ: 'read',
    TOKEN: 'Tokens',
    FCM: 'https://fcm.googleapis.com/fcm/send',
  },

  DESTINATIONS: {
    SIGN_UP: 'sign_up',
    FORGOT_PASSWORD: 'forgot_password',
  },

  CACHE_KEYS: {
    ACCESS_TOKEN: 'access_token',
    IS_FIRST_TIME: 'is_first_time',
  },
};
