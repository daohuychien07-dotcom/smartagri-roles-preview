# KỊCH BẢN THUYẾT TRÌNH CUỐI KỲ — BÀI 1/2
## Trang: Bảng điều khiển hệ thống (`dashboard.html`) — CropMate AI / SmartAgri

> **Nhịp đọc:** ~2 từ/giây. Số từ **đếm thật bằng `perl` trên các đoạn nói trong dấu ngoặc kép** (lệnh đếm ở bài 2, mục 9; dấu gạch ngang "—" không tính là một từ): 77 + 67 + 59 + 162 + 89 = **454 từ ≈ 3 phút 47 giây** phần lời, cộng ~15 giây thao tác demo → **~4 phút**. Quy chế cuối kỳ cho phép 3–5 phút/video (`docs/obs-evidence.md` mục 1).
> Muốn gọn **427 từ ≈ 3 phút 34**: bỏ 3 câu ✂ ở mục 0 (đếm riêng: 13 + 7 + 7 = 27 từ).
> Màn hình: hàng **23** trong `docs/screen-inventory.md` · công việc **TASK-23** · video `SV3-08-admin-dashboard.mp4`.
> Câu nào ứng với dòng code nào: mọi trích dẫn `(file:dòng)` trong bài đã mở file kiểm tra lại, không phỏng đoán.

---

## 0. Chuẩn bị trước khi bấm REC (OBS)

**4 cảnh:** ① `dashboard.html` trên trình duyệt (phần 1, 3, 5) · ② bản Canva (phần 2) · ③ VS Code mở `dashboard.html` + `css/dashboard.css` + `js/dashboard.js`, font 16–18 px (phần 4) · ④ webcam (bắt buộc — quy chế yêu cầu có mặt sinh viên).

**Kiểm trước khi quay**
- [ ] Đăng nhập bằng card **Quản trị hệ thống** ở `login.html` → menu chỉ còn đúng nhóm trang của vai trò admin (đây là điểm cộng phân quyền, nói được 1 câu).
- [ ] Mở sẵn **F5 xong** tab Console (phần 3 khẳng định "console sạch" → phải thấy thật).
- [ ] Output 1920×1080, 30 fps; âm lượng không chạm đỏ; tắt Zalo/Teams/Mail.
- [ ] Dùng cửa sổ ẩn danh hoặc cổng server mới để trình duyệt không chạy JS bản cũ.
- [ ] **Số liệu đã đo thật trên máy** (đọc lại để không nói sai): thẻ "Tài khoản chờ duyệt" = **19** khi `localStorage` có đúng 1 hồ sơ chờ duyệt (`js/dashboard.js:119-123`); "Hàng ngày" = **7 cột** nhãn 15/6→21/6, trục tung 250→0; "Hàng tuần" = **4 cột** 520/640/710/**880**, trục 1.000→0; bảng nhật ký = 5 dòng mẫu + số hồ sơ đăng ký thật (đo với 1 hồ sơ → **6 dòng**).
- [ ] **Cảnh giác khi REC:** chiều cao cột được khôi phục trong `requestAnimationFrame` lồng nhau (`js/dashboard.js:64-70`). Tab bị ẩn hoặc tab nền có thể làm cột đứng ở `0%` — bảo đảm tab đang hiển thị và được focus lúc quay; nếu cột không hiện, bấm "Hàng tuần" rồi "Hàng ngày" để vẽ lại.

**8 ý quy chế phải có trong video**
- [ ] ① Mặt + giọng sinh viên. ② Mở bản Canva của đúng màn hình. ③ Mở đúng 3 tệp HTML/CSS/JS.
- [ ] ④ Giải thích bố cục & logic (không đọc lại mô tả trong docs).
- [ ] ⑤ **Sửa trực tiếp 1 chi tiết:** mở `js/dashboard.js:11`, đổi `182` thành `240` trong mảng `values` của `CHART_DATA.day` → Lưu → F5 → cột "19/6" cao gần chạm đỉnh, tooltip hiện **240**. Nói 1 câu: "cột vẽ bằng phần trăm nên đổi dữ liệu là đổi chiều cao, em không phải sửa CSS."
- [ ] ⑥ Chạy tương tác: đổi Hàng ngày ↔ Hàng tuần, hover cột, hamburger.
- [ ] ⑦ `git add js/dashboard.js` + `git commit` + `git push origin main`.
- [ ] ⑧ Cuối video đọc to: "**TASK-23**, nhánh **main**, commit **`<hash>`**."

- [ ] Tên file: `SV3-08-admin-dashboard.mp4`. Quay thừa 10 giây đầu/cuối. Hỏng thì im 2 giây rồi nói lại câu đó, không cần dựng lại từ đầu.

**✂ Ba câu bỏ được nếu tập dượt thấy quá 3 phút 30** (đếm 13 + 7 + 7 = **27 từ**, không mất ý chấm điểm):
1. Phần 2 — mệnh đề cuối: *"trên cùng là thanh tiêu đề, chuông thông báo và chip người dùng."* (thầy cô nhìn thấy ngay trên màn hình ở phần 3).
2. Phần 4 HTML — câu cuối: *"Bốn script nạp ở `head` với `defer`."* (ý này trả lời được ở câu hỏi 2 mục 7 nếu thầy cô hỏi).
3. Phần 5 — vế sau: *"em rê chuột thì tooltip hiện 880."* (đổi khoảng thời gian đã đủ chứng minh biểu đồ render động).

---

## 1. GIỚI THIỆU — 77 từ ≈ 38 giây

> *[Cảnh: `dashboard.html` toàn màn hình]*

"Xin chào, em tên **[Tên]**, MSSV **SVxx**. Đề tài cuối kỳ của em là **CropMate AI — SmartAgri**, nền tảng quản lý cây trồng và sâu bệnh cho nông hộ, hợp tác xã, chuyên gia và quản trị. Màn hình em thuyết trình hôm nay là **Bảng điều khiển hệ thống** `dashboard.html`: nhìn trong một trang số tài khoản, hồ sơ đang chờ duyệt, lượng người dùng active và nhật ký hoạt động gần đây."

---

## 2. BẢN MÔ PHỎNG CANVA — 67 từ ≈ 34 giây

> *[Cảnh: trang Canva trong link README, zoom từng tầng]*

"Tám trang quản trị, có trang này, em thiết kế trong bộ Canva **35 trang** — link nằm ở README và `design/figma-link.txt`. Bố cục ba tầng: **hàng bốn thẻ chỉ số** có icon màu, số lớn và chú thích nhỏ; **hàng hai cột** gồm biểu đồ cột bên trái và bảng nhật ký bên phải; trên cùng là thanh tiêu đề, chuông thông báo và chip người dùng."

---

## 3. SẢN PHẨM — 59 từ ≈ 30 giây

> *[Cảnh: trang web, chuột lướt từng vùng]*

"Đây là trang em code từ đúng bản đó: sidebar xanh, header, bốn thẻ, hai panel; **màu, khoảng cách và font** lấy từ biến chung. Biểu đồ và bảng **không viết cứng trong HTML** mà vẽ từ mảng JavaScript — em bấm 'Hàng tuần' thì trục tung, chiều cao cột và nhãn đổi theo. Console **không có lỗi đỏ**."

---

## 4. HTML / CSS / JAVASCRIPT — 162 từ ≈ 81 giây

> *[Cảnh: VS Code — `dashboard.html`, `css/dashboard.css`, `js/dashboard.js`]*

**HTML — 44 từ ≈ 22 giây**

"Em dùng **semantic HTML**: `aside.sidebar` chứa `nav`, `main` chứa `header` rồi `section.content.dash`. Bốn thẻ là `article.stat-card`; hai panel là `article.panel`. Vùng vẽ biểu đồ `div#bars` và `tbody` của bảng **để trống trong HTML** — JavaScript sinh ra. Bốn script nạp ở `head` với `defer`."

> Nhảy tới: `dashboard.html:20` sidebar → `34` `nav` → `104` `main` → `126` `section.content.dash` → `129-179` `stat-grid` + 4 thẻ → `182` `dash-cols` → `194-197` `#chart`/`#bars` trống → `207-212` `#logTable` → `11-15` script `defer`.

**CSS — 62 từ ≈ 31 giây**

"CSS riêng ở `dashboard.css`, dùng **biến màu trong `:root`** của `style.css` nên tám trang cùng một chủ đề. `.stat-grid` là **Grid bốn cột `repeat(4, 1fr)`**; `.dash-cols` dùng `minmax(0, 1fr)` để bảng nhật ký không đẩy trang **tràn ngang**. Cột biểu đồ cao theo `height` phần trăm kèm `transition` 0,6 giây; cuối file bốn **media query** từ 1100 xuống 520 pixel."

> Nhảy tới: `style.css:6` `:root` → `dashboard.css:9-13` `.stat-grid` → `56-62` `.dash-cols` (`59` `minmax(0,1fr)`) → `103-110` `.bar` + `transition` → `112-118` `.tip` → `143`/`146`/`149`/`157` media → `style.css:346` `body.collapsed` thu sidebar còn 84 px.

**JavaScript — 56 từ ≈ 28 giây**

"JavaScript thuần, không thư viện. `CHART_DATA` giữ dữ liệu **hai khoảng** ngày và tuần; `renderChart()` tính chiều cao theo `giá trị / max × 100` rồi dùng `requestAnimationFrame` **kéo cột từ 0 lên**. `renderLogs()` nối **hồ sơ đăng ký thật** từ `js/store.js` với mảng nhật ký mẫu, và mọi chuỗi động đều đi qua `escapeHtml()`."

> Nhảy tới: `dashboard.js:8-21` `CHART_DATA` → `44-71` `renderChart` (`53` công thức chiều cao, `64-70` `requestAnimationFrame`) → `75-86` `registrationLogs` → `88-102` `renderLogs` (`96` `escapeHtml`, `42` định nghĩa) → `117-144` `DOMContentLoaded`.

---

## 5. DEMO TRỰC TIẾP — 89 từ ≈ 45 giây lời nói + ~15 giây thao tác

> *[Cảnh: trang web — vừa làm vừa nói]*

"**Đổi khoảng thời gian** — em bấm 'Hàng tuần': biểu đồ còn bốn cột, trục tung đổi thang 0 đến 1.000, em rê chuột thì tooltip hiện **880**.
**Thu gọn menu** — em bấm hamburger, sidebar còn dải icon, nội dung tự mở rộng.
**Số liệu thật** — thẻ 'Tài khoản chờ duyệt' không phải số cứng: code lấy 18 cộng **đúng số hồ sơ** trong `localStorage`. Em vừa đăng ký một hồ sơ ở cổng đăng nhập, nên con số này đã tăng.
Em xin hết, cảm ơn thầy cô."

> Thao tác chậm ~4 giây/bước. Nếu cháy giờ: bỏ bước hover tooltip và bước hamburger.

---

## 6. Nói trước cho trung thực (nếu thầy cô hỏi thì đã có sẵn)

- **Ba thẻ số còn lại** — 1.250 / 3.420 / 98.2% — **là dữ liệu giả lập viết trực tiếp trong HTML** (`dashboard.html:137`, `165`, `176`). Em nói rõ: chỉ thẻ "Tài khoản chờ duyệt" là tính từ dữ liệu thật trong trình duyệt (`dashboard.js:119-123`).
- **"Tỷ lệ gọi AI thành công 98.2%" là con số mô phỏng.** Dự án **không gọi API mô hình nào**; ba trải nghiệm AI của bài là thuật toán mô phỏng trong trình duyệt, khai chi tiết ở `docs/ai-usage-report.md`.
- **Nhật ký hoạt động** là 5 dòng mẫu (`dashboard.js:31-37`) cộng 3 hồ sơ đăng ký thật gần nhất (`:82`).
- **Chưa có backend**, nên toàn bộ dữ liệu nằm trong `localStorage`; tải máy khác là số khác.

---

## 7. Câu hỏi hay bị hỏi — trả lời 1 câu

1. **"Biểu đồ dùng thư viện gì?"** *(dashboard.js:52-61, dashboard.css:91-119)* → Không thư viện. Mỗi cột là một `div.bar` có `height` theo phần trăm; `border-left` + `border-bottom` trên `.bars` (`:99-100`) tạo trục.
2. **"Sao phải `requestAnimationFrame`?"** *(dashboard.js:64-70)* → `transition` của CSS chỉ chạy khi giá trị **đổi**; em đặt chiều cao về 0 rồi trả lại giá trị thật ở khung hình kế tiếp để cột "mọc" lên.
3. **"`escapeHtml()` để làm gì?"** *(dashboard.js:42, dùng ở `:96`)* → Dòng nhật ký chứa **Họ tên do người dùng gõ** ở form đăng ký; thoát ký tự đặc biệt để nó hiện nguyên văn dưới dạng chữ, không bị trình duyệt hiểu thành thẻ HTML.
4. **"Muốn thêm khoảng 'Hàng tháng' thì làm gì?"** *(dashboard.js:8-21, `dashboard.html:189-192`)* → Thêm một khóa `month` vào `CHART_DATA` và một `<button class="seg-btn" data-range="month">`; `renderChart(btn.dataset.range)` (`:135`) tự nhận, không phải sửa logic.
5. **"Responsive ở đâu?"** *(dashboard.css:143-161)* → 1100 px xuống 2 cột thẻ, 900 px hai panel thành một cột, 768 px bỏ `min-width` bảng và giảm chiều cao biểu đồ, 520 px còn 1 cột thẻ.
6. **"Trang này có điểm chưa ổn?"** *(dashboard.js:122, `dashboard.html:137-176`)* → Có: con số 18 làm gốc cộng thêm là em tự đặt, nên khi có backend phải lấy tổng thật; ba thẻ số chưa tính từ dữ liệu.

---

## 8. Dán vào README khi nộp

- **Link video:** *(dán sau khi upload — để YouTube Unlisted)*
- **Tên video:** `SV3-08-admin-dashboard.mp4` · **TASK-23** · màn hình `dashboard.html`
- **Nhánh:** `main` (repo nộp bài `CSE122-BTL-NGUYENDUCNHAT`) · **Commit:** `<hash thật trong git log>`
- **Trạng thái trong `docs/obs-evidence.md`:** đổi hàng TASK-23 từ **CẦN QUAY** → **ĐÃ CÓ** + dán link.
