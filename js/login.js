/* ============================================================
   SmartAgri - Trang Đăng nhập với tư cách
   CropMate AI - CSE122 BTL
   Vanilla JS: chọn vai trò (lưu localStorage + chuyển trang),
   mở/đóng modal đăng ký, form validation, toast.
   ============================================================ */

const ROLE_KEY = 'smartagri_role_v1';

// ==================== TOAST ====================
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// ==================== CHỌN VAI TRÒ ĐĂNG NHẬP ====================
const roleCards = document.querySelectorAll('.role-card');

roleCards.forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault(); // giữ quyền kiểm soát: hiện trạng thái "đang đăng nhập" rồi mới chuyển trang
    const role = card.dataset.role;
    const target = card.getAttribute('href');

    // scope là khoá phạm vi giao diện (js/roles.js) - menu + trang vai trò này được dùng
    localStorage.setItem(ROLE_KEY, JSON.stringify({
      role, short: card.dataset.short, initials: card.dataset.initials,
      scope: card.dataset.scope, at: Date.now(),
    }));

    roleCards.forEach(c => c.classList.remove('is-loading'));
    card.classList.add('is-loading');
    showToast('Đang đăng nhập với vai trò ' + role + '...');

    setTimeout(() => { window.location.href = target; }, 850);
  });
});

// Đánh dấu vai trò đã chọn lần trước
(function markLastRole() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(ROLE_KEY)); } catch (err) { saved = null; }
  if (!saved || !saved.role) return;
  roleCards.forEach(c => {
    if (c.dataset.role === saved.role) {
      c.classList.add('is-last');
      c.title = 'Bạn đã đăng nhập bằng vai trò này gần nhất';
    }
  });
})();

// ==================== MODAL ĐĂNG KÝ ====================
const backdrop = document.getElementById('regBackdrop');
const regForm = document.getElementById('regForm');

function openRegister() {
  backdrop.classList.add('open');
  regForm.reset();
  ['rf-name', 'rf-email', 'rf-phone', 'rf-role', 'rf-pass', 'rf-repass', 'rf-terms'].forEach(clearError);
  setTimeout(() => document.getElementById('regName').focus(), 60);
}
function closeRegister() { backdrop.classList.remove('open'); }

document.getElementById('btnRegister').addEventListener('click', openRegister);
document.getElementById('regClose').addEventListener('click', closeRegister);
document.getElementById('regCancel').addEventListener('click', closeRegister);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeRegister(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeRegister(); });

// ==================== FORM VALIDATION ====================
function setError(id) { document.getElementById(id).classList.add('error'); }
function clearError(id) { document.getElementById(id).classList.remove('error'); }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^0\d{9}$/;

// Vai trò ở form đăng ký -> vai trò hệ thống dùng ở trang tài khoản
const ROLE_TO_USER = {
  'Nông dân': 'Nông dân',
  'Chuyên gia nông nghiệp': 'Chuyên gia',
  'Điều phối Hợp tác xã': 'Điều phối HTX',
};

regForm.addEventListener('submit', e => {
  e.preventDefault(); // không tải lại trang; tự kiểm tra bằng JavaScript

  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const role = document.getElementById('regRole').value;
  const pass = document.getElementById('regPass').value;
  const repass = document.getElementById('regRepass').value;
  const terms = document.getElementById('regTerms').checked;

  let ok = true;

  if (name.length < 3) { setError('rf-name'); ok = false; } else clearError('rf-name');
  if (!EMAIL_RE.test(email)) { setError('rf-email'); ok = false; } else clearError('rf-email');
  if (!PHONE_RE.test(phone)) { setError('rf-phone'); ok = false; } else clearError('rf-phone');
  if (!role) { setError('rf-role'); ok = false; } else clearError('rf-role');
  if (pass.length < 6) { setError('rf-pass'); ok = false; } else clearError('rf-pass');
  if (!repass || repass !== pass) { setError('rf-repass'); ok = false; } else clearError('rf-repass');
  if (!terms) { setError('rf-terms'); ok = false; } else clearError('rf-terms');

  if (!ok) {
    const firstErr = document.querySelector('.form-field.error input, .form-field.error select');
    if (firstErr) firstErr.focus();
    showToast('Vui lòng kiểm tra lại các trường bị đánh dấu đỏ');
    return;
  }

  // Đẩy hồ sơ sang kho đăng ký -> trang Quản lý tài khoản người dùng sẽ đọc ra
  const today = new Date();
  const pad = n => String(n).padStart(2, '0');
  REG.add({
    id: 100 + REG.all().length + 1,
    name,
    email,
    phone: phone.replace(/^(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3'),
    role: ROLE_TO_USER[role] || role,
    status: 'pending',
    joined: pad(today.getDate()) + '/' + pad(today.getMonth() + 1) + '/' + today.getFullYear(),
    area: document.getElementById('regArea').value.trim(),
    source: 'dang-ky',
  });

  closeRegister();
  showToast('Đã gửi đăng ký — hồ sơ nằm trong danh sách chờ duyệt');
  showSentNote(name);
});

// Ghi chú "đã gửi" kèm link tới trang Quản lý tài khoản (bộ lọc Đang chờ duyệt)
function showSentNote(name) {
  const note = document.getElementById('sentNote');
  if (!note) return;
  note.innerHTML = '✓ Hồ sơ của <strong>' + name + '</strong> đã được đẩy tới trang '
    + '<a href="users.html?status=pending">Quản lý tài khoản người dùng</a> ở trạng thái <strong>Đang chờ duyệt</strong>.';
  note.hidden = false;
}

// Bỏ lỗi ngay khi người dùng sửa trường
['regName:rf-name', 'regEmail:rf-email', 'regPhone:rf-phone', 'regRole:rf-role', 'regPass:rf-pass', 'regRepass:rf-repass']
  .forEach(pair => {
    const [inputId, fieldId] = pair.split(':');
    document.getElementById(inputId).addEventListener('input', () => clearError(fieldId));
  });
document.getElementById('regTerms').addEventListener('change', () => clearError('rf-terms'));
