import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from '@/constants/colors';

const { width, height } = Dimensions.get('window');

// 네이버 지도 정보
const NAVER_MAP_STYLE_ID = '9eac035a-d7b0-4823-8fda';

export default function MapScreen() {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 커스텀 스타일이 적용된 네이버 지도 URL
  const naverMapUrl = `https://map.naver.com/p/?c=15.00,0,0,0,dh&lng=127.105399&lat=37.3595704&style=${NAVER_MAP_STYLE_ID}`;

  // 마커 추가를 위한 JavaScript 코드
  const injectedJavaScript = `
    (function() {
      // 마커 표시 함수
      function addCustomMarkers() {
        try {
          // 마커 위치
          const markers = [
            { lat: 37.3595704, lng: 127.105399, text: '1.5천/ 80만원' },
            { lat: 37.3615704, lng: 127.107399, text: '1.5천/ 80만원' }
          ];

          // 마커 HTML 생성
          markers.forEach(marker => {
            const markerDiv = document.createElement('div');
            markerDiv.style.cssText = \`
              position: absolute;
              background: #FF805F;
              color: white;
              padding: 8px 12px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 600;
              white-space: nowrap;
              box-shadow: 0 2px 8px rgba(0,0,0,0.15);
              z-index: 1000;
              pointer-events: auto;
            \`;
            markerDiv.textContent = marker.text;
            
            // 마커를 화면에 추가
            document.body.appendChild(markerDiv);
            
            // 위치 계산 (간단한 예시)
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const offsetX = (marker.lng - 127.105399) * 10000;
            const offsetY = (37.3595704 - marker.lat) * 10000;
            
            markerDiv.style.left = (centerX + offsetX) + 'px';
            markerDiv.style.top = (centerY + offsetY) + 'px';
          });

          // React Native로 완료 알림
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'markersAdded'
            }));
          }
        } catch (error) {
          console.error('마커 추가 에러:', error);
        }
      }

      // 페이지 로드 후 마커 추가
      setTimeout(addCustomMarkers, 2000);
    })();
    true;
  `;

  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message.type === 'markersAdded') {
        // 마커 추가 완료
      }
    } catch {
      // 메시지 파싱 에러
    }
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>지도를 불러오는 중...</Text>
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: naverMapUrl }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scrollEnabled={true}
        bounces={false}
        geolocationEnabled={true}
        originWhitelist={['*']}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage}
        onLoadEnd={handleLoadEnd}
        onError={() => {
          setIsLoading(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  webview: {
    flex: 1,
    width,
    height,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.text.secondary,
    fontFamily: 'Pretendard',
  },
});
