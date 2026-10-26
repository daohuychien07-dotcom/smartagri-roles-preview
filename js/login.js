/* ============================================================
   SmartAgri - Trang Đăng nhập với tư cách
   CropMate AI - CSE122 BTL
   Vanilla JS: chọn vai trò -> màn hình nhập tài khoản (lưu localStorage + chuyển
   trang), màn hình Quên mật khẩu 2 bước, mở/đóng modal đăng ký, form validation, toast.
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

// Mật khẩu mới sau bước "Quên mật khẩu" ghi đè lên mật khẩu demo mặc định.
// Lưu riêng một khóa để không đụng vào DEMO_ACCOUNTS (mảng hằng, không đổi được).
const PWD_KEY = 'smartagri_demo_pwd_v1';

function pwdOverrides() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(PWD_KEY)); } catch (err) { saved = null; }
  return saved && typeof saved === 'object' ? saved : {};
}

// Tài khoản thật dùng để kiểm tra khi đăng nhập = demo + bản ghi đè (nếu đã đổi)
function accountFor(scope) {
  const base = DEMO_ACCOUNTS[scope];
  if (!base) return null;
  const over = pwdOverrides();
  return { username: base.username, password: typeof over[scope] === 'string' ? over[scope] : base.password };
}

// Sinh mã xác nhận 6 chữ số từ chính chuỗi tài khoản (không dùng Math.random):
// bấm lại vẫn ra cùng một mã, tiện quay video demo và giải thích được.
function demoCodeFor(account) {
  let h = 5381;
  const s = String(account).toLowerCase().trim();
  for (let i = 0; i < s.length; i += 1) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return String(h % 1000000).padStart(6, '0');
}

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
  const acc = accountFor(card.dataset.scope);

  // textContent (không phải innerHTML): tên vai trò chỉ tới từ dataset của thẻ,
  // nhưng giữ nguyên tắc dựng DOM an toàn như chỗ khác trong site.
  document.getElementById('credRoleName').textContent = card.dataset.short;
  document.getElementById('credDemoUser').textContent = acc.username;
  document.getElementById('credDemoPass').textContent = acc.password;
  credUser.placeholder = 'ví dụ: ' + acc.username;

  credForm.reset();
  clearFieldError('cf-user'); clearFieldError('cf-pass');
  setLoading(false);
  closeReset();

  mainEl.classList.add('is-auth');
  credPanel.hidden = false;
  credUser.focus();
}

function closeCred() {
  credPanel.hidden = true;
  closeReset();
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
  const acc = accountFor(pendingCard.dataset.scope);
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
  const acc = accountFor(pendingCard.dataset.scope);

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

    // Khoi chuyen-gia/ la app doc lap cua SV2, moi trang kiem tra phien bang
    // sessionStorage. Cong chung phai ghi hai khoa nay thi chuyen gia moi vao
    // duoc ma khong bi do ve chuyen-gia/login.html.
    if (pendingCard.dataset.scope === 'expert') {
      sessionStorage.setItem('smartagri_auth', '1');
      sessionStorage.setItem('smartagri_user', 'Nguyễn Văn Nam');
    }

    roleCards.forEach(c => c.classList.remove('is-loading'));
    pendingCard.classList.add('is-loading');
    showToast('Đăng nhập thành công với vai trò ' + role);

    setTimeout(() => { window.location.href = target; }, 700);
  }, 800);
});

// Bỏ lỗi ngay khi người dùng sửa trường
credUser.addEventListener('input', () => clearFieldError('cf-user'));
credPass.addEventListener('input', () => clearFieldError('cf-pass'));

// ==================== MÀN HÌNH QUÊN MẬT KHẨU (2 bước, cùng trang) ====================
const resetPanel = document.getElementById('resetPanel');
const fpForm1 = document.getElementById('fpForm1');
const fpForm2 = document.getElementById('fpForm2');
const fpAccount = document.getElementById('fpAccount');
const fpCodeBox = document.getElementById('fpCodeBox');
const fpCodeEl = document.getElementById('fpCode');
const fpCodeInput = document.getElementById('fpCodeInput');
const fpPass = document.getElementById('fpPass');
const fpRepass = document.getElementById('fpRepass');
const fpSend = document.getElementById('fpSend');
const fpSendText = document.getElementById('fpSendText');
const fpSave = document.getElementById('fpSave');
const fpSaveText = document.getElementById('fpSaveText');
let fpExpectedCode = '';            // mã demo của lần "gửi mã" gần nhất

function setBtnLoading(btn, textEl, isLoading, loadingText, idleText) {
  btn.disabled = isLoading;
  btn.classList.toggle('is-loading', isLoading);
  textEl.textContent = isLoading ? loadingText : idleText;
}

function shakeReset() {
  resetPanel.classList.add('is-shaking');
  setTimeout(() => resetPanel.classList.remove('is-shaking'), 450);
}

function openReset() {
  if (!pendingCard) return;
  document.getElementById('resetRoleName').textContent = pendingCard.dataset.short;
  fpAccount.placeholder = 'ví dụ: ' + accountFor(pendingCard.dataset.scope).username;

  fpForm1.reset();
  fpForm2.reset();
  fpForm1.hidden = false;
  fpForm2.hidden = true;
  fpCodeBox.hidden = true;
  fpExpectedCode = '';
  ['ff-account', 'ff-code', 'ff-pass', 'ff-repass'].forEach(clearFieldError);
  setBtnLoading(fpSend, fpSendText, false, '', 'Gửi mã xác nhận');
  setBtnLoading(fpSave, fpSaveText, false, '', 'Đổi mật khẩu');

  mainEl.classList.add('is-forgot');
  resetPanel.hidden = false;
  fpAccount.focus();
}

function closeReset() {
  resetPanel.hidden = true;
  mainEl.classList.remove('is-forgot');
}

document.getElementById('credForgot').addEventListener('click', openReset);
document.getElementById('resetBack').addEventListener('click', () => {
  closeReset();
  credUser.focus();
});

// BƯỚC 1: xin tài khoản / email -> "gửi" mã demo
fpForm1.addEventListener('submit', e => {
  e.preventDefault();
  if (!pendingCard) return;

  const value = fpAccount.value.trim();
  const acc = accountFor(pendingCard.dataset.scope);

  if (!value) {
    setFieldError('ff-account', 'Bạn chưa nhập tài khoản hoặc email.');
    fpAccount.focus();
    return;
  }

  const isEmail = EMAIL_RE.test(value);
  const isDemoUser = value.toLowerCase() === acc.username.toLowerCase();
  // Email hợp lệ nhưng chưa từng đăng ký -> trạng thái lỗi có chủ đích:
  // người dùng phải qua nút "Đăng ký" trước, đúng luồng dữ liệu thật của site.
  const isRegisteredEmail = isEmail && REG.all().some(u => (u.email || '').toLowerCase() === value.toLowerCase());

  if (isDemoUser || isRegisteredEmail) {
    clearFieldError('ff-account');
  } else if (isEmail) {
    setFieldError('ff-account', 'Email này chưa có trong hệ thống. Hãy dùng tài khoản "' +
      acc.username + '" hoặc bấm Đăng ký ở cuối trang trước.');
    shakeReset();
    return;
  } else {
    setFieldError('ff-account', 'Không tìm thấy "' + value + '". Tài khoản của vai trò này là "' +
      acc.username + '" (hoặc email đã đăng ký).');
    shakeReset();
    return;
  }

  setBtnLoading(fpSend, fpSendText, true, 'Đang gửi mã...', 'Gửi mã xác nhận');

  // Cùng nhịp giả lập API 800 ms như bước đăng nhập
  setTimeout(() => {
    setBtnLoading(fpSend, fpSendText, false, '', 'Gửi mã xác nhận');
    fpExpectedCode = demoCodeFor(value);
    fpCodeEl.textContent = fpExpectedCode;   // textContent: chuỗi người nhập không thành markup
    fpCodeBox.hidden = false;
    fpForm1.hidden = true;
    fpForm2.hidden = false;
    showToast('Mã xác nhận (demo) đã hiển thị — bản này không gửi email thật');
    fpCodeInput.focus();
  }, 800);
});

// BƯỚC 2: nhập mã + mật khẩu mới
fpForm2.addEventListener('submit', e => {
  e.preventDefault();
  if (!pendingCard || !fpExpectedCode) return;

  const code = fpCodeInput.value.trim();
  const pass = fpPass.value;
  const repass = fpRepass.value;
  let ok = true;

  if (!code) { setFieldError('ff-code', 'Bạn chưa nhập mã xác nhận.'); ok = false; }
  else if (code !== fpExpectedCode) { setFieldError('ff-code', 'Mã không đúng. Xem lại mã in đậm phía trên.'); ok = false; }
  else clearFieldError('ff-code');

  if (!pass) { setFieldError('ff-pass', 'Bạn chưa nhập mật khẩu mới.'); ok = false; }
  else if (pass.length < 6) { setFieldError('ff-pass', 'Mật khẩu phải có ít nhất 6 ký tự.'); ok = false; }
  else clearFieldError('ff-pass');

  if (!repass) { setFieldError('ff-repass', 'Bạn chưa nhập lại mật khẩu mới.'); ok = false; }
  else if (repass !== pass) { setFieldError('ff-repass', 'Mật khẩu nhập lại chưa khớp.'); ok = false; }
  else clearFieldError('ff-repass');

  if (!ok) { shakeReset(); return; }

  setBtnLoading(fpSave, fpSaveText, true, 'Đang đổi mật khẩu...', 'Đổi mật khẩu');

  setTimeout(() => {
    setBtnLoading(fpSave, fpSaveText, false, '', 'Đổi mật khẩu');

    // Ghi đè mật khẩu demo -> lần đăng nhập sau dùng được luôn (giữ nguyên sau F5)
    const scope = pendingCard.dataset.scope;
    const over = pwdOverrides();
    over[scope] = pass;
    localStorage.setItem(PWD_KEY, JSON.stringify(over));

    showToast('Đã đổi mật khẩu cho vai trò ' + pendingCard.dataset.short);

    const card = pendingCard;
    openCred(card);                      // hiện lại khung đăng nhập + dòng demo đã đổi
    credUser.value = accountFor(scope).username;
    credPass.focus();
  }, 800);
});

['fpAccount:ff-account', 'fpCodeInput:ff-code', 'fpPass:ff-pass', 'fpRepass:ff-repass']
  .forEach(pair => {
    const [inputId, fieldId] = pair.split(':');
    document.getElementById(inputId).addEventListener('input', () => clearFieldError(fieldId));
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
// Escape: ưu tiên đóng modal đăng ký; nếu chỉ có màn hình phụ đang mở thì quay
// lại bước trước (quên mật khẩu -> khung đăng nhập -> lưới vai trò).
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (backdrop.classList.contains('open')) { closeRegister(); return; }
  if (!resetPanel.hidden) { closeReset(); credUser.focus(); return; }
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
