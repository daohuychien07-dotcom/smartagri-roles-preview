/* ============================================================
   SmartAgri - Lịch trình mùa vụ (JS)
   CropMate AI - CSE122 BTL
   Vanilla JS: render lịch Tháng/Tuần/Giai đoạn từ mảng sự kiện,
   thêm sự kiện thủ công, AI sinh checklist (bất đồng bộ có tiến
   trình), form validation, lọc theo lô (?lot=), skeleton + empty.
   ============================================================ */
'use strict';

/* ---------- Dữ liệu sự kiện của vụ hiện tại ---------- */
let EVENTS = [
  { id: 'EV-01', date: '2026-06-01', title: 'Kiểm tra đồng ruộng', crop: 'Lúa IR50404', lot: 'Toàn HTX', place: 'Khu vực 1, 2, 3', type: 'check' },
  { id: 'EV-02', date: '2026-06-02', title: 'Gieo sạ tập trung',  crop: 'Lúa IR50404', lot: 'Lô A1',   place: 'Cánh đồng A',   type: 'sow'  },
  { id: 'EV-03', date: '2026-06-03', title: 'Gieo sạ tập trung',  crop: 'Lúa IR50404', lot: 'Lô B2',   place: 'Khu vực 1',     type: 'sow'  },
  { id: 'EV-04', date: '2026-06-04', title: 'Phun thuốc diện rộng', crop: 'Lúa IR50404', lot: 'Toàn HTX', place: 'Khu vực 1, 2', type: 'spray' },
  { id: 'EV-05', date: '2026-06-05', title: 'Bón phân đợt 1',     crop: 'Lúa IR50404', lot: 'Lô A1',   place: 'Cánh đồng A',   type: 'fert' },
  { id: 'EV-06', date: '2026-06-06', title: 'Gieo sạ tập trung',  crop: 'Xoài Cát Hòa Lộc', lot: 'Lô B2', place: 'Cánh đồng B', type: 'sow' },
  { id: 'EV-07', date: '2026-06-07', title: 'Bón phân đợt 1',     crop: 'Xoài Cát Hòa Lộc', lot: 'Lô B2', place: 'Cánh đồng B', type: 'fert' },
  { id: 'EV-08', date: '2026-06-09', title: 'Phun ngừa đạo ôn',   crop: 'Lúa IR50404', lot: 'Lô A1',   place: 'Cánh đồng A',   type: 'spray' },
  { id: 'EV-09', date: '2026-06-13', title: 'Bón phân đợt 2',     crop: 'Lúa IR50404', lot: 'Lô A1',   place: 'Cánh đồng A',   type: 'fert' },
  { id: 'EV-10', date: '2026-06-20', title: 'Phun thuốc diện rộng', crop: 'Ngô NK66', lot: 'Lô B2',    place: 'Khu vực 2, 3',  type: 'spray' },
  { id: 'EV-11', date: '2026-06-27', title: 'Thu hoạch dự kiến',  crop: 'Lúa IR50404', lot: 'Lô A1',   place: 'Cánh đồng A',   type: 'sow'  },
];

const TODAY = new Date();
const MONTH_NAMES = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
const DOW = ['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN'];
const QUICK_TYPE = { 'Gieo sạ tập trung': 'sow', 'Phun thuốc diện rộng': 'spray', 'Bón phân đợt 1': 'fert' };

const state = {
  view: 'month',
  cursor: new Date(2026, 5, 1),   // đầu vụ hiện tại: Tháng 6/2026
  weekCursor: new Date(2026, 5, 1),
  lot: '',
  type: '',
  area: '',
  crop: 'Lúa IR50404',
  milestones: null,
};

/* ---------- DOM ---------- */
const $ = s => document.querySelector(s);
const cal = $('#scCal');
const ctxEl = $('#scContext');
const calWrap = $('.sc-calwrap');

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

/* ---------- TIỆN ÍCH NGÀY ---------- */
const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
// Thứ 2 là ngày đầu tuần
const mondayOf = d => { const w = (d.getDay() + 6) % 7; return addDays(d, -w); };
// Một sự kiện hiện trên lịch khi khớp cả 3 bộ lọc: lô, loại, khu vực
const matches = e =>
  (!state.lot || e.lot === state.lot) &&
  (!state.type || e.type === state.type) &&
  (!state.area || e.place === state.area);
const eventsOn = key => EVENTS.filter(e => e.date === key && matches(e));

/* ---------- RENDER BỐI CẢNH (chip trên lịch) ---------- */
function renderContext() {
  const label = state.view === 'week'
    ? 'Tuần ' + iso(mondayOf(state.weekCursor)).slice(8) + '/' + MONTH_NAMES[mondayOf(state.weekCursor).getMonth()].replace('Tháng ', '')
    : MONTH_NAMES[state.cursor.getMonth()] + ', ' + state.cursor.getFullYear();
  let html = `
    <span class="ctx-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22V12"/><path d="M12 12c0-4 3-7 8-7 0 4-3 7-8 7z"/><path d="M12 12C12 8 9 5 4 5c0 4 3 7 8 7z"/></svg>${escapeHtml(state.crop)}</span>
    <span class="ctx-chip month">${label}</span>
    <span class="ctx-chip">${escapeHtml($('#coopSelect').value)}</span>`;
  if (state.lot) html += filterChip('lot', 'Đang lọc: ' + state.lot);
  if (state.type) html += filterChip('type', 'Loại: ' + TYPE_NAME[state.type]);
  if (state.area) html += filterChip('area', 'Khu vực: ' + state.area);
  ctxEl.innerHTML = html;
}
const TYPE_NAME = { sow: 'Gieo sạ', spray: 'Phun thuốc', fert: 'Bón phân', check: 'Kiểm tra' };
function filterChip(key, text) {
  return `<span class="ctx-chip ${key === 'lot' ? 'lot' : ''}">${escapeHtml(text)}
    <button type="button" data-clear="${key}" aria-label="Bỏ bộ lọc ${escapeHtml(text)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></span>`;
}

/* ---------- Ô lịch ---------- */
function dayCell(day, inMonth) {
  const key = iso(day);
  const list = eventsOn(key);
  const shown = list.slice(0, 3);
  return `
    <div class="sc-day ${inMonth ? '' : 'out'} ${sameDay(day, TODAY) ? 'today' : ''}" data-date="${key}">
      <span class="sc-daynum">${day.getDate()}</span>
      ${shown.map(e => `
        <div class="sc-event ${e.type}" tabindex="0" role="button" data-id="${e.id}" title="${escapeHtml(e.title)} — ${escapeHtml(e.lot)}">
          <b>${escapeHtml(e.title)}</b>
          <small>${escapeHtml(e.crop)} · ${escapeHtml(e.lot)}</small>
          <small>${escapeHtml(e.place)}</small>
        </div>`).join('')}
      ${list.length > 3 ? `<span class="sc-day-more">+${list.length - 3} sự kiện khác</span>` : ''}
    </div>`;
}

function renderMonth() {
  const first = new Date(state.cursor.getFullYear(), state.cursor.getMonth(), 1);
  const start = mondayOf(first);
  let cells = '';
  for (let i = 0; i < 42; i++) {
    const d = addDays(start, i);
    cells += dayCell(d, d.getMonth() === state.cursor.getMonth());
  }
  const total = EVENTS.filter(e => e.date.slice(5, 7) === String(state.cursor.getMonth() + 1).padStart(2, '0') && matches(e)).length;
  cal.innerHTML = `
    <div class="sc-cal-head">${DOW.map(d => `<span>${d}</span>`).join('')}</div>
    <div class="sc-cal-grid">${cells}</div>
    ${total === 0 ? emptyHtml() : ''}`;
}

function renderWeek() {
  const start = mondayOf(state.weekCursor);
  let cells = '';
  for (let i = 0; i < 7; i++) cells += dayCell(addDays(start, i), true);
  const weekEvents = EVENTS.filter(e => {
    const d = new Date(e.date + 'T00:00:00');
    return matches(e) && d >= start && d < addDays(start, 7);
  }).length;
  cal.innerHTML = `
    <div class="sc-cal-head">${DOW.map(d => `<span>${d}</span>`).join('')}</div>
    <div class="sc-week">${cells}</div>
    ${weekEvents === 0 ? emptyHtml() : ''}`;
}

/* ---------- VIEW GIAI ĐOẠN MÙA VỤ ---------- */
function renderStage() {
  const crops = (window.CATALOG ? CATALOG.CROPS : []).filter(c => c.status === 'active');
  cal.innerHTML = `<div class="sc-stages">` + crops.map((c, idx) => {
    const n = c.stages.length;
    const nowIdx = idx === 0 ? 1 : idx;             // tiến độ minh hoạ theo từng cây
    return `
      <div class="sc-stage-row">
        <h3>${escapeHtml(c.label)} — chu kỳ ${c.cycleMin}–${c.cycleMax} ngày · ${escapeHtml(c.group)}</h3>
        <div class="sc-stage-line">
          ${c.stages.map((s, i) => `
            <span class="sc-stage-node ${i < nowIdx ? 'done' : i === nowIdx ? 'now' : ''}">${escapeHtml(s)}</span>
            ${i < n - 1 ? `<span class="sc-stage-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>` : ''}
          `).join('')}
        </div>
      </div>`;
  }).join('') + `</div>`;
}

function emptyHtml() {
  const filtered = state.lot || state.type || state.area;
  return `
    <div class="sc-empty">
      <svg class="art" viewBox="0 0 200 120" fill="none" aria-hidden="true">
        <ellipse cx="100" cy="104" rx="88" ry="14" fill="#e8f5e9"/>
        <path d="M12 78c26-16 44-16 62-4s40 12 62 0 40-10 52-4v34H12z" fill="#c8e6c9"/>
        <path d="M100 96V64" stroke="#2e7d32" stroke-width="4" stroke-linecap="round"/>
        <path d="M100 66c-2-14-12-22-26-23 1 15 11 23 26 23z" fill="#66bb6a"/>
        <path d="M100 66c2-14 12-22 26-23-1 15-11 23-26 23z" fill="#43a047"/>
        <ellipse cx="100" cy="97" rx="17" ry="5" fill="#8d6e63"/>
      </svg>
      <p>${filtered ? 'Không có sự kiện nào khớp với bộ lọc hiện tại.' : 'Chưa có sự kiện nào trong khoảng thời gian này.'}</p>
      <span>${filtered
        ? 'Thử bỏ bớt bộ lọc lô / loại sự kiện / khu vực để xem toàn bộ lịch của HTX.'
        : 'Dùng AI sinh checklist mùa vụ để tạo lịch công việc cho toàn hợp tác xã.'}</span>
    </div>`;
}

/* ---------- RENDER CHUNG ---------- */
function render() {
  renderContext();
  if (state.view === 'month') renderMonth();
  else if (state.view === 'week') renderWeek();
  else renderStage();
}

/* ---------- TAB CHẾ ĐỘ XEM ---------- */
document.querySelectorAll('.pilltab').forEach(tab => {
  tab.addEventListener('click', () => {
    state.view = tab.dataset.view;
    document.querySelectorAll('.pilltab').forEach(t => {
      const on = t === tab;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on);
    });
    render();
  });
});

/* ---------- ĐIỀU HƯỚNG TRƯỚC / SAU / HÔM NAY ---------- */
$('#btnPrev').addEventListener('click', () => step(-1));
$('#btnNext').addEventListener('click', () => step(1));
$('#btnToday').addEventListener('click', () => {
  state.cursor = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
  state.weekCursor = mondayOf(TODAY);
  render();
});
function step(dir) {
  if (state.view === 'week') state.weekCursor = addDays(state.weekCursor, 7 * dir);
  else state.cursor = new Date(state.cursor.getFullYear(), state.cursor.getMonth() + dir, 1);
  render();
}

/* ---------- THÊM SỰ KIỆN THỦ CÔNG ---------- */
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Sự kiện thủ công luôn rơi vào tháng/tuần đang xem
    const anchor = state.view === 'week'
      ? state.weekCursor
      : new Date(state.cursor.getFullYear(), state.cursor.getMonth(), Math.min(TODAY.getDate(), 28));
    const date = iso(anchor);
    EVENTS.push({
      id: 'EV-' + String(EVENTS.length + 1).padStart(2, '0'),
      date, title: btn.dataset.quick, crop: state.crop, lot: state.lot || 'Toàn HTX',
      place: 'Cánh đồng A', type: QUICK_TYPE[btn.dataset.quick],
    });
    render();
    showToast(`Đã thêm "${btn.dataset.quick}" vào ${date.slice(8)}/${date.slice(5, 7)}`);
  });
});

/* ---------- BẤM VÀO SỰ KIỆN: đổi trạng thái hoàn thành ---------- */
cal.addEventListener('click', e => {
  const ev = e.target.closest('.sc-event');
  if (!ev) return;
  const item = EVENTS.find(x => x.id === ev.dataset.id);
  ev.classList.toggle('dim');
  showToast(item.title + ' — ' + item.lot + ' · ' + (ev.classList.contains('dim') ? 'đánh dấu đã xong' : 'mở lại'));
});
// Chip bộ lọc nằm ngoài vùng lịch nên bắt sự kiện riêng
ctxEl.addEventListener('click', e => {
  const btn = e.target.closest('[data-clear]');
  if (!btn) return;
  const key = btn.dataset.clear;
  state[key] = '';
  if (key === 'type') $('#typeFilter').value = '';
  if (key === 'area') $('#areaFilter').value = '';
  render();
});

/* ---------- CHỌN HTX ---------- */
$('#coopSelect').addEventListener('change', () => { render(); showToast('Đã chuyển sang ' + $('#coopSelect').value); });

/* ---------- BỘ LỌC LOẠI SỰ KIỆN / KHU VỰC ---------- */
// Khu vực lấy từ danh mục chuẩn + các place có thật trong lịch sử kiện
function buildAreaFilter() {
  const sel = $('#areaFilter');
  const fromEvents = EVENTS.map(e => e.place);
  const fromCatalog = (window.CATALOG ? CATALOG.REGIONS : []);
  const areas = [...new Set(fromEvents.concat(fromCatalog))].sort();
  sel.innerHTML = '<option value="">Tất cả khu vực</option>'
    + areas.map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join('');
}
$('#typeFilter').addEventListener('change', () => { state.type = $('#typeFilter').value; render(); });
$('#areaFilter').addEventListener('change', () => { state.area = $('#areaFilter').value; render(); });

/* ---------- Nút AI ở đầu trang: mở panel AI bên phải ---------- */
$('#btnAiGenerate').addEventListener('click', () => {
  const panel = $('.sc-ai');
  panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  panel.classList.add('flash');
  setTimeout(() => panel.classList.remove('flash'), 1200);
  $('#aiCrop').focus({ preventScroll: true });
});

/* ============================================================
   AI SINH CHECKLIST MÙA VỤ
   ============================================================ */
const aiForm = $('#aiForm');
const aiCrop = $('#aiCrop');
const aiProgress = $('#aiProgress');
const aiResult = $('#aiResult');
const aiError = $('#aiError');
let aiTimer = null;

// Danh sách cây: 4 giống chuẩn (từ danh mục) + 2 giống ngoài danh mục để thử lỗi
function buildCropSelect() {
  const standard = (window.CATALOG ? CATALOG.CROPS : []).map(c => `<option value="${escapeHtml(c.label)}">${escapeHtml(c.label)}</option>`).join('');
  aiCrop.innerHTML = standard
    + `<option value="Khoai tây tím Đà Lạt">Khoai tây tím Đà Lạt</option>`
    + `<option value="Sầu riêng Ri6">Sầu riêng Ri6</option>`;
  aiCrop.value = 'Lúa IR50404';
}

aiCrop.addEventListener('change', () => {
  $('#fa-crop').classList.remove('error');
  aiError.hidden = true;
});

aiForm.addEventListener('submit', e => {
  e.preventDefault();                       // không tải lại trang khi sinh lịch
  const cropLabel = aiCrop.value;
  const date = $('#aiDate').value;
  const area = parseFloat($('#aiArea').value);
  let ok = true;

  if (!window.CATALOG || !CATALOG.hasVariety(cropLabel)) { $('#fa-crop').classList.add('error'); ok = false; }
  else $('#fa-crop').classList.remove('error');
  if (!date) { $('#fa-date').classList.add('error'); ok = false; } else $('#fa-date').classList.remove('error');
  if (!(area > 0)) { $('#fa-area').classList.add('error'); ok = false; } else $('#fa-area').classList.remove('error');

  aiResult.hidden = true; aiError.hidden = true;
  if (!ok) {
    // Cây nằm ngoài danh mục chuẩn -> hiện thêm hộp cảnh báo đỏ như thiết kế
    if (!window.CATALOG || !CATALOG.hasVariety(aiCrop.value)) showAiError('AI chưa có dữ liệu chuẩn cho "' + aiCrop.value + '".');
    showToast('Vui lòng kiểm tra lại biểu mẫu AI');
    return;
  }

  runAi(cropLabel, date, area);
});

// Giả lập bất đồng bộ: tiến trình tăng dần rồi mới trả kết quả
function runAi(cropLabel, dateStr, area) {
  clearInterval(aiTimer);
  aiProgress.hidden = false;
  $('#aiProgressPct').textContent = '0%';
  $('#aiProgressFill').style.width = '0%';
  $('#btnAiApply').hidden = true;

  let p = 0;
  aiTimer = setInterval(() => {
    p += 12 + Math.floor(Math.random() * 12);
    if (p >= 100) p = 100;
    $('#aiProgressPct').textContent = p + '%';
    $('#aiProgressFill').style.width = p + '%';
    if (p === 100) {
      clearInterval(aiTimer);
      aiProgress.hidden = true;
      showMilestones(cropLabel, dateStr, area);
    }
  }, 180);
}

// Mốc lịch tính từ chính danh mục chuẩn: giai đoạn + chu kỳ + sâu bệnh của cây
function showMilestones(cropLabel, dateStr, area) {
  const crop = CATALOG.CROPS.find(c => c.label === cropLabel);
  if (!crop) { showAiError('Chưa có dữ liệu chuẩn cho "' + cropLabel + '".'); return; }

  const start = new Date(dateStr + 'T00:00:00');
  const pest = CATALOG.PESTS.find(p => p.crops.toLowerCase().includes(crop.name.toLowerCase()) && p.status === 'active');
  const list = [];

  list.push({ day: 1, text: 'Làm đất, bón vôi và vệ sinh đồng ruộng' });
  list.push({ day: 10, text: 'Bón lót đợt 1' });
  crop.stages.forEach((s, i) => {
    if (i === 0) return;
    list.push({ day: Math.round(crop.cycleMin * i / crop.stages.length), text: 'Vào giai đoạn: ' + s });
  });
  if (pest) list.push({ day: 30, text: 'Phun ngừa ' + pest.name + ' (' + pest.group + ')' });
  list.push({ day: crop.cycleMin, text: 'Thu hoạch — diện tích ' + area + ' ha' });

  list.sort((a, b) => a.day - b.day);
  state.milestones = list;

  $('#aiMilestones').innerHTML = list.map((m, i) => `
    <li class="${i === 0 ? 'done' : i === 1 ? 'next' : ''}">
      <span class="mday">Ngày ${m.day}</span>
      <span>${escapeHtml(m.text)}</span>
      <span style="margin-left:auto">${i === 0 ? '✔' : ''}</span>
    </li>`).join('');
  $('#aiWhy').textContent = 'Lịch được đề xuất dựa trên giai đoạn sinh trưởng của '
    + crop.label + ', chu kỳ chuẩn ' + crop.cycleMin + '–' + crop.cycleMax
    + ' ngày trong danh mục và diện tích quy hoạch ' + area + ' ha.';
  aiResult.hidden = false;
  $('#btnAiApply').hidden = false;
  state.crop = cropLabel;
  state.weekCursor = start;
  state.cursor = new Date(start.getFullYear(), start.getMonth(), 1);
}

function showAiError(msg) {
  $('#aiErrorMsg').textContent = msg + ' Vui lòng chọn loại cây khác hoặc tự xây dựng lịch công việc.';
  aiError.hidden = false;
}

// Áp dụng: biến mỗi mốc thành sự kiện thật trên lịch
$('#btnAiApply').addEventListener('click', () => {
  if (!state.milestones) return;
  const start = new Date($('#aiDate').value + 'T00:00:00');
  const lot = state.lot || 'Toàn HTX';
  state.milestones.forEach(m => {
    const d = addDays(start, m.day - 1);
    EVENTS.push({
      id: 'EV-' + String(EVENTS.length + 1).padStart(2, '0'),
      date: iso(d), title: m.text, crop: state.crop, lot,
      place: $('#coopSelect').value.replace('HTX Nông nghiệp ', '').replace('HTX ', ''),
      type: /thu hoạch/i.test(m.text) ? 'sow' : /phun/i.test(m.text) ? 'spray' : /phân|đất/i.test(m.text) ? 'fert' : 'check',
    });
  });
  render();
  showToast('Đã áp dụng ' + state.milestones.length + ' mốc lịch cho ' + lot);
});

$('#btnAiManual').addEventListener('click', () => {
  aiError.hidden = true;
  $('#aiCrop').focus();
  showToast('Chế độ tự tạo: dùng nút thêm sự kiện thủ công phía trên');
});
$('#btnAiReset').addEventListener('click', () => {
  aiForm.reset(); buildCropSelect();
  aiResult.hidden = true; aiError.hidden = true; aiProgress.hidden = true;
  $('#btnAiApply').hidden = true;
  ['fa-crop', 'fa-date', 'fa-area'].forEach(id => $('#' + id).classList.remove('error'));
  state.milestones = null;
});

/* ---------- THU GỌN SIDEBAR ---------- */
$('#hamburger').addEventListener('click', () => document.body.classList.toggle('collapsed'));

/* ---------- DEEP LINK: schedule.html?lot=Lô%20B2&type=spray&area=... ---------- */
function readQuery() {
  const p = new URLSearchParams(window.location.search);
  if (p.get('lot')) state.lot = p.get('lot');
  if (p.get('type')) { state.type = p.get('type'); $('#typeFilter').value = state.type; }
  if (p.get('area')) { state.area = p.get('area'); $('#areaFilter').value = state.area; }
  if (p.get('crop') && (window.CATALOG && CATALOG.hasVariety(p.get('crop')))) state.crop = p.get('crop');
}

/* ---------- TOAST ---------- */
let toastTimer;
function showToast(msg) {
  $('#toastMsg').textContent = msg;
  const toast = $('#toast');
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ---------- KHỞI ĐỘNG: skeleton rồi mới hiện lịch ---------- */
function boot() {
  buildCropSelect();
  buildAreaFilter();
  readQuery();
  $('#skGrid').innerHTML = Array.from({ length: 21 }, () => '<span class="sk-cell"></span>').join('');
  $('#scSkeleton').hidden = false;
  cal.hidden = true;
  renderContext();
  setTimeout(() => {
    $('#scSkeleton').hidden = true;
    cal.hidden = false;
    render();
  }, 700);
}
boot();
