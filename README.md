# CropMate AI (SmartAgri) – Nhật ký mùa vụ và trợ lý canh tác

> **Học phần:** CSE122 – Phát triển ứng dụng Web cơ bản · **Đề tài:** BTL-04
> **Sản phẩm:** nguyên mẫu Web Frontend 4 vai trò, 23 màn hình, CRUD có trạng thái nghiệp vụ, 3 trải nghiệm AI mô phỏng, không backend.
> **Chạy thử ngay:** https://ducnhatnguyen18-svg.github.io/CSE122-BTL-NGUYENDUCNHAT/login.html
> **Repo nộp bài:** https://github.com/ducnhatnguyen18-svg/CSE122-BTL-NGUYENDUCNHAT · **Repo nhóm:** https://github.com/ducnhatnguyen18-svg/cse122-cropmate-ai
> **Hồ sơ bắt buộc:** [screen-inventory](docs/screen-inventory.md) · [proposal](docs/project-proposal.md) · [vai trò & tính năng](docs/roles-and-features.md) · [phân công](docs/team-assignment.md) · [OBS](docs/obs-evidence.md) · [khai báo AI](docs/ai-usage-report.md) · [thiết kế](design/figma-link.txt)

---

## Ngữ cảnh

Nông hộ nhỏ trong hợp tác xã ghi chép rời rạc bằng sổ tay, Zalo và ảnh trong điện thoại. Khi sâu bệnh xuất hiện, chuyên gia nhận được một mô tả thiếu bối cảnh: không biết giống gì, giai đoạn nào, đã phun gì, thời tiết mấy ngày qua. Điều phối HTX quản lý lịch bằng Excel và điện thoại; danh mục cây trồng – sinh vật gây hại và tài khoản thì không ai giữ cho nhất quán.

CropMate AI gom **bốn vai trò** (Nông dân · Chuyên gia · Điều phối HTX · Quản trị viên) vào **một website duy nhất**: nông dân ghi nhật ký và nhận chẩn đoán sơ bộ, chuyên gia duyệt kết quả đó trước khi trả lời, HTX lập lịch và tổng kết mùa vụ, quản trị viên giữ danh mục chuẩn và kiểm soát tài khoản. Sau khi đăng nhập, người dùng **chỉ thấy đúng không gian của vai trò mình** (`js/roles.js`).

## Phát biểu vấn đề

| Mã | Vấn đề | Hướng giải quyết trong sản phẩm |
|---|---|---|
| **P1** | Nhật ký mùa vụ phân tán, không tra cứu lại được | `nong-dan/diary.html` + `nong-dan/index.html`: nhật ký có ảnh, tìm kiếm, lọc, lưu `localStorage` |
| **P2** | Khó theo dõi công việc theo giai đoạn | `nong-dan/season.html` (giai đoạn) + `schedule.html` (lịch HTX, AI-2 sinh checklist) |
| **P3** | Ảnh hiện trường không được tổ chức và phân loại | `nong-dan/ai.html` + `chuyen-gia/journal.html`: phân loại + độ tin cậy + vòng duyệt |
| **P4** | Chuyên gia thiếu bối cảnh khi tư vấn | `chuyen-gia/consult.html` + AgrBrain (AI-3) tóm tắt 6 nguồn dữ liệu thành việc ưu tiên |
| **P5** *(nhóm bổ sung)* | HTX không có bức tranh tổng thể | `households.html`, `schedule.html`, `reports.html` |
| **P6** *(nhóm bổ sung)* | Danh mục và tài khoản không ai quản trị | `index.html`, `users.html`, `settings.html`, `dashboard.html` |

## Mục tiêu

- **O1** Biến bài toán thành sản phẩm Frontend có hành trình người dùng rõ cho 4 vai trò.
- **O2** Đủ giao diện cho từng vai trò, mỗi vai trò ≥ 3 màn hình (thực tế: Nông dân 10, Chuyên gia 5, Điều phối 3, Quản trị 4).
- **O3** CRUD có ý nghĩa nghiệp vụ: `chờ → đã tư vấn / từ chối → lưu trữ`, không xóa cứng dữ liệu.
- **O4** JavaScript thuần cho tìm kiếm, lọc đa tiêu chí, sắp xếp, phân trang, validate, modal + `Esc`, tab, toast, render dữ liệu.
- **O5** Dữ liệu giả lập qua mảng JS + **19 khóa `localStorage`** (`smartagri_*`), giữ nguyên sau `F5`.
- **O6** ≥ 3 trải nghiệm AI đủ 6 bước và có kịch bản thất bại/không chắc chắn.
- **O7** Làm việc nhóm qua Git/GitHub theo nhánh; bảng công việc ghi trong `docs/`.
- **O8** *(nhóm bổ sung)* Một hệ thống thống nhất thay vì 3 "website con": cổng đăng nhập chung, menu 12 mục đồng bộ, phân quyền giao diện theo vai trò.

## Các vai trò

| Vai trò | Không gian | Trang nhà sau đăng nhập | Mục menu |
|---|---|---|---:|
| **Nông dân** | `nong-dan/` (10 trang) | `nong-dan/index.html` | 7 |
| **Chuyên gia nông nghiệp** | `chuyen-gia/` (5 trang) | `chuyen-gia/consult.html` | 4 |
| **Điều phối HTX** | trang gốc + 4 trang Chuyên gia | `households.html` | 8 |
| **Quản trị viên** | toàn bộ khối HTX + Chuyên gia | `dashboard.html` | 12 |

Phạm vi trên **không phải mô tả trên giấy**: `js/roles.js` lọc phần tử menu theo vai trò, ẩn link ngoài phạm vi, đổi logo/chip về trang nhà vai trò, và `guardPage()` chặn việc gõ URL tay (dùng `location.replace` để nút Back không quay lại trang bị cấm). Kiểm thử 4 vai trò ở mục **Demo**.

## Luồng người dùng

```text
Nông dân                          Chuyên gia                      Điều phối HTX / Quản trị viên
────────                          ──────────                      ─────────────────────────────
login.html (bấm thẻ vai trò → màn hình nhập tài khoản; thẻ Nông dân dẫn sang nong-dan/login.html)
 └▶ nong-dan/index.html (AI-1)      chuyen-gia/consult.html        dashboard.html (chỉ số hệ thống)
 └▶ nong-dan/season.html (giai đoạn)  └▶ AgrBrain AI-3 tóm tắt       └▶ households.html (giám sát hộ)
 └▶ nong-dan/diary.html (nhật ký)      └▶ đổi trạng thái W→S/R        └▶ schedule.html (AI-2 checklist)
      AI-1 chẩn đoán ─────────────▶    chuyen-gia/journal.html          └▶ reports.html (tổng kết, CSV,
 └▶ nong-dan/weather.html (luật +      (duyệt kết quả AI,                 archive)
      lý do)                                sửa độ tin cậy)                └▶ index.html · users.html ·
 └▶ nong-dan/support.html ───gửi──▶   └▶ trả lời ──▶ support.html          settings.html (quản trị)
      (chờ → đã tư vấn → đóng)             (nông dân thấy phản hồi)
```

Chuỗi phân tích đầy đủ (persona → mục tiêu → nhiệm vụ → luồng → màn hình): [`docs/user-analysis.md`](docs/user-analysis.md), [`docs/user-goals-tasks-flows.md`](docs/user-goals-tasks-flows.md).

## Bảng kiểm kê màn hình

**23 màn hình / 24 tệp HTML** (tệp thứ 24 là `giuaki.html`, bản 1 tệp tự chứa của `index.html` dùng cho điểm giữa kỳ — không tính là màn hình). Bảng 13 cột đầy đủ theo Phụ lục B của đề cương: **[`docs/screen-inventory.md`](docs/screen-inventory.md)** — gồm mục tiêu người dùng, nhiệm vụ, tệp, CRUD, trạng thái, AI, người phụ trách, mã TASK, nhánh, trạng thái video OBS, và ánh xạ sang 12 tên tệp nền tảng của đề BTL-04.

| Vai trò | Màn hình (tệp) |
|---|---|
| Nông dân | `nong-dan/index.html` · `season.html` · `diary.html` · `weather.html` · `ai.html` · `support.html` · `settings.html` · `login.html` · `register.html` · `forgot-password.html` |
| Chuyên gia | `chuyen-gia/consult.html` · `journal.html` · `alerts.html` · `library.html` · `experts.html` |
| Điều phối HTX | `households.html` · `schedule.html` · `reports.html` |
| Quản trị viên | `dashboard.html` · `index.html` · `users.html` · `settings.html` |
| Dùng chung | `login.html` (cổng chọn 4 vai trò → màn hình nhập tài khoản + mật khẩu cho 3 vai trò gốc, modal đăng ký) |

**Bao phủ trạng thái** (Bình thường / Đang tải / Rỗng / Thành công / Lỗi / Vô hiệu hóa / Đang chờ / Bị từ chối / Đã lưu trữ) được ghi nhận theo từng màn hình ở cột *Trạng thái* của bảng kiểm kê; skeleton có thật ở `users.html`, `schedule.html`, `chuyen-gia/*`, `nong-dan/login.html`. Màn hình nhập tài khoản trong `login.html` có đủ *Đang tải* (nút bị `disabled` + spinner trong 800 ms giả lập gọi API), *Lỗi* (dòng đỏ dưới từng trường + toast + khung rung) và *Thành công* (ghi phiên rồi chuyển trang).

## Tính năng AI

Cả ba đều **mô phỏng ở Frontend** (luật + JSON giả lập + `setTimeout`), không gọi API, không khóa bí mật. Mỗi tính năng có đủ 6 bước *Nhập → Kiểm tra hợp lệ → Đang xử lý → Kết quả → Giải thích → Chấp nhận/Sửa/Từ chối → Lưu vào ứng dụng* và **có kịch bản thất bại**.

| AI | Tên đề bài | Màn hình | Điểm chính | Khi AI sai/thiếu dữ liệu |
|---|---|---|---|---|
| **AI-1** | Field Issue Classifier | `nong-dan/index.html`, `nong-dan/diary.html`, `nong-dan/ai.html`, duyệt ở `chuyen-gia/journal.html` | phân loại từ mô tả/ảnh, độ tin cậy 72–97 % ổn định theo ảnh (`hashOf()`), giải thích dấu hiệu + phác đồ, lịch sử 20 lần, chat hỏi đáp | `nong-dan/js/ai.js:557` "chưa có câu trả lời chắc chắn" → gợi ý gửi chuyên gia; ca độ tin cậy thấp `journal.js:906` "chưa vượt ngưỡng xử lý" |
| **AI-2** | Season Checklist Generator | `schedule.html` | nhập giống + giai đoạn → tiến trình % → mốc lịch theo đúng chu kỳ trong `js/catalog.js` → "Áp dụng cho toàn HTX" | `js/schedule.js:305`/`:338` `showAiError('AI chưa có dữ liệu chuẩn cho "…"')` khi giống ngoài danh mục |
| **AI-3** | Farm Log Summarizer (AgrBrain) | `chuyen-gia/consult.html`, `chuyen-gia/journal.html`, chuông thông báo 5 trang | đọc `localStorage` của 6 loại dữ liệu, xếp việc ưu tiên + lý do, deep link tới `#alert-1`, `#req-3`, `../users.html?status=pending` | thiếu dữ liệu → `SEED_*`, badge `.ab-count` tự ẩn khi danh sách rỗng, không bịa nội dung |

**Không phải AI (nói rõ để không khai sai):** `nong-dan/weather.html` là **luật if/then trên dữ liệu thời tiết** kèm lý do (`nong-dan/js/weather.js:454`); `#rpSummary` của `reports.html` là **tổng hợp bằng công thức** (`js/reports.js:175`); tab "Mô hình AI" trong `settings.html` chỉ là **form cấu hình**; chỉ số "Tỷ lệ gọi AI thành công" trong `dashboard.html` là **số liệu giả lập**.

## Công nghệ

- **HTML5 ngữ nghĩa:** `header`/`nav`/`main`/`section`/`aside`/`footer`, một `h1` mỗi trang, `label` cho mọi ô nhập, `alt` cho ảnh, `aria-current`, `aria-sort`, `role="tabpanel"`, modal đóng bằng `Esc`.
- **CSS3 tự viết, không framework:** Flexbox, Grid (`minmax(0,1fr)`), biến màu trong `:root` của `css/style.css`, `@media` 900/768 px, `@media print` cho báo cáo. Ba khối giữ CSS riêng (`css/`, `chuyen-gia/css/`, `nong-dan/css/`) với cơ chế class khác nhau (`.nav-item` / `.nav__item` / `.side-link`) nên không đè kiểu.
- **JavaScript thuần:** DOM + `addEventListener`, render từ mảng, validate biểu mẫu, `localStorage`/`sessionStorage`, `MutationObserver`, `Blob` + BOM khi xuất CSV, `location.replace` khi chặn trang. **Không thư viện, không framework, không backend.**
- **Yêu cầu mạng duy nhất của toàn site:** phông `Be Vietnam Pro` qua `fonts.googleapis.com` ở 5 trang `chuyen-gia/`.

### Cấu trúc thư mục

```text
project/
├── README.md
├── docs/
│   ├── project-proposal.md        # Ngữ cảnh, P1-P6, O1-O8, phạm vi + giới hạn
│   ├── user-analysis.md           # Giai đoạn 0: persona + vai trò + ma trận quyền hạn
│   ├── user-goals-tasks-flows.md  # Giai đoạn 0: mục tiêu → nhiệm vụ → luồng
│   ├── screen-inventory.md        # BẢNG KIỂM KÊ MÀN HÌNH 13 cột (23 màn hình) + AI + thực thể
│   ├── roles-and-features.md      # Chức năng đã code, theo từng màn hình
│   ├── team-assignment.md         # Phân công + TASK + trách nhiệm chéo
│   ├── obs-evidence.md            # Danh sách video OBS theo màn hình
│   └── ai-usage-report.md         # Khai báo sử dụng AI + 13 lỗi đã gặp và cách kiểm chứng
├── design/
│   ├── figma-link.txt             # Link Canva 35 trang + tình trạng mockup từng khối
│   └── mockups/                   # Ảnh mockup xuất từ bản thiết kế (README liệt kê 21 ảnh còn thiếu)
├── login.html            # Cổng đăng nhập 4 vai trò + màn hình nhập tài khoản + form đăng ký
├── dashboard.html households.html schedule.html reports.html
├── index.html users.html settings.html giuaki.html
├── css/                  # style.css (dùng chung) + 8 css theo trang + notifications.css
├── js/                   # roles.js (PHÂN QUYỀN) · store.js · catalog.js · session.js ·
│                         # notifications.js · main/dashboard/households/schedule/reports/users/settings.js
├── assets/               # mockup-desktop.png, login-hero.svg, role-*.svg
├── chuyen-gia/           # 5 trang Chuyên gia + css/{style,parts,journal}.css + js/{shell,pages,journal,agrbrain,main}.js + assets/
├── nong-dan/             # 10 trang Nông dân + 12 css + 11 js + assets/ + README.md riêng của SV1
└── THUYET_TRINH_GIUKI.md · MA_CODE_THUYET_TRINH.md · TRALOI_KIEM_TRA_GIUA_KI.md   # hồ sơ bài giữa kỳ (giữ để đối chiếu điểm)
    THUYET_TRINH_CUOIKI_DASHBOARD.md · THUYET_TRINH_CUOIKI_USERS.md               # kịch bản thuyết trình cuối kỳ (TASK-23, TASK-21)
```

Tổng: **24 HTML · 24 CSS · 29 JS** (không kể `docs/`, `design/`, ảnh và video).

## Thành viên nhóm

| Mã | Họ tên | MSSV | Tài khoản GitHub | Phụ trách |
|---|---|---|---|---|
| SV1 | `<Điền trước khi nộp>` | `<…>` | `daohuychien07-dotcom` | Khối Nông dân — `nong-dan/` (10 màn hình) |
| SV2 | `<Điền trước khi nộp>` | `<…>` | `tachisama95-ux` (git name `Thanh Dat`) | Khối Chuyên gia — `chuyen-gia/` (5 màn hình) |
| SV3 | `<Điền trước khi nộp>` | `<…>` | `ducnhatnguyen18-svg` | Khối HTX + Quản trị (8 màn hình), tích hợp, phát hành, hồ sơ |

> Họ tên/MSSV để trống có chủ đích: lịch sử commit dùng tài khoản GitHub và một số commit sớm có `user.name` chưa chuẩn (`Ten Cua Ban`), nên nhóm tự khai và xác nhận trước khi nộp thay vì để tài liệu đoán.

## Phân công công việc

Chi tiết + lát cắt dọc + trách nhiệm chéo: **[`docs/team-assignment.md`](docs/team-assignment.md)**. Bảng TASK (mã việc ↔ màn hình ↔ tệp ↔ người làm ↔ nhánh ↔ OBS): cột *Công việc/Nhánh/OBS* của **[`docs/screen-inventory.md`](docs/screen-inventory.md)** và **[`docs/obs-evidence.md`](docs/obs-evidence.md)**.

Tóm tắt: **TASK-01…10** SV1 · **TASK-11…15** SV2 · **TASK-16…24** SV3. Mỗi thành viên tự làm end-to-end (mockup → HTML → CSS → JS → dữ liệu → responsive → nhánh → commit → OBS). Trách nhiệm chéo: SV3 hệ thống thiết kế + tích hợp/phát hành/QA, SV2 JavaScript/dữ liệu/tương tác AI, SV1 responsive và nội dung ngành cho khối nông dân.

## Quy trình Git

**Repo nộp bài `CSE122-BTL-NGUYENDUCNHAT` (remote `origin`)** — 24 commit trên `main`, 2026-10-08 → 10-24, message mô tả việc bằng tiếng Việt không dấu (tránh lỗi mã hóa trên Windows) và **không dùng tiền tố chuẩn**:

```text
Them khong gian Nong dan (nong-dan/) va noi vao cong dang nhap chung     107a6bc
Phan quyen giao dien theo vai tro: moi vai tro chi thay dung menu        eefcdd7
Gop 2 nha code thanh 1 web 12 trang va kiem duyet lan cuoi               253355b
Sua xuat CSV: them BOM (U+FEFF) de Excel khong dang tieng Viet           277b20c
```

**Repo nhóm `cse122-cropmate-ai` (remote `team`)** — nơi làm việc thật theo nhánh:

| Nhánh | Số commit | Tác giả | Nội dung |
|---|---:|---|---|
| `main` | 7 | `Thanh Dat`, `Ten Cua Ban` | khối Chuyên gia (AgrBrain) |
| `season-dashboard` | 16 | `daohuychien07-dotcom` | khối Nông dân |
| `dev` | 6 (4 commit theo `feat:`/`docs:`) | `ducnhatnguyen18-svg`, `daohuychien07-dotcom` | khung dự án + `docs/` Giai đoạn 0 (`pages/*.html`, mock API) |
| `smartagri` | = `origin/main` | `ducnhatnguyen18-svg` | bản gộp 3 khối, đẩy **fast-forward**, không đụng `main` của nhóm |

```text
Nhánh riêng theo khối → commit → push → đối chiếu/merge → bản gộp trên origin/main → GitHub Pages
```

**Trung thực về giới hạn Git (điểm yếu, chủ động nói khi bị hỏi):**
1. **Conventional Commits mới chỉ ở `team/dev` (4/6 commit).** `origin/main` 24/24 commit và hai nhánh của thành viên **không có tiền tố** `feat:`/`fix:`/`docs:` — từ commit dựng bộ hồ sơ `docs/` này trở đi nhóm chuyển sang `docs:` / `feat:` / `fix:` theo chuẩn.
2. Repo nộp bài chỉ có `main`; `feature/*` và `dev` nằm ở repo nhóm (`season-dashboard`, `smartagri-agrbrain`, `dev`).
3. Repo nộp bài **không có PR** nào; repo nhóm có 1 PR (`#8`, đã đóng, không merge, không có nhận xét review). Đánh giá chéo vì thế chủ yếu qua buổi làm chung và `git diff` khi gộp khối.
4. Commit gộp `nong-dan/` và `chuyen-gia/` vào repo nộp bài do SV3 tạo (chép nguyên tệp), nên "ai viết file nào" phải đối chiếu bằng nhánh gốc + `docs/team-assignment.md`, không đọc từ `origin/main`.
5. Ngày commit trải 2026-10-01 → 10-24; ba commit ngày 10-24 là phần phân quyền + hồ sơ, không phải toàn bộ bài làm dồn ngày cuối.

## Figma / Canva

- **Bản thiết kế của 8 trang gốc (SV3): Canva 35 trang** — sitemap, user flow, mockup desktop + mobile, thành phần, trạng thái loading/rỗng/lỗi, mockup tương tác AI: https://canva.link/j66tusfj3cbdckv (mở công khai "Anyone with the link can view").
- Ảnh mockup xuất trực tiếp đã commit: `design/mockups/01-admin-crop-catalog-desktop.png` (nguồn: `assets/mockup-desktop.png`).
- Quy trình: đọc mockup Canva → **tự viết khung xương HTML ngữ nghĩa** → CSS theo token `:root` → JavaScript. Không có trang nào "dán ảnh AI sinh rồi code theo ảnh".
- **Thiếu:** 10 trang `nong-dan/` và 5 trang `chuyen-gia/` **chưa có link thiết kế trong repo** (`nong-dan/README.md` còn nguyên chỗ trống `<DÁN LINK FIGMA VÀO ĐÂY>`). Việc cần làm trước khi nộp: xem `design/figma-link.txt` mục 2–3 và `design/mockups/README.md` (danh sách 21 ảnh mockup còn thiếu).

## Demo

**Online (GitHub Pages, build từ `origin/main`):** https://ducnhatnguyen18-svg.github.io/CSE122-BTL-NGUYENDUCNHAT/login.html — không cần tải code, deep link `?status=pending`, `?health=alert`, `#alert-1` hoạt động, console sạch, không 404.

**Chạy cục bộ:**

```bash
python -m http.server 8000
# mở http://localhost:8000/login.html
```

Mở trực tiếp tệp `.html` vẫn chạy được, nhưng nên dùng máy chủ tĩnh vì `file://` làm mất query string của deep link và `localStorage` bị tách theo origin. Python chỉ để xem thử, không phải một phần bài nộp.

**Tài khoản demo (2 bước đăng nhập).** `login.html` là cổng chung: bấm một thẻ vai trò → hiện màn hình nhập tài khoản/mật khẩu của vai trò đó (nút "Điền nhanh" đổ sẵn ô demo để khỏi gõ lúc thuyết trình). Dự án không có backend nên tài khoản là mảng giả lập `DEMO_ACCOUNTS` trong `js/login.js:27`, chỉ dùng cho buổi demo:

| Vai trò | Thẻ bấm ở `login.html` | Tài khoản | Mật khẩu | Trang nhà sau khi đăng nhập |
|---|---|---|---|---|
| Quản trị viên | **Quản trị viên** | `quantri` | `admin2026` | `dashboard.html` (12 mục menu) |
| Điều phối HTX | **Điều phối Hợp tác xã** | `dieopho` | `htx2026` | `households.html` (8 mục menu) |
| Chuyên gia | **Chuyên gia nông nghiệp** | `chuyengia` | `agri2026` | `chuyen-gia/consult.html` (4 mục menu) |
| Nông dân | **Nông dân** | — | — | thẻ dẫn thẳng sang `nong-dan/login.html`, form đăng nhập riêng của SV1 (`nongdan` / `123456`) → `nong-dan/index.html` (7 mục menu) |

**Luồng demo liền mạch 6 phút (đề xuất):** `login.html` chọn Quản trị viên → nhập `quantri` / `admin2026` → `dashboard.html` (chờ duyệt tính từ kho đăng ký thật) → `users.html?status=pending` → `households.html?health=alert` → `schedule.html` chạy AI-2 tới **trạng thái lỗi** rồi áp dụng checklist → `reports.html` xuất CSV → `index.html` thêm + ngừng dùng một cây trồng → Đăng xuất → chọn **Nông dân** → `nong-dan/ai.html` chạy AI-1 → `support.html` gửi yêu cầu → Đăng xuất → chọn **Chuyên gia** → `chuyen-gia/consult.html` mở AgrBrain (AI-3) → `journal.html` duyệt và sửa kết quả AI.

**Kết quả kiểm thử đã thực hiện**

| Hạng mục | Cách kiểm | Kết quả |
|---|---|---|
| Màn hình nhập tài khoản (đăng nhập 2 bước ở `login.html`) | điều khiển DOM qua iframe cùng origin trên `http://127.0.0.1:8128`, đo ngày 26-10-2026 | bấm thẻ → khung hiện, lưới vai trò ẩn (`display: none`), tiêu đề đúng vai trò, ô "demo" hiện `quantri/admin2026` · để trống rồi gửi: 2 dòng "Bạn chưa nhập tài khoản/mật khẩu." và không ghi phiên · sai mật khẩu: dòng "Sai tài khoản hoặc mật khẩu. Xem lại dòng demo bên dưới." + toast + khung rung, `localStorage` vẫn `null` · đang gửi: nút `disabled`, nhãn "Đang đăng nhập..." + spinner · đúng: phiên có thêm khoá `user` rồi chuyển trang — admin → `/dashboard.html` (12 mục menu hiện, chip "QT Quản trị viên", `h1` "Bảng điều khiển hệ thống"), coop → `/households.html` (8 mục), expert → `/chuyen-gia/consult.html` (4 mục `.nav__item`) · thẻ Nông dân giữ `href="nong-dan/login.html"` (form riêng của SV1) · Esc và nút "Quay lại chọn vai trò" đóng khung · "Điền nhanh" đổ đúng cặp demo · `scrollWidth − clientWidth = 0` ở 320/375/768/1280 px khi khung đang mở và đang hiện lỗi · console sạch |
| Phân quyền 4 vai trò | nạp từng trang trong iframe cùng origin qua `http://127.0.0.1:8123`, đếm mục menu theo computed-style (đi hết chuỗi phần tử cha) | admin 12/12, coop 8 (+3 nhãn nhóm, 7 link bị ẩn), expert 4 (26 phần tử ẩn), farmer 7/7 — đúng như bảng vai trò |
| Chặn trang ngoài phạm vi | gõ URL tay sau khi đăng nhập vai trò khác | coop → `index.html`/`users.html`/`settings.html`/`experts.html`/`nong-dan/*` bị đưa về `households.html`; expert mở `dashboard.html` → `consult.html`; farmer mở `chuyen-gia/consult.html` → `nong-dan/index.html` |
| Phiên & đăng xuất | đọc `localStorage`/`sessionStorage` sau khi bấm Đăng xuất | cả ba nơi lưu bị xóa, không xem lại trang cũ bằng nút Back |
| Liên kết | sinh 128 link `.html` từ DOM của 12 trang khối gốc + Chuyên gia | 0 link hỏng, 0 lỗi 404; deep link `#alert-1`, `#req-1`, `#req-3`, `#doc-10`, `#journalForm` đều tìm thấy và sáng `is-target` |
| Console & tài nguyên | mở console từng trang | sạch trên **24/24 HTML**, không thiếu CSS/JS/ảnh |
| Tràn ngang | `scrollWidth − clientWidth` trong iframe cùng origin; xác minh bằng `window.scrollTo(30,0)` rồi đọc `scrollX` | `= 0` ở 1280 px trên mọi trang đã nạp; khối gốc + Chuyên gia đo thêm ở 336 px: 12/12 không tràn; khối `nong-dan/` đo ở **320 px và 375 px**: **8/10 trang = 0 px**, còn `diary.html` tràn 39 px ở 320 px và `login.html` tràn 18 px ở cả hai bề rộng (chi tiết trong phần giới hạn ngay dưới) |
| Tính bền dữ liệu | F5 sau Thêm/Sửa/Archive | còn nguyên (`localStorage`) |
| An toàn theo quy chế (VP-01/VP-02) | quét mẫu secrets toàn repo; nhập Họ tên chứa `<img onerror>` rồi gửi đăng ký, mở Dashboard + `users.html?status=pending` | `sk-demo` = 0 kết quả ngoài khai báo ô rỗng; `smartagri_settings_v1` không chứa `apiKey`; payload hiển thị nguyên văn dạng text, 0 thẻ `img` chạy trên 3 trang |

**Đo vỡ layout 320 / 375 px cho khối `nong-dan/` (đo ngày 24-10-2026, cùng phương pháp iframe):** 8/10 trang sạch ở cả hai bề rộng — `index`, `season`, `weather`, `ai`, `support`, `settings`, `register`, `forgot-password` đều `scrollWidth − clientWidth = 0`. Hai trang còn tràn thật (bấm `scrollTo(30,0)` thì `scrollX` khác 0, không phải giả dương do thanh cuộn):

| Trang | Mức tràn (bề rộng nội dung 305 px ở khung 320 px) | Phần tử đo được | Nguyên nhân trong CSS | Bản sửa một dòng |
|---|---|---|---|---|
| `nong-dan/diary.html` | 39 px ở 320 px; 0 px ở 375 px | `li.entry` mép phải 344 px, `div.entry-body` phải 344 px | lưới `.entry` cột `76px 18px 1fr` (`nong-dan/css/diary.css:566`, bản mobile `64px 14px 1fr` ở `:875`); cột `1fr` không co dưới chiều rộng tối thiểu của nội dung | thêm `min-width: 0` cho `.entry-body` (`:619`) hoặc đổi cột cuối thành `minmax(0, 1fr)` |
| `nong-dan/login.html` | 18 px ở cả 320 px và 375 px | `svg.deco-branch` mép phải 323 px (khung 320) / 378 px (khung 375) | ảnh trang trí đặt `right: -18px` (`nong-dan/css/login.css:331-333`) trong khi `overflow-x: hidden` chỉ áp cho `body.login-body` (`:33`), còn `html` vẫn `visible` | chuyển `overflow-x: hidden` lên `html`, hoặc để `right: 0` cho `.deco-branch` |

Hai dòng CSS trên thuộc khối màn hình do thành viên phụ trách, nên nhóm chỉ đo, định vị và ghi nguyên văn đường dẫn dòng thay vì tự sửa (giữ đúng ranh giới sở hữu file ở `docs/team-assignment.md`).

**Chưa kiểm chứng (nói rõ):** bảng Trello/Jira công khai chưa có (bảng TASK hiện nằm trong `docs/`); 21/23 video OBS chưa quay.

## Minh chứng OBS

Quy tắc: **1 màn hình trong bảng kiểm kê = 1 video OBS có mặt sinh viên, có sửa code trực tiếp và có bước commit.**

| | Số lượng |
|---|---:|
| Màn hình trong bảng kiểm kê | **23** |
| Video đã có | **2** |
| Video còn thiếu | **21** |

- `youtu.be/r-eW5GXDfPM` — SV1, khối Nông dân (`nong-dan/index.html` + các trang chức năng).
- `youtu.be/SiAEbIB4Tos` — SV3, `index.html` (bản giữa kỳ ~3 phút, chưa đủ 8 ý của quy chế cuối kỳ).

Bảng đối chiếu TASK ↔ màn hình ↔ tên file video (`SV?-<NN>-<ten>.mp4`) ↔ trạng thái ↔ link, kèm 8 nội dung bắt buộc trong mỗi video và checklist rà trước khi nộp: **[`docs/obs-evidence.md`](docs/obs-evidence.md)**.

Kịch bản thuyết trình + checklist quay đã soạn sẵn cho 2 màn hình của SV3: **[`THUYET_TRINH_CUOIKI_DASHBOARD.md`](THUYET_TRINH_CUOIKI_DASHBOARD.md)** (TASK-23, ~454 từ ≈ 3'47") và **[`THUYET_TRINH_CUOIKI_USERS.md`](THUYET_TRINH_CUOIKI_USERS.md)** (TASK-21, ~470 từ ≈ 3'55"). **Video của hai màn hình này vẫn chưa quay** (nằm trong 21 video còn thiếu ở bảng trên); con số đọc trong hai bài là kết quả chạy thật trên máy ngày 25-10-2026 với `js/dashboard.js` / `js/users.js` đang có trong repo, không phải số ước lượng.

## Khai báo sử dụng AI

Toàn bộ khai báo theo mẫu Phụ lục F — công cụ, 7 prompt chính, phần AI sinh vs phần sinh viên sửa, **13 lỗi AI thật đã gặp** (sed làm hỏng cú pháp `agrbrain.js` mà không báo lỗi; chữ Hán lẫn vào văn bản tiếng Việt; mojibake `perl -CSD`; `requestAnimationFrame` không chạy ở tab nền; `grid repeat(7,1fr)` vỡ ở 336 px; CSV thiếu BOM; khai quá "AI" cho những chỗ chỉ là công thức JS; để lộ chuỗi trông như API key; ghép HTML chưa escape và **lỗi cùng loại còn sót ở trang thứ hai**; đề xuất tách thêm tệp HTML mới cho bước nhập tài khoản — trái quy tắc "1 màn hình = 1 video OBS" và dễ bị coi là trang rác; tài liệu chép sai tên thẻ đăng nhập thành "Quản trị hệ thống" trong khi thẻ thật là "Quản trị viên" …), cách kiểm chứng và bài học: **[`docs/ai-usage-report.md`](docs/ai-usage-report.md)**.

Hai rủi ro quy chế từng được rà ra bằng chính bảng kiểm kê; **cả hai đã sửa xong ngày 2026-10-24** và có kết quả kiểm chứng kèm theo:

| Quy chế | Vị trí cũ | Vấn đề AI để lại | Đã sửa thành | Kết quả kiểm (iframe cùng origin, `http://127.0.0.1:8124`) |
|---|---|---|---|---|
| **VP-01** (để lộ API key, -1.50) | `settings.html:189` | AI điền sẵn `value="sk-demo-1234567890"` — không phải key thật nhưng trông như key, và `js/settings.js` còn ghi nó vào `localStorage` | Ô để trống `value=""` + `placeholder="(không dùng trong bản demo)"` + `data-secret="true"`; `js/settings.js:19-26` loại trường `data-secret` ra khỏi object lưu, `js/settings.js:29-31` xóa khóa khỏi form khi khôi phục mặc định | Giá trị khởi tạo `""`; tìm `sk-demo` trong DOM = **0**; bấm **Lưu cấu hình** → `smartagri_settings_v1` có **21** khóa cấu hình, **không có** `apiKey`; tải lại trang ô vẫn trống |
| **VP-02** (XSS do ghép HTML, -1.00) | `js/login.js:140`, `js/dashboard.js:92` | `note.innerHTML = '…<strong>' + name + '</strong>…'` với `name` lấy thẳng từ ô nhập; bảng nhật ký Dashboard cũng chèn `${l.text}` chưa escape (mục đầu tiên lấy Họ tên từ hồ sơ đăng ký) | `showSentNote()` dựng DOM từng nút bằng `createElement` + `textContent` (`js/login.js:139-158`); Dashboard thêm `escapeHtml()` cùng quy tắc với `js/users.js:57` rồi áp cho chuỗi động (`js/dashboard.js:42`, `:96`) | Nhập Họ tên `<img src=x onerror="window.__xssFired=1">Ab` rồi gửi đăng ký: `#sentNote` hiển thị **đúng nguyên văn chuỗi**, `img` bên trong = **0**, `window.__xssFired` = **undefined**; Dashboard và `users.html?status=pending` cũng hiển thị dạng text, 0 thẻ img, console sạch |

Quét lại toàn repo theo mẫu `sk-[a-z0-9]{8,} | api_key=… | Bearer … | AIza | ghp_ | AKIA`: chỉ còn đúng 1 kết quả là dòng khai báo ô `apiKey` **rỗng** ở `settings.html:189`. Khối `chuyen-gia/` và `nong-dan/` (mã của bạn) không ghép dữ liệu người dùng vào `innerHTML` — nội dung tự do đều đi qua `textContent` (ví dụ `nong-dan/js/support.js:352`, `chuyen-gia/js/journal.js:796`), nên không sửa mã của bạn ở phần này.

Mọi tính năng AI của dự án là **mock ở Frontend**; **không có** lời gọi LLM/API bên trong, **không có** khóa bí mật nào trong mã.

