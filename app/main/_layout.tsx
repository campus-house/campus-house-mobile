import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS } from '@/constants/colors';

export default function MainLayout() {
  const baseTabBarStyle = {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: 76,
    width: 393,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: -1.5, height: -4.5 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 5,
  };
  return (
    <>
      <StatusBar style="auto" backgroundColor={COLORS.background.primary} />
      <View style={styles.container}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: baseTabBarStyle,
            tabBarActiveTintColor: '#FF805F',
            tabBarInactiveTintColor: '#636363',
            tabBarLabelStyle: {
              fontFamily: 'Pretendard',
              fontSize: 12,
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: 22,
              textAlign: 'center',
              marginTop: 4,
            },
          }}
        >
          {/* 커뮤니티 탭 */}
          <Tabs.Screen
            name="community"
            options={{
              title: '커뮤',
              tabBarIcon: ({ focused, color }) => <CommunityIcon focused={focused} color={color} />,
            }}
          />

          {/* 지도 탭 */}
          <Tabs.Screen
            name="map/index"
            options={{
              title: '지도',
              tabBarIcon: ({ focused, color }) => <MapIcon focused={focused} color={color} />,
            }}
          />

          {/* 스크랩 탭 */}
          <Tabs.Screen
            name="scrap/index"
            options={{
              title: '스크랩',
              tabBarIcon: ({ focused, color }) => <ScrapIcon focused={focused} color={color} />,
            }}
          />

          {/* 마이페이지 탭 */}
          <Tabs.Screen
            name="mypage"
            options={{
              title: '마이페이지',
              tabBarIcon: ({ focused, color }) => <ProfileIcon focused={focused} color={color} />,
            }}
          />

          {/* questions 탭 숨기기 */}
          <Tabs.Screen
            name="questions"
            options={{
              href: null, // 이 탭을 하단바에서 숨김
            }}
          />

          {/* MapScreen 파일 숨기기 */}
          <Tabs.Screen
            name="map/MapScreen"
            options={{
              href: null, // MapScreen을 하단바에서 숨김
            }}
          />

          {/* ScrapScreen 파일 숨기기 */}
          <Tabs.Screen
            name="scrap/ScrapScreen"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </View>
    </>
  );
}

// 아이콘 컴포넌트들
function CommunityIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 30.245, height: 25.72, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="31" height="26" viewBox="0 0 31 26" fill="none">
        <Path
          d="M24.9873 0C28.2062 0 30.8163 2.60931 30.8164 5.82812V14.7383C30.8164 17.9572 28.2062 20.5674 24.9873 20.5674H19.1855L16.4697 25.2715C16.1245 25.8688 15.2621 25.8689 14.917 25.2715L12.2012 20.5674H6.39844C3.17963 20.5672 0.570312 17.9571 0.570312 14.7383V5.82812C0.570464 2.60941 3.17972 0.000152403 6.39844 0H24.9873Z"
          fill={focused ? color : '#636363'}
        />
      </Svg>
      <View style={{ position: 'absolute', top: 8, left: 0, right: 0, alignItems: 'center' }}>
        <Svg width="20" height="6" viewBox="0 0 20 6" fill="none">
          <Circle cx="3" cy="3" r="2" fill="white" />
          <Circle cx="10" cy="3" r="2" fill="white" />
          <Circle cx="17" cy="3" r="2" fill="white" />
        </Svg>
      </View>
    </View>
  );
}

function MapIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 27.012, height: 20.624, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="28" height="22" viewBox="0 0 28 22" fill="none">
        <Path
          d="M18.5038 2.48242L25.3397 1.11523C26.4447 0.894296 27.4768 1.73551 27.4843 2.8623L27.5819 17.6572C27.5873 18.4866 27.0229 19.2115 26.2177 19.4102L18.5038 21.3135L9.53796 19.5195L2.71472 20.8838C1.60525 21.1054 0.570366 20.2574 0.57019 19.126V3.98047C0.57019 3.12793 1.17035 2.39273 2.00574 2.22266L9.53699 0.689453H9.54089L18.5038 2.48242ZM10.4335 18.0518L18.2343 19.6123V4.07422L18.1874 4.06543L10.4335 2.51367V18.0518ZM25.6561 2.69824L19.4003 3.94922V19.4287L25.8309 17.8428C25.9119 17.8228 25.9681 17.7502 25.9677 17.668L25.87 2.87305C25.8692 2.75947 25.7657 2.67633 25.6561 2.69824ZM2.328 3.80469C2.24506 3.82157 2.18445 3.89461 2.18445 3.98047V19.126C2.18462 19.2384 2.287 19.3229 2.39832 19.3008L9.22156 17.9365L9.26746 17.9268V2.3916L2.328 3.80469Z"
          fill={focused ? color : '#636363'}
        />
      </Svg>
    </View>
  );
}

function ScrapIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 18, height: 23, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="21" height="24" viewBox="0 0 21 24" fill="none">
        <Path
          d="M17.5703 1H3.57237C2.46699 1 1.57123 1.89668 1.57237 3.00205L1.59098 21.1445C1.59241 22.5324 2.97259 23.497 4.27649 23.0213L9.87439 20.9788C10.316 20.8177 10.8003 20.8173 11.2422 20.9777L16.888 23.0266C18.1922 23.4999 19.5703 22.5339 19.5703 21.1466V3C19.5703 1.89543 18.6749 1 17.5703 1Z"
          stroke={focused ? color : '#636363'}
          strokeWidth="1.61402"
        />
      </Svg>
    </View>
  );
}

function ProfileIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 19.653, height: 23.1, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="22" height="25" viewBox="0 0 22 25" fill="none">
        <Circle
          cx="11.327"
          cy="5.72138"
          r="4.8249"
          stroke={focused ? color : '#636363'}
          strokeWidth="1.61402"
        />
        <Path
          d="M1.53357 19.5129C1.53357 16.5415 3.94231 14.1328 6.91364 14.1328H15.8069C18.7782 14.1328 21.1869 16.5416 21.1869 19.5129V22.2029C21.1869 23.1934 20.384 23.9963 19.3936 23.9963H3.32692C2.33648 23.9963 1.53357 23.1934 1.53357 22.2029V19.5129Z"
          stroke={focused ? color : '#636363'}
          strokeWidth="1.61402"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
