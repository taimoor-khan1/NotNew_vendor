import React from 'react';
import {Text} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import {COLORS, FONTFAMILY, FONTS, SIZES} from '../constants';

export default function ScrollTabBar(props) {
  return (
    <TabBar
      {...props}
      pressOpacity={0.85}
      scrollEnabled={true}
      labelStyle={FONTS.mediumFont14}
      pressColor={COLORS.primary}
      activeColor={COLORS.primary}
      inactiveColor={COLORS.brownGray}
      style={{backgroundColor: COLORS.white}}
      tabStyle={{width: 'auto', paddingHorizontal: SIZES.twentyFive}}
      indicatorStyle={{backgroundColor: COLORS.primary}}
      renderLabel={({route, focused, color}) => (
        <Text
          numberOfLines={1}
          style={[
            {
              fontSize: SIZES.body12,
              textTransform: 'capitalize',
              fontFamily: FONTFAMILY.Medium,
              color: focused ? COLORS.primary : COLORS.gray,
            },
          ]}>
          {route.title}
        </Text>
      )}
    />
  );
}
