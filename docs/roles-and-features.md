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

**Mục tiêu:** nhận đủ bối cảnh trước khi tư vấn, duyệt kết quả AI thay vì tin blindly.

| Màn hình | Tệp | Làm được gì (đã code) |
|---|---|---|
| Yêu cầu & tư vấn | `chuyen-gia/consult.html` | Hàng đợi yêu cầu (lọc ưu tiên/khu vực/từ khóa) → panel chi tiết `#req-1`, lịch sử nhật ký của hộ, **nút Trợ lý AI (AgrBrain)** tóm tắt bối cảnh + xếp việc, đổi trạng thái `chờ → đã tư vấn / từ chối / đóng`, form phản hồi có validate |
| Nhật ký canh tác | `chuyen-gia/journal.html` | Đọc nhật ký từng lô, **duyệt kết quả AI-1** (chẩn đoán + độ tin cậy), modal sửa `Độ tin cậy (10–100)` có kiểm tra hợp lệ, ghi chú chuyên môn, kéo/sắp nhãn kiểm tra thực địa |
| AI Cảnh báo & Dự báo | `chuyen-gia/alerts.html` | Danh sách cảnh báo dẫn xuất từ kết quả chẩn đoán (`journalAlerts()`), lọc theo mức độ/khu vực, deep link `#alert-1`, đánh dấu đã xử lý (`smartagri_alerts_v1`) |
| Thư viện tài nguyên | `chuyen-gia/library.html` | C/R/U/D tài liệu (`smartagri_library_v1`), tìm + lọc theo chuyên đề, deep link `#doc-10`, trạng thái rỗng/không tải được |
| Quản lý chuyên gia | `chuyen-gia/experts.html` | C/R/U/D danh bạ chuyên gia + chuyên môn (`smartagri_experts_v1`), bảng + lọc |

**Trợ lý AI AgrBrain (`chuyen-gia/js/agrbrain.js`)** đọc `localStorage` của 6 loại dữ liệu (nhật ký, cảnh báo, nông hộ, thư viện, chuyên gia, cài đặt), sinh danh sách việc ưu tiên + lời khuyên, đẩy vào chuông của cả 5 trang. Không có dữ liệu → không bịa: badge ẩn, panel báo rỗng.

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

Đăng nhập ở `login.html` → chọn vai trò → toàn bộ site chỉ hiện màn hình thuộc vai trò đó.

| Vai trò | Số mục menu | Trang bị chặn khi gõ URL thẳng |
|---|---:|---|
| Quản trị viên | 12 | — |
| Điều phối HTX | 8 | `index.html`, `users.html`, `settings.html`, `chuyen-gia/experts.html`, cả khối `nong-dan/` |
| Chuyên gia | 4 | cả khối quản trị + `chuyen-gia/experts.html` + `nong-dan/` |
| Nông dân | 7 | cả khối quản trị + cả khối chuyên gia |

Cơ chế: bảng `PATH_KEY` (19 đường dẫn → khóa) + `ROLE_MENUS`; lọc phần tử menu (`.nav-item`, `.nav__item`, `.side-link`), đổi link logo/chip về trang nhà vai trò, `guardPage()` chặn truy cập, `MutationObserver` bắt phần tử DOM sinh sau khi trang chạy.

**Đã kiểm thử:** phân quyền 4 vai trò (số mục menu 12/8/4/7, chặn trang ngoài phạm vi, đăng xuất xóa cả ba nơi lưu phiên) và liên kết chéo khối, chạy trên máy chủ `http://127.0.0.1:8123` **và** bản GitHub Pages đang phát hành. **Chưa kiểm thử:** đo vỡ layout ở bề rộng 320/375 px riêng cho 10 trang `nong-dan/` (xem mục giới hạn trong `docs/project-proposal.md`).
