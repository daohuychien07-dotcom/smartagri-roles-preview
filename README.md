# CSE122 - Bài tập lớn: CropMate AI (SmartAgri)

> Bài kiểm tra giữa kỳ - Học phần Phát triển ứng dụng Web cơ bản (CSE122)

## Tên đề tài

**CropMate AI (SmartAgri)** - Nền tảng hỗ trợ nông nghiệp thông minh: quản lý danh mục cây trồng, sâu bệnh hại và gợi ý canh tác cho Nông dân, HTX.

## Tên trang đã thực hiện

**Quản lý danh mục cây trồng & Sâu bệnh (trang Quản trị hệ thống)** — trang chính theo yêu cầu giữa kỳ.

Hệ thống SmartAgri hiện có **12 trang** nối thành một website hoàn chỉnh: 7 trang quản trị ở thư mục gốc + 5 trang trong **không gian Chuyên gia** (`chuyen-gia/`), tất cả dùng chung một menu sidebar 12 mục và cùng một phiên đăng nhập.

**Khối quản trị (thư mục gốc)** — sidebar/header và bộ biến màu dùng chung:

| Trang | File | Vai trò |
|-------|------|---------|
| Đăng nhập | `login.html` | Trang đầu tiên: chọn vai trò (Chuyên gia, Điều phối HTX, Nông dân, Quản trị viên) + form đăng ký có validate |
| Dashboard | `dashboard.html` | Bảng điều khiển tổng quan: thẻ thống kê, biểu đồ người dùng active, nhật ký hoạt động |
| Tổng quan nông hộ | `households.html` | **Trang chính của Điều phối HTX**: lưới thẻ/bảng 6 nông hộ, chỉ số toàn HTX, lọc theo khu vực - giống - trạng thái sức khỏe, gửi thông báo riêng |
| Lịch trình mùa vụ | `schedule.html` | Lịch tập trung 3 chế độ (Tháng / Tuần / Giai đoạn), thêm sự kiện nhanh, bộ lọc loại + khu vực, **AI-2 sinh checklist mùa vụ** có tiến trình và áp dụng cho toàn HTX |
| Báo cáo tổng kết | `reports.html` | Tổng kết theo mùa vụ: 3 chỉ số, biểu đồ năng suất so với chỉ tiêu, bảng so sánh nông hộ sắp xếp được, xuất PDF/CSV, **đóng & lưu trữ mùa vụ** |
| Danh mục cây trồng | `index.html` | **Trang chính** - quản lý danh mục cây trồng & sâu bệnh hại |
| Tài khoản người dùng | `users.html` | Quản lý tài khoản: lọc, khóa/mở khóa, duyệt, đổi vai trò, phân trang |
| Cấu hình hệ thống | `settings.html` | Cấu hình vận hành: chung, AI, thông báo, bảo mật, dữ liệu & sao lưu |

**Không gian Chuyên gia (`chuyen-gia/`)** — vùng làm việc riêng của vai trò Chuyên gia nông nghiệp:

| Trang | File | Vai trò |
|-------|------|---------|
| Yêu cầu hỗ trợ & Tư vấn | `chuyen-gia/consult.html` | Hàng đợi yêu cầu của nông hộ, soạn lời khuyên, gán mức ưu tiên |
| Nhật ký canh tác | `chuyen-gia/journal.html` | Nhật ký đồng ruộng theo hộ, thêm/bọc sự kiện canh tác, ảnh hiện trường |
| AI Cảnh báo & Dự báo | `chuyen-gia/alerts.html` | Cảnh báo sâu bệnh và dự báo theo khu vực do AgrBrain sinh từ dữ liệu |
| Thư viện tài nguyên | `chuyen-gia/library.html` | Kho quy trình, tài liệu, video; duyệt/xóa hồ sơ chờ |
| Quản lý chuyên gia | `chuyen-gia/experts.html` | Danh sách chuyên gia, phân công yêu cầu, trạng thái làm việc |

## Mục đích của trang

Trang dành cho **Quản trị viên hệ thống**. Dùng để thiết lập và chuẩn hóa dữ liệu nền tảng (danh mục cây trồng, giống cây, chu kỳ sinh trưởng, giai đoạn sinh trưởng, danh mục sâu bệnh hại) làm căn cứ cho bộ lọc của Nông dân/HTX và cho gợi ý của AI trong hệ thống CropMate AI.

## Các chức năng chính

- **Chuyển tab** giữa *Danh mục Cây trồng* và *Danh mục Sâu bệnh hại*.
- **Tìm kiếm** theo tên cây trồng, tên giống, tên sâu bệnh hoặc triệu chứng (tìm trực tiếp khi gõ).
- **Lọc dữ liệu** theo nhóm cây trồng và theo trạng thái (Đang hoạt động / Lưu trữ / Vô hiệu hóa), nút **Làm mới** để xóa bộ lọc.
- **Render dữ liệu từ mảng JavaScript** ra bảng (dữ liệu cây trồng và sâu bệnh lưu trong hai mảng `crops`, `pests`).
- **Mở/đóng Modal** thêm mới hoặc chỉnh sửa cây trồng / sâu bệnh.
- **Form Validation** bằng JavaScript: bắt buộc nhập tên, chu kỳ sinh trưởng (không âm, "từ" không lớn hơn "đến"), bắt buộc có ít nhất một giai đoạn sinh trưởng.
- **Thêm / sửa dữ liệu**: thêm cây trồng, sâu bệnh mới; chỉnh sửa qua nút "Sửa".
- **Thay đổi trạng thái**: Lưu trữ / Vô hiệu hóa / Khôi phục, hiển thị bằng badge màu.
- **Thêm / xóa các giai đoạn sinh trưởng** dạng chip nối mũi tên trong form.
- **Toggle** thu gọn sidebar (nút hamburger).
- **Thông báo toast** khi thao tác thành công.

### Chức năng ở các trang mở rộng

- **`login.html`**: 4 thẻ vai trò là link thật (`<a>`) — JavaScript chặn lại để lưu vai trò vào `localStorage`, hiện trạng thái "đang đăng nhập" rồi chuyển vào hệ thống; modal **Đăng ký/ Tạo tài khoản** có validate (tên ≥ 3 ký tự, regex email, số điện thoại 10 chữ số, mật khẩu ≥ 6 và nhập lại khớp, bắt buộc đồng ý điều khoản).
- **Luồng đăng ký → trang Tài khoản người dùng** (`js/store.js`): hồ sơ hợp lệ được ghi vào `localStorage['smartagri_registrations_v1']`; `users.html` đọc và chèn lên đầu danh sách với trạng thái *Đang chờ duyệt* + nhãn "Mới đăng ký" (kèm khu vực canh tác). Khi Admin Duyệt / Khóa / Đổi vai trò, thay đổi ghi ngược vào kho nên tải lại trang vẫn còn. `dashboard.html` đọc cùng kho để tăng số "Tài khoản chờ duyệt" và thêm dòng vào nhật ký hoạt động.
- **`session.js`**: mọi trang quản trị đọc vai trò đã chọn để hiển thị tên + avatar ở header; nút Đăng xuất xóa phiên và trở về `login.html`.
- **`notifications.js`**: chuông thông báo mở dropdown, đánh dấu đã đọc, cập nhật badge (dùng chung mọi trang quản trị).

### Chức năng ở 3 trang theo thiết kế HTX (mockup Canva)

- **`households.html`**: 4 thẻ chỉ số (45 hộ / 120 ha / tỷ lệ an toàn / 3 sự cố - số sự cố tính từ dữ liệu thật), chuyển **Bảng ↔ Thẻ**, tìm kiếm không phân biệt hoa thường, chip lọc *giống cây* và *trạng thái sức khỏe* kết hợp AND với dropdown khu vực,thanh tiến độ giai đoạn sinh trưởng, modal "Gửi thông báo riêng" có validate, deep link `?health=alert` / `?q=tên hộ`.
- **`schedule.html`**: lịch tháng 42 ô + chế độ tuần + sơ đồ giai đoạn mùa vụ, điều hướng trước/sau/hôm nay, thêm sự kiện thủ công, bấm sự kiện để đánh dấu đã xong, bộ lọc *loại sự kiện* + *khu vực* hiện thành chip bỏ được, **AI-2**: kiểm tra giống cây có thuộc danh mục chuẩn (`js/catalog.js`) → mô phỏng bất đồng bộ có % tiến trình → đề xuất mốc lịch theo đúng số ngày chu kỳ và sâu bệnh của cây → "Áp dụng cho toàn HTX" đẩy mốc lịch thành sự kiện thật; có skeleton lúc tải và empty state.
- **`reports.html`**: chọn mùa vụ (đã kết thúc / đang diễn ra), 3 chỉ số sản lượng - chi phí - doanh thu theo định dạng số Việt Nam, **biểu đồ cột năng suất thuần CSS** kèm đường chỉ tiêu nét đứt, dải tóm tắt tự tính % đạt chỉ tiêu, bảng so sánh nông hộ **sắp xếp theo cột** (kèm `aria-sort` và dòng tổng kết), tên hộ là link sang `households.html?q=...`, xuất **PDF** (hộp thoại in, có `@media print`) và **Excel/CSV** (`Blob` + BOM để không lỗi tiếng Việt), panel **Đóng & Lưu trữ mùa vụ** với modal xác nhận phải tick ô cam kết, trạng thái khóa ghi `localStorage` nên tải lại vẫn còn.
- **`js/catalog.js`**: danh mục cây trồng / sâu bệnh / khu vực dùng chung cho 3 trang mới, đồng bộ với dữ liệu ở `js/main.js` để AI và bộ lọc không tự đặt tên giống cây.

### Nối hai khối trang thành một website

- **Menu chung 12 mục** chia 4 nhóm: *Vận hành HTX* (Dashboard) → *Khối HTX* (Nông hộ, Lịch trình, Báo cáo) → *Chuyên gia & AI* (Yêu cầu tư vấn, Nhật ký canh tác, AI Cảnh báo, Thư viện, Quản lý chuyên gia) → *Quản trị hệ thống* (Danh mục, Tài khoản, Cấu hình). Menu được khai báo ở **3 nơi** và đã đối chiếu khớp từng chữ: viết tay trong HTML của 7 trang gốc + `giuaki.html`, mảng `SA_NAV` trong `chuyen-gia/js/shell.js` (dùng cho `alerts/experts/library`), và hai danh sách tĩnh trong `chuyen-gia/consult.html` + `chuyen-gia/journal.html`. Trang đang xem sáng bằng `aria-current="page"` / class `active`, thứ tự và nhãn giống hệt nhau trên cả 12 trang.
- **Một phiên đăng nhập**: `login.html` lưu vai trò vào `localStorage['smartagri_role_v1']`. Khối gốc đọc trực tiếp; khối Chuyên gia dùng `sessionStorage`, nên 5 trang `chuyen-gia/*.html` có đoạn "cầu nối phiên" trong `<head>`: nếu chưa có `smartagri_auth` mà `localStorage` có vai trò thì sinh phiên Chuyên gia tại chỗ, ngược lại mới đưa về `login.html`. Đăng xuất ở bất kỳ trang nào xóa cả hai nơi nên không xem lại được trang cũ.
- **Vai trò Chuyên gia nông nghiệp** ở trang đăng nhập vào thẳng `chuyen-gia/consult.html`; chuông thông báo trên các trang gốc có link "Xem tất cả thông báo" sang `chuyen-gia/alerts.html`, còn mục "Hỗ trợ" trong footer sidebar dẫn sang `chuyen-gia/library.html`.
- **Tách tuyệt đối để không đụng độ**: `chuyen-gia/` giữ nguyên CSS/JS riêng (`css/style.css`, `css/parts.css`, `js/pages.js`, `js/agrbrain.js`...) nên không ghi đè `css/style.css` hay `js/main.js` của khối gốc. Hai khối dùng cách đặt class khác nhau (BEM `.nav__item` và `.nav-item`) nên không xung đột kiểu.
- **Trợ lý AI AgrBrain** (`chuyen-gia/js/agrbrain.js`) quét dữ liệu của cả 5 trang Chuyên gia để sinh danh sách việc ưu tiên và thông báo trong chuông; mỗi thông báo/link đều trỏ đúng `#` của mục cần xử lý, và biết nhảy sang trang khối gốc — ví dụ hồ sơ đăng ký chờ duyệt dẫn tới `../users.html?status=pending` (đúng trang có sẵn bộ lọc "Đang chờ duyệt").

> 5 trang trong `chuyen-gia/` do thành viên nhóm viết (repo `cse122-cropmate-ai`, nhánh `smartagri`), được chép nguyên vào thư mục con rồi sửa đường dẫn và nối phiên; 7 trang ở thư mục gốc là phần code cá nhân nộp giữa kỳ.

## Công nghệ sử dụng



- **HTML5**: semantic HTML (`header`, `nav`, `main`, `section`, `aside`, `footer`, `form`, `label`, `table`...).
- **CSS3**: Flexbox, CSS Grid (form 2 cột), biến màu CSS, hiệu ứng `hover`, `transition`, **Media Query responsive** (desktop / tablet / mobile).
- **JavaScript (thuần - Vanilla JS)**: DOM, `addEventListener`, render dữ liệu từ mảng, validate form, không dùng thư viện hay framework.

Không sử dụng backend, framework hay thư viện ngoài (theo đúng phạm vi kiểm tra giữa kỳ).

## Cấu trúc thư mục

```
project/
├── index.html          # Trang chính: Quản lý danh mục cây trồng & Sâu bệnh
├── login.html          # Đăng nhập chọn vai trò + form đăng ký
├── dashboard.html      # Bảng điều khiển tổng quan
├── households.html     # Tổng quan nông hộ (lưới thẻ / bảng, gửi thông báo riêng)
├── schedule.html       # Lịch trình mùa vụ tập trung + AI sinh checklist
├── reports.html        # Báo cáo tổng kết mùa vụ + đóng & lưu trữ
├── users.html          # Quản lý tài khoản người dùng
├── settings.html       # Cấu hình hệ thống
├── giuaki.html         # Bản 1 file tự chứa của trang danh mục (HTML+CSS+JS inline, menu đủ 12 mục, để nộp giữa kỳ)
├── css/
│   ├── style.css       # Nền: sidebar/header/table/modal/toast + responsive (dùng chung)
│   ├── login.css       # Style riêng cho trang đăng nhập (hero, lưới thẻ vai trò)
│   ├── dashboard.css   # Style riêng cho dashboard (stat card, biểu đồ, nhật ký)
│   ├── households.css  # Style riêng cho tổng quan nông hộ (thẻ, chip lọc, tiến độ)
│   ├── schedule.css    # Style riêng cho lịch trình (lịch, sự kiện, skeleton, panel AI)
│   ├── reports.css     # Style riêng cho báo cáo (biểu đồ CSS, bảng, modal, @media print)
│   ├── users.css       # Style riêng cho trang tài khoản (badge vai trò, skeleton...)
│   ├── settings.css    # Style riêng cho cấu hình (tab dọc, toggle switch...)
│   └── notifications.css  # Chuông thông báo (dùng chung)
├── js/
│   ├── main.js         # Logic trang danh mục
│   ├── login.js        # Chọn vai trò, modal đăng ký, validate form
│   ├── store.js        # Kho hồ sơ đăng ký (localStorage) dùng chung login/users/dashboard
│   ├── catalog.js      # Danh mục cây trồng / sâu bệnh / khu vực dùng chung 3 trang HTX
│   ├── session.js      # Đọc vai trò đã đăng nhập + nút Đăng xuất (dùng chung)
│   ├── dashboard.js    # Logic dashboard (biểu đồ, toggle ngày/tuần)
│   ├── households.js   # Logic nông hộ (lọc, chuyển view, modal thông báo, deep link)
│   ├── schedule.js     # Logic lịch (3 chế độ xem, sự kiện, AI checklist có tiến trình)
│   ├── reports.js      # Logic báo cáo (biểu đồ, sắp bảng, xuất PDF/CSV, lưu trữ vụ)
│   ├── users.js        # Logic tài khoản (lọc, khóa/duyệt, phân trang)
│   ├── settings.js     # Logic cấu hình (tab, lưu localStorage, reset)
│   └── notifications.js   # Dropdown thông báo (dùng chung)
├── assets/
│   ├── mockup-desktop.png  # Ảnh thiết kế tham khảo (desktop)
│   ├── login-hero.svg      # Ảnh minh họa cánh đồng + drone (trang đăng nhập)
│   └── role-*.svg          # 4 minh họa vai trò: expert, coop, farmer, admin
├── chuyen-gia/             # Không gian Chuyên gia (CSS/JS/assets riêng)
│   ├── consult.html        # Yêu cầu hỗ trợ & Tư vấn
│   ├── journal.html        # Nhật ký canh tác
│   ├── alerts.html         # AI Cảnh báo & Dự báo
│   ├── library.html        # Thư viện tài nguyên
│   ├── experts.html        # Quản lý chuyên gia
│   ├── css/                # style.css (nền + shell), parts.css (block riêng), journal.css
│   ├── js/
│   │   ├── shell.js        # Mảng SA_NAV 12 mục + khung sidebar/topbar/modal
│   │   ├── agrbrain.js     # Trợ lý AI: quét dữ liệu 5 trang, sinh việc + thông báo
│   │   ├── pages.js        # Logic alerts / experts / library
│   │   ├── journal.js      # Logic nhật ký canh tác
│   │   └── main.js         # tiện ích dùng chung của khối Chuyên gia
│   └── assets/             # logo, ảnh minh họa, thumbnail tài liệu
├── THUYET_TRINH_GIUKI.md   # Kịch bản thuyết trình video 3 phút
├── MA_CODE_THUYET_TRINH.md # Bản đồ mã nguồn: mỗi câu thuyết trình → file + số dòng
├── TRALOI_KIEM_TRA_GIUA_KI.md # Bài làm đề trên lớp (3 câu: HTML / CSS / JS)
└── README.md
```

## Cách chạy

Mở trực tiếp `login.html` (trang đầu tiên) rồi chọn một vai trò, hoặc mở bất kỳ file nào trong 12 trang: `index.html` / `dashboard.html` / `households.html` / `schedule.html` / `reports.html` / `users.html` / `settings.html` / `chuyen-gia/consult.html` / `chuyen-gia/journal.html` / `chuyen-gia/alerts.html` / `chuyen-gia/library.html` / `chuyen-gia/experts.html` bằng trình duyệt (Chrome, Edge...). Toàn bộ menu sidebar nối kín giữa hai khối nên đi được từ trang gốc sang trang Chuyên gia và ngược lại; vai trò **Điều phối Hợp tác xã** vào thẳng `households.html`, vai trò **Chuyên gia nông nghiệp** vào thẳng `chuyen-gia/consult.html`, nút **Đăng xuất** đưa trở lại `login.html`. Không cần cài đặt hay chạy lệnh gì thêm.

Mở tay một trang `chuyen-gia/*.html` khi chưa từng đăng nhập sẽ được đưa về `login.html` (trang nào cũng có đoạn kiểm tra phiên trong `<head>`); chỉ cần chọn vai trò ở trang đăng nhập là vào được.

## Responsive

- **Desktop**: sidebar cố định bên trái, form modal 2 cột (theo thiết kế).
- **Tablet (<= 900px)**: form modal về 1 cột.
- **Mobile (<= 768px)**: sidebar chuyển thành thanh menu ngang phía trên, bảng dữ liệu cuộn ngang thay vì vỡ layout, nút "Thêm" tràn full-width.
- **Cả hai khối** đều được đo ở bề rộng 336px: 12/12 trang không tràn ngang (`scrollWidth - clientWidth = 0`). Lịch mùa vụ (`schedule.html`) giữ tối thiểu 700px nhưng cuộn ngang trong khung nhờ `.sc-layout { grid-template-columns: minmax(0, 1fr) }`; nút hành động trên thẻ tài nguyên (`chuyen-gia/css/parts.css`) cho xuống dòng; nhãn trục ngang biểu đồ báo cáo rút font và cho phép cắt chữ.

## Link liên quan

- **Link Canva**: (https://canva.link/j66tusfj3cbdckv)
- **Link video**: (https://youtu.be/SiAEbIB4Tos?si=pGBaoD4mPdswX8P5)
- **Link GitHub**: https://github.com/ducnhatnguyen18-svg/CSE122-BTL-NGUYENDUCNHAT
- **Link chạy thử online (GitHub Pages)**: https://ducnhatnguyen18-svg.github.io/CSE122-BTL-NGUYENDUCNHAT/login.html — mở là vào trang đăng nhập, chọn vai trò là dùng được cả 12 trang, không cần tải code về.

## Ghi chú

Dữ liệu trong trang là dữ liệu mẫu lưu ở mảng JavaScript (`crops`, `pests` trong `js/main.js`), chưa kết nối backend/database. Khi tải lại trang, dữ liệu thêm/sửa sẽ về mặc định.
