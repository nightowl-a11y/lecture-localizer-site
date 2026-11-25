(function(){
  var c = window.AIEN_SITE || {};
  function $all(s){return Array.prototype.slice.call(document.querySelectorAll(s));}
  $all('[data-ver]').forEach(function(e){
    e.textContent = c.version ? 'v' + c.version : '버전 번호: 11/18 확정 예정';
  });
  $all('[data-updated]').forEach(function(e){
    e.textContent = c.updated || '갱신일: 확정 예정';
  });
  $all('[data-contact]').forEach(function(e){
    e.textContent = c.contact || '연락처: 사용자 결정 예정';
  });
  function wire(sel, url, readyText, offText){
    $all(sel).forEach(function(a){
      if(url){ a.href = url; a.classList.remove('off'); a.firstChild.textContent = readyText; if(/^https?:/.test(url)){ a.target = '_blank'; a.rel = 'noopener'; } }
      else { a.removeAttribute('href'); a.classList.add('off'); a.setAttribute('aria-disabled','true'); a.firstChild.textContent = offText; }
    });
  }
  wire('[data-dl]', c.downloadUrl, '도구 내려받기', '도구 내려받기');
  wire('[data-update]', c.updateUrl, '업데이트 파일 내려받기', '업데이트 파일 내려받기');
  $all('[data-update] small').forEach(function(s){ s.textContent = c.updateUrl ? '' : '준비 중'; });
  $all('[data-dl] small').forEach(function(s){ s.textContent = c.downloadUrl ? '' : '준비 중 · 11/18 확정 예정'; });
  $all('[data-dlnote]').forEach(function(e){ e.textContent = c.downloadNote || ''; });
  // 배포 준비 상태: 주소가 있을 때만 '내려받기'가 가장 강한 버튼이 되고, 없으면 '설치 전 확인하기'가 주 버튼.
  var ready = !!c.downloadUrl;
  $all('[data-state]').forEach(function(e){ e.textContent = ready ? '현재 배포본' : '배포 준비 중'; });
  if(ready){
    $all('[data-prenote]').forEach(function(e){ e.textContent = '내려받기 전에 아래 PC 조건을 먼저 확인해 주세요.'; });
    $all('[data-check]').forEach(function(a){ a.classList.add('ghost'); });
    $all('[data-dl]').forEach(function(a){ a.classList.remove('ghost'); a.parentNode.insertBefore(a, a.parentNode.firstChild); });
  }
  $all('[data-specsum]').forEach(function(e){
    if(c.minSpecs && c.minSpecs.length){
      e.textContent = c.minSpecs.slice(0,3).map(function(x,i){ return i === 0 ? x.text : x.title + ' ' + x.text.replace(/ \(.*\)$/, ''); }).join(' · ');
    }
  });
  // 도움 요청 = 메일(mailto). 주소·제목 접두사·분류·본문 양식은 config.js 의 helpMail.
  function mailto(to, subject, notice, fields){
    var lines = [notice, ''].concat(fields.map(function(f){ return f + ' '; }));
    // 학교 PC에 기본 메일 앱이 없어도 열리도록 Gmail 웹 쓰기 창을 연다 (사용자 요청 11/25).
    return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) + '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
  }
  function helpHref(el){
    if(c.helpUrl) return c.helpUrl;
    var m = c.helpMail; if(!m || !m.to) return null;
    var page = location.pathname.split('/').pop() || 'index.html';
    var key = el.getAttribute('data-cat') || (m.pageCategory && m.pageCategory[page]) || m.defaultCategory;
    return mailto(m.to, m.prefix + (m.categories[key] || '') + ' ', m.bodyNotice, m.bodyFields);
  }
  function reportHref(){
    var m = c.reportMail; if(!m || !m.to) return null;
    return mailto(m.to, m.prefix + m.category + ' ', m.bodyNotice, m.bodyFields);
  }
  $all('[data-help], [data-help-mini], [data-report]').forEach(function(a){
    var isReport = a.hasAttribute('data-report');
    var h = isReport ? reportHref() : helpHref(a);
    var label = isReport ? '사이트 오류 신고' : (a.hasAttribute('data-help-mini') ? '도움 요청' : '설치·사용 문의');
    var s = a.querySelector('small');
    if(h){ a.href = h; a.target = '_blank'; a.rel = 'noopener'; a.classList.remove('off'); a.removeAttribute('aria-disabled'); a.firstChild.textContent = label; if(s) s.textContent = 'Gmail로 작성'; }
    else { a.removeAttribute('href'); a.classList.add('off'); a.firstChild.textContent = label; if(s) s.textContent = '준비 중'; }
  });
  // Gmail 창이 안 열릴 때를 위한 주소 복사 (사용자 요청 11/25)
  var seen = [];
  $all('[data-help], [data-report]').forEach(function(a){
    var box = a.parentNode; if(!box || seen.indexOf(box) >= 0 || !box.classList.contains('btns')) return; seen.push(box);
    var p = document.createElement('p'); p.className = 'copyrow';
    p.appendChild(document.createTextNode('메일 창이 열리지 않으면 주소를 복사해 쓰세요: '));
    [['문의 주소 복사', c.helpMail && c.helpMail.to], ['신고 주소 복사', c.reportMail && c.reportMail.to]].forEach(function(x){
      if(!x[1]) return;
      var b = document.createElement('button'); b.type = 'button'; b.className = 'copybtn'; b.textContent = x[0];
      b.addEventListener('click', function(){
        function done(){ b.textContent = '복사됨: ' + x[1]; setTimeout(function(){ b.textContent = x[0]; }, 3000); }
        try{ navigator.clipboard.writeText(x[1]).then(done, function(){ window.prompt('주소를 복사하세요', x[1]); }); }
        catch(e){ window.prompt('주소를 복사하세요', x[1]); }
      });
      p.appendChild(b); p.appendChild(document.createTextNode(' '));
    });
    box.parentNode.insertBefore(p, box.nextSibling);
  });
  var specs = document.getElementById('specs');
  if(specs && c.minSpecs){
    c.minSpecs.forEach(function(x){
      var d = document.createElement('div'); d.className = 'card';
      var h = document.createElement('h3'); h.textContent = x.title;
      var p = document.createElement('p'); p.textContent = x.text;
      d.appendChild(h); d.appendChild(p); specs.appendChild(d);
    });
  }
  // 현재 페이지 메뉴 표시
  var p = location.pathname.split('/').pop() || 'index.html';
  $all('header.top a[href]').forEach(function(a){ if(a.getAttribute('href')===p){ a.classList.add('on'); a.setAttribute('aria-current','page'); } });
  // 기여 표기 워터마크(공통 세션 결정 11/13): 지워지거나 숨겨져도 다시 넣음. 다크 모드에서만 글자색을 흰색으로.
  (function(){
    var STYLE = 'position:fixed!important;right:8px!important;bottom:3px!important;z-index:2147483647!important;display:block!important;visibility:visible!important;font:300 10px/1 sans-serif!important;color:COLOR!important;opacity:.13!important;pointer-events:none!important;user-select:none!important;white-space:nowrap!important';
    function color(){ return document.documentElement.getAttribute('data-theme') === 'dark' ? '#fff' : '#000'; }
    function ensure(){
      var e = document.getElementById('aien-credit');
      if(!e){ e = document.createElement('div'); e.id = 'aien-credit'; e.setAttribute('aria-hidden','true'); e.textContent = '제작: 에듀테크혁신팀 고유진'; document.body.appendChild(e); }
      var st = STYLE.replace('COLOR', color());
      if(e.getAttribute('style') !== st) e.setAttribute('style', st);
    }
    ensure();
    try{ new MutationObserver(ensure).observe(document.body, {childList:true, subtree:true, attributes:true}); }catch(x){}
    try{ new MutationObserver(ensure).observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']}); }catch(x2){}
    // 다크 모드 규칙: 기본은 자동 = 저녁 6시~아침 6시이거나 PC 설정이 다크이면 다크 (사용자 결정 11/16).
    // 표지의 버튼으로 라이트/다크를 고르면 그 값을 이 브라우저에만 저장(localStorage 'aien-theme')하고 모든 페이지에 적용.
    var MODES = ['auto', 'light', 'dark'];
    function getMode(){ var m = 'auto'; try{ m = localStorage.getItem('aien-theme') || 'auto'; }catch(e){} return MODES.indexOf(m) < 0 ? 'auto' : m; }
    function resolve(){
      var m = getMode(); if(m !== 'auto') return m;
      var h = new Date().getHours(), night = (h >= 18 || h < 6), os = false;
      try{ os = matchMedia('(prefers-color-scheme: dark)').matches; }catch(e){}
      return (night || os) ? 'dark' : 'light';
    }
    function applyTheme(){
      var t = resolve(), root = document.documentElement;
      if(root.getAttribute('data-theme') !== t){
        root.setAttribute('data-theme', t);
        var art = document.getElementById('cover-art');
        if(art) art.src = 'assets/cover-' + t + '.jpg';
      }
    }
    setInterval(applyTheme, 60000);
    try{ matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme); }catch(y){}
    // 표지 버튼: 처음엔 자동(시간·PC 설정)이고, 누르면 라이트 ↔ 다크만 바꿈. 고른 값은 이 브라우저에만 저장.
    var btn = document.getElementById('theme-toggle');
    if(btn){
      var paint = function(){
        var dark = document.documentElement.getAttribute('data-theme') === 'dark';
        btn.setAttribute('aria-checked', dark ? 'true' : 'false');
        btn.setAttribute('aria-label', '화면 모드 바꾸기. 지금은 ' + (dark ? '다크' : '라이트') + ', 누르면 ' + (dark ? '라이트' : '다크'));
      };
      paint();
      new MutationObserver(paint).observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});
      btn.addEventListener('click', function(){
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        try{ localStorage.setItem('aien-theme', next); }catch(e){}
        applyTheme();
      });
    }  })();
})();
