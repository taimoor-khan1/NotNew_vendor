import React, {useState} from 'react';
import {Image, Text, View, StyleSheet, SafeAreaView} from 'react-native';
import moment from 'moment';
import {SwipeListView} from 'react-native-swipe-list-view';
import {COLORS, FONTS, IMAGES, SIZES, STYLES, width} from '../../constants';
import {
  Icon,
  IconType,
  CustomHeader,
  MyTouchableOpacity,
} from '../../components';

export default function Noitification(props) {
  const [notifications, setNotifications] = useState(notificationsList);

  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <MyTouchableOpacity style={styles.backRightBtn}>
        <Icon
          type={IconType.Ionicons}
          name="md-trash-outline"
          style={{
            color: COLORS.white,
            fontSize: SIZES.twentyFive,
          }}
        />
      </MyTouchableOpacity>
    </View>
  );

  const renderNotificationsItem = ({item, index}) => {
    return (
      <MyTouchableOpacity
        key={index}
        onPress={() => {}}
        style={styles.notificationView}>
        <Image source={item.image} style={styles.imgStyle} />

        <View
          style={{
            flex: 1,
            marginHorizontal: SIZES.ten,
          }}>
          {/* <Text
              numberOfLines={1}
              style={[FONTS.regularFont12, {color: COLORS.black}]}>
              {item.sender_name}
            </Text> */}

          {item.content && (
            <Text
              numberOfLines={2}
              style={[FONTS.mediumFont12, {color: COLORS.gray}]}>
              {item.content}
            </Text>
          )}

          <Text
            style={[
              FONTS.lightFont10,
              {
                color: COLORS.gray,
              },
            ]}>
            {moment(item.time).fromNow()}
          </Text>
        </View>
      </MyTouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="Notifications" />

      <View style={styles.container}>
        <SwipeListView
          stopLeftSwipe={0.5}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          data={notifications}
          renderItem={renderNotificationsItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-width * 0.215}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1, paddingBottom: SIZES.twentyFive}}
          ListEmptyComponent={() => (
            <View style={styles.listEmptyView}>
              <Text style={[FONTS.mediumFont16, {color: COLORS.primary}]}>
                No notifications found.
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.fifteen,
  },
  rowBack: {
    flex: 1,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  backRightBtn: {
    top: 0,
    right: 0,
    bottom: 0,
    marginTop: SIZES.five,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.twentyFive * 2,
    borderTopLeftRadius: SIZES.ten,
    borderBottomLeftRadius: SIZES.ten,
    backgroundColor: COLORS.primary,
  },
  listEmptyView: {
    flex: 1,
    alignItems: 'center',
    marginTop: SIZES.fifteen,
  },
  notificationView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.five,
    paddingVertical: SIZES.ten,
    backgroundColor: COLORS.white,
  },
  imgStyle: {
    height: SIZES.twenty * 2.5,
    width: SIZES.twenty * 2.5,
    borderRadius: SIZES.ten,
  },
});

const notificationsList = [
  {
    image: IMAGES.profilePic,
    content: 'You will get your order in two days',
    time: new Date(),
  },
  {
    image: IMAGES.profilePic,
    content: 'You will get your order in two days',
    time: new Date(),
  },
  {
    image: IMAGES.profilePic,
    content: 'You will get your order in two days',
    time: new Date(),
  },
  {
    image: IMAGES.profilePic,
    content: 'You will get your order in two days',
    time: new Date(),
  },
  {
    image: IMAGES.profilePic,
    content: 'You will get your order in two days',
    time: new Date(),
  },
  {
    image: IMAGES.profilePic,
    content: 'You will get your order in two days',
    time: new Date(),
  },
];
