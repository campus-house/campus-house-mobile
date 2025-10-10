import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { COLORS } from '@/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoginButton } from '@/components/Button/LoginButton';

interface PermissionModalProps {
  visible: boolean;
  onNext: () => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ visible, onNext }) => {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  // ---- hybrid spacing: safe-area aware + mild vertical scaling
  const FIGMA = { H: 852, SAFE_TOP: 44, SAFE_BOTTOM: 35 };
  const SCALE = true; // set false to lock exact Figma spacing (no scaling)
  const SCALE_RANGE = { min: 0.9, max: 1.1 };

  const usableH = screenHeight - insets.top - insets.bottom;
  const baseUsableH = FIGMA.H - FIGMA.SAFE_TOP - FIGMA.SAFE_BOTTOM;
  const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
  const SY = clamp(usableH / baseUsableH, SCALE_RANGE.min, SCALE_RANGE.max); // modest scaling only
  const y = (v: number) => (SCALE ? Math.round(v * SY) : Math.round(v));

  // spacing tokens (Figma logic px)
  const TOKENS = {
    PAD_H: 30,
    PAD_INNER_H: 7,        // => visual left/right 37 with PAD_H
    TITLE_LEFT_BUMP: 7,    // title left offset from PAD_H
    TITLE_TOP: 51,         // inside-card top padding (was 47 + 4)
    TITLE_GAP: 37,         // title bottom → list gap base
    FIRST_ITEM_GAP: 49,    // title block → first item title
    ITEM_GAP: 28,          // between list items
    TEXT_TOP: 8,           // text block top nudge
    ICON: 58,
    ICON_GAP: 16,
  } as const;

  // derive runtime spacing
  const PADDING_TOP = y(TOKENS.TITLE_TOP);
  const TITLE_MARGIN_BOTTOM = y(TOKENS.TITLE_GAP);
  const FIRST_ITEM_MARGIN_TOP = Math.max(0, y(TOKENS.FIRST_ITEM_GAP) - TITLE_MARGIN_BOTTOM);
  const ITEM_MARGIN_BOTTOM = y(TOKENS.ITEM_GAP);
  const TEXT_MARGIN_TOP = y(TOKENS.TEXT_TOP);

  const permissions = [
    {
      id: 'location',
      title: '위치',
      description: '(필수) 위치 기반 서비스 이용약관',
      icon: require('@/assets/images/location.png'),
      iconW: 34.703,
      iconH: 39,
    },
    {
      id: 'camera',
      title: '카메라',
      description: '후기 작성, 커뮤니티 이용 시 사진 촬영',
      icon: require('@/assets/images/camera.png'),
      iconW: 35,
      iconH: 28.75,
    },
    {
      id: 'photos',
      title: '사진, 미디어, 파일',
      description: '후기 작성, 커뮤니티 사진의 저장과 관리',
      icon: require('@/assets/images/image file.png'),
      iconW: 33,
      iconH: 33,
    },
    {
      id: 'notifications',
      title: '알림',
      description: '채팅, 양도 알림 등 수신',
      icon: require('@/assets/images/notification.png'),
      iconW: 25.992,
      iconH: 29.982,
    },
  ];
  const FIRST_ITEM_GAP = 49; // Figma: gap between title block and first list item's title ("위치")

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContainer,
            {
              height: Math.max(0, screenHeight - 172),
              paddingBottom: insets.bottom + 18,
              paddingTop: PADDING_TOP, // replaced with PADDING_TOP
            },
          ]}
        >
          {/* 제목 */}
          <Text style={[styles.title, { marginBottom: TITLE_MARGIN_BOTTOM }]} maxFontSizeMultiplier={1.2}>
            서비스 이용을 위한{'\n'}앱 접근 권한을 안내드려요
          </Text>

          {/* 권한 목록 (스크롤 가능) */}
          <ScrollView contentContainerStyle={styles.permissionsList} showsVerticalScrollIndicator={false}>
            {permissions.map((permission, index) => (
              <View
                key={permission.id}
                style={[
                  styles.permissionItem,
                  { marginBottom: ITEM_MARGIN_BOTTOM },
                  index === 0 && { marginTop: FIRST_ITEM_MARGIN_TOP },
                ]}
              >
                <View style={styles.permissionIconContainer}>
                  <Image
                    source={permission.icon}
                    style={[styles.permissionIcon, { width: permission.iconW, height: permission.iconH }]}
                    resizeMode="contain"
                  />
                </View>
                <View style={[styles.permissionTextContainer, { marginTop: TEXT_MARGIN_TOP }]}>
                  <Text style={styles.permissionTitle} maxFontSizeMultiplier={1.2}>
                    {permission.title}
                  </Text>
                  <Text style={styles.permissionDescription} maxFontSizeMultiplier={1.2}>
                    {permission.description}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* 다음 버튼 */}
          <View style={styles.footer}>
            <LoginButton
              title="다음"
              onPress={onNext}
              style={{ width: 310, alignSelf: 'center' }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.neutral.white,
    borderTopLeftRadius: 34.5,
    borderTopRightRadius: 34.5,
    width: '100%',
    height: 680,
    flexShrink: 0,
    paddingHorizontal: 32,
    paddingTop: 47, // overridden by PADDING_TOP
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.01,
    shadowRadius: 1,
    elevation: 1,
  },
  title: {
    fontSize: 25,
    lineHeight: 35,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: COLORS.neutral.black,
    textAlign: 'left',
    marginLeft: 7, // left 30 + 7 = 37
    marginBottom: 37, // overridden by TITLE_MARGIN_BOTTOM
  },
  permissionsList: { paddingBottom: 16 },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 28, // overridden by ITEM_MARGIN_BOTTOM
  },
  permissionIconContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.neutral.grey1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  permissionIcon: {},
  permissionTextContainer: {
    flex: 1,
    marginTop: 8, // overridden by TEXT_MARGIN_TOP
  },
  permissionTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 8,
  },
  permissionDescription: {
    color: '#636363',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
  },
  footer: {
    paddingTop: 0,
  },
});

export default PermissionModal;
