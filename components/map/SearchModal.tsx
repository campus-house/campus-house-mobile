import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Portal } from 'react-native-portalize';
import { COLORS } from '@/constants/colors';
import Svg, { Path, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SearchModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SearchModal({ isVisible, onClose }: SearchModalProps) {
  const insets = useSafeAreaInsets();
  const [recentSearches, setRecentSearches] = useState([
    '영통동',
    '경희유니빌', 
    '양도',
    '아이파크',
    '마이온'
  ]);
  const [searchText, setSearchText] = useState('');

  // 개별 검색어 삭제
  const removeSearchTerm = (index: number) => {
    setRecentSearches(prev => prev.filter((_, i) => i !== index));
  };

  // 전체 검색어 삭제
  const clearAllSearches = () => {
    setRecentSearches([]);
  };

  // 검색 실행
  const handleSearch = () => {
    if (searchText.trim() && !recentSearches.includes(searchText.trim())) {
      setRecentSearches(prev => [searchText.trim(), ...prev]);
    }
    setSearchText('');
  };

  if (!isVisible) return null;

  return (
    <Portal>
      <View style={styles.container}>
        {/* 검색창 */}
        <View style={[styles.searchContainer, { marginTop: insets.top + 20 }]}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Svg width="13" height="22" viewBox="0 0 13 22" fill="none">
              <Path 
                d="M10.9121 1.13623L1.28829 10.4636C1.08343 10.6622 1.08595 10.9916 1.29383 11.187L10.9121 20.2271" 
                stroke="#AAAAAA" 
                strokeWidth="2.27273" 
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>
          
          <View style={styles.searchBox}>
            <TextInput 
              style={styles.searchInput}
              placeholder="어느 집이 궁금하세요?"
              placeholderTextColor="#AAA"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
              <Svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                <Path 
                  d="M9.26465 1C13.8649 1.00003 17.529 4.58118 17.5293 8.91992C17.5293 13.2589 13.8651 16.8408 9.26465 16.8408C4.66422 16.8408 1 13.2589 1 8.91992C1.00027 4.58117 4.66439 1 9.26465 1Z" 
                  stroke="#AAAAAA" 
                  strokeWidth="2"
                />
                <Rect 
                  width="2.19329" 
                  height="10.6041" 
                  rx="1.09664" 
                  transform="matrix(0.720361 -0.693599 0.720361 0.693599 13.6953 15.6548)" 
                  fill="#AAAAAA"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>

        {/* 최근 검색어 섹션 */}
        <View style={styles.recentSearchesSection}>
          <View style={styles.recentSearchesHeader}>
            <Text style={styles.recentSearchesTitle}>최근 검색어</Text>
            <TouchableOpacity onPress={clearAllSearches}>
              <Text style={styles.deleteAllText}>전체삭제</Text>
            </TouchableOpacity>
          </View>
          
          {recentSearches.length > 0 ? (
            <View style={styles.searchTagsContainer}>
              {recentSearches.map((search, index) => (
                <View key={index} style={styles.searchTag}>
                  <Text style={styles.searchTagText}>{search}</Text>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => removeSearchTerm(index)}
                  >
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <Path 
                        d="M18 6L6 18M6 6L18 18" 
                        stroke="#323232" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noRecentSearches}>
              <Text style={styles.noRecentSearchesText}>최근 검색어가 없습니다.</Text>
            </View>
          )}
        </View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  backButton: {
    width: 10,
    height: 19.091,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    height: 58,
    backgroundColor: '#FFF',
    borderRadius: 20.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 19.5,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    height: 23.037,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    fontFamily: 'Pretendard',
  },
  searchIcon: {
    width: 22.915,
    height: 23.01,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentSearchesSection: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  recentSearchesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 20,
  },
  recentSearchesTitle: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 23,
  },
  deleteAllText: {
    color: '#AAA',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
  },
  noRecentSearches: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  noRecentSearchesText: {
    fontSize: 14,
    color: '#999',
  },
  searchTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  searchTag: {
    display: 'flex',
    minWidth: 94,
    height: 39,
    paddingHorizontal: 18,
    paddingVertical: 7,
    alignItems: 'center',
    gap: 15,
    flexShrink: 0,
    borderRadius: 22.65,
    borderWidth: 0.5,
    borderColor: '#CDCDCD',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchTagText: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
  },
  deleteButton: {
    width: 24,
    height: 24,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
