# PRESTAR 회사소개 웹사이트

정적 HTML/CSS/JS 사이트입니다. 빌드 없이 `index.html`을 더블클릭하면 바로 열립니다.

## 폴더 구조
```
prestar-website/
├─ index.html        홈 (Hero · 핵심 강점 · 고객 · 진행 절차 · CTA)
├─ services.html     서비스소개 (사업영역 9가지, 고민→해결 구조)
├─ about.html        회사소개 (소개 · 강점 · 회사 정보)
├─ contact.html      문의/상담신청 (폼 + 연락처)
├─ assets/
│  ├─ css/style.css  공통 스타일 (남색 계열, 반응형)
│  ├─ js/main.js     모바일 메뉴 · 스크롤 애니메이션 · 폼 처리
│  └─ img/           이미지 보관용 (로고 등)
└─ README.md
```

## 운영 전 확인할 것
1. `[내용 확인 후 채워주세요]` 표시 부분 채우기 (대표자, 설립일, 주소, 사업자등록번호, 개인정보 처리방침)
2. 상담 폼 실제 전송 연동 — 현재는 mailto(메일 앱 열기) 방식. Formspree, EmailJS 등으로 교체 권장 (`assets/js/main.js` 주석 참고)
3. 로고 이미지가 있으면 `assets/img/`에 넣고 헤더의 `.logo-mark` 교체

## 배포
Netlify / Vercel / GitHub Pages / Cloudflare Pages에 폴더를 그대로 업로드하면 됩니다.
