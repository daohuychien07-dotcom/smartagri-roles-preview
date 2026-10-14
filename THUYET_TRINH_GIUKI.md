# KỊCH BẢN THUYẾT TRÌNH GIỮA KỲ — CSE122
## Trang: Quản lý danh mục cây trồng & Sâu bệnh (CropMate AI / SmartAgri)

> **Bản tinh gọn** — tổng lời nói **385 từ ≈ 3 phút 10 giây** (đếm bằng `awk`, nhịp ~2 từ/giây).
> Nhịp tham chiếu: 30s ≈ 60 từ, 60s ≈ 120 từ. Số từ thật của từng phần ghi trong ngoặc.
> **Muốn chắc chắn dưới 3 phút** → bỏ 3 câu trong danh sách ✂ ở mục 0: còn ~350 từ ≈ 2 phút 55.
> Trang demo: **`index.html`** (nhiều file, khớp cấu trúc GitHub đề yêu cầu). `giuaki.html` là bản 1 file để nộp.
> Câu nói nào ứng với dòng code nào: xem `MA_CODE_THUYET_TRINH.md`.

---

## 0. Chuẩn bị trước khi bấm REC (OBS)

**4 scene:** ① trang web `index.html` (phần 1, 3, 5) · ② Figma (phần 2) · ③ VS Code font 16–18px (phần 4) · ④ webcam thu nhỏ (tuỳ chọn).

- [ ] Output **1920×1080, 30fps**, format mkv/mp4.
- [ ] Nói thử, thanh âm lượng không chạm đỏ; tắt Zalo/Discord/Mail/Teams.
- [ ] Mở sẵn Figma + trình duyệt + VS Code; dùng cửa sổ ẩn danh tránh cache; **F12 để sẵn tab Console** (dùng ở phần 3).
- [ ] Tên file: `CSE122-GK-SVxx-NguyenDucNhat-CropCatalog.mp4`.
- [ ] Quay thừa 10 giây đầu/cuối để cắt. Hỏng thì im lặng 2 giây rồi nói lại câu đó.

**Mẹo:** quay một đúp liên tục tự nhiên hơn ghép từng phần.

**✂ Ba câu bỏ được nếu tập dượt thấy quá 3 phút** (đỡ ~35 từ, không mất ý chấm điểm):
1. Phần 4 HTML — câu cuối: *"Form modal có `label`, `input`, `select` và `novalidate` để tự kiểm tra bằng JS."* (ý này đã chứng minh bằng demo ở phần 5).
2. Phần 4 CSS — mệnh đề sau: *"nên đổi chủ đề chỉ sửa một chỗ"*.
3. Phần 5 — bước *"Lọc — em chọn 'Lưu trữ', chỉ còn cây Ngô."* (trùng ý với bước Thêm/validate).

---

## 1. GIỚI THIỆU — 30 giây (68 từ)

> *[Cảnh: trang web toàn màn hình]*

"Xin chào, em tên **[Tên]**, MSSV **SVxx**, nộp bài giữa kỳ CSE122. Đề tài của em là **CropMate AI** — **SmartAgri**, nền tảng quản lý cây trồng, sâu bệnh và gợi ý canh tác bằng AI cho nông dân, hợp tác xã. Trang em làm là **'Quản lý danh mục cây trồng và sâu bệnh'** cho quản trị viên, để chuẩn hoá dữ liệu nền."

---

## 2. FIGMA — 30 giây (61 từ)

> *[Cảnh: Figma, zoom từng vùng]*

"Đây là bản Figma cho **Desktop**, ba khối: **sidebar** điều hướng bên trái, **header** có tiêu đề, tìm kiếm, thông báo và avatar, và **vùng nội dung** với hai tab, thanh lọc và bảng dữ liệu. Em thiết kế thêm **modal** form hai cột, giai đoạn sinh trưởng là **chip nối mũi tên**, và phương án responsive cho mobile."

---

## 3. SẢN PHẨM — 30 giây (54 từ)

> *[Cảnh: trang web, trỏ chuột lướt từng vùng]*

"Đây là trang web em code từ chính bản Figma đó: vẫn là sidebar xanh lá, header, hai tab, toolbar và bảng dữ liệu; **màu, khoảng cách, font và bo góc** đúng thiết kế. Bảng **render bốn cây trồng từ mảng JavaScript**, không viết cứng trong HTML. Console **không có lỗi đỏ**."

---

## 4. HTML / CSS / JAVASCRIPT — 60 giây (138 từ)

> *[Cảnh: VS Code — `index.html`, `css/style.css`, `js/main.js`]*

**HTML (~20s — 51 từ)**

"Em dùng **semantic HTML** thay vì toàn `div`: `aside.sidebar` chứa `nav` và `footer`; `main` chứa `header` và ba `section`: tab, toolbar, bảng. Riêng bảng để trống, `thead` và `tbody` do JavaScript sinh. Form modal có `label`, `input`, `select` và `novalidate` để tự kiểm tra bằng JS."

> Nhảy tới: `index.html` dòng `17` → `31` → `55` → `65` → `87` → `99` → `133` → `134` → `140` → `148` → `151` → `170`.

**CSS (~20s — 43 từ)**

"CSS tách sang `style.css`. Đầu file khai báo **biến màu trong `:root`** nên đổi chủ đề chỉ sửa một chỗ. Layout dùng **Flexbox**, form modal dùng **Grid** hai cột `1fr 1fr`. Cuối file là **media query** 1100 đến 520 pixel."

> Nhảy tới: `style.css` dòng `6` (`9` `--green-700`) → `39` body flex → `273` grid → `348`/`356`/`363`/`411` media.

**JavaScript (~20s — 44 từ)**

"JavaScript thuần, không thư viện. Dữ liệu là hai mảng `crops` và `pests`; `renderTable()` lấy kết quả từ `getFiltered()` gán vào `innerHTML`, nên **bảng render từ mảng**. Khi submit, em bắt buộc có tên và có đủ giai đoạn sinh trưởng."

> Nhảy tới: `main.js` dòng `9` + `16` mảng → `38` getFiltered → `54` renderTable (`57` innerHTML) → `231` submit → `239`/`255` lỗi → `style.css:283` `.error`.

---

## 5. DEMO TRỰC TIẾP — 30 giây (64 từ lời nói + ~12 giây thao tác)

> *[Cảnh: trang web — vừa làm vừa nói]*

"**Tìm kiếm** — em gõ 'lúa', bảng còn một dòng.
**Lọc** — em chọn 'Lưu trữ', chỉ còn cây Ngô.
**Thêm và validate** — em sang tab Sâu bệnh hại, bấm Thêm, để trống rồi bấm **Lưu** → form báo lỗi đỏ. Em nhập tên và triệu chứng, Lưu → dòng **SB-005** hiện ra kèm thông báo.
Em xin hết, cảm ơn thầy cô."

> Thao tác chậm, mỗi bước ~4 giây. Nếu cháy giờ: bỏ bước 'Lọc trạng thái'.
> GV hỏi sâu khi demo: xem mục 6, mỗi câu có sẵn `(mở ...)` chỉ đúng dòng code.

---

## 6. Câu hỏi GV hay hỏi ngẫu nhiên — trả lời trong 1 câu

1. **"Xóa `e.preventDefault()` thì sao?"** *(main.js:232, 288)* → Trang tải lại theo cách mặc định, mảng JS trở về dữ liệu mẫu và code validate không kịp chạy.
2. **"JS chạy khi nào?"** *(index.html:10-12, main.js:345)* → Script nằm trong `<head>` với `defer` nên chạy sau khi DOM đã đọc xong; dòng cuối file gọi `renderTable()` vẽ lần đầu, các tương tác đăng ký qua `addEventListener`.
3. **"Vì sao bảng không viết sẵn trong HTML?"** *(index.html:134 + main.js:54-109)* → Dữ liệu nằm ở mảng JS và render động, nên tìm/lọc/thêm/sửa chỉ cần gọi lại `renderTable()`.
4. **"`.form-grid` để làm gì?"** *(style.css:273-275)* → Grid hai cột cho form modal; `.full` dùng `grid-column: 1 / -1` để trường dài chiếm trọn hàng.
5. **"Responsive ở đâu?"** *(style.css:344-417)* → `364` body thành cột, `365-379` sidebar thành thanh ngang, `401-402` `overflow-x: auto` + `table { min-width: 720px }` để cuộn ngang thay vì vỡ layout.
6. **"Badge đổi màu thế nào?"** *(main.js:70 + style.css:236-238)* → Khi render em ghép `class="badge ${c.status}"`, CSS có ba rule `.active` / `.archived` / `.disabled`.
7. **"1000 dòng có chậm không?"** *(main.js:57)* → Có, vì `innerHTML` vẽ lại cả bảng; hướng khắc phục là phân trang hoặc virtual scroll, và cần backend thật.
8. **"`editingId` để làm gì?"** *(main.js:25, 188, 260-281)* → `null` là thêm mới (`push`, sinh mã tự tăng), có mã là sửa (`Object.assign` vào bản ghi cũ).
9. **"Điểm chưa hoàn thiện?"** *(main.js:9, 16, 44)* → Chưa có backend nên tải lại trang là về dữ liệu mẫu; chưa phân trang; tìm kiếm mới phủ tên cây và tên giống, chưa tìm sang giai đoạn sinh trưởng.

---

## 7. Dán vào README khi nộp

- **Link video:** *(dán sau khi upload)*
- **Link GitHub:** https://github.com/ducnhatnguyen18-svg/CSE122-BTL-NGUYENDUCNHAT
- **Tên video:** `CSE122-GK-SVxx-TenCuaBan-CropCatalog`
