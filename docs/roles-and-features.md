# Vai trò & Tính năng — CropMate AI (SmartAgri)

Bốn vai trò, hai mươi ba màn hình. Tài liệu này mô tả **chức năng đã có trong mã**, kèm tên tệp để giảng viên mở đối chiếu. Bảng phân bổ màn hình đầy đủ: [`docs/screen-inventory.md`](screen-inventory.md).

---

## 1. Nông dân (`nong-dan/` — SV1)

**Mục tiêu:** biết mỗi ngày phải làm gì, ghi lại được diễn biến, hỏi được chuyên gia.

| Màn hình | Tệp | Làm được gì (đã code) |
|---|---|---|
| Season Dashboard | `nong-dan/index.html` | Hero tiến độ vụ + ngày thu hoạch dự kiến, thẻ thời tiết, **thẻ AI chẩn đoán** (chọn ảnh → "Đang phân tích…" → kết quả + độ tin cậy 82–96 % + khuyến nghị + disclaimer), bảng hoạt động gần đây có tìm kiếm + lọc, hai modal "Ghi nhanh" và "Hỏi chuyên gia", `Esc` đóng modal |
| Mùa vụ | `nong-dan/season.html` | Tạo/sửa/đóng mùa vụ (lưu `smartagri.seasons.v1`), đổi giai đoạn sinh trưởng, xem chi tiết thửa ruộng |
| Nhật ký | `nong-dan/diary.html` | C/R/U/D mẩu nhật ký, đính ảnh (giữ trong phiên), **nút "Chẩn đoán bằng AI"** gắn kết quả vào mô tả và xác nhận/chỉnh sửa, lọc theo loại hoạt động, trạng thái `pending` |
| Thời tiết | `nong-dan/weather.html` | Chọn khu vực (lưu `smartagri.weather.region.v1`), dự báo 7 ngày, **khuyến nghị theo luật** có kèm lý do ("Gió 18 km/h → thuốc bay trôi…"), danh sách cảnh báo + trạng thái rỗng `#alertEmpty` |
| Trợ lý AI | `nong-dan/ai.html` | kéo–thả/Chọn ảnh → phân loại (`classify()` + `hashOf()` để cùng một ảnh luôn cho cùng kết quả), độ tin cậy 72–97 %, giải thích + phác đồ xử lý, **nút Chấp nhận/Sửa/Từ chối**, lịch sử 20 lần (`smartagri.ai.history.v1`), khung chat hỏi đáp (`smartagri.ai.chat.v1`) với câu trả lời "chưa chắc chắn" → gợi ý gửi chuyên gia |
| Yêu cầu hỗ trợ | `nong-dan/support.html` | Gửi yêu cầu (C), sửa khi còn `wait` (U), rút (A), danh sách pill trạng thái `wait / advised / more / closed` |
| Cài đặt | `nong-dan/settings.html` | 3 biểu mẫu hồ sơ/cài đặt + kiểm tra hợp lệ, bật/tắt thông báo, "Xóa toàn bộ dữ liệu trình duyệt" (`removeItem` các khóa `smartagri.*`, có xác nhận không thể hoàn tác) |
| Đăng nhập / Đăng ký / Quên mật khẩu | `nong-dan/login.html`, `register.html`, `forgot-password.html` | Form + validate, tài khoản demo lưu `smartagri_accounts`; nút **"Về cổng đăng nhập chung"** trỏ `../login.html` |

## 2. Chuyên gia nông nghiệp (`chuyen-gia/` — SV2)

**Mục tiêu:** nhận đủ bối cảnh trước khi tư vấn, duyệt kết quả AI thay vì tin blindly. Cả 5 màn hình dưới đây đều nằm trong menu của vai trò **Chuyên gia** sau khi `js/roles.js` lọc (đo lại 26-10-2026 — trước đó `experts.html` bị sót ngoài menu, xem mục 4 lỗi 15 của [`ai-usage-report.md`](ai-usage-report.md)).

| Màn hình | Tệp | Làm được gì (đã code) |
|---|---|---|
| Yêu cầu & tư vấn | `chuyen-gia/consult.html` | Hàng đợi yêu cầu (lọc ưu tiên/khu vực/từ khóa) → panel chi tiết `#req-1`, lịch sử nhật ký của hộ, **nút Trợ lý AI (AgrBrain)** tóm tắt bối cảnh + xếp việc, đổi trạng thái `chờ → đã tư vấn / từ chối / đóng`, form phản hồi có validate |
| Nhật ký canh tác | `chuyen-gia/journal.html` | Đọc nhật ký từng lô, **duyệt kết quả AI-1** (chẩn đoán + độ tin cậy), modal sửa `Độ tin cậy (10–100)` có kiểm tra hợp lệ, ghi chú chuyên môn, kéo/sắp nhãn kiểm tra thực địa |
| AI Cảnh báo & Dự báo | `chuyen-gia/alerts.html` | Danh sách cảnh báo dẫn xuất từ kết quả chẩn đoán (`journalAlerts()`), lọc theo mức độ/khu vực, deep link `#alert-1`, đánh dấu đã xử lý (`smartagri_alerts_v1`) |
| Thư viện tài nguyên | `chuyen-gia/library.html` | C/R/U/D tài liệu (`smartagri_library_v1`), tìm + lọc theo chuyên đề, deep link `#doc-10`, trạng thái rỗng/không tải được |
| Quản lý chuyên gia | `chuyen-gia/experts.html` | C/R/U/D danh bạ chuyên gia + chuyên môn (`smartagri_experts_v1`), bảng + lọc |

**Trợ lý AI AgrBrain (`chuyen-gia/js/agrbrain.js`)** đọc `localStorage` của 6 loại dữ liệu (nhật ký, cảnh báo, nông hộ, thư viện, chuyên gia, cài đặt), sinh danh sách việc ưu tiên + lời khuyên, đẩy vào chuông của cả 5 trang. Không có dữ liệu → không bịa: badge ẩn, panel báo rỗng.

### Đối chiếu với mã gốc của SV2 (`tachisama95-ux` / git name `Thanh Dat`)

Bản `chuyen-gia/` trong repo này là **5/10 màn hình** mà SV2 đã viết. Số liệu đo bằng `git show refs/remotes/team/main:<tệp> | wc -l` ngày 26-10-2026; branch chuẩn là `team/main` = `team/smartagri-agrbrain` = `team/repo` (cùng tip `d569695`, 18-10-2026 22:19 +07, 7 commit), còn commit chép vào repo ta là `253355b` ngày **22-10-2026** → **không có commit nào của SV2 bị bỏ lỡ**.

| Tệp trong mã gốc của SV2 | Trong repo ta | Kiểm chứng được gì |
|---|---|---|
| `index.html` 306 · `journal.html` · `alerts.html` · `library.html` · `experts.html` + `js/{agrbrain,journal,main,pages,shell}.js` + `css/{style,journal,parts}.css` + 8 assets | **Đã hợp nhất** (`index.html` → `consult.html`, bản ta 324 dòng) | Không mất hàm nào: `css/style.css` 704/704, `css/journal.css` 590/590, `js/pages.js` 3634/3634 **giống hệt**; phần chênh ở các trang là thay đổi chủ ý (đường dẫn `../`, cầu nối phiên inline `smartagri_role_v1` → `smartagri_auth`, nav 12 mục, điểm rơi đăng xuất `../login.html`) |
| `dashboard.html` 288 + `js/dashboard.js` 809 + `css/dashboard.css` 637 — "Season Dashboard – Bảng điều khiển mùa vụ" của chuyên gia, có **mô-đun quét ảnh lá** (`analyzeImage`, `rgbToHsv`, `classifyImage`, `renderScanShell`, `playScanSteps`) | **Chưa hợp nhất** | `grep` 4 hàm đó trên toàn cây làm việc = **0 kết quả** → tính năng AI phân tích ảnh của SV2 hiện không chạy trong bản tích hợp. Không làm vỡ mục "≥ 3 tính năng AI" của barem (đã có AI-1/2/3), nhưng `dashboard.html` ở gốc (224 dòng) là trang **quản trị**, không phải bản thay thế |
| `login.html` 131 + `js/login.js` 101 + `css/login.css` 302, tài khoản demo `chuyengia` / `123456` | **Thay bằng cổng chung** `login.html` | Cổng chung dùng cặp `chuyengia` / `agri2026`; ai quen mật khẩu cũ của SV2 phải dùng mật khẩu mới khi demo |
| `households.html` 131 · `reports.html` 170 · `settings.html` 167 (bản *chuyên gia*: tư vấn theo nông hộ, báo cáo nhật ký theo tháng/loại hoạt động + xuất báo cáo, mục cài đặt "Tích hợp mô hình AI – Field Issue Classifier") | **Chưa hợp nhất** | Repo ta có 3 trang trùng tên ở thư mục gốc nhưng là bản khối quản trị (294 / 274 / 299 dòng), nội dung khác |

Giới hạn của so sánh này: repo public của SV2 (`api.github.com/users/tachisama95-ux/repos`) chỉ có `BTCSE122_BTL-ThanhDat` (push 2026-10-18T15:19:52Z, đúng giờ tip `team/main`) và `Thanhdat` (3 tệp, không liên quan CropMate). **Repo private của bạn không kiểm tra được**, nên bảng trên chỉ kết luận về những gì đã đẩy lên GitHub.

**Ảnh sidebar 9 mục của bản gốc so với menu 5 mục của bản hợp nhất.** Ngày 26-10-2026 bạn đưa ảnh chụp menu chuyên gia gồm 9 mục (*Tổng quan* đang bật · Nhật ký canh đồng · AI Cảnh báo & Dự báo · Yêu cầu hỗ trợ · Nông hộ & HTX · Thư viện tài nguyên · Quản lý chuyên gia · Báo cáo & Thống kê · Cài đặt hệ thống) kèm thẻ "Trợ lý AI AgrBrain". Đối chiếu từng chữ: ảnh khớp **chính xác** với `js/shell.js` và `dashboard.html` ở tip `d569695` — tức app **độc lập** của SV2, nơi mọi đường dẫn là `dashboard.html` / `index.html` / `settings.html` cùng cấp và **chưa có** `js/roles.js`. Ảnh không phải bản nộp; bản nộp cũng không hiển thị được sidebar đó vì `chuyen-gia/js/shell.js` đã thay `SA_NAV` bằng 12 mục của site hợp nhất.

Bốn chỗ khác nhau giữa hai sidebar và lý do:
- **Số mục:** bản hợp nhất dựng 12 mục rồi `js/roles.js` lọc còn **5** cho vai trò Chuyên gia. Bảy mục bị ẩn (`dashboard`, `households`, `schedule`, `reports`, `crops`, `users`, `settings`) trỏ sang khối HTX – quản trị, tức **ẩn theo chủ ý phân quyền chứ không phải mất trang**; admin và coop vẫn nhìn thấy chúng.
- **"Tổng quan":** tương ứng `dashboard.html` của SV2 — hàng "Chưa hợp nhất" ở bảng trên — nên bản nộp không có mục nào thay đúng chức năng đó. `dashboard.html` ở thư mục gốc (224 dòng) là bảng điều khiển **khối quản trị**, đừng nhầm khi thuyết trình.
- **Nhãn:** "Nhật ký canh đồng" → "Nhật ký canh tác", "Yêu cầu hỗ trợ" → "Yêu cầu tư vấn", "AI Cảnh báo & Dự báo" → "AI Cảnh báo", "Cài đặt hệ thống" → "Cấu hình hệ thống" — do thống nhất nhãn cho 12 trang dùng chung sidebar, không phải đổi tính năng.
- **Huy hiệu "9+":** hai bản giống nhau ở chỗ này (số việc AgrBrain đếm được — `chuyen-gia/js/agrbrain.js:685`), nên không dùng nó để nhận diện bản nào.

## 3. Điều phối HTX (thư mục gốc — SV3)

**Mục tiêu:** nhìn toàn hợp tác xã và không bỏ sót công việc chung.

| Màn hình | Tệp | Làm được gì (đã code) |
|---|---|---|
| Tổng quan nông hộ | `households.html` | 6 hồ sơ nông hộ thật theo ngành (lúa IR50404, xoài Cát Hòa Lộc, cà phê Robusta — lô, diện tích, giai đoạn, ngày thứ N, mức khỏe) + chỉ số HTX 45 hộ / 120 ha, tìm kiếm + lọc đa tiêu chí (vùng, giống, mức khỏe), chuyển **thẻ ↔ bảng**, deep link `?q=lúa`, `?health=alert`, trạng thái rỗng |
| Lịch trình mùa vụ | `schedule.html` | Lịch tháng/tuần, thêm–sửa sự kiện, lọc theo loại/hộ, **AI-2 sinh checklist theo giống + giai đoạn** (tiến trình bất đồng bộ → checklist → giải thích → Chấp nhận/Sửa/Hủy), lỗi "AI chưa có dữ liệu chuẩn cho …" khi giống ngoài danh mục |
| Báo cáo tổng kết mùa vụ | `reports.html` | Chọn mùa vụ, thẻ chỉ số + biểu đồ cột so chỉ tiêu, sắp xếp bảng, **xuất CSV có BOM U+FEFF** để Excel không vỡ tiếng Việt, lưu trữ vụ (`smartagri_season_archive_v1`), liên kết tên hộ → `households.html?q=` |

## 4. Quản trị viên (thư mục gốc — SV3)

| Màn hình | Tệp | Làm được gì (đã code) |
|---|---|---|
| Bảng điều khiển hệ thống | `dashboard.html` | Chỉ số (đã đăng nhập, đang hoạt động, **tỷ lệ gọi AI thành công**, chờ duyệt tính từ kho đăng ký thật), biểu đồ cột đổi khoảng thời gian, bảng nhật ký hoạt động + toast, thu gọn sidebar |
| Danh mục cây trồng & sinh vật gây hại | `index.html` | C/R/U + **Ngừng dùng (archive)**, tìm kiếm, lọc nhóm, badge trạng thái `setStatus()`, form thêm cây trồng validate tên + chu kỳ, toast, `Esc` đóng modal — *trang nộp giữa kỳ* |
| Quản lý tài khoản | `users.html` | Danh sách + hồ sơ đăng ký mới nhập lên đầu (*Đang chờ duyệt*), tìm + lọc vai trò/trạng thái + **phân trang**, skeleton loading, duyệt/khóa/mở khóa/đổi vai trò (ghi ngược `smartagri_registrations_v1`), chọn hàng loạt, modal đổi vai trò validate |
| Cấu hình hệ thống | `settings.html` | 5 tab (Chung / Trí tuệ nhân tạo / Thông báo / Bảo mật / Dữ liệu & Sao lưu), toggle, validate số, lưu `smartagri_settings_v1` (21 khóa; ô API Key mang `data-secret` **không** được lưu — chống VP-01, xem README), nút Khôi phục mặc định, toast |

### Cổng đăng nhập chung (`login.html` — mọi vai trò, SV3)

| Lớp | Tệp | Làm được gì (đã code) |
|---|---|---|
| Lưới 4 thẻ vai trò | `login.html` + `js/login.js` | thẻ cho biết vai trò + minh họa SVG; thẻ **Nông dân** là link thật sang `nong-dan/login.html` (giữ form riêng của SV1); 3 thẻ còn lại mở bước 2 ngay trong trang; nhãn "Gần nhất" cho vai trò đã dùng lần trước (`localStorage`) |
| Màn hình nhập tài khoản | `#credPanel` trong `login.html` | validate tài khoản ≥ 4 ký tự / mật khẩu ≥ 6 ký tự (dòng lỗi `.err-msg` + `aria-describedby`), nút hiện/ẩn mật khẩu (`aria-pressed` + đổi `aria-label`), "Điền nhanh" cặp demo, trạng thái **Đang tải** (nút `disabled` + spinner, giả lập độ trễ API 800 ms), trạng thái **Lỗi** (dòng đỏ + toast + khung rung `.is-shaking`, không ghi phiên), **Thành công** (ghi phiên rồi chuyển trang), nút "Quay lại chọn vai trò" và `Esc` đóng khung |
| Quên mật khẩu (2 bước, cùng màn hình) | `#resetPanel` trong `login.html`, mã ở `js/login.js:209-364` | nút "Quên mật khẩu?" mở khối đổi mật khẩu cho đúng vai trò vừa chọn (`#resetRoleName`, placeholder theo tài khoản demo của vai trò đó); bước 1 chấp nhận tài khoản demo **hoặc** email có trong kho đăng ký (`REG.all()`), sai/để trống thì hiện dòng `.err-msg` + toast + khối rung; sau 800 ms giả lập gửi mail, in mã 6 số sinh tất định từ tên tài khoản (`demoCodeFor`, `js/login.js:53`) — bản demo **không gửi email**; bước 2 validate mã khớp / mật khẩu mới ≥ 6 ký tự / hai ô khớp nhau, lưu mật khẩu vào `localStorage['smartagri_demo_pwd_v1']` (đăng nhập lại phải dùng mật khẩu mới, còn sau `F5`) rồi quay lại khung đăng nhập; `Esc` và nút "Quay lại đăng nhập" đóng khối. Không tách tệp HTML riêng vì mỗi màn hình phải tương ứng một video OBS |
| Đăng ký hồ sơ mới | modal `#regForm` | validate 7 trường (email regex, SĐT `0\d{9}`, xác nhận mật khẩu, điều khoản), đẩy hồ sơ vào `smartagri_registrations_v1` → `users.html` đọc ra ở trạng thái *Đang chờ duyệt*; dựng DOM bằng `textContent`/`append` nên họ tên chứa `<img onerror>` không thành markup |

Tài khoản demo là mảng giả lập `DEMO_ACCOUNTS` (`js/login.js:27`) — `quantri/admin2026`, `dieopho/htx2026`, `chuyengia/agri2026`; không backend, không gọi API, không chứa khóa bí mật. Mật khẩu **không** hoàn toàn cứng: `accountFor()` (`js/login.js:44`) đọc `smartagri_demo_pwd_v1` trước, nên mật khẩu vừa đổi bằng luồng Quên mật khẩu là mật khẩu được chấp nhận ở lần đăng nhập sau. Phiên đăng nhập ghi `smartagri_role_v1` (`{role, short, initials, scope, at}`), từ bản có màn hình nhập tài khoản thì ghi thêm khoá `user` là tên đăng nhập vừa nhập; form của khối `nong-dan/` vẫn ghi đúng cấu trúc cũ nên `js/roles.js` không phải đổi. Khối `#credPanel`/`#resetPanel` ẩn bằng thuộc tính `hidden` trong HTML, và `css/login.css` có `[hidden] { display: none !important; }` — thiếu dòng này thì `display:flex` của chính hai khối đó đè lên quy tắc mặc định của trình duyệt, khung "Đăng nhập: Quản trị viên" hiện ra ngay trên màn hình chọn vai trò.

## 5. Ma trận thực thể × vai trò

| Thực thể | Nông dân | Chuyên gia | Điều phối | Quản trị |
|---|:--:|:--:|:--:|:--:|
| `seasons` | C R U A | R | R U A | R |
| `fieldLogs` | C R U D | R U (duyệt) | R | R |
| `helpRequests` | C R U A | R U (trả lời) | R | R |
| `resources` | R | C R U D | R U | R U |
| `experts` | — | C R U D | R | R U |
| `households` | U (hồ sơ mình) | R U (ghi chú) | R | R U D (khóa) |
| `cropCatalog` | R | R U | R U | C R U A |
| `users` | C (đăng ký) | — | R | R U D |
| `settings` | U | U | — | U |

## 6. Phân quyền giao diện (`js/roles.js`)

Đăng nhập ở `login.html` → bấm thẻ vai trò → nhập tài khoản + mật khẩu → toàn bộ site chỉ hiện màn hình thuộc vai trò đó.

Hai bước đầu là một phần của cùng màn hình `login.html` (`js/login.js`): thẻ **Quản trị viên / Điều phối HTX / Chuyên gia** mở khung nhập tài khoản ngay trong trang (lưới vai trò bị ẩn bằng class `.is-auth`), thẻ **Nông dân** chuyển sang form riêng của khối `nong-dan/` do SV1 phụ trách. Tài khoản demo cố định theo vai trò (`quantri/admin2026` · `dieopho/htx2026` · `chuyengia/agri2026`) nằm trong mảng `DEMO_ACCOUNTS` ở `js/login.js:27` — không có backend, không có khóa bí mật. Đăng nhập thành công ghi `localStorage['smartagri_role_v1'] = {role, short, initials, scope, user, at}` rồi `js/roles.js` đọc `scope` để lọc menu.

| Vai trò | Số mục menu | Trang bị chặn khi gõ URL thẳng |
|---|---:|---|
| Quản trị viên | 12 | — |
| Điều phối HTX | 8 | `index.html`, `users.html`, `settings.html`, `chuyen-gia/experts.html`, cả khối `nong-dan/` |
| Chuyên gia | 5 (= đúng 5 trang khối `chuyen-gia/`) | cả khối quản trị + cả khối `nong-dan/` |
| Nông dân | 7 | cả khối quản trị + cả khối chuyên gia |

Cơ chế: bảng `PATH_KEY` (19 đường dẫn → khóa) + `ROLE_MENUS`; lọc phần tử menu (`.nav-item`, `.nav__item`, `.side-link`), đổi link logo/chip về trang nhà vai trò, `guardPage()` chặn truy cập, `recountNotifBadge()` đếm lại huy hiệu quả chuông theo đúng số dòng vai trò đó mở được, và `MutationObserver` bắt cả phần tử DOM sinh sau khi trang chạy (menu do `chuyen-gia/js/shell.js` dựng, danh sách thông báo do `agrbrain.js` dựng).

**Đã kiểm thử:** phân quyền 4 vai trò (số mục menu 12/8/5/7, chặn trang ngoài phạm vi, đăng xuất xóa cả ba nơi lưu phiên) và liên kết chéo khối, chạy trên máy chủ `http://127.0.0.1:8123` **và** bản GitHub Pages đang phát hành; đo lại 26-10-2026 trên `http://127.0.0.1:8129` sau khi sửa lỗi 15 (mục 4 của [`ai-usage-report.md`](ai-usage-report.md)): chuyên gia 5 mục và mở được `chuyen-gia/experts.html`, chuông AgrBrain báo 6/6 dòng thay vì 7/4, admin 12 · coop 8 · nông dân 7 không đổi, chuyên gia gõ `/users.html` vẫn bị đưa về `/chuyen-gia/consult.html`. **Bản GitHub Pages chỉ đổi theo sau khi push commit này.** **Đo layout 320/375 px cho 10 trang `nong-dan/` (24-10-2026):** 8 trang sạch hoàn toàn ở cả hai bề rộng; `diary.html` tràn 39 px ở 320 px (lưới `.entry` cột `1fr` không co được — `nong-dan/css/diary.css:566`, `:875`) và `login.html` tràn 18 px ở cả hai bề rộng (`.deco-branch{right:-18px}` trong khi `overflow-x:hidden` chỉ đặt trên `body` — `nong-dan/css/login.css:33`, `:331-333`). Bảng đầy đủ kèm bản sửa đề xuất: README, mục Kiểm thử.
