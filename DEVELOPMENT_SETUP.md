# 🚀 개발 환경 설정 가이드

## 📋 목차
1. [필수 설치 항목](#필수-설치-항목)
2. [프로젝트 구조](#프로젝트-구조)
3. [초기 세팅](#초기-세팅)
4. [실행 방법](#실행-방법)
5. [코드 품질 관리](#코드-품질-관리)

---

## 🛠️ 필수 설치 항목

### Node.js
**권장 버전**: 18.x 이상

### Expo CLI
```bash
npm install -g @expo/cli
```

### iOS 개발 (macOS만)
- Xcode (App Store에서 설치)
- iOS Simulator

### Android 개발
- Android Studio
- Android SDK
- Android Emulator

---

## 📁 프로젝트 구조

```
campus-house-mobile/
├── app/                    # Expo Router 앱 구조
│   ├── _layout.tsx        # 루트 레이아웃
│   ├── index.tsx          # 홈 화면
│   ├── splash.tsx         # 스플래시 화면
│   ├── auth/              # 인증 관련 화면
│   │   └── signup/        # 회원가입 플로우
│   └── main/              # 메인 앱 화면
│       ├── _layout.tsx    # 메인 레이아웃
│       ├── map.tsx        # 지도 화면
│       ├── profile.tsx    # 프로필 화면
│       └── scrap.tsx      # 스크랩 화면
│
├── components/            # 재사용 가능한 컴포넌트
│   ├── Button/           # 버튼 컴포넌트들
│   ├── Icon/             # 아이콘 컴포넌트들
│   ├── Input/            # 입력 필드 컴포넌트들
│   └── Modal/            # 모달 컴포넌트들
│
├── src/                  # 추가 컴포넌트
│   └── components/
│       └── Icon/         # 아이콘 컴포넌트들
│
├── constants/            # 상수 정의
│   ├── colors.ts         # 색상 상수
│   └── typography.ts     # 타이포그래피 상수
│
├── assets/               # 정적 자원
│   ├── fonts/           # 폰트 파일들
│   └── images/          # 이미지 파일들
│
├── package.json          # 프로젝트 의존성
├── app.json             # Expo 설정
├── babel.config.js      # Babel 설정
├── tsconfig.json        # TypeScript 설정
├── eslint.config.js     # ESLint 설정
├── .editorconfig        # IDE 설정 통일
├── .gitignore           # Git 무시 파일
└── README.md            # 프로젝트 개요
```

---

## ⚙️ 초기 세팅

### 1. 저장소 클론 및 이동
```bash
git clone <repository_url>
cd campus-house-mobile
```

### 2. 의존성 설치
```bash
npm install
```

### 3. Expo 개발 서버 시작
```bash
npm start
```

---

## 🖥️ 실행 방법

### 개발 서버
```bash
npm start              # Expo 개발 서버 시작
npm run ios           # iOS 시뮬레이터에서 실행
npm run android       # Android 에뮬레이터에서 실행
npm run web           # 웹 브라우저에서 실행
```

### 빌드
```bash
npm run build         # 프로덕션 빌드
```

---

## 🔍 코드 품질 관리

### ESLint - 코드 품질 검사
```bash
npm run lint          # 코드 품질 검사
npm run lint:fix      # 자동 수정 가능한 문제 해결
```

### Prettier - 코드 포맷팅
```bash
npm run format        # 코드 포맷팅
npm run format:check  # 포맷팅 검사
```

### TypeScript - 타입 검사
```bash
npm run type-check    # 타입 오류 검사
```

### 통합 검사
```bash
npm run check         # ESLint + Prettier 검사
```

### 자동 적용

#### Git Hooks (Husky) - 자동 관리
- **커밋 시 자동 실행**: ESLint, Prettier 자동 검사 및 수정
- **문제가 있는 코드**: 커밋 불가 (코드 품질 보장)
- **자동 설정**: `.husky/` 폴더가 Git에 포함되어 자동으로 hooks 활성화

### 공통 도구

#### EditorConfig
- IDE 설정 통일 (들여쓰기, 인코딩, 줄바꿈 등)

#### Git Hooks (Husky)
- **자동 관리**: `.husky/` 폴더가 Git에 포함되어 push/pull 시 자동 동기화
- **팀 협업**: 모든 팀원이 동일한 Git hooks 설정을 자동으로 공유
- **커밋 전 자동 검증**: 코드 품질 보장

### 🔄 팀원들이 알아야 할 중요사항

#### Git Hooks 자동 동기화
- **Pull 받은 후**: Git hooks가 자동으로 활성화됩니다
- **설정 공유**: 팀원이 추가한 Git hooks 설정도 자동으로 공유됩니다

#### 문제 해결
- **Git hooks가 작동하지 않는 경우**: `npm install`을 다시 실행해보세요
- **권한 오류 발생 시**: `.husky/` 폴더의 권한을 확인하고 필요시 `chmod +x .husky/*` 실행

---

## 🚀 개발 팁

### 경로 별칭 사용
- `@/` : 프로젝트 루트
- `@/components/` : components 폴더
- `@/constants/` : constants 폴더
- `@/assets/` : assets 폴더

### 폰트 사용
```typescript
fontFamily: 'Pretendard-Regular'    // 일반 텍스트
fontFamily: 'Pretendard-SemiBold'   // 중간 굵기
fontFamily: 'Pretendard-Bold'       // 굵은 텍스트
```

### 색상 사용
```typescript
import { COLORS } from '@/constants/colors';

// 사용 예시
backgroundColor: COLORS.primary
color: COLORS.text.primary
```

---

**마지막 업데이트**: 2024년 9월 9일  
**문서 버전**: 1.0.0
