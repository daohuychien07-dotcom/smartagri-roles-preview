/* ============================================================
   SmartAgri - Component thông báo (dùng chung mọi trang admin)
   Inject dropdown vào chuông .bell, quản lý chưa đọc / đã đọc.
   ============================================================ */
(function () {
  'use strict';

  const ICONS = {
    warning: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    info:    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    success: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    danger:  '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  };
  const svg = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg>`;

  // Danh sách thông báo tự thiết kế
  const NOTIFS = [
    { type: 'warning', text: 'Tỷ lệ gọi AI giảm còn <b>96.4%</b> trong 1 giờ qua. Vui lòng kiểm tra mô hình.', time: '5 phút trước',  unread: true  },
    { type: 'info',    text: '<b>Lê Minh Cường</b> vừa gửi yêu cầu xét duyệt tài khoản Chuyên gia.',          time: '20 phút trước', unread: true  },
    { type: 'success', text: 'Hợp tác xã <b>An Phú</b> đã được phê duyệt thành công.',                          time: '1 giờ trước',   unread: true  },
    { type: 'success', text: 'Bản <b>sao lưu dữ liệu</b> hằng ngày hoàn tất (2.4 GB).',                         time: '3 giờ trước',   unread: false },
    { type: 'danger',  text: 'Tài khoản <b>Bùi Thu Hà</b> vừa bị khóa do vi phạm điều khoản.',                  time: 'Hôm qua',       unread: false },
  ];

  let panel, bell, badge, chip;

  const unreadCount = () => NOTIFS.filter(n => n.unread).length;
  const isOpen = () => panel && panel.classList.contains('open');

  function refresh() {
    // badge trên chuông
    const c = unreadCount();
    if (badge) { badge.textContent = c; badge.style.display = c > 0 ? '' : 'none'; }
    if (chip)  { chip.textContent = c + ' mới'; chip.style.display = c > 0 ? '' : 'none'; }
    // danh sách
    const list = panel.querySelector('.notif-list');
    if (!NOTIFS.length) { list.innerHTML = '<div class="notif-empty">Chưa có thông báo nào.</div>'; return; }
    list.innerHTML = NOTIFS.map((n, i) => `
      <div class="notif-item ${n.unread ? 'unread' : 'read'}" data-i="${i}" role="button" tabindex="0">
        <span class="notif-ic ${n.type}">${svg(n.type)}</span>
        <div class="notif-body">
          <div class="notif-text">${n.text}</div>
          <div class="notif-time">${n.time}</div>
        </div>
        <span class="notif-dot" aria-hidden="true"></span>
      </div>`).join('');
  }

  const open  = () => { panel.classList.add('open'); bell.classList.add('active'); bell.setAttribute('aria-expanded', 'true'); };
  const close = () => { panel.classList.remove('open'); bell.classList.remove('active'); bell.setAttribute('aria-expanded', 'false'); };
  const toggle = () => isOpen() ? close() : open();

  function build() {
    bell = document.querySelector('.bell');
    if (!bell) return;
    const host = bell.closest('.header-user') || bell.parentElement;
    host.classList.add('notif-host');
    badge = bell.querySelector('.badge');

    bell.setAttribute('aria-expanded', 'false');
    bell.setAttribute('aria-haspopup', 'true');

    panel = document.createElement('div');
    panel.className = 'notif-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Thông báo');
    panel.innerHTML = `
      <div class="notif-head">
        <h3>Thông báo <span class="count-chip"></span></h3>
        <button type="button" class="notif-mark-all">Đánh dấu tất cả đã đọc</button>
      </div>
      <div class="notif-list"></div>
      <div class="notif-foot"><a href="chuyen-gia/alerts.html">Xem tất cả thông báo</a></div>`;
    host.appendChild(panel);
    chip = panel.querySelector('.count-chip');

    refresh();

    bell.addEventListener('click', e => { e.stopPropagation(); toggle(); });
    panel.querySelector('.notif-mark-all').addEventListener('click', e => {
      e.stopPropagation(); NOTIFS.forEach(n => n.unread = false); refresh();
    });
    panel.querySelector('.notif-list').addEventListener('click', e => {
      const item = e.target.closest('.notif-item'); if (!item) return;
      NOTIFS[+item.dataset.i].unread = false; refresh();
    });
    panel.querySelector('.notif-list').addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const item = e.target.closest('.notif-item'); if (!item) return;
      e.preventDefault(); NOTIFS[+item.dataset.i].unread = false; refresh();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    build();
    document.addEventListener('click', e => {
      if (!panel) return;
      if (!panel.contains(e.target) && !bell.contains(e.target)) close();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  });
})();
