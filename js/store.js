/* ============================================================
   SmartAgri - Kho hồ sơ đăng ký (dùng chung login / users / dashboard)
   CropMate AI - CSE122 BTL
   Trang đăng ký (login.html) ghi hồ sơ mới vào localStorage;
   trang Quản lý tài khoản (users.html) đọc ra để hiển thị + cập nhật
   trạng thái duyệt/khóa; dashboard đọc để đếm hồ sơ chờ duyệt.
   ============================================================ */

const REG_KEY = 'smartagri_registrations_v1';

const REG = {
  all() {
    try {
      const v = JSON.parse(localStorage.getItem(REG_KEY));
      return Array.isArray(v) ? v : [];
    } catch (err) { return []; }
  },

  save(list) { localStorage.setItem(REG_KEY, JSON.stringify(list)); },

  // Thêm hồ sơ mới: đưa lên đầu danh sách để hiện trước tiên ở trang tài khoản
  add(user) {
    const list = REG.all();
    list.unshift(user);
    REG.save(list);
    return user;
  },

  // Cập nhật trạng thái / vai trò của một hồ sơ đã lưu
  patch(id, data) {
    const list = REG.all();
    const i = list.findIndex(u => u.id === id);
    if (i < 0) return null;
    list[i] = Object.assign(list[i], data);
    REG.save(list);
    return list[i];
  },

  countByStatus(status) {
    return REG.all().filter(u => u.status === status).length;
  },
};

window.REG = REG;
