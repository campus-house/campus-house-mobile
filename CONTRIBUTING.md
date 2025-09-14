# 🤝 기여 가이드

## 📝 커밋 메시지 컨벤션

### 형식
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 변경
- **style**: 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음)
- **refactor**: 코드 리팩토링 (버그 수정, 기능 추가 없음)
- **test**: 테스트 추가, 테스트 수정
- **chore**: 빌드 프로세스, 보조 도구 변경 등

### Scopes
- **mobile**: 모바일 앱 관련
- **backend**: 백엔드 서버 관련
- **root**: 루트 설정 관련
- **ci**: CI/CD 관련

### Examples
```bash
feat(mobile): Expo Router 설정 추가
fix(backend): API 응답 형식 오류 수정
docs: README 업데이트
chore: 의존성 패키지 업데이트
```

## 🔄 개발 워크플로우

### 1. 브랜치 생성
```bash
git checkout -b feature/새로운-기능명
git checkout -b fix/버그-수정명
git checkout -b docs/문서-업데이트명
```

### 2. 개발 및 커밋
```bash
# 변경사항 스테이징
git add .

# 커밋 (컨벤션 준수)
git commit -m "feat(mobile): 새로운 기능 추가"

# 푸시
git push origin feature/새로운-기능명
```

### 3. Pull Request 생성
- GitHub에서 Pull Request 생성
- 제목: 커밋 메시지와 동일하게 작성
- 설명: 변경사항 상세 설명

## 📋 코드 리뷰 가이드

### 체크리스트
- [ ] 코드가 프로젝트 스타일 가이드를 따르는가?
- [ ] 새로운 기능에 대한 테스트가 있는가?
- [ ] 문서가 업데이트되었는가?
- [ ] 성능에 영향을 주는 변경사항인가?
- [ ] 보안상 문제가 없는가?

### 리뷰어 가이드
- 건설적인 피드백 제공
- 코드 품질과 가독성 중점 검토
- 테스트 커버리지 확인
- 문서화 완성도 확인

## 🛠️ 개발 환경 설정

자세한 개발 환경 설정은 [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md)를 참고하세요.

## 📚 추가 자료

- [Expo 공식 문서](https://docs.expo.dev/)
- [React Native 공식 문서](https://reactnative.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)

---

**마지막 업데이트**: 2024년 9월 9일  
**문서 버전**: 1.0.0
