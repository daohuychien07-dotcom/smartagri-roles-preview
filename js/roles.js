/* ============================================================
   SmartAgri - Phân quyền giao diện theo vai trò (dùng cho 3 khối trang)
   CropMate AI - CSE122 BTL

   Site gồm 3 khối, mỗi khối giữ HTML/CSS/JS riêng:
     * gốc         : 7 trang quản trị HTX (dashboard/households/schedule/
                     reports/index(cây trồng)/users/settings)
     * chuyen-gia/ : 9 trang không gian Chuyên gia + AI (app độc lập của SV2)
     * nong-dan/   : 7 trang không gian Nông dân (Season Dashboard +
                     mùa vụ, nhật ký, thời tiết, trợ lý AI, hỗ trợ, cài đặt)

   Vai trò đã chọn ở login.html lưu trong localStorage['smartagri_role_v1'].
   Script này đọc vai trò và:
     1) hiện trong menu ĐÚNG các trang của vai trò đó (ẩn phần còn lại,
        kể cả tiêu đề nhóm khi cả nhóm bị ẩn),
     2) chặn mở trang ngoài phạm vi -> đưa về trang nhà của vai trò,
        chưa đăng nhập -> về login.html,
     3) ẩn link nội bộ trỏ sang trang bị chặn (chuông, footer, panel tài
        khoản, liên kết trong nội dung của cả 3 khối),
     4) đếm lại badge quả chuông sau khi ẩn, để số trên chuông khớp số dòng
        thông báo vai trò đó thực sự mở được,
     5) chạy cả sau khi sidebar được JS sinh ra (MutationObserver),
     6) nối nút Đăng xuất của khối Nông dân với phiên chung.
   Đổi phạm vi một vai trò: chỉ cần sửa ROLE_MENUS ở dưới.
   ============================================================ */
(function () {
  'use strict';

  var ROLE_KEY = 'smartagri_role_v1';

  /* ---- 1) TRANG CỦA SITE: đường dẫn tương đối từ gốc -> khoá trang ---- */
  var PATH_KEY = {
    /* khối quản trị HTX (thư mục gốc) */
    'dashboard.html': 'dashboard', 'households.html': 'households',
    'schedule.html': 'schedule', 'reports.html': 'reports',
    'index.html': 'crops', 'users.html': 'users', 'settings.html': 'settings',
    /* khối Chuyên gia: app độc lập của SV2, 9 trang + login riêng */
    'chuyen-gia/dashboard.html': 'exp-home', 'chuyen-gia/index.html': 'support',
    'chuyen-gia/journal.html': 'journal', 'chuyen-gia/alerts.html': 'alerts',
    'chuyen-gia/households.html': 'exp-households',
    'chuyen-gia/library.html': 'library', 'chuyen-gia/experts.html': 'experts',
    'chuyen-gia/reports.html': 'exp-reports',
    'chuyen-gia/settings.html': 'exp-settings',
    /* khối Nông dân */
    'nong-dan/index.html': 'farm-home', 'nong-dan/season.html': 'farm-season',
    'nong-dan/diary.html': 'farm-diary', 'nong-dan/weather.html': 'farm-weather',
    'nong-dan/ai.html': 'farm-ai', 'nong-dan/support.html': 'farm-support',
    'nong-dan/settings.html': 'farm-settings'
  };
  var KEY_PATH = {};
  Object.keys(PATH_KEY).forEach(function (p) { KEY_PATH[PATH_KEY[p]] = p; });

  /* ---- 2) MENU RIÊNG CỦA TỪNG VAI TRÒ ----
     Mỗi vai trò chỉ thấy đúng khối trang của mình, không dùng chung mục nào:
       admin  -> 4 trang quản trị hệ thống (thư mục gốc)
       coop   -> 3 trang vận hành hợp tác xã (thư mục gốc)
       expert -> 9 trang không gian chuyên gia (thư mục chuyen-gia/)
       farmer -> 7 trang không gian nông dân (thư mục nong-dan/)
     Đổi phạm vi: sửa mảng bên dưới, không cần đụng HTML. */
  var ROLE_MENUS = {
    /* Quản trị viên: hệ thống, con người, cấu hình */
    admin: ['dashboard', 'crops', 'users', 'settings'],
    /* Điều phối HTX: vận hành hợp tác xã */
    coop: ['households', 'schedule', 'reports'],
    /* Chuyên gia nông nghiệp: đúng 9 trang của app SV2 */
    expert: ['exp-home', 'support', 'journal', 'alerts', 'exp-households',
             'library', 'experts', 'exp-reports', 'exp-settings'],
    /* Nông dân: làm việc trong không gian riêng (Season Dashboard) */
    farmer: ['farm-home', 'farm-season', 'farm-diary', 'farm-weather',
             'farm-ai', 'farm-support', 'farm-settings']
  };

  var ROLE_HOME = { admin: 'dashboard', coop: 'households', expert: 'exp-home', farmer: 'farm-home' };
  var LABEL = { admin: 'Quản trị viên', coop: 'Điều phối HTX', expert: 'Chuyên gia', farmer: 'Nông dân' };

  var ITEM_SEL = '.nav-item, .nav__item, .side-link';

  /* Link không bao giờ bị ẩn: logo, chip tài khoản, thẻ chọn vai trò */
  var SKIP = '.brand, .logo, .user-chip, .role-card, [data-role-keep]';

  /* ---- 3) khối + thư mục gốc của site ---- */
  var here = location.pathname.replace(/\\/g, '/');
  var dir = here.replace(/[^/]*$/, '');                       /* thư mục chứa trang hiện tại */
  var BLOCK = /\/chuyen-gia\/$/.test(dir) ? 'chuyen-gia/'
            : /\/nong-dan\/$/.test(dir) ? 'nong-dan/' : '';
  var baseDir = dir.replace(/(chuyen-gia|nong-dan)\/$/, '');   /* thư mục gốc của site */
  var currentFile = here.split('/').pop() || 'index.html';
  var currentKey = PATH_KEY[(BLOCK === '' ? '' : BLOCK) + currentFile] || null;

  function relOf(href) {
    if (!href || /^[#?]/.test(href) || /^(javascript|mailto|tel):/i.test(href)) return '';
    try {
      var u = new URL(href, location.href);
      if (u.origin !== location.origin || u.pathname.indexOf(baseDir) !== 0) return '';
      return decodeURIComponent(u.pathname).slice(baseDir.length);
    } catch (e) { return ''; }
  }
  function keyOfHref(href) { return PATH_KEY[relOf(href)] || null; }

  /* Đường dẫn tương đối tới một khoá trang, tính từ trang hiện tại */
  function urlFor(k) {
    var rel = KEY_PATH[k];
    if (!rel) return k;
    if (rel.indexOf(BLOCK) === 0) return rel.slice(BLOCK.length);   /* cùng khối */
    return (BLOCK ? '../' : '') + rel;                              /* chéo khối */
  }
  function loginUrl() { return BLOCK ? '../login.html' : 'login.html'; }

  /* ---- 4) phiên đăng nhập ---- */
  function norm(s) {
    return String(s == null ? '' : s).toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[Đđ]/g, 'd');
  }
  function readRole() {
    try { return JSON.parse(localStorage.getItem(ROLE_KEY) || 'null'); } catch (e) { return null; }
  }
  var saved = readRole();
  var signedIn = !!(saved && (saved.role || saved.short));

  function keyOfRole(s) {
    var direct = norm(s && (s.scope || s.key));
    if (ROLE_MENUS[direct]) return direct;
    var r = norm(s && (s.role || s.short));
    if (/admin|quan tri/.test(r)) return 'admin';
    if (/chuyen gia|expert/.test(r)) return 'expert';
    if (/hop tac xa|ieu phoi|coop/.test(r)) return 'coop';
    return 'farmer';
  }

  var roleKey = signedIn ? keyOfRole(saved) : null;
  var menu = roleKey ? ROLE_MENUS[roleKey] : [];
  function allow(k) { return menu.indexOf(k) > -1; }

  /* ---- 5) ẩn / hiện ---- */
  function hide(el) {
    el.style.setProperty('display', 'none', 'important');
    el.setAttribute('hidden', '');
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('data-role-hidden', '1');
  }
  function show(el) {
    el.style.removeProperty('display');
    el.removeAttribute('hidden');
    el.removeAttribute('aria-hidden');
    el.removeAttribute('data-role-hidden');
  }
  function isHidden(el) {
    return el.hasAttribute('data-role-hidden') || el.style.display === 'none';
  }

  /* Dọn <li> đã trống sau khi ẩn link, để chuông/menu không còn dòng rỗng */
  function pruneEmptyParent(el) {
    var p = el.parentElement;
    if (!p || p.tagName !== 'LI' || isHidden(p)) return;
    var kids = p.childNodes;
    for (var i = 0; i < kids.length; i++) {
      var n = kids[i];
      if (n.nodeType === 3) { if (n.nodeValue.replace(/\s+/g, '')) return; continue; }
      if (n.nodeType === 1 && !isHidden(n)) return;
    }
    hide(p);
  }

  function isGroup(el) {
    return el && el.nodeType === 1 &&
      /(^|\s)(nav-group|nav__group|sidebar__group|side-group)(\s|$)/.test(el.className || '');
  }

  function hasVisibleItem(el) {
    var nodes = [];
    if (el.matches && el.matches(ITEM_SEL)) nodes.push(el);
    if (el.querySelectorAll) {
      var inner = el.querySelectorAll(ITEM_SEL);
      for (var i = 0; i < inner.length; i++) nodes.push(inner[i]);
    }
    return nodes.some(function (n) { return !isHidden(n); });
  }

  /* Lọc menu viết tay trong HTML lẫn menu do JS sinh (shell.js) */
  function filterNav() {
    var items = document.querySelectorAll(ITEM_SEL);
    for (var i = 0; i < items.length; i++) {
      var a = items[i];
      var dp = a.getAttribute('data-page');
      var k = keyOfHref(a.getAttribute('href')) || (dp && KEY_PATH[dp] ? dp : null);
      if (!k || allow(k)) continue;
      var row = a.closest('li') || a;
      hide(row);
      if (row !== a) hide(a);
    }

    /* Chỉ dọn tiêu đề nhóm sau khi HTML đã tải hết, để lúc đang parse
       (nhóm chưa kịp có mục nào) không bị ẩn nhầm */
    if (!parsed) return;
    var groups = document.querySelectorAll('.nav-group, .nav__group, .sidebar__group, .side-group');
    for (var g = 0; g < groups.length; g++) {
      var head = groups[g], el = head.nextElementSibling, any = false;
      while (el && !isGroup(el)) {
        if (hasVisibleItem(el)) { any = true; break; }
        el = el.nextElementSibling;
      }
      if (!any) hide(head);
      else if (head.hasAttribute('data-role-hidden')) show(head);
    }
  }

  /* Ẩn link tới trang bị chặn: nội dung, chuông, footer, panel tài khoản */
  function filterLinks() {
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      if (a.closest && a.closest(SKIP)) continue;
      if (isHidden(a)) continue;
      if (a.matches && a.matches(ITEM_SEL)) continue;   /* đã xử lý ở filterNav */
      var k = a.getAttribute('data-nav') || keyOfHref(a.getAttribute('href'));
      if (k && !allow(k)) { hide(a); pruneEmptyParent(a); }
    }
  }

  /* Đếm lại badge quả chuông ở khối Chuyên gia: AgrBrain ghi tổng số mục nó
     sinh ra từ dữ liệu, nhưng sau khi lọc theo vai trò vẫn còn mục bị ẩn vì
     trỏ tới trang ngoài phạm vi (vd. "Duyệt hồ sơ" -> users.html chỉ admin mở
     được). Badge phải khớp đúng số dòng người dùng nhìn thấy.
     Chỉ ghi khi giá trị đổi -> tránh vòng lặp MutationObserver. */
  function recountNotifBadge() {
    var list = document.getElementById('notifList');
    var count = document.getElementById('notifCount');
    if (!list || !count) return;
    var visible = 0, rows = list.children;
    for (var i = 0; i < rows.length; i++) {
      var link = rows[i].querySelector('a');
      if (!isHidden(rows[i]) && link && !isHidden(link)) visible++;
    }
    var label = String(visible);
    if (count.textContent !== label) count.textContent = label;
    var wantHidden = visible === 0;
    if (count.hidden !== wantHidden) count.hidden = wantHidden;
  }

  /* Logo/chip trỏ trang ngoài phạm vi -> đổi về trang nhà của vai trò */
  function fixEntryLinks() {
    var home = urlFor(ROLE_HOME[roleKey]);
    ['a.user-chip', 'a.brand'].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (!el || !el.getAttribute) return;
      var k = keyOfHref(el.getAttribute('href'));
      if (k && !allow(k)) {
        el.setAttribute('href', home);
        if (el.classList.contains('user-chip')) el.setAttribute('title', 'Về trang của ' + LABEL[roleKey]);
      }
    });
  }

  /* Khối Nông dân có nút Đăng xuất là <a href="login.html">: cho về cổng chung */
  function wireSharedLogout() {
    var btn = document.querySelector('a.btn-logout');
    if (!btn || btn.getAttribute('data-role-logout') === '1') return;
    btn.setAttribute('data-role-logout', '1');
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem(ROLE_KEY);
      sessionStorage.removeItem('smartagri_auth');
      sessionStorage.removeItem('smartagri_user');
      location.href = loginUrl();
    });
  }

  var parsed = document.readyState !== 'loading';
  var running = false;
  /* Lọc đồng bộ (không đợi requestAnimationFrame) để menu ẩn ngay cả khi
     tab đang chạy nền và iframe bị trình duyệt tắt lịch vẽ */
  function apply() {
    if (running) return;
    running = true;
    try {
      filterNav();
      filterLinks();
      fixEntryLinks();
      recountNotifBadge();
      if (BLOCK === 'nong-dan/') wireSharedLogout();
    } finally {
      running = false;
    }
  }

  /* ---- 6) chặn trang ngoài phạm vi ---- */
  function guardPage() {
    if (!currentKey) return;                              /* login, register, forgot, giuaki */
    if (!signedIn) { location.replace(loginUrl()); return; }
    if (allow(currentKey)) return;
    location.replace(urlFor(ROLE_HOME[roleKey]));
  }

  /* ---- 7) khởi động ---- */
  guardPage();

  if (document.documentElement) {
    document.documentElement.setAttribute('data-role', roleKey || 'guest');
  }

  if (signedIn) {
    /* quan sát từ lúc đang parse để mục menu bị ẩn ngay khi xuất hiện */
    if (window.MutationObserver) {
      new window.MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { parsed = true; apply(); });
    } else {
      apply();
    }
    if (BLOCK === 'nong-dan/') wireSharedLogout();
  }

  window.SA_ROLES = {
    role: roleKey,
    label: roleKey ? LABEL[roleKey] : 'Chưa đăng nhập',
    block: BLOCK || '',
    menu: menu.slice(),
    signedIn: signedIn,
    allow: allow,
    keyOfHref: keyOfHref,
    urlFor: urlFor,
    home: function () { return urlFor(ROLE_HOME[roleKey || 'admin']); },
    apply: apply
  };
})();
