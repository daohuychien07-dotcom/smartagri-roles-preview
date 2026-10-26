# Bảng kiểm kê màn hình (Screen Inventory) — CropMate AI / SmartAgri

> **Học phần:** CSE122 – Phát triển ứng dụng Web cơ bản
> **Đề tài:** BTL-04 – CropMate AI – Nhật ký mùa vụ và trợ lý canh tác
> **Sản phẩm:** 23 màn hình nghiệp vụ + 1 bản standalone nộp giữa kỳ (`giuaki.html`), tổng cộng **24 tệp HTML** trong kho mã.
> **Nguyên tắc:** ĐỘ ĐẦY ĐỦ NGHIỆP VỤ > SỐ LƯỢNG GIAO DIỆN. Mỗi dòng dưới đây tương ứng **một tệp HTML có thật** trong repo, không có trang rác.

Mã phụ trách: **SV1** = nông hộ/khối Nông dân (`nong-dan/`) · **SV2** = khối Chuyên gia (`chuyen-gia/`) · **SV3** = khối HTX & Quản trị (thư mục gốc) + tích hợp toàn site.
Cách đọc cột **Trạng thái**: `N`=Bình thường, `L`=Đang tải, `E`=Rỗng, `S`=Thành công, `X`=Lỗi, `D`=Vô hiệu hóa, `W`=Đang chờ, `R`=Bị từ chối, `A`=Đã lưu trữ/Hủy.

---

## 1. Khối Nông dân (`nong-dan/`) — SV1

| # | Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp | CRUD | Trạng thái | AI | Phụ trách | Công việc | Nhánh | OBS |
|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Nông dân | Nắm nhanh tình trạng mùa vụ đang chạy | Xem chỉ số, công việc đến hạn, cảnh báo | Season Dashboard | `nong-dan/index.html` | R | N L E S X W | AI-1 (thẻ chẩn đoán nhanh) | SV1 | TASK-01 | `season-dashboard` | **ĐÃ CÓ** – `https://youtu.be/r-eW5GXDfPM` |
| 2 | Nông dân | Quản lý vòng đời mùa vụ | Tạo / sửa / đóng mùa vụ, đổi giai đoạn | Season Board | `nong-dan/season.html` | C/R/U/D (đóng = A) | N E S X A | — | SV1 | TASK-02 | `season-dashboard` | CẦN QUAY |
| 3 | Nông dân | Ghi lại diễn biến đồng ruộng | Viết/sửa/xóa nhật ký, đính ảnh | Field Log | `nong-dan/diary.html` | C/R/U/D | N E S X W D | AI-1 (chẩn đoán sơ bộ + xác nhận/chỉnh sửa) | SV1 | TASK-03 | `season-dashboard` | CẦN QUAY |
| 4 | Nông dân | Biết thời tiết để quyết định phun/bơm | Chọn vùng, đọc dự báo 7 ngày | Weather | `nong-dan/weather.html` | R (chọn vùng = U cấu hình) | N E S X W | Luật sinh khuyến nghị + lý do (không phải mô hình AI) | SV1 | TASK-04 | `season-dashboard` | CẦN QUAY |
| 5 | Nông dân | Hỏi nhanh về sâu bệnh | Upload ảnh, đọc kết quả + giải thích, hỏi tiếp | AI Assistant | `nong-dan/ai.html` | C (lịch sử) / R | N E S X D | AI-1 (bộ phân loại ảnh + kho hỏi đáp) | SV1 | TASK-05 | `season-dashboard` | CẦN QUAY |
| 6 | Nông dân | Nhờ chuyên gia khi vượt khả năng | Gửi/sửa/rút yêu cầu hỗ trợ | Help Request | `nong-dan/support.html` | C/R/U/D (rút = A) | N L E S X W D A | — | SV1 | TASK-06 | `season-dashboard` | CẦN QUAY |
| 7 | Nông dân | Cá nhân hóa và an toàn dữ liệu | Đổi hồ sơ, đơn vị, bật/tắt thông báo | Settings | `nong-dan/settings.html` | U (đặt lại = A) | N E S X D A | — | SV1 | TASK-07 | `season-dashboard` | CẦN QUAY |
| 8 | Nông dân | Vào hệ thống | Đăng nhập bằng tài khoản nông hộ | Login (nông hộ) | `nong-dan/login.html` | R (phiên) | N L E S X D | — | SV1 | TASK-08 | `season-dashboard` | CẦN QUAY |
| 9 | Nông dân | Mở hồ sơ mới | Đăng ký tài khoản + chấp nhận điều khoản | Register | `nong-dan/register.html` | C | N L E S X | — | SV1 | TASK-09 | `season-dashboard` | CẦN QUAY |
| 10 | Nông dân | Lấy lại quyền truy cập | Yêu cầu đặt lại mật khẩu | Forgot Password | `nong-dan/forgot-password.html` | U (mô phỏng) | N L E S X D | — | SV1 | TASK-10 | `season-dashboard` | CẦN QUAY |

## 2. Khối Chuyên gia (`chuyen-gia/`) — SV2

| # | Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp | CRUD | Trạng thái | AI | Phụ trách | Công việc | Nhánh | OBS |
|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| 11 | Chuyên gia | Xử lý đúng việc ưu tiên | Lọc hàng đợi, vào chi tiết, đổi trạng thái, trả lời | Request Queue + Detail | `chuyen-gia/consult.html` | R/U (W→S/R/A) | N L E S X W R D | AI-3 (tóm tắt bối cảnh) | SV2 | TASK-11 | `smartagri-agrbrain` | CẦN QUAY |
| 12 | Chuyên gia | Hiểu diễn biến trước khi tư vấn | Đọc/duyệt/sửa chẩn đoán, ghi chú chuyên môn | Journal Review | `chuyen-gia/journal.html` | C/R/U/D | N E S X W R D | AI-1 + AI-3 | SV2 | TASK-12 | `smartagri-agrbrain` | CẦN QUAY |
| 13 | Chuyên gia | Phát hiện sớm rủi ro | Xem cảnh báo, xác nhận/bỏ qua, mở chi tiết | Alert Center | `chuyen-gia/alerts.html` | R/U (W/R/A) | N L E S X W R D | AI-1 dẫn xuất (cảnh báo sinh từ kết quả chẩn đoán trong nhật ký) | SV2 | TASK-13 | `smartagri-agrbrain` | CẦN QUAY |
| 14 | Chuyên gia | Chia sẻ tài liệu kỹ thuật | Thêm/sửa/gỡ hoặc lưu trữ tài nguyên | Resource Library | `chuyen-gia/library.html` | C/R/U/D | N L E S X W R D | Nhận thông báo AI-3 qua chuông dùng chung | SV2 | TASK-14 | `smartagri-agrbrain` | CẦN QUAY |
| 15 | Chuyên gia | Điều phối người tư vấn | Quản lý danh sách chuyên gia + chuyên môn | Expert Roster | `chuyen-gia/experts.html` | C/R/U/D | N L E S X W R D | Nhận thông báo AI-3 qua chuông dùng chung | SV2 | TASK-15 | `smartagri-agrbrain` | CẦN QUAY |

> Ba hàng 13–15 dùng chung `chuyen-gia/js/pages.js` (3 634 dòng) và `chuyen-gia/js/agrbrain.js`; trạng thái được đăng ký một lần trong mô-đun dùng chung nên cả ba trang cùng có `L/E/X/W/R`.

## 3. Khối Điều phối HTX & Quản trị viên (thư mục gốc) — SV3

| # | Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp | CRUD | Trạng thái | AI | Phụ trách | Công việc | Nhánh | OBS |
|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| 16 | Mọi vai trò | Vào đúng không gian của mình | Chọn vai trò → nhập tài khoản + mật khẩu (3 vai trò gốc; thẻ Nông dân dẫn sang `nong-dan/login.html`), đăng ký hồ sơ mới | Portal / Role Login + Login Form | `login.html` | C (đăng ký) / R (phiên, tài khoản demo giả lập trong `js/login.js`) | N L E S X W | — | SV3 | TASK-16 | `main` (origin) | CẦN QUAY |
| 17 | Điều phối HTX | Giám sát toàn bộ nông hộ | Tìm/lọc/đổi kiểu xem, mở hồ sơ hộ | Farm Overview | `households.html` | R (deep link `?q=`, `?health=`) | N E S X W D | — | SV3 | TASK-17 | `main` (origin) | CẦN QUAY |
| 18 | Điều phối HTX | Không bỏ sót công việc chung | Thêm/sửa sự kiện, tạo lịch bằng AI, chuyển tuần/tháng | Coordinator Calendar | `schedule.html` | C/R/U | N L E S X W | **AI-2** (Season Checklist Generator) | SV3 | TASK-18 | `main` (origin) | CẦN QUAY |
| 19 | Điều phối HTX | Tổng kết và báo cáo mùa vụ | Chọn mùa vụ, sắp xếp, xuất CSV, lưu trữ | Season Summary | `reports.html` | R/U/D (archive) | N E S X D A | Tổng hợp bằng công thức JS (không phải AI) | SV3 | TASK-19 | `main` (origin) | CẦN QUAY |
| 20 | Quản trị viên | Giữ danh mục chuẩn cho toàn hệ thống | Thêm/sửa/ngừng cây trồng–sinh vật gây hại | Crop & Pest Catalog | `index.html` | C/R/U/D (archive) | N E S X D A | — | SV3 | TASK-20 | `main` (origin) | **ĐÃ CÓ** – `https://youtu.be/SiAEbIB4Tos` (bản giữa kỳ) |
| 21 | Quản trị viên | Kiểm soát ai được dùng hệ thống | Lọc, phân trang, duyệt/khóa/đổi vai trò | User Management | `users.html` | C/R/U/D | N L E S X W D | — | SV3 | TASK-21 | `main` (origin) | CẦN QUAY |
| 22 | Quản trị viên | Cấu hình hệ thống và ngưỡng AI | Sửa 5 nhóm cấu hình, khôi phục mặc định | System Settings | `settings.html` | U | N E S X W | Tab "Trí tuệ nhân tạo" = cấu hình tham số, không chạy AI | SV3 | TASK-22 | `main` (origin) | CẦN QUAY |
| 23 | Quản trị viên | Nhìn sức khỏe hệ thống trong 1 trang | Xem chỉ số, biểu đồ theo khoảng thời gian, nhật ký | System Dashboard | `dashboard.html` | R | N E S X W | Chỉ số "Tỷ lệ gọi AI thành công" (dữ liệu giả lập) | SV3 | TASK-23 | `main` (origin) | CẦN QUAY |
| — | Tích hợp | Một vai trò chỉ thấy đúng màn hình của mình | Lọc menu + chặn trang theo vai trò, nối 3 khối | *Không phải màn hình – mô-đun* | `js/roles.js` | — | — | — | SV3 | TASK-24 | `main` (origin) | CẦN QUAY (quay cùng TASK-16) |

## 4. Tệp ngoài bảng kiểm kê

| Tệp | Lý do tồn tại | Có tính là màn hình không? |
|---|---|---|
| `giuaki.html` | Bản **1 tệp tự chứa** (HTML+CSS+JS inline, 45 KB) của hàng 20, dùng cho video nộp bài **giữa kỳ**. Nội dung trùng `index.html`. | **Không.** Giữ lại để đối chiếu với điểm giữa kỳ; không quay OBS riêng, không tính vào số video cuối kỳ. |

---

## 5. Đối chiếu với danh sách giao diện nền tảng của đề BTL-04

| Yêu cầu nền tảng của đề | Tệp tương ứng đã có | Ghi chú |
|---|---|---|
| `farmer-season-dashboard.html` | `nong-dan/index.html` | Khớp |
| `farmer-field-log.html` | `nong-dan/diary.html` | Khớp |
| `farmer-help-request.html` | `nong-dan/support.html` | Khớp |
| `expert-request-queue.html` + `expert-request-detail.html` | `chuyen-gia/consult.html` | Gộp hàng đợi + chi tiết trong một luồng chuyển tiếp (deep link `#req-1`) |
| `expert-resource-library.html` | `chuyen-gia/library.html` | Khớp |
| `coordinator-farm-overview.html` | `households.html` | Khớp |
| `coordinator-calendar.html` | `schedule.html` | Khớp |
| `coordinator-season-summary.html` | `reports.html` | Khớp |
| `admin-dashboard.html` | `dashboard.html` | Khớp |
| `admin-crop-management.html` | `index.html` | Khớp |
| `admin-user-management.html` | `users.html` | Khớp |
| Màn hình **vượt** nền tảng | `nong-dan/{season,weather,ai,settings,login,register,forgot-password}.html`, `chuyen-gia/{journal,alerts,experts}.html`, `login.html`, `settings.html` | Phát sinh từ phân tích vai trò + luồng, không phải trang trang trí |

## 6. Ma trận thực thể & CRUD (đối chứng với bảng ở mục 1–3)

| Thực thể đề bài | Chỗ tạo (C) | Chỗ đọc (R) | Chỗ sửa (U) | Chỗ hủy/lưu trữ (D) | Nơi lưu |
|---|---|---|---|---|---|
| `farms` / nông hộ | `nong-dan/register.html` | `households.html`, `nong-dan/index.html` | `nong-dan/settings.html` | `users.html` (khóa) | `js/households.js` (mẫu) + `smartagri_registrations_v1` |
| `fields` / thửa ruộng | — | `nong-dan/season.html`, `chuyen-gia/journal.html` | `nong-dan/season.html` | `nong-dan/season.html` (đóng vụ) | `smartagri.seasons.v1` |
| `seasons` / mùa vụ | `nong-dan/season.html` | `reports.html`, `schedule.html`, `dashboard.html` | `nong-dan/season.html` | `reports.html` (archive) | `smartagri.seasons.v1`, `smartagri_season_archive_v1` |
| `fieldLogs` / nhật ký | `nong-dan/diary.html` | `chuyen-gia/journal.html` | `nong-dan/diary.html`, `chuyen-gia/journal.html` (duyệt) | `nong-dan/diary.html` (xóa bản nháp) | `smartagri_journal_v1` |
| `helpRequests` / yêu cầu hỗ trợ | `nong-dan/support.html` | `chuyen-gia/consult.html` | `chuyen-gia/consult.html` (W→S/R) | `nong-dan/support.html` (rút) | `smartagri_alerts_v1` + `smartagri_experts_v1` |
| `resources` / tài nguyên | `chuyen-gia/library.html` | `chuyen-gia/library.html` | `chuyen-gia/library.html` | `chuyen-gia/library.html` (lưu trữ) | `smartagri_library_v1` |

## 7. Trạng thái nghiệp vụ dùng chung (định nghĩa trong mã)

```text
pending (W) ──duyệt──▶ approved (S) ──hoàn thành──▶ done (S)
      │                        └── từ chối ──▶ rejected (R)
      └── rút / đóng ──▶ archived (A)
```

## 8. Số video OBS phải quay

- Tổng màn hình độc lập trong bảng này: **23**.
- Video **đã có**: **2** (`nong-dan/index.html` – SV1, `index.html` – SV3 bản giữa kỳ).
- Video **còn thiếu**: **21**, kèm quy tắc đặt tên `SV?-<NN>-<ten-man-hinh>.mp4`.
- Danh sách việc + link tải lên theo dõi ở [`docs/obs-evidence.md`](obs-evidence.md).

---

## 9. Bảng tính năng AI (đối chiếu yêu cầu BTL-04)

| AI | Tên trong đề | Màn hình chứa | Mã nguồn | Đủ 6 bước? | Kịch bản thất bại / không chắc chắn |
|---|---|---|---|---|---|
| **AI-1** | Field Issue Classifier | `nong-dan/index.html` (thẻ chẩn đoán), `nong-dan/ai.html`, `nong-dan/diary.html`, chuyên gia duyệt ở `chuyen-gia/journal.html` | `nong-dan/js/main.js:262-284`, `nong-dan/js/ai.js:208-238`, `nong-dan/js/diary.js:463-492`, `chuyen-gia/js/journal.js:882-1073` | Nhập ảnh/mô tả → nút chuyển "Đang phân tích…" + trễ 1,4 s → kết quả + độ tin cậy % → giải thích dấu hiệu → Chấp nhận / Sửa / Gửi chuyên gia → lưu lịch sử `smartagri.ai.history.v1` | `nong-dan/js/ai.js:557` – câu trả lời "chưa chắc chắn", hướng dẫn gửi câu hỏi cho chuyên gia; `journal.js:906` – ca độ tin cậy thấp "chưa vượt ngưỡng xử lý" |
| **AI-2** | Season Checklist Generator | `schedule.html` (điều phối HTX tạo lịch toàn vụ bằng AI) | `js/schedule.js:267-372` | Chọn giống + giai đoạn → kiểm tra hợp lệ → tiến trình bất đồng bộ → checklist sự kiện → giải thích từng mục → Chấp nhận / Chỉnh sửa / Hủy → ghi vào lịch render | `js/schedule.js:305` và `:338` – `showAiError('AI chưa có dữ liệu chuẩn cho "…"')` khi giống cây không có trong `js/catalog.js` |
| **AI-3** | Farm Log Summarizer | `chuyen-gia/consult.html` + `chuyen-gia/journal.html` (nút **Trợ lý AI**), thông báo đẩy ra chuông ở cả 5 trang chuyên gia | `chuyen-gia/js/agrbrain.js:1-20, 153-266, 641-700` | Đọc `localStorage` của 6 loại dữ liệu → gom + xếp ưu tiên → panel AgrBrain → giải thích "vì sao việc này ưu tiên" → Chấp nhận mở phiên làm việc / Bỏ qua → ghi trạng thái xử lý | `agrbrain.js:180-182` – thiếu/không đọc được dữ liệu thì dùng `SEED_*`, badge ẩn khi danh sách rỗng (`.ab-count` `hidden`), không bịa nội dung |

**Không phải AI (ghi rõ để tránh nhầm khi vấn đáp):** danh sách khuyến nghị của `nong-dan/weather.html` là **luật if/then trên dữ liệu thời tiết** (`nong-dan/js/weather.js:454-480`), `#rpSummary` của `reports.html` là **tổng hợp bằng công thức** (`js/reports.js:175-179`), tab "Trí tuệ nhân tạo" của `settings.html` chỉ là **form cấu hình tham số** (trường API Key để trống và không được ghi vào `localStorage`). Toàn bộ AI của dự án chạy mô phỏng trong trình duyệt, **không gọi API thật, không có khóa bí mật** (xem `docs/ai-usage-report.md`).
