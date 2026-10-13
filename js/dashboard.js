/* ============================================================
   SmartAgri - Dashboard JS
   Vẽ biểu đồ cột "Người dùng active" (Hàng ngày / Hàng tuần),
   render bảng nhật ký, hamburger, toast.
   ============================================================ */

/* ---------- Dữ liệu biểu đồ ---------- */
const CHART_DATA = {
  day: {
    labels: ['15/6', '16/6', '17/6', '18/6', '19/6', '20/6', '21/6'],
    values: [85, 118, 145, 165, 182, 165, 226],
    max: 250,
    ticks: [250, 200, 150, 100, 50, 0],
  },
  week: {
    labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
    values: [520, 640, 710, 880],
    max: 1000,
    ticks: [1000, 750, 500, 250, 0],
  },
};

/* ---------- Dữ liệu nhật ký hoạt động ---------- */
const ICONS = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  userx: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="8" x2="22" y2="13"/><line x1="22" y1="8" x2="17" y2="13"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>',
  userplus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>',
};

const LOGS = [
  { icon: 'check',    tone: 'ok',     text: 'Admin B vừa phê duyệt tài khoản Chuyên gia X', time: '5 phút trước',  status: 'Thành công', cls: 'ok' },
  { icon: 'check',    tone: 'ok',     text: 'Admin A vừa phê duyệt tài khoản Chuyên gia Y', time: '15 phút trước', status: 'Thành công', cls: 'ok' },
  { icon: 'userx',    tone: 'danger', text: 'User Y vừa bị khóa',                            time: '30 phút trước', status: 'Bị khóa',    cls: 'danger' },
  { icon: 'clock',    tone: 'warn',   text: 'Tài khoản Chuyên gia Z đang chờ phê duyệt',      time: '1 giờ trước',   status: 'Chờ duyệt',  cls: 'pending' },
  { icon: 'userplus', tone: 'ok',     text: 'User W vừa đăng ký tài khoản mới',              time: '2 giờ trước',   status: 'Thành công', cls: 'ok' },
];

/* ---------- Vẽ biểu đồ ---------- */
function renderChart(range) {
  const d = CHART_DATA[range];
  const yAxis = document.getElementById('yAxis');
  const bars = document.getElementById('bars');
  if (!yAxis || !bars) return;

  yAxis.innerHTML = d.ticks.map(t => `<span>${t.toLocaleString('vi-VN')}</span>`).join('');

  bars.innerHTML = d.values.map((v, i) => {
    const h = Math.max(2, Math.round((v / d.max) * 100));
    return `
      <div class="bar-col">
        <div class="bar" style="height:${h}%" data-v="${v}">
          <span class="tip">${v.toLocaleString('vi-VN')}</span>
        </div>
        <div class="bar-x">${d.labels[i]}</div>
      </div>`;
  }).join('');

  // hiệu ứng tăng trưởng từ 0 -> chiều cao thật
  requestAnimationFrame(() => {
    bars.querySelectorAll('.bar').forEach(b => {
      const target = b.style.height;
      b.style.height = '0%';
      requestAnimationFrame(() => { b.style.height = target; });
    });
  });
}

/* ---------- Vẽ bảng nhật ký ---------- */
// Hồ sơ vừa đăng ký từ trang login được đưa lên đầu nhật ký hoạt động
function registrationLogs() {
  if (typeof REG === 'undefined') return [];
  const tone = {
    pending: { tone: 'warn',   status: 'Chờ duyệt',  cls: 'pending',  verb: 'vừa đăng ký tài khoản — chờ duyệt' },
    active:  { tone: 'ok',     status: 'Đã duyệt',   cls: 'ok',       verb: 'vừa được duyệt tài khoản' },
    locked:  { tone: 'danger', status: 'Bị khóa',    cls: 'danger',   verb: 'vừa bị khóa tài khoản' },
  };
  return REG.all().slice(0, 3).map(u => {
    const m = tone[u.status] || tone.pending;
    return { icon: 'userplus', tone: m.tone, text: `${u.role} ${u.name} ${m.verb}`, time: 'Vừa xong', status: m.status, cls: m.cls };
  });
}

function renderLogs() {
  const tbody = document.querySelector('#logTable tbody');
  if (!tbody) return;
  tbody.innerHTML = registrationLogs().concat(LOGS).map(l => `
    <tr>
      <td>
        <div class="log-act">
          <span class="log-ic ${l.tone}">${ICONS[l.icon]}</span>
          <span>${l.text}</span>
        </div>
      </td>
      <td class="log-time">${l.time}</td>
      <td><span class="status-badge ${l.cls}">${l.status}</span></td>
    </tr>`).join('');
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const tmsg = document.getElementById('toastMsg');
  if (!toast) return;
  tmsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ---------- Khởi tạo ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Đồng bộ thẻ "Tài khoản chờ duyệt" với số hồ sơ đăng ký thật từ trang login
  if (typeof REG !== 'undefined') {
    const n = REG.countByStatus('pending');
    const el = document.getElementById('statPending');
    if (el && n) el.textContent = String(18 + n);
  }

  renderChart('day');
  renderLogs();

  // Toggle Hàng ngày / Hàng tuần
  document.querySelectorAll('.seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.seg-btn').forEach(b => {
        b.classList.remove('active'); b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
      renderChart(btn.dataset.range);
    });
  });

  // Hamburger thu gọn sidebar
  const ham = document.getElementById('hamburger');
  if (ham) ham.addEventListener('click', () => document.body.classList.toggle('collapsed'));

  // Đăng xuất: xử lý trong js/session.js
});
