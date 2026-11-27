// 11/18 코드 동결·배포본 확정 뒤에 채우는 값입니다. null 이면 화면에 '준비 중'으로 나옵니다.
// 키·접속 코드·내부 주소는 절대 여기에 쓰지 않습니다(공개 저장소). 공개되는 연락처는 아래 두 가지뿐입니다.
window.AIEN_SITE = {
  version: "1.0.5",    // 배포본 AIEN_tool_1.0.5.zip (공통 세션, 11/24 만듦)
  updated: "2026-11-27",   // 배포본을 만든 날
  downloadUrl: "https://drive.google.com/file/d/1IUL8FFLtRZjpZ_oKGdlz7MpXKTQ12Oin/view?usp=sharing",   // 학교 구글 드라이브 링크 (사용자 결정 11/24, 한양대 계정만 열람)
  updateUrl: "https://drive.google.com/file/d/1vL9wCZKqMutdDEoRE4ncEbBk-sm2VbeH/view?usp=sharing",   // 이미 설치한 분용 AIEN_update_1.0.4.zip (18.5MB, 사용자 업로드 11/25)
  downloadNote: "한양대학교 계정으로 로그인해야 열립니다.",   // 내려받기 버튼 아래 안내 (사용자 결정 11/24)
  contact: "에듀테크혁신팀 고유진 · 02-2220-2065 · nightowl@hanyang.ac.kr",  // 사용자 결정 11/13

  // 최소 배포 사양 (개발 PC 기준 권장값 - 바뀔 수 있음). 사용자 결정 11/13: 사이트에는 이것만 표시.
  minSpecs: [
    { title: "Windows", text: "Windows 10/11 64비트" },
    { title: "메모리(RAM)", text: "16GB 이상" },
    { title: "디스크 여유", text: "100GB 이상 (차시 하나 약 20GB + 백업)" },
    { title: "Adobe", text: "Photoshop · After Effects · Premiere 설치·로그인. 동시 로그인은 2대까지이고, 자동 업데이트는 꺼 주세요." },
    { title: "인터넷", text: "인터넷 연결" }
  ],
  // 도움 요청 = 메일(mailto). 사용자 결정 11/13.
  helpMail: {
    to: "nightowl@hanyang.ac.kr",   // 도움 요청 = 고유진 님에게 (사용자 결정 11/13)
    prefix: "[강의 번역 도구 문의]",
    // 분류는 여기서 바꾸거나 더할 수 있습니다. 버튼/쪽의 기본 분류는 아래 pageCategory.
    categories: { tool: "[도구 사용]", install: "[도구 설치]", review: "[검수 사이트]" },
    defaultCategory: "tool",
    pageCategory: { "guide.html": "install" },   // 이 쪽에서 누르면 이 분류
    bodyNotice: "※ 키·비밀번호는 쓰지 마세요.",
    bodyFields: ["이름:", "PC(예: 회사 노트북):", "차시·단계:", "무슨 일이 있었나요?:", "마지막 오류 줄(있으면):"]
  },
  // 문제 리포트 = 사이트 관련 문제(검수 사이트·이 안내 사이트)를 hymooc 공용 계정으로. 사용자 결정 11/13.
  reportMail: {
    to: "hymooc@hanyang.ac.kr",
    prefix: "[강의 번역 도구 문의]",
    category: "[검수 사이트]",
    bodyNotice: "※ 키·비밀번호는 쓰지 마세요.",
    bodyFields: ["이름:", "어느 사이트·화면에서?(검수 사이트 / 안내 사이트):", "무슨 문제가 있었나요?:", "주소창의 주소(있으면):", "화면에 나온 오류 문구(있으면):"]
  },
  helpUrl: null        // (선택) 메일 대신 다른 주소로 보내고 싶을 때만 채움. 비어 있으면 위 메일 사용
};
