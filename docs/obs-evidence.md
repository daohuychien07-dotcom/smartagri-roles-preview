# Minh chứng OBS — danh sách video theo màn hình

> Quy chế: **1 màn hình trong `docs/screen-inventory.md` = 1 video OBS có mặt sinh viên**.
> Tổng màn hình: **23** · Video **đã có: 2** · **Còn thiếu: 21**.
> Tên file theo mẫu `SV?-<NN>-<ten-man-hinh>.mp4` (mục 17 đề BTL-04).

## 1. Nội dung bắt buộc trong mỗi video (8 ý, ~3–5 phút)

1. Mặt sinh viên + giọng nói.
2. Mở bản mô phỏng Canva/Figma của đúng màn hình.
3. Mở đúng tệp HTML/CSS/JS trong trình editor.
4. Giải thích bố cục và logic (không đọc lại mô tả).
5. **Sửa trực tiếp ít nhất một chi tiết** trên màn hình đang mở.
6. Chạy thử tương tác (lọc/thêm/sửa/xóa/AI).
7. `git add` + `git commit` + `git push` lên nhánh tương ứng.
8. Nói rõ **mã công việc (TASK-xx) + tên nhánh + mã commit** ở cuối video.

## 2. Trạng thái theo từng màn hình

| TASK | Màn hình | Tệp | Người quay | Tên file video | Trạng thái | Link |
|---:|---|---|---|---|---|---|
| TASK-01 | Season Dashboard | `nong-dan/index.html` | SV1 | `SV1-01-farmer-season-dashboard.mp4` | **ĐÃ CÓ** (dạng YouTube, chưa đổi tên theo mẫu) | https://youtu.be/r-eW5GXDfPM |
| TASK-02 | Season Board | `nong-dan/season.html` | SV1 | `SV1-02-farmer-season-board.mp4` | CẦN QUAY | |
| TASK-03 | Field Log | `nong-dan/diary.html` | SV1 | `SV1-03-farmer-field-log.mp4` | CẦN QUAY | |
| TASK-04 | Weather | `nong-dan/weather.html` | SV1 | `SV1-04-farmer-weather.mp4` | CẦN QUAY | |
| TASK-05 | AI Assistant | `nong-dan/ai.html` | SV1 | `SV1-05-farmer-ai-assistant.mp4` | CẦN QUAY | |
| TASK-06 | Help Request | `nong-dan/support.html` | SV1 | `SV1-06-farmer-help-request.mp4` | CẦN QUAY | |
| TASK-07 | Settings | `nong-dan/settings.html` | SV1 | `SV1-07-farmer-settings.mp4` | CẦN QUAY | |
| TASK-08 | Nông hộ Login | `nong-dan/login.html` | SV1 | `SV1-08-farmer-login.mp4` | CẦN QUAY (gộp được với TASK-09/10 nếu cùng luồng đăng ký) | |
| TASK-09 | Nông hộ Register | `nong-dan/register.html` | SV1 | `SV1-09-farmer-register.mp4` | CẦN QUAY | |
| TASK-10 | Quên mật khẩu | `nong-dan/forgot-password.html` | SV1 | `SV1-10-farmer-forgot-password.mp4` | CẦN QUAY | |
| TASK-11 | Request Queue + Detail | `chuyen-gia/consult.html` | SV2 | `SV2-01-expert-request-queue.mp4` | CẦN QUAY | |
| TASK-12 | Journal Review | `chuyen-gia/journal.html` | SV2 | `SV2-02-expert-journal-review.mp4` | CẦN QUAY | |
| TASK-13 | Alert Center | `chuyen-gia/alerts.html` | SV2 | `SV2-03-expert-alert-center.mp4` | CẦN QUAY | |
| TASK-14 | Resource Library | `chuyen-gia/library.html` | SV2 | `SV2-04-expert-resource-library.mp4` | CẦN QUAY | |
| TASK-15 | Expert Roster | `chuyen-gia/experts.html` | SV2 | `SV2-05-expert-roster.mp4` | CẦN QUAY | |
| TASK-16 | Cổng đăng nhập đa vai trò | `login.html` | SV3 | `SV3-01-role-portal.mp4` | CẦN QUAY | |
| TASK-17 | Farm Overview | `households.html` | SV3 | `SV3-02-coop-farm-overview.mp4` | CẦN QUAY | |
| TASK-18 | Calendar + AI-2 | `schedule.html` | SV3 | `SV3-03-coop-calendar-ai-checklist.mp4` | CẦN QUAY — **bắt buộc show cả trạng thái lỗi AI** | |
| TASK-19 | Season Summary | `reports.html` | SV3 | `SV3-04-coop-season-summary.mp4` | CẦN QUAY | |
| TASK-20 | Crop & Pest Catalog | `index.html` | SV3 | `SV3-05-admin-crop-catalog.mp4` | **ĐÃ CÓ** (video giữa kỳ, ~3 phút, chưa đủ 8 ý của mục 1) | https://youtu.be/SiAEbIB4Tos |
| TASK-21 | User Management | `users.html` | SV3 | `SV3-06-admin-user-management.mp4` | CẦN QUAY | |
| TASK-22 | System Settings | `settings.html` | SV3 | `SV3-07-admin-system-settings.mp4` | CẦN QUAY | |
| TASK-23 | System Dashboard | `dashboard.html` | SV3 | `SV3-08-admin-dashboard.mp4` | CẦN QUAY | |
| TASK-24 | Phân quyền theo vai trò | `js/roles.js` + `login.html` | SV3 | `SV3-09-role-scoping.mp4` | CẦN QUAY (quay liền sau TASK-16) | |

`giuaki.html` **không** có video riêng: là bản 1 tệp của TASK-20, nộp cho điểm giữa kỳ.

## 3. Video giữa kỳ đã nộp (để đối chiếu, không tính vào bộ cuối kỳ)

| Tệp | Link | Phạm vi |
|---|---|---|
| `CSE122-GK-SV3-…-CropCatalog` | https://youtu.be/SiAEbIB4Tos | Một màn hình `index.html` |
| `CSE122-GK-SV1-…-SeasonDashboard` | https://youtu.be/r-eW5GXDfPM | Khối `nong-dan/` |

## 4. Nơi lưu video

- Khuyến nghị: thư mục YouTube **Unlisted** cho từng thành viên, dán link vào cột "Link" của bảng trên và vào thẻ tương ứng trong bảng công việc.
- Bản sao dự phòng: `docs/obs/` (đặt tên y như cột "Tên file video"), chỉ push khi repo còn hạn mức — mỗi file `.mp4` thường > 50 MB, GitHub chặn ở 100 MB.

## 5. Rà soát trước khi nộp

- [ ] Số video = 23 (bằng đúng số màn hình trong `docs/screen-inventory.md`).
- [ ] Mọi link mở được ở cửa sổ ẩn danh và trên điện thoại.
- [ ] Mỗi video có đủ 8 ý ở mục 1, kết thúc bằng TASK / nhánh / commit.
- [ ] Video của màn hình có AI (TASK-01, 03, 05, 11, 12, 18) show đủ 6 bước **và** một trạng thái AI thất bại/không chắc chắn.
- [ ] Mã commit đọc được trong video **có tồn tại** trong `git log` của repo nộp bài.
