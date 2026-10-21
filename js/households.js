/* ============================================================
   SmartAgri - Tổng quan nông hộ (JS)
   CropMate AI - CSE122 BTL
   Vanilla JS: render thẻ/bảng từ mảng, tìm kiếm, lọc chip,
   chuyển kiểu hiển thị, modal gửi thông báo + validate,
   deep link (?health= / ?region= / ?q=), toast.
   ============================================================ */
'use strict';

/* ---------- Dữ liệu mẫu: các hộ đang theo dõi trong vụ ---------- */
const HOUSEHOLDS = [
  { id: 'HH-01', owner: 'Nguyễn Văn A', lot: 'Lô B2', area: 2.5, variety: 'Lúa IR50404',      stage: 'Đẻ nhánh',   day: 53,  health: 'safe',      region: 'Cánh đồng A' },
  { id: 'HH-02', owner: 'Trần Văn Hồng', lot: 'Lô A1', area: 3.2, variety: 'Lúa IR50404',      stage: 'Đẻ nhánh',   day: 47,  health: 'alert',     region: 'Cánh đồng A' },
  { id: 'HH-03', owner: 'Lê Thị Mai',    lot: 'Lô C3', area: 1.8, variety: 'Xoài Cát Hòa Lộc', stage: 'Đậu quả',    day: 104, health: 'emergency', region: 'Vườn hộ khu 3' },
  { id: 'HH-04', owner: 'Phạm Văn Đức',  lot: 'Lô A2', area: 4.0, variety: 'Cà phê Robusta',   stage: 'Kinh doanh', day: 219, health: 'safe',      region: 'Khu vực 1-2'   },
  { id: 'HH-05', owner: 'Võ Thị Hoa',    lot: 'Lô B1', area: 1.2, variety: 'Lúa IR50404',      stage: 'Làm đòng',   day: 90,  health: 'alert',     region: 'Cánh đồng B'   },
  { id: 'HH-06', owner: 'Đặng Quốc Tuấn',lot: 'Lô D1', area: 6.5, variety: 'Xoài Cát Hòa Lộc', stage: 'Ra hoa',     day: 36,  health: 'safe',      region: 'Vườn hộ khu 3' },
];

// Số liệu toàn hợp tác xã (45 hộ / 120 ha) — phần tử hiển thị trên thẻ chỉ số
const HTX_SUMMARY = { households: 45, area: 120 };

const HEALTH = {
  safe:      { label: 'An toàn',             pill: 'safe'      },
  alert:     { label: 'Cảnh báo sâu bệnh',   pill: 'alert'     },
  emergency: { label: 'Cứu trợ khẩn cấp',    pill: 'emergency' },
};

/* ---------- Trạng thái bộ lọc ---------- */
const state = { q: '', region: '', variety: '', health: '', view: 'cards', notified: new Set() };

/* ---------- Bẫy tham chiếu DOM ---------- */
const $ = sel => document.querySelector(sel);
const grid = $('#hhGrid');
const tableWrap = $('#hhTableWrap');
const table = $('#hhTable');
const countEl = $('#hhCount');
const searchInput = $('#searchInput');
const regionFilter = $('#regionFilter');
const varietyChips = $('#varietyChips');
const healthChips = $('#healthChips');

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

// Chu kỳ của một giống (lấy từ danh mục chuẩn ở js/catalog.js)
function cycleOf(variety) {
  const c = (window.CATALOG ? CATALOG.CROPS : []).find(x => x.label === variety);
  return c ? c.cycleMin : 120;
}
const pctOf = h => Math.min(100, Math.round(h.day / cycleOf(h.variety) * 100));
const initials = name => name.split(' ').slice(-2).map(w => w[0]).join('').toUpperCase();

/* ---------- ICON ---------- */
const ICON = {
  safe:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11.5 11.5 14 16 9"/></svg>',
  alert:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  emergency: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>',
  area:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z"/></svg>',
  seed:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22V12"/><path d="M12 12c0-4 3-7 8-7 0 4-3 7-8 7z"/><path d="M12 12C12 8 9 5 4 5c0 4 3 7 8 7z"/></svg>',
  book:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  send:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  check:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  field:     '<svg class="field" viewBox="0 0 400 62" preserveAspectRatio="none" aria-hidden="true"><path d="M0 26 Q100 6 200 22 T400 14 V62 H0Z" fill="#5aa845" opacity=".75"/><path d="M0 40 Q120 22 240 38 T400 30 V62 H0Z" fill="#3d8a32" opacity=".8"/><g stroke="#2f6f28" stroke-width="1.4" opacity=".55"><path d="M20 62V44M60 62V40M100 62V46M140 62V42M180 62V47M220 62V43M260 62V48M300 62V44M340 62V47M380 62V42"/></g></svg>',
};

/* ---------- LỌC DỮ LIỆU ---------- */
function getFiltered() {
  const q = state.q.trim().toLowerCase();
  return HOUSEHOLDS.filter(h => {
    const matchQ = !q || h.owner.toLowerCase().includes(q) || h.lot.toLowerCase().includes(q) || h.variety.toLowerCase().includes(q);
    const matchRegion = !state.region || h.region === state.region;
    const matchVariety = !state.variety || h.variety === state.variety;
    const matchHealth = !state.health || h.health === state.health;
    return matchQ && matchRegion && matchVariety && matchHealth;
  });
}

/* ---------- RENDER THẺ ---------- */
function cardHtml(h) {
  const pct = pctOf(h);
  const sent = state.notified.has(h.id);
  return `
  <article class="hh-card ${h.health === 'safe' ? '' : h.health}" aria-label="Nông hộ ${escapeHtml(h.owner)}">
    <div class="hh-cover">
      ${ICON.field}
      <span class="hh-pill ${HEALTH[h.health].pill}">${ICON[h.health]}${HEALTH[h.health].label}</span>
      <span class="hh-avatar" aria-hidden="true">${initials(h.owner)}</span>
    </div>
    <div class="hh-body">
      <h3 class="hh-name">Nông hộ ${escapeHtml(h.owner)} – ${escapeHtml(h.lot)}</h3>
      <p class="hh-meta">
        <span>${ICON.area} ${h.area} ha</span>
        <span>${ICON.seed} ${escapeHtml(h.variety)}</span>
      </p>
      <p class="hh-stage">Giai đoạn <b>${escapeHtml(h.stage)}</b> (Ngày ${h.day}/${cycleOf(h.variety)})</p>
      <div class="hh-prog">
        <span class="track"><span class="fill" style="width:${pct}%"></span></span>
        <span class="pct">${pct}%</span>
      </div>
      <div class="hh-actions">
        <a class="btn-outline" href="schedule.html?lot=${encodeURIComponent(h.lot)}">${ICON.book}Xem nhật ký chi tiết</a>
        <button type="button" class="btn-primary ${sent ? 'sent' : ''}" data-notify="${h.id}"${sent ? ' disabled' : ''}>
          ${sent ? ICON.check + 'Đã gửi thông báo' : ICON.send + 'Gửi thông báo riêng'}
        </button>
      </div>
    </div>
  </article>`;
}

/* ---------- RENDER BẢNG ---------- */
function renderTable(rows) {
  table.innerHTML = `
    <thead>
      <tr><th>Nông hộ</th><th>Chủ hộ</th><th>Diện tích</th><th>Giống cây trồng</th><th>Giai đoạn</th><th>Tiến độ</th><th>Sức khỏe</th><th>Hành động</th></tr>
    </thead>
    <tbody>
      ${rows.length ? rows.map(h => `
        <tr>
          <td class="mono">${h.id}<br><span class="hh-muted">${escapeHtml(h.region)}</span></td>
          <td><div class="hh-owner"><span class="hh-mini">${initials(h.owner)}</span>${escapeHtml(h.owner)} – ${escapeHtml(h.lot)}</div></td>
          <td class="mono">${h.area} ha</td>
          <td>${escapeHtml(h.variety)}</td>
          <td>${escapeHtml(h.stage)} <span class="hh-muted">(ngày ${h.day}/${cycleOf(h.variety)})</span></td>
          <td><div class="hh-inline-prog"><span class="track"><span class="fill" style="width:${pctOf(h)}%"></span></span><b>${pctOf(h)}%</b></div></td>
          <td><span class="badge ${h.health}">${HEALTH[h.health].label}</span></td>
          <td><div class="row-actions">
            <a class="btn-edit" href="schedule.html?lot=${encodeURIComponent(h.lot)}">Xem nhật ký</a>
            <button type="button" class="btn-link restore" data-notify="${h.id}">Gửi thông báo riêng</button>
          </div></td>
        </tr>`).join('')
        : `<tr><td colspan="8" class="empty-state">Không tìm thấy nông hộ nào khớp bộ lọc</td></tr>`}
    </tbody>`;
}

/* ---------- RENDER CHUNG ---------- */
function render() {
  const rows = getFiltered();
  countEl.innerHTML = `Hiển thị <b>${rows.length}</b> / ${HOUSEHOLDS.length} nông hộ đang theo dõi`;

  if (state.view === 'cards') {
    grid.hidden = false;
    tableWrap.hidden = true;
    grid.innerHTML = rows.length
      ? rows.map(cardHtml).join('')
      : `<div class="hh-empty">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
           <p>Chưa có nông hộ nào khớp với bộ lọc hiện tại.</p>
           <button type="button" class="btn-ghost green" id="btnClearAll">Xóa tất cả bộ lọc</button>
         </div>`;
  } else {
    grid.hidden = true;
    tableWrap.hidden = false;
    renderTable(rows);
  }
  renderIncidentStat();
}

// Thẻ "Sự cố đang chờ xử lý" đếm từ dữ liệu thật (alert + emergency)
function renderIncidentStat() {
  const n = HOUSEHOLDS.filter(h => h.health !== 'safe').length;
  const el = $('#statIncidents');
  if (el) el.textContent = n;
}

/* ---------- BUILD CHIP GIỐNG CÂY TRỒNG + SELECT KHU VỰC ---------- */
function buildFilters() {
  const active = window.CATALOG ? CATALOG.CROPS.filter(c => c.status === 'active') : [];
  varietyChips.innerHTML = `<button type="button" class="chip active" data-variety="">Tất cả</button>`
    + active.map(c => `<button type="button" class="chip" data-variety="${escapeHtml(c.label)}">${escapeHtml(c.label)}</button>`).join('');

  if (window.CATALOG) {
    regionFilter.insertAdjacentHTML('beforeend',
      CATALOG.REGIONS.map(r => `<option value="${escapeHtml(r)}">${escapeHtml(r)}</option>`).join(''));
  }
  $('#statHouseholds').textContent = HTX_SUMMARY.households;
  $('#statArea').textContent = HTX_SUMMARY.area;
}

/* ---------- ĐỒNG BỘ CHIP ---------- */
function syncChips(container, attr, value) {
  container.querySelectorAll('.chip').forEach(c =>
    c.classList.toggle('active', c.dataset[attr] === value));
}

/* ---------- SỰ KIỆN ---------- */
searchInput.addEventListener('input', () => { state.q = searchInput.value; render(); });
regionFilter.addEventListener('change', () => { state.region = regionFilter.value; render(); });

varietyChips.addEventListener('click', e => {
  const chip = e.target.closest('.chip'); if (!chip) return;
  state.variety = chip.dataset.variety;
  syncChips(varietyChips, 'variety', state.variety);
  render();
});
healthChips.addEventListener('click', e => {
  const chip = e.target.closest('.chip'); if (!chip) return;
  state.health = chip.dataset.health;
  syncChips(healthChips, 'health', state.health);
  render();
});

$('#viewCards').addEventListener('click', () => setView('cards'));
$('#viewTable').addEventListener('click', () => setView('table'));
function setView(v) {
  state.view = v;
  $('#viewCards').classList.toggle('active', v === 'cards');
  $('#viewTable').classList.toggle('active', v === 'table');
  $('#viewCards').setAttribute('aria-selected', v === 'cards');
  $('#viewTable').setAttribute('aria-selected', v === 'table');
  render();
}

// one listener cho cả lưới thẻ lẫn bảng: mở modal gửi thông báo
document.querySelector('.content').addEventListener('click', e => {
  const clear = e.target.closest('#btnClearAll');
  if (clear) { resetFilters(); return; }
  const btn = e.target.closest('[data-notify]');
  if (btn) openNotify(btn.dataset.notify);
});

$('#hamburger').addEventListener('click', () => document.body.classList.toggle('collapsed'));

/* ---------- DEEP LINK: households.html?health=alert&region=...&q=... ---------- */
function readQuery() {
  const p = new URLSearchParams(window.location.search);
  if (p.get('health')) { state.health = p.get('health'); syncChips(healthChips, 'health', state.health); }
  if (p.get('variety')) { state.variety = p.get('variety'); syncChips(varietyChips, 'variety', state.variety); }
  if (p.get('region')) { state.region = p.get('region'); regionFilter.value = state.region; }
  if (p.get('q')) { state.q = p.get('q'); searchInput.value = state.q; }
}
function resetFilters() {
  Object.assign(state, { q: '', region: '', variety: '', health: '' });
  searchInput.value = ''; regionFilter.value = '';
  syncChips(varietyChips, 'variety', ''); syncChips(healthChips, 'health', '');
  render();
  showToast('Đã xóa tất cả bộ lọc');
}

/* ============================================================
   MODAL GỬI THÔNG BÁO RIÊNG + FORM VALIDATION
   ============================================================ */
const backdrop = $('#notifyBackdrop');
const notifyForm = $('#notifyForm');
let notifyTarget = null;

function openNotify(id) {
  notifyTarget = HOUSEHOLDS.find(h => h.id === id);
  if (!notifyTarget) return;
  backdrop.classList.add('open');
  notifyForm.reset();
  ['fn-title', 'fn-body'].forEach(fid => $('#' + fid).classList.remove('error'));
  $('#notifyTo').innerHTML = `Gửi tới <b>${escapeHtml(notifyTarget.owner)}</b> — ${escapeHtml(notifyTarget.lot)} · ${escapeHtml(notifyTarget.region)}`;
  $('#inpTitle').focus();
}
function closeNotify() { backdrop.classList.remove('open'); }

$('#notifyClose').addEventListener('click', closeNotify);
$('#notifyCancel').addEventListener('click', closeNotify);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeNotify(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNotify(); });

notifyForm.addEventListener('submit', e => {
  e.preventDefault();                       // chặn trình duyệt tải lại trang
  const title = $('#inpTitle').value.trim();
  const body = $('#inpBody').value.trim();
  let ok = true;

  if (title.length < 5) { $('#fn-title').classList.add('error'); ok = false; }
  else $('#fn-title').classList.remove('error');

  if (body.length < 10) { $('#fn-body').classList.add('error'); ok = false; }
  else $('#fn-body').classList.remove('error');

  if (!ok) { showToast('Vui lòng sửa các trường bị đánh dấu đỏ'); return; }

  state.notified.add(notifyTarget.id);
  closeNotify();
  render();
  showToast(`Đã gửi thông báo tới ${notifyTarget.owner}`);
});

['inpTitle', 'inpBody'].forEach((id, i) => {
  $('#' + id).addEventListener('input', () => $('#' + (i ? 'fn-body' : 'fn-title')).classList.remove('error'));
});

/* ---------- TOAST ---------- */
let toastTimer;
function showToast(msg) {
  $('#toastMsg').textContent = msg;
  const toast = $('#toast');
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ---------- KHỞI ĐỘNG ---------- */
buildFilters();
readQuery();
render();
