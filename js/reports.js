/* ============================================================
   SmartAgri - Báo cáo tổng kết mùa vụ (JS)
   CropMate AI - CSE122 BTL
   Vanilla JS: chọn mùa vụ, tính chỉ số + vẽ biểu đồ cột CSS,
   bảng sắp xếp theo cột, xuất PDF (in) / Excel (CSV Blob),
   đóng & lưu trữ mùa vụ bằng localStorage, modal xác nhận,
   trạng thái rỗng cho mùa vụ đang diễn ra.
   ============================================================ */
'use strict';

/* ================= DỮ LIỆU MÙA VỤ ================= */
/* Chỉ tiêu năng suất (tấn/ha) theo từng mùa vụ — gán lại khi đổi mùa vụ */
let TARGET = 7.00;

const SEASONS = [
  {
    id: 'dongxuan2526',
    name: 'Vụ Đông Xuân 2025-2026',
    crop: 'Lúa IR50404',
    state: 'done',            // đã thu hoạch -> có báo cáo
    target: 7.00,             // tấn/ha
    households: 45,
    area: 120,
    output: 1250.6,           // tấn
    outputRate: 12.5,         // % so với chỉ tiêu
    cost: 485200000,          // đồng
    costRate: 5.8,            // % vượt kế hoạch
    revenue: 1875900000,      // đồng
    revenueRate: 13.2,
    batches: [
      { label: 'Đợt 1', date: '02/06', actual: 6.90 },
      { label: 'Đợt 2', date: '09/06', actual: 7.20 },
      { label: 'Đợt 3', date: '16/06', actual: 7.60 },
      { label: 'Đợt 4', date: '23/06', actual: 7.46 },
      { label: 'Đợt 5', date: '30/06', actual: 8.30 },
      { label: 'Đợt 6', date: '07/07', actual: 7.05 },
      { label: 'Đợt 7', date: '14/07', actual: 8.20 },
    ],
    rows: [
      /* Tên hộ + diện tích lấy đúng như trang Tổng quan nông hộ để liên kết giữa 2 trang */
      { name: 'Hộ Nguyễn Văn A',   area: 2.5, yield: 9.20, logs: 28 },
      { name: 'Hộ Trần Văn Hồng',  area: 3.2, yield: 8.75, logs: 27 },
      { name: 'Hộ Phạm Văn Đức',   area: 4.0, yield: 8.40, logs: 26 },
      { name: 'Hộ Đặng Quốc Tuấn', area: 6.5, yield: 7.95, logs: 24 },
      { name: 'Hộ Võ Thị Hoa',     area: 1.2, yield: 6.85, logs: 20 },
      { name: 'Hộ Lê Thị Mai',     area: 1.8, yield: 6.40, logs: 21 },
    ],
  },
  {
    id: 'mua2024',
    name: 'Vụ Mùa 2024',
    crop: 'Ngô NK66',
    state: 'done',
    target: 6.50,
    households: 38,
    area: 96,
    output: 612.4,
    outputRate: -3.6,
    cost: 288700000,
    costRate: 9.4,
    revenue: 904500000,
    revenueRate: -6.1,
    batches: [
      { label: 'Đợt 1', date: '05/09', actual: 5.90 },
      { label: 'Đợt 2', date: '14/09', actual: 6.40 },
      { label: 'Đợt 3', date: '23/09', actual: 6.10 },
      { label: 'Đợt 4', date: '02/10', actual: 6.80 },
      { label: 'Đợt 5', date: '11/10', actual: 5.45 },
      { label: 'Đợt 6', date: '20/10', actual: 6.60 },
    ],
    rows: [
      { name: 'Hộ Phạm Văn Đức',   area: 4.0, yield: 7.10, logs: 22 },
      { name: 'Hộ Nguyễn Văn A',   area: 2.5, yield: 6.80, logs: 20 },
      { name: 'Hộ Đặng Quốc Tuấn', area: 6.5, yield: 6.25, logs: 18 },
      { name: 'Hộ Trần Văn Hồng',  area: 3.2, yield: 6.95, logs: 21 },
      { name: 'Hộ Lê Thị Mai',     area: 1.8, yield: 5.60, logs: 14 },
    ],
  },
  { id: 'hethu2026', name: 'Vụ Hè Thu 2026 (đang diễn ra)', crop: 'Lúa IR50404', state: 'ongoing', rows: [], batches: [] },
];

/* Trạng thái đã đóng/lưu trữ — ghi ra localStorage để tồn tại sau khi tải lại */
const ARCHIVE_KEY = 'smartagri_season_archive_v1';
let archive = {};
try { archive = JSON.parse(localStorage.getItem(ARCHIVE_KEY)) || {}; } catch (err) { archive = {}; }

const state = { season: SEASONS[0], sort: { key: 'yield', dir: 'desc' } };

/* ================= TIỆN ÍCH ================= */
const $ = s => document.querySelector(s);
const nf = (n, d = 0) => new Intl.NumberFormat('vi-VN', { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);
const escapeHtml = s => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const isArchived = id => !!(archive[id] && archive[id].archived);
const todayVn = () => { const t = new Date(), p = n => String(n).padStart(2, '0'); return p(t.getDate()) + '/' + p(t.getMonth() + 1) + '/' + t.getFullYear(); };

const ICON = {
  sprout: '<path d="M12 22V12"/><path d="M12 12c0-4 3-7 8-7 0 4-3 7-8 7z"/><path d="M12 12C12 8 9 5 4 5c0 4 3 7 8 7z"/>',
  money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v4M18 10v4"/>',
  coins: '<circle cx="8" cy="8" r="5"/><path d="M13.5 4.2a5 5 0 0 1 0 15.6"/><path d="M20 8.5a5 5 0 0 1 0 11"/>',
  up: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
  down: '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 9-9 5-1 7-1 7-1s0 2-1 7c-1 6-5 9-8 10z"/><path d="M12 12c-2 2-4 5-4 8"/>',
};
const svg = (k, cls) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${cls ? 'class="' + cls + '"' : ''} aria-hidden="true">${ICON[k]}</svg>`;

/* ================= CHỌN MÙA VỤ ================= */
function buildSeasonSelect() {
  $('#seasonSelect').innerHTML = SEASONS.map(s => `<option value="${s.id}">${escapeHtml(s.name)}</option>`).join('');
  $('#seasonSelect').value = state.season.id;
}

/* ================= DẢI CHỈ SỐ ================= */
/* Mũi tên theo chiều tăng/giảm, nhưng màu theo ý nghĩa:
   sản lượng & doanh thu tăng là tốt (xanh), chi phí tăng là xấu (đỏ) → goodUp = false */
function renderStats(s) {
  const delta = (v, suffix, goodUp = true) => {
    const isGood = v >= 0 ? goodUp : !goodUp;
    return `<span class="${isGood ? 'up' : 'down'}">${svg(v >= 0 ? 'up' : 'down')}${v >= 0 ? '+' : '−'}${nf(Math.abs(v), 1)}%</span> ${suffix}`;
  };
  $('#rpStats').innerHTML = `
    <article class="rp-stat">
      <span class="rp-stat-ic green">${svg('sprout')}</span>
      <div>
        <p class="rp-stat-label">Tổng sản lượng thu hoạch (Tấn)</p>
        <p class="rp-stat-value green">${nf(s.output, 1)}</p>
        <p class="rp-stat-sub">${delta(s.outputRate, 'so với chỉ tiêu vụ này')}</p>
      </div>
    </article>
    <article class="rp-stat">
      <span class="rp-stat-ic blue">${svg('money')}</span>
      <div>
        <p class="rp-stat-label">Tổng chi phí vật tư (Đồng)</p>
        <p class="rp-stat-value blue">${nf(s.cost, 0)}</p>
        <p class="rp-stat-sub">${delta(s.costRate, 'so với kế hoạch chi phí', false)}</p>
      </div>
    </article>
    <article class="rp-stat">
      <span class="rp-stat-ic yellow">${svg('coins')}</span>
      <div>
        <p class="rp-stat-label">Doanh thu dự kiến (Đồng)</p>
        <p class="rp-stat-value yellow">${nf(s.revenue, 0)}</p>
        <p class="rp-stat-sub">${delta(s.revenueRate, 'so với kế hoạch doanh thu')}</p>
      </div>
    </article>`;
}

/* ================= BIỂU ĐỒ CỘT CSS ================= */
const AXIS_MAX = 10;   // thang đo tấn/ha

function renderChart(s) {
  const avg = s.batches.reduce((a, b) => a + b.actual, 0) / s.batches.length;
  const rate = avg / TARGET * 100;

  $('#rpChart').innerHTML = `
    <div class="rp-yaxis" aria-hidden="true">
      ${[10, 8, 6, 4, 2, 0].map(v => `<span style="bottom:${v / AXIS_MAX * 100}%">${nf(v, 0)}</span>`).join('')}
    </div>
    <div class="rp-plot" role="img" aria-label="Biểu đồ năng suất ${s.batches.length} đợt thu hoạch, trung bình ${nf(avg, 2)} tấn/ha so với chỉ tiêu ${nf(TARGET, 2)} tấn/ha">
      ${s.batches.map(b => {
        const h = Math.min(b.actual / AXIS_MAX, 1) * 100;
        const t = TARGET / AXIS_MAX * 100;
        const below = b.actual < TARGET;
        return `
          <div class="rp-bar ${below ? 'below' : ''}" title="${escapeHtml(b.label)}: ${nf(b.actual, 2)} / chỉ tiêu ${nf(TARGET, 2)} tấn/ha">
            <span class="rp-bar-val" style="bottom:calc(${h}% + 6px)">${nf(b.actual, 1)}<small>/${nf(TARGET, 1)}</small></span>
            <span class="rp-bar-target" style="bottom:${t}%"></span>
            <span class="rp-bar-fill" style="height:${h}%"></span>
          </div>`;
      }).join('')}
    </div>
    <div class="rp-xlabels">
      ${s.batches.map(b => `<span><b>${escapeHtml(b.label)}</b>${escapeHtml(b.date)}</span>`).join('')}
    </div>`;

  $('#rpSummary').innerHTML = `
    <span class="k">${svg('leaf')} Năng suất trung bình toàn vụ: <b>${nf(avg, 2)} tấn/ha</b></span>
    <span class="k">Chỉ tiêu trung bình: <b>${nf(TARGET, 2)} tấn/ha</b></span>
    <span class="rate ${rate < 100 ? 'low' : ''}">Đạt ${nf(rate, 1)}% chỉ tiêu</span>`;
}

/* ================= BẢNG NÔNG HỘ ================= */
function sortedRows(s) {
  const { key, dir } = state.sort;
  const mul = dir === 'asc' ? 1 : -1;
  return s.rows.slice().sort((a, b) => {
    const va = key === 'name' ? a.name : key === 'rate' ? a.yield / TARGET : a[key];
    const vb = key === 'name' ? b.name : key === 'rate' ? b.yield / TARGET : b[key];
    if (typeof va === 'string') return va.localeCompare(vb, 'vi') * mul;
    return (va - vb) * mul;
  });
}

function renderTable(s) {
  const rows = sortedRows(s);
  const tbody = $('#rpTable tbody');
  tbody.innerHTML = rows.map((r, i) => {
    const rate = r.yield / TARGET * 100;
    return `
      <tr>
        <td class="c-num"><span class="medal">${i + 1}</span></td>
        <td class="name"><a href="households.html?q=${encodeURIComponent(r.name.replace('Hộ ', ''))}" title="Xem nông hộ này ở trang Tổng quan">${escapeHtml(r.name)}</a></td>
        <td class="num">${nf(r.area, 1)}</td>
        <td class="num">${nf(r.yield, 2)}</td>
        <td class="num"><span class="rate ${rate < 100 ? 'low' : 'ok'}">${nf(rate, 1)}%</span></td>
        <td class="num">${r.logs}</td>
      </tr>`;
  }).join('');

  const avgY = rows.reduce((a, r) => a + r.yield, 0) / rows.length;
  const avgA = rows.reduce((a, r) => a + r.area, 0) / rows.length;
  $('#rpTable tfoot').innerHTML = `
    <tr>
      <td></td>
      <td>Toàn HTX (${rows.length} hộ tiêu biểu)</td>
      <td class="num">${nf(avgA, 1)}</td>
      <td class="num">${nf(avgY, 2)}</td>
      <td class="num">${nf(avgY / TARGET * 100, 1)}%</td>
      <td class="num">${rows.reduce((a, r) => a + r.logs, 0)}</td>
    </tr>`;

  document.querySelectorAll('#rpTable th.sortable').forEach(th => {
    const on = th.dataset.sort === state.sort.key;
    th.setAttribute('aria-sort', on ? (state.sort.dir === 'asc' ? 'ascending' : 'descending') : 'none');
    const label = th.textContent.replace(/[▲▼]\s*$/, '').trim();
    th.innerHTML = label + `<span class="arrow">${on ? (state.sort.dir === 'asc' ? '▲' : '▼') : ''}</span>`;
  });
}

/* ================= PANEL ĐÓNG & LƯU TRỮ ================= */
function renderArchive(s) {
  const box = $('.rp-archive');
  const locked = isArchived(s.id) || s.state === 'archived';
  box.classList.toggle('locked', locked);
  $('#btnArchive').disabled = locked;
  $('#btnRestore').hidden = !locked;
  const st = $('#archState');
  st.hidden = !locked;
  if (locked) {
    const when = archive[s.id] && archive[s.id].at ? ' vào ' + archive[s.id].at : '';
    st.innerHTML = '✔ Mùa vụ đã lưu trữ' + when + ' — chỉ còn quyền xem và xuất báo cáo.';
  }
}

/* ================= RENDER TRANG ================= */
function render() {
  const s = state.season;
  TARGET = s.target || 7.00;
  const hasReport = s.batches.length > 0;
  $('#rpStats').hidden = !hasReport;
  $('.rp-layout').hidden = !hasReport;
  $('#rpEmpty').hidden = hasReport;
  $('#btnExport').disabled = !hasReport;
  if (!hasReport) return;
  renderStats(s);
  renderChart(s);
  renderTable(s);
  renderArchive(s);
}

/* ================= SẮP XẾP BẢNG ================= */
document.querySelectorAll('#rpTable th.sortable').forEach(th => {
  th.addEventListener('click', () => {
    const key = th.dataset.sort;
    if (state.sort.key === key) state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
    else { state.sort.key = key; state.sort.dir = key === 'name' ? 'asc' : 'desc'; }
    renderTable(state.season);
    showToast('Đã sắp xếp theo ' + th.textContent.replace(/[▲▼]/g, '').trim() + (state.sort.dir === 'asc' ? ' tăng dần' : ' giảm dần'));
  });
});

/* ================= XUẤT BÁO CÁO ================= */
const menu = $('#exportMenu');
const closeMenu = () => { menu.hidden = true; $('#btnExport').setAttribute('aria-expanded', 'false'); };
$('#btnExport').addEventListener('click', e => {
  e.stopPropagation();
  menu.hidden = !menu.hidden;
  $('#btnExport').setAttribute('aria-expanded', String(!menu.hidden));
});
document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target)) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeConfirm(); } });

// PDF: dùng hộp thoại in của trình duyệt (chọn "Lưu dưới dạng PDF")
$('#btnPdf').addEventListener('click', () => { closeMenu(); window.print(); });

// Excel: sinh tệp CSV (có BOM để Excel đọc đúng tiếng Việt) rồi tải xuống
$('#btnXlsx').addEventListener('click', () => {
  closeMenu();
  const s = state.season;
  const lines = [
    ['Báo cáo tổng kết mùa vụ', s.name],
    ['Loại cây', s.crop],
    ['Số nông hộ', s.households],
    ['Diện tích (ha)', s.area],
    [],
    ['Chỉ số', 'Giá trị', 'So với kế hoạch (%)'],
    ['Tổng sản lượng (tấn)', s.output, s.outputRate],
    ['Tổng chi phí vật tư (dong)', s.cost, s.costRate],
    ['Doanh thu dự kiến (dong)', s.revenue, s.revenueRate],
    [],
    ['Đợt thu hoạch', 'Ngày', 'Năng suất thực tế (tan/ha)', 'Chỉ tiêu (tan/ha)'],
    ...s.batches.map(b => [b.label, b.date, b.actual, TARGET]),
    [],
    ['Nông hộ', 'Diện tích (ha)', 'Năng suất (tan/ha)', 'So với chỉ tiêu (%)', 'Số lần ghi nhật ký'],
    ...sortedRows(s).map(r => [r.name, r.area, r.yield, (r.yield / TARGET * 100).toFixed(1), r.logs]),
  ];
  const csv = '\uFEFF' + lines.map(row => row.map(c => {
    const v = c === undefined ? '' : String(c);
    return /[";\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v.replace(/\./g, ',');
  }).join(';')).join('\n');

  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bao-cao-' + s.id + '.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  showToast('Đã tải bảng tính Excel (CSV) cho ' + s.name);
});

/* ================= ĐÓNG & LƯU TRỮ MÙA VỤ ================= */
const backdrop = $('#confirmBackdrop');
function openConfirm() {
  $('#cfSeason').textContent = state.season.name;
  $('#cfAck').checked = false;
  $('#cfOk').disabled = true;
  backdrop.classList.add('open');
  $('#cfAck').focus();
}
function closeConfirm() { backdrop.classList.remove('open'); }

$('#btnArchive').addEventListener('click', openConfirm);
$('#cfClose').addEventListener('click', closeConfirm);
$('#cfCancel').addEventListener('click', closeConfirm);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeConfirm(); });
$('#cfAck').addEventListener('change', () => { $('#cfOk').disabled = !$('#cfAck').checked; });

$('#cfOk').addEventListener('click', () => {
  const id = state.season.id;
  archive[id] = { archived: true, at: todayVn() };
  localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archive));
  closeConfirm();
  renderArchive(state.season);
  showToast('Đã đóng và lưu trữ ' + state.season.name);
});

$('#btnRestore').addEventListener('click', () => {
  delete archive[state.season.id];
  localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archive));
  renderArchive(state.season);
  showToast('Đã mở lại mùa vụ để chỉnh sửa (chế độ demo)');
});

/* ================= KHÁC ================= */
$('#seasonSelect').addEventListener('change', () => {
  state.season = SEASONS.find(s => s.id === $('#seasonSelect').value) || SEASONS[0];
  render();
});
$('#hamburger').addEventListener('click', () => document.body.classList.toggle('collapsed'));

let toastTimer;
function showToast(msg) {
  $('#toastMsg').textContent = msg;
  const toast = $('#toast');
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ================= KHỞI ĐỘNG ================= */
function boot() {
  const p = new URLSearchParams(window.location.search);
  const q = p.get('season');
  if (q) {
    const byQuery = SEASONS.find(s => s.id === q || s.name.toLowerCase().startsWith(q.toLowerCase()));
    if (byQuery) state.season = byQuery;
  }
  buildSeasonSelect();
  render();
}
boot();
