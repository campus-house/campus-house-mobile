import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { COLORS } from '@/constants/colors';

export default function MainLayout() {
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
          name="profile"
          options={{
            title: '마이페이지',
            tabBarIcon: ({ focused, color }) => <ProfileIcon focused={focused} color={color} />,
          }}
        />
        <Tabs.Screen
          name="scrap"
          options={{
            title: '스크랩',
            tabBarIcon: ({ focused, color }) => <ScrapIcon focused={focused} color={color} />,
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: '지도',
            tabBarIcon: ({ focused, color }) => <MapIcon focused={focused} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

// 아이콘 컴포넌트들
function ProfileIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 19.653, height: 23.1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{
          fontSize: 20,
          color: focused ? color : 'transparent',
          fontWeight: focused ? 'bold' : 'normal',
        }}
      >
        👤
      </Text>
    </View>
  );
}

function ScrapIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 16.14, height: 23.314, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{
          fontSize: 18,
          color: focused ? color : 'transparent',
          fontWeight: focused ? 'bold' : 'normal',
        }}
      >
        🔖
      </Text>
    </View>
  );
}

function MapIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ width: 27.012, height: 20.624, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{
          fontSize: 20,
          color: focused ? color : 'transparent',
          fontWeight: focused ? 'bold' : 'normal',
        }}
      >
        🗺️
      </Text>
    </View>
  );
}
