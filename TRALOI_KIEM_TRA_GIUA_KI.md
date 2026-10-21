# BÀI LÀM KIỂM TRA GIỮA KỲ — CSE122 (Đề trên lớp: 3 câu)
## Học phần Phát triển ứng dụng Web cơ bản — CropMate AI / SmartAgri

**Sinh viên:** Nguyễn Đức Nhật — **MSSV:** SVxx
**Trang được chọn làm mẫu:** `index.html` — *Quản lý danh mục cây trồng & Sâu bệnh* (trang quản trị)
**Bộ mã nguồn:** `index.html` (232 dòng) · `css/style.css` (417 dòng) · `js/main.js` (345 dòng)

> Mọi ý trả lời đều kèm **(file:dòng)** để mở đúng chỗ khi GV hỏi.
> Không dùng Bootstrap/Tailwind — toàn bộ CSS tự viết.

---

# CÂU 1 — CẤU TRÚC HTML (3.5 điểm)

## 1.1. Sơ đồ layout tổng thể (dạng hình hộp) + thẻ HTML ngữ nghĩa tương ứng

```
┌──────────────────┬────────────────────────────────────────────────┐
│ <aside            │ <header>                    (66–85)            │
│  class="sidebar"> │  ☰ │ <h1> tiêu đề │ <p> mô tả │ 🔔(2) │ [QT] ▼ │
│  (17–62)          ├────────────────────────────────────────────────┤
│  ├ <div class=    │ <main>                        (65–137)         │
│  │   "logo">      │  └ <section class="content">        (87–136)   │
│  ├ <nav> 4        │     ├ <div class="content-top">  (88)          │
│  │  .nav-item     │     │   ├ <div class="tabs" role="tablist">    │
│  ├ <button        │     │   │     [Cây trồng] [Sâu bệnh]  (90–91)  │
│  │  class=        │     │   └ <button class="btn-primary">+ Thêm   │
│  │  "logout-btn"> │     ├ <section class="toolbar">                │
│  └ <footer        │     │   🔍<input> │ <select>nhóm │ <select>TT  │
│     class="side-  │     ├ <section class="table-card">             │
│     footer">      │     │   <table id="dataTable"> ← thead/tbody JS sinh
│     <p> + <ul><li>│     └──────────────────────────────────────────┘
│       × <a>       │  Ngoài <main>: <div class="modal-backdrop"> (140)
└───────────────────┘    .modal role="dialog" → <form novalidate> (148–222)
                         <div class="toast" role="status"> (226)
```

## 1.2. Nội dung trong `header` / `main` / `footer`

| Khối | Chứa gì | Thẻ dùng |
|---|---|---|
| `<header>` 66–85 | Nút thu gọn menu · tiêu đề + mô tả · chuông có badge · avatar + tên vai trò | `<button>`, `<svg>`, `<div>`, **`<h1>`**(71), **`<p>`**(72), `<span>`(77, 81) |
| `<main>` 65–137 | `<header>` ở trên + 2 tab, nút "Thêm", thanh tìm kiếm/lọc, bảng dữ liệu | **`<section>`**×3 (87, 99, 133), **`<button>`**, **`<input type="text">`**(102), **`<select>`+`<option>`**(105–120), **`<table><thead><tbody><tr><th><td>`**(134 + `main.js:58–81`) |
| `<footer class="side-footer">` 55–61 | Bản quyền "© 2026 SmartAgri" + 2 liên kết (Hỗ trợ, Điều khoản) | **`<p>`**, **`<ul>`**, **`<li>`**, **`<a href="#">`** |

Form thêm/sửa dùng đúng cặp **`<form novalidate>` → `<label for>` → `<input>`/`<select>` → 2 `<button>`** (148–187, 190–222).

## 1.3. Một khối lặp lại: 1 dòng cây trồng trong bảng

Lặp 4 lần theo 4 phần tử của mảng `crops`. HTML sau render (F12 → Elements):

```html
<tr>
  <td class="mono">CAY-001</td><td>Lúa</td><td>IR50404</td><td class="mono">120 - 140</td>
  <td>Giao mạ → Đẻ nhánh → Làm đòng → Trổ bông → Thu hoạch</td>
  <td><span class="badge active">Đang hoạt động</span></td>
  <td><div class="row-actions"><button class="btn-edit">Sửa</button>
      <button class="btn-link">Lưu trữ / Vô hiệu hóa</button></div></td>
</tr>
```

Code sinh ra nó — `js/main.js:63–80`: `rows.map(c => `<tr>… ${c.id} … ${escapeHtml(c.name)} … <span class="badge ${c.status}"> …</tr>`).join('')`.

*Khối lặp khác nếu GV hỏi:* 4 mục menu `.nav-item` (32–47); chip giai đoạn `.stage-chip` nối bằng `.stage-arrow`, lặp theo mảng `stages` (`main.js:148–159`).

---

# CÂU 2 — DÀN TRANG VÀ ĐỊNH DẠNG CSS (3.5 điểm)

## 2.1. Khu vực dùng Flexbox / CSS Grid

`[F] = display:flex` · `[G] = display:grid` · `[T] = table layout`. Trên bản vẽ Câu 1: sidebar + header + content-top + tabs + toolbar + modal-backdrop = **[F]**; form trong modal = **[G]**; bảng = **[T]**.

| # | Khu vực | KT | ≥2 thuộc tính + tác dụng | Dòng |
|---|---|---|---|---|
| 1 | `<body>` — khung 2 cột | **F** | `display:flex` đặt sidebar nằm cạnh `main`; `min-height:100vh` để nền phủ hết màn hình | 34–41 |
| 2 | `<main>` | **F** | `flex:1` chiếm hết chiều ngang còn lại; `min-width:0` cho bảng co lại, không đẩy layout tràn ngang | 109 |
| 3 | `.sidebar` | **F** | `flex-direction:column` xếp logo→nav→logout→footer dọc; `flex-shrink:0` giữ đúng 260px | 44–55 |
| 4 | `<header>` | **F** | `align-items:flex-start` neo đỉnh (vì tiêu đề 2 dòng); `gap:16px` thay cho margin từng phần tử | 110–117 |
| 5 | `.content-top` | **F** | `justify-content:space-between` đẩy tab sang trái, nút "Thêm" sang phải; `flex-wrap` để màn hẹp tự xuống dòng | 152–155 |
| 6 | `.toolbar` | **F** | `flex-wrap:wrap`; `.search-box{flex:1;min-width:260px}` để ô tìm kiếm co giãn, `<select>` giữ cỡ tối thiểu | 176–181 |
| 7 | `.form-grid` | **G** | `grid-template-columns:1fr 1fr` 2 cột đều nhau; `gap:20px 24px` (2 giá trị dọc–ngang); `.full{grid-column:1/-1}` cho trường dài chiếm trọn hàng | 273–275 |
| 8 | `.stages-row` | **F** | `align-items:center` cho mũi tên thẳng hàng chip; `gap:10px` + `flex-wrap:wrap` | 289 |
| 9 | `.modal-backdrop` | **F** | `align-items` + `justify-content:center` căn giữa modal không cần tính `margin:auto` | 256–260 |
| 10 | `table` | **T** | `border-collapse:collapse` gộp vạch kẻ chồng nhau thành 1 đường | 219 |

## 2.2. `position` + `margin` / `padding`

| Chỗ trên giao diện | Thuộc tính | Giải thích của em | Dòng |
|---|---|---|---|
| Sidebar | `sticky; top:0; height:100vh` | Bảng dài cuộn xuống vẫn thấy menu, không phải cuộn lên đầu | 51–53 |
| Lớp phủ modal | `fixed; inset:0; z-index:50` | `fixed` neo vào viewport (không phụ thuộc cuộn); `inset:0` = 4 cạnh bằng 0 nên phủ kín màn; `z-index` đè sidebar/header | 257–259 |
| Nút ✗ modal | cha `relative` (265) + `absolute; top/right:20px` | `absolute` tính theo cha gần nhất có `position` → luôn đúng góc trong trên-phải, mặc kệ modal rộng bao nhiêu | 268–270 |
| Badge "2" trên chuông | `.bell relative` + `.badge absolute top/right:0` | Đè số thông báo lên mép trên chuông | 127–133 |
| Kính lúp ô tìm kiếm | `absolute; left:14px; top:50%; transform:translateY(-50%)` | Cách canh giữa **dọc** cho icon đè trong input; input `padding-left:42px` để chữ không chồng icon | 180–187 |
| Mũi tên `<select>` | `appearance:none` (194) bỏ mũi tên mặc định rồi dùng `<svg absolute right:12px>` + `pointer-events:none` (202) | Icon của em đổi được màu; `pointer-events:none` để click xuyên qua icon rơi đúng `<select>` | 192–203 |
| Toast | `fixed; bottom/right:24px; z-index:60` | Góc phải dưới, cao hơn modal để vẫn thấy sau khi lưu | 323–324 |

`margin`/`padding` (chọn bảng dữ liệu): `*{margin:0;padding:0;box-sizing:border-box}` (32) — reset và bật `border-box` để **padding không làm phần tử rộng thêm** · `.content{padding:24px 32px}` (151) · `.toolbar{margin-bottom:16px}` (177) dùng **margin** vì là khoảng cách *ra ngoài* khối · `thead th{padding:14px 16px}` (222) vs `tbody td{padding:18px 16px}` (226) dùng **padding** vì ô bảng cần khoảng cách *bên trong* để chữ không dính vạch kẻ, `td` lớn hơn để dòng cao hơn tiêu đề · mẹo: `.tab{padding:10px 4px; margin-bottom:-2px}` (160) — **margin âm** kéo tab xuống để gạch chân 2px của tab active đè khít lên đường kẻ `.tabs` (156).

## 2.3. Hiệu ứng tương tác và responsive

**Hiệu ứng tương tác (`:hover` + `transition`)**

```css
.nav-item    { transition: background .15s, color .15s }   /* 80 */
.nav-item:hover  { background: var(--gray-100) }           /* 83 */
.btn-primary { transition: background .15s }               /* 170 */
.btn-primary:hover { background: var(--green-800) }        /* 172 */
tbody tr:hover   { background: var(--gray-50) }            /* 228 */
.toast { opacity:0; transform:translateY(12px);
         transition: opacity .25s, transform .25s }         /* 330–331 */
.toast.show { opacity:1; transform:translateY(0) }          /* 333 */
```

Khai báo `transition` ở **trạng thái thường** (không đặt trong `:hover`) để cả lúc vào lẫn lúc ra đều mượt, không "giật". `tbody tr:hover` đổi nền giúp mắt theo đúng dòng đang thao tác. Toast chuyển `opacity` + `transform` chứ không đổi `display` (display không transition được) nên nó trượt nhẹ lên.

4 breakpoint: `1100` giảm padding `.content` (348) · `900` `.form-grid` 2 cột → 1 cột (356) · `768` `body{flex-direction:column}` 2 cột thành 2 hàng (364), sidebar bỏ `sticky` thành thanh ngang (365–375), `.nav` nằm ngang + `flex-wrap` (379), toast full ngang (407) · `520` chữ/nút nhỏ hơn (411).
Điểm nhấn: bảng 7 cột **không ép co** trên mobile → `table{min-width:720px}` (402) + `.table-card{overflow-x:auto}` (401) — bảng cuộn ngang trong thẻ, layout chung không vỡ.

---

# CÂU 3 — TƯƠNG TÁC VỚI JAVASCRIPT (3.0 điểm)

## Chức năng được chọn: TÌM KIẾM & LỌC BẢNG DỮ LIỆU (render từ mảng)

### 3.1. Sự kiện và cách bắt phần tử

| Phần tử | Lệnh JS | Sự kiện | Dòng |
|---|---|---|---|
| `<input id="searchInput">` | `getElementById` | **`input`** — chạy theo từng ký tự (`change` phải chờ blur) | 29, 126 |
| `<select id="groupFilter">`, `#statusFilter` | `getElementById` | **`change`** — chỉ đổi khi chọn 1 giá trị | 30–31, 127–128 |
| `<button id="btnRefresh">` | `getElementById` | **`click`** — xoá trắng cả 3 bộ lọc | 130–134 |
| `<table id="dataTable">` | `getElementById` | không có — chỉ là **nơi đích** để ghi kết quả | 28 |

Dùng `getElementById` vì mỗi thẻ có `id` duy nhất, nhanh và rõ hơn `querySelector`; riêng tab có nhiều phần tử trùng class nên `querySelectorAll('.tab')` (`main.js:112`).

### 3.2. Luồng xử lý

```
Gõ "lúa" ─► [1 LẤY DỮ LIỆU]  q = searchInput.value.trim().toLowerCase()   (39)
                              g = groupFilter.value, s = statusFilter.value (40–41)
                              nguồn: mảng crops (9–14) / pests (16–21)
      ─► [2 KIỂM TRA]  currentTab==='crops' ? lọc crops : lọc pests       (42, 48)
                       giữ phần tử khi thoả CẢ 3 điều kiện:
                         • !q || name/variety.includes(q)                  (44)
                         • !g || group===g   • !s || status===s            (45)
                       "!q" ⇒ ô trống thì điều kiện xem như đúng (không lọc)
      ─► [3 XỬ LÝ]  crops.filter(…) trả về MẢNG MỚI `rows`                (43)
                    rows.length ? rows.map(c => `<tr>…</tr>`) : dòng "Không tìm thấy…"  (63–80)
```

`trim()` bỏ khoảng trắng thừa; `toLowerCase()` **cả hai phía** ⇒ tìm không phân biệt hoa thường; so bằng `includes()` (chứa chuỗi) thay `===` ⇒ gõ "ca" vẫn ra "Cà phê".

### 3.3. Cập nhật giao diện (DOM)

Bản chất: gán lại `table.innerHTML = '<thead>…</thead><tbody>…'` (`main.js:57`) — dựng lại cả bảng từ mảng kết quả.

| Thay đổi trên màn hình | Thuộc tính / phương thức JS | Dòng |
|---|---|---|
| Bảng 4 dòng → 1 dòng | gán **`innerHTML`** cho `<table>` | 57–81 |
| Dòng "Không tìm thấy dữ liệu phù hợp" | tam phân `rows.length ? … : '<td colspan="7" class="empty-state">'` | 80 |
| Badge đổi màu (xanh/xám/vàng) | class động `badge ${c.status}` + 3 rule `.badge.active/.archived/.disabled` (`style.css:236–238`) | 70 |
| Nút "Lưu trữ / Vô hiệu hóa" ↔ "Khôi phục" | `c.status !== 'archived' ? … : …` khi ghép chuỗi | 76–78 |
| Toast "Đã làm mới dữ liệu" | `toastMsg.textContent = msg` + `classList.add('show')`, `remove('show')` sau 2600 ms | 328–334 |
| Đổi tab → đổi nhãn nút, placeholder, ẩn select nhóm | `btnAddLabel.textContent`, `searchInput.placeholder`, `style.display` | 117–121 |

**Vì sao hợp lệ:** HTML chỉ có `<table>` rỗng (`index.html:134`), dữ liệu nằm ở mảng JS ⇒ mọi thao tác tìm/lọc/thêm/sửa chỉ cần gọi lại **một** hàm `renderTable()`.

---

## DỰ PHÒNG — nếu GV chọn "KIỂM TRA FORM + THÊM DỮ LIỆU"

- **Sự kiện & phần tử:** **`submit`** trên `<form id="cropForm" novalidate>` (`main.js:231`, `pestForm` 287) — `novalidate` (`index.html:148`) tắt kiểm tra mặc định của trình duyệt để JS tự làm. Modal mở bằng **`click`** vào `#btnAdd` (221) hoặc nút "Sửa" do `main.js:72` sinh (`onclick="openCropModal('CAY-001')"`).
- **Luồng:** `e.preventDefault()` (232) chặn tải trang → lấy `name`, `inpCycleMin/Max`, `draftStages` (234–236, 254) → 5 điều kiện, sai thì `ok=false`: name rỗng (239) · thiếu 1 ô chu kỳ (243) · chu kỳ âm (246) · min > max (249) · hết giai đoạn (255) → `if (!ok) return;` (258) → `editingId !== null ? Object.assign(cập nhật bản ghi cũ)` (260–270) `: crops.push(mới, 'CAY-' + String(n+1).padStart(3,'0'))` (271–280).
- **DOM:** `classList.add('error')` lên field (vd `#f-name`) → CSS `.form-field.error input{border-color:var(--red-500)}` viền đỏ + `.form-field.error .err-msg{display:block}` chữ đỏ (`style.css:283, 285`). Thành công → `backdrop.classList.remove('open')` đóng modal (ẩn bằng `display:none`, `style.css:256–261`) → `renderTable()` vẽ lại bảng có dòng mới → `showToast()` (`main.js:282–283, 328–333`).

---

## Hỏi thêm hay gặp

| Câu hỏi | Trả lời |
|---|---|
| "JS chạy khi nào?" | 3 thẻ `<script>` trong `<head>` có **`defer`** (`index.html:10–12`) ⇒ chạy sau khi DOM đọc xong; dòng cuối `main.js:345` gọi `renderTable()` vẽ bảng lần đầu |
| "Xoá `e.preventDefault()` thì sao?" | Trang tải lại ⇒ mảng khởi tạo lại từ đầu, dữ liệu vừa thêm biến mất, code validate không kịp chạy |
| "Vì sao không viết sẵn bảng trong HTML?" | Dữ liệu ở mảng JS; render động giúp tìm/lọc/thêm/sửa chỉ cần gọi lại `renderTable()` |
| "`editingId` để làm gì?" | Phân biệt modal đang thêm mới (`null`, `25`) hay đang sửa (mã bản ghi, `188`) ⇒ quyết định `push` hay `Object.assign` |
| "`escapeHtml()` làm gì?" | `main.js:34–36` đổi `& < > " '` thành HTML entity trước khi nhúng `innerHTML`, để tên cây nhập vào hiển thị như text thường, không làm vỡ bố cục bảng |
| "Điểm chưa hoàn thiện?" | Chưa có backend nên reload về dữ liệu mẫu; chưa phân trang; tìm kiếm mới phủ tên cây + tên giống, chưa tìm sang giai đoạn sinh trưởng |
