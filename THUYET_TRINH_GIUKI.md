# KỊCH BẢN THUYẾT TRÌNH GIỮA KỲ — CSE122
## Trang: Quản lý danh mục cây trồng & Sâu bệnh (CropMate AI / SmartAgri)

> Thời lượng mục tiêu: **~03 phút** (đúng 5 phần của đề).
> Tốc độ nói chuẩn: ~150–170 từ/phút → mỗi phần 30s ≈ 75–85 từ, phần 60s ≈ 160 từ.
> Trang để demo: **`index.html`** (bản nhiều file, khớp cấu trúc GitHub đề yêu cầu). `giuaki.html` chỉ là bản 1 file để nộp.

---

## 0. Chuẩn bị trước khi bấm REC (OBS)

**Scene trong OBS (tạo sẵn 4 scene, Alt+Tab nhanh giữa các cảnh):**

| Scene | Nguồn (Source) | Dùng ở phần |
|---|---|---|
| 1. Trang web | Window Capture / Browser → `index.html` | 1, 3, 5 |
| 2. Figma | Window Capture file Figma (tab desktop) | 2 |
| 3. VS Code | Window Capture, font 16–18px | 4 |
| 4. Mặt mình (tuỳ chọn) | Video Capture Device (webcam) thu nhỏ góc | xuyên suốt |

**Checklist kỹ thuật:**
- [ ] OBS → Settings → Output: Recording Format **mkv hoặc mp4**, FPS **30**, Resolution **1920×1080**.
- [ ] Audio: Mic/Desktop Audio đã chọn đúng thiết bị → nói thử, xem thanh âm lượng nhún (không chạm đỏ).
- [ ] Tắt thông báo Zalo/Discord/Mail (Windows → Notifications: tạm tắt) — tắt luôn nhạc nền, Teams.
- [ ] Mở sẵn 3 cửa sổ: Figma, trình duyệt (`index.html`), VS Code — đóng tab thừa.
- [ ] Trình duyệt: **Ctrl+Shift+N** (cửa sổ ẩn danh) để không bị cache bản cũ; tắt extension dịch trang.
- [ ] Zoom trình duyệt `Ctrl + 0` hoặc `Ctrl + =` cho chữ to hơn; VS Code `Ctrl + =` lên 16–18px.
- [ ] Console (F12) mở sẵn tab Console → chứng minh **không lỗi đỏ** ở phần 3.
- [ ] Tên file quay: `CSE122-GK-SVxx-NguyenDucNhat-CropCatalog.mp4` (đúng format mục IV của đề).
- [ ] Quay **thừa 10–15 giây** đầu/cuối để cắt; nói chậm, ngắt hơi, không đọc từng dòng code.

**Mẹo:** quay từng phần một rồi ghép cũng được, nhưng quay 1 đúp liên tục tự nhiên hơn và đủ 3 phút. Làm hỏng thì dừng, im lặng 2 giây, nói lại câu đó — sau cắt bỏ.

---

## 1. GIỚI THIỆU (30 giây)

> *[Cảnh: trang web toàn màn hình]*

"Xin chào, em tên là **[Tên của bạn]**, mã số sinh viên **SVxx**. Em nộp bài kiểm tra giữa kỳ học phần CSE122 – Phát triển ứng dụng Web cơ bản.

Đề tài lớn của nhóm em là **CropMate AI**, còn gọi là **SmartAgri** – nền tảng hỗ trợ nông nghiệp thông minh, quản lý cây trồng, sâu bệnh và gợi ý canh tác bằng AI cho nông dân và hợp tác xã.

Trang em thực hiện là **'Quản lý danh mục cây trồng và sâu bệnh'** – trang dành cho **quản trị viên hệ thống**. Mục đích của trang là chuẩn hoá dữ liệu nền: danh mục cây trồng, giống cây, chu kỳ sinh trưởng, các giai đoạn phát triển và danh mục sâu bệnh hại. Dữ liệu này là căn cứ để nông dân lọc và để AI của hệ thống đưa ra gợi ý chính xác. Nói cách khác, trang này là nơi 'nhập đúng' để các trang khác 'dùng đúng'."

---

## 2. FIGMA (30 giây)

> *[Cảnh: chuyển sang Figma, zoom vào từng vùng]*

"Đây là bản thiết kế Figma của em, thiết kế cho **Desktop**. Bố cục gồm ba khối chính:

Thứ nhất là **sidebar** điều hướng ở bên trái, có logo, các trang của hệ thống và nút đăng xuất.
Thứ hai là **header** ở trên, chứa tiêu đề trang, ô tìm kiếm toàn cục, chuông thông báo và avatar người dùng.
Thứ ba là **vùng nội dung**: trên cùng là hai **tab** 'Danh mục Cây trồng' và 'Danh mục Sâu bệnh hại'; dưới là **thanh công cụ** gồm ô tìm kiếm, bộ lọc nhóm, bộ lọc trạng thái và nút làm mới; cuối cùng là **bảng dữ liệu**, mỗi dòng có badge trạng thái và nút 'Sửa'.

Ngoài ra em thiết kế **Modal thêm/sửa** với form hai cột, trong đó các giai đoạn sinh trưởng biểu diễn dạng chip nối với nhau bằng mũi tên, thể hiện đúng tính tuần tự của chu kỳ cây trồng. Em cũng có phương án responsive: dưới 768 pixel sidebar chuyển thành menu ngang và bảng cuộn ngang."

---

## 3. SẢN PHẨM (30 giây)

> *[Cảnh: trang web, trỏ chuột lướt qua từng vùng]*

"Đây là trang web em code từ bản Figma đó. Em so sánh nhanh: vẫn là sidebar xanh lá đặc trưng, header, hai tab, thanh công cụ và bảng dữ liệu — **màu sắc, khoảng cách, font chữ và bo góc** đều theo đúng thiết kế; badge trạng thái dùng ba màu xanh lá, xám và vàng.

Bảng đang render **bốn cây trồng** thật từ dữ liệu JavaScript, chứ không phải viết cứng trong HTML. Ô tìm kiếm, hai bộ lọc, nút 'Thêm', nút 'Sửa' và nút thu gọn sidebar đều hoạt động.

Em mở Console kiểm tra: **không có lỗi đỏ**, trang chạy sạch. Trên mobile, layout không vỡ — sidebar gập thành thanh menu trên đầu và bảng cuộn ngang."

---

## 4. HTML / CSS / JAVASCRIPT (60 giây)

> *[Cảnh: VS Code — mở lần lượt index.html, style.css, main.js]*
> 📍 **Mở `MA_CODE_THUYET_TRINH.md` cạnh bên khi quay** — mỗi câu nói dưới đây đều có sẵn tên file + số dòng để nhảy tới (`Ctrl+G`).

**HTML (~20s)**

"Về cấu trúc HTML, em dùng **semantic HTML** thay vì toàn `div`. Ngoài cùng là `aside.sidebar` chứa `nav` điều hướng và `footer`; bên phải là `main` chứa `header` tiêu đề và ba `section`: phần tab, phần toolbar bộ lọc, và phần bảng — trong HTML em để `table` rỗng, còn `thead` và `tbody` do JavaScript sinh ra. Modal là một `div` backdrop chứa `form` với `label`, `input`, `select` và hai nút. Em đặt `aria-label` cho các section và dùng `novalidate` trên form để tự validate bằng JavaScript."

> **Mở theo thứ tự (index.html):** `17` aside.sidebar → `31` nav → `55` footer → `65` main → `66` header/`71` h1 → `87` section content → `99` section toolbar → `133` section table-card → `134` table rỗng → `140` modal-backdrop → `148` form novalidate → `151-152` label/input → `170` select → `184-185` hai nút.

**CSS (~20s)**

"CSS em tách riêng vào `css/style.css`. Đầu file em khai báo biến màu trong `:root` như `--green-700`, `--gray-200`, nên đổi màu chủ đề chỉ cần sửa một chỗ. Layout tổng dùng **Flexbox**: `body` là flex row gồm sidebar và `main`. Thanh công cụ cũng là flex có `flex-wrap` để tự xuống dòng trên màn nhỏ. Form modal em dùng **CSS Grid** hai cột `grid-template-columns: 1fr 1fr`, trường nào chiếm cả hàng thì thêm class `.full`. Có hiệu ứng `hover` và `transition` trên nút và dòng bảng. Phần responsive nằm ở cuối file với **media query** các breakpoint 1100, 900, 768 và 520 pixel."

> **Mở theo thứ tự (css/style.css):** `6-30` :root (`9` --green-700, `22` --gray-200) → `34-41` body flex (dòng `39`) + `44` sidebar + `109` main → `176-177` toolbar flex-wrap → `273` .form-grid 1fr 1fr + `275` .full → `228` tbody tr:hover / `172` .btn-primary:hover / `80` transition → `348` media 1100 → `356` media 900 → `363` media 768 → `411` media 520.

**JavaScript (~20s)**

"JavaScript thuần, không dùng thư viện, ở `js/main.js`. Dữ liệu là hai mảng object `crops` và `pests`. Hàm `renderTable()` lấy dữ liệu đã qua `getFiltered()` rồi ghép chuỗi HTML đưa vào `innerHTML` của table — nghĩa là bảng **render từ mảng**, gọi lại mỗi lần có thao tác. `getFiltered()` lọc theo khoá tìm kiếm, nhóm và trạng thái bằng `Array.filter`. Các hàm khác: chuyển tab, mở modal, còn phần validate em viết ngay trong hàm xử lý `submit` của form — kiểm tra tên bắt buộc, chu kỳ không âm, 'từ' không lớn hơn 'đến', và phải có ít nhất một giai đoạn; không hợp lệ thì thêm class `.error` để CSS viền đỏ. Cuối cùng là `setStatus()` đổi trạng thái và `showToast()` báo kết quả."

> **Mở theo thứ tự (js/main.js):** `9-14` mảng crops + `16-21` mảng pests → `38-52` getFiltered (`filter` ở `43`) → `54-109` renderTable (`55` gọi getFiltered, `57` innerHTML) → `112-123` chuyển tab → `187` openCropModal → `231` submit + `232` preventDefault → `239` lỗi tên / `246` chu kỳ âm / `249` từ > đến / `255` thiếu giai đoạn → `316` setStatus → `328` showToast → `345` renderTable() lần đầu.

---

## 5. DEMO TRỰC TIẾP (30 giây)

> *[Cảnh: trang web. Vừa làm vừa nói, thao tác chậm]*

"Em demo ba chức năng chính.

**Tìm kiếm** — em gõ 'lúa': bảng còn lại đúng một dòng, vì bộ lọc khớp cả tên cây và tên giống theo thời gian thực. Em xoá đi để làm mới.

**Lọc theo trạng thái** — em chọn 'Lưu trữ': chỉ còn cây Ngô, badge xám.

**Thêm dữ liệu và validation** — em bật tab 'Danh mục Sâu bệnh hại', bảng đổi sang cột 'Triệu chứng nhận biết'. Em bấm 'Thêm sâu bệnh mới'. Em để trống rồi bấm **Lưu** → form báo lỗi đỏ, không cho lưu. Em nhập tên 'Bệnh bạc lá' và triệu chứng, bấm Lưu → dòng mới xuất hiện với mã **SB-005** và badge xanh, kèm thông báo góc phải.

Cuối cùng em quay lại tab Cây trồng, bấm 'Lưu trữ / Vô hiệu hóa' ở dòng Lúa → badge chuyển sang xám, nút đổi thành 'Khôi phục', và em bấm 'Khôi phục' để trả dữ liệu về trạng thái cũ. Em thu gọn sidebar bằng nút hamburger.

Em xin hết, cảm ơn thầy cô đã lắng nghe."

---

## 6. Câu hỏi GV hay hỏi ngẫu nhiên (mục VII của đề) — trả lời sẵn

> 📍 Mỗi câu có kèm **`(mở ...)`** — vị trí chính xác để nhảy tới khi GV yêu cầu "chỉ vào code".

**"Xóa đoạn `e.preventDefault()` ở submit form thì sao?"** *(mở `js/main.js:232` và `288`)*
→ Trình duyệt sẽ gửi form theo cách mặc định và tải lại trang, toàn bộ dữ liệu thêm mới trong mảng JavaScript bị mất, và code validate của em không kịp chạy.

**"JavaScript này được kích hoạt khi nào?"**
→ Ba thẻ script nằm trong `<head>` của `index.html` (dòng 10–12) và có thuộc tính **`defer`**, nên chúng chỉ chạy sau khi HTML đã được đọc xong — DOM đã tồn tại. Dòng cuối của `js/main.js` (dòng 345) gọi `renderTable()` để vẽ bảng lần đầu. Các tương tác còn lại đăng ký qua `addEventListener` cho sự kiện `input` (126), `change` (127–128), `click` (113, 130, 136, 221), `submit` (231, 287), `keydown` (228).

**"Vì sao bảng không viết sẵn trong HTML?"** *(mở `index.html:134` rồi `js/main.js:54-109`)*
→ Vì dữ liệu để ở mảng JS, render động nên tìm kiếm/lọc/thêm/sửa chỉ cần gọi lại `renderTable()`, không phải sửa HTML.

**"CSS này dùng để làm gì?"** *(GV trỏ `.form-grid` — mở `css/style.css:273-275`)*
→ Tạo grid hai cột cho form modal; `.form-field.full` dùng `grid-column: 1 / -1` để trường dài chiếm trọn hàng.

**"Responsive xử lý ở đâu?"** *(mở `css/style.css:344-417` — dòng `364`, `365-379`, `401-402`)*
→ Cuối `style.css`, các `@media (max-width: ... )`; ở 768px sidebar thành flex row, bảng đặt `min-width` + `overflow-x:auto` để cuộn ngang thay vì vỡ layout.

**"Badge đổi màu bằng cách nào?"** *(mở `js/main.js:70` và `css/style.css:236-238`)*
→ Mỗi object có trường `status` là `active`/`archived`/`disabled`; khi render em ghép class `badge ${c.status}` nên CSS chỉ cần ba rule `.badge.active`, `.badge.archived`, `.badge.disabled`.

**"Nếu data tăng lên 1000 dòng thì trang có chậm không?"** *(mở `js/main.js:57`)*
→ Có, vì `renderTable()` vẽ lại toàn bộ. Hướng khắc phục là phân trang hoặc virtual scroll, và cần backend thật vì hiện tại dữ liệu chỉ sống trong bộ nhớ, tải lại trang là về mặc định.

**"Biến `editingId` để làm gì?"** *(mở `js/main.js:25`, `188`, `260-281`)*
→ Phân biệt modal đang thêm mới (null) hay đang sửa (mã bản ghi); nếu là sửa thì `Object.assign` cập nhật object cũ, nếu không thì `push` object mới và sinh mã tự tăng.

**"Điểm chưa hoàn thiện?"** *(nói trước sẽ được cộng điểm thiện chí — mở `js/main.js:9`, `16`, `44`)*
→ Chưa có backend nên dữ liệu không lưu lâu dài (tải lại trang là về mặc định); chưa làm phân trang; tìm kiếm mới chỉ khớp tên cây/giống, chưa tìm sang cả giai đoạn sinh trưởng.

---

## 7. Dán vào README khi nộp

- **Link video:** *(dán link YouTube/Channel sau khi upload)*
- **Link GitHub:** https://github.com/ducnhatnguyen18-svg/CSE122-BTL-NGUYENDUCNHAT
- **Tên video theo yêu cầu:** `CSE122-GK-SVxx-TenCuaBan-CropCatalog`
