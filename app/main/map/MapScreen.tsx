import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import {
  NaverMapView,
  NaverMapMarkerOverlay,
  type Camera,
  type NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import { COLORS } from '@/constants/colors';

const { width, height } = Dimensions.get('window');

// 마커 데이터
const MARKERS = [
  { id: '1', lat: 37.245412, lng: 127.080604, text: '1.5천/ 80만원' },
  { id: '2', lat: 37.2458, lng: 127.0812, text: '1.5천/ 85만원' },
  { id: '3', lat: 37.245, lng: 127.08, text: '1.5천/ 75만원' },
  { id: '4', lat: 37.246, lng: 127.081, text: '1.5천/ 90만원' },
];

export default function MapScreen() {
  const mapRef = useRef<NaverMapViewRef>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleMapReady = () => {
    setIsLoading(false);
  };

  const handleMarkerClick = (markerId: string) => {
    console.log('마커 클릭:', markerId);
    // TODO: 마커 클릭 시 상세 정보 표시
  };

  const initialCamera: Camera = {
    latitude: 37.245412,
    longitude: 127.080604,
    zoom: 17,
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>지도를 불러오는 중...</Text>
        </View>
      )}
      <NaverMapView
        ref={mapRef}
        style={styles.map}
        initialCamera={initialCamera}
        onCameraChanged={(args: any) => {
          console.log('카메라 변경:', args);
        }}
        onInitialized={handleMapReady}
        isShowLocationButton={false}
        isShowScaleBar={false}
        isShowCompass={false}
        isShowZoomControls={false}
      >
        {MARKERS.map((marker) => (
          <NaverMapMarkerOverlay
            key={marker.id}
            latitude={marker.lat}
            longitude={marker.lng}
            onTap={() => handleMarkerClick(marker.id)}
            width={120}
            height={40}
            anchor={{ x: 0.5, y: 0.5 }}
            caption={{
              text: marker.text,
              textSize: 14,
              color: 'white',
            }}
            isHideCollidedCaptions={false}
            isHideCollidedMarkers={false}
            tintColor={COLORS.primary}
          />
        ))}
      </NaverMapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  map: {
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
