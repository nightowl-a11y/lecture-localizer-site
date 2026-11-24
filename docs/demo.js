/* 예시 화면(도구 사용 미리보기): 화면이 자동으로 넘어가고, 이전/멈추기/다음 버튼과 쪽수(N / 20)만 있는 플레이어.
   화면 그림은 assets/demo/ 에 있고, 폴더 경로·성우 ID 같은 내부 정보는 가려 두었습니다.
   [at] = 커서가 가는 자리(그림 가로·세로 %). 화면을 바꾸려면 아래 FRAMES 와 assets/demo/ 그림만 고치면 됩니다. */
(function(){
  var FRAMES = [
    { img:'01_cover.jpg', group:'시작', title:'표지', at:[50,89.7],
      desc:"표지에서 '시작하기'를 누르면 강좌를 고르는 화면으로 갑니다.", human:'시작하기 누르기', tool:'지금까지 끝낸 차시 수를 보여 줌' },
    { img:'04_course.jpg', group:'시작', title:'강좌와 주차', at:[44.2,40.2],
      desc:'과정 카드와 주차 타일. 새 과정이 올라오면 여기에 카드로 생깁니다.', human:'과정 카드 → 주차 누르기', tool:'원본 폴더를 읽어 과정 목록을 만듦 (읽기만)' },
    { img:'09_lessons.jpg', group:'시작', title:'차시 고르기', at:[35.1,49.7],
      desc:'차시는 진행률 테두리가 있는 원입니다. 누르면 하던 단계부터 이어집니다.', human:'차시 누르기', tool:'차시별 진행률과 다음 할 일, 이 PC의 마지막 작업을 기억' },
    { img:'10_check.jpg', group:'0 시작 점검', title:'시작 점검', at:[10,46.8],
      desc:'원본 파일, 프로그램, 폰트, 디스크, Adobe 상태를 자동으로 확인합니다. (폴더 경로는 가렸습니다)', human:"빨간 '중단' 항목이 있으면 안내대로 준비", tool:'통과·경고·중단으로 표시' },
    { img:'11_sub_split.jpg', group:'1 자막', title:'자막 → 문장표', at:[10,39.2],
      desc:'업체 한국어 자막(SRT)을 파트별 문장표로 바꿉니다.', human:'버튼 누르기', tool:'자막 줄을 문장 단위로 묶어 시작·끝 시각과 함께 표로 만듦' },
    { img:'12_sub_api.jpg', group:'1 자막', title:'번역 (Claude API)', at:[10,39.2],
      desc:'Claude API가 규칙과 용어집을 지켜 문장별로 번역합니다.', human:'버튼 누르기', tool:'문장 길이(말 속도)에 맞춘 영어 번역, 용어집 자동 적용' },
    { img:'13_sub_edit.jpg', group:'1 자막', title:'자막 검수', at:[10,56.2],
      desc:'한국어 옆 칸에서 영어를 바로 고치면 말 속도가 즉시 다시 계산됩니다.', human:'어색한 영어 고치기, 원어민 승인 표시', tool:'글자 수와 말 속도 계산, 너무 빠르면 색으로 알림' },
    { img:'18_gfx_extract.jpg', group:'2 화면 그래픽', title:'화면 글자 추출', at:[10,41.1],
      desc:'업체 PSD·PNG를 분석해 화면 글자를 모읍니다.', human:'버튼 누르기', tool:'PSD 글자 레이어와 PNG 파일을 짝지어 장면별 글자 목록으로' },
    { img:'19_gfx_png.jpg', group:'2 화면 그래픽', title:'영문 PNG 만들기', at:[9.5,41.1],
      desc:'Photoshop이 글자를 영어로 바꾸고 크기·줄 나누기 규칙대로 맞춰 PNG를 뽑습니다.', human:'버튼 누르기 (도는 동안 Adobe 창은 건드리지 않음)', tool:'업체 PNG와 같은 이름으로 영문 PNG 저장, 원래 파일은 자동 백업' },
    { img:'21_gfx_view.jpg', group:'2 화면 그래픽', title:'장면 비교 뷰어', at:[48.6,31.9],
      desc:'한국어와 영어 장면을 나란히 보고 OK 또는 수정 필요를 고릅니다.', human:'장면마다 OK / 수정 / 직접 수정', tool:'장면별 상태를 집계' },
    { img:'30_intro.jpg', group:'3 인트로', title:'인트로 차시명 영문화', at:[9.5,39.2],
      desc:'인트로(로고~차시명)의 차시명을 After Effects로 영어로 바꿔 렌더링합니다.', human:'버튼 누르기', tool:'After Effects 프로젝트 사본의 글자를 바꿔 30fps로 렌더' },
    { img:'31_voice.jpg', group:'4 음성', title:'영어 음성 만들기', at:[10,39.2],
      desc:'확정된 원고로 영어 음성을 문장별로 만듭니다. (성우 ID는 가렸습니다)', human:'성우 확인 후 버튼 누르기', tool:'ElevenLabs로 문장별 음성을 만들고 음량·급증·피치를 자동 보정' },
    { img:'32_voice2.jpg', group:'4 음성', title:'음성 점검', at:[10,77.6],
      desc:"확인할 문장을 골라 들어 보고, 이상하면 그 문장만 다시 뽑습니다.", human:"의심 문장 듣기 → '이 문장 다시 뽑기'", tool:'피치가 튀거나 잡음이 의심되는 문장을 표시' },
    { img:'34_video_prep.jpg', group:'5 영상', title:'영문 Premiere 프로젝트 준비', at:[10,41.1],
      desc:'업체 Premiere 프로젝트의 영문 사본을 만들고 영문 PNG와 인트로로 연결을 바꿉니다.', human:'버튼 누르기', tool:'한국어 말소리를 끄고 그림 연결을 바꿈' },
    { img:'35_video_export.jpg', group:'5 영상', title:'Premiere 내보내기', at:[9.6,41.1],
      desc:'Premiere 플러그인이 시퀀스 4개를 자동으로 내보냅니다.', human:'Premiere를 켜 두고 버튼 누르기', tool:'파트별 배경 영상 내보내기' },
    { img:'37_video_mix.jpg', group:'5 영상', title:'음성·자막 합치기', at:[10,41.1],
      desc:'배경 영상, 영어 음성, 자막을 납품 규격으로 합칩니다.', human:'버튼 누르기', tool:'1920×1080 · 30fps · H.264, 음량 맞춤, 자막은 옆 .srt 파일로' },
    { img:'39_lip_sync.jpg', group:'6 입모양', title:'입모양 맞추기', at:[10,39.2],
      desc:'말하는 구간만 sync.so로 보내 교수님 입모양을 영어 음성에 맞춥니다.', human:'버튼 누르기', tool:'구간 클립을 뽑아 보내고 결과를 받음 (외부 서비스)' },
    { img:'41_lip_merge.jpg', group:'6 입모양', title:'더빙판 영상 만들기', at:[9.5,39.2],
      desc:'받은 구간을 번역본에 끼워 더빙판을 만듭니다.', human:'버튼 누르기', tool:'구간을 끼우고 소리·자막은 번역본 그대로 둠' },
    { img:'42_qc.jpg', group:'7 검사', title:'자동 검사 보고서', at:[9.1,39.2],
      desc:'규격, 길이, 자막, 소리 크기를 확인해 보고서로 남깁니다.', human:'결과 읽기', tool:'파트별 통과/확인 표를 만듦' },
    { img:'43_video_review.jpg', group:'8 확인', title:'영상 보기·검수', at:[10,37.9],
      desc:'원본·번역본·더빙판을 같은 시점으로 바꿔 보며 시각 메모를 남깁니다.', human:'끝까지 보며 메모', tool:'메모를 종류별로 모아 검수 반영 요청 파일로 만듦' }
  ];
  var BASE = 'assets/demo/', INTERVAL = 4500;
  var root = document.getElementById('demo'); if(!root) return;
  var reduce = false; try{ reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
  var i = 0, timer = null, started = false;

  function el(tag, cls, text){ var e = document.createElement(tag); if(cls) e.className = cls; if(text != null) e.textContent = text; return e; }
  root.innerHTML = '';
  var win = el('div', 'player');
  var bar = el('div', 'player-bar');
  var dots = el('span', 'dots'); dots.setAttribute('aria-hidden', 'true'); dots.innerHTML = '<i></i><i></i><i></i>';
  var ptitle = el('span', 'player-title', '강의 현지화 도구 · 예시 화면');
  bar.appendChild(dots); bar.appendChild(ptitle);
  var shot = el('div', 'demo-shot');
  var img = el('img'); img.width = 1280; img.height = 800; img.alt = '';
  var cursor = el('div', 'demo-cursor');
  cursor.innerHTML = '<span class="ring"></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2l15 9-6.5 1.5L16 20l-3 1.4-3.4-7.4L4 18z" fill="#fff" stroke="#0E1116" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  var prog = el('div', 'demo-prog'); var progIn = el('i'); prog.appendChild(progIn);
  shot.appendChild(img); shot.appendChild(cursor); shot.appendChild(prog);
  var pos = el('div', 'demo-pos');
  var ctrl = el('div', 'demo-ctrl');
  var bPrev = el('button', 'demo-btn', '← 이전'); bPrev.type = 'button';
  var bPlay = el('button', 'demo-btn demo-play', '▶ 자동으로 넘기기'); bPlay.type = 'button';
  var bNext = el('button', 'demo-btn', '다음 →'); bNext.type = 'button';
  ctrl.appendChild(pos); ctrl.appendChild(bPrev); ctrl.appendChild(bPlay); ctrl.appendChild(bNext);
  win.appendChild(bar); win.appendChild(shot); win.appendChild(ctrl);

  root.appendChild(win);

  function draw(){
    var f = FRAMES[i];
    img.src = BASE + f.img; img.alt = f.title + ' 화면';
    pos.textContent = (i + 1) + ' / ' + FRAMES.length;
    cursor.classList.remove('click');
    if(f.at){ cursor.hidden = false; void cursor.offsetWidth; cursor.style.left = f.at[0] + '%'; cursor.style.top = f.at[1] + '%'; cursor.classList.add('click'); } else cursor.hidden = true;
    bPrev.disabled = (i === 0); bNext.disabled = (i === FRAMES.length - 1);
    progIn.style.transition = 'none'; progIn.style.width = '0'; void progIn.offsetWidth;
    if(timer){ progIn.style.transition = 'width ' + INTERVAL + 'ms linear'; progIn.style.width = '100%'; }
    if(FRAMES[i + 1]){ var pre = new Image(); pre.src = BASE + FRAMES[i + 1].img; }
  }
  function stop(){ if(timer){ clearInterval(timer); timer = null; } bPlay.textContent = '▶ 자동으로 넘기기'; progIn.style.transition = 'none'; progIn.style.width = '0'; }
  function play(){
    if(timer) return;
    if(i >= FRAMES.length - 1){ i = 0; draw(); }
    bPlay.textContent = '❚❚ 멈추기';
    progIn.style.transition = 'width ' + INTERVAL + 'ms linear'; progIn.style.width = '100%';
    timer = setInterval(function(){ if(i < FRAMES.length - 1){ i++; draw(); } else stop(); }, INTERVAL);
  }
  bPrev.addEventListener('click', function(){ stop(); if(i > 0){ i--; draw(); } });
  bNext.addEventListener('click', function(){ stop(); if(i < FRAMES.length - 1){ i++; draw(); } });
  bPlay.addEventListener('click', function(){ if(timer) stop(); else play(); });
  draw();
  // 화면에 처음 보일 때 한 번 자동으로 시작(움직임 줄이기 설정이면 시작하지 않음). 직접 누르면 멈춤.
  if(!reduce && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting && !started){ started = true; play(); io.disconnect(); } }); }, { threshold: 0.5 });
    io.observe(win);
  }
})();
