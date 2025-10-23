const BASE_URL = "http://172.30.1.54:8080";

export const getExample = async () => {
  const res = await global.fetch(`${BASE_URL}/api/example`);
  return await res.json();
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
  return await res.json();
};

export const testConnection = async () => {
  try {
    const result = await getExample();
    // console.log('서버 응답:', result);
    return result;
  } catch (error) {
    // console.error('연결 실패:', error);
    throw error;
  }
};
