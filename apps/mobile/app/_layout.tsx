import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text } from 'react-native';
import { COLORS } from '../constants/colors';

// 앱 로딩 중 스플래시 화면 유지
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // 폰트 로딩 완료 후 스플래시 화면 숨김
  SplashScreen.hideAsync();
  
  return (
    <>
      <StatusBar style="auto" backgroundColor={COLORS.background.primary} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
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
            shadowOffset: {
              width: -1.5,
              height: -4.5,
            },
            shadowOpacity: 0.03,
            shadowRadius: 4,
            elevation: 5,
          },
          tabBarActiveTintColor: '#636363',
          tabBarInactiveTintColor: '#636363',
          tabBarLabelStyle: {
            fontFamily: 'Pretendard-SemiBold',
            fontSize: 12,
            lineHeight: 22,
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen 
          name="index" 
          options={{ 
            title: '커뮤',
            tabBarIcon: ({ focused, color }) => (
              <CommunityIcon focused={focused} color={color} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="map" 
          options={{ 
            title: '지도',
            tabBarIcon: ({ focused, color }) => (
              <MapIcon focused={focused} color={color} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="scrap" 
          options={{ 
            title: '스크랩',
            tabBarIcon: ({ focused, color }) => (
              <ScrapIcon focused={focused} color={color} />
            ),
          }} 
        />
        <Tabs.Screen 
          name="profile" 
          options={{ 
            title: '마이페이지',
            tabBarIcon: ({ focused, color }) => (
              <ProfileIcon focused={focused} color={color} />
            ),
          }} 
        />
      </Tabs>
    </>
  );
}

// 커뮤니티 아이콘 컴포넌트
function CommunityIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 30.246, height: 25.72, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ 
        fontSize: 24, 
        color: focused ? color : 'transparent',
        fontWeight: focused ? 'bold' : 'normal'
      }}>
        💬
      </Text>
      {focused && (
        <View style={{ flexDirection: 'row', marginTop: 2 }}>
          <Text style={{ fontSize: 8, color: 'white' }}>•••</Text>
        </View>
      )}
    </View>
  );
}

// 지도 아이콘 컴포넌트
function MapIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 27.012, height: 20.624, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ 
        fontSize: 20, 
        color: focused ? color : 'transparent',
        fontWeight: focused ? 'bold' : 'normal'
      }}>
        🗺️
      </Text>
    </View>
  );
}

// 스크랩 아이콘 컴포넌트
function ScrapIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 16.14, height: 23.314, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ 
        fontSize: 18, 
        color: focused ? color : 'transparent',
        fontWeight: focused ? 'bold' : 'normal'
      }}>
        🔖
      </Text>
    </View>
  );
}

// 마이페이지 아이콘 컴포넌트
function ProfileIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 19.653, height: 23.1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ 
        fontSize: 20, 
        color: focused ? color : 'transparent',
        fontWeight: focused ? 'bold' : 'normal'
      }}>
        👤
      </Text>
    </View>
  );
}
