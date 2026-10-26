# Khai báo sử dụng AI — CropMate AI (SmartAgri)

> **Mục đích:** khai trung thực theo mẫu Phụ lục F của đề cương (Công cụ / Câu lệnh / AI sinh ra / Sinh viên chỉnh sửa / Cách kiểm chứng / Điều học được) và phân biệt rõ **tính năng mô phỏng** với **API thật**.
> Tài liệu này do AI soạn thảo từ **lịch sử commit thật** và **kết quả kiểm chứng đo được**; sinh viên đã đọc và chịu trách nhiệm về nội dung.

---

## 1. Công cụ AI đã dùng

| Công cụ | Dùng cho | Không dùng cho |
|---|---|---|
| **Qoder** (trợ lý lập trình trong IDE, có quyền đọc/ghi file và chạy lệnh) | Khung xương HTML/CSS/JS của từng trang, sinh dữ liệu mẫu tiếng Việt theo ngành nông nghiệp, viết `js/roles.js`, dò lỗi cú pháp, soạn `docs/` + README | Không gọi mô hình nào từ trong sản phẩm; không tự quyết định phạm vi màn hình |
| **Git / GitHub** (không phải AI, nhưng là công cụ kiểm chứng) | đối chiếu `git diff`, `git log` khi nghi ngờ AI sửa hỏng file | — |
| **DevTools + iframe tự tạo + `python -m http.server`** | đo `scrollWidth − clientWidth`, đọc console, thử deep link | — |

## 2. Câu lệnh (prompt) chính đã dùng

| # | Câu lệnh tóm tắt | Kết quả mong muốn | Kết quả thật nhận được |
|---|---|---|---|
| 1 | "Tái tạo mockup Canva này thành trang HTML, tách 3 tệp html/css/js, dùng chung bảng màu" | trang quản trị danh mục cây trồng | `index.html` + `css/*.css` + `js/main.js` — đạt, nhưng phải tự soát lại thẻ ngữ nghĩa và `alt`/`label` |
| 2 | "Thêm trang Tổng quan nông hộ / Lịch trình / Báo cáo theo mockup HTX" | 3 trang dùng chung `js/catalog.js` | đạt; phát sinh ràng buộc **tên giống cây trong dữ liệu mẫu phải khớp `catalog.js`** (nếu không, bộ lọc trả kết quả rỗng) |
| 3 | "Liên kết tất cả các nhánh lại với nhau để tạo thành 1 web hoàn chỉnh" | một site duy nhất, menu thống nhất | 12 trang một menu + cầu nối phiên; nhưng **không có framework**, menu phải khai báo ở 3 nguồn → tự viết lại `SA_NAV` và các `<ul>` tĩnh |
| 4 | "Sửa lại: khi đăng nhập vào đâu thì chỉ xuất hiện giao diện đó" | phân quyền giao diện theo vai trò | `js/roles.js` (298 dòng): lọc menu + chặn trang theo `PATH_KEY` |
| 5 | "Khối nông dân đã có trên GitHub, đưa vào dùng cổng đăng nhập chung" | 10 trang `nong-dan/` + login chung | đạt; 3 tệp CRLF phải xử lý bằng `sed` có `\r?` |
| 6 | "Đọc file barem và lập bộ hồ sơ docs/" | `docs/` + README 15 mục | chính tài liệu này |
| 7 | "Sửa lại cho tôi, khi ấn đăng nhập thì sẽ hiển thị ra màn hình đăng nhập" | cổng 4 vai trò → có bước nhập tài khoản/mật khẩu | khung nhập tài khoản **ngay trong `login.html`** (`#credPanel`) + `DEMO_ACCOUNTS` trong `js/login.js`; thẻ Nông dân giữ form riêng của SV1 (`nong-dan/login.html`) vì khối đó bạn phụ trách — phương án này đạt vì **không có backend**, chỉ là đăng nhập giả lập phía Frontend |
| 8 | "tại sao ở giao diện đăng nhập với tư cách lại thòi ra đăng nhập quản trị viên, thêm cho tôi phần quên mật khẩu ở mỗi trag đăng nhập" | giải thích được vì sao khung bước 2 hiện sớm + có luồng quên mật khẩu mà **không sinh thêm màn hình** | AI tìm ra nguyên nhân CSS (mục 4, lỗi 14) và dựng khối `#resetPanel` 2 bước trong cùng `login.html`; khối `nong-dan/` **đã có** `forgot-password.html` riêng của SV1 nên không sửa mã của bạn, `chuyen-gia/` không có trang đăng nhập (đăng nhập bằng cổng chung) nên cổng chung là nơi duy nhất cần thêm |

## 3. Phần AI sinh ra và phần sinh viên chỉnh sửa

| Thành phần | AI sinh | Sinh viên sửa / tự viết | Bằng chứng |
|---|---|---|---|
| Bộ 8 trang quản trị (HTML/CSS/JS) | khung lặp, class, biểu mẫu | cấu trúc lại heading, thêm `label`/`alt`/`aria-*`, đổi màu theo token `:root`, tự viết nội dung nghiệp vụ tiếng Việt | `git log` các commit `feat:` trên `origin/main` |
| `js/roles.js` (phân quyền) | bản đầu dùng `requestAnimationFrame` để chờ menu | **bản hiện tại áp dụng đồng bộ** + `MutationObserver` + `guardPage()`; sinh viên phát hiện rAF không chạy | comment `js/roles.js:244` |
| `login.html` bước 2 (nhập tài khoản) + khối Quên mật khẩu | khung form + CSS panel + handler submit + 2 bước đổi mật khẩu | quyết định **dựng panel trong cùng trang** thay vì tệp mới (mục 4, lỗi 12), giữ nguyên form của SV1 cho vai trò Nông dân, thêm `aria-describedby` cho từng dòng lỗi, `aria-pressed` cho nút hiện mật khẩu, `Esc` ưu tiên đóng modal → khối quên mật khẩu → khung đăng nhập; phát hiện và sửa `hidden` bị `display:flex` đè (mục 4, lỗi 14) | `login.html` (`#credPanel`, `#resetPanel`), `css/login.css` (khối `.cred-*`, `.fp-*`, `[hidden]{display:none!important}`), `js/login.js:20-364`; kết quả chạy thật ghi ở mục 5 bước 8 và 9 |
| `js/schedule.js` — AI-2 checklist | danh sách công việc mẫu | ràng buộc kiểm tra giống cây với `js/catalog.js`, luồng lỗi, nút chấp nhận/sửa/hủy | `js/schedule.js:305`, `:338` |
| `nong-dan/js/ai.js` — AI-1 | bộ luật từ khóa → bệnh cây | hàm `hashOf()` để **cùng một ảnh luôn cho cùng kết quả**, khoảng tin cậy 72–97 %, câu trả lời "chưa chắc chắn" | `nong-dan/js/ai.js:192-238`, `:557` |
| `chuyen-gia/js/agrbrain.js` — AI-3 | khung gom việc | đọc `localStorage` thật của 6 khối, không bịa khi thiếu dữ liệu | `agrbrain.js:153-266` |
| Dữ liệu mẫu | tên hộ/giống/chi phí/năng suất | soát lại cho khớp ngữ cảnh ĐBSCL + Tây Nguyên, thống nhất tên với `catalog.js` và `households.html?q=` | 17 khóa `localStorage` + 3 khóa `sessionStorage`, đều thuộc họ `smartagri_*` / `smartagri.*` |
| Tài liệu `docs/`, README | bản nháp + bảng biểu | cắt bỏ chỗ AI nói quá (xem mục 4), thêm số liệu đo được | commit `docs:` |

## 4. Lỗi AI gặp phải, cách phát hiện và cách khắc phục

| # | Lỗi AI tạo ra | Cách phát hiện | Cách khắc phục |
|---|---|---|---|
| 1 | **Làm hỏng cú pháp khi sửa hàng loạt.** Một lệnh `sed` neo dấu nháy biến `cat: 'households'` trong `chuyen-gia/js/agrbrain.js` thành `cat: households'='../households,` → cả tệp chết vì `SyntaxError`, **trang không báo lỗi nào trên màn hình** | clone bản gốc về đối chiếu bằng `diff --strip-trailing-cr`; kiểm tra parse bằng `new Function(text)` | vá lại từng đường dẫn, sau đó **không dùng `sed` với mẫu có dấu nháy trên object literal nữa** — dùng Edit từng chỗ |
| 2 | **Ký tự Hán lẫn vào văn bản tiếng Việt.** Model sinh ra chuỗi tiếng Việt bị dính liền (`"đượcNhúng"`) và bốn chỗ là ký tự Hán thay vì từ tiếng Việt (trong README và các tệp `docs/` vừa soạn — đã xóa khi rà) | quét toàn bộ `.md` bằng biểu thức `/[\u4e00-\u9fff\ufffd]/` (mẹo rút từ lỗi mã hóa tiếng Việt ở mục 3) | xóa từng chỗ, và đưa bước quét ký tự lạ vào quy trình kiểm tra tệp mới trước khi commit |
| 3 | **Mojibake dấu tiếng Việt** khi dùng `perl -CSD -Mutf8 -i` để đổi chuỗi trong tệp đã mã hóa UTF-8 | đọc lại tệp bằng Read sau khi sửa; đối chiếu chuỗi menu 12 mục giữa 12 trang | thôi dùng `perl -i` cho tệp có dấu; dùng Edit hoặc Python với `encoding='utf-8'`, `newline='\n'` |
| 4 | **`requestAnimationFrame` không bao giờ chạy** khi trang mở trong tab nền / iframe kiểm thử → bản `roles.js` đầu tiên để nguyên menu của mọi vai trò | đặt cờ trong callback: callback không bao giờ được gọi | chuyển sang áp dụng **đồng bộ** khi script chạy, `MutationObserver` chỉ xử lý phần tử sinh sau |
| 5 | **Lộ chuỗi trông như khóa API.** AI điền sẵn `value="sk-demo-1234567890"` cho ô API Key (`settings.html:189`), và `js/settings.js` lưu mọi trường của form (kể cả ô này) vào `localStorage` | rà theo quy chế VP-01 của barem | **ĐÃ SỬA 2026-10-24:** `value=""` + `placeholder="(không dùng trong bản demo)"` + `data-secret="true"`; `readForm()` bỏ qua trường `data-secret` (`js/settings.js:19-26`), `clearSecrets()` xóa khóa khi khôi phục mặc định (`js/settings.js:29-31`). Kiểm: lưu cấu hình rồi đọc `smartagri_settings_v1` → 21 khóa, không có `apiKey`; tìm `sk-demo` trong DOM = 0 |
| 6 | **Ghép HTML bằng chuỗi, không thoát ký tự.** `js/login.js` cũ ghép `note.innerHTML = '…<strong>' + name + '</strong>…'` với `name` lấy thẳng từ ô nhập Họ tên | rà theo quy chế VP-02 (XSS) | **ĐÃ SỬA 2026-10-24:** `showSentNote()` dựng DOM từng nút, tên đưa vào bằng `textContent` (`js/login.js:139-158`). Kiểm: gửi đăng ký với Họ tên `<img src=x onerror="window.__xssFired=1">Ab` → ghi chú hiển thị nguyên văn, 0 thẻ `img`, `window.__xssFired` vẫn `undefined` |
| 7 | **Lỗi cùng loại còn sót ở chỗ khác.** Khi sửa mục 6, phát hiện bảng "Nhật ký hoạt động" ở Dashboard cũng chèn `${l.text}` chưa escape, mà dòng đầu tiên lấy Họ tên từ hồ sơ đăng ký (`js/dashboard.js` cũ dòng 92) — nếu không quét tiếp thì vẫn dính VP-02 dù đã sửa `login.js` | mở rộng `grep innerHTML` ra **toàn bộ** 29 tệp JS rồi xét từng chỗ xem chuỗi có đến từ ô nhập/`localStorage`/URL hay không | thêm `escapeHtml()` cùng quy tắc với `js/users.js:57` (`js/dashboard.js:42`) và áp ở `:96`; khối `chuyen-gia/`, `nong-dan/` của bạn được xác minh là an toàn (`nong-dan/js/support.js:352`, `chuyen-gia/js/journal.js:796` đều dùng `textContent`) nên **không sửa mã của bạn** |
| 8 | **Bố cục không co được.** Lịch 7 cột viết `grid-template-columns: repeat(7, 1fr)` → vỡ trang ở 336 px vì `1fr` không nhỏ hơn `min-content` | đo `scrollWidth − clientWidth` trong `<iframe>` 336/360/768/1280 | `minmax(0, 1fr)` + `overflow-x: auto` cho khung lịch; tương tự `.rp-xlabels span { min-width: 0 }` |
| 9 | **Tệp CSV tiếng Việt bị Excel dựng dấu** khi mở | mở tệp xuất ra bằng Excel | thêm BOM `U+FEFF` trước nội dung CSV (commit `277b20c`) |
| 10 | **Trang giả định đã tồn tại.** Khi kiểm tra phân quyền, AI mở `chuyen-gia/support.html` (không có) và đọc kết quả "menu 0 mục" như một lỗi phân quyền | console báo 404; đối chiếu bảng `PATH_KEY` trong `js/roles.js` | khóa `support` thật ánh xạ tới `chuyen-gia/consult.html`; ghi lại để không lặp lại |
| 11 | **Khai quá số lượng/khả năng.** Bản nháp README viết "AI (điểm rủi ro)" cho `households.html` và "AI-3 (nhận xét tự động)" cho `reports.html` trong khi hai chỗ đó chỉ là bộ đếm và công thức JS | mở đúng hàm sinh nội dung (`buildAdvice()` trong `nong-dan/js/weather.js:454`, `renderStats/#rpSummary` trong `js/reports.js:175`) | bảng AI trong `docs/screen-inventory.md` mục 9 chỉ giữ 3 tính năng thật, có kèm dòng "Không phải AI" để người đọc không nhầm |
| 12 | **Đề xuất sai hướng khi thêm màn hình đăng nhập.** Bản tính đầu của AI là tạo hẳn tệp `login-form.html` mới cho bước nhập tài khoản — nghĩa là thêm một màn hình, kéo theo một video OBS bắt buộc (quy tắc 1 màn hình = 1 video) và dễ bị quy chế coi là "tạo trang rác" | đọc lại mục Screen Inventory + checklist khối 1 của barem trước khi code | bỏ tệp mới, dựng khung `#credPanel` **trong cùng `login.html`** (lưới vai trò bị `.is-auth` ẩn đi), hàng 16 của `docs/screen-inventory.md` vẫn là một màn hình, chỉ đổi mô tả thành "Portal / Role Login + Login Form" |
| 13 | **Tài liệu tham chiếu một cái tên không tồn tại.** Checklist của hai kịch bản thuyết trình cuối kỳ viết "đăng nhập bằng card **Quản trị hệ thống**", trong khi `login.html` không có thẻ nào tên như vậy | `grep` các thẻ trong `login.html`: `data-role="Quản trị viên"` + `data-short="Quản trị viên"` (dòng 85); chuỗi "Quản trị hệ thống" chỉ là **nhãn nhóm menu** ở sidebar (`dashboard.html:74`) | sửa hai checklist thành "thẻ **Quản trị viên**" và bổ sung đúng cặp tài khoản demo `quantri` / `admin2026` |
| 14 | **Thuộc tính `hidden` bị chính CSS của trang đè.** AI viết `.cred-panel { display: flex }` trong `css/login.css` cho khung nhập tài khoản, nhưng quy tắc `display` của nhà phát triển thắng quy tắc `[hidden] { display: none }` của trình duyệt → vừa mở `login.html` đã thấy nguyên khung "Đăng nhập: Quản trị viên" ngay trên lưới thẻ vai trò. **Không có lỗi nào ở console**, chỉ nhìn bằng mắt mới thấy | chính bạn phát hiện khi xem giao diện ("lại thòi ra đăng nhập quản trị viên"); mở DevTools đọc `computed style` của `#credPanel` → `display: flex` dù thẻ có `hidden` | thêm một dòng bao trùm trong `css/login.css`: `[hidden] { display: none !important; }`. Bản vá đầu chỉ liệt kê `.cred-panel[hidden], .reset-panel[hidden], .fp-code[hidden], #fpForm2[hidden]` là **chưa đủ** — `#fpForm1` vẫn hiện vì `.cred-form { display: flex }` cũng thắng; kiểm lại bằng DOM (`f1Hidden:true, form1Vis:false`) rồi mới báo xong |

## 5. Cách sinh viên kiểm chứng (dùng lại được, không dựa vào AI tự tin)

1. **Chạy bằng máy chủ tĩnh**, không mở `file://` (vì `file://` làm mất query string của deep link): `python -m http.server 8123 --bind 127.0.0.1`.
2. **Đo responsive bằng iframe** (trình duyệt nhúng có `innerWidth = 0` nên phải tạo `<iframe width=360|768|1280>` rồi đọc `contentDocument.documentElement.scrollWidth - clientWidth`).
3. **Đọc console từng trang** sau mỗi lượt sửa; 24 tệp HTML hiện cho console sạch và 0 ảnh hỏng.
4. **Kiểm tra link:** sinh 128 liên kết `.html` từ DOM, đối chiếu 0 lỗi 404.
5. **Đối chiếu mã gốc:** clone repo nhóm (`E:\_inspect-cropmate`) để `diff` khi nghi ngờ sửa hỏng.
6. **Kiểm chứng trên bản phát hành thật:** GitHub Pages của repo nộp bài (không chỉ máy cục bộ).
7. **Thử vai trò thật:** đăng nhập lần lượt 4 vai trò, cố tình gõ URL trang ngoài phạm vi, bấm Đăng xuất rồi mở `localStorage` để chắc chắn đã xóa.
8. **Thử màn hình nhập tài khoản bằng DOM thật (26-10-2026, `http://127.0.0.1:8128`):** chạy đủ nhánh lỗi rồi mới tin — để trống → 2 dòng "Bạn chưa nhập tài khoản/mật khẩu."; sai mật khẩu → dòng "Sai tài khoản hoặc mật khẩu. Xem lại dòng demo bên dưới." + toast + khung rung, và `localStorage.getItem('smartagri_role_v1')` **vẫn `null`** (kiểm kỹ chỗ này vì quy chế chấm bên C bắt buộc "sai phân quyền / sai dữ liệu phải có trạng thái lỗi, không được ghi phiên"); đúng → phiên có khoá `user` và trình duyệt thật sự rơi vào `/dashboard.html` (12 mục menu `.nav-item` hiện, chip "QT Quản trị viên"), `/households.html` (8 mục), `/chuyen-gia/consult.html` (4 mục `.nav__item`); thẻ Nông dân vẫn trỏ `nong-dan/login.html`; `Esc` và nút "Quay lại" đóng khung; đo `scrollWidth − clientWidth = 0` ở 320 / 375 / 768 / 1280 px **khi khung đang mở và đang hiện lỗi** (thao tác: đổi `iframe.style.width` rồi nạp lại); console không có message nào.
9. **Kiểm luồng "Quên mật khẩu?" và lỗi `hidden` (26-10-2026, cùng cách nạp iframe):** trước khi sửa, đọc computed style của `#credPanel` khi trang vừa mở → `display: flex` dù có `hidden` (khớp với gì bạn nhìn thấy). Sau khi vá CSS → `{cred:false, reset:false, gridVisible:true}`. Lần lượt chạy từng nhánh bằng DOM thật: để trống bước 1 → "Bạn chưa nhập tài khoản hoặc email."; `chuyengiaxxx` → "Không tìm thấy tài khoản này…"; `test@smartagri.vn` **vừa đăng ký bằng modal** → được chấp nhận (chứng tỏ bước 1 đọc kho đăng ký thật chứ không đối chiếu chuỗi cứng); mã in ra tất định — `quantri` → `039713`, `dieopho` → `059797`, `chuyengia` → `709510`, nạp lại trang vẫn ra đúng mã cũ; sai mã → "Mã xác nhận không đúng."; `12345` → "Mật khẩu phải có ít nhất 6 ký tự."; hai ô khác nhau → "Mật khẩu nhập lại không khớp."; hợp lệ → đọc `localStorage['smartagri_demo_pwd_v1']` thấy `{"admin":"matkhaumoi123"}`, mật khẩu cũ `admin2026` **bị từ chối**, mật khẩu mới đăng nhập vào được `dashboard.html` với 12 mục menu, và còn nguyên sau `F5`. `Esc` đóng đúng thứ tự modal → khối quên mật khẩu → khung đăng nhập; 4 bề rộng 320/375/768/1280 px đều `scrollWidth − clientWidth = 0`; console sạch.

## 6. Tính năng mock vs gọi API thật

| Tính năng | Mock | API thật | Cách mô phỏng trong mã |
|---|:--:|:--:|---|
| AI-1 Field Issue Classifier | ✔ | ✘ | bộ luật từ khóa + `hashOf()` tạo độ tin cậy ổn định (`nong-dan/js/ai.js:208`), trễ giả lập 1,4 s (`nong-dan/js/main.js:262`) |
| AI-2 Season Checklist Generator | ✔ | ✘ | bảng giai đoạn → đầu việc trong `js/schedule.js:267`, có `setTimeout` tiến trình |
| AI-3 Farm Log Summarizer / AgrBrain | ✔ | ✘ | gom + xếp hạng dữ liệu `localStorage` của 6 khối (`chuyen-gia/js/agrbrain.js`) |
| Khuyến nghị thời tiết | ✔ | ✘ | luật if/then trên chuỗi ngày giả lập (`nong-dan/js/weather.js:454`) |
| Đăng nhập / phân quyền | ✔ | ✘ | `localStorage['smartagri_role_v1']` + `js/roles.js` |
| CRUD dữ liệu | ✔ | ✘ | `localStorage` 17 khóa (họ `smartagri_*` / `smartagri.*`) + 3 khóa `sessionStorage` — không có máy chủ, không có `fetch`/`XMLHttpRequest` nào trong mã |

Bảng trên là **đủ những gì chạy trong bản tích hợp**. Mã gốc của SV2 ở nhánh `team/main` (tip `d569695`) còn một mô-đun AI nữa chưa được đưa vào site này: `js/dashboard.js` 809 dòng với `analyzeImage` / `rgbToHsv` / `classifyImage` / `playScanSteps` — quét ảnh lá và phân loại bệnh ngay trong trình duyệt. `grep` bốn hàm đó trên toàn cây làm việc = 0 kết quả, nên **không dám kê** nó thành AI-4; khai báo chi tiết ở [`roles-and-features.md`](roles-and-features.md), mục "Đối chiếu với mã gốc của SV2".

**Yêu cầu mạng duy nhất của toàn site:** phông chữ `Be Vietnam Pro` qua `fonts.googleapis.com` ở 5 trang `chuyen-gia/*.html`. **Không có khóa bí mật, không có endpoint LLM, không gửi dữ liệu ra ngoài.** Tab "Trí tuệ nhân tạo" của `settings.html` chỉ là ô cấu hình hiển thị: trường API Key để trống (`value=""`) và bị `js/settings.js:19-26` loại khỏi bộ lưu, nên không có chuỗi nào dạng khóa xuất hiện trong mã hay trong `localStorage` của người xem.

## 7. Điều sinh viên học được

- **AI nhanh ở phần khung, chậm ở phần nghiệp vụ.** Mọi lỗi nghiêm trọng đều nằm ở ngữ cảnh: tên giống cây phải khớp `catalog.js`, `1fr` không co dưới `min-content`, `file://` làm mất query string.
- **Bốn trong mười bốn lỗi ở mục 4 chỉ phát hiện được bằng công cụ khách quan** (`diff` với bản gốc, đo `scrollWidth`, quét ký tự lạ, `grep innerHTML` toàn bộ 29 tệp JS), không phát hiện bằng cách nhìn màn hình. Ngược lại lỗi 14 (`hidden` bị `display:flex` đè) lại **chỉ** thấy bằng mắt — console hoàn toàn sạch — nên hai cách kiểm tra phải đi đôi với nhau.
- **Cái trông nhỏ vẫn thành mất điểm.** Hai rủi ro VP-01 (chuỗi `sk-demo-…` trong `settings.html`) và VP-02 (`innerHTML` ghép chuỗi) từng đủ để bị trừ -1.50 và -1.00; cả hai đã sửa và kiểm chứng ngày 2026-10-24 (mục 4, dòng 5–7). Bài học thật là lỗi VP-02 **còn lặp ở một chỗ khác** mà lần rà đầu không thấy — phải quét toàn bộ mới đủ.
- **Phải viết lại mô-đun sinh sau khi AI sửa hỏng**, chứ không copy-paste khối mã lớn: bản `agrbrain.js` sau khi vá đường dẫn vẫn chạy vì đã kiểm tra lại bằng parse, không phải vì AI xin lỗi.
- **AI không thay được bảng kiểm kê.** Khi rà lại theo barem, ba chỗ AI tự gán nhãn "AI" cho những thứ chỉ là công thức JS — nếu không đọc lại mã để đối chiếu thì nhóm sẽ tự khai sai và bị trừ vì khai không trung thực.
