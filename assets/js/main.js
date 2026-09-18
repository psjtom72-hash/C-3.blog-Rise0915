// ===== PRESTAR 공통 스크립트 =====
(function () {
  // 모바일 메뉴
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // 현재 페이지 메뉴 활성화
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });

  // 스크롤 등장 애니메이션
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add('in'));
  }

  // 연도
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // 상담신청 폼
  const form = document.getElementById('contactForm');
  if (form) {
    const msg = document.getElementById('formMsg');
    const show = (text, type) => { msg.textContent = text; msg.className = 'form-msg show ' + type; };

    // 연락처 자동 하이픈
    const phone = form.querySelector('#phone');
    phone.addEventListener('input', () => {
      let v = phone.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 7) v = v.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
      else if (v.length > 3) v = v.replace(/(\d{3})(\d+)/, '$1-$2');
      phone.value = v;
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      if (!d.name.trim() || !d.phone.trim() || !d.message.trim()) {
        return show('이름, 연락처, 문의내용은 꼭 입력해 주세요.', 'err');
      }
      if (!/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(d.phone)) {
        return show('연락처 형식을 확인해 주세요. (예: 010-1234-5678)', 'err');
      }
      if (!form.querySelector('#agree').checked) {
        return show('개인정보 수집·이용에 동의해 주세요.', 'err');
      }

      /*
       * ──────────────────────────────────────────────────────────
       *  [안내] 실제 전송 로직은 이메일 서비스 연동이 필요합니다.
       *  현재는 백엔드가 없으므로 사용자의 메일 프로그램(mailto)을
       *  열어 내용을 전달하는 방식으로 동작합니다.
       *
       *  운영 전 아래 중 하나로 교체를 권장합니다.
       *   - Formspree / Getform 등 폼 전송 서비스
       *   - EmailJS (프론트엔드만으로 메일 발송)
       *   - 자체 서버 API (예: fetch('/api/contact', {method:'POST', body: ...}))
       * ──────────────────────────────────────────────────────────
       */
      const subject = `[홈페이지 상담신청] ${d.company || '회사명 미기재'} / ${d.name}`;
      const body =
        `이름: ${d.name}\n연락처: ${d.phone}\n회사명: ${d.company || '-'}\n` +
        `관심 분야: ${d.topic || '-'}\n\n문의내용:\n${d.message}`;
      const to = 'presta_kor@naver.com';
      const cc = 'prestar_fn@naver.com';
      window.location.href =
        `mailto:${to}?cc=${cc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      show('메일 프로그램이 열리면 전송 버튼을 눌러 주세요. 메일 앱이 열리지 않으면 010-4234-4289로 연락 주시기 바랍니다.', 'ok');
    });
  }
})();
