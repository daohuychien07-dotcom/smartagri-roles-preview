/* ============================================================
   SmartAgri - Cấu hình hệ thống (JS)
   Chuyển tab, thu/thả giá trị form, lưu localStorage,
   khôi phục mặc định, validate số, toast.
   ============================================================ */

const STORAGE_KEY = 'smartagri_settings_v1';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* Danh sách trường điều khiển được */
function fields() {
  return $$('#settingsForm [name]').map(el => el.name);
}

/* Đọc giá trị hiện tại của form -> object */
function readForm() {
  const data = {};
  $$('#settingsForm [name]').forEach(el => {
    data[el.name] = el.type === 'checkbox' ? el.checked : el.value;
  });
  return data;
}

/* Ghi object -> form */
function writeForm(data) {
  $$('#settingsForm [name]').forEach(el => {
    if (!(el.name in data)) return;
    if (el.type === 'checkbox') el.checked = !!data[el.name];
    else el.value = data[el.name];
  });
}

/* ---------- Validate nhanh các ô số ---------- */
function validate() {
  let ok = true;
  $$('#settingsForm input[type="number"]').forEach(el => {
    const row = el.closest('.frow');
    const v = el.value.trim();
    const num = Number(v);
    const bad = v === '' || Number.isNaN(num) ||
      (el.min !== '' && num < Number(el.min)) ||
      (el.max !== '' && num > Number(el.max));
    if (row) row.classList.toggle('error', bad);
    if (bad) ok = false;
  });
  return ok;
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg) {
  const toast = $('#toast');
  $('#toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ---------- Lưu / nạp ---------- */
function save() {
  if (!validate()) { showToast('Vui lòng kiểm tra lại các giá trị nhập'); return; }
  const data = readForm();
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { /* bỏ qua nếu bị chặn */ }
  const now = new Date();
  $('#savedTime').textContent = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  $('#savedNote').hidden = false;
  showToast('Đã lưu cấu hình hệ thống');
}

function load() {
  let raw = null;
  try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) { raw = null; }
  if (raw) { try { writeForm(JSON.parse(raw)); } catch (e) { /* dữ liệu hỏng -> dùng mặc định */ } }
}

/* ---------- Khởi tạo ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Chụp giá trị mặc định (đúng như HTML khai báo) trước khi nạp localStorage
  const DEFAULTS = readForm();

  load();

  // Chuyển tab
  $$('.stab').forEach(tab => tab.addEventListener('click', () => {
    $$('.stab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
    $$('.spanel').forEach(p => p.classList.toggle('active', p.dataset.panel === tab.dataset.tab));
  }));

  // Lưu
  $('#settingsForm').addEventListener('submit', e => { e.preventDefault(); save(); });
  $('#btnSave').addEventListener('click', save);

  // Khôi phục mặc định
  $('#btnReset').addEventListener('click', () => {
    writeForm(DEFAULTS);
    $$('#settingsForm .frow.error').forEach(r => r.classList.remove('error'));
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* noop */ }
    $('#savedNote').hidden = true;
    showToast('Đã khôi phục cấu hình mặc định');
  });

  // Bỏ lỗi red khi người dùng sửa
  $$('#settingsForm input[type="number"]').forEach(el =>
    el.addEventListener('input', () => el.closest('.frow')?.classList.remove('error')));

  // Hamburger (logout xử lý ở js/session.js)
  $('#hamburger').addEventListener('click', () => document.body.classList.toggle('collapsed'));
});
