/* ============================================================
   SmartAgri - Quản lý tài khoản người dùng (JS)
   Lọc + tìm kiếm + phân trang + khóa/mở khóa/duyệt/đổi vai trò
   + skeleton loading + empty state.
   ============================================================ */

/* ---------- Dữ liệu mẫu ---------- */
let USERS = [
  { id: 1,  name: 'Nguyễn Văn An',     email: 'an.nguyen@gmail.com',    phone: '0901 234 567', role: 'Nông dân',        joined: '15/05/2024', status: 'active'  },
  { id: 2,  name: 'Trần Thị Bình',     email: 'binh.tran@gmail.com',    phone: '0912 345 678', role: 'Nông dân',        joined: '10/05/2024', status: 'active'  },
  { id: 3,  name: 'Lê Minh Cường',     email: 'cuong.le@agritech.vn',   phone: '0934 567 890', role: 'Chuyên gia',      joined: '20/05/2024', status: 'pending' },
  { id: 4,  name: 'Phạm Thị Dung',     email: 'dung.phmi@soilcare.vn',  phone: '0978 123 456', role: 'Chuyên gia',      joined: '18/05/2024', status: 'pending' },
  { id: 5,  name: 'Hợp tác xã An Phú', email: 'anhphuthi@soilcare.com', phone: '0888 765 432', role: 'Điều phối HTX',   joined: '22/05/2024', status: 'pending' },
  { id: 6,  name: 'Nguyễn Hoàng Nam',  email: 'nam.nguyen@smartagri.vn',phone: '0911 999 888', role: 'Admin',           joined: '01/01/2024', status: 'active'  },
  { id: 7,  name: 'Hoàng Văn Em',      email: 'em.hoang@gmail.com',     phone: '0923 456 789', role: 'Nông dân',        joined: '12/04/2024', status: 'locked'  },
  { id: 8,  name: 'Đỗ Thị Gấm',        email: 'gam.do@ruviewn.org',     phone: '0907 555 123', role: 'Chuyên gia',      joined: '08/04/2024', status: 'active'  },
  { id: 9,  name: 'Vũ Đức Huy',        email: 'huy.vu@co-op.vn',        phone: '0936 222 777', role: 'Điều phối HTX',   joined: '03/04/2024', status: 'active'  },
  { id: 10, name: 'Bùi Thu Hà',        email: 'ha.bui@gmail.com',       phone: '0982 111 333', role: 'Nông dân',        joined: '28/03/2024', status: 'locked'  },
  { id: 11, name: 'Ngô Văn Kiên',      email: 'kien.ngo@agri.vn',       phone: '0905 444 888', role: 'Chuyên gia',      joined: '20/03/2024', status: 'active'  },
  { id: 12, name: 'Đặng Thị Lan',      email: 'lan.dang@htx.vn',        phone: '0913 600 700', role: 'Điều phối HTX',   joined: '15/03/2024', status: 'pending' },
];

/* ---------- Trạng thái UI ---------- */
const state = { search: '', role: '', status: '', page: 1, pageSize: 10, loading: false, selected: new Set() };

/* ---------- Meta vai trò / trạng thái ---------- */
const ROLE_META = {
  'Nông dân':      { cls: 'nongdan',   icon: '<path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 9-9 5-1 7-1 7-1s0 2-1 7c-1 6-5 9-8 10z"/><path d="M12 12c-2 2-4 5-4 8"/>' },
  'Chuyên gia':    { cls: 'chuyengia', icon: '<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M12 2a3 3 0 0 0-3 3 3 3 0 0 0 0 6 3 3 0 0 0 6 0 3 3 0 0 0 0-6 3 3 0 0 0-3-3z"/>' },
  'Điều phối HTX': { cls: 'htx',       icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>' },
  'Admin':         { cls: 'admin',     icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
};
const STATUS_META = {
  active:  { cls: 'active',   label: 'Đang hoạt động' },
  pending: { cls: 'disabled', label: 'Đang chờ duyệt' },
  locked:  { cls: 'locked',   label: 'Đã khóa' },
};
const AVATAR_COLORS = ['#15803d', '#1d4ed8', '#6d28d9', '#b91c1c', '#0f766e', '#a16207', '#be185d', '#4338ca'];

/* ---------- Helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const initials = n => n.trim().split(/\s+/).slice(-2).map(w => w[0]).join('');
const colorFor = id => AVATAR_COLORS[id % AVATAR_COLORS.length];
const svg = inner => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

const ICONS = {
  lock:   '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  unlock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  check:  '<polyline points="20 6 9 17 4 12"/>',
  role:   '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11h-6"/>',
};

/* ---------- Lọc dữ liệu ---------- */
function getFiltered() {
  const q = state.search.trim().toLowerCase();
  return USERS.filter(u => {
    if (state.role && u.role !== state.role) return false;
    if (state.status && u.status !== state.status) return false;
    if (q && !(u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.replace(/\s/g, '').includes(q.replace(/\s/g, '')))) return false;
    return true;
  });
}

/* ---------- Render bảng ---------- */
function render() {
  const tbody = $('#userTbody');
  const hint = $('#listHint');

  // Hint cho chế độ "Đã khóa"
  if (state.status === 'locked') {
    hint.hidden = false;
    hint.textContent = 'Các tài khoản dưới đây đã bị vô hiệu hóa. Vui lòng mở khóa để kích hoạt lại quyền truy cập.';
  } else {
    hint.hidden = true;
  }

  if (state.loading) { tbody.innerHTML = skeletonRows(); renderFoot(0, 0, 0); updateBulk(); return; }

  const list = getFiltered();
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
  if (state.page > totalPages) state.page = totalPages;
  const start = (state.page - 1) * state.pageSize;
  const pageItems = list.slice(start, start + state.pageSize);

  if (total === 0) {
    tbody.innerHTML = emptyRow();
    renderFoot(0, 0, 0);
    updateBulk();
    return;
  }

  tbody.innerHTML = pageItems.map(u => {
    const r = ROLE_META[u.role] || { cls: 'nongdan', icon: '' };
    const s = STATUS_META[u.status];
    const checked = state.selected.has(u.id) ? 'checked' : '';
    return `<tr>
      <td class="col-check"><input type="checkbox" class="row-check" data-id="${u.id}" ${checked} aria-label="Chọn ${esc(u.name)}"></td>
      <td class="col-avatar"><span class="u-avatar" style="background:${colorFor(u.id)}">${esc(initials(u.name))}</span></td>
      <td class="u-name">${esc(u.name)}</td>
      <td class="u-contact">${esc(u.email)}<span class="phone">${esc(u.phone)}</span></td>
      <td><span class="role-tag ${r.cls}">${svg(r.icon)}${esc(u.role)}</span></td>
      <td class="mono">${esc(u.joined)}</td>
      <td><span class="badge ${s.cls}">${s.label}</span></td>
      <td><div class="row-actions">${actionsFor(u)}</div></td>
    </tr>`;
  }).join('');

  renderFoot(start + 1, start + pageItems.length, total);
  renderPager(totalPages);
  updateBulk();
  syncSelectAll(pageItems);
}

function actionsFor(u) {
  let html = '';
  if (u.status === 'pending')
    html += `<button type="button" class="act-btn approve" data-act="approve" data-id="${u.id}">${svg(ICONS.check)}Duyệt</button>`;
  if (u.status === 'locked')
    html += `<button type="button" class="act-btn unlock" data-act="unlock" data-id="${u.id}">${svg(ICONS.unlock)}Mở khóa tài khoản</button>`;
  else
    html += `<button type="button" class="act-btn lock" data-act="lock" data-id="${u.id}">${svg(ICONS.lock)}Khóa tài khoản</button>`;
  if (u.status !== 'locked')
    html += `<button type="button" class="act-btn role" data-act="role" data-id="${u.id}">${svg(ICONS.role)}Đổi vai trò</button>`;
  return html;
}

/* ---------- Skeleton ---------- */
function skeletonRows() {
  const row = `<tr>
    <td class="col-check"></td>
    <td class="col-avatar"><div class="skel skel-avatar"></div></td>
    <td><div class="skel skel-line w120"></div></td>
    <td><div class="skel skel-line w160"></div></td>
    <td><div class="skel skel-line w90"></div></td>
    <td><div class="skel skel-line w110"></div></td>
    <td><div class="skel skel-line w110"></div></td>
    <td><div class="skel skel-line w140"></div></td>
  </tr>`;
  const loading = `<tr><td colspan="8"><div class="skel-loading"><span class="spinner"></span>Đang tải danh sách hơn 1.000 người dùng...</div></td></tr>`;
  return loading + row.repeat(8);
}

/* ---------- Empty state ---------- */
function emptyRow() {
  const ill = `<svg class="es-ill" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="110" cy="120" rx="88" ry="46" fill="#eef2ff"/>
    <path d="M110 34l46 16v34c0 30-20 48-46 58-26-10-46-28-46-58V50z" fill="#fff" stroke="#16a34a" stroke-width="5"/>
    <rect x="94" y="86" width="32" height="26" rx="5" fill="#16a34a"/>
    <path d="M100 86v-7a10 10 0 0 1 20 0v7" stroke="#16a34a" stroke-width="5" fill="none"/>
    <circle cx="110" cy="97" r="4" fill="#fff"/>
    <path d="M60 40l4-10 4 10 10 4-10 4-4 10-4-10-10-4z" fill="#93c5fd"/>
    <path d="M160 60l3-8 3 8 8 3-8 3-3 8-3-8-8-3z" fill="#a7f3d0"/>
    <path d="M150 120c8-2 14 2 16 8-8 2-14-2-16-8z" fill="#86efac"/>
    <path d="M62 118c-6-4-14-2-18 4 6 4 14 2 18-4z" fill="#93c5fd"/>
  </svg>`;
  return `<tr><td colspan="8"><div class="empty-state">${ill}
    <h3>Hiện không có tài khoản nào ${emptyLabel()}.</h3>
    <p>${emptyHint()}</p></div></td></tr>`;
}
function emptyLabel() {
  if (state.status === 'pending') return 'chờ phê duyệt';
  if (state.status === 'locked') return 'bị khóa';
  if (state.status === 'active') return 'đang hoạt động';
  if (state.role) return 'nào có vai trò ' + state.role;
  return 'phù hợp';
}
function emptyHint() {
  if (state.status === 'pending') return 'Khi có tài khoản ở trạng thái chờ duyệt, chúng sẽ hiển thị tại đây.';
  return 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc Vai trò / Trạng thái.';
}

/* ---------- Footer + Pager ---------- */
function renderFoot(from, to, total) {
  const el = $('#rangeText');
  el.textContent = total === 0 ? 'Không có người dùng nào' : `Hiển thị ${from} đến ${to} của ${total} người dùng`;
  if (total === 0) $('#pagerBtns').innerHTML = '';
}
function renderPager(totalPages) {
  const wrap = $('#pagerBtns');
  const chevL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
  const chevR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
  let html = `<button type="button" class="pg-btn" data-pg="prev" ${state.page === 1 ? 'disabled' : ''}>${chevL}</button>`;
  for (let i = 1; i <= totalPages; i++)
    html += `<button type="button" class="pg-btn ${i === state.page ? 'active' : ''}" data-pg="${i}">${i}</button>`;
  html += `<button type="button" class="pg-btn" data-pg="next" ${state.page === totalPages ? 'disabled' : ''}>${chevR}</button>`;
  wrap.innerHTML = html;
}

/* ---------- Bulk / select ---------- */
function updateBulk() {
  const bar = $('#bulkBar');
  const n = state.selected.size;
  if (n > 0 && !state.loading) {
    bar.hidden = false;
    $('#bulkCount').textContent = `${n} đã chọn`;
  } else {
    bar.hidden = true;
  }
}
function syncSelectAll(pageItems) {
  const cb = $('#selectAll');
  const ids = pageItems.map(u => u.id);
  const allSelected = ids.length > 0 && ids.every(id => state.selected.has(id));
  cb.checked = allSelected;
  cb.indeterminate = !allSelected && ids.some(id => state.selected.has(id));
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

/* ---------- Modal khóa ---------- */
let lockTargetId = null;
function openLockModal(id) {
  const u = USERS.find(x => x.id === id);
  if (!u) return;
  lockTargetId = id;
  $('#lockTarget').textContent = u.name;
  $('#lockReason').value = '';
  $('#f-lockReason').classList.remove('error');
  $('#lockBackdrop').classList.add('open');
  setTimeout(() => $('#lockReason').focus(), 50);
}
function closeLockModal() { $('#lockBackdrop').classList.remove('open'); lockTargetId = null; }

/* ---------- Modal đổi vai trò ---------- */
let roleTargetId = null;
function openRoleModal(id) {
  const u = USERS.find(x => x.id === id);
  if (!u) return;
  roleTargetId = id;
  $('#roleTarget').textContent = u.name;
  $('#roleSelect').value = u.role;
  $('#roleBackdrop').classList.add('open');
}
function closeRoleModal() { $('#roleBackdrop').classList.remove('open'); roleTargetId = null; }

function findUser(id) { return USERS.find(u => u.id === id); }

/* ---------- Khởi tạo ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // loading giả khi mở trang
  state.loading = true; render();
  setTimeout(() => { state.loading = false; render(); }, 800);

  // Tìm kiếm
  $('#searchInput').addEventListener('input', e => { state.search = e.target.value; state.page = 1; render(); });
  $('#roleFilter').addEventListener('change', e => { state.role = e.target.value; state.page = 1; render(); });
  $('#statusFilter').addEventListener('change', e => { state.status = e.target.value; state.page = 1; render(); });
  $('#pageSize').addEventListener('change', e => { state.pageSize = +e.target.value; state.page = 1; render(); });

  // Làm mới
  $('#btnRefresh').addEventListener('click', () => {
    state.loading = true; state.selected.clear(); render();
    setTimeout(() => { state.loading = false; render(); showToast('Đã làm mới danh sách'); }, 800);
  });

  // Select all
  $('#selectAll').addEventListener('change', e => {
    const ids = getFiltered().slice((state.page - 1) * state.pageSize, state.page * state.pageSize).map(u => u.id);
    if (e.target.checked) ids.forEach(id => state.selected.add(id));
    else ids.forEach(id => state.selected.delete(id));
    render();
  });

  // Delegated: thao tác trên dòng + checkbox dòng
  $('#userTbody').addEventListener('click', e => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const id = +btn.dataset.id;
    const act = btn.dataset.act;
    if (act === 'lock') openLockModal(id);
    else if (act === 'unlock') { findUser(id).status = 'active'; render(); showToast('Đã mở khóa tài khoản'); }
    else if (act === 'approve') { findUser(id).status = 'active'; render(); showToast('Đã phê duyệt tài khoản'); }
    else if (act === 'role') openRoleModal(id);
  });
  $('#userTbody').addEventListener('change', e => {
    const cb = e.target.closest('.row-check');
    if (!cb) return;
    const id = +cb.dataset.id;
    cb.checked ? state.selected.add(id) : state.selected.delete(id);
    const pageItems = getFiltered().slice((state.page - 1) * state.pageSize, state.page * state.pageSize);
    updateBulk(); syncSelectAll(pageItems);
  });

  // Bulk actions
  $('#bulkLock').addEventListener('click', () => {
    state.selected.forEach(id => { const u = findUser(id); if (u.status !== 'locked') u.status = 'locked'; });
    showToast(`Đã khóa ${state.selected.size} tài khoản`); state.selected.clear(); render();
  });
  $('#bulkUnlock').addEventListener('click', () => {
    state.selected.forEach(id => { findUser(id).status = 'active'; });
    showToast(`Đã mở khóa ${state.selected.size} tài khoản`); state.selected.clear(); render();
  });

  // Pager
  $('#pagerBtns').addEventListener('click', e => {
    const b = e.target.closest('[data-pg]'); if (!b) return;
    const v = b.dataset.pg;
    const totalPages = Math.max(1, Math.ceil(getFiltered().length / state.pageSize));
    if (v === 'prev') state.page = Math.max(1, state.page - 1);
    else if (v === 'next') state.page = Math.min(totalPages, state.page + 1);
    else state.page = +v;
    render();
  });

  // Modal khóa
  $('#lockClose').addEventListener('click', closeLockModal);
  $('#lockCancel').addEventListener('click', closeLockModal);
  $('#lockBackdrop').addEventListener('click', e => { if (e.target.id === 'lockBackdrop') closeLockModal(); });
  $('#lockForm').addEventListener('submit', e => {
    e.preventDefault();
    const reason = $('#lockReason').value.trim();
    if (!reason) { $('#f-lockReason').classList.add('error'); return; }
    const u = findUser(lockTargetId); if (u) u.status = 'locked';
    state.selected.delete(lockTargetId);
    closeLockModal(); render(); showToast(`Đã khóa tài khoản của ${u.name}`);
  });
  $('#lockReason').addEventListener('input', () => $('#f-lockReason').classList.remove('error'));

  // Modal vai trò
  $('#roleClose').addEventListener('click', closeRoleModal);
  $('#roleCancel').addEventListener('click', closeRoleModal);
  $('#roleBackdrop').addEventListener('click', e => { if (e.target.id === 'roleBackdrop') closeRoleModal(); });
  $('#roleForm').addEventListener('submit', e => {
    e.preventDefault();
    const u = findUser(roleTargetId); if (u) u.role = $('#roleSelect').value;
    closeRoleModal(); render(); showToast(`Đã đổi vai trò của ${u.name} thành ${u.role}`);
  });

  // ESC đóng modal
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeLockModal(); closeRoleModal(); } });

  // Hamburger + logout/bell
  $('#hamburger').addEventListener('click', () => document.body.classList.toggle('collapsed'));
  document.querySelector('.logout-btn').addEventListener('click', () => showToast('Đăng xuất thành công (demo)'));
  document.querySelector('.bell').addEventListener('click', () => showToast('Bạn có 3 thông báo mới (demo)'));
});
