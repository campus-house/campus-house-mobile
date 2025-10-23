import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated, PanResponder } from 'react-native';
import { COLORS } from '@/constants/colors';
import Svg, { Path, Circle, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';
import { Portal } from 'react-native-portalize';

const { height: screenHeight } = Dimensions.get('window');

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function FilterModal({ isVisible, onClose }: FilterModalProps) {
  const [depositRange, setDepositRange] = useState({ min: 0, max: 30000000 });
  const [rentRange, setRentRange] = useState({ min: 0, max: 1000000 });
  const [jeonseRange, setJeonseRange] = useState({ min: 0, max: 500000000 });
  
  // 추가옵션 상태 (중복선택 가능)
  const [parkingOptions, setParkingOptions] = useState<string[]>([]);
  const [schoolAccessOptions, setSchoolAccessOptions] = useState<string[]>([]);
  const [elevatorOptions, setElevatorOptions] = useState<string[]>([]);

  // 초기값 저장 (초기화용)
  const initialDepositRange = { min: 0, max: 30000000 };
  const initialRentRange = { min: 0, max: 1000000 };
  const initialJeonseRange = { min: 0, max: 500000000 };
  const initialParkingOptions: string[] = [];
  const initialSchoolAccessOptions: string[] = [];
  const initialElevatorOptions: string[] = [];

  const formatCurrency = (amount: number, isMaxValue: boolean = false, maxAmount?: number) => {
    const isAtMax = isMaxValue && maxAmount !== undefined && amount >= maxAmount;
    const suffix = isAtMax ? ' 이상' : '';
    
    if (amount >= 100000000) {
      return `${Math.floor(amount / 100000000)}억원${suffix}`;
    } else if (amount >= 10000) {
      return `${Math.floor(amount / 10000)}만원${suffix}`;
    } else if (amount >= 1000) {
      return `${Math.floor(amount / 1000)}천원${suffix}`;
    } else {
      return `${amount}원${suffix}`;
    }
  };

  // 중복선택 토글 함수들
  const toggleParkingOption = (option: string) => {
    setParkingOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const toggleSchoolAccessOption = (option: string) => {
    setSchoolAccessOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const toggleElevatorOption = (option: string) => {
    setElevatorOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  // 초기화 함수
  const handleReset = () => {
    setDepositRange(initialDepositRange);
    setRentRange(initialRentRange);
    setJeonseRange(initialJeonseRange);
    setParkingOptions(initialParkingOptions);
    setSchoolAccessOptions(initialSchoolAccessOptions);
    setElevatorOptions(initialElevatorOptions);
  };

  // 완료 함수
  const handleComplete = () => {
    // 필터 데이터 저장
    const filterData = {
      depositRange,
      rentRange,
      jeonseRange,
      parkingOptions,
      schoolAccessOptions,
      elevatorOptions,
    };
    console.log('필터 저장:', filterData);
    
    // 모달 닫기
    onClose();
  };

  if (!isVisible) return null;

  return (
    <Portal>
      <View style={styles.container}>
        {/* 배경 오버레이 */}
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1}
          onPress={onClose}
        />
        
        {/* 필터 모달 */}
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* 모달 헤더 */}
            <View style={styles.modalHeader}>
              <View style={styles.filterTitleContainer}>
                <Text style={styles.filterTitle}>필터</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <Path 
                    d="M1 16.0184L16.2275 1" 
                    stroke="#636363" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <Path 
                    d="M16.2275 16.0186L0.999999 1.00012" 
                    stroke="#636363" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
            
            {/* 필터 내용 */}
            <View style={styles.filterContent}>
              {/* 보증금 슬라이더 */}
              <View style={styles.sliderSection}>
                <Text style={styles.sliderTitle}>보증금</Text>
                <View style={styles.sliderSpacing} />
                <RangeSlider
                  min={0}
                  max={30000000}
                  step={1000000}
                  value={depositRange}
                  onValueChange={setDepositRange}
                  formatValue={formatCurrency}
                />
              </View>

              {/* 월세 슬라이더 */}
              <View style={styles.sliderSection}>
                <Text style={styles.sliderTitle}>월세</Text>
                <View style={styles.sliderSpacing} />
                <RangeSlider
                  min={0}
                  max={1000000}
                  step={50000}
                  value={rentRange}
                  onValueChange={setRentRange}
                  formatValue={formatCurrency}
                />
              </View>

              {/* 구분선 */}
              <View style={styles.divider} />

              {/* 전세 슬라이더 */}
              <View style={styles.sliderSection}>
                <Text style={styles.sliderTitle}>전세</Text>
                <View style={styles.sliderSpacing} />
                <RangeSlider
                  min={0}
                  max={1000000000}
                  step={10000000}
                  value={jeonseRange}
                  onValueChange={setJeonseRange}
                  formatValue={formatCurrency}
                />
              </View>

              {/* 구분선 */}
              <View style={styles.divider} />

              {/* 추가옵션 섹션 */}
              <View style={styles.additionalOptionsSection}>
                <Text style={styles.additionalOptionsTitle}>추가옵션</Text>
                
                {/* 주차장 옵션 */}
                <View style={styles.optionGroup}>
                  <Text style={styles.optionGroupTitle}>주차장</Text>
                  <View style={styles.optionButtons}>
                    <TouchableOpacity 
                      style={[
                        styles.optionButton, 
                        parkingOptions.includes('needed') && styles.optionButtonSelected
                      ]}
                      onPress={() => toggleParkingOption('needed')}
                    >
                      <Text style={[
                        styles.optionButtonText,
                        parkingOptions.includes('needed') && styles.optionButtonTextSelected
                      ]}>
                        필요해요
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.optionButton, 
                        parkingOptions.includes('not_needed') && styles.optionButtonSelected
                      ]}
                      onPress={() => toggleParkingOption('not_needed')}
                    >
                      <Text style={[
                        styles.optionButtonText,
                        parkingOptions.includes('not_needed') && styles.optionButtonTextSelected
                      ]}>
                        필요 없어요
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* 학교 접근성 옵션 */}
                <View style={styles.optionGroup}>
                  <Text style={styles.optionGroupTitle}>학교 접근성</Text>
                  <View style={styles.optionButtons}>
                    <TouchableOpacity 
                      style={[
                        styles.optionButton, 
                        schoolAccessOptions.includes('10min') && styles.optionButtonSelected
                      ]}
                      onPress={() => toggleSchoolAccessOption('10min')}
                    >
                      <Text style={[
                        styles.optionButtonText,
                        schoolAccessOptions.includes('10min') && styles.optionButtonTextSelected
                      ]}>
                        도보 10분 이내
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.optionButton, 
                        schoolAccessOptions.includes('10-20min') && styles.optionButtonSelected
                      ]}
                      onPress={() => toggleSchoolAccessOption('10-20min')}
                    >
                      <Text style={[
                        styles.optionButtonText,
                        schoolAccessOptions.includes('10-20min') && styles.optionButtonTextSelected
                      ]}>
                        10-20분
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.optionButton, 
                        schoolAccessOptions.includes('30min') && styles.optionButtonSelected
                      ]}
                      onPress={() => toggleSchoolAccessOption('30min')}
                    >
                      <Text style={[
                        styles.optionButtonText,
                        schoolAccessOptions.includes('30min') && styles.optionButtonTextSelected
                      ]}>
                        30분
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* 엘리베이터 옵션 */}
                <View style={styles.optionGroup}>
                  <Text style={styles.optionGroupTitle}>엘리베이터</Text>
                  <View style={styles.optionButtons}>
                    <TouchableOpacity 
                      style={[
                        styles.optionButton, 
                        elevatorOptions.includes('needed') && styles.optionButtonSelected
                      ]}
                      onPress={() => toggleElevatorOption('needed')}
                    >
                      <Text style={[
                        styles.optionButtonText,
                        elevatorOptions.includes('needed') && styles.optionButtonTextSelected
                      ]}>
                        필요해요
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.optionButton, 
                        elevatorOptions.includes('not_needed') && styles.optionButtonSelected
                      ]}
                      onPress={() => toggleElevatorOption('not_needed')}
                    >
                      <Text style={[
                        styles.optionButtonText,
                        elevatorOptions.includes('not_needed') && styles.optionButtonTextSelected
                      ]}>
                        필요 없어요
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            
            {/* 하단 버튼들 */}
            <View style={styles.bottomButtons}>
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>초기화</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
                <Text style={styles.completeButtonText}>완료</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Portal>
  );
}

// RangeSlider 컴포넌트
interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: { min: number; max: number };
  onValueChange: (value: { min: number; max: number }) => void;
  formatValue: (value: number, isMaxValue?: boolean, maxAmount?: number) => string;
}

function RangeSlider({ min, max, step, value, onValueChange, formatValue }: RangeSliderProps) {
  const trackWidth = 292;
  const thumbSize = 23;
  
  // 드래그 시작 위치 저장
  const minStartPosition = useRef(0);
  const maxStartPosition = useRef(0);
  
  const getPosition = (val: number) => {
    return ((val - min) / (max - min)) * trackWidth;
  };

  const getValue = (position: number) => {
    const ratio = Math.max(0, Math.min(1, position / trackWidth));
    const rawValue = min + ratio * (max - min);
    return Math.max(min, Math.min(max, Math.round(rawValue / step) * step));
  };

  const minPosition = getPosition(value.min);
  const maxPosition = getPosition(value.max);
  const activeTrackWidth = maxPosition - minPosition;

  // 최소값 썸 드래그 PanResponder
  const minPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 2;
      },
      onPanResponderGrant: () => {
        // 드래그 시작 시 현재 위치 저장
        minStartPosition.current = getPosition(value.min);
      },
      onPanResponderMove: (_, gestureState) => {
        const newPosition = minStartPosition.current + gestureState.dx;
        const newValue = getValue(newPosition);
        // 더 엄격한 경계 체크
        const clampedValue = Math.max(min, Math.min(newValue, value.max - step));
        if (clampedValue !== value.min) {
          onValueChange({ ...value, min: clampedValue });
        }
      },
      onPanResponderRelease: () => {
        // 드래그 종료
      },
    })
  ).current;

  // 최대값 썸 드래그 PanResponder
  const maxPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 2;
      },
      onPanResponderGrant: () => {
        // 드래그 시작 시 현재 위치 저장
        maxStartPosition.current = getPosition(value.max);
      },
      onPanResponderMove: (_, gestureState) => {
        const newPosition = maxStartPosition.current + gestureState.dx;
        const newValue = getValue(newPosition);
        // 더 엄격한 경계 체크
        const clampedValue = Math.max(value.min + step, Math.min(newValue, max));
        if (clampedValue !== value.max) {
          onValueChange({ ...value, max: clampedValue });
        }
      },
      onPanResponderRelease: () => {
        // 드래그 종료
      },
    })
  ).current;

  return (
    <View style={styles.sliderContainer}>
      {/* 슬라이더 트랙 */}
      <View style={styles.sliderTrack}>
        {/* 비활성 트랙 (회색) */}
        <View style={styles.inactiveTrack} />
        {/* 활성 트랙 (주황색) */}
        <View 
          style={[
            styles.activeTrack, 
            { 
              left: minPosition, 
              width: activeTrackWidth 
            }
          ]} 
        />
        
        {/* 최소값 썸 */}
        <View 
          style={[styles.thumb, { left: minPosition - thumbSize/2 }]}
          {...minPanResponder.panHandlers}
        >
          <Svg width="37" height="37" viewBox="0 0 37 37" fill="none">
            <Defs>
              <Filter id="filter0_d" x="0" y="0" width="37" height="37" filterUnits="userSpaceOnUse">
                <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
                <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <FeOffset dy="0.5"/>
                <FeGaussianBlur stdDeviation="3.5"/>
                <FeComposite in2="hardAlpha" operator="out"/>
                <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0"/>
                <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
              </Filter>
            </Defs>
            <Circle cx="18.5" cy="18" r="11.5" fill="white" filter="url(#filter0_d)"/>
          </Svg>
        </View>
        
        {/* 최대값 썸 */}
        <View 
          style={[styles.thumb, { left: maxPosition - thumbSize/2 }]}
          {...maxPanResponder.panHandlers}
        >
          <Svg width="37" height="37" viewBox="0 0 37 37" fill="none">
            <Defs>
              <Filter id="filter0_d_max" x="0" y="0" width="37" height="37" filterUnits="userSpaceOnUse">
                <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
                <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <FeOffset dy="0.5"/>
                <FeGaussianBlur stdDeviation="3.5"/>
                <FeComposite in2="hardAlpha" operator="out"/>
                <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0"/>
                <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
              </Filter>
            </Defs>
            <Circle cx="18.5" cy="18" r="11.5" fill="white" filter="url(#filter0_d_max)"/>
          </Svg>
        </View>
      </View>
      
      {/* 값 표시 - 동그라미 위치에 따라 이동 */}
      <View style={styles.valueContainer}>
        <View style={[styles.minValueContainer, { left: minPosition - 30 }]}>
          <Text style={styles.minValue}>{formatValue(value.min, false)}</Text>
        </View>
        <View style={[styles.maxValueContainer, { left: maxPosition - 30 }]}>
          <Text style={styles.maxValue}>{formatValue(value.max, true, max)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    zIndex: 100000,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(50, 50, 50, 0.69)',
  },
  modalContainer: {
    height: screenHeight * 0.87, // 화면 높이의 85% (5% 더 높게)
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3.5 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    flex: 1,
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  filterTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  filterTitle: {
    color: '#636363',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
  },
  closeButton: {
    width: 28,
    height: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sliderSection: {
    marginBottom: 40,
  },
  sliderTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 0,
  },
  sliderSpacing: {
    height: 30,
  },
  divider: {
    width: '120%',
    height: 4,
    backgroundColor: '#F2F2F2',
    marginTop: -20,
    marginBottom: 20,
    alignSelf: 'center',
    marginLeft: -20,
  },
  sliderContainer: {
    alignItems: 'center',
  },
  sliderTrack: {
    width: 292,
    height: 4,
    position: 'relative',
    marginBottom: 20,
    justifyContent: 'center',
  },
  activeTrack: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#FF805F',
    borderRadius: 19.5,
    top: 0,
  },
  inactiveTrack: {
    width: 292,
    height: 4.046,
    backgroundColor: '#CDCDCD',
    borderRadius: 19.5,
  },
  thumb: {
    position: 'absolute',
    width: 23,
    height: 23,
    top: -9.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    position: 'relative',
    width: 292,
    height: 35,
  },
  minValueContainer: {
    position: 'absolute',
    width: 60,
    alignItems: 'center',
  },
  maxValueContainer: {
    position: 'absolute',
    width: 60,
    alignItems: 'center',
  },
  minValue: {
    color: '#AAA',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 35,
  },
  maxValue: {
    color: '#FF805F',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 35,
  },
  additionalOptionsSection: {
    marginTop: 20,
  },
  additionalOptionsTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 20,
  },
  optionGroup: {
    marginBottom: 25,
  },
  optionGroupTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 12,
  },
  optionButtons: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 10,
  },
  optionButton: {
    display: 'flex',
    minWidth: 80,
    height: 39,
    paddingHorizontal: 12,
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22.65,
    backgroundColor: '#F2F2F2',
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(255, 128, 95, 0.10)',
    borderWidth: 1,
    borderColor: '#FF805F',
  },
  optionButtonText: {
    color: '#636363',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
  },
  optionButtonTextSelected: {
    color: '#FF805F',
    fontWeight: '500',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  resetButton: {
    display: 'flex',
    width: 91,
    height: 56,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 128, 95, 0.10)',
  },
  resetButtonText: {
    color: '#FF805F',
    fontFamily: 'Pretendard',
    fontSize: 16.5,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 16.5,
  },
  completeButton: {
    display: 'flex',
    width: 232,
    height: 56,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FF805F',
  },
  completeButtonText: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 16.5,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 16.5,
  },
});

