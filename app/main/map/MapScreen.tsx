import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from '@/constants/colors';

const { width, height } = Dimensions.get('window');

// 네이버 지도 정보
const NAVER_MAP_STYLE_ID = '922c3502-bc54-427b-a1fa-f99887a68a64';

export default function MapScreen() {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 커스텀 스타일이 적용된 네이버 지도 URL (새로운 위치, 확대)
  const naverMapUrl = `https://map.naver.com/p/?c=17.00,0,0,0,dh&lng=127.080604&lat=37.245412&style=${NAVER_MAP_STYLE_ID}&menu=off&search=off&traffic=off&mpx=off&layer=off&satellite=off&hybrid=off`;

  // UI 요소 숨기기 및 마커 추가를 위한 JavaScript 코드
  const injectedJavaScript = `
    (function() {
      // 네이버 지도 UI 요소 완전 제거 및 네이티브 앱처럼 만들기
      function hideNaverMapUI() {
        try {
          // 모든 웹 UI 요소 숨기기 (건물 정보 팝업, 스플래시 화면 포함)
          const elementsToHide = [
            '.NMapHeader',
            '.NMapSearchBar', 
            '.NMapSidebar',
            '.NMapMenu',
            '.NMapLogo',
            '.NMapTrafficButton',
            '.NMapSearchButton',
            '.NMapLayerButton',
            '.NMapCurrentLocationButton',
            '.NMapZoomButton',
            '.NMapCompassButton',
            '.NMapScaleBar',
            '.NMapCopyright',
            '.NMapFooter',
            '.NMapInfoWindow',
            '.NMapTooltip',
            // 건물 정보 팝업 관련 요소들
            '.NMapPlaceInfoWindow',
            '.NMapPlaceTooltip',
            '.NMapPlaceDetailInfo',
            '.NMapBuildingInfo',
            '.NMapPOIInfo',
            '.NMapInfoWindowContent',
            '.NMapPlaceInfo',
            '.NMapMarkerInfo',
            '.NMapPopup',
            '.NMapModal',
            '.NMapOverlay',
            // 스플래시/로딩 화면 관련
            '.NMapLoading',
            '.NMapSplash',
            '.NMapWelcome',
            '.NMapInitialScreen',
            '.NMapAccessWindow',
            '.NMapIntro',
            '.NMapStartup',
            // 현재 위치/위성 관련 UI
            '.NMapLocationButton',
            '.NMapSatelliteButton',
            '.NMapLayerToggle',
            '.NMapMapTypeButton',
            '.NMapViewModeButton',
            '.NMap3DButton',
            '.NMapTerrainButton',
            '.NMapTrafficLayerButton',
            // 건물 이름/라벨 관련
            '.NMapPlaceLabel',
            '.NMapBuildingLabel',
            '.NMapPOILabel',
            '.NMapTextLabel',
            '.NMapNameLabel',
            // 추가 웹 요소들
            'header',
            'nav',
            '.header',
            '.navigation',
            '.search-bar',
            '.menu-bar',
            '.toolbar',
            '.footer',
            '.sidebar',
            // 모달, 팝업, 오버레이 관련
            '.modal',
            '.popup',
            '.overlay',
            '.dialog',
            '.tooltip',
            '.info-window',
            '.place-info',
            '.building-info',
            // 네이버 지도 특정 요소들
            '[class*="NMap"]',
            '[id*="NMap"]',
            '.naver-map-ui',
            '.map-ui',
            '.location-info',
            '.place-detail',
            '.building-detail'
          ];
          
          elementsToHide.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
              if (el) {
                el.style.display = 'none !important';
                el.style.visibility = 'hidden !important';
                el.style.opacity = '0 !important';
                el.style.pointerEvents = 'none !important';
                el.remove(); // DOM에서 완전 제거
              }
            });
          });
          
          // 메인 지도 영역을 전체 화면으로 확장
          const mapContainer = document.querySelector('.NMapContainer') || 
                              document.querySelector('.map') ||
                              document.querySelector('main') ||
                              document.body;
          
          if (mapContainer) {
            mapContainer.style.position = 'absolute';
            mapContainer.style.top = '0';
            mapContainer.style.left = '0';
            mapContainer.style.width = '100vw';
            mapContainer.style.height = '100vh';
            mapContainer.style.margin = '0';
            mapContainer.style.padding = '0';
            mapContainer.style.border = 'none';
            mapContainer.style.overflow = 'hidden';
          }
          
          // body 스타일 조정
          document.body.style.margin = '0';
          document.body.style.padding = '0';
          document.body.style.overflow = 'hidden';
          document.body.style.webkitUserSelect = 'none';
          document.body.style.userSelect = 'none';
          document.body.style.webkitTouchCallout = 'none';
          
          // 웹 브라우저 느낌 제거
          document.documentElement.style.overflow = 'hidden';
          
          // 선택 불가능하게 만들기 (네이티브 앱처럼)
          const style = document.createElement('style');
          style.innerHTML = \`
            * {
              -webkit-user-select: none !important;
              -moz-user-select: none !important;
              -ms-user-select: none !important;
              user-select: none !important;
              -webkit-touch-callout: none !important;
              -webkit-tap-highlight-color: transparent !important;
            }
            
            input, textarea {
              -webkit-user-select: text !important;
              -moz-user-select: text !important;
              -ms-user-select: text !important;
              user-select: text !important;
            }
            
            /* 스크롤바 숨기기 */
            ::-webkit-scrollbar {
              display: none !important;
            }
            
            /* 웹 브라우저 UI 요소 숨기기 */
            .browser-ui, .web-ui, .chrome-ui {
              display: none !important;
            }
            
            /* 건물 정보 팝업 완전 차단 */
            .NMapPlaceInfoWindow,
            .NMapPlaceTooltip,
            .NMapPlaceDetailInfo,
            .NMapBuildingInfo,
            .NMapPOIInfo,
            .NMapInfoWindowContent,
            .NMapPlaceInfo,
            .NMapMarkerInfo,
            .NMapPopup,
            .NMapModal,
            .NMapOverlay,
            .NMapPlaceLabel,
            .NMapBuildingLabel,
            .NMapPOILabel,
            .NMapTextLabel,
            .NMapNameLabel {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
            
            /* 스플래시/로딩 화면 완전 차단 */
            .NMapLoading,
            .NMapSplash,
            .NMapWelcome,
            .NMapInitialScreen,
            .NMapAccessWindow,
            .NMapIntro,
            .NMapStartup {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
            
            /* 현재 위치/위성 관련 UI 완전 차단 */
            .NMapLocationButton,
            .NMapSatelliteButton,
            .NMapLayerToggle,
            .NMapMapTypeButton,
            .NMapViewModeButton,
            .NMap3DButton,
            .NMapTerrainButton,
            .NMapTrafficLayerButton {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
            
            /* 모든 모달, 팝업, 오버레이 차단 */
            .modal,
            .popup,
            .overlay,
            .dialog,
            .tooltip,
            .info-window,
            .place-info,
            .building-info,
            .location-info,
            .place-detail,
            .building-detail {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
            
            /* 네이버 지도 모든 UI 요소 차단 */
            [class*="NMap"],
            [id*="NMap"],
            .naver-map-ui,
            .map-ui {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
            
            /* 건물 클릭 이벤트 완전 차단 */
            div[onclick*="place"],
            div[onclick*="building"],
            div[onclick*="poi"],
            div[onclick*="marker"] {
              pointer-events: none !important;
            }
            
            /* 텍스트 선택 및 하이라이트 차단 */
            div[style*="cursor: pointer"] {
              cursor: default !important;
              pointer-events: none !important;
            }
          \`;
          document.head.appendChild(style);
          
        } catch (e) {
          console.log('UI 숨기기 오류:', e);
        }
      }
      
      // 페이지 로드 후 UI 숨기기
      if (document.readyState === 'complete') {
        hideNaverMapUI();
      } else {
        window.addEventListener('load', hideNaverMapUI);
      }
      
      // 지속적으로 UI 모니터링 및 숨기기 (네이버 지도가 동적으로 UI를 다시 추가할 수 있음)
      setInterval(hideNaverMapUI, 1000);
      
      // DOM 변경 감지하여 UI 요소가 다시 나타나면 즉시 숨기기
      const observer = new MutationObserver(hideNaverMapUI);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
      
      // 마커 표시 함수
      function addCustomMarkers() {
        try {
          // 마커 위치 (새로운 위치 주변)
          const markers = [
            { lat: 37.245412, lng: 127.080604, text: '1.5천/ 80만원' }, // 중심 위치
            { lat: 37.2458, lng: 127.0812, text: '1.5천/ 85만원' },     // 근처
            { lat: 37.2450, lng: 127.0800, text: '1.5천/ 75만원' },     // 근처
            { lat: 37.2460, lng: 127.0810, text: '1.5천/ 90만원' }      // 근처
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
            
            // 위치 계산 (새로운 중심 좌표 기준)
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const offsetX = (marker.lng - 127.080604) * 80000; // 새로운 중심 경도 기준
            const offsetY = (37.245412 - marker.lat) * 80000;  // 새로운 중심 위도 기준
            
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
    // 로딩 완료 후 약간의 지연을 두어 UI 숨기기가 완료되도록 함
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleLoadStart = () => {
    // 로딩 시작 시 즉시 로딩 화면 표시
    setIsLoading(true);
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
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={() => {
          setIsLoading(false);
        }}
        // WebView 느낌 완전 제거 옵션들
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        decelerationRate="normal"
        directionalLockEnabled={true}
        hideKeyboardAccessoryView={true}
        keyboardDisplayRequiresUserAction={false}
        // 미디어 관련 속성 제거 (초기 렌더링 후 변경 불가)
        allowsBackForwardNavigationGestures={false}
        allowsLinkPreview={false}
        cacheEnabled={true}
        cacheMode="LOAD_CACHE_ELSE_NETWORK"
        mixedContentMode="compatibility"
        thirdPartyCookiesEnabled={false}
        sharedCookiesEnabled={false}
        textZoom={100}
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
        // 터치 인터랙션 개선
        startInLoadingState={false}
        // 네이버 지도 스플래시 화면 방지를 위한 추가 옵션
        onNavigationStateChange={(navState) => {
          // 네비게이션 상태 변경 시 로딩 상태 관리
          if (navState.loading) {
            setIsLoading(true);
          }
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
