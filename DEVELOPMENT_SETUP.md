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

### 2. 루트 의존성 설치 (Git Hooks) ⚠️ 필수!
```bash
# 🚨 반드시 먼저 실행해야 합니다!
# Husky와 Git hooks가 포함된 루트 의존성을 설치합니다
npm install

# ✅ 이 단계가 완료되면 Git hooks가 자동으로 활성화됩니다
# .husky/ 폴더가 Git에 포함되어 있어서 별도 설정이 필요 없습니다
```

### 3. 프론트엔드 설정 (apps/mobile)
```bash
cd apps/mobile
npm install
```







---

## 🖥️ 실행 방법

### 프론트엔드 개발 서버
```bash
cd apps/mobile
npm run ios        # iOS 시뮬레이터에서 실행
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





### 자동 적용

#### Git Hooks (Husky) - 자동 관리
- **자동 설정**: `.husky/` 폴더가 Git에 포함되어 자동으로 hooks 활성화
- **커밋 시 자동 실행**: ESLint, Prettier 자동 검사 및 수정
- **문제가 있는 코드**: 커밋 불가 (코드 품질 보장)
- **권한 설정 불필요**: `chmod +x .husky/*` 명령어가 더 이상 필요하지 않음



### 공통 도구

#### EditorConfig
- IDE 설정 통일

#### Git Hooks (Husky) - 현대적 방식
- **자동 관리**: `.husky/` 폴더가 Git에 포함되어 push/pull 시 자동 동기화
- **권한 설정 불필요**: `chmod +x .husky/*` 명령어가 더 이상 필요하지 않음
- **팀 협업**: 모든 팀원이 동일한 Git hooks 설정을 자동으로 공유
- **커밋 전 자동 검증**: 코드 품질 보장

### 🔄 팀원들이 알아야 할 중요사항

#### Git Hooks 자동 동기화
- **Pull 받은 후**: Git hooks가 자동으로 활성화됩니다
- **권한 설정 불필요**: `chmod +x .husky/*` 명령어를 실행할 필요가 없습니다
- **설정 공유**: 팀원이 추가한 Git hooks 설정도 자동으로 공유됩니다

#### 문제 해결
- **Git hooks가 작동하지 않는 경우**: `npm install`을 다시 실행해보세요
- **권한 오류 발생 시**: `.husky/` 폴더의 권한을 확인하고 필요시 `chmod +x .husky/*` 실행

---





---

**마지막 업데이트**: 2025년 1월 23일  
**문서 버전**: 1.2.0
