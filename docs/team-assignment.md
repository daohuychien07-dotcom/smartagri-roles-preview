# Phân công công việc — CropMate AI (SmartAgri)

> **Lưu ý xác minh:** bảng này ghi theo **tài khoản GitHub và nhánh thật** trong lịch sử commit. Họ tên + MSSV của từng thành viên **cần nhóm điền trước khi nộp** (các mục `<…>`), vì lịch sử Git có một số commit được tạo với `user.name` chưa chuẩn (`Ten Cua Ban`).

---

## 1. Thành viên và khối phụ trách

| Mã | Thành viên | Tài khoản GitHub / tác giả commit | Khối phụ trách | Số màn hình |
|---|---|---|---|---:|
| **SV1** | `<HỌ TÊN>` — MSSV `<…>` | `daohuychien07-dotcom` (repo `BTCKcuachien`, nhánh `season-dashboard`) | Khối **Nông dân** — 10 trang `nong-dan/` | 10 |
| **SV2** | `<HỌ TÊN>` — MSSV `<…>` | `tachisama95-ux` (git name `Thanh Dat`) + các commit early có git name `Ten Cua Ban`, nhánh `smartagri-agrbrain` | Khối **Chuyên gia** — 5 trang `chuyen-gia/` | 5 |
| **SV3** | `<HỌ TÊN>` — MSSV `<…>` | `ducnhatnguyen18-svg` (repo `CSE122-BTL-NGUYENDUCNHAT`, nhánh `main`) | Khối **HTX + Quản trị** (8 trang gốc) **+ tích hợp toàn site** | 8 |

## 2. Lát cắt dọc (mỗi người tự làm end-to-end)

| Thành viên | Luồng end-to-end tự hoàn thành | Chuứng minh |
|---|---|---|
| SV1 | Đăng ký → đăng nhập nông hộ → Season Dashboard → Trợ lý AI (upload ảnh → chẩn đoán → lưu lịch sử) → gửi yêu cầu hỗ trợ | `https://github.com/daohuychien07-dotcom/BTCKcuachien` (16 commit, 2026-10-12 → 10-21) + video `youtu.be/r-eW5GXDfPM` |
| SV2 | Hàng đợi yêu cầu → đọc bối cảnh → Trợ lý AI AgrBrain tóm tắt → trả lời / từ chối → duyệt kết quả AI trong nhật ký → quản lý thư viện | nhánh `smartagri-agrbrain` (7 commit: 4 `Ten Cua Ban`, 3 `Thanh Dat`, 2026-10-12 → 10-18) |
| SV3 | Cổng đăng nhập đa vai trò → Tổng quan nông hộ → Lịch trình + AI-2 sinh checklist → Báo cáo + xuất CSV → Trang quản trị danh mục / tài khoản / cấu hình → **gộp 3 khối + `js/roles.js`** | `origin/main` (24 commit, 2026-10-08 → 10-24), README, 2 video |

> **Trung thực về lịch sử Git:** khi gộp ba khối thành một site, các commit đưa mã của SV1 (`nong-dan/`) và SV2 (`chuyen-gia/`) vào repo nộp bài do tài khoản SV3 tạo (chép nguyên tệp, không viết lại). Bản gốc của mỗi khối vẫn còn đầy đủ trong repo riêng / nhánh riêng của từng thành viên và được dẫn link ở mục 1; mã quyền sở hữu thật của từng khối đọc được qua `git log team/season-dashboard` và `git log team/smartagri-agrbrain`.

## 3. Trách nhiệm chéo (chống "3 website con rời rạc")

| Trách nhiệm ngang | Người chịu | Chứng minh bằng mã nào |
|---|---|---|
| **Hệ thống thiết kế / điều hướng / tiếp cận** | SV3 | `css/style.css` (`:root` token màu + font), cổng đăng nhập 2 bước ở `login.html` (chọn vai trò → màn hình nhập tài khoản + luồng "Quên mật khẩu?" 2 bước ngay cùng màn hình: `label` + `aria-describedby` cho từng dòng lỗi, `aria-pressed` cho nút hiện mật khẩu, `Esc` đóng khung theo thứ tự modal → khối quên mật khẩu → khung đăng nhập), `aria-label`/`role="tabpanel"`/`alt` trên các trang gốc |
| **JavaScript / dữ liệu / tương tác AI** | SV2 | `chuyen-gia/js/agrbrain.js` 766 dòng (AI-3 đọc dữ liệu liên trang), `chuyen-gia/js/journal.js` 1 089 dòng, chuẩn `localStorage` cho 6 thực thể |
| **Tích hợp / phát hành / QA** | SV3 | `js/roles.js` (19 ánh xạ đường dẫn ↔ vai trò), cầu nối phiên trong `<head>` 5 trang `chuyen-gia/`, GitHub Pages `ducnhatnguyen18-svg.github.io/CSE122-BTL-NGUYENDUCNHAT` |
| **Responsive & nội dung ngành cho khối nông dân** | SV1 | `nong-dan/css/*.css` (12 tệp: layout, ui, ai, diary, season, support, weather…), dữ liệu mùa vụ/thời tiết theo vùng |

## 4. Bảng công việc (TASK)

13 cột của [`docs/screen-inventory.md`](screen-inventory.md) đã ghi `TASK-01 … TASK-24` cho từng màn hình. Trạng thái hiện tại:

| Trạng thái | Số việc | Ghi chú |
|---|---:|---|
| HOÀN THÀNH (code đã hợp nhất + chạy trên Pages) | 23 | TASK-01 … TASK-23 |
| ĐANG LÀM | 1 | TASK-24 — tài liệu hóa `js/roles.js` (bộ hồ sơ `docs/` này) |
| CẦN LÀM | 21 | Quay 21 video OBS còn thiếu (danh sách ở `docs/obs-evidence.md`) |
| CẦN LÀM | 1 | Dựng bảng Trello/Jira công khai khớp mã TASK (hiện mới có bảng trong `docs/`) |

## 5. Cân bằng khối lượng

- SV1: 10 màn hình (nhiều nhất về số trang, mỗi trang hẹp về nghiệp vụ).
- SV2: 5 màn hình nhưng nặng nhất về JavaScript (`pages.js` 3 634 dòng + `agrbrain.js` 758 dòng).
- SV3: 8 màn hình + toàn bộ phần nối ba khối, phân quyền, tài liệu, phát hành.

Nếu giảng viên thấy lệch, lấy số dòng `js/` từng khối làm chuẩn: khối SV2 có mã JS lớn nhất, khối SV1 có số trang lớn nhất, SV3 có số lượng commit và phạm vi tích hợp lớn nhất.
