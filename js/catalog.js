/* ============================================================
   SmartAgri - Danh mục chuẩn dùng chung (JS)
   CropMate AI - CSE122 BTL

   Trang Tổng quan nông hộ / Lịch trình / Báo cáo cần đúng các
   giống cây đã được quản trị viên chuẩn hoá ở trang
   "Quản lý danh mục cây trồng & Sâu bệnh" (index.html).
   Mảng CROPS dưới đây khớp 1-1 với mảng `crops` trong js/main.js
   (mã, tên, giống, nhóm, chu kỳ, giai đoạn, trạng thái).
   ============================================================ */
(function () {
  'use strict';

  const CROPS = [
    { id: 'CAY-001', name: 'Lúa',         variety: 'IR50404',         label: 'Lúa IR50404',         group: 'Lương thực',      cycleMin: 120, cycleMax: 140, stages: ['Gieo mạ', 'Đẻ nhánh', 'Làm đòng', 'Trổ bông', 'Thu hoạch'], status: 'active'   },
    { id: 'CAY-002', name: 'Cà phê',      variety: 'Robusta',         label: 'Cà phê Robusta',      group: 'Cây công nghiệp', cycleMin: 365, cycleMax: 420, stages: ['Ươm cây', 'Kiến thiết cơ bản', 'Kinh doanh', 'Thu hoạch'],            status: 'active'   },
    { id: 'CAY-003', name: 'Cây ăn trái', variety: 'Xoài Cát Hòa Lộc', label: 'Xoài Cát Hòa Lộc',   group: 'Cây ăn trái',     cycleMin: 180, cycleMax: 240, stages: ['Ra lộc', 'Ra hoa', 'Đậu quả', 'Phát triển quả', 'Thu hoạch'],          status: 'active'   },
    { id: 'CAY-004', name: 'Ngô',         variety: 'NK66',            label: 'Ngô NK66',            group: 'Lương thực',      cycleMin: 90,  cycleMax: 110, stages: ['Gieo trồng', 'Chậm cây', 'Trổ cờ', 'Thu hoạch'],                       status: 'archived' },
  ];

  // Sâu bệnh hại đã chuẩn hoá (khớp mảng `pests` trong js/main.js)
  const PESTS = [
    { id: 'SB-001', name: 'Rầy nâu',      group: 'Côn trùng', crops: 'Lúa',                 status: 'active'   },
    { id: 'SB-002', name: 'Bệnh đạo ôn',  group: 'Nấm',       crops: 'Lúa',                 status: 'active'   },
    { id: 'SB-003', name: 'Sâu vẽ bùa',   group: 'Côn trùng', crops: 'Cây ăn trái, Cà phê', status: 'disabled' },
    { id: 'SB-004', name: 'Bệnh gỉ sắt',  group: 'Nấm',       crops: 'Cà phê',              status: 'archived' },
  ];

  // Khu vực / cánh đồng của hợp tác xã
  const REGIONS = ['Cánh đồng A', 'Cánh đồng B', 'Vườn hộ khu 3', 'Khu vực 1-2'];

  // AI chỉ lập được lịch cho giống có trong danh mục chuẩn
  const hasVariety = label => CROPS.some(c => c.label === label && c.status === 'active');

  window.CATALOG = { CROPS, PESTS, REGIONS, hasVariety };
})();
