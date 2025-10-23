const BASE_URL = "http://172.30.1.54:8080";

// 간단한 연결 테스트용
export const simpleTest = async () => {
  try {
    const res = await global.fetch(`${BASE_URL}/`, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    return { status: res.status, message: '기본 연결 테스트 성공!' };
  } catch (error) {
    throw new Error(`연결 실패: ${error.message}`);
  }
};

export const getExample = async () => {
  const res = await global.fetch(`${BASE_URL}/api/example`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const text = await res.text();
  if (!text) {
    throw new Error('서버에서 빈 응답을 받았습니다');
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`JSON 파싱 에러: ${error.message}`);
  }
};

// 추가 API 함수들
export const postExample = async (data) => {
  const res = await global.fetch(`${BASE_URL}/api/example`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const text = await res.text();
  if (!text) {
    throw new Error('서버에서 빈 응답을 받았습니다');
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`JSON 파싱 에러: ${error.message}`);
  }
};

export const testConnection = async () => {
  try {
    // 1. 기본 경로 테스트
    const res = await global.fetch(`${BASE_URL}/`, {
      method: 'GET',
    });
    
    if (res.ok) {
      return { status: 'success', message: `서버 연결 성공! (${res.status})` };
    } else {
      // 2. 다른 경로들 시도
      const paths = ['/health', '/api', '/test', '/status'];
      for (const path of paths) {
        try {
          const testRes = await global.fetch(`${BASE_URL}${path}`);
          if (testRes.ok) {
            return { status: 'success', message: `서버 연결 성공! (${path} - ${testRes.status})` };
          }
        } catch (e) {
          // 계속 다음 경로 시도
        }
      }
      throw new Error(`서버 응답 에러: ${res.status} - 모든 경로에서 접근 거부됨`);
    }
  } catch (error) {
    if (error.message.includes('Network request failed')) {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.');
    }
    throw error;
  }
};
