# Requirements Document

## Introduction

Chức năng quản lý hợp đồng mua xe cho phép đại lý quản lý toàn bộ hợp đồng mua xe của khách hàng, bao gồm thông tin hợp đồng, file đính kèm, và liên kết với xe đã mua. Mỗi khách hàng có thể có nhiều hợp đồng tương ứng với các lần mua xe khác nhau. Chức năng này được tích hợp vào phần quản lý chi tiết khách hàng hiện có.

## Glossary

- **Contract_Management_System**: Hệ thống quản lý hợp đồng mua xe trong ứng dụng đại lý
- **Vehicle_Contract**: Hợp đồng mua xe giữa khách hàng và đại lý
- **Contract_File**: File PDF hoặc hình ảnh của hợp đồng đã ký
- **Customer_Detail_Page**: Trang chi tiết khách hàng trong giao diện quản trị
- **Admin_User**: Người dùng có quyền quản trị (admin hoặc staff)
- **Contract_Repository**: Nơi lưu trữ file hợp đồng (Cloudinary)
- **Vehicle_Record**: Thông tin xe đã mua được lưu trong hệ thống
- **Contract_Parser**: Bộ phân tích thông tin từ file hợp đồng
- **Contract_Validator**: Bộ kiểm tra tính hợp lệ của dữ liệu hợp đồng

## Requirements

### Requirement 1: Tạo và lưu trữ hợp đồng mua xe

**User Story:** Là một nhân viên đại lý, tôi muốn tạo hồ sơ hợp đồng mua xe cho khách hàng, để có thể quản lý và tra cứu thông tin hợp đồng một cách có hệ thống.

#### Acceptance Criteria

1. WHEN Admin_User tạo hợp đồng mới, THE Contract_Management_System SHALL tạo bản ghi hợp đồng với mã số duy nhất
2. THE Contract_Management_System SHALL lưu trữ thông tin: mã hợp đồng, ngày ký, khách hàng, xe mua, giá trị hợp đồng, trạng thái, và ghi chú
3. WHEN Admin_User upload file hợp đồng, THE Contract_Management_System SHALL lưu file vào Contract_Repository và trả về URL
4. THE Contract_Management_System SHALL liên kết Vehicle_Contract với customer_id và vehicle_id
5. WHEN tạo hợp đồng thành công, THE Contract_Management_System SHALL trả về thông tin hợp đồng đầy đủ trong vòng 2 giây

### Requirement 2: Quản lý file hợp đồng

**User Story:** Là một nhân viên đại lý, tôi muốn upload và quản lý file hợp đồng đã ký, để có thể lưu trữ bằng chứng pháp lý và tra cứu khi cần.

#### Acceptance Criteria

1. THE Contract_Management_System SHALL chấp nhận file định dạng PDF, JPG, PNG với kích thước tối đa 10MB
2. WHEN Admin_User upload file hợp đồng, THE Contract_Management_System SHALL kiểm tra định dạng và kích thước file
3. IF file không hợp lệ, THEN THE Contract_Management_System SHALL trả về thông báo lỗi cụ thể
4. THE Contract_Management_System SHALL lưu trữ nhiều file cho một hợp đồng (hợp đồng chính, phụ lục, biên bản bàn giao)
5. WHEN Admin_User xóa file hợp đồng, THE Contract_Management_System SHALL xóa file khỏi Contract_Repository và cập nhật bản ghi

### Requirement 3: Hiển thị danh sách hợp đồng trong trang chi tiết khách hàng

**User Story:** Là một nhân viên đại lý, tôi muốn xem tất cả hợp đồng của một khách hàng trong trang chi tiết, để có thể nắm được lịch sử mua xe của khách hàng.

#### Acceptance Criteria

1. WHEN Admin_User truy cập Customer_Detail_Page, THE Contract_Management_System SHALL hiển thị tab "Hợp đồng"
2. THE Contract_Management_System SHALL hiển thị danh sách hợp đồng với thông tin: mã hợp đồng, ngày ký, xe mua, giá trị, trạng thái
3. THE Contract_Management_System SHALL sắp xếp hợp đồng theo ngày ký mới nhất
4. THE Contract_Management_System SHALL hỗ trợ phân trang với 10 hợp đồng mỗi trang
5. WHEN danh sách có nhiều hơn 10 hợp đồng, THE Contract_Management_System SHALL hiển thị điều khiển phân trang

### Requirement 4: Xem chi tiết hợp đồng

**User Story:** Là một nhân viên đại lý, tôi muốn xem chi tiết đầy đủ của một hợp đồng, để có thể kiểm tra thông tin và file đính kèm.

#### Acceptance Criteria

1. WHEN Admin_User click vào một hợp đồng, THE Contract_Management_System SHALL hiển thị modal chi tiết hợp đồng
2. THE Contract_Management_System SHALL hiển thị đầy đủ thông tin: mã hợp đồng, ngày ký, khách hàng, xe mua, giá trị, phương thức thanh toán, trạng thái, ghi chú
3. THE Contract_Management_System SHALL hiển thị danh sách file đính kèm với tên file và kích thước
4. WHEN Admin_User click vào file đính kèm, THE Contract_Management_System SHALL mở file trong tab mới
5. THE Contract_Management_System SHALL hiển thị lịch sử thay đổi trạng thái hợp đồng

### Requirement 5: Cập nhật thông tin hợp đồng

**User Story:** Là một nhân viên đại lý, tôi muốn cập nhật thông tin hợp đồng, để có thể sửa lỗi hoặc bổ sung thông tin khi cần thiết.

#### Acceptance Criteria

1. WHEN Admin_User chỉnh sửa hợp đồng, THE Contract_Management_System SHALL cho phép cập nhật: ngày ký, giá trị, phương thức thanh toán, trạng thái, ghi chú
2. THE Contract_Management_System SHALL không cho phép thay đổi mã hợp đồng sau khi tạo
3. WHEN Admin_User thay đổi trạng thái hợp đồng, THE Contract_Management_System SHALL lưu lịch sử thay đổi với timestamp và user_id
4. THE Contract_Validator SHALL kiểm tra tính hợp lệ của dữ liệu trước khi lưu
5. IF dữ liệu không hợp lệ, THEN THE Contract_Management_System SHALL trả về thông báo lỗi cụ thể

### Requirement 6: Liên kết hợp đồng với xe đã mua

**User Story:** Là một nhân viên đại lý, tôi muốn liên kết hợp đồng với xe cụ thể mà khách hàng đã mua, để có thể tra cứu thông tin xe từ hợp đồng và ngược lại.

#### Acceptance Criteria

1. WHEN tạo hợp đồng, THE Contract_Management_System SHALL cho phép chọn xe từ danh sách xe trong hệ thống
2. THE Contract_Management_System SHALL lưu vehicle_id vào bản ghi hợp đồng
3. WHEN hiển thị chi tiết hợp đồng, THE Contract_Management_System SHALL hiển thị thông tin xe: tên, màu sắc, năm sản xuất, biển số (nếu có)
4. THE Contract_Management_System SHALL cho phép cập nhật liên kết xe sau khi tạo hợp đồng
5. WHEN xe được liên kết với hợp đồng, THE Contract_Management_System SHALL hiển thị thông tin hợp đồng trong trang chi tiết xe

### Requirement 7: Tìm kiếm và lọc hợp đồng

**User Story:** Là một nhân viên đại lý, tôi muốn tìm kiếm và lọc hợp đồng theo nhiều tiêu chí, để có thể nhanh chóng tìm thấy hợp đồng cần tra cứu.

#### Acceptance Criteria

1. THE Contract_Management_System SHALL hỗ trợ tìm kiếm theo mã hợp đồng, tên khách hàng, tên xe
2. THE Contract_Management_System SHALL hỗ trợ lọc theo trạng thái hợp đồng (draft, active, completed, cancelled)
3. THE Contract_Management_System SHALL hỗ trợ lọc theo khoảng thời gian ký hợp đồng
4. WHEN Admin_User nhập từ khóa tìm kiếm, THE Contract_Management_System SHALL trả về kết quả trong vòng 1 giây
5. THE Contract_Management_System SHALL hiển thị số lượng kết quả tìm thấy

### Requirement 8: Quản lý trạng thái hợp đồng

**User Story:** Là một nhân viên đại lý, tôi muốn quản lý trạng thái hợp đồng qua các giai đoạn, để có thể theo dõi tiến trình xử lý hợp đồng.

#### Acceptance Criteria

1. THE Contract_Management_System SHALL hỗ trợ các trạng thái: draft, active, completed, cancelled
2. WHEN tạo hợp đồng mới, THE Contract_Management_System SHALL đặt trạng thái mặc định là "draft"
3. THE Contract_Management_System SHALL cho phép chuyển trạng thái theo quy tắc: draft → active → completed hoặc draft/active → cancelled
4. WHEN chuyển sang trạng thái "cancelled", THE Contract_Management_System SHALL yêu cầu nhập lý do hủy
5. THE Contract_Management_System SHALL lưu lịch sử thay đổi trạng thái với timestamp, user_id, và lý do (nếu có)

### Requirement 9: Xuất báo cáo hợp đồng

**User Story:** Là một quản lý đại lý, tôi muốn xuất báo cáo tổng hợp về hợp đồng, để có thể phân tích doanh số và hiệu quả kinh doanh.

#### Acceptance Criteria

1. THE Contract_Management_System SHALL hỗ trợ xuất báo cáo theo khoảng thời gian
2. THE Contract_Management_System SHALL bao gồm thông tin: tổng số hợp đồng, tổng giá trị, phân bố theo trạng thái, phân bố theo xe
3. THE Contract_Management_System SHALL xuất báo cáo định dạng Excel hoặc PDF
4. WHEN Admin_User yêu cầu xuất báo cáo, THE Contract_Management_System SHALL tạo file trong vòng 5 giây
5. THE Contract_Management_System SHALL gửi link download báo cáo cho Admin_User

### Requirement 10: Phân quyền truy cập hợp đồng

**User Story:** Là một quản trị viên hệ thống, tôi muốn kiểm soát quyền truy cập hợp đồng, để đảm bảo bảo mật thông tin khách hàng.

#### Acceptance Criteria

1. THE Contract_Management_System SHALL kiểm tra quyền truy cập trước khi hiển thị thông tin hợp đồng
2. THE Contract_Management_System SHALL cho phép Admin và Sale Staff xem và chỉnh sửa hợp đồng
3. THE Contract_Management_System SHALL chỉ cho phép Admin xóa hợp đồng
4. IF người dùng không có quyền truy cập, THEN THE Contract_Management_System SHALL trả về lỗi 403 Forbidden
5. THE Contract_Management_System SHALL ghi log mỗi lần truy cập và thay đổi hợp đồng

### Requirement 11: Xác thực và kiểm tra dữ liệu hợp đồng

**User Story:** Là một nhân viên đại lý, tôi muốn hệ thống kiểm tra tính hợp lệ của dữ liệu hợp đồng, để tránh lỗi nhập liệu và đảm bảo tính toàn vẹn dữ liệu.

#### Acceptance Criteria

1. THE Contract_Validator SHALL kiểm tra mã hợp đồng là duy nhất trong hệ thống
2. THE Contract_Validator SHALL kiểm tra ngày ký hợp đồng không được là ngày tương lai
3. THE Contract_Validator SHALL kiểm tra giá trị hợp đồng phải lớn hơn 0
4. THE Contract_Validator SHALL kiểm tra customer_id và vehicle_id tồn tại trong hệ thống
5. IF dữ liệu không hợp lệ, THEN THE Contract_Management_System SHALL trả về thông báo lỗi chi tiết với field bị lỗi

### Requirement 12: Tích hợp với hệ thống quản lý khách hàng hiện có

**User Story:** Là một nhân viên đại lý, tôi muốn truy cập chức năng quản lý hợp đồng từ trang chi tiết khách hàng, để có thể làm việc hiệu quả mà không cần chuyển đổi giữa nhiều trang.

#### Acceptance Criteria

1. THE Contract_Management_System SHALL tích hợp vào Customer_Detail_Page dưới dạng tab mới
2. THE Contract_Management_System SHALL hiển thị số lượng hợp đồng của khách hàng trên tab header
3. WHEN Admin_User tạo hợp đồng từ Customer_Detail_Page, THE Contract_Management_System SHALL tự động điền customer_id
4. THE Contract_Management_System SHALL cập nhật số lượng hợp đồng real-time khi có thay đổi
5. THE Contract_Management_System SHALL sử dụng API endpoints hiện có của customer controller

### Requirement 13: Thông báo và cảnh báo về hợp đồng

**User Story:** Là một nhân viên đại lý, tôi muốn nhận thông báo về các sự kiện quan trọng liên quan đến hợp đồng, để có thể xử lý kịp thời.

#### Acceptance Criteria

1. WHEN hợp đồng được tạo mới, THE Contract_Management_System SHALL gửi thông báo cho Admin_User đã tạo
2. WHEN trạng thái hợp đồng thay đổi, THE Contract_Management_System SHALL gửi thông báo cho các Admin_User liên quan
3. THE Contract_Management_System SHALL hiển thị thông báo trong giao diện web và lưu vào notification history
4. THE Contract_Management_System SHALL cho phép Admin_User tắt thông báo cho từng loại sự kiện
5. WHEN có lỗi xảy ra trong quá trình xử lý hợp đồng, THE Contract_Management_System SHALL gửi thông báo lỗi cho Admin_User

### Requirement 14: Sao lưu và khôi phục dữ liệu hợp đồng

**User Story:** Là một quản trị viên hệ thống, tôi muốn đảm bảo dữ liệu hợp đồng được sao lưu và có thể khôi phục, để bảo vệ thông tin quan trọng khỏi mất mát.

#### Acceptance Criteria

1. THE Contract_Management_System SHALL tự động sao lưu dữ liệu hợp đồng hàng ngày
2. THE Contract_Management_System SHALL lưu trữ file hợp đồng trên Contract_Repository với cơ chế backup tự động
3. THE Contract_Management_System SHALL hỗ trợ khôi phục hợp đồng đã xóa trong vòng 30 ngày
4. WHEN Admin_User xóa hợp đồng, THE Contract_Management_System SHALL đánh dấu soft delete thay vì xóa vĩnh viễn
5. THE Contract_Management_System SHALL cho phép Admin khôi phục hợp đồng đã xóa từ danh sách archived

### Requirement 15: Phân tích và trích xuất thông tin từ file hợp đồng

**User Story:** Là một nhân viên đại lý, tôi muốn hệ thống tự động trích xuất thông tin từ file hợp đồng, để giảm thiểu công việc nhập liệu thủ công.

#### Acceptance Criteria

1. WHERE tính năng OCR được bật, THE Contract_Parser SHALL trích xuất thông tin từ file hợp đồng PDF hoặc ảnh
2. THE Contract_Parser SHALL nhận diện các trường: mã hợp đồng, ngày ký, giá trị hợp đồng, tên khách hàng
3. WHEN Contract_Parser trích xuất thông tin thành công, THE Contract_Management_System SHALL tự động điền vào form
4. THE Contract_Management_System SHALL cho phép Admin_User xem và chỉnh sửa thông tin đã trích xuất trước khi lưu
5. IF Contract_Parser không thể trích xuất thông tin, THEN THE Contract_Management_System SHALL yêu cầu Admin_User nhập thủ công

### Requirement 16: Tạo Pretty Printer cho dữ liệu hợp đồng

**User Story:** Là một developer, tôi muốn có Pretty Printer để format dữ liệu hợp đồng, để có thể debug và kiểm tra dữ liệu dễ dàng.

#### Acceptance Criteria

1. THE Contract_Management_System SHALL cung cấp Pretty_Printer để format dữ liệu hợp đồng thành JSON có cấu trúc
2. THE Pretty_Printer SHALL format tất cả các trường của hợp đồng với indentation 2 spaces
3. THE Pretty_Printer SHALL chuyển đổi ObjectId thành string format
4. THE Pretty_Printer SHALL format ngày tháng theo chuẩn ISO 8601
5. FOR ALL hợp đồng hợp lệ, parsing dữ liệu sau đó pretty print sau đó parsing lại SHALL tạo ra object tương đương (round-trip property)
