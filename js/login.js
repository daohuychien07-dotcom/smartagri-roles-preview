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

// ==================== CHỌN VAI TRÒ -> MÀN HÌNH NHẬP TÀI KHOẢN ====================
const roleCards = document.querySelectorAll('.role-card');

// Tài khoản demo cố định cho mỗi vai trò. Dự án chưa có backend nên đây là
// mảng giả lập ngay trong js/login.js (không có key/secret nào - xem VP-01).
// Vai trò Nông dân KHÔNG có ở đây: khối nong-dan/ giữ form đăng nhập riêng
// của bạn phụ trách khối đó (nong-dan/login.html + nong-dan/js/login.js).
const DEMO_ACCOUNTS = {
  admin: { username: 'quantri', password: 'admin2026' },
  coop: { username: 'dieopho', password: 'htx2026' },
  expert: { username: 'chuyengia', password: 'agri2026' },
};

roleCards.forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    // Nông dân -> sang màn hình đăng nhập riêng của khối nong-dan/ (href thật của thẻ)
    if (card.dataset.scope === 'farmer' || !DEMO_ACCOUNTS[card.dataset.scope]) {
      window.location.href = card.getAttribute('href');
      return;
    }
    openCred(card); // 3 vai trò còn lại: hiện màn hình nhập tài khoản/mật khẩu
  });
});

// ==================== MÀN HÌNH NHẬP TÀI KHOẢN ====================
const mainEl = document.querySelector('.login-main');
const credPanel = document.getElementById('credPanel');
const credForm = document.getElementById('credForm');
const credUser = document.getElementById('credUser');
const credPass = document.getElementById('credPass');
const credSubmit = document.getElementById('credSubmit');
const credBtnText = document.getElementById('credBtnText');
let pendingCard = null; // thẻ vai trò vừa bấm: {role, short, initials, scope, href}

function openCred(card) {
  pendingCard = card;
  const acc = DEMO_ACCOUNTS[card.dataset.scope];

  // textContent (không phải innerHTML): tên vai trò chỉ tới từ dataset của thẻ,
  // nhưng giữ nguyên tắc dựng DOM an toàn như chỗ khác trong site.
  document.getElementById('credRoleName').textContent = card.dataset.short;
  document.getElementById('credDemoUser').textContent = acc.username;
  document.getElementById('credDemoPass').textContent = acc.password;

  credForm.reset();
  clearFieldError('cf-user'); clearFieldError('cf-pass');
  setLoading(false);

  mainEl.classList.add('is-auth');
  credPanel.hidden = false;
  credUser.focus();
}

function closeCred() {
  credPanel.hidden = true;
  mainEl.classList.remove('is-auth');
  if (pendingCard) pendingCard.focus();
  pendingCard = null;
}

document.getElementById('credBack').addEventListener('click', closeCred);

// Nút hiện/ẩn mật khẩu: đổi type + đổi nhãn cho trình đọc màn hình
const credEye = document.getElementById('credEye');
credEye.addEventListener('click', () => {
  const show = credPass.type === 'password';
  credPass.type = show ? 'text' : 'password';
  credEye.setAttribute('aria-pressed', String(show));
  credEye.setAttribute('aria-label', show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu');
  credPass.focus();
});

// "Điền nhanh" cho buổi demo/thuyết trình: đổ đúng tài khoản demo của vai trò đang chọn
document.getElementById('credFill').addEventListener('click', () => {
  if (!pendingCard) return;
  const acc = DEMO_ACCOUNTS[pendingCard.dataset.scope];
  credUser.value = acc.username;
  credPass.value = acc.password;
  clearFieldError('cf-user'); clearFieldError('cf-pass');
  credSubmit.focus();
});

function setFieldError(id, msg) {
  const field = document.getElementById(id);
  field.classList.add('error');
  field.querySelector('.err-msg').textContent = msg;
}
function clearFieldError(id) {
  const field = document.getElementById(id);
  field.classList.remove('error');
  field.querySelector('.err-msg').textContent = '';
}

function setLoading(isLoading) {
  credSubmit.disabled = isLoading;
  credSubmit.classList.toggle('is-loading', isLoading);
  credBtnText.textContent = isLoading ? 'Đang đăng nhập...' : 'Đăng nhập';
}

credForm.addEventListener('submit', e => {
  e.preventDefault(); // không tải lại trang; tự kiểm tra bằng JavaScript
  if (!pendingCard) return;

  const user = credUser.value.trim();
  const pass = credPass.value;
  const acc = DEMO_ACCOUNTS[pendingCard.dataset.scope];

  let ok = true;
  if (!user) { setFieldError('cf-user', 'Bạn chưa nhập tài khoản.'); ok = false; }
  else if (user.length < 4) { setFieldError('cf-user', 'Tài khoản phải có ít nhất 4 ký tự.'); ok = false; }
  else clearFieldError('cf-user');

  if (!pass) { setFieldError('cf-pass', 'Bạn chưa nhập mật khẩu.'); ok = false; }
  else if (pass.length < 6) { setFieldError('cf-pass', 'Mật khẩu phải có ít nhất 6 ký tự.'); ok = false; }
  else clearFieldError('cf-pass');

  if (!ok) {
    (user ? credPass : credUser).focus();
    return;
  }

  setLoading(true);

  // Giả lập độ trễ gọi API (800 ms) để giao diện có trạng thái Loading trước
  // khi báo kết quả - cùng cách làm ở nong-dan/js/login.js.
  setTimeout(() => {
    if (user !== acc.username || pass !== acc.password) {
      setLoading(false);
      setFieldError('cf-pass', 'Sai tài khoản hoặc mật khẩu. Xem lại dòng demo bên dưới.');
      credPanel.classList.add('is-shaking');
      setTimeout(() => credPanel.classList.remove('is-shaking'), 450);
      showToast('Đăng nhập thất bại — sai tài khoản hoặc mật khẩu');
      credPass.select();
      credPass.focus();
      return;
    }

    const role = pendingCard.dataset.role;
    const target = pendingCard.getAttribute('href');

    // scope là khoá phạm vi giao diện (js/roles.js) - menu + trang vai trò này được dùng
    localStorage.setItem(ROLE_KEY, JSON.stringify({
      role, short: pendingCard.dataset.short, initials: pendingCard.dataset.initials,
      scope: pendingCard.dataset.scope, user: acc.username, at: Date.now(),
    }));

    roleCards.forEach(c => c.classList.remove('is-loading'));
    pendingCard.classList.add('is-loading');
    showToast('Đăng nhập thành công với vai trò ' + role);

    setTimeout(() => { window.location.href = target; }, 700);
  }, 800);
});

// Bỏ lỗi ngay khi người dùng sửa trường
credUser.addEventListener('input', () => clearFieldError('cf-user'));
credPass.addEventListener('input', () => clearFieldError('cf-pass'));

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
// Escape: ưu tiên đóng modal đăng ký; nếu chỉ có màn hình nhập tài khoản đang
// mở thì quay lại lưới chọn vai trò (quy chế A11y: Esc đóng được lớp phủ).
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (backdrop.classList.contains('open')) { closeRegister(); return; }
  if (!credPanel.hidden) closeCred();
});

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
// Dựng DOM từng nút thay vì ghép chuỗi HTML: tên do người dùng nhập KHÔNG bao giờ
// được trình duyệt parse thành markup (chống XSS — xem mục An toàn trong README).
function showSentNote(name) {
  const note = document.getElementById('sentNote');
  if (!note) return;
  note.textContent = '';

  const who = document.createElement('strong');
  who.textContent = name;

  const link = document.createElement('a');
  link.href = 'users.html?status=pending';
  link.textContent = 'Quản lý tài khoản người dùng';

  const state = document.createElement('strong');
  state.textContent = 'Đang chờ duyệt';

  note.append(
    '✓ Hồ sơ của ', who,
    ' đã được đẩy tới trang ', link,
    ' ở trạng thái ', state, '.'
  );
  note.hidden = false;
}

// Bỏ lỗi ngay khi người dùng sửa trường
['regName:rf-name', 'regEmail:rf-email', 'regPhone:rf-phone', 'regRole:rf-role', 'regPass:rf-pass', 'regRepass:rf-repass']
  .forEach(pair => {
    const [inputId, fieldId] = pair.split(':');
    document.getElementById(inputId).addEventListener('input', () => clearError(fieldId));
  });
document.getElementById('regTerms').addEventListener('change', () => clearError('rf-terms'));
