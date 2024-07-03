# 노마드 코더 React 마스터 강좌 넷플릭스 클론

## 개발환경


* 프로젝트 환경설정 React 프로젝트(CRA) 설치 : `npx create-react-app "앱이름"`  <br />

*  React 중앙집중식 상태 관리 라이브러리 Recoil 설치 : `npm install recoil` <br />

*  페이지 간의 네비게이션을 위한 React-Router 설치 :` npm install react-router`  <br />

*  스타일링을 위한 CSS-in-JS 라이브러리 Styled-Components 설치 : `npm install styled-components`  <br />

*  애니메이션을 위한 Framer-Motion 라이브러리 설치 :` npm install framer-motion `  <br />

*  터치 슬라이더를 위한 Swiper 라이브러리 설치 : `npm install swiper`  <br />

*  폼 관리를 위한 react-hook-form 설치 : `npm install react-hook-form`   <br />

*  브라우저 라우팅을 위한 react-router-dom 설치 :` npm install react-router-dom`  <br />


##  프로젝트 구조

```
src
├── apis/*              # 영화/드라마 API 폴더
├── assets              # static 폴더
│   └── images/*        # image 폴더
├── components          # 리액트 컴포넌트 폴더
│   ├── movie/*         # 영화 컴포넌트 폴더  
│   │   ├── BigScreen.tsx   # 영화 정보 모달창 컴포넌트
│   │   └── slider.ts       # 영화 정보 슬라이드 컴포넌트
│   ├── tv/*            # 드라마 컴포넌트 폴더 
│   │   ├── BigSeries.tsx   # 드라마 정보 모달창 컴포넌트
│   │   └── slider.ts       # 드라마 정보 모달창 컴포넌트
│   ├── search/*        # 검색 컴포넌트 폴더 
│   │   ├── BigMovieSearch.tsx    # 영화 검색 컴포넌트
│   │   ├── BigSeriesSearch.tsx   # 드라마 검색 컴포넌트
│   │   └── modal.tsx             # 검색 모달창 컴포넌트
│   └── Header.tsx      # Header 컴포넌트
├── Routes/*            # 리액트 라우터 폴더
│   ├── Home.tsx        # 메인페이지 컴포넌트
│   ├── Search.tsx      # 드라마 컴포넌트 
│   └── TV.tsx          # TV 컴포넌트
├── utils/*             # JS 유틸 폴더
├── App.tsx             # 컴포넌트 관계 정의 컴포넌트.tsx
├── index.tsx           # 메인 컴포넌트.tsx
└── theme.ts            # 컬러 설정
```



### 웹 화면 

#### 메인 화면

![image](https://github.com/dongridongil/dongfilx_clone/assets/108976641/68dd8e27-02a8-4b1a-aa03-46ac6dd48d1d)

#### Series 화면

![image](https://github.com/dongridongil/dongfilx_clone/assets/108976641/cae41d32-130b-4d84-b418-8558f07d5cb9)

#### 모달 화면

![image](https://github.com/dongridongil/dongfilx_clone/assets/108976641/ec40b214-2f92-4f48-bbdb-a686487b0521)


