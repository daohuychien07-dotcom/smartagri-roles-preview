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

## 3. Phần AI sinh ra và phần sinh viên chỉnh sửa

| Thành phần | AI sinh | Sinh viên sửa / tự viết | Bằng chứng |
|---|---|---|---|
| Bộ 8 trang quản trị (HTML/CSS/JS) | khung lặp, class, biểu mẫu | cấu trúc lại heading, thêm `label`/`alt`/`aria-*`, đổi màu theo token `:root`, tự viết nội dung nghiệp vụ tiếng Việt | `git log` các commit `feat:` trên `origin/main` |
| `js/roles.js` (phân quyền) | bản đầu dùng `requestAnimationFrame` để chờ menu | **bản hiện tại áp dụng đồng bộ** + `MutationObserver` + `guardPage()`; sinh viên phát hiện rAF không chạy | comment `js/roles.js:244` |
| `js/schedule.js` — AI-2 checklist | danh sách công việc mẫu | ràng buộc kiểm tra giống cây với `js/catalog.js`, luồng lỗi, nút chấp nhận/sửa/hủy | `js/schedule.js:305`, `:338` |
| `nong-dan/js/ai.js` — AI-1 | bộ luật từ khóa → bệnh cây | hàm `hashOf()` để **cùng một ảnh luôn cho cùng kết quả**, khoảng tin cậy 72–97 %, câu trả lời "chưa chắc chắn" | `nong-dan/js/ai.js:192-238`, `:557` |
| `chuyen-gia/js/agrbrain.js` — AI-3 | khung gom việc | đọc `localStorage` thật của 6 khối, không bịa khi thiếu dữ liệu | `agrbrain.js:153-266` |
| Dữ liệu mẫu | tên hộ/giống/chi phí/năng suất | soát lại cho khớp ngữ cảnh ĐBSCL + Tây Nguyên, thống nhất tên với `catalog.js` và `households.html?q=` | 19 khóa `smartagri_*` |
| Tài liệu `docs/`, README | bản nháp + bảng biểu | cắt bỏ chỗ AI nói quá (xem mục 4), thêm số liệu đo được | commit `docs:` |

## 4. Lỗi AI gặp phải, cách phát hiện và cách khắc phục

| # | Lỗi AI tạo ra | Cách phát hiện | Cách khắc phục |
|---|---|---|---|
| 1 | **Làm hỏng cú pháp khi sửa hàng loạt.** Một lệnh `sed` neo dấu nháy biến `cat: 'households'` trong `chuyen-gia/js/agrbrain.js` thành `cat: households'='../households,` → cả tệp chết vì `SyntaxError`, **trang không báo lỗi nào trên màn hình** | clone bản gốc về đối chiếu bằng `diff --strip-trailing-cr`; kiểm tra parse bằng `new Function(text)` | vá lại từng đường dẫn, sau đó **không dùng `sed` với mẫu có dấu nháy trên object literal nữa** — dùng Edit từng chỗ |
| 2 | **Ký tự Hán lẫn vào văn bản tiếng Việt.** Model sinh ra chuỗi tiếng Việt bị dính liền (`"đượcNhúng"`) và bốn chỗ là ký tự Hán thay vì từ tiếng Việt (trong README và các tệp `docs/` vừa soạn — đã xóa khi rà) | quét toàn bộ `.md` bằng biểu thức `/[\u4e00-\u9fff\ufffd]/` (mẹo rút từ lỗi mã hóa tiếng Việt ở mục 3) | xóa từng chỗ, và đưa bước quét ký tự lạ vào quy trình kiểm tra tệp mới trước khi commit |
| 3 | **Mojibake dấu tiếng Việt** khi dùng `perl -CSD -Mutf8 -i` để đổi chuỗi trong tệp đã mã hóa UTF-8 | đọc lại tệp bằng Read sau khi sửa; đối chiếu chuỗi menu 12 mục giữa 12 trang | thôi dùng `perl -i` cho tệp có dấu; dùng Edit hoặc Python với `encoding='utf-8'`, `newline='\n'` |
| 4 | **`requestAnimationFrame` không bao giờ chạy** khi trang mở trong tab nền / iframe kiểm thử → bản `roles.js` đầu tiên để nguyên menu của mọi vai trò | đặt cờ trong callback: callback không bao giờ được gọi | chuyển sang áp dụng **đồng bộ** khi script chạy, `MutationObserver` chỉ xử lý phần tử sinh sau |
| 5 | **Lộ chuỗi trông như khóa API.** AI điền sẵn `value="sk-demo-1234567890"` cho ô API Key (`settings.html:189`) | rà theo quy chế VP-01 của barem | **RỦI RO CÒN:** cần đổi thành `value=""` + `placeholder="Chưa cấu hình"` trước khi nộp (thay đổi 1 dòng, chưa tự làm vì thuộc phần code ngoài phạm vi được duyệt) |
| 6 | **Ghép HTML bằng chuỗi, không thoát ký tự.** `js/login.js:140` `note.innerHTML = '…<strong>' + name + '</strong>…'` với `name` lấy từ ô nhập | rà theo quy chế VP-02 (XSS) | **RỦI RO CÒN:** cần đổi sang `textContent` cho phần tên (hoặc dùng `escapeHtml` như `js/users.js:57` và `js/households.js:43` đã làm) |
| 7 | **Bố cục không co được.** Lịch 7 cột viết `grid-template-columns: repeat(7, 1fr)` → vỡ trang ở 336 px vì `1fr` không nhỏ hơn `min-content` | đo `scrollWidth − clientWidth` trong `<iframe>` 336/360/768/1280 | `minmax(0, 1fr)` + `overflow-x: auto` cho khung lịch; tương tự `.rp-xlabels span { min-width: 0 }` |
| 8 | **Tệp CSV tiếng Việt bị Excel dựng dấu** khi mở | mở tệp xuất ra bằng Excel | thêm BOM `U+FEFF` trước nội dung CSV (commit `277b20c`) |
| 9 | **Trang giả định đã tồn tại.** Khi kiểm tra phân quyền, AI mở `chuyen-gia/support.html` (không có) và đọc kết quả "menu 0 mục" như một lỗi phân quyền | console báo 404; đối chiếu bảng `PATH_KEY` trong `js/roles.js` | khóa `support` thật ánh xạ tới `chuyen-gia/consult.html`; ghi lại để không lặp lại |
| 10 | **Khai quá số lượng/khả năng.** Bản nháp README viết "AI (điểm rủi ro)" cho `households.html` và "AI-3 (nhận xét tự động)" cho `reports.html` trong khi hai chỗ đó chỉ là bộ đếm và công thức JS | mở đúng hàm sinh nội dung (`buildAdvice()` trong `nong-dan/js/weather.js:454`, `renderStats/#rpSummary` trong `js/reports.js:175`) | bảng AI trong `docs/screen-inventory.md` mục 9 chỉ giữ 3 tính năng thật, có kèm dòng "Không phải AI" để người đọc không nhầm |

## 5. Cách sinh viên kiểm chứng (dùng lại được, không dựa vào AI tự tin)

1. **Chạy bằng máy chủ tĩnh**, không mở `file://` (vì `file://` làm mất query string của deep link): `python -m http.server 8123 --bind 127.0.0.1`.
2. **Đo responsive bằng iframe** (trình duyệt nhúng có `innerWidth = 0` nên phải tạo `<iframe width=360|768|1280>` rồi đọc `contentDocument.documentElement.scrollWidth - clientWidth`).
3. **Đọc console từng trang** sau mỗi lượt sửa; 24 tệp HTML hiện cho console sạch và 0 ảnh hỏng.
4. **Kiểm tra link:** sinh 128 liên kết `.html` từ DOM, đối chiếu 0 lỗi 404.
5. **Đối chiếu mã gốc:** clone repo nhóm (`E:\_inspect-cropmate`) để `diff` khi nghi ngờ sửa hỏng.
6. **Kiểm chứng trên bản phát hành thật:** GitHub Pages của repo nộp bài (không chỉ máy cục bộ).
7. **Thử vai trò thật:** đăng nhập lần lượt 4 vai trò, cố tình gõ URL trang ngoài phạm vi, bấm Đăng xuất rồi mở `localStorage` để chắc chắn đã xóa.

## 6. Tính năng mock vs gọi API thật

| Tính năng | Mock | API thật | Cách mô phỏng trong mã |
|---|:--:|:--:|---|
| AI-1 Field Issue Classifier | ✔ | ✘ | bộ luật từ khóa + `hashOf()` tạo độ tin cậy ổn định (`nong-dan/js/ai.js:208`), trễ giả lập 1,4 s (`nong-dan/js/main.js:262`) |
| AI-2 Season Checklist Generator | ✔ | ✘ | bảng giai đoạn → đầu việc trong `js/schedule.js:267`, có `setTimeout` tiến trình |
| AI-3 Farm Log Summarizer / AgrBrain | ✔ | ✘ | gom + xếp hạng dữ liệu `localStorage` của 6 khối (`chuyen-gia/js/agrbrain.js`) |
| Khuyến nghị thời tiết | ✔ | ✘ | luật if/then trên chuỗi ngày giả lập (`nong-dan/js/weather.js:454`) |
| Đăng nhập / phân quyền | ✔ | ✘ | `localStorage['smartagri_role_v1']` + `js/roles.js` |
| CRUD dữ liệu | ✔ | ✘ | `localStorage` (19 khóa) — không có máy chủ, không có `fetch`/`XMLHttpRequest` nào trong mã |

**Yêu cầu mạng duy nhất của toàn site:** phông chữ `Be Vietnam Pro` qua `fonts.googleapis.com` ở 5 trang `chuyen-gia/*.html`. **Không có khóa bí mật, không có endpoint LLM, không gửi dữ liệu ra ngoài.**

## 7. Điều sinh viên học được

- **AI nhanh ở phần khung, chậm ở phần nghiệp vụ.** Mọi lỗi nghiêm trọng đều nằm ở ngữ cảnh: tên giống cây phải khớp `catalog.js`, `1fr` không co dưới `min-content`, `file://` làm mất query string.
- **Không được tin "AI nói đã sửa xong".** Ba trong mười lỗi ở mục 4 chỉ phát hiện được bằng công cụ khách quan (`diff` với bản gốc, đo `scrollWidth`, quét ký tự lạ), không phát hiện bằng cách nhìn màn hình.
- **Cái trông nhỏ vẫn thành mất điểm.** Hai rủi ro thật còn tồn (chuỗi `sk-demo-…` và `innerHTML` ghép chuỗi) đủ để bị trừ -1.50 và -1.00 theo quy chế VP-01/VP-02 nếu không sửa trước khi bảo vệ.
- **Phải viết lại mô-đun sinh sau khi AI sửa hỏng**, chứ không copy-paste khối mã lớn: bản `agrbrain.js` sau khi vá đường dẫn vẫn chạy vì đã kiểm tra lại bằng parse, không phải vì AI xin lỗi.
- **AI không thay được bảng kiểm kê.** Khi rà lại theo barem, ba chỗ AI tự gán nhãn "AI" cho những thứ chỉ là công thức JS — nếu không đọc lại mã để đối chiếu thì nhóm sẽ tự khai sai và bị trừ vì khai không trung thực.
