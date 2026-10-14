# BẢN ĐỒ MÃ NGUỒN — đối chiếu kịch bản thuyết trình giữa kỳ

File này ghi lại **đúng vị trí (tên file + số dòng)** của mọi thứ em nhắc trong
`THUYET_TRINH_GIUKI.md` (mục 4 và mục 6), để khi quay OBS chỉ cần `Ctrl+P` mở file,
`Ctrl+G` gõ số dòng là nhảy tới nơi.

> 📝 Kịch bản đã tinh gọn còn **385 từ (~3 phút 10)**, nên một vài ý trong bảng dưới đây
> không còn được *nói* ở phần 4 nữa (vd `flex-wrap`, `aria-label`, so sánh 'từ'/'đến').
> Em vẫn giữ nguyên vị trí code — đó là những chỗ GV hay trỏ khi hỏi ngược.

> Đường dẫn gốc: `CSE122-BTL-NGUYENDUCNHAT` → nhánh `main`.
> Ba file để mở sẵn trong VS Code: `index.html` · `css/style.css` · `js/main.js`.

---

## Mẹo nhảy tới dòng nhanh

| Phím | Tác dụng |
|---|---|
| `Ctrl + P` | gõ tên file để mở (vd `main.js`) |
| `Ctrl + G` | gõ số dòng để nhảy tới (vd `54`) |
| `Ctrl + Shift + F` | tìm chuỗi trong toàn project (vd `grid-template-columns`) |
| `Ctrl + F` | tìm trong file đang mở (vd `:root`) |
| `Alt + Chuột` | đặt nhiều con trỏ, khoanh 2 chỗ cùng lúc |

---

## MỤC 4 — HTML (nói ~20s)

| Câu trong kịch bản | Vị trí thật | Mã nguồn |
|---|---|---|
| "Ngoài cùng là `aside.sidebar`" | `index.html:17` | `<aside class="sidebar">` |
| "chứa `nav` điều hướng" | `index.html:31` | `<nav class="nav" aria-label="Điều hướng chính">` |
| "và `footer`" | `index.html:55` | `<footer class="side-footer">` |
| "bên phải là `main`" | `index.html:65` | `<main>` |
| "chứa `header` tiêu đề" | `index.html:66` → `87` (đóng `</header>`), `<h1>` ở `71` | `<header>` / `<h1>Quản lý danh mục cây trồng…</h1>` |
| "ba `section`: tab, toolbar, bảng" | `index.html:87`, `99`, `133` | `<section class="content" aria-label=…>`, `<section class="toolbar" aria-label=…>`, `<section class="table-card" aria-label=…>` |
| "`table` có `thead` và `tbody`" | HTML: `index.html:134` chỉ có `<table id="dataTable"></table>` **rỗng**; `thead`/`tbody` sinh ra ở `js/main.js:58` + `63` (tab cây) và `84` + `89` (tab sâu bệnh) | ⚠️ Xem mục "Chỗ kịch bản nói chưa khớp" bên dưới |
| "Modal là một `div` backdrop chứa `form`" | `index.html:140` → `148` | `<div class="modal-backdrop" id="modalBackdrop">`, `<form id="cropForm" novalidate>` |
| "với `label`, `input`, `select`" | `index.html:151`, `152`, `170` | `<label for="inpName">`, `<input type="text" id="inpName">`, `<select id="inpGroup">` |
| "và hai nút" | `index.html:184-185` | `btnCancel` (Hủy) + `btnSave` type="submit" |
| "Em đặt `aria-label` cho các section" | `index.html:87`, `99`, `133` (thêm: `31` nav, `105`, `115` select, `141` modal `role="dialog" aria-modal`) | `aria-label="Nội dung quản lý danh mục"` |
| "dùng `novalidate` để tự validate bằng JS" | `index.html:148` và `190` | `<form id="cropForm" novalidate>` |

**Ghi chú thêm nếu GV hỏi "còn script gắn ở đâu?"** → `index.html:10-12`, cả 3 script nằm trong `<head>` với `defer`.

---

## MỤC 4 — CSS (nói ~20s)

| Câu trong kịch bản | Vị trí thật | Mã nguồn |
|---|---|---|
| "Đầu file em khai báo biến màu trong `:root`" | `css/style.css:6-30` | `:root {` |
| "như `--green-700`" | `css/style.css:9` | `--green-700: #15803d;` |
| "`--gray-200`" | `css/style.css:22` | `--gray-200: #e5e7eb;` |
| "đổi màu chủ đề chỉ cần sửa một chỗ" | `css/style.css:236-238` (badge) và `167`, `172` (nút) | `background: var(--green-700)` |
| "Layout tổng dùng Flexbox: `body` là flex row gồm sidebar và `main`" | `css/style.css:34-41` (`display:flex` ở dòng `39`) + `44` sidebar + `109` main | `body { display: flex; min-height: 100vh; }`, `main { flex: 1; min-width: 0; }` |
| "Thanh công cụ cũng là flex có `flex-wrap`" | `css/style.css:176-177` | `display: flex; gap: 12px; align-items: center; flex-wrap: wrap;` |
| "Form modal em dùng CSS Grid hai cột `grid-template-columns: 1fr 1fr`" | `css/style.css:273` | `.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 24px; }` |
| "trường nào chiếm cả hàng thì thêm class `.full`" | `css/style.css:275` (dùng thật ở `index.html:177`, `208`, `212`) | `.form-field.full { grid-column: 1 / -1; }` |
| "Có hiệu ứng `hover` và `transition`" | `hover`: `css/style.css:83`, `172`, `210`, `228`, `245`, `299` — `transition`: `80`, `90`, `170`, `331` | `tbody tr:hover { background: var(--gray-50); }` (228) |
| "Phần responsive nằm ở cuối file" | `css/style.css:344-417` | khối `/* ============ RESPONSIVE ============ */` |
| "breakpoint 1100" | `css/style.css:348` | `@media (max-width: 1100px)` |
| "900" | `css/style.css:356-357` | `@media (max-width: 900px) { .form-grid { grid-template-columns: 1fr; } }` |
| "768" | `css/style.css:363-402` | `@media (max-width: 768px) { body { flex-direction: column; } ... }` |
| "520" | `css/style.css:411` | `@media (max-width: 520px)` |

---

## MỤC 4 — JAVASCRIPT (nói ~20s)

| Câu trong kịch bản | Vị trí thật | Mã nguồn |
|---|---|---|
| "JavaScript thuần, không dùng thư viện, ở `js/main.js`" | `js/main.js:1-6` (header comment), không có `import`/CDN nào | `Vanilla JavaScript: render dữ liệu…` |
| "Dữ liệu là hai mảng object `crops`" | `js/main.js:9-14` | `let crops = [` — 4 dòng dữ liệu (`10` Lúa, `11` Cà phê, `12` Cây ăn trái, `13` Ngô) |
| "và `pests`" | `js/main.js:16-21` | `let pests = [` — 4 dòng (`17-20`) |
| "Hàm `renderTable()`" | `js/main.js:54-109` | `function renderTable() {` |
| "lấy dữ liệu đã qua `getFiltered()`" | `js/main.js:55` | `const rows = getFiltered();` |
| "ghép chuỗi HTML đưa vào `innerHTML`" | `js/main.js:57` (tab cây) và `83` (tab sâu bệnh) | `table.innerHTML = \`<thead>...\`` |
| "gọi lại mỗi lần có thao tác" | `js/main.js:122`, `126`, `127`, `128`, `132`, `139`, `283`, `312`, `321`, `345` | `searchInput.addEventListener('input', renderTable);` (`126`) |
| "`getFiltered()` lọc theo khoá tìm kiếm, nhóm và trạng thái bằng `Array.filter`" | `js/main.js:38-52` (`filter` ở `43` và `48`) | `return crops.filter(c => (!q || c.name…) && (!g || c.group === g) && (!s || c.status === s));` |
| "Các hàm khác: chuyển tab" | `js/main.js:112-123` | `tabs.forEach(t => t.addEventListener('click', …))` |
| "mở modal" | `js/main.js:187-203` (`openCropModal`), `205-218` (`openPestModal`), nút Thêm ở `221-223` | `function openCropModal(id) {` |
| "và validate khi submit — kiểm tra tên bắt buộc" | `js/main.js:231-240` | `if (!name) { document.getElementById('f-name').classList.add('error'); ok = false; }` |
| "chu kỳ không âm" | `js/main.js:246-248` | `else if (Number(min) < 0 || Number(max) < 0)` |
| "'từ' không lớn hơn 'đến'" | `js/main.js:249-251` | `else if (Number(min) > Number(max))` |
| "phải có ít nhất một giai đoạn" | `js/main.js:254-256` | `if (!stages.length) { … 'f-stages' … }` |
| "không hợp lệ thì thêm class `.error` để CSS viền đỏ" | JS: `js/main.js:239`, `245`, `255`, `293`, `294` — CSS: `css/style.css:283` + `285` | `.form-field.error input { border-color: var(--red-500); }` |
| "Cuối cùng là `setStatus()` đổi trạng thái" | `js/main.js:316-324` (nút gọi từ `77-78`, `103-104`) | `window.setStatus = function (id, status, type) {` |
| "và `showToast()` báo kết quả" | `js/main.js:327-334` (HTML toast: `index.html:226-229`; CSS: `css/style.css:323-333`, class `.show` ở `333`) | `toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);` |
| "thêm giai đoạn / xóa giai đoạn dạng chip" | `js/main.js:148-159` (`renderStages`), `163-170` (`addStageInput`), `172-178` (`commitStage`), `180-183` (`removeStage`) | mũi tên nối chip: `145` |

---

## MỤC 3 & 5 — chi tiết hay bị hỏi khi demo

| Chi tiết nói trong kịch bản | Vị trí |
|---|---|
| "bảng đang render **bốn cây trồng** thật từ JS" | `js/main.js:9-14` |
| "badge trạng thái dùng ba màu xanh lá / xám / vàng" | `css/style.css:236`, `237`, `238` |
| Gõ "lúa" còn 1 dòng (khớp cả tên cây và tên giống) | `js/main.js:44` — `c.name.toLowerCase().includes(q) \|\| c.variety.toLowerCase().includes(q)` |
| Chọn "Lưu trữ" chỉ còn Ngô | dữ liệu `js/main.js:13` (`status: 'archived'`), lọc `45` |
| Bảng tab sâu bệnh đổi cột thành "Triệu chứng nhận biết" | `js/main.js:86` |
| Thêm sâu bệnh mới sinh mã **SB-005** | `js/main.js:307-308` — `String(pests.length + 1).padStart(3, '0')` |
| "Lưu trữ / Vô hiệu hóa" → badge xám, nút đổi thành "Khôi phục" | `js/main.js:76-78` (render điều kiện) + `316-324` |
| Nút hamburger thu sidebar | HTML `index.html:67`, JS `js/main.js:337`, CSS `css/style.css:337-341` |
| Console không lỗi đỏ | mở F12 → tab Console ở `index.html` |
| Escape đóng modal | `js/main.js:228`; click ra ngoài backdrop: `227` |

---

## MỤC 6 — 8 câu hỏi dự phòng, kèm chỗ để mở code

| Câu hỏi | Mở tới | Ý trả lời |
|---|---|---|
| "Xóa `e.preventDefault()` thì sao?" | `js/main.js:232` và `288` | Form submit mặc định → tải lại trang → mảng JS reset về 4 bản ghi, validate chưa kịp chạy |
| "JavaScript được kích hoạt khi nào?" | `index.html:10-12` + `js/main.js:345` | Script mang `defer` nên chỉ chạy sau khi HTML đã được parse xong; dòng cuối `renderTable()` vẽ bảng lần đầu; tương tác đăng ký qua `addEventListener` (`input` 126, `change` 127-128, `click` 113/130/136/221, `submit` 231/287, `keydown` 228) |
| "Vì sao bảng không viết sẵn trong HTML?" | `index.html:134` + `js/main.js:54-109` | HTML chỉ có table rỗng, dữ liệu ở mảng → tìm kiếm/lọc/thêm/sửa chỉ cần gọi lại `renderTable()` |
| "CSS `.form-grid` để làm gì?" | `css/style.css:273-275` | Grid 2 cột cho form modal; `.full` dùng `grid-column: 1 / -1` để chiếm trọn hàng |
| "Responsive xử lý ở đâu?" | `css/style.css:344-417`, cụ thể `364` (body thành cột), `365-379` (sidebar thành thanh ngang), `401-402` (`overflow-x:auto` + `table { min-width: 720px }`) | |
| "Badge đổi màu bằng cách nào?" | `js/main.js:70` (ghép class) + `css/style.css:236-238` | `class="badge ${c.status}"`, CSS có 3 rule theo hậu tố |
| "1000 dòng có chậm không?" | `js/main.js:57` (`innerHTML` cả bảng) | Có, vì vẽ lại toàn bộ; hướng khắc phục: phân trang / virtual scroll + backend |
| "`editingId` để làm gì?" | khai báo `js/main.js:25`, gán `188`/`206`, nhánh sửa `260-270` (`Object.assign` 262), nhánh thêm `271-281` (`push` 273) | null = thêm mới, có mã = đang sửa |
| "Điểm chưa hoàn thiện?" | `js/main.js:9`, `16` (`let` trong bộ nhớ, không có backend) + `44` (search mới phủ name/variety) | dữ liệu mất khi tải lại; chưa phân trang |

---

## ⚠️ Chỗ kịch bản cũ nói chưa khớp code (đã sửa trong kịch bản, bạn đọc theo bản mới)

1. **Mục 4 HTML** từng nói "`table` có `thead` và `tbody`". Trong HTML thật, `index.html:134` chỉ là
   `<table id="dataTable"></table>` rỗng — `thead`/`tbody` do `renderTable()` sinh ra (`js/main.js:58`, `63`).
   → Nếu GV mở `index.html` và hỏi "cho em xem dòng thead", bạn phải mở `main.js` dòng 58, không phải HTML.

2. **Mục 4 JS** từng gọi tên một hàm `validate()`. Không có hàm nào tên như vậy: toàn bộ kiểm tra
   nằm **trong listener của `submit`** (`js/main.js:231-258`). → Nói "phần validate em viết trong hàm xử lý submit".

3. **Mục 6** từng trả lời "script đặt cuối `body`". Thật ra script nằm trong `<head>` với thuộc tính
   **`defer`** (`index.html:10-12`) — tác dụng tương tự: chạy sau khi DOM đã parse xong. Đây là câu GV rất hay hỏi.

---

## Nếu thừa thời lượng: 3 điểm cộng thêm (chưa có trong kịch bản)

| Điểm | Vị trí | Nói 1 câu |
|---|---|---|
| `escapeHtml()` lọc ký tự đặc biệt | `js/main.js:34-36` + dùng ở `66`, `69` | "Em có hàm `escapeHtml()` chuyển các ký tự `& < > \" '` thành HTML entity, nên tên cây người dùng nhập sẽ hiển thị như text thường, không làm vỡ bố cục bảng." |
| Accessibility | `index.html:141` (`role="dialog"`, `aria-modal`, `aria-labelledby`), `226` (`role="status" aria-live="polite"`), `90-91` (`role="tab"`, `aria-selected`) | "Modal và toast có thuộc tính ARIA nên trình đọc màn hình nhận ra." |
| Chuyển tab đổi luôn placeholder + cột lọc | `js/main.js:117-121` | "Một cú click đổi cả nhãn nút Thêm, ô nhóm và placeholder tìm kiếm, nên hai tab dùng chung một toolbar." |
