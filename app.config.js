module.exports = {
  expo: {
    name: '캠퍼스하우스',
    slug: 'campus-house-mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/logo.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.jbd.campushouse',
    },
    platforms: ['ios', 'android'],
    plugins: [
      [
        'expo-router',
        {
          root: './app',
        },
      ],
      'expo-font',
      [
        '@mj-studio/react-native-naver-map',
        {
          client_id: process.env.NAVER_MAP_CLIENT_ID,
          android: {
            ACCESS_FINE_LOCATION: true,
            ACCESS_COARSE_LOCATION: true,
          },
          ios: {
            NSLocationWhenInUseUsageDescription:
              '이 앱은 지도를 표시하기 위해 위치 권한이 필요합니다.',
          },
        },
      ],
    ],
    scheme: 'mobile',
    fonts: [
      {
        asset: './assets/fonts/Pretendard-Regular.otf',
        family: 'Pretendard-Regular',
      },
      {
        asset: './assets/fonts/Pretendard-Medium.otf',
        family: 'Pretendard-Medium',
      },
      {
        asset: './assets/fonts/Pretendard-SemiBold.otf',
        family: 'Pretendard-SemiBold',
      },
      {
        asset: './assets/fonts/Pretendard-Bold.otf',
        family: 'Pretendard-Bold',
      },
    ],
    android: {
      package: 'com.jbd.campushouse',
    },
  },
};

