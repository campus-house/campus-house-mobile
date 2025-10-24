import { Tabs, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { COLORS } from '@/constants/colors';
import { TAB_BAR_STYLE } from '@/constants/navigation';
import CommunityIcon from '@/components/navigator/CommunityIcon';
import MapIcon from '@/components/navigator/MapIcon';
import ScrapIcon from '@/components/navigator/ScrapIcon';
import ProfileIcon from '@/components/navigator/ProfileIcon';
import { Host } from 'react-native-portalize';

export default function MainLayout() {
  const router = useRouter();
  
  // main 진입 시 자동으로 지도 화면으로 분기
  useEffect(() => {
    router.replace('/main/map/');
  }, []);
  
  // baseTabBarStyle은 이제 constants/navigation.ts에서 import
  return (
    <>
      <StatusBar style="auto" backgroundColor={COLORS.background.primary} />
      <Host>
        <View style={styles.container}>
          <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: TAB_BAR_STYLE,
            tabBarActiveTintColor: '#FF805F',
            tabBarInactiveTintColor: '#636363',
            tabBarItemStyle: {
              flex: 1,
            },
            tabBarIconStyle: {
              marginTop: 14,
            },
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
          initialRouteName="map/index"
        >
          {/* 지도 탭 */}
          <Tabs.Screen
            name="map/index"
            options={{
              title: '집찾기',
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

          {/* 커뮤니티 탭 */}
          <Tabs.Screen
            name="community"
            options={{
              title: '이웃소식',
              tabBarIcon: ({ focused, color }) => <CommunityIcon focused={focused} color={color} />,
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

          {/* 실거주자 후기 화면 숨기기 */}
          <Tabs.Screen
            name="resident-review"
            options={{
              href: null, // 하단바에서 숨김
            }}
          />
          
          {/* map 폴더 내부 화면들 숨기기 */}
          <Tabs.Screen
            name="map/review-detail"
            options={{
              href: null, // 하단바에서 숨김
            }}
          />
          <Tabs.Screen
            name="map/question-write"
            options={{
              href: null, // 하단바에서 숨김
            }}
          />
        </Tabs>
        </View>
      </Host>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
