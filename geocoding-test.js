/**
 * Naver Geocoding Test Script
 * 
 * 이 스크립트는 Naver API를 사용하여 주소 <-> 좌표 변환을 테스트합니다.
 * 
 * 필요한 API 키:
 * - Naver Cloud Platform Client ID & Secret
 * 
 * 발급 방법:
 * 1. https://www.ncloud.com/ 접속
 * 2. 로그인 후 Console 이동
 * 3. Services → AI·NAVER API → AI·NAVER API 이용 신청
 * 4. Maps → Geocoding 선택
 * 5. 애플리케이션 등록 후 Client ID & Secret 확인
 * 
 * 실행 방법:
 * node geocoding-test.js
 */

// ============================================
// API 키 설정 (여기에 실제 키를 입력하세요)
// ============================================
const API_KEYS = {
  // Naver Cloud Platform
  // https://www.ncloud.com/mypage/manage/authkey
  NAVER_CLIENT_ID: 'ul5jp5jcdi',
  NAVER_CLIENT_SECRET: 'MR1Ym6hIz30kJ0LwSHL4rp419N3OlyacJUd3Qnfd'
};

// ============================================
// 테스트할 주소와 좌표
// ============================================
const TEST_DATA = {
  // 주소 -> 좌표 변환 테스트
  addresses: [
    '서울특별시 강남구 테헤란로 152',
    '서울특별시 종로구 세종대로 209',
    '경기도 성남시 분당구 정자일로 95'
  ],
  
  // 좌표 -> 주소 변환 테스트
  coordinates: [
    { lat: 37.5665, lng: 126.9780 }, // 서울시청
    { lat: 37.4979, lng: 127.0276 }, // 강남역
    { lat: 37.3595, lng: 127.1052 }  // 분당
  ]
};

// ============================================
// Naver Geocoding API
// ============================================
async function naverGeocode(address) {
  const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': API_KEYS.NAVER_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': API_KEYS.NAVER_CLIENT_SECRET
      }
    });
    
    // HTTP 상태 확인
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // 응답 전체 출력 (디버그용)
    console.log('   [DEBUG] API Response:', JSON.stringify(data, null, 2));
    
    // 에러 응답 확인
    if (data.errorMessage) {
      throw new Error(`API Error: ${data.errorMessage}`);
    }
    
    if (data.status && data.status !== 'OK') {
      throw new Error(`Status Error: ${data.status}`);
    }
    
    if (data.addresses && data.addresses.length > 0) {
      const result = data.addresses[0];
      return {
        address: result.jibunAddress || '지번 주소 없음',
        roadAddress: result.roadAddress || '도로명 주소 없음',
        lat: parseFloat(result.y),
        lng: parseFloat(result.x)
      };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('   ❌ Naver Geocoding Error:', error.message);
    return null;
  }
}

async function naverReverseGeocode(lat, lng) {
  const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${lng},${lat}&orders=addr,roadaddr&output=json`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': API_KEYS.NAVER_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': API_KEYS.NAVER_CLIENT_SECRET
      }
    });
    
    // HTTP 상태 확인
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // 응답 전체 출력 (디버그용)
    console.log('   [DEBUG] API Response:', JSON.stringify(data, null, 2));
    
    // 에러 응답 확인
    if (data.errorMessage) {
      throw new Error(`API Error: ${data.errorMessage}`);
    }
    
    if (data.status && data.status.code !== 0) {
      throw new Error(`Status Error: ${data.status.message || 'Unknown error'}`);
    }
    
    if (data.results && data.results.length > 0) {
      // 지번 주소 찾기
      const addrResult = data.results.find(r => r.name === 'addr');
      // 도로명 주소 찾기
      const roadResult = data.results.find(r => r.name === 'roadaddr');
      
      let address = '';
      let roadAddress = '';
      
      if (addrResult && addrResult.region) {
        const r = addrResult.region;
        address = [
          r.area1?.name,
          r.area2?.name,
          r.area3?.name,
          r.area4?.name
        ].filter(Boolean).join(' ');
      }
      
      if (roadResult && roadResult.land) {
        roadAddress = [
          roadResult.region?.area1?.name,
          roadResult.region?.area2?.name,
          roadResult.region?.area3?.name,
          roadResult.land?.name,
          roadResult.land?.number1,
          roadResult.land?.number2 ? `-${roadResult.land.number2}` : ''
        ].filter(Boolean).join(' ');
      }
      
      return {
        address: address || '주소 정보 없음',
        roadAddress: roadAddress || '도로명 주소 정보 없음'
      };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('   ❌ Naver Reverse Geocoding Error:', error.message);
    return null;
  }
}

// ============================================
// 테스트 실행
// ============================================
async function runTests() {
  console.log('='.repeat(60));
  console.log('📍 Naver Geocoding Test Script');
  console.log('='.repeat(60));
  console.log();
  
  // API 키 확인
  console.log('🔑 API Keys Status:');
  console.log(`  Naver: ${API_KEYS.NAVER_CLIENT_ID !== 'YOUR_NAVER_CLIENT_ID' ? '✅ Set' : '❌ Not Set'}`);
  console.log();
  
  if (API_KEYS.NAVER_CLIENT_ID === 'YOUR_NAVER_CLIENT_ID') {
    console.log('⚠️  API 키를 설정해주세요!');
    console.log('   파일 상단의 API_KEYS 객체에 실제 키를 입력하세요.');
    return;
  }
  
  // 주소 -> 좌표 변환 테스트
  console.log('📮 Address to Coordinates Test');
  console.log('-'.repeat(60));
  
  for (const address of TEST_DATA.addresses) {
    console.log(`\n🏠 주소: ${address}`);
    
    const naverResult = await naverGeocode(address);
    if (naverResult) {
      console.log(`   위도: ${naverResult.lat}`);
      console.log(`   경도: ${naverResult.lng}`);
      console.log(`   지번 주소: ${naverResult.address}`);
      if (naverResult.roadAddress) {
        console.log(`   도로명 주소: ${naverResult.roadAddress}`);
      }
    }
  }
  
  console.log();
  console.log();
  
  // 좌표 -> 주소 변환 테스트
  console.log('📍 Coordinates to Address Test');
  console.log('-'.repeat(60));
  
  for (const coord of TEST_DATA.coordinates) {
    console.log(`\n🌐 좌표: ${coord.lat}, ${coord.lng}`);
    
    const naverResult = await naverReverseGeocode(coord.lat, coord.lng);
    if (naverResult) {
      console.log(`   지번 주소: ${naverResult.address}`);
      if (naverResult.roadAddress) {
        console.log(`   도로명 주소: ${naverResult.roadAddress}`);
      }
    }
  }
  
  console.log();
  console.log('='.repeat(60));
  console.log('✅ Test Complete!');
  console.log('='.repeat(60));
}

// 스크립트 실행
runTests().catch(console.error);

