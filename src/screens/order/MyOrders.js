import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {TabView, SceneMap} from 'react-native-tab-view';
import {
  CustomHeader,
  ListEmptyComponent,
  MyTouchableOpacity,
  ScrollTabBar,
} from '../../components';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  IMAGES,
  SIZES,
  STYLES,
  width,
} from '../../constants';

export default function MyOrders(props) {
  const {orders} = useSelector(state => state.content);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'AllOrders', title: 'All Orders'},
    {key: 'Pending', title: 'Pending'},
    {key: 'Shipped', title: 'Shipped'},
    {key: 'Delivered', title: 'Delivered'},
    {key: 'Cancelled', title: 'Cancelled'},
  ]);

  const renderScene = SceneMap({
    AllOrders: () => <RenderOrders status="all" />,
    Pending: () => <RenderOrders status="pending" />,
    Shipped: () => <RenderOrders status="shipped" />,
    Delivered: () => <RenderOrders status="delivered" />,
    Cancelled: () => <RenderOrders status="cancelled" />,
  });

  const RenderOrders = ({status}) =>
    (status === 'all'
      ? orders
      : orders.filter(i => i.order_status === status)
    ).map((item, index) => (
      <MyTouchableOpacity key={index} style={styles.orderItemView}>
        <View style={styles.flexRow}>
          <Image
            source={{
              uri: CONSTANTS.API_URLS.IMAGE_URL + item.products[0]?.image[0],
            }}
            style={styles.orderImgStyle}
          />

          <View style={styles.orderContentView}>
            <Text style={[FONTS.boldFont16, {textTransform: 'capitalize'}]}>
              {item.products[0]?.name}
            </Text>
            <View style={[{marginTop: SIZES.five}]}>
              <Text style={[FONTS.mediumFont10, {color: COLORS.gray}]}>
                #{item._id}
              </Text>
              {/* <View style={styles.dotStyle} /> */}
              <Text style={[FONTS.mediumFont10, {color: COLORS.gray}]}>
                {moment(item.created_at).fromNow()}
              </Text>
            </View>
          </View>

          <Text style={[FONTS.mediumFont14, {color: COLORS.primary}]}>
            ${item.grand_total}
          </Text>
        </View>

        {renderStatus(item.order_status)}
      </MyTouchableOpacity>
    ));

  const renderStatus = order_status => {
    switch (order_status) {
      case 'pending':
        return (
          <View style={styles.pendingStatusView}>
            <Text
              style={[
                FONTS.mediumFont10,
                {color: COLORS.red, textTransform: 'capitalize'},
              ]}>
              {order_status}
            </Text>
          </View>
        );
        break;
      case 'shipped':
        return (
          <View style={styles.shippedStatusView}>
            <Text
              style={[
                FONTS.mediumFont10,
                {color: COLORS.yellow, textTransform: 'capitalize'},
              ]}>
              {order_status}
            </Text>
          </View>
        );
        break;
      case 'delivered':
        return (
          <View style={styles.deliveredStatusView}>
            <Text
              style={[
                FONTS.mediumFont10,
                {color: COLORS.green, textTransform: 'capitalize'},
              ]}>
              {order_status}
            </Text>
          </View>
        );
        break;

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="My Orders" />

      {orders.length ? (
        <TabView
          renderTabBar={ScrollTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{width: width}}
          initialLayout={{width: layout.width}}
          sceneContainerStyle={styles.container}
        />
      ) : (
        <ListEmptyComponent text={['No orders yet!']} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: SIZES.twentyFive,
    paddingHorizontal: SIZES.fifteen,
  },
  orderItemView: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.fifteen,
    paddingVertical: SIZES.twenty,
    paddingHorizontal: SIZES.fifteen,
    marginBottom: SIZES.twenty,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderImgStyle: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    borderRadius: SIZES.ten,
  },
  orderContentView: {
    flex: 1,
    marginLeft: SIZES.ten,
  },
  dotStyle: {
    height: SIZES.five,
    width: SIZES.five,
    borderRadius: SIZES.five,
    backgroundColor: COLORS.gray,
    marginHorizontal: SIZES.ten,
  },
  pendingStatusView: {
    borderWidth: 1,
    borderColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.five,
    height: SIZES.twentyFive * 1.5,
    backgroundColor: COLORS.lightRed,
    alignSelf: 'flex-start',
    paddingHorizontal: SIZES.fifteen,
    marginTop: SIZES.twenty,
  },
  shippedStatusView: {
    borderWidth: 1,
    borderColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.five,
    height: SIZES.twentyFive * 1.5,
    backgroundColor: COLORS.lightYellow,
    alignSelf: 'flex-start',
    paddingHorizontal: SIZES.fifteen,
    marginTop: SIZES.twenty,
  },
  deliveredStatusView: {
    borderWidth: 1,
    borderColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.five,
    height: SIZES.twentyFive * 1.5,
    backgroundColor: COLORS.lightGreen + 80,
    alignSelf: 'flex-start',
    paddingHorizontal: SIZES.fifteen,
    marginTop: SIZES.twenty,
  },
});

const orderList = [
  {
    id: 'A2NG91234567',
    image: IMAGES.menTshirt,
    name: 'Men T-shirt',
    time: '2 min',
    price: 59.1,
    status: 'pending',
  },
  {
    id: 'A2NG91234567',
    image: IMAGES.printedTshirt,
    name: 'Printed T-shirt',
    time: '4 min',
    price: 59.1,
    status: 'shipped',
  },
  {
    id: 'A2NG91234567',
    image: IMAGES.watches,
    name: 'Men Watch',
    time: '6 min',
    price: 59.1,
    status: 'delivered',
  },
];
