# KỊCH BẢN THUYẾT TRÌNH CUỐI KỲ — BÀI 2/2
## Trang: Quản lý tài khoản người dùng (`users.html`) — CropMate AI / SmartAgri

> **Nhịp đọc:** ~2 từ/giây. Số từ **đếm thật bằng `perl` trên các đoạn nói trong ngoặc kép** (lệnh đếm ở mục 9): 69 + 60 + 64 + 170 + 107 = **470 từ ≈ 3 phút 55 giây** phần lời, cộng thao tác demo và đoạn commit → video ~4 phút 40, vẫn trong khoảng 3–5 phút của quy chế (`docs/obs-evidence.md` mục 1).
> Muốn gọn **422 từ ≈ 3 phút 31**: bỏ 3 câu ✂ ở mục 0 (đếm riêng: 15 + 13 + 20 = 48 từ).
> Màn hình: hàng **21** trong `docs/screen-inventory.md` · công việc **TASK-21** · video `SV3-06-admin-user-management.mp4`.
> Bài này nối tự nhiên với bài 1 (`THUYET_TRINH_CUOIKI_DASHBOARD.md`): dashboard **đếm** hồ sơ chờ duyệt, còn trang này là nơi **xử lý** hồ sơ đó.
> Câu nào ứng với dòng code nào: mỗi đoạn nói có dòng "Nhảy tới" chỉ đúng `file:dòng` đã mở kiểm tra.
> Mọi trích dẫn `(file:dòng)` đã mở file kiểm tra lại.

---

## 0. Chuẩn bị trước khi bấm REC (OBS)

**4 cảnh:** ① `users.html` trên trình duyệt (phần 1, 3, 5) · ② Canva (phần 2) · ③ VS Code mở `users.html` + `css/users.css` + `js/users.js` + `js/store.js`, font 16–18 px · ④ webcam (bắt buộc).

**Kiểm trước khi quay**
- [ ] Đăng nhập **2 bước** ở `login.html`: bấm thẻ **Quản trị viên** → nhập `quantri` / `admin2026` → vào `users.html`, menu hiện đủ 12 mục của admin.
- [ ] **Tạo sẵn 1 hồ sơ đăng ký thật**: ở `login.html` điền Họ tên / Email / SĐT rồi gửi, sau đó mở `users.html` → hồ sơ xuất hiện **trên cùng** với nhãn "Mới đăng ký". Đây là chi tiết ăn điểm "luồng dữ liệu thật, không lorem-ipsum".
- [ ] F5 một lần, Console sạch trước khi nói phần 3.
- [ ] 1920×1080, 30 fps; cửa sổ ẩn danh hoặc cổng server mới để không chạy JS bản cache.
- [ ] **Con số đã đo thật trên máy** (với 12 tài khoản mẫu + 1 hồ sơ đăng ký em tạo lúc chuẩn bị): trang 1 = **10 dòng**, chân trang "Hiển thị 1 đến 10 của 13 người dùng"; tìm 'cường' = **1 dòng**; lọc 'Đang chờ duyệt' = **5 dòng** (4 mẫu + hồ sơ của em, hàng đầu có nhãn 'Mới đăng ký'); trang 2 = **3 dòng**, chân trang "Hiển thị 11 đến 13 của 13 người dùng"; bấm Duyệt → toast "Đã phê duyệt tài khoản" và hồ sơ trong `localStorage` chuyển `status: "active"`, mở Dashboard thấy số chờ duyệt giảm **19 → 18**.
- [ ] nói chậm ở 3 giây đầu: skeleton chỉ hiện **800 ms** (`js/users.js:270-271`) — quay màn hình nhanh qua hoặc bấm "Làm mới" để skeleton hiện lại.

**8 ý quy chế phải có trong video**
- [ ] ① Mặt + giọng. ② Mở Canva đúng màn hình. ③ Mở đủ 4 tệp (`users.html`, `css/users.css`, `js/users.js`, `js/store.js`).
- [ ] ④ Giải thích bố cục & logic, không đọc lại mô tả.
- [ ] ⑤ **Sửa trực tiếp 1 chi tiết:** mở `js/users.js:39`, đổi `pageSize: 10` thành `pageSize: 5` → Lưu → F5 → bảng còn 5 dòng, thanh phân trang tự sinh **3 nút trang**. Nói 1 câu: "số trang tính từ dữ liệu đã lọc, không viết cứng."
- [ ] ⑥ Chạy tương tác: tìm kiếm, lọc, phân trang, duyệt/khóa, Escape đóng modal.
- [ ] ⑦ `git add js/users.js` + `git commit` + `git push origin main`.
- [ ] ⑧ Cuối video đọc to: "**TASK-21**, nhánh **main**, commit **`<hash>`**."

- [ ] Tên file: `SV3-06-admin-user-management.mp4`.

**✂ Ba câu bỏ được nếu tập dượt thấy quá 4 phút** (đếm 15 + 13 + 20 = **48 từ**, không mất ý chấm điểm):
1. Phần 1 — câu cuối: *"Bài trước em đếm hồ sơ chờ duyệt; đây là nơi em xử lý chúng."*
2. Phần 4 CSS — câu cuối: *"Bốn vai trò có bốn màu `role-tag`; skeleton dùng shimmer và spinner quay."* (hai thứ này thầy cô nhìn thấy trên màn hình ở phần 5).
3. Phần 5 — bước *"Phân trang — em bỏ lọc, bấm trang 2, chân trang chuyển thành 'Hiển thị 11 đến 13 của 13'."* (đã giải thích `state.pageSize` ở phần 4).

---

## 1. GIỚI THIỆU (69 từ ≈ 35 giây)

> *[Cảnh: `users.html` toàn màn hình]*

"Xin chào, em tên **[Tên]**, MSSV **SVxx**. Trong hệ thống **CropMate AI — SmartAgri**, em phụ trách khối quản trị, và màn hình này là **Quản lý tài khoản người dùng** `users.html`: tìm và lọc tài khoản, **duyệt hồ sơ đăng ký mới**, khóa tài khoản vi phạm, đổi vai trò. Bài trước em đếm hồ sơ chờ duyệt; đây là nơi em xử lý chúng."

---

## 2. BẢN MÔ PHỎNG CANVA (60 từ ≈ 30 giây)

> *[Cảnh: Canva, zoom toolbar → bảng → modal]*

"Trong bộ Canva 35 trang của khối quản trị, màn hình này có bốn thành phần: **thanh công cụ** với ô tìm kiếm và hai bộ lọc Vai trò, Trạng thái; **bảng tám cột** từ avatar tới thao tác; **dải phân trang** kèm chọn số dòng; và **hai modal** — khóa tài khoản có lý do bắt buộc, đổi vai trò."

---

## 3. SẢN PHẨM (64 từ ≈ 32 giây)

> *[Cảnh: trang web, chuột lướt từng vùng]*

"Đây là trang em code từ bản đó: bảng tám cột **render từ JavaScript**, `tbody` trong HTML để trống. Danh sách gồm 12 tài khoản mẫu **cộng hồ sơ đăng ký thật** gửi từ cổng đăng nhập — hiện lên đầu với nhãn 'Mới đăng ký'. Mở trang có **skeleton loading**, lọc không ra có **empty state**, Console **không lỗi đỏ**."

---

## 4. HTML / CSS / JAVASCRIPT (170 từ ≈ 85 giây)

> *[Cảnh: VS Code]*

**HTML**

"Vẫn là **semantic HTML**: `section.users-toolbar` chứa ô tìm kiếm và hai `select` có `label` và `aria-label`; `section.table-card` chứa `table` với `thead` tám cột và `tbody` **rỗng**; `div.table-foot` chứa dải phân trang. Hai modal là `div.modal-backdrop` có `role=dialog` và `aria-modal`, form mang `novalidate` vì em tự kiểm tra bằng JavaScript."

> Nhảy tới: `users.html:130-164` toolbar → `187-202` bảng + `:201` `tbody#userTbody` trống → `206-218` phân trang (`:212` `selected`) → `223-245` modal khóa (`:233` `novalidate`, `:237` `.err-msg`) → `248-274` modal vai trò → `11-16` bốn script `defer`.

**CSS**

"`users.css` chỉ viết phần riêng, cái dùng chung đã có trong `style.css`. Toolbar là **Flexbox** `flex-wrap`. Bảng giữ `min-width: 900 pixel` và thẻ bọc ngoài `overflow-x: auto`, nên trên mobile bảng **cuộn ngang trong khung** chứ không vỡ layout. Bốn vai trò có bốn màu `role-tag`; skeleton dùng shimmer và spinner quay."

> Nhảy tới: `users.css:9-17` toolbar (`14` `flex: 1; min-width: 240px`) → `44` `#userTable { min-width: 900px }` → `151-157` media 768 (`155` `.table-card { overflow-x: auto }`) → `67-75` bốn `role-tag` → `101-111` skeleton/spinner/shimmer → `114-117` empty state → `120-134` pager (`132` `.pg-btn.active`) → `style.css:265-271` `.modal-backdrop.open`, `:292-294` `.form-field.error` hiện `.err-msg`.

**JavaScript**

"Một object `state` duy nhất giữ từ khóa, bộ lọc, trang hiện tại, số dòng mỗi trang và **tập id đã chọn**; thay đổi gì cũng chỉ sửa `state` rồi gọi lại `render()`. `render()` lọc bằng `getFiltered()`, cắt theo trang, và **mọi chuỗi động đi qua `esc()`**. Nút trên mỗi dòng sinh theo trạng thái bằng `actionsFor()`, sự kiện bắt qua **event delegation** trên `tbody`."

> Nhảy tới: `users.js:8-21` mảng mẫu → `24-29` `mergeRegistrations` → `32-36` `persistIfRegistered` → `39` `state` → `70-78` `getFiltered` → `81-129` `render` (`57` `esc`, `97-100` cắt trang, `109-123` sinh dòng) → `131-142` `actionsFor` → `294-303` delegation → `store.js:9` khóa `smartagri_registrations_v1`, `:22-27` `add` `unshift`, `:30-37` `patch`.

---

## 5. DEMO TRỰC TIẾP (107 từ ≈ 54 giây lời nói + ~20 giây thao tác)

> *[Cảnh: trang web — vừa làm vừa nói]*

"**Tìm kiếm** — em gõ 'cường', bảng còn đúng một dòng.
**Lọc** — em chọn 'Đang chờ duyệt': còn năm dòng, hồ sơ em vừa đăng ký nằm **trên cùng** với nhãn 'Mới đăng ký'.
**Phân trang** — em bỏ lọc, bấm trang 2, chân trang chuyển thành 'Hiển thị 11 đến 13 của 13'.
**Duyệt** — em bấm Duyệt: badge thành 'Đang hoạt động', toast hiện, mở lại Dashboard thấy số chờ duyệt giảm một.
**Khóa có kiểm tra** — em bấm Khóa, để trống lý do thì form báo lỗi đỏ; nhập lý do mới khóa được. Em bấm **Escape**, modal đóng.
Em xin hết, cảm ơn thầy cô."

> Thao tác ~4 giây/bước. Con số **13** là 12 tài khoản mẫu + 1 hồ sơ em đăng ký lúc chuẩn bị; nếu em đăng ký thêm thì đọc lại theo số hiện trên chân trang, đừng giữ cứng.
> Nếu cháy giờ: bỏ bước Phân trang (ý đã có khi giải thích `state.pageSize` ở phần 4).

---

## 6. Nói trước cho trung thực (nếu thầy cô hỏi thì đã có sẵn)

- **12 dòng trong bảng là dữ liệu mẫu** em tự viết theo ngữ cảnh nông nghiệp (`js/users.js:8-21`), không phải lorem-ipsum; **hồ sơ mới đăng ký là dữ liệu thật** do người dùng nhập ở `login.html`, lưu trong `localStorage`.
- **Dòng chữ "Đang tải danh sách hơn 1.000 người dùng..."** (`js/users.js:156`) là **nhãn mô phỏng trạng thái loading**, không phải số liệu thật — em nói rõ để không hiểu lầm.
- **Tải trang `setTimeout` 800 ms** (`js/users.js:270-271`): chưa có backend nên em giả lập độ trễ để show skeleton.
- **Duyệt/khóa/đổi vai trò chỉ ghi vào kho hồ sơ trong trình duyệt** (`js/users.js:32-36`), chưa có server nên **không đổi quyền thật khi đăng nhập** và F5 máy khác là mất.
- Trang này **không có tính năng AI** — vai trò của nó là kiểm soát dữ liệu nền cho ba màn hình AI.

---

## 7. Câu trả lời nhanh khi GV hỏi sâu

- **"`innerHTML` vậy có sợ chèn HTML lạ không?"** *(users.js:57, dùng ở 114-120)* → Mọi chuỗi lấy từ dữ liệu đều qua `esc()` thay `& < > "` thành ký tự HTML, nên Họ tên có ngoặc nhọn vẫn hiện nguyên văn dạng chữ.
- **"Vì sao gắn trình nghe trên `tbody` mà không gắn từng nút?"** *(users.js:294-303)* → Vì bảng vẽ lại từ đầu mỗi lần `render()`; delegation một lần cho `tbody` nên nút mới sinh vẫn bắt được sự kiện.
- **"Deep link `?status=pending` hoạt động thế nào?"** *(users.js:266-267)* → Đọc `URLSearchParams`, đối chiếu `STATUS_META` rồi ghi vào `state` và `select` trước khi render — đây là link Dashboard và cổng đăng nhập trỏ sang.

---

## 8. Dán vào README khi nộp

- **Link video:** *(dán sau khi upload — YouTube Unlisted)*
- **Tên video:** `SV3-06-admin-user-management.mp4` · **TASK-21** · màn hình `users.html`
- **Nhánh:** `main` (repo nộp bài `CSE122-BTL-NGUYENDUCNHAT`) · **Commit:** `<hash thật trong git log>`
- **Trạng thái trong `docs/obs-evidence.md`:** đổi hàng TASK-21 từ **CẦN QUAY** → **ĐÃ CÓ** + dán link.

---

## 9. Tự kiểm độ dài trước khi quay

Chạy lệnh này trong thư mục repo để đếm lại số từ phần nói — in số từ từng đoạn nói rồi tổng, khớp các con số ở mục 1–5 (dấu "—" không tính là một từ):

```bash
perl -CSD -Mutf8 -0777 -ne 'my @b = /(?m)^"(.*?)"(?=\n)/gs; my $t = 0;
  for my $i (0..$#b) { my $s = $b[$i]; $s =~ s/[*\x{2014}]/ /g;
    my @w = grep { /\S/ } split(/\s+/, $s); printf "doan %d: %d\n", $i + 1, scalar @w; $t += @w }
  print "TONG: $t\n"' THUYET_TRINH_CUOIKI_USERS.md
```

Kết quả trên máy ngày 25-10-2026: `doan 1..7 = 69 60 64 51 52 67 107`, `TONG: 470` (ba đoạn 4–5–6 là HTML/CSS/JS của mục 4, cộng lại 170).

Đổi tên file trong lệnh thành `THUYET_TRINH_CUOIKI_DASHBOARD.md` để kiểm bài 1: `77 67 59 44 62 56 89`, `TONG: 454`.
