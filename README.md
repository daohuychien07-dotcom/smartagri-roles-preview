# CSE122 - Bài tập lớn: CropMate AI (SmartAgri)

> Bài kiểm tra giữa kỳ - Học phần Phát triển ứng dụng Web cơ bản (CSE122)

## Tên đề tài

**CropMate AI (SmartAgri)** - Nền tảng hỗ trợ nông nghiệp thông minh: quản lý danh mục cây trồng, sâu bệnh hại và gợi ý canh tác cho Nông dân, HTX.

## Tên trang đã thực hiện

**Quản lý danh mục cây trồng & Sâu bệnh (trang Quản trị hệ thống)** — trang chính theo yêu cầu giữa kỳ.

Hệ thống SmartAgri hiện có **24 file HTML / 19 trang nối mạch** thành một website hoàn chỉnh, gồm **ba khối** dùng chung một cổng đăng nhập và một phiên: 7 trang quản trị ở thư mục gốc + 5 trang **không gian Chuyên gia** (`chuyen-gia/`) + 7 trang **không gian Nông dân** (`nong-dan/`), cùng 3 trang xác thực riêng của khối nông dân.

Sau khi đăng nhập, module **`js/roles.js`** quyết định người dùng đó thấy gì: menu chỉ còn đúng các trang thuộc vai trò, link nội dung ngoài phạm vi bị ẩn, và mở tay một trang bị cấm sẽ tự chuyển về trang nhà của vai trò đó (bảng ở mục "Phân quyền giao diện theo vai trò").

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

**Không gian Nông dân (`nong-dan/`)** — vùng làm việc riêng của vai trò Nông dân (CSS/JS/assets tách riêng, menu 7 mục):

| Trang | File | Vai trò |
|-------|------|---------|
| Tổng quan | `nong-dan/index.html` | Bảng điều khiển mùa vụ: trạng thái lô ruộng, thời tiết, trợ lý AI, hoạt động gần đây, ghi nhật ký nhanh |
| Mùa vụ | `nong-dan/season.html` | Chọn/thêm mùa vụ, các giai đoạn sinh trưởng, kế hoạch canh tác và danh sách lô ruộng |
| Nhật ký | `nong-dan/diary.html` | Form thêm/sửa và danh sách nhật ký đồng ruộng, lưu ở `localStorage` |
| Thời tiết | `nong-dan/weather.html` | Khu vực theo dõi, chỉ số đồng ruộng, dự báo 24 giờ/7 ngày, cảnh báo và khuyến nghị canh tác |
| Trợ lý AI | `nong-dan/ai.html` | Chẩn đoán bệnh qua ảnh, hỏi đáp kỹ thuật, lịch sử chẩn đoán |
| Hỗ trợ kỹ thuật | `nong-dan/support.html` | Gửi yêu cầu hỗ trợ và xem phản hồi từ chuyên gia |
| Cài đặt | `nong-dan/settings.html` | Hồ sơ nông hộ, lô ruộng, thông báo, giao diện, bảo mật, xuất/xoá dữ liệu cá nhân |
| Đăng nhập / Đăng ký / Quên mật khẩu | `nong-dan/login.html`, `register.html`, `forgot-password.html` | 3 trang xác thực riêng của khối; `login.html` có link "Về cổng đăng nhập chung của toàn hệ thống" |

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

### Nối ba khối trang thành một website

- **Menu chung 12 mục** chia 4 nhóm: *Vận hành HTX* (Dashboard) → *Khối HTX* (Nông hộ, Lịch trình, Báo cáo) → *Chuyên gia & AI* (Yêu cầu tư vấn, Nhật ký canh tác, AI Cảnh báo, Thư viện, Quản lý chuyên gia) → *Quản trị hệ thống* (Danh mục, Tài khoản, Cấu hình). Menu được khai báo ở **3 nơi** và đã đối chiếu khớp từng chữ: viết tay trong HTML của 7 trang gốc + `giuaki.html`, mảng `SA_NAV` trong `chuyen-gia/js/shell.js` (dùng cho `alerts/experts/library`), và hai danh sách tĩnh trong `chuyen-gia/consult.html` + `chuyen-gia/journal.html`. Trang đang xem sáng bằng `aria-current="page"` / class `active`, thứ tự và nhãn giống hệt nhau trên cả 12 trang.
- **Một phiên đăng nhập** cho cả ba khối: `login.html` lưu vai trò vào `localStorage['smartagri_role_v1']` dưới dạng `{role, short, initials, scope, at}` — `scope` (`admin` / `coop` / `expert` / `farmer`) là khoá để `js/roles.js` quyết định phạm vi thấy được. Khối gốc đọc trực tiếp; khối Chuyên gia dùng `sessionStorage`, nên 5 trang `chuyen-gia/*.html` có đoạn "cầu nối phiên" trong `<head>`: nếu chưa có `smartagri_auth` mà `localStorage` có vai trò thì sinh phiên Chuyên gia tại chỗ, ngược lại mới đưa về `login.html`. Khối Nông dân cũng đọc cùng khoá `localStorage`, và `nong-dan/js/login.js` (đăng nhập demo trong khối) sau khi xác thực sẽ ghi phiên chung rồi chuyển sang `chuyen-gia/consult.html` nếu là tài khoản `chuyen_gia`, về `nong-dan/index.html` nếu là nông dân. Đăng xuất ở bất kỳ trang nào xóa hết cả ba nơi lưu nên không xem lại được trang cũ.
- **Vai trò Chuyên gia nông nghiệp** ở trang đăng nhập vào thẳng `chuyen-gia/consult.html`; chuông thông báo trên các trang gốc có link "Xem tất cả thông báo" sang `chuyen-gia/alerts.html`, còn mục "Hỗ trợ" trong footer sidebar dẫn sang `chuyen-gia/library.html`.
- **Vai trò Nông dân** ở trang đăng nhập vào thẳng `nong-dan/index.html`. Đã kiểm tra bằng grep: toàn bộ link trong 10 trang khối này chỉ trỏ nội bộ trong `nong-dan/` (cộng thêm link "Về cổng đăng nhập chung" ở `nong-dan/login.html`), nên không phải sửa đường dẫn nào khác.
- **Tách tuyệt đối để không đụng độ**: mỗi khối giữ nguyên CSS/JS riêng — `chuyen-gia/` (`css/style.css`, `css/parts.css`, `js/pages.js`, `js/agrbrain.js`...) và `nong-dan/` (`css/`, `js/`, `assets/` của riêng khối) — nên không ghi đè `css/style.css` hay `js/main.js` của khối gốc. Ba khối đặt class menu theo kiểu khác nhau (`.nav-item`, BEM `.nav__item`, `.side-link`) nên không xung đột kiểu; `js/roles.js` là file dùng chung duy nhất và chỉ thêm/bớt class ẩn.
- **Trợ lý AI AgrBrain** (`chuyen-gia/js/agrbrain.js`) quét dữ liệu của cả 5 trang Chuyên gia để sinh danh sách việc ưu tiên và thông báo trong chuông; mỗi thông báo/link đều trỏ đúng `#` của mục cần xử lý, và biết nhảy sang trang khối gốc — ví dụ hồ sơ đăng ký chờ duyệt dẫn tới `../users.html?status=pending` (đúng trang có sẵn bộ lọc "Đang chờ duyệt").

### Phân quyền giao diện theo vai trò (`js/roles.js`)

Module thuần JS, không thư viện, được nhúng vào `<head>` của **19 trang** (7 trang gốc, 5 trang Chuyên gia, 7 trang Nông dân) và chạy theo đường dẫn trang nên một file dùng được cho cả ba khối:

| Vai trò (`scope`) | Trang nhà sau khi đăng nhập | Số mục menu nhìn thấy | Bị chặn |
|-------------------|-----------------------------|------------------------|---------|
| Quản trị viên (`admin`) | `dashboard.html` | 12 (toàn bộ menu) | `nong-dan/*` (không gian riêng của nông dân) |
| Điều phối HTX (`coop`) | `households.html` | 8 theo 3 nhóm menu | `index.html`, `users.html`, `settings.html`, `chuyen-gia/experts.html`, `nong-dan/*` |
| Chuyên gia (`expert`) | `chuyen-gia/consult.html` | 4 (Yêu cầu tư vấn, Nhật ký, AI Cảnh báo, Thư viện) | 7 trang khối gốc, `chuyen-gia/experts.html`, `nong-dan/*` |
| Nông dân (`farmer`) | `nong-dan/index.html` | 7 (menu riêng của khối) | mọi trang ngoài `nong-dan/` |

Cơ chế:

- **Bảng đăng ký trang theo đường dẫn** (`PATH_KEY`): 19 trang -> một `key`; `dir` lấy từ `location.pathname` nên trang gốc nhận `dashboard.html`, trang chuyên gia nhận `chuyen-gia/consult.html`, và `urlFor()` tự thêm `../` khi cần nhảy chéo khối.
- **Lọc menu**: `filterNav()` với `ITEM_SEL = '.nav-item, .nav__item, .side-link'` — mục không thuộc vai trò bị `display: none !important` + `aria-hidden` và đánh dấu `data-role-hidden` để kiểm tra tự động; nhóm menu (`.nav-group`) bị ẩn nếu còn lại trống.
- **Lọc link trong nội dung**: `filterLinks()` ẩn các link trỏ tới trang ngoài phạm vi (kể cả trong dropdown thông báo, footer sidebar, thẻ vai trò), rồi `pruneEmptyParent()` gỡ `<li>` đã rỗng để không còn dòng trắng. Link `.brand`/`.logo`, `.user-chip` và `.role-card` nằm trong `SKIP` nên không bị ẩn oan.
- **Sửa link dẫn ra ngoài phạm vi**: `fixEntryLinks()` soi `a.brand` (logo sidebar) và `a.user-chip` (tên người dùng ở header) — nếu href trỏ tới trang ngoài phạm vi vai trò thì đổi về trang nhà của vai trò đó, kèm `title` "Về trang của ...". Nhờ vậy Nông dân bấm logo không bị đưa sang trang quản trị rồi mới bị chặn.
- **Chặn truy cập tay**: `guardPage()` chạy sớm trong `<head>` — chưa có phiên → `login.html`; có phiên nhưng trang ngoài phạm vi → `location.replace(urlFor(ROLE_HOME[scope]))`. Dùng `replace` để nút Back không quay lại trang bị cấm.
- **Menu sinh bằng JavaScript**: sidebar của khối Chuyên gia do `chuyen-gia/js/shell.js` vẽ sau khi tải xong, nên module gắn `MutationObserver` để lọc tiếp các node thêm mới.
- **Chống timing bất định**: `apply()` chạy đồng bộ và có `parsed` (`readyState !== 'loading'`) chắn phần ẩn nhóm menu, vì `requestAnimationFrame` bị trình duyệt tắt khi tab chạy nền — dùng bộ lọc đồng bộ thì menu ẩn ngay cả khi tab nền.
- **Phiên cũ vẫn dùng được**: nếu `localStorage` thiếu `scope` (phiên lưu trước khi có phân quyền), `keyOfRole()` suy vai trò bằng cách bỏ dấu tiếng Việt rồi khớp từ khoá (`quan tri`→admin, `chuyen gia`→expert, `hop tac xa`/`ieu phoi`→coop, còn lại farmer).
- **Gỡ vướng đăng xuất**: `wireSharedLogout()` gắn lại nút "Đăng xuất" trong khối nông dân (vốn chỉ xoá dữ liệu cục bộ) để xoá cả phiên chung và về `login.html`.
- **Hỗ trợ kiểm thử**: `window.SA_ROLES` công khai `{role, label, block, menu, signedIn}` cùng các hàm `allow(key)`, `keyOfHref(href)`, `urlFor(key)`, `home()`, `apply()` để gọi từ Console khi cần đối chiếu; `document.documentElement.dataset.role` gắn nhãn vai trò lên `<html>` (kiểm nhanh bằng DevTools), còn mỗi phần tử bị ẩn mang `data-role-hidden` nên đếm được bằng `querySelectorAll('[data-role-hidden]').length`.

> 5 trang trong `chuyen-gia/` và 10 trang trong `nong-dan/` do thành viên nhóm viết (repo `cse122-cropmate-ai`; khối nông dân lấy từ nhánh `season-dashboard`), được chép nguyên vào thư mục con rồi nối phiên và phân quyền; 7 trang ở thư mục gốc cùng `login.html`, `js/roles.js` và phần liên kết là code cá nhân.

## Công nghệ sử dụng



- **HTML5**: semantic HTML (`header`, `nav`, `main`, `section`, `aside`, `footer`, `form`, `label`, `table`...).
- **CSS3**: Flexbox, CSS Grid (form 2 cột), biến màu CSS, hiệu ứng `hover`, `transition`, **Media Query responsive** (desktop / tablet / mobile).
- **JavaScript (thuần - Vanilla JS)**: DOM, `addEventListener`, render dữ liệu từ mảng, validate form, `localStorage`/`sessionStorage` cho phiên + dữ liệu, `MutationObserver` lọc menu do JS vẽ, `data-*` attributes, `location.replace`, `Blob` + `URL.createObjectURL` khi xuất CSV, không dùng thư viện hay framework.

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
│   ├── roles.js        # PHÂN QUYỀN GIAO DIỆN THEO VAI TRÒ: lọc menu + ẩn link + chặn trang (dùng chung 3 khối)
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
├── nong-dan/               # Không gian Nông dân (CSS/JS/assets riêng, 10 trang)
│   ├── index.html          # Bảng điều khiển mùa vụ (trang nhà của vai trò Nông dân)
│   ├── season.html         # Mùa vụ: giai đoạn sinh trưởng, kế hoạch canh tác, lô ruộng
│   ├── diary.html          # Nhật ký đồng ruộng
│   ├── weather.html        # Thời tiết nông nghiệp + khuyến nghị canh tác
│   ├── ai.html             # Trợ lý AI: chẩn đoán qua ảnh, hỏi đáp kỹ thuật
│   ├── support.html        # Yêu cầu hỗ trợ kỹ thuật & phản hồi chuyên gia
│   ├── settings.html       # Cài đặt: hồ sơ nông hộ, lô ruộng, thông báo, bảo mật, dữ liệu
│   ├── login.html          # Đăng nhập demo nông dân (nongdan/123456) + link về cổng chung
│   ├── register.html       # Đăng ký tài khoản nông dân
│   ├── forgot-password.html# Quên mật khẩu
│   ├── css/                # style/layout/ui + 9 css theo trang (ai, diary, season...)
│   ├── js/
│   │   ├── main.js         # Khung sidebar/topbar và tiện ích dùng chung của khối
│   │   ├── display.js      # Đọc dữ liệu localStorage để hiển thị
│   │   ├── login.js        # Đăng nhập demo + ghi phiên chung smartagri_role_v1
│   │   └── season.js / diary.js / weather.js / ai.js / support.js / settings.js ...
│   ├── assets/             # logo.svg, favicon.svg, avatar-farmer.png, hero-rice.png...
│   ├── README.md           # Ghi chú của thành viên viết khối này
│   └── youtobe             # File ghi link video + trang demo của thành viên
├── THUYET_TRINH_GIUKI.md   # Kịch bản thuyết trình video 3 phút
├── MA_CODE_THUYET_TRINH.md # Bản đồ mã nguồn: mỗi câu thuyết trình → file + số dòng
├── TRALOI_KIEM_TRA_GIUA_KI.md # Bài làm đề trên lớp (3 câu: HTML / CSS / JS)
└── README.md
```

## Cách chạy

Mở trực tiếp `login.html` (cổng đăng nhập chung, trang đầu tiên) rồi chọn một trong 4 vai trò; mỗi vai trò vào đúng không gian của mình và **chỉ thấy menu của mình**: **Quản trị viên** → `dashboard.html` (12 mục), **Điều phối Hợp tác xã** → `households.html` (8 mục), **Chuyên gia nông nghiệp** → `chuyen-gia/consult.html` (4 mục), **Nông dân** → `nong-dan/index.html` (7 mục). Nút **Đăng xuất** ở bất kỳ trang nào xóa phiên và đưa về `login.html`.

19 trang được `js/roles.js` phân quyền: 7 trang gốc (`index.html`, `dashboard.html`, `households.html`, `schedule.html`, `reports.html`, `users.html`, `settings.html`); 5 trang Chuyên gia (`chuyen-gia/consult.html`, `journal.html`, `alerts.html`, `library.html`, `experts.html`); 7 trang Nông dân (`nong-dan/index.html`, `season.html`, `diary.html`, `weather.html`, `ai.html`, `support.html`, `settings.html`). Ngoài ra còn cổng đăng nhập `login.html`, `giuaki.html` (bản 1 file tự chứa để nộp giữa kỳ) và 3 trang xác thực của khối nông dân (`nong-dan/login.html` với tài khoản demo `nongdan` / `123456`, `register.html`, `forgot-password.html`) — tổng 24 file HTML.

Mở tay một trang khi chưa đăng nhập → về `login.html`. Mở tay một trang **ngoài phạm vi vai trò** → tự chuyển về trang nhà của vai trò đó (dùng `location.replace` nên nút Back không quay lại được); ví dụ Chuyên gia mở `dashboard.html` sẽ sang `chuyen-gia/consult.html`, Nông dân mở `chuyen-gia/consult.html` sẽ sang `nong-dan/index.html`.

Chạy bằng cách mở file `.html` trực tiếp vẫn hoạt động, nhưng để ổn định nhất (đường dẫn chéo khối, `localStorage` theo origin) nên chạy qua máy chủ tĩnh tại chỗ: `python -m http.server 8000` rồi mở `http://localhost:8000/login.html`. Python chỉ dùng để xem thử, không phải một phần của bài nộp.

## Kết quả kiểm thử phân quyền

Kiểm bằng cách nạp từng trang trong iframe cùng origin qua `http://127.0.0.1:8123` rồi đếm mục menu nhìn thấy theo computed style (`display/visibility/opacity` của cả chuỗi phần tử cha):

| Vai trò | Số trang đã chạy | Kết quả |
|---------|------------------|---------|
| Quản trị viên | 7 trang gốc | 12/12 mục trên mọi trang, 0 phần tử bị ẩn, không trang nào chuyển hướng |
| Điều phối HTX | 2 trang gốc + 4 trang Chuyên gia | 8 mục + 3 nhãn nhóm, 7 liên kết ngoài phạm vi bị ẩn; mở `chuyen-gia/experts.html` → `households.html` |
| Chuyên gia | 4 trang Chuyên gia | 4 mục, 26 phần tử bị ẩn; mở `dashboard.html` → `chuyen-gia/consult.html` |
| Nông dân | 7 trang Nông dân | 7 mục trên mọi trang, 0 tràn ngang; mở `chuyen-gia/consult.html` → `nong-dan/index.html` |
| Chưa đăng nhập | trang bất kỳ | về `login.html` |

Thêm các ca đã kiểm: Quản trị viên mở `nong-dan/*` → `dashboard.html`; Điều phối HTX mở `nong-dan/weather.html` → `households.html`; phiên cũ không có `scope` vẫn suy ra đúng vai trò; đăng nhập demo `nongdan/123456` ghi phiên chung rồi vào bảng điều khiển mùa vụ; bấm **Đăng xuất** trong khối nông dân xóa `smartagri_role_v1` và về cổng chung. Console sạch (không lỗi JS, không thiếu file CSS/JS/ảnh) trên cả 24 file HTML, và `scrollWidth - clientWidth = 0` ở bề rộng 1280 trên mọi trang đã nạp.

## Responsive

- **Desktop**: sidebar cố định bên trái, form modal 2 cột (theo thiết kế).
- **Tablet (<= 900px)**: form modal về 1 cột.
- **Mobile (<= 768px)**: sidebar chuyển thành thanh menu ngang phía trên, bảng dữ liệu cuộn ngang thay vì vỡ layout, nút "Thêm" tràn full-width.
- **Hai khối mình viết/gộp (gốc + Chuyên gia)** đều được đo ở bề rộng 336px: 12/12 trang không tràn ngang (`scrollWidth - clientWidth = 0`). Lịch mùa vụ (`schedule.html`) giữ tối thiểu 700px nhưng cuộn ngang trong khung nhờ `.sc-layout { grid-template-columns: minmax(0, 1fr) }`; nút hành động trên thẻ tài nguyên (`chuyen-gia/css/parts.css`) cho xuống dòng; nhãn trục ngang biểu đồ báo cáo rút font và cho phép cắt chữ.
- **Khối Nông dân** giữ nguyên responsive của thành viên (sidebar `nong-dan/css/layout.css` tự đổi layout theo `@media`); mình chỉ nạp thêm `js/roles.js` nên không ảnh hưởng đến kiểu. Đã đo lại ở 1280px: 7/7 trang không tràn ngang, menu vẫn đủ 7 mục.

## Link liên quan

- **Link Canva**: (https://canva.link/j66tusfj3cbdckv)
- **Link video**: (https://youtu.be/SiAEbIB4Tos?si=pGBaoD4mPdswX8P5)
- **Link GitHub**: https://github.com/ducnhatnguyen18-svg/CSE122-BTL-NGUYENDUCNHAT
- **Repo nhóm (được thêm là remote `team`)**: https://github.com/ducnhatnguyen18-svg/cse122-cropmate-ai — khối `chuyen-gia/` và `nong-dan/` lấy từ repo này (nhánh `smartagri` và `season-dashboard`); bản gộp của mình đẩy lên nhánh `smartagri`, không đụng tới `main` của repo nhóm.
- **Link chạy thử online (GitHub Pages)**: https://ducnhatnguyen18-svg.github.io/CSE122-BTL-NGUYENDUCNHAT/login.html — mở là vào cổng đăng nhập chung, chọn vai trò là dùng được 19 trang theo đúng phạm vi vai trò, không cần tải code về.

## Ghi chú

Dữ liệu trong trang là dữ liệu mẫu lưu ở mảng JavaScript (`crops`, `pests` trong `js/main.js`), chưa kết nối backend/database. Khi tải lại trang, dữ liệu thêm/sửa sẽ về mặc định.
