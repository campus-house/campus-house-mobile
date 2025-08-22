# 📝 커밋 메시지 컨벤션

## 형식
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types
- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 변경
- **style**: 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음)
- **refactor**: 코드 리팩토링 (버그 수정, 기능 추가 없음)
- **test**: 테스트 추가, 테스트 수정
- **chore**: 빌드 프로세스, 보조 도구 변경 등

## Scopes
- **mobile**: 모바일 앱 관련
- **backend**: 백엔드 서버 관련
- **root**: 루트 설정 관련
- **ci**: CI/CD 관련

## Examples
```bash
feat(mobile): Expo Router 설정 추가
fix(backend): API 응답 형식 오류 수정
docs: README 업데이트
chore: 의존성 패키지 업데이트
```