# 🚀 개발 환경 설정 가이드

## 📋 목차
1. [필수 설치 항목](#필수-설치-항목)
2. [프로젝트 구조](#프로젝트-구조)
3. [초기 세팅](#초기-세팅)
4. [실행 방법](#실행-방법)
5. [코드 품질 관리](#코드-품질-관리)

---

## 🛠️ 필수 설치 항목

### Node.js (프론트엔드용)
**권장 버전**: 22.x

### Java 21 LTS (백엔드용)
**권장 버전**: 21 LTS





---

## 📁 프로젝트 구조

```
campus-house/
├── apps/
│   ├── mobile/          # React Native (Expo) 앱
│   │   ├── src/
│   │   │   ├── components/   # 재사용 가능한 컴포넌트
│   │   │   ├── screens/      # 화면 컴포넌트
│   │   │   ├── navigation/   # 네비게이션 관련
│   │   │   └── utils/        # 유틸리티 함수
│   │   ├── app/              # Expo Router
│   │   ├── package.json
│   │   ├── .eslintrc.js      # ESLint 설정
│   │   ├── .prettierrc       # Prettier 설정
│   │   └── tsconfig.json     # TypeScript 설정
│   │
│   └── server/           # Spring Boot 서버
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/     # Java 소스 코드
│       │   │   └── resources/ # 설정 파일
│       │   └── test/         # 테스트 코드
│       ├── build.gradle      # Gradle 설정
│       └── gradle/           # Gradle Wrapper
│
├── contracts/            # API 명세
│   └── openapi.yaml     # OpenAPI 3.0 명세
│
├── docs/                 # 문서
│   └── DEVELOPMENT_GUIDE.md
│
├── package.json          # 루트 의존성 (Git Hooks)
├── .editorconfig         # IDE 설정 통일
├── .gitignore            # Git 무시 파일
├── CONTRIBUTING.md       # 커밋 컨벤션
├── DEVELOPMENT_SETUP.md  # 이 파일
└── README.md             # 프로젝트 개요
```

---

## ⚙️ 초기 세팅

### 1. 저장소 클론 및 이동
```bash
git clone <repository_url>
cd campus-house
```

### 2. 루트 의존성 설치 (Git Hooks)
```bash
npm install
```

### 3. 프론트엔드 설정 (apps/mobile)
```bash
cd apps/mobile
npm install
```

### 4. 백엔드 설정 (apps/server)
```bash
cd apps/server
# Spring Boot 프로젝트 생성 후 Gradle 설정
```

### 5. Husky Git Hook 연결
```bash
# Git hooks 활성화
npx husky install

# macOS/Linux에서 권한 설정
chmod +x .husky/*
```



---

## 🖥️ 실행 방법

### 프론트엔드 개발 서버
```bash
cd apps/mobile
npm run ios        # iOS 시뮬레이터에서 실행
```

### 백엔드 개발 서버
```bash
cd apps/server
./gradlew bootRun
```

---

## 🔍 코드 품질 관리

### 프론트엔드 (React Native + TypeScript)

#### ESLint - 코드 품질 검사
```bash
cd apps/mobile
npm run lint          # 코드 품질 검사
npm run lint:fix      # 자동 수정 가능한 문제 해결
```

#### Prettier - 코드 포맷팅
```bash
cd apps/mobile
npm run format        # 코드 포맷팅
npm run format:check  # 포맷팅 검사
```

#### TypeScript - 타입 검사
```bash
cd apps/mobile
npm run type-check    # 타입 오류 검사
```

### 백엔드 (Spring Boot + Java)

#### Spotless - 코드 포맷팅
```bash
cd apps/server
./gradlew spotlessApply  # 코드 포맷팅
./gradlew spotlessCheck  # 포맷팅 검사
```

#### Check - 코드 품질 검사
```bash
cd apps/server
./gradlew check          # 코드 품질 검사
./gradlew check --info  # 상세 정보와 함께 검사
```

#### 테스트
```bash
cd apps/server
./gradlew test           # JUnit 테스트 실행
./gradlew test --info   # 상세 정보와 함께 테스트
```

### 자동 적용

#### Git Hooks (Husky)
- **커밋 시 자동 실행**: ESLint, Prettier 자동 검사 및 수정
- **문제가 있는 코드**: 커밋 불가 (코드 품질 보장)

#### 빌드 시 자동 실행
- **백엔드**: `./gradlew build` 시 Spotless, Check 자동 실행

### 공통 도구

#### EditorConfig
- IDE 설정 통일

#### Git Hooks (Husky)
- 커밋 전 자동 검증

---





---

**마지막 업데이트**: 2025년 8월 23일  
**문서 버전**: 1.0.0
