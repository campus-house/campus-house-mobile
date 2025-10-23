import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Portal } from 'react-native-portalize';
import { COLORS } from '@/constants/colors';
import Svg, { Path, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { searchBuildings } from '@/api/buildings';

interface SearchModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSearchResult?: (building: any) => void;
}

export default function SearchModal({ isVisible, onClose, onSearchResult }: SearchModalProps) {
  const insets = useSafeAreaInsets();
  const [recentSearches, setRecentSearches] = useState([
    '영통동',
    '경희유니빌', 
    '양도',
    '아이파크',
    '마이온'
  ]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 개별 검색어 삭제
  const removeSearchTerm = (index: number) => {
    setRecentSearches(prev => prev.filter((_, i) => i !== index));
  };

  // 전체 검색어 삭제
  const clearAllSearches = () => {
    setRecentSearches([]);
  };

  // 검색어 클릭 처리
  const handleSearchTermClick = async (searchTerm: string) => {
    try {
      setIsSearching(true);
      console.log('검색어 클릭:', searchTerm);
      
      // 서버에서 건물 검색
      const results = await searchBuildings(searchTerm, { page: 0, size: 10 });
      console.log('검색 결과:', results);
      
      if (results.content && results.content.length > 0) {
        setSearchResults(results.content);
        
        // 첫 번째 결과를 선택하고 지도로 이동
        const firstResult = results.content[0];
        if (onSearchResult) {
          onSearchResult(firstResult);
        }
        
        onClose(); // 검색 모달 닫기
      } else {
        console.log('검색 결과 없음');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('검색 에러:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // 검색 실행
  const handleSearch = async () => {
    if (!searchText.trim()) return;
    
    try {
      setIsSearching(true);
      console.log('검색어:', searchText.trim());
      
      // 서버에서 건물 검색
      const results = await searchBuildings(searchText.trim(), { page: 0, size: 10 });
      console.log('검색 결과:', results);
      
      if (results.content && results.content.length > 0) {
        setSearchResults(results.content);
        
        // 첫 번째 결과를 선택하고 지도로 이동
        const firstResult = results.content[0];
        if (onSearchResult) {
          onSearchResult(firstResult);
        }
        
        // 검색어를 최근 검색어에 추가
        if (!recentSearches.includes(searchText.trim())) {
          setRecentSearches(prev => [searchText.trim(), ...prev]);
        }
        
        onClose(); // 검색 모달 닫기
      } else {
        console.log('검색 결과 없음');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('검색 에러:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  if (!isVisible) return null;

  return (
    <Portal>
      <View style={styles.container}>
        {/* 검색창 */}
        <View style={[styles.searchContainer, { marginTop: insets.top + 18 }]}>
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
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              textContentType="none"
              spellCheck={false}
              autoComplete="off"
              importantForAutofill="no"
              dataDetectorTypes="none"
              multiline={false}
              numberOfLines={1}
              blurOnSubmit={true}
              clearButtonMode="never"
              enablesReturnKeyAutomatically={true}
              keyboardAppearance="default"
              secureTextEntry={false}
              selectTextOnFocus={false}
              showSoftInputOnFocus={true}
              allowFontScaling={false}
              maxLength={100}
              editable={true}
              caretHidden={false}
              contextMenuHidden={false}
              scrollEnabled={false}
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
              {recentSearches.map((search, index) => {
                // 글자 수에 따른 동적 크기 계산
                const getTagWidth = (text: string) => {
                  const length = text.length;
                  return 68 + length * 10;
                };

                const dynamicTagStyle = {
                  ...styles.searchTag,
                  minWidth: getTagWidth(search),
                  maxWidth: getTagWidth(search) + 20,
                };

                return (
                  <View key={index} style={dynamicTagStyle}>
                    <TouchableOpacity 
                      style={styles.searchTagContent}
                      onPress={() => handleSearchTermClick(search)}
                    >
                      <Text style={styles.searchTagText}>{search}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => removeSearchTerm(index)}
                    >
                      <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <Path 
                          d="M18 6L6 18M6 6L18 18" 
                          stroke={COLORS.neutral.grey4} 
                          strokeWidth="2" 
                          strokeLinecap="round"
                        />
                      </Svg>
                    </TouchableOpacity>
                  </View>
                );
              })}
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
    paddingHorizontal: 30,
    marginTop: 106,
    marginBottom: 30,
  },
  backButton: {
    width: 10,
    height: 19.091,
    marginRight: 15,
    marginLeft: -3,
    marginTop: 11,
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
    marginTop: 8,
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
    textAlign: 'left',
    textAlignVertical: 'center',
    includeFontPadding: false,
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
    borderWidth: 0,
  },
  searchIcon: {
    width: 22.915,
    height: 23.01,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentSearchesSection: {
    paddingHorizontal: 30,
    marginTop: 9,
  },
  recentSearchesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 8,
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
    maxWidth: 200,
    height: 39,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignItems: 'center',
    gap: 0,
    flexShrink: 0,
    borderRadius: 22.65,
    borderWidth: 0.5,
    borderColor: '#CDCDCD',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchTagContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    minWidth: 0,
    paddingLeft: 2,
  },
  searchTagText: {
    color: '#323232',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    flexShrink: 0,
    textAlign: 'center',
  },
  deleteButton: {
    width: 18,
    height: 18,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
