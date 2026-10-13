/* ============================================================
   SmartAgri - Phiên đăng nhập (dùng chung cho các trang quản trị)
   CropMate AI - CSE122 BTL
   Đọc vai trò đã chọn ở trang login (localStorage) để hiển thị
   trên header, và đưa nút Đăng xuất trở về trang đăng nhập.
   ============================================================ */
(function () {
  const ROLE_KEY = 'smartagri_role_v1';
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(ROLE_KEY)); } catch (err) { saved = null; }

  if (saved && saved.role) {
    const roleEl = document.querySelector('.user-chip .role');
    const avatarEl = document.querySelector('.user-chip .avatar');
    if (roleEl) roleEl.textContent = saved.short || saved.role;
    if (avatarEl && saved.initials) avatarEl.textContent = saved.initials;
    if (avatarEl) avatarEl.setAttribute('aria-label', 'Ảnh đại diện của ' + saved.role);
  }

  const logout = document.querySelector('.logout-btn');
  if (logout) {
    logout.addEventListener('click', () => {
      localStorage.removeItem(ROLE_KEY);
      window.location.href = 'login.html';
    });
  }
})();
