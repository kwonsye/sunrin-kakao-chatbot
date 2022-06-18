# Kakao Chatbot #1

## 준비사항

1. 플러스친구 생성
    - https://center-pf.kakao.com/create

2. 챗봇 생성
    - 챗봇 관리자센터 OBT 계정을 신청
        - 플러스친구 채널 공개 상태로 바꿔야함
        - https://chatbot.kakao.com/obt/registration
    - 승인 후 오픈빌더 관리자 사이트 접속
        - https://i.kakao.com/openbuilder

<br>

## 기술스택
- Runtime
    - Node.js
- Framework
    - Nest.js
- Language
    - Javascript
- DB
    - Embedded in-memory DB
        - LowDB(https://github.com/typicode/lowdb)
        - SQLite
- OS
    - Linux Ubuntu
- Library
    - Web crawling
        - Nightmare(https://github.com/segmentio/nightmare)
- Deploy
    - AWS Lightsail

<br>

## 개발 순서 및 계획

1. 카카오 챗봇 문서 살펴보기
    - 챗봇 관리자센터 이것저것 만져보기
2. API 서버 코딩(+간단한 테스트)
    - Nest.js 맛보기
3. 학교 홈페이지 학식 정보 크롤링 해보기
    - 크롤링 / 클릭 이벤트
4. API 서버 배포와 챗봇 테스트
    - AWS lambda
5. 크롤링 자동화와 데이터 DB 저장
    - crontab
6. (일정시간에 알림보내기)
    - 챗봇 Event API
    - 유료
7. 추가 기능 기획