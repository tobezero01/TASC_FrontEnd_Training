# Bookshelf (OOP, JavaScript)

Một dự án OOP nhỏ bằng JavaScript thuần (no framework).

## Kiến trúc lớp
- `Book`: mô hình hoá một cuốn sách (id, title, author, year, isRead).
- `BookManager`: quản lý danh sách sách (CRUD, lọc, thống kê), giao tiếp `Storage`.
- `Storage`: bọc `localStorage` để lưu/đọc.
- `UI`: điều khiển DOM, render danh sách, uỷ quyền sự kiện (delegation).

## Chạy
Mở `index.html` bằng trình duyệt hiện đại. Dữ liệu lưu trong `localStorage` của bạn.
