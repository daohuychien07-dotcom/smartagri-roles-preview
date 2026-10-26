# Đề xuất dự án — CropMate AI (SmartAgri)

> **Học phần:** CSE122 – Phát triển ứng dụng Web cơ bản
> **Đề tài:** BTL-04 – CropMate AI – Nhật ký mùa vụ và trợ lý canh tác
> **Loại sản phẩm:** Nguyên mẫu Web Frontend đa vai trò, CRUD, responsive, tương tác JavaScript, ba trải nghiệm AI mô phỏng
> **Backend:** không có. Dữ liệu giả lập + `localStorage`.

---

## 1. Ngữ cảnh

Nông hộ nhỏ trong hợp tác xã ghi chép rời rạc (vở, Zalo, ảnh điện thoại), nên khi sâu bệnh xuất hiện, chuyên gia nhận được một mô tả không đủ bối cảnh: không biết giống gì, giai đoạn nào, đã phun thuốc nào, thời tiết mấy ngày qua. Điều phối HTX lại quản lý lịch bằng bảng Excel và điện thoại. Không có một không gian làm việc chung cho bốn vai trò.

## 2. Phát biểu vấn đề

| Mã | Vấn đề | Màn hình giải quyết |
|---|---|---|
| **P1** | Nhật ký mùa vụ phân tán, không tra cứu lại được | `nong-dan/diary.html`, `nong-dan/index.html` |
| **P2** | Khó theo dõi công việc theo giai đoạn mùa vụ | `nong-dan/season.html`, `schedule.html` |
| **P3** | Ảnh hiện trường và mô tả không được phân loại | `nong-dan/ai.html`, `chuyen-gia/journal.html` |
| **P4** | Chuyên gia thiếu bối cảnh khi tư vấn; nông hộ thiếu kênh gửi yêu cầu | `nong-dan/support.html`, `chuyen-gia/consult.html` |
| **P5** | HTX không có bức tranh tổng thể: nông hộ, lịch, tổng kết vụ | `households.html`, `schedule.html`, `reports.html` |
| **P6** | Danh mục cây trồng/sinh vật gây hại và tài khoản không ai quản trị | `index.html`, `users.html`, `settings.html` |

P1–P4 là bốn vấn đề đề bài nêu; P5–P6 do nhóm bổ sung từ vai trò Điều phối HTX và Quản trị viên.

## 3. Mục tiêu

- **O1.** Biến bài toán thực tế thành sản phẩm Frontend có hành trình người dùng rõ ràng cho 4 vai trò. ✔
- **O2.** Đủ giao diện cho từng vai trò, **mỗi vai trò ≥ 3 màn hình** (xem `docs/screen-inventory.md`: Nông dân 10, Chuyên gia 5, Điều phối 3 dùng chung + 4 trang quản trị). ✔
- **O3.** CRUD/trạng thái nghiệp vụ có ý nghĩa: `pending → approved/done → rejected → archived`, không xóa cứng dữ liệu nghiệp vụ. ✔
- **O4.** JavaScript/DOM thuần cho tìm kiếm, lọc đa tiêu chí, sắp xếp, phân trang, kiểm tra hợp lệ biểu mẫu, modal + `Esc`, tab, toast, kết xuất dữ liệu. ✔
- **O5.** JSON giả lập + bộ lưu trữ trình duyệt: **17 khóa `localStorage` + 3 khóa `sessionStorage`** (đều thuộc họ `smartagri_*` / `smartagri.*`) dùng chung cho cả ba khối, dữ liệu vẫn còn sau `F5`. ✔
- **O6.** ≥ 3 trải nghiệm AI mô phỏng, đủ 6 bước và có kịch bản thất bại. ✔
- **O7.** Làm việc nhóm bằng Git/GitHub theo nhánh + cơ chế phân khối độc lập; bảng công việc ghi trong `docs/`. ⚠ (một phần — xem mục 7)
- **O8.** *(bổ sung)* Một hệ thống duy nhất thay vì 3 "website con": cổng đăng nhập chung, menu dùng chung, **phân quyền giao diện theo vai trò** (`js/roles.js`). ✔

## 4. Các vai trò và phạm vi màn hình

| Vai trò | Không gian | Số màn hình trong menu | Trang nhà sau đăng nhập |
|---|---|---:|---|
| **Nông dân** | `nong-dan/` | 7 | `nong-dan/index.html` |
| **Chuyên gia nông nghiệp** | `chuyen-gia/` | 4 | `chuyen-gia/consult.html` |
| **Điều phối HTX** | thư mục gốc + `chuyen-gia/` (ch Chế độ xem) | 8 | `households.html` |
| **Quản trị viên** | toàn bộ site | 12 | `dashboard.html` |

Phạm vi này do `js/roles.js` áp dụng thật: menu bị lọc và trang ngoài phạm vi bị chặn đưa về trang nhà vai trò.

## 5. Hành trình người dùng (luồng nghiệp vụ chính)

```text
Nông dân                  Chuyên gia               Điều phối HTX / Admin
────────                  ──────────               ─────────────────────
login.html (chọn vai trò → nhập tài khoản + mật khẩu)
  └▶ nong-dan/login.html → nong-dan/index.html
       └▶ diary.html: ghi nhật ký ──┐
            AI-1 chẩn đoán sơ bộ    │
       └▶ support.html: gửi yêu cầu ──▶ consult.html: hàng đợi
              (trạng thái: chờ)         └▶ xem bối cảnh + AgrBrain (AI-3)
                                          └▶ trả lời ──▶ support.html (đã tư vấn)
       └▶ weather.html: đọc khuyến nghị      └▶ journal.html: duyệt chẩn đoán AI
            (sáng ngày phun thuốc)  ◀──────────┘
  └▶ season.html: đổi giai đoạn ─────▶ schedule.html: AI-2 sinh checklist lịch vụ
                                        └▶ households.html: giám sát hộ
                                          └▶ reports.html: tổng kết, lưu trữ vụ
                                              └▶ dashboard.html: chỉ số toàn hệ thống
                                                  └▶ index.html / users.html / settings.html
```

Bốn lượt xem chi tiết hơn (từng màn hình, từng nút) ở [`docs/roles-and-features.md`](roles-and-features.md).

## 6. Thực thể nghiệp vụ

`farms` (hộ/thửa), `seasons` (mùa vụ + giai đoạn), `fieldLogs` (nhật ký + ảnh), `helpRequests` (yêu cầu hỗ trợ + vòng đời), `resources` (tài nguyên chuyên môn), `experts` (chuyên gia + phân công), `cropCatalog` (cây trồng ↔ sinh vật gây hại), `users` (tài khoản + vai trò + trạng thái). Ma trận CRUD đầy đủ: mục 6 của `docs/screen-inventory.md`.

## 7. Phạm vi và giới hạn trung thực

**Đã làm:** 23 màn hình + cổng đăng nhập chung + phân quyền theo vai trò + 3 tính năng AI mô phỏng + responsive desktop/tablet/mobile (đo `scrollWidth − clientWidth` ở 1280 / 336 / 320 / 375 px; kết quả chi tiết trong README mục Kiểm thử) + dữ liệu giả lập có ngữ cảnh nông nghiệp (tên giống, giai đoạn, chi phí, năng suất thật theo vùng).

**Chưa làm / không có:** không có backend và không có API thật; không gọi LLM; hai màn hình khối nông dân còn vỡ layout nhẹ ở bề rộng rất nhỏ — `nong-dan/diary.html` tràn 39 px ở 320 px, `nong-dan/login.html` tràn 18 px ở 320 và 375 px (nguyên nhân và bản sửa một dòng đã ghi trong README; thuộc CSS của thành viên phụ trách nên nhóm chưa tự sửa); bảng công việc Trello/Jira công khai chưa có (danh sách TASK nằm trong `docs/screen-inventory.md` + `docs/team-assignment.md`); 21/23 video OBS chưa quay; lịch sử Git chưa dựng `dev` + `feature/*` + PR cho từng màn hình. Xem `docs/obs-evidence.md` và mục "Quy trình Git" của README để biết chính xác những gì GitHub phản ánh.
