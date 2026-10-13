/* ============================================================
   SmartAgri - Quản lý danh mục cây trồng & Sâu bệnh
   CropMate AI - CSE122 BTL
   Vanilla JavaScript: render dữ liệu, tìm kiếm, lọc, chuyển tab,
   modal thêm/sửa, form validation, thay đổi trạng thái, toast.
   ============================================================ */

// ==================== DỮ LIỆU ====================
let crops = [
  { id: 'CAY-001', name: 'Lúa',         variety: 'IR50404',         group: 'Lương thực',      cycleMin: 120, cycleMax: 140, stages: ['Giao mạ', 'Đẻ nhánh', 'Làm đòng', 'Trổ bông', 'Thu hoạch'], status: 'active' },
  { id: 'CAY-002', name: 'Cà phê',      variety: 'Robusta',          group: 'Cây công nghiệp', cycleMin: 365, cycleMax: 420, stages: ['Ươm cây', 'Kiến thiết cơ bản', 'Kinh doanh', 'Thu hoạch'], status: 'active' },
  { id: 'CAY-003', name: 'Cây ăn trái', variety: 'Xoài Cát Hòa Lộc', group: 'Cây ăn trái',     cycleMin: 180, cycleMax: 240, stages: ['Ra lộc', 'Ra hoa', 'Đậu quả', 'Phát triển quả', 'Thu hoạch'], status: 'active' },
  { id: 'CAY-004', name: 'Ngô',         variety: 'NK66',             group: 'Lương thực',      cycleMin: 90,  cycleMax: 110, stages: ['Gieo trồng', 'Chậm cây', 'Trổ cờ', 'Thu hoạch'], status: 'archived' },
];

let pests = [
  { id: 'SB-001', name: 'Rầy nâu',     group: 'Côn trùng', crops: 'Lúa',                 symptom: 'Lá chuyển vàng, cháy đầu lá, đốm nâu',              status: 'active' },
  { id: 'SB-002', name: 'Bệnh đạo ôn', group: 'Nấm',       crops: 'Lúa',                 symptom: 'Vết bệnh hình ô van màu xám trên lá',                status: 'active' },
  { id: 'SB-003', name: 'Sâu vẽ bùa',  group: 'Côn trùng', crops: 'Cây ăn trái, Cà phê', symptom: 'Lá bị cuốn, khô đầu lá, giảm diện tích quang hợp',   status: 'disabled' },
  { id: 'SB-004', name: 'Bệnh gỉ sắt', group: 'Nấm',       crops: 'Cà phê',              symptom: 'Đốm vàng cam ở mặt dưới lá',                         status: 'archived' },
];

const statusLabel = { active: 'Đang hoạt động', archived: 'Lưu trữ', disabled: 'Vô hiệu hóa' };
let currentTab = 'crops';
let editingId = null;

// ==================== RENDER BẢNG ====================
const table = document.getElementById('dataTable');
const searchInput = document.getElementById('searchInput');
const groupFilter = document.getElementById('groupFilter');
const statusFilter = document.getElementById('statusFilter');
const groupFilterWrap = document.getElementById('groupFilterWrap');

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function getFiltered() {
  const q = searchInput.value.trim().toLowerCase();
  const g = groupFilter.value;
  const s = statusFilter.value;
  if (currentTab === 'crops') {
    return crops.filter(c =>
      (!q || c.name.toLowerCase().includes(q) || c.variety.toLowerCase().includes(q)) &&
      (!g || c.group === g) && (!s || c.status === s)
    );
  }
  return pests.filter(p =>
    (!q || p.name.toLowerCase().includes(q) || p.symptom.toLowerCase().includes(q) || p.crops.toLowerCase().includes(q)) &&
    (!g || p.group === g) && (!s || p.status === s)
  );
}

function renderTable() {
  const rows = getFiltered();
  if (currentTab === 'crops') {
    table.innerHTML = `
      <thead><tr>
        <th>Mã cây</th><th>Tên cây trồng</th><th>Tên giống</th>
        <th>Chu kỳ sinh trưởng (ngày)</th><th>Danh sách các giai đoạn mẫu</th>
        <th>Trạng thái</th><th>Thao tác</th>
      </tr></thead>
      <tbody>${rows.length ? rows.map(c => `
        <tr>
          <td class="mono">${c.id}</td>
          <td>${escapeHtml(c.name)}</td>
          <td>${escapeHtml(c.variety || '—')}</td>
          <td class="mono">${c.cycleMin} - ${c.cycleMax}</td>
          <td>${c.stages.map(escapeHtml).join(' → ')}</td>
          <td><span class="badge ${c.status}">${statusLabel[c.status]}</span></td>
          <td><div class="row-actions">
            <button type="button" class="btn-edit" onclick="openCropModal('${c.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>
              Sửa
            </button>
            ${c.status !== 'archived'
              ? `<button type="button" class="btn-link" onclick="setStatus('${c.id}','archived','crop')">Lưu trữ / Vô hiệu hóa</button>`
              : `<button type="button" class="btn-link restore" onclick="setStatus('${c.id}','active','crop')">Khôi phục</button>`}
          </div></td>
        </tr>`).join('') : `<tr><td colspan="7" class="empty-state">Không tìm thấy dữ liệu phù hợp</td></tr>`}
      </tbody>`;
  } else {
    table.innerHTML = `
      <thead><tr>
        <th>Mã sâu bệnh</th><th>Tên sâu bệnh</th><th>Nhóm</th>
        <th>Cây trồng ảnh hưởng</th><th>Triệu chứng nhận biết</th>
        <th>Trạng thái</th><th>Thao tác</th>
      </tr></thead>
      <tbody>${rows.length ? rows.map(p => `
        <tr>
          <td class="mono">${p.id}</td>
          <td>${escapeHtml(p.name)}</td>
          <td>${escapeHtml(p.group)}</td>
          <td>${escapeHtml(p.crops || '—')}</td>
          <td>${escapeHtml(p.symptom)}</td>
          <td><span class="badge ${p.status}">${statusLabel[p.status]}</span></td>
          <td><div class="row-actions">
            <button type="button" class="btn-edit" onclick="openPestModal('${p.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>
              Sửa
            </button>
            ${p.status !== 'archived'
              ? `<button type="button" class="btn-link" onclick="setStatus('${p.id}','archived','pest')">Lưu trữ / Vô hiệu hóa</button>`
              : `<button type="button" class="btn-link restore" onclick="setStatus('${p.id}','active','pest')">Khôi phục</button>`}
          </div></td>
        </tr>`).join('') : `<tr><td colspan="7" class="empty-state">Không tìm thấy dữ liệu phù hợp</td></tr>`}
      </tbody>`;
  }
}

// ==================== CHUYỂN TAB ====================
const tabs = document.querySelectorAll('.tab');
tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.classList.remove('active'));
  t.classList.add('active');
  currentTab = t.dataset.tab;
  document.getElementById('btnAddLabel').textContent = currentTab === 'crops' ? 'Thêm cây trồng mới' : 'Thêm sâu bệnh mới';
  groupFilterWrap.style.display = currentTab === 'crops' ? '' : 'none';
  searchInput.placeholder = currentTab === 'crops'
    ? 'Tìm kiếm theo tên cây trồng hoặc tên loại sâu bệnh'
    : 'Tìm kiếm theo tên sâu bệnh hoặc triệu chứng';
  renderTable();
}));

// ==================== TÌM KIẾM & LỌC ====================
searchInput.addEventListener('input', renderTable);
groupFilter.addEventListener('change', renderTable);
statusFilter.addEventListener('change', renderTable);

document.getElementById('btnRefresh').addEventListener('click', () => {
  searchInput.value = ''; groupFilter.value = ''; statusFilter.value = '';
  renderTable();
  showToast('Đã làm mới dữ liệu');
});

document.getElementById('btnFilterExtra').addEventListener('click', () => {
  const v = statusFilter.value;
  statusFilter.value = v === 'active' ? '' : 'active';
  renderTable();
});

// ==================== MODAL CÂY TRỒNG ====================
const backdrop = document.getElementById('modalBackdrop');
const stagesRow = document.getElementById('stagesRow');
const arrowSvg = `<span class="stage-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>`;
const xSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

function renderStages(stages, editableLast) {
  stagesRow.innerHTML = stages.map((s, i) => {
    const chip = editableLast && i === stages.length - 1
      ? `<span class="stage-chip"><input id="newStageInput" type="text" placeholder="Nhập tên giai đoạn"><button type="button" class="stage-x" onclick="commitStage()">${xSvg}</button></span>`
      : `<span class="stage-chip">${escapeHtml(s)}<button type="button" class="stage-x" onclick="removeStage(${i})">${xSvg}</button></span>`;
    return (i > 0 ? arrowSvg : '') + chip;
  }).join('') + `
    <button type="button" class="btn-add-stage" onclick="addStageInput()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Thêm giai đoạn
    </button>`;
}

let draftStages = [];

window.addStageInput = function () {
  if (document.getElementById('newStageInput')) { document.getElementById('newStageInput').focus(); return; }
  draftStages.push('');
  renderStages(draftStages, true);
  const inp = document.getElementById('newStageInput');
  inp.focus();
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); commitStage(); } });
};

window.commitStage = function () {
  const inp = document.getElementById('newStageInput');
  if (inp && inp.value.trim()) draftStages[draftStages.length - 1] = inp.value.trim();
  else draftStages = draftStages.filter(s => s !== '');
  renderStages(draftStages, false);
  clearError('f-stages');
};

window.removeStage = function (i) {
  draftStages.splice(i, 1);
  renderStages(draftStages, false);
};

function clearError(id) { document.getElementById(id).classList.remove('error'); }

function openCropModal(id) {
  editingId = id || null;
  document.getElementById('cropForm').style.display = '';
  document.getElementById('pestForm').style.display = 'none';
  document.getElementById('modalTitle').textContent = id ? 'Chỉnh sửa cây trồng' : 'Thêm cây trồng mới';
  const item = id ? crops.find(c => c.id === id) : null;
  document.getElementById('inpName').value = item ? item.name : '';
  document.getElementById('inpVariety').value = item ? item.variety : '';
  document.getElementById('inpGroup').value = item ? item.group : 'Lương thực';
  document.getElementById('inpCycleMin').value = item ? item.cycleMin : '';
  document.getElementById('inpCycleMax').value = item ? item.cycleMax : '';
  draftStages = item ? [...item.stages] : ['Giao mạ', 'Đẻ nhánh', 'Làm đòng', 'Trổ bông', 'Thu hoạch'];
  renderStages(draftStages, false);
  ['f-name', 'f-cycle', 'f-stages'].forEach(clearError);
  backdrop.classList.add('open');
}
window.openCropModal = openCropModal;

function openPestModal(id) {
  editingId = id || null;
  document.getElementById('cropForm').style.display = 'none';
  document.getElementById('pestForm').style.display = '';
  document.getElementById('modalTitle').textContent = id ? 'Chỉnh sửa sâu bệnh' : 'Thêm sâu bệnh mới';
  const item = id ? pests.find(p => p.id === id) : null;
  document.getElementById('inpPestName').value = item ? item.name : '';
  document.getElementById('inpPestGroup').value = item ? item.group : 'Côn trùng';
  document.getElementById('inpPestCrops').value = item ? item.crops : '';
  document.getElementById('inpPestSymptom').value = item ? item.symptom : '';
  ['fp-name', 'fp-symptom'].forEach(clearError);
  backdrop.classList.add('open');
}
window.openPestModal = openPestModal;

// ==================== ĐÓNG MỞ MODAL ====================
document.getElementById('btnAdd').addEventListener('click', () => {
  currentTab === 'crops' ? openCropModal(null) : openPestModal(null);
});
document.getElementById('modalClose').addEventListener('click', () => backdrop.classList.remove('open'));
document.getElementById('btnCancel').addEventListener('click', () => backdrop.classList.remove('open'));
document.getElementById('btnCancelPest').addEventListener('click', () => backdrop.classList.remove('open'));
backdrop.addEventListener('click', e => { if (e.target === backdrop) backdrop.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') backdrop.classList.remove('open'); });

// ==================== VALIDATE & LƯU CÂY TRỒNG ====================
document.getElementById('cropForm').addEventListener('submit', e => {
  e.preventDefault(); // không cho trình duyệt tải lại trang, tự validate bằng JS

  const name = document.getElementById('inpName').value.trim();
  const min = document.getElementById('inpCycleMin').value;
  const max = document.getElementById('inpCycleMax').value;
  let ok = true;

  if (!name) { document.getElementById('f-name').classList.add('error'); ok = false; }
  else clearError('f-name');

  const cycleErr = document.getElementById('cycleErr');
  if (min === '' || max === '') {
    cycleErr.textContent = 'Vui lòng nhập chu kỳ sinh trưởng';
    document.getElementById('f-cycle').classList.add('error'); ok = false;
  } else if (Number(min) < 0 || Number(max) < 0) {
    cycleErr.textContent = 'Số ngày không được là số âm';
    document.getElementById('f-cycle').classList.add('error'); ok = false;
  } else if (Number(min) > Number(max)) {
    cycleErr.textContent = 'Số ngày "từ" không được lớn hơn số ngày "đến"';
    document.getElementById('f-cycle').classList.add('error'); ok = false;
  } else clearError('f-cycle');

  const stages = draftStages.filter(s => s && s.trim());
  if (!stages.length) { document.getElementById('f-stages').classList.add('error'); ok = false; }
  else clearError('f-stages');

  if (!ok) return;

  if (editingId) {
    const c = crops.find(x => x.id === editingId);
    Object.assign(c, {
      name,
      variety: document.getElementById('inpVariety').value.trim(),
      group: document.getElementById('inpGroup').value,
      cycleMin: Number(min),
      cycleMax: Number(max),
      stages
    });
    showToast('Đã cập nhật cây trồng ' + c.id);
  } else {
    const seq = String(crops.length + 1).padStart(3, '0');
    crops.push({
      id: 'CAY-' + seq, name,
      variety: document.getElementById('inpVariety').value.trim(),
      group: document.getElementById('inpGroup').value,
      cycleMin: Number(min), cycleMax: Number(max),
      stages, status: 'active'
    });
    showToast('Đã thêm cây trồng mới');
  }
  backdrop.classList.remove('open');
  renderTable();
});

// ==================== VALIDATE & LƯU SÂU BỆNH ====================
document.getElementById('pestForm').addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('inpPestName').value.trim();
  const symptom = document.getElementById('inpPestSymptom').value.trim();
  let ok = true;
  if (!name) { document.getElementById('fp-name').classList.add('error'); ok = false; } else clearError('fp-name');
  if (!symptom) { document.getElementById('fp-symptom').classList.add('error'); ok = false; } else clearError('fp-symptom');
  if (!ok) return;

  const data = {
    name,
    group: document.getElementById('inpPestGroup').value,
    crops: document.getElementById('inpPestCrops').value.trim(),
    symptom
  };
  if (editingId) {
    Object.assign(pests.find(p => p.id === editingId), data);
    showToast('Đã cập nhật sâu bệnh ' + editingId);
  } else {
    const seq = String(pests.length + 1).padStart(3, '0');
    pests.push({ id: 'SB-' + seq, ...data, status: 'active' });
    showToast('Đã thêm sâu bệnh mới');
  }
  backdrop.classList.remove('open');
  renderTable();
});

// ==================== THAY ĐỔI TRẠNG THÁI ====================
window.setStatus = function (id, status, type) {
  const list = type === 'crop' ? crops : pests;
  const item = list.find(x => x.id === id);
  if (item) {
    item.status = status;
    renderTable();
    showToast(status === 'active' ? 'Đã khôi phục ' + id : 'Đã lưu trữ ' + id);
  }
};

// ==================== TOAST ====================
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// ==================== KHÁC ====================
document.getElementById('hamburger').addEventListener('click', () => document.body.classList.toggle('collapsed'));
document.querySelectorAll('.nav-item').forEach(n => n.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
  n.classList.add('active');
}));
// Nút Đăng xuất được xử lý trong js/session.js (chuyển về login.html)

// Khởi tạo: render bảng lần đầu
renderTable();
