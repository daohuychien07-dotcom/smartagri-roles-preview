# CSE122 - Bài tập lớn: CropMate AI (SmartAgri)

> Bài kiểm tra giữa kỳ - Học phần Phát triển ứng dụng Web cơ bản (CSE122)

## Tên đề tài

**CropMate AI (SmartAgri)** - Nền tảng hỗ trợ nông nghiệp thông minh: quản lý danh mục cây trồng, sâu bệnh hại và gợi ý canh tác cho Nông dân, HTX.

## Tên trang đã thực hiện

**Quản lý danh mục cây trồng & Sâu bệnh (trang Quản trị hệ thống)**

## Mục đích của trang

Trang dành cho **Quản trị viên hệ thống**. Dùng để thiết lập và chuẩn hóa dữ liệu nền tảng (danh mục cây trồng, giống cây, chu kỳ sinh trưởng, giai đoạn sinh trưởng, danh mục sâu bệnh hại) làm căn cứ cho bộ lọc của Nông dân/HTX và cho gợi ý của AI trong hệ thống CropMate AI.

## Các chức năng chính

- **Chuyển tab** giữa *Danh mục Cây trồng* và *Danh mục Sâu bệnh hại*.
- **Tìm kiếm** theo tên cây trồng, tên giống, tên sâu bệnh hoặc triệu chứng (tìm trực tiếp khi gõ).
- **Lọc dữ liệu** theo nhóm cây trồng và theo trạng thái (Đang hoạt động / Lưu trữ / Vô hiệu hóa), nút **Làm mới** để xóa bộ lọc.
- **Render dữ liệu từ mảng JavaScript** ra bảng (dữ liệu cây trồng và sâu bệnh lưu trong hai mảng `crops`, `pests`).
- **Mở/đóng Modal** thêm mới hoặc chỉnh sửa cây trồng / sâu bệnh.
- **Form Validation** bằng JavaScript: bắt buộc nhập tên, chu kỳ sinh trưởng (không âm, "từ" không lớn hơn "đến"), bắt buộc có ít nhất một giai đoạn sinh trưởng.
- **Thêm / sửa dữ liệu**: thêm cây trồng, sâu bệnh mới; chỉnh sửa qua nút "Sửa".
- **Thay đổi trạng thái**: Lưu trữ / Vô hiệu hóa / Khôi phục, hiển thị bằng badge màu.
- **Thêm / xóa các giai đoạn sinh trưởng** dạng chip nối mũi tên trong form.
- **Toggle** thu gọn sidebar (nút hamburger).
- **Thông báo toast** khi thao tác thành công.

## Công nghệ sử dụng

- **HTML5**: semantic HTML (`header`, `nav`, `main`, `section`, `aside`, `footer`, `form`, `label`, `table`...).
- **CSS3**: Flexbox, CSS Grid (form 2 cột), biến màu CSS, hiệu ứng `hover`, `transition`, **Media Query responsive** (desktop / tablet / mobile).
- **JavaScript (thuần - Vanilla JS)**: DOM, `addEventListener`, render dữ liệu từ mảng, validate form, không dùng thư viện hay framework.

Không sử dụng backend, framework hay thư viện ngoài (theo đúng phạm vi kiểm tra giữa kỳ).

## Cấu trúc thư mục

```
project/
├── index.html          # Trang Quản lý danh mục cây trồng & Sâu bệnh
├── css/
│   └── style.css       # Toàn bộ định dạng + responsive
├── js/
│   └── main.js         # Dữ liệu mẫu + toàn bộ tương tác
├── assets/
│   └── mockup-desktop.png  # Ảnh thiết kế tham khảo (desktop)
└── README.md
```

## Cách chạy

Mở trực tiếp file `index.html` bằng trình duyệt (Chrome, Edge...). Không cần cài đặt gì thêm.

## Responsive

- **Desktop**: sidebar cố định bên trái, form modal 2 cột (theo thiết kế).
- **Tablet (<= 900px)**: form modal về 1 cột.
- **Mobile (<= 768px)**: sidebar chuyển thành thanh menu ngang phía trên, bảng dữ liệu cuộn ngang thay vì vỡ layout, nút "Thêm" tràn full-width.

## Link liên quan

- **Link Figma**: *(cập nhật sau - dán link file Figma của bạn vào đây)*
- **Link video**: *(cập nhật sau - dán link video trình bày ~03 phút vào đây)*
- **Link GitHub**: https://github.com/ducnhatnguyen18-svg/CSE122-BTL-NGUYENDUCNHAT

## Ghi chú

Dữ liệu trong trang là dữ liệu mẫu lưu ở mảng JavaScript (`crops`, `pests` trong `js/main.js`), chưa kết nối backend/database. Khi tải lại trang, dữ liệu thêm/sửa sẽ về mặc định.
