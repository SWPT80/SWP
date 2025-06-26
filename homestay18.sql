
go
-- bảng users: quản lý thông tin người dùng
create table Users(
	user_id int primary key identity(1,1),
	userName varchar(50)  null unique,
	password varchar(100)  null,
    fullName nvarchar(100),
	email varchar(100)  null unique,
	phone varchar(15),
	birthdate date null,
	address nvarchar(255) null,
	role varchar(20)  null check (role in('user', 'host', 'admin')),
	status bit default 1
)
go
-- dữ liệu bảng users
INSERT INTO Users (userName, password, fullName, email, phone, birthdate, address, role)
VALUES 
('dinh-huy-hoang', '100', N'Đinh Huy Hoàng', 'hoangdhde180623@fpt.edu.vn', '0829701569', '2004-09-05', N'88 Đinh Tiên Hoàng, Đồng Phú, Đồng Hới, Quảng Bình', 'admin'),
('leader-lor', '101', N'Nguyễn Đức Huy Hoàng Lỏ', 'hoangndhde180637@fpt.edu.vn', '0899886249', '2004-05-02', N'94 Châu Thị Vĩnh Tế, Bắc Mỹ Phú, Ngũ Hành Sơn, Đà Nẵng', 'admin'),
('le-dang-nhat-huy', '102', N'Lê Đặng Nhật Huy', 'huyldnde180697@fpt.edu.vn', '0342420875', '2004-03-03', N'253 Đ. Nguyễn Hoàng, Bình Hiên, Hải Châu, Đà Nẵng', 'admin'),
('dat-beo', '103', N'Đạt Béo', 'datltde180619@fpt.edu.vn', '0848884158', '2004-04-04', N'8-224 Nguyễn Trãi, Thành phố Huế, Thừa Thiên Huế', 'admin'),
('minh-hoang-beo', '104', N'Minh Hoàng Béo', 'hoanglvmde180724@fpt.edu.vn', '0818382344', '2004-06-05', N'56 Nguyễn Biểu, Thành Phố Huế, Thừa Thiên Huế', 'admin'),
('nguyen-thi-mai', '105', N'Nguyễn Thị Mai', 'nguyenmai@example.com', '4455667788', '1991-06-06', N'31 Sư Vạn Hạnh, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng', 'user'),
('vo-huynh-quang', '106', N'Võ Huỳnh Quang', 'voquang@example.com', '5566778899', '1993-07-07', N'B1.KCC, Hòa Xuân, Quận Cẩm Lệ, Thành phố Đà Nẵng', 'user'),
('duong-thi-nhu', '107', N'Dương Thị Nhu', 'duongnhu@example.com', '6677889900', '1989-08-08', N'18 Nguyễn Hành, Khuê Trung, Hải Châu, Đà Nẵng', 'user'),
('nguyen-dan-phuc', '108', N'Nguyễn Đan Phúc', 'nguyenphuc@example.com', '7788990011', '1994-09-09', N'582 Đ.Lê Văn Hiến, Hòa Hải, Ngũ Hành Sơn, Đà Nẵng', 'user'),
('ho-nguyen-thao', '109', N'Hồ Nguyễn Thảo', 'hothao@example.com', '8899001122', '1996-10-10', N'87 Đ.Nguyễn Văn Linh, Nam Dương, Hải Châu, Đà Nẵng', 'user'),
('tran-hoang-vu', '129', N'Trần Hoàng Vũ', 'vuth@example.com', '0912345001', '1988-01-10', N'123 Lê Lợi, TP Huế, Thừa Thiên Huế', 'host'),
('nguyen-thi-huong', '130', N'Nguyễn Thị Hương', 'huongnt@example.com', '0912345002', '1990-02-11', N'45 Nguyễn Huệ, TP Đà Nẵng', 'host'),
('pham-van-duc', '131', N'Phạm Văn Đức', 'ducpv@example.com', '0912345003', '1987-03-12', N'78 Trần Phú, TP Quảng Nam', 'host'),
('le-thi-thuy', '132', N'Lê Thị Thủy', 'thuylt@example.com', '0912345004', '1992-04-13', N'56 Nguyễn Tri Phương, TP Đà Nẵng', 'host'),
('hoang-van-anh', '133', N'Hoàng Văn Anh', 'anhhv@example.com', '0912345005', '1989-05-14', N'89 Phạm Văn Đồng, TP Huế', 'host'),
('vu-thi-ngan', '134', N'Vũ Thị Ngân', 'nganvt@example.com', '0912345006', '1991-06-15', N'12 Nguyễn Văn Cừ, TP Đà Nẵng', 'host'),
('do-van-hai', '135', N'Đỗ Văn Hải', 'haidv@example.com', '0912345007', '1986-07-16', N'34 Hùng Vương, TP Quảng Bình', 'host'),
('bui-thi-lien', '136', N'Bùi Thị Liên', 'lienbt@example.com', '0912345008', '1993-08-17', N'67 Lê Đình Dương, TP Huế', 'host'),
('ngo-van-thang', '137', N'Ngô Văn Thắng', 'thangnv@example.com', '0912345009', '1988-09-18', N'90 Nguyễn Thị Minh Khai, TP Đà Nẵng', 'host'),
('truong-thi-anh', '138', N'Trương Thị Ánh', 'anhtt@example.com', '0912345010', '1990-10-19', N'23 Trần Cao Vân, TP Huế', 'host'),
('dang-van-minh', '139', N'Đặng Văn Minh', 'minhdv@example.com', '0912345011', '1987-11-20', N'45 Lê Đại Hành, TP Huế', 'host'),
('pham-thi-tam', '140', N'Phạm Thị Tâm', 'tampt@example.com', '0912345012', '1992-12-21', N'78 Nguyễn Văn Linh, TP Đà Nẵng', 'host'),
('le-van-quang', '141', N'Lê Văn Quang', 'quanglv@example.com', '0912345013', '1989-01-22', N'56 Tôn Đức Thắng, TP Đà Nẵng', 'host'),
('nguyen-thi-van', '142', N'Nguyễn Thị Vân', 'vannt@example.com', '0912345014', '1991-02-23', N'89 Lý Thường Kiệt, TP Quảng Nam', 'host'),
('tran-van-kiet', '143', N'Trần Văn Kiệt', 'kiettv@example.com', '0912345015', '1986-03-24', N'12 Nguyễn Công Trứ, TP Huế', 'host'),
('hoang-thi-mai', '144', N'Hoàng Thị Mai', 'maiht@example.com', '0912345016', '1993-04-25', N'34 Đống Đa, TP Đà Nẵng', 'host'),
('vu-van-long', '145', N'Vũ Văn Long', 'longvv@example.com', '0912345017', '1988-05-26', N'67 Hùng Vương, TP Quảng Bình', 'host'),
('do-thi-hong', '146', N'Đỗ Thị Hồng', 'hongdt@example.com', '0912345018', '1990-06-27', N'90 Lê Lợi, TP Huế', 'host'),
('bui-van-nam', '147', N'Bùi Văn Nam', 'nambv@example.com', '0912345019', '1987-07-28', N'23 Nguyễn Huệ, TP Đà Nẵng', 'host'),
('ngo-thi-thao', '148', N'Ngô Thị Thảo', 'thaont@example.com', '0912345020', '1992-08-29', N'45 Trần Phú, TP Quảng Nam', 'host'),
('truong-van-hieu', '149', N'Trương Văn Hiếu', 'hieutv@example.com', '0912345021', '1989-09-30', N'78 Nguyễn Tri Phương, TP Đà Nẵng', 'host'),
('dang-thi-linh', '150', N'Đặng Thị Linh', 'linhdt@example.com', '0912345022', '1991-10-01', N'56 Phạm Văn Đồng, TP Huế', 'host'),
('pham-van-binh', '151', N'Phạm Văn Bình', 'binhpv@example.com', '0912345023', '1986-11-02', N'12 Nguyễn Văn Cừ, TP Đà Nẵng', 'host'),
('le-thi-nhung', '152', N'Lê Thị Nhung', 'nhunglt@example.com', '0912345024', '1993-12-03', N'34 Hùng Vương, TP Quảng Bình', 'host'),
('nguyen-van-tai', '153', N'Nguyễn Văn Tài', 'tainv@example.com', '0912345025', '1988-01-04', N'67 Lê Đình Dương, TP Huế', 'host'),
('tran-thi-phuong', '154', N'Trần Thị Phương', 'phuongtt@example.com', '0912345026', '1990-02-05', N'90 Nguyễn Thị Minh Khai, TP Đà Nẵng', 'host'),
('hoang-van-son', '155', N'Hoàng Văn Sơn', 'sonhv@example.com', '0912345027', '1987-03-06', N'23 Trần Cao Vân, TP Huế', 'host'),
('vu-thi-ly', '156', N'Vũ Thị Lý', 'lyvt@example.com', '0912345028', '1992-04-07', N'45 Lê Đại Hành, TP Huế', 'host'),
('do-van-thanh', '157', N'Đỗ Văn Thanh', 'thanhdv@example.com', '0912345029', '1989-05-08', N'78 Nguyễn Văn Linh, TP Đà Nẵng', 'host'),
('bui-thi-kim', '158', N'Bùi Thị Kim', 'kimbt@example.com', '0912345030', '1991-06-09', N'56 Tôn Đức Thắng, TP Đà Nẵng', 'host'),
('ngo-van-phuc', '159', N'Ngô Văn Phúc', 'phucnv@example.com', '0912345031', '1986-07-10', N'89 Lý Thường Kiệt, TP Quảng Nam', 'host'),
('truong-thi-hanh', '160', N'Trương Thị Hạnh', 'hanhtt@example.com', '0912345032', '1993-08-11', N'12 Nguyễn Công Trứ, TP Huế', 'host'),
('dang-van-tuan', '161', N'Đặng Văn Tuấn', 'tuandv@example.com', '0912345033', '1988-09-12', N'34 Đống Đa, TP Đà Nẵng', 'host'),
('pham-thi-uyen', '162', N'Phạm Thị Uyên', 'uyenpt@example.com', '0912345034', '1990-10-13', N'67 Hùng Vương, TP Quảng Bình', 'host'),
('le-van-khang', '163', N'Lê Văn Khang', 'khanglv@example.com', '0912345035', '1987-11-14', N'90 Lê Lợi, TP Huế', 'host'),
('nguyen-thi-hoa', '164', N'Nguyễn Thị Hòa', 'hoant@example.com', '0912345036', '1992-12-15', N'23 Nguyễn Huệ, TP Đà Nẵng', 'host'),
('tran-van-thien', '165', N'Trần Văn Thiên', 'thientv@example.com', '0912345037', '1989-01-16', N'45 Trần Phú, TP Quảng Nam', 'host'),
('hoang-thi-diep', '166', N'Hoàng Thị Diệp', 'diepht@example.com', '0912345038', '1991-02-17', N'78 Nguyễn Tri Phương, TP Đà Nẵng', 'host'),
('vu-van-hung', '167', N'Vũ Văn Hùng', 'hungvv@example.com', '0912345039', '1986-03-18', N'56 Phạm Văn Đồng, TP Huế', 'host'),
('do-thi-thu', '168', N'Đỗ Thị Thu', 'thudt@example.com', '0912345040', '1993-04-19', N'12 Nguyễn Văn Cừ, TP Đà Nẵng', 'host');
go
-- Create the Homestays table
CREATE TABLE Homestays (
    homestay_id INT PRIMARY KEY IDENTITY(1,1),
    host_id INT,
    homestayName NVARCHAR(100) NULL,
    address NVARCHAR(255) NULL,
    description nvarchar(1000),
    status BIT DEFAULT 1,
    location NVARCHAR(100) NULL
)
GO

-- Insert 50 homestays with 20 modified entries for Đà Lạt, Đà Nẵng, and Hà Nội
INSERT INTO Homestays (host_id, homestayName, address, description, location)
VALUES 
-- Modified entries for Đà Lạt (7 entries)
(11, N'Da Lat Dreamy Homestay', N'25 Trương Công Định, TP Đà Lạt, Lâm Đồng', N'Homestay phong cách vintage giữa lòng Đà Lạt, gần chợ đêm. Cung cấp tour săn mây và xe đạp miễn phí.', N'Đà Lạt'),
(12, N'Pine Hill Homestay', N'10 Nguyễn Thị Minh Khai, TP Đà Lạt, Lâm Đồng', N'Homestay nằm giữa rừng thông, view thung lũng. Có khu vực BBQ và tour khám phá đồi chè.', N'Đà Lạt'),
(13, N'Da Lat Blossom Homestay', N'15 Lê Đại Hành, TP Đà Lạt, Lâm Đồng', N'Homestay gần hồ Xuân Hương, thiết kế hiện đại. Hỗ trợ tour thác Datanla và lớp học làm bánh.', N'Đà Lạt'),
(14, N'Misty Valley Homestay', N'8 Phạm Ngọc Thạch, TP Đà Lạt, Lâm Đồng', N'Homestay view đồi núi, không khí trong lành. Cung cấp xe máy cho thuê và tour làng Cù Lần.', N'Đà Lạt'),
(15, N'Flower Garden Homestay', N'30 Nguyễn Chí Thanh, TP Đà Lạt, Lâm Đồng', N'Homestay giữa vườn hoa lavender, gần thung lũng Tình Yêu. Có sân thượng và dịch vụ chụp ảnh.', N'Đà Lạt'),
(16, N'Da Lat Cozy Homestay', N'12 Hoàng Diệu, TP Đà Lạt, Lâm Đồng', N'Homestay ấm cúng gần ga Đà Lạt, phong cách retro. Hỗ trợ tour khám phá nhà thờ Domain.', N'Đà Lạt'),
(17, N'Starlight Homestay', N'20 Bùi Thị Xuân, TP Đà Lạt, Lâm Đồng', N'Homestay gần quảng trường Lâm Viên, view thành phố. Cung cấp tour đạp xe và WiFi miễn phí.', N'Đà Lạt'),

-- Modified entries for Đà Nẵng (7 entries)
(18, N'Da Nang Ocean Homestay', N'123 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng', N'Homestay gần bãi biển Mỹ Khê, view biển tuyệt đẹp. Cung cấp tour Bà Nà Hills và kayak.', N'Đà Nẵng'),
(19, N'Han River Homestay', N'45 Trần Phú, Hải Châu, Đà Nẵng', N'Homestay bên sông Hàn, gần cầu Rồng. Hỗ trợ tour Hội An và dịch vụ thuê xe đạp.', N'Đà Nẵng'),
(20, N'My Khe Beach Homestay', N'88 An Dương Vương, Sơn Trà, Đà Nẵng', N'Homestay gần bãi biển Non Nước, thiết kế hiện đại. Cung cấp tour Ngũ Hành Sơn và WiFi miễn phí.', N'Đà Nẵng'),
(21, N'Da Nang Sky Homestay', N'15 Nguyễn Văn Linh, Hải Châu, Đà Nẵng', N'Homestay trên cao với view thành phố, gần cầu Tình Yêu. Hỗ trợ tour bán đảo Sơn Trà.', N'Đà Nẵng'),
(22, N'Sunset Bridge Homestay', N'30 Bạch Đằng, Hải Châu, Đà Nẵng', N'Homestay gần cầu quay sông Hàn, không khí sôi động. Cung cấp tour ẩm thực đường phố.', N'Đà Nẵng'),
(23, N'Coral Reef Homestay', N'50 Hồ Nghinh, Sơn Trà, Đà Nẵng', N'Homestay gần bãi biển Phạm Văn Đồng, cung cấp dịch vụ lặn ngắm san hô và BBQ.', N'Đà Nẵng'),
(24, N'Da Nang Green Homestay', N'12 Lê Đình Dương, Hải Châu, Đà Nẵng', N'Homestay gần công viên Châu Á, phong cách eco-friendly. Hỗ trợ tour Cù Lao Chàm.', N'Đà Nẵng'),

-- Modified entries for Hà Nội (6 entries)
(25, N'Hanoi Charm Homestay', N'10 Hàng Bông, Hoàn Kiếm, Hà Nội', N'Homestay tại phố cổ, gần hồ Hoàn Kiếm. Cung cấp tour ẩm thực và lớp học làm phở.', N'Hà Nội'),
(26, N'Old Gate Homestay', N'45 Hàng Mã, Hoàn Kiếm, Hà Nội', N'Homestay gần chợ đêm, phong cách truyền thống. Hỗ trợ tour Văn Miếu và xe đạp miễn phí.', N'Hà Nội'),
(27, N'Hoan Kiem Lake Homestay', N'20 Lý Thái Tổ, Hoàn Kiếm, Hà Nội', N'Homestay view hồ Hoàn Kiếm, gần nhà hát lớn. Cung cấp tour xe điện khám phá phố cổ.', N'Hà Nội'),
(28, N'Hanoi Lotus Homestay', N'15 Nguyễn Đình Chiểu, Ba Đình, Hà Nội', N'Homestay gần lăng Bác, thiết kế thanh lịch. Hỗ trợ tour làng gốm Bát Tràng.', N'Hà Nội'),
(29, N'Tran Quoc Pagoda Homestay', N'30 Thanh Niên, Tây Hồ, Hà Nội', N'Homestay gần hồ Tây và chùa Trấn Quốc. Cung cấp tour đạp xe và dịch vụ chụp ảnh.', N'Hà Nội'),
(30, N'Hanoi Vintage Homestay', N'55 Nguyễn Thái Học, Ba Đình, Hà Nội', N'Homestay phong cách cổ điển gần Văn Miếu. Hỗ trợ tour khám phá bảo tàng và WiFi miễn phí.', N'Hà Nội'),

-- Unchanged entries (host_id 31 to 50 from original data)
(31, N'Phu Quoc Paradise Homestay', N'45 Cửa Lấp, Dương Tơ, Phú Quốc, Kiên Giang', N'Homestay gần bãi Sao, cung cấp tour lặn ngắm san hô và dịch vụ thuê xe máy.', N'Phú Quốc'),
(32, N'Can Tho Garden Homestay', N'12 Bùi Hữu Nghĩa, Ninh Kiều, Cần Thơ', N'Homestay gần bến Ninh Kiều, có khu vườn xanh mát. Cung cấp tour chợ nổi và xe đạp miễn phí.', N'Cần Thơ'),
(33, N'Mai Chau Valley Homestay', N'Bản Pom Coọng, Mai Châu, Hòa Bình', N'Homestay giữa bản làng Thái, cung cấp trải nghiệm văn hóa và tour đạp xe khám phá.', N'Mai Châu'),
(34, N'Cat Ba Green Homestay', N'45 Tùng Dinh, Cát Bà, Hải Phòng', N'Homestay gần rừng quốc gia Cát Bà, cung cấp tour kayak và leo núi.', N'Cát Bà'),
(35, N'Phong Nha Lake Homestay', N'Thôn Cù Lạc, Phong Nha, Quảng Bình', N'Homestay gần hồ, view núi. Hỗ trợ tour động Phong Nha và dịch vụ thuê xe máy.', N'Phong Nha'),
(36, N'Con Dao Serenity Homestay', N'8 Lê Văn Lương, Côn Đảo, Bà Rịa - Vũng Tàu', N'Homestay gần bãi Đầm Trầu, cung cấp tour khám phá đảo và lặn ngắm san hô.', N'Côn Đảo'),
(37, N'Vung Tau Horizon Homestay', N'88 Thùy Vân, Phường 2, Vũng Tàu', N'Homestay gần bãi Trước, view biển. Cung cấp khu vực BBQ và WiFi miễn phí.', N'Vũng Tàu'),
(38, N'Mui Ne Ocean Homestay', N'78 Huỳnh Thúc Kháng, Mũi Né, Phan Thiết, Bình Thuận', N'Homestay gần bãi biển, cung cấp tour đồi cát và lướt ván.', N'Mũi Né'),
(39, N'Ha Giang Cloud Homestay', N'Thôn Lùng Tám, Quản Bạ, Hà Giang', N'Homestay giữa núi non, view thung lũng. Hỗ trợ tour xe máy khám phá cao nguyên đá.', N'Hà Giang'),
(40, N'Ba Be Eco Homestay', N'Bản Bó Lù, Ba Bể, Bắc Kạn', N'Homestay bên hồ Ba Bể, cung cấp tour chèo thuyền và trải nghiệm văn hóa dân tộc Tày.', N'Ba Bể'),
(41, N'Lang Son Mountain Homestay', N'Thôn Khuổi Ky, Đồng Đăng, Lạng Sơn', N'Homestay giữa núi rừng Đông Bắc, gần chợ Kỳ Lừa. Hỗ trợ tour khám phá hang động và văn hóa dân tộc Nùng.', N'Lạng Sơn'),
(42, N'Quy Nhon Beach Homestay', N'45 Nguyễn Huệ, TP Quy Nhơn, Bình Định', N'Homestay gần bãi biển Quy Nhơn, view biển. Cung cấp tour đảo Kỳ Co và dịch vụ thuê xe máy.', N'Quy Nhơn'),
(43, N'Phan Rang Desert Homestay', N'Thôn Mỹ Nghiệp, Ninh Hải, Ninh Thuận', N'Homestay gần làng gốm Bàu Trúc và đồi cát Nam Cương. Hỗ trợ tour khám phá văn hóa Chăm.', N'Phan Rang'),
(44, N'Ca Mau Mangrove Homestay', N'Thôn Tân Thuận, Đất Mũi, Cà Mau', N'Homestay giữa rừng đước Đất Mũi, gần mũi Cà Mau. Cung cấp tour chèo xuồng và khám phá hệ sinh thái.', N'Cà Mau'),
(45, N'Hoa Binh Lake Homestay', N'Thôn Ngòi Hoa, Tân Lạc, Hòa Bình', N'Homestay bên hồ Hòa Bình, view núi non. Có tour chèo thuyền và trải nghiệm văn hóa dân tộc Mường.', N'Hòa Bình'),
(46, N'Ben Tre Coconut Homestay', N'Xã Tân Thạch, Châu Thành, Bến Tre', N'Homestay giữa vườn dừa, gần sông Mekong. Cung cấp tour chèo thuyền khám phá kênh rạch và làm bánh dân gian.', N'Bến Tre'),
(47, N'Vinh Long River Homestay', N'45 An Bình, TP Vĩnh Long, Vĩnh Long', N'Homestay bên sông Cổ Chiên, gần chợ nổi Trà Ôn. Hỗ trợ tour khám phá miền Tây và xe đạp miễn phí.', N'Vĩnh Long'),
(48, N'Lao Cai Highland Homestay', N'Bản Cát Cát, Sa Pa, Lào Cai', N'Homestay giữa bản Cát Cát, view ruộng bậc thang. Có tour trekking và trải nghiệm văn hóa dân tộc H’Mông.', N'Sa Pa'),
(49, N'Tay Ninh Ba Den Homestay', N'Thôn Ninh Trung, TP Tây Ninh', N'Homestay gần núi Bà Đen, cung cấp tour cáp treo và khám phá thánh thất Cao Đài.', N'Tây Ninh'),
(50, N'Nam Dinh Coastal Homestay', N'Thị trấn Quất Lâm, Giao Thủy, Nam Định', N'Homestay gần biển Quất Lâm, cung cấp tour khám phá vườn quốc gia Xuân Thủy và văn hóa địa phương.', N'Nam Định')
GO

-- bảng rooms: quản lý phòng trong homestay
create table Rooms(
	--room-id int primary key identity(1,1),
	homestay_id int,
	room_number varchar(10), --Sửa ở đây
	type varchar(50)  null,
	capacity int  null check (capacity >0 ),
	price Decimal(10,2)  null check (price >=0),
	rating float check (rating between 0 and 5),
	status bit default 1,
	primary key (homestay_id,room_number),
	foreign key (homestay_id) references Homestays(homestay_id)
)
go

INSERT INTO Rooms (homestay_id, room_number, type, capacity, price, rating)
VALUES
-- Homestay 1: Phu Quoc Sunset Homestay
(1, 'R01', 'Standard', 2, 250000.00, 4.0),
(1, 'R02', 'Standard', 2, 250000.00, 4.0),
(1, 'R03', 'Deluxe', 3, 400000.00, 4.5),
(1, 'R04', 'Deluxe', 3, 400000.00, 4.5),
(1, 'R05', 'Family', 4, 600000.00, 4.7),
(1, 'R06', 'Family', 4, 600000.00, 4.7),
(1, 'R07', 'Dormitory', 6, 150000.00, 3.8),
(1, 'R08', 'Dormitory', 6, 150000.00, 3.8),
(1, 'R09', 'Suite', 2, 800000.00, 4.8),
(1, 'R10', 'Suite', 2, 800000.00, 4.8),
-- Homestay 2: Can Tho Riverside Homestay
(2, 'R01', 'Standard', 2, 300000.00, 4.2),
(2, 'R02', 'Standard', 2, 300000.00, 4.2),
(2, 'R03', 'Deluxe', 3, 450000.00, 4.6),
(2, 'R04', 'Deluxe', 3, 450000.00, 4.6),
(2, 'R05', 'Family', 4, 650000.00, 4.8),
(2, 'R06', 'Family', 4, 650000.00, 4.8),
(2, 'R07', 'Dormitory', 6, 200000.00, 4.0),
(2, 'R08', 'Dormitory', 6, 200000.00, 4.0),
(2, 'R09', 'Suite', 2, 900000.00, 4.9),
(2, 'R10', 'Suite', 2, 900000.00, 4.9),
-- Homestay 3: Mai Chau Eco Homestay
(3, 'R01', 'Standard', 2, 350000.00, 4.3),
(3, 'R02', 'Standard', 2, 350000.00, 4.3),
(3, 'R03', 'Deluxe', 3, 500000.00, 4.7),
(3, 'R04', 'Deluxe', 3, 500000.00, 4.7),
(3, 'R05', 'Family', 4, 700000.00, 4.9),
(3, 'R06', 'Family', 4, 700000.00, 4.9),
(3, 'R07', 'Dormitory', 6, 250000.00, 4.1),
(3, 'R08', 'Dormitory', 6, 250000.00, 4.1),
(3, 'R09', 'Suite', 2, 1000000.00, 5.0),
(3, 'R10', 'Suite', 2, 1000000.00, 5.0),
-- Homestay 4: Cat Ba Island Homestay
(4, 'R01', 'Standard', 2, 400000.00, 4.4),
(4, 'R02', 'Standard', 2, 400000.00, 4.4),
(4, 'R03', 'Deluxe', 3, 550000.00, 4.8),
(4, 'R04', 'Deluxe', 3, 550000.00, 4.8),
(4, 'R05', 'Family', 4, 750000.00, 4.9),
(4, 'R06', 'Family', 4, 750000.00, 4.9),
(4, 'R07', 'Dormitory', 6, 300000.00, 4.2),
(4, 'R08', 'Dormitory', 6, 300000.00, 4.2),
(4, 'R09', 'Suite', 2, 1100000.00, 5.0),
(4, 'R10', 'Suite', 2, 1100000.00, 5.0),
-- Homestay 5: Phong Nha Village Homestay
(5, 'R01', 'Standard', 2, 350000.00, 4.1),
(5, 'R02', 'Standard', 2, 350000.00, 4.1),
(5, 'R03', 'Deluxe', 3, 500000.00, 4.5),
(5, 'R04', 'Deluxe', 3, 500000.00, 4.5),
(5, 'R05', 'Family', 4, 700000.00, 4.7),
(5, 'R06', 'Family', 4, 700000.00, 4.7),
(5, 'R07', 'Dormitory', 6, 250000.00, 4.0),
(5, 'R08', 'Dormitory', 6, 250000.00, 4.0),
(5, 'R09', 'Suite', 2, 1000000.00, 4.8),
(5, 'R10', 'Suite', 2, 1000000.00, 4.8),
-- Homestay 6: Con Dao Ocean Homestay
(6, 'R01', 'Standard', 2, 300000.00, 4.2),
(6, 'R02', 'Standard', 2, 300000.00, 4.2),
(6, 'R03', 'Deluxe', 3, 450000.00, 4.6),
(6, 'R04', 'Deluxe', 3, 450000.00, 4.6),
(6, 'R05', 'Family', 4, 650000.00, 4.8),
(6, 'R06', 'Family', 4, 650000.00, 4.8),
(6, 'R07', 'Dormitory', 6, 200000.00, 4.0),
(6, 'R08', 'Dormitory', 6, 200000.00, 4.0),
(6, 'R09', 'Suite', 2, 900000.00, 4.9),
(6, 'R10', 'Suite', 2, 900000.00, 4.9),
-- Homestay 7: Vung Tau Coastal Homestay
(7, 'R01', 'Standard', 2, 350000.00, 4.3),
(7, 'R02', 'Standard', 2, 350000.00, 4.3),
(7, 'R03', 'Deluxe', 3, 500000.00, 4.7),
(7, 'R04', 'Deluxe', 3, 500000.00, 4.7),
(7, 'R05', 'Family', 4, 700000.00, 4.9),
(7, 'R06', 'Family', 4, 700000.00, 4.9),
(7, 'R07', 'Dormitory', 6, 250000.00, 4.1),
(7, 'R08', 'Dormitory', 6, 250000.00, 4.1),
(7, 'R09', 'Suite', 2, 1000000.00, 5.0),
(7, 'R10', 'Suite', 2, 1000000.00, 5.0),
-- Homestay 8: Mui Ne Sandy Homestay
(8, 'R01', 'Standard', 2, 400000.00, 4.4),
(8, 'R02', 'Standard', 2, 400000.00, 4.4),
(8, 'R03', 'Deluxe', 3, 550000.00, 4.8),
(8, 'R04', 'Deluxe', 3, 550000.00, 4.8),
(8, 'R05', 'Family', 4, 750000.00, 4.9),
(8, 'R06', 'Family', 4, 750000.00, 4.9),
(8, 'R07', 'Dormitory', 6, 300000.00, 4.2),
(8, 'R08', 'Dormitory', 6, 300000.00, 4.2),
(8, 'R09', 'Suite', 2, 1100000.00, 5.0),
(8, 'R10', 'Suite', 2, 1100000.00, 5.0),
-- Homestay 9: Ha Giang Loop Homestay
(9, 'R01', 'Standard', 2, 350000.00, 4.1),
(9, 'R02', 'Standard', 2, 350000.00, 4.1),
(9, 'R03', 'Deluxe', 3, 500000.00, 4.5),
(9, 'R04', 'Deluxe', 3, 500000.00, 4.5),
(9, 'R05', 'Family', 4, 700000.00, 4.7),
(9, 'R06', 'Family', 4, 700000.00, 4.7),
(9, 'R07', 'Dormitory', 6, 250000.00, 4.0),
(9, 'R08', 'Dormitory', 6, 250000.00, 4.0),
(9, 'R09', 'Suite', 2, 1000000.00, 4.8),
(9, 'R10', 'Suite', 2, 1000000.00, 4.8),
-- Homestay 10: Ba Be Lake Homestay
(10, 'R01', 'Standard', 2, 300000.00, 4.2),
(10, 'R02', 'Standard', 2, 300000.00, 4.2),
(10, 'R03', 'Deluxe', 3, 450000.00, 4.6),
(10, 'R04', 'Deluxe', 3, 450000.00, 4.6),
(10, 'R05', 'Family', 4, 650000.00, 4.8),
(10, 'R06', 'Family', 4, 650000.00, 4.8),
(10, 'R07', 'Dormitory', 6, 200000.00, 4.0),
(10, 'R08', 'Dormitory', 6, 200000.00, 4.0),
(10, 'R09', 'Suite', 2, 900000.00, 4.9),
(10, 'R10', 'Suite', 2, 900000.00, 4.9),
-- Homestay 11: Hanoi Old Quarter Homestay
(11, 'R01', 'Standard', 2, 350000.00, 4.3),
(11, 'R02', 'Standard', 2, 350000.00, 4.3),
(11, 'R03', 'Deluxe', 3, 500000.00, 4.7),
(11, 'R04', 'Deluxe', 3, 500000.00, 4.7),
(11, 'R05', 'Family', 4, 700000.00, 4.9),
(11, 'R06', 'Family', 4, 700000.00, 4.9),
(11, 'R07', 'Dormitory', 6, 250000.00, 4.1),
(11, 'R08', 'Dormitory', 6, 250000.00, 4.1),
(11, 'R09', 'Suite', 2, 1000000.00, 5.0),
(11, 'R10', 'Suite', 2, 1000000.00, 5.0),
-- Homestay 12: Sapa Valley Homestay
(12, 'R01', 'Standard', 2, 400000.00, 4.4),
(12, 'R02', 'Standard', 2, 400000.00, 4.4),
(12, 'R03', 'Deluxe', 3, 550000.00, 4.8),
(12, 'R04', 'Deluxe', 3, 550000.00, 4.8),
(12, 'R05', 'Family', 4, 750000.00, 4.9),
(12, 'R06', 'Family', 4, 750000.00, 4.9),
(12, 'R07', 'Dormitory', 6, 300000.00, 4.2),
(12, 'R08', 'Dormitory', 6, 300000.00, 4.2),
(12, 'R09', 'Suite', 2, 1100000.00, 5.0),
(12, 'R10', 'Suite', 2, 1100000.00, 5.0),
-- Homestay 13: Ha Long Pearl Homestay
(13, 'R01', 'Standard', 2, 350000.00, 4.1),
(13, 'R02', 'Standard', 2, 350000.00, 4.1),
(13, 'R03', 'Deluxe', 3, 500000.00, 4.5),
(13, 'R04', 'Deluxe', 3, 500000.00, 4.5),
(13, 'R05', 'Family', 4, 700000.00, 4.7),
(13, 'R06', 'Family', 4, 700000.00, 4.7),
(13, 'R07', 'Dormitory', 6, 250000.00, 4.0),
(13, 'R08', 'Dormitory', 6, 250000.00, 4.0),
(13, 'R09', 'Suite', 2, 1000000.00, 4.8),
(13, 'R10', 'Suite', 2, 1000000.00, 4.8),
-- Homestay 14: Ninh Binh Lotus Homestay
(14, 'R01', 'Standard', 2, 300000.00, 4.2),
(14, 'R02', 'Standard', 2, 300000.00, 4.2),
(14, 'R03', 'Deluxe', 3, 450000.00, 4.6),
(14, 'R04', 'Deluxe', 3, 450000.00, 4.6),
(14, 'R05', 'Family', 4, 650000.00, 4.8),
(14, 'R06', 'Family', 4, 650000.00, 4.8),
(14, 'R07', 'Dormitory', 6, 200000.00, 4.0),
(14, 'R08', 'Dormitory', 6, 200000.00, 4.0),
(14, 'R09', 'Suite', 2, 900000.00, 4.9),
(14, 'R10', 'Suite', 2, 900000.00, 4.9),
-- Homestay 15: Hue Heritage Homestay
(15, 'R01', 'Standard', 2, 350000.00, 4.3),
(15, 'R02', 'Standard', 2, 350000.00, 4.3),
(15, 'R03', 'Deluxe', 3, 500000.00, 4.7),
(15, 'R04', 'Deluxe', 3, 500000.00, 4.7),
(15, 'R05', 'Family', 4, 700000.00, 4.9),
(15, 'R06', 'Family', 4, 700000.00, 4.9),
(15, 'R07', 'Dormitory', 6, 250000.00, 4.1),
(15, 'R08', 'Dormitory', 6, 250000.00, 4.1),
(15, 'R09', 'Suite', 2, 1000000.00, 5.0),
(15, 'R10', 'Suite', 2, 1000000.00, 5.0),
-- Homestay 16:Da Nang Skyline Homestay
(16, 'R01', 'Standard', 2, 400000.00, 4.4),
(16, 'R02', 'Standard', 2, 400000.00, 4.4),
(16, 'R03', 'Deluxe', 3, 550000.00, 4.8),
(16, 'R04', 'Deluxe', 3, 550000.00, 4.8),
(16, 'R05', 'Family', 4, 750000.00, 4.9),
(16, 'R06', 'Family', 4, 750000.00, 4.9),
(16, 'R07', 'Dormitory', 6, 300000.00, 4.2),
(16, 'R08', 'Dormitory', 6, 300000.00, 4.2),
(16, 'R09', 'Suite', 2, 1100000.00, 5.0),
(16, 'R10', 'Suite', 2, 1100000.00, 5.0),
-- Homestay 17: Hoi An Riverside Homestay
(17, 'R01', 'Standard', 2, 350000.00, 4.1),
(17, 'R02', 'Standard', 2, 350000.00, 4.1),
(17, 'R03', 'Deluxe', 3, 500000.00, 4.5),
(17, 'R04', 'Deluxe', 3, 500000.00, 4.5),
(17, 'R05', 'Family', 4, 700000.00, 4.7),
(17, 'R06', 'Family', 4, 700000.00, 4.7),
(17, 'R07', 'Dormitory', 6, 250000.00, 4.0),
(17, 'R08', 'Dormitory', 6, 250000.00, 4.0),
(17, 'R09', 'Suite', 2, 1000000.00, 4.8),
(17, 'R10', 'Suite', 2, 1000000.00, 4.8),
-- Homestay 18: Nha Trang Seaside Homestay
(18, 'R01', 'Standard', 2, 300000.00, 4.2),
(18, 'R02', 'Standard', 2, 300000.00, 4.2),
(18, 'R03', 'Deluxe', 3, 450000.00, 4.6),
(18, 'R04', 'Deluxe', 3, 450000.00, 4.6),
(18, 'R05', 'Family', 4, 650000.00, 4.8),
(18, 'R06', 'Family', 4, 650000.00, 4.8),
(18, 'R07', 'Dormitory', 6, 200000.00, 4.0),
(18, 'R08', 'Dormitory', 6, 200000.00, 4.0),
(18, 'R09', 'Suite', 2, 900000.00, 4.9),
(18, 'R10', 'Suite', 2, 900000.00, 4.9),
-- Homestay 19:Da Lat Flower Homestay
(19, 'R01', 'Standard', 2, 350000.00, 4.3),
(19, 'R02', 'Standard', 2, 350000.00, 4.3),
(19, 'R03', 'Deluxe', 3, 500000.00, 4.7),
(19, 'R04', 'Deluxe', 3, 500000.00, 4.7),
(19, 'R05', 'Family', 4, 700000.00, 4.9),
(19, 'R06', 'Family', 4, 700000.00, 4.9),
(19, 'R07', 'Dormitory', 6, 250000.00, 4.1),
(19, 'R08', 'Dormitory', 6, 250000.00, 4.1),
(19, 'R09', 'Suite', 2, 1000000.00, 5.0),
(19, 'R10', 'Suite', 2, 1000000.00, 5.0),
-- Homestay 20: Saigon Central Homestay
(20, 'R01', 'Standard', 2, 400000.00, 4.4),
(20, 'R02', 'Standard', 2, 400000.00, 4.4),
(20, 'R03', 'Deluxe', 3, 550000.00, 4.8),
(20, 'R04', 'Deluxe', 3, 550000.00, 4.8),
(20, 'R05', 'Family', 4, 750000.00, 4.9),
(20, 'R06', 'Family', 4, 750000.00, 4.9),
(20, 'R07', 'Dormitory', 6, 300000.00, 4.2),
(20, 'R08', 'Dormitory', 6, 300000.00, 4.2),
(20, 'R09', 'Suite', 2, 1100000.00, 5.0),
(20, 'R10', 'Suite', 2, 1100000.00, 5.0),
-- Homestay 21: Phu Quoc Paradise Homestay
(21, 'R01', 'Standard', 2, 350000.00, 4.1),
(21, 'R02', 'Standard', 2, 350000.00, 4.1),
(21, 'R03', 'Deluxe', 3, 500000.00, 4.5),
(21, 'R04', 'Deluxe', 3, 500000.00, 4.5),
(21, 'R05', 'Family', 4, 700000.00, 4.7),
(21, 'R06', 'Family', 4, 700000.00, 4.7),
(21, 'R07', 'Dormitory', 6, 250000.00, 4.0),
(21, 'R08', 'Dormitory', 6, 250000.00, 4.0),
(21, 'R09', 'Suite', 2, 1000000.00, 4.8),
(21, 'R10', 'Suite', 2, 1000000.00, 4.8),
-- Homestay 22: Can Tho Garden Homestay
(22, 'R01', 'Standard', 2, 300000.00, 4.2),
(22, 'R02', 'Standard', 2, 300000.00, 4.2),
(22, 'R03', 'Deluxe', 3, 450000.00, 4.6),
(22, 'R04', 'Deluxe', 3, 450000.00, 4.6),
(22, 'R05', 'Family', 4, 650000.00, 4.8),
(22, 'R06', 'Family', 4, 650000.00, 4.8),
(22, 'R07', 'Dormitory', 6, 200000.00, 4.0),
(22, 'R08', 'Dormitory', 6, 200000.00, 4.0),
(22, 'R09', 'Suite', 2, 900000.00, 4.9),
(22, 'R10', 'Suite', 2, 900000.00, 4.9),
-- Homestay 23: Mai Chau Valley Homestay
(23, 'R01', 'Standard', 2, 350000.00, 4.3),
(23, 'R02', 'Standard', 2, 350000.00, 4.3),
(23, 'R03', 'Deluxe', 3, 500000.00, 4.7),
(23, 'R04', 'Deluxe', 3, 500000.00, 4.7),
(23, 'R05', 'Family', 4, 700000.00, 4.9),
(23, 'R06', 'Family', 4, 700000.00, 4.9),
(23, 'R07', 'Dormitory', 6, 250000.00, 4.1),
(23, 'R08', 'Dormitory', 6, 250000.00, 4.1),
(23, 'R09', 'Suite', 2, 1000000.00, 5.0),
(23, 'R10', 'Suite', 2, 1000000.00, 5.0),
-- Homestay 24: Cat Ba Green Homestay
(24, 'R01', 'Standard', 2, 400000.00, 4.4),
(24, 'R02', 'Standard', 2, 400000.00, 4.4),
(24, 'R03', 'Deluxe', 3, 550000.00, 4.8),
(24, 'R04', 'Deluxe', 3, 550000.00, 4.8),
(24, 'R05', 'Family', 4, 750000.00, 4.9),
(24, 'R06', 'Family', 4, 750000.00, 4.9),
(24, 'R07', 'Dormitory', 6, 300000.00, 4.2),
(24, 'R08', 'Dormitory', 6, 300000.00, 4.2),
(24, 'R09', 'Suite', 2, 1100000.00, 5.0),
(24, 'R10', 'Suite', 2, 1100000.00, 5.0),
-- Homestay 25: Phong Nha Lake Homestay
(25, 'R01', 'Standard', 2, 350000.00, 4.1),
(25, 'R02', 'Standard', 2, 350000.00, 4.1),
(25, 'R03', 'Deluxe', 3, 500000.00, 4.5),
(25, 'R04', 'Deluxe', 3, 500000.00, 4.5),
(25, 'R05', 'Family', 4, 700000.00, 4.7),
(25, 'R06', 'Family', 4, 700000.00, 4.7),
(25, 'R07', 'Dormitory', 6, 250000.00, 4.0),
(25, 'R08', 'Dormitory', 6, 250000.00, 4.0),
(25, 'R09', 'Suite', 2, 1000000.00, 4.8),
(25, 'R10', 'Suite', 2, 1000000.00, 4.8),
-- Homestay 26: Con Dao Serenity Homestay
(26, 'R01', 'Standard', 2, 300000.00, 4.2),
(26, 'R02', 'Standard', 2, 300000.00, 4.2),
(26, 'R03', 'Deluxe', 3, 450000.00, 4.6),
(26, 'R04', 'Deluxe', 3, 450000.00, 4.6),
(26, 'R05', 'Family', 4, 650000.00, 4.8),
(26, 'R06', 'Family', 4, 650000.00, 4.8),
(26, 'R07', 'Dormitory', 6, 200000.00, 4.0),
(26, 'R08', 'Dormitory', 6, 200000.00, 4.0),
(26, 'R09', 'Suite', 2, 900000.00, 4.9),
(26, 'R10', 'Suite', 2, 900000.00, 4.9),
-- Homestay 27: Vung Tau Horizon Homestay
(27, 'R01', 'Standard', 2, 350000.00, 4.3),
(27, 'R02', 'Standard', 2, 350000.00, 4.3),
(27, 'R03', 'Deluxe', 3, 500000.00, 4.7),
(27, 'R04', 'Deluxe', 3, 500000.00, 4.7),
(27, 'R05', 'Family', 4, 700000.00, 4.9),
(27, 'R06', 'Family', 4, 700000.00, 4.9),
(27, 'R07', 'Dormitory', 6, 250000.00, 4.1),
(27, 'R08', 'Dormitory', 6, 250000.00, 4.1),
(27, 'R09', 'Suite', 2, 1000000.00, 5.0),
(27, 'R10', 'Suite', 2, 1000000.00, 5.0),
-- Homestay 28: Mui Ne Ocean Homestay
(28, 'R01', 'Standard', 2, 400000.00, 4.4),
(28, 'R02', 'Standard', 2, 400000.00, 4.4),
(28, 'R03', 'Deluxe', 3, 550000.00, 4.8),
(28, 'R04', 'Deluxe', 3, 550000.00, 4.8),
(28, 'R05', 'Family', 4, 750000.00, 4.9),
(28, 'R06', 'Family', 4, 750000.00, 4.9),
(28, 'R07', 'Dormitory', 6, 300000.00, 4.2),
(28, 'R08', 'Dormitory', 6, 300000.00, 4.2),
(28, 'R09', 'Suite', 2, 1100000.00, 5.0),
(28, 'R10', 'Suite', 2, 1100000.00, 5.0),
-- Homestay 29: Ha Giang Cloud Homestay
(29, 'R01', 'Standard', 2, 350000.00, 4.1),
(29, 'R02', 'Standard', 2, 350000.00, 4.1),
(29, 'R03', 'Deluxe', 3, 500000.00, 4.5),
(29, 'R04', 'Deluxe', 3, 500000.00, 4.5),
(29, 'R05', 'Family', 4, 700000.00, 4.7),
(29, 'R06', 'Family', 4, 700000.00, 4.7),
(29, 'R07', 'Dormitory', 6, 250000.00, 4.0),
(29, 'R08', 'Dormitory', 6, 250000.00, 4.0),
(29, 'R09', 'Suite', 2, 1000000.00, 4.8),
(29, 'R10', 'Suite', 2, 1000000.00, 4.8),
-- Homestay 30: Ba Be Eco Homestay
(30, 'R01', 'Standard', 2, 300000.00, 4.2),
(30, 'R02', 'Standard', 2, 300000.00, 4.2),
(30, 'R03', 'Deluxe', 3, 450000.00, 4.6),
(30, 'R04', 'Deluxe', 3, 450000.00, 4.6),
(30, 'R05', 'Family', 4, 650000.00, 4.8),
(30, 'R06', 'Family', 4, 650000.00, 4.8),
(30, 'R07', 'Dormitory', 6, 200000.00, 4.0),
(30, 'R08', 'Dormitory', 6, 200000.00, 4.0),
(30, 'R09', 'Suite', 2, 900000.00, 4.9),
(30, 'R10', 'Suite', 2, 900000.00, 4.9),
-- Homestay 31: Lang Son Mountain Homestay
(31, 'R01', 'Standard', 2, 350000.00, 4.3),
(31, 'R02', 'Standard', 2, 350000.00, 4.3),
(31, 'R03', 'Deluxe', 3, 500000.00, 4.7),
(31, 'R04', 'Deluxe', 3, 500000.00, 4.7),
(31, 'R05', 'Family', 4, 700000.00, 4.9),
(31, 'R06', 'Family', 4, 700000.00, 4.9),
(31, 'R07', 'Dormitory', 6, 250000.00, 4.1),
(31, 'R08', 'Dormitory', 6, 250000.00, 4.1),
(31, 'R09', 'Suite', 2, 1000000.00, 5.0),
(31, 'R10', 'Suite', 2, 1000000.00, 5.0),
-- Homestay 32:Quy Nhon Beach Homestay
(32, 'R01', 'Standard', 2, 400000.00, 4.4),
(32, 'R02', 'Standard', 2, 400000.00, 4.4),
(32, 'R03', 'Deluxe', 3, 550000.00, 4.8),
(32, 'R04', 'Deluxe', 3, 550000.00, 4.8),
(32, 'R05', 'Family', 4, 750000.00, 4.9),
(32, 'R06', 'Family', 4, 750000.00, 4.9),
(32, 'R07', 'Dormitory', 6, 300000.00, 4.2),
(32, 'R08', 'Dormitory', 6, 300000.00, 4.2),
(32, 'R09', 'Suite', 2, 1100000.00, 5.0),
(32, 'R10', 'Suite', 2, 1100000.00, 5.0),
-- Homestay 33: Phan Rang Desert Homestay
(33, 'R01', 'Standard', 2, 350000.00, 4.1),
(33, 'R02', 'Standard', 2, 350000.00, 4.1),
(33, 'R03', 'Deluxe', 3, 500000.00, 4.5),
(33, 'R04', 'Deluxe', 3, 500000.00, 4.5),
(33, 'R05', 'Family', 4, 700000.00, 4.7),
(33, 'R06', 'Family', 4, 700000.00, 4.7),
(33, 'R07', 'Dormitory', 6, 250000.00, 4.0),
(33, 'R08', 'Dormitory', 6, 250000.00, 4.0),
(33, 'R09', 'Suite', 2, 1000000.00, 4.8),
(33, 'R10', 'Suite', 2, 1000000.00, 4.8),
-- Homestay 34: Ca Mau Mangrove Homestay
(34, 'R01', 'Standard', 2, 300000.00, 4.2),
(34, 'R02', 'Standard', 2, 300000.00, 4.2),
(34, 'R03', 'Deluxe', 3, 450000.00, 4.6),
(34, 'R04', 'Deluxe', 3, 450000.00, 4.6),
(34, 'R05', 'Family', 4, 650000.00, 4.8),
(34, 'R06', 'Family', 4, 650000.00, 4.8),
(34, 'R07', 'Dormitory', 6, 200000.00, 4.0),
(34, 'R08', 'Dormitory', 6, 200000.00, 4.0),
(34, 'R09', 'Suite', 2, 900000.00, 4.9),
(34, 'R10', 'Suite', 2, 900000.00, 4.9),
-- Homestay 35: Hoa Binh Lake Homestay
(35, 'R01', 'Standard', 2, 350000.00, 4.3),
(35, 'R02', 'Standard', 2, 350000.00, 4.3),
(35, 'R03', 'Deluxe', 3, 500000.00, 4.7),
(35, 'R04', 'Deluxe', 3, 500000.00, 4.7),
(35, 'R05', 'Family', 4, 700000.00, 4.9),
(35, 'R06', 'Family', 4, 700000.00, 4.9),
(35, 'R07', 'Dormitory', 6, 250000.00, 4.1),
(35, 'R08', 'Dormitory', 6, 250000.00, 4.1),
(35, 'R09', 'Suite', 2, 1000000.00, 5.0),
(35, 'R10', 'Suite', 2, 1000000.00, 5.0),
-- Homestay 36: Ben Tre Coconut Homestay
(36, 'R01', 'Standard', 2, 400000.00, 4.4),
(36, 'R02', 'Standard', 2, 400000.00, 4.4),
(36, 'R03', 'Deluxe', 3, 550000.00, 4.8),
(36, 'R04', 'Deluxe', 3, 550000.00, 4.8),
(36, 'R05', 'Family', 4, 750000.00, 4.9),
(36, 'R06', 'Family', 4, 750000.00, 4.9),
(36, 'R07', 'Dormitory', 6, 300000.00, 4.2),
(36, 'R08', 'Dormitory', 6, 300000.00, 4.2),
(36, 'R09', 'Suite', 2, 1100000.00, 5.0),
(36, 'R10', 'Suite', 2, 1100000.00, 5.0),
-- Homestay 37: Vinh Long River Homestay
(37, 'R01', 'Standard', 2, 350000.00, 4.1),
(37, 'R02', 'Standard', 2, 350000.00, 4.1),
(37, 'R03', 'Deluxe', 3, 500000.00, 4.5),
(37, 'R04', 'Deluxe', 3, 500000.00, 4.5),
(37, 'R05', 'Family', 4, 700000.00, 4.7),
(37, 'R06', 'Family', 4, 700000.00, 4.7),
(37, 'R07', 'Dormitory', 6, 250000.00, 4.0),
(37, 'R08', 'Dormitory', 6, 250000.00, 4.0),
(37, 'R09', 'Suite', 2, 1000000.00, 4.8),
(37, 'R10', 'Suite', 2, 1000000.00, 4.8),
-- Homestay 38: Lao Cai Highland Homestay
(38, 'R01', 'Standard', 2, 300000.00, 4.2),
(38, 'R02', 'Standard', 2, 300000.00, 4.2),
(38, 'R03', 'Deluxe', 3, 450000.00, 4.6),
(38, 'R04', 'Deluxe', 3, 450000.00, 4.6),
(38, 'R05', 'Family', 4, 650000.00, 4.8),
(38, 'R06', 'Family', 4, 650000.00, 4.8),
(38, 'R07', 'Dormitory', 6, 200000.00, 4.0),
(38, 'R08', 'Dormitory', 6, 200000.00, 4.0),
(38, 'R09', 'Suite', 2, 900000.00, 4.9),
(38, 'R10', 'Suite', 2, 900000.00, 4.9),
-- Homestay 39: Tay Ninh Ba Den Homestay
(39, 'R01', 'Standard', 2, 350000.00, 4.3),
(39, 'R02', 'Standard', 2, 350000.00, 4.3),
(39, 'R03', 'Deluxe', 3, 500000.00, 4.7),
(39, 'R04', 'Deluxe', 3, 500000.00, 4.7),
(39, 'R05', 'Family', 4, 700000.00, 4.9),
(39, 'R06', 'Family', 4, 700000.00, 4.9),
(39, 'R07', 'Dormitory', 6, 250000.00, 4.1),
(39, 'R08', 'Dormitory', 6, 250000.00, 4.1),
(39, 'R09', 'Suite', 2, 1000000.00, 5.0),
(39, 'R10', 'Suite', 2, 1000000.00, 5.0),
-- Homestay 40: Nam Dinh Coastal Homestay
(40, 'R01', 'Standard', 2, 400000.00, 4.4),
(40, 'R02', 'Standard', 2, 400000.00, 4.4),
(40, 'R03', 'Deluxe', 3, 550000.00, 4.8),
(40, 'R04', 'Deluxe', 3, 550000.00, 4.8),
(40, 'R05', 'Family', 4, 750000.00, 4.9),
(40, 'R06', 'Family', 4, 750000.00, 4.9),
(40, 'R07', 'Dormitory', 6, 300000.00, 4.2),
(40, 'R08', 'Dormitory', 6, 300000.00, 4.2),
(40, 'R09', 'Suite', 2, 1100000.00, 5.0),
(40, 'R10', 'Suite', 2, 1100000.00, 5.0);
GO
-- bảng roompricing: định giá theo mùa hoặc loại phòng
create table SeasonPricing(
	season_id int primary key identity(1,1),
	homestay_id int foreign key (homestay_id) references Homestays(homestay_id),
	season nvarchar(50) check (season in(N'Mùa du lịch', N'Ngày lễ')),
	increaseRate decimal(4,2) null,
	typeRoom varchar(50),
	start_date date null,
	end_date date null,
	constraint check_dates check (end_date > start_date)
)
go


-- chèn dữ liệu cho Season Pricing
INSERT INTO SeasonPricing (homestay_id, season, increaseRate, typeRoom, start_date, end_date)
VALUES 
-- Homestay 1: Phu Quoc Sunset Homestay
(1, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(1, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(1, N'Ngày lễ', 1.60, 'Family', '2025-01-15', '2025-02-15'),
(1, N'Ngày lễ', 1.80, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 2: Can Tho Riverside Homestay
(2, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(2, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(2, N'Ngày lễ', 1.65, 'Family', '2025-01-15', '2025-02-15'),
(2, N'Ngày lễ', 1.85, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 3: Mai Chau Eco Homestay
(3, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(3, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(3, N'Ngày lễ', 1.70, 'Family', '2025-01-15', '2025-02-15'),
(3, N'Ngày lễ', 1.90, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 4: Cat Ba Island Homestay
(4, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(4, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(4, N'Ngày lễ', 1.75, 'Family', '2025-01-15', '2025-02-15'),
(4, N'Ngày lễ', 1.95, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 5: Phong Nha Village Homestay
(5, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(5, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(5, N'Ngày lễ', 1.60, 'Family', '2025-01-15', '2025-02-15'),
(5, N'Ngày lễ', 1.80, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 6: Con Dao Ocean Homestay
(6, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(6, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(6, N'Ngày lễ', 1.65, 'Family', '2025-01-15', '2025-02-15'),
(6, N'Ngày lễ', 1.85, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 7: Vung Tau Coastal Homestay
(7, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(7, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(7, N'Ngày lễ', 1.70, 'Family', '2025-01-15', '2025-02-15'),
(7, N'Ngày lễ', 1.90, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 8: Mui Ne Sandy Homestay
(8, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(8, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(8, N'Ngày lễ', 1.75, 'Family', '2025-01-15', '2025-02-15'),
(8, N'Ngày lễ', 1.95, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 9: Ha Giang Loop Homestay
(9, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(9, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(9, N'Ngày lễ', 1.60, 'Family', '2025-01-15', '2025-02-15'),
(9, N'Ngày lễ', 1.80, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 10: Ba Be Lake Homestay
(10, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(10, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(10, N'Ngày lễ', 1.65, 'Family', '2025-01-15', '2025-02-15'),
(10, N'Ngày lễ', 1.85, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 11: Hanoi Old Quarter Homestay
(11, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(11, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(11, N'Ngày lễ', 1.70, 'Family', '2025-01-15', '2025-02-15'),
(11, N'Ngày lễ', 1.90, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 12: Sapa Valley Homestay
(12, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(12, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(12, N'Ngày lễ', 1.75, 'Family', '2025-01-15', '2025-02-15'),
(12, N'Ngày lễ', 1.95, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 13: Ha Long Pearl Homestay
(13, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(13, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(13, N'Ngày lễ', 1.60, 'Family', '2025-01-15', '2025-02-15'),
(13, N'Ngày lễ', 1.80, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 14: Ninh Binh Lotus Homestay
(14, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(14, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(14, N'Ngày lễ', 1.65, 'Family', '2025-01-15', '2025-02-15'),
(14, N'Ngày lễ', 1.85, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 15: Hue Heritage Homestay
(15, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(15, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(15, N'Ngày lễ', 1.70, 'Family', '2025-01-15', '2025-02-15'),
(15, N'Ngày lễ', 1.90, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 16:Da Nang Skyline Homestay
(16, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(16, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(16, N'Ngày lễ', 1.75, 'Family', '2025-01-15', '2025-02-15'),
(16, N'Ngày lễ', 1.95, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 17: Hoi An Riverside Homestay
(17, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(17, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(17, N'Ngày lễ', 1.60, 'Family', '2025-01-15', '2025-02-15'),
(17, N'Ngày lễ', 1.80, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 18: Nha Trang Seaside Homestay
(18, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(18, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(18, N'Ngày lễ', 1.65, 'Family', '2025-01-15', '2025-02-15'),
(18, N'Ngày lễ', 1.85, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 19:Da Lat Flower Homestay
(19, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(19, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(19, N'Ngày lễ', 1.70, 'Family', '2025-01-15', '2025-02-15'),
(19, N'Ngày lễ', 1.90, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 20: Saigon Central Homestay
(20, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(20, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(20, N'Ngày lễ', 1.75, 'Family', '2025-01-15', '2025-02-15'),
(20, N'Ngày lễ', 1.95, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 21: Phu Quoc Paradise Homestay
(21, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(21, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(21, N'Ngày lễ', 1.60, 'Family', '2025-01-15', '2025-02-15'),
(21, N'Ngày lễ', 1.80, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 22: Can Tho Garden Homestay
(22, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(22, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(22, N'Ngày lễ', 1.65, 'Family', '2025-01-15', '2025-02-15'),
(22, N'Ngày lễ', 1.85, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 23: Mai Chau Valley Homestay
(23, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(23, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(23, N'Ngày lễ', 1.70, 'Family', '2025-01-15', '2025-02-15'),
(23, N'Ngày lễ', 1.90, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 24: Cat Ba Green Homestay
(24, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(24, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(24, N'Ngày lễ', 1.75, 'Family', '2025-01-15', '2025-02-15'),
(24, N'Ngày lễ', 1.95, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 25: Phong Nha Lake Homestay
(25, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(25, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(25, N'Ngày lễ', 1.60, 'Family', '2025-01-15', '2025-02-15'),
(25, N'Ngày lễ', 1.80, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 26: Con Dao Serenity Homestay
(26, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(26, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(26, N'Ngày lễ', 1.65, 'Family', '2025-01-15', '2025-02-15'),
(26, N'Ngày lễ', 1.85, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 27: Vung Tau Horizon Homestay
(27, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(27, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(27, N'Ngày lễ', 1.70, 'Family', '2025-01-15', '2025-02-15'),
(27, N'Ngày lễ', 1.90, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 28: Mui Ne Ocean Homestay
(28, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(28, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(28, N'Ngày lễ', 1.75, 'Family', '2025-01-15', '2025-02-15'),
(28, N'Ngày lễ', 1.95, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 29: Ha Giang Cloud Homestay
(29, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(29, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(29, N'Ngày lễ', 1.60, 'Family', '2025-01-15', '2025-02-15'),
(29, N'Ngày lễ', 1.80, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 30:Ba Be Eco Homestay
(30, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(30, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(30, N'Ngày lễ', 1.65, 'Family', '2025-01-15', '2025-02-15'),
(30, N'Ngày lễ', 1.85, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 31: Lang Son Mountain Homestay
(31, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(31, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(31, N'Ngày lễ', 1.70, 'Family', '2025-01-15', '2025-02-15'),
(31, N'Ngày lễ', 1.90, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 32:Quy Nhon Beach Homestay
(32, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(32, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(32, N'Ngày lễ', 1.75, 'Family', '2025-01-15', '2025-02-15'),
(32, N'Ngày lễ', 1.95, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 33: Phan Rang Desert Homestay
(33, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(33, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(33, N'Ngày lễ', 1.60, 'Family', '2025-01-15', '2025-02-15'),
(33, N'Ngày lễ', 1.80, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 34: Ca Mau Mangrove Homestay
(34, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(34, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(34, N'Ngày lễ', 1.65, 'Family', '2025-01-15', '2025-02-15'),
(34, N'Ngày lễ', 1.85, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 35: Hoa Binh Lake Homestay
(35, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(35, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(35, N'Ngày lễ', 1.70, 'Family', '2025-01-15', '2025-02-15'),
(35, N'Ngày lễ', 1.90, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 36: Ben Tre Coconut Homestay
(36, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(36, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(36, N'Ngày lễ', 1.75, 'Family', '2025-01-15', '2025-02-15'),
(36, N'Ngày lễ', 1.95, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 37: Vinh Long River Homestay
(37, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(37, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(37, N'Ngày lễ', 1.60, 'Family', '2025-01-15', '2025-02-15'),
(37, N'Ngày lễ', 1.80, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 38: Lao Cai Highland Homestay
(38, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(38, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(38, N'Ngày lễ', 1.65, 'Family', '2025-01-15', '2025-02-15'),
(38, N'Ngày lễ', 1.85, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 39: Tay Ninh Ba Den Homestay
(39, N'Mùa du lịch', 1.30, 'Standard', '2025-06-01', '2025-08-31'),
(39, N'Mùa du lịch', 1.40, 'Deluxe', '2025-03-01', '2025-04-30'),
(39, N'Ngày lễ', 1.70, 'Family', '2025-01-15', '2025-02-15'),
(39, N'Ngày lễ', 1.90, 'Suite', '2025-09-01', '2025-09-05'),
-- Homestay 40: Nam Dinh Coastal Homestay
(40, N'Mùa du lịch', 1.35, 'Standard', '2025-06-01', '2025-08-31'),
(40, N'Mùa du lịch', 1.45, 'Deluxe', '2025-03-01', '2025-04-30'),
(40, N'Ngày lễ', 1.75, 'Family', '2025-01-15', '2025-02-15'),
(40, N'Ngày lễ', 1.95, 'Suite', '2025-09-01', '2025-09-05');
GO
-- Tạo bảng HomestayRules: Quản lý quy tắc chung cho tất cả các phòng trong homestay
CREATE TABLE HomestayRules (
    rule_id INT PRIMARY KEY IDENTITY(1,1),
    homestay_id INT NOT NULL,
    rule_name NVARCHAR(100)  NULL,
    description NVARCHAR(255) NULL,
    status BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (homestay_id) REFERENCES Homestays(homestay_id)
);

-- Chèn dữ liệu mẫu cho bảng HomestayRules
INSERT INTO HomestayRules (homestay_id, rule_name, description)
VALUES 
-- Homestay 1: Phu Quoc Sunset Homestay
(1, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(1, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để đảm bảo môi trường trong lành.'),
(1, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh và an toàn.'),
(1, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện để giữ yên tĩnh cho khách khác.'),
(1, N'Giữ vệ sinh chung', N'Vui lòng giữ gìn vệ sinh và không xả rác trong khu vực homestay.'),
-- Homestay 2: Can Tho Riverside Homestay
(2, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(2, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong phòng để bảo vệ sức khỏe khách hàng.'),
(2, N'Không cho phép vật nuôi', N'Vật nuôi không được mang vào để đảm bảo vệ sinh.'),
(2, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để giữ không gian yên tĩnh.'),
(2, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để không làm phiền khách khác.'),
-- Homestay 3: Mai Chau Eco Homestay
(3, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(3, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để giữ không khí trong lành.'),
(3, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo an toàn.'),
(3, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện lớn trong homestay.'),
(3, N'Giữ vệ sinh chung', N'Vui lòng dọn rác và giữ sạch khu vực sinh hoạt chung.'),
-- Homestay 4: Cat Ba Island Homestay
(4, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(4, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong khu vực phòng nghỉ.'),
(4, N'Không cho phép vật nuôi', N'Không cho phép mang theo vật nuôi để giữ vệ sinh.'),
(4, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để đảm bảo yên tĩnh cho khách.'),
(4, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để tôn trọng khách khác.'),
-- Homestay 5: Phong Nha Village Homestay
(5, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(5, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để đảm bảo môi trường sạch.'),
(5, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(5, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện để giữ yên tĩnh.'),
(5, N'Giữ vệ sinh chung', N'Vui lòng giữ gìn vệ sinh khu vực sinh hoạt chung.'),
-- Homestay 6: Con Dao Ocean Homestay
(6, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(6, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong phòng để giữ không khí trong lành.'),
(6, N'Không cho phép vật nuôi', N'Vật nuôi không được mang vào để đảm bảo an toàn.'),
(6, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để giữ không gian yên tĩnh.'),
(6, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để không làm phiền khách khác.'),
-- Homestay 7: Vung Tau Coastal Homestay
(7, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(7, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để bảo vệ sức khỏe khách hàng.'),
(7, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(7, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện lớn trong homestay.'),
(7, N'Giữ vệ sinh chung', N'Vui lòng dọn rác và giữ sạch khu vực sinh hoạt chung.'),
-- Homestay 8: Mui Ne Sandy Homestay
(8, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(8, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong khu vực phòng nghỉ.'),
(8, N'Không cho phép vật nuôi', N'Không cho phép mang theo vật nuôi để giữ vệ sinh.'),
(8, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để đảm bảo yên tĩnh cho khách.'),
(8, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để tôn trọng khách khác.'),
-- Homestay 9: Ha Giang Loop Homestay
(9, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(9, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để đảm bảo môi trường sạch.'),
(9, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(9, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện để giữ yên tĩnh.'),
(9, N'Giữ vệ sinh chung', N'Vui lòng giữ gìn vệ sinh khu vực sinh hoạt chung.'),
-- Homestay 10: Ba Be Lake Homestay
(10, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(10, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong phòng để giữ không khí trong lành.'),
(10, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo an toàn.'),
(10, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để giữ không gian yên tĩnh.'),
(10, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để không làm phiền khách khác.'),
-- Homestay 11: Hanoi Old Quarter Homestay
(11, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(11, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để bảo vệ sức khỏe khách hàng.'),
(11, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(11, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện lớn trong homestay.'),
(11, N'Giữ vệ sinh chung', N'Vui lòng dọn rác và giữ sạch khu vực sinh hoạt chung.'),
-- Homestay 12: Sapa Valley Homestay
(12, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(12, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong khu vực phòng nghỉ.'),
(12, N'Không cho phép vật nuôi', N'Không cho phép mang theo vật nuôi để giữ vệ sinh.'),
(12, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để đảm bảo yên tĩnh cho khách.'),
(12, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để tôn trọng khách khác.'),
-- Homestay 13: Ha Long Pearl Homestay
(13, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(13, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để đảm bảo môi trường sạch.'),
(13, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(13, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện để giữ yên tĩnh.'),
(13, N'Giữ vệ sinh chung', N'Vui lòng giữ gìn vệ sinh khu vực sinh hoạt chung.'),
-- Homestay 14: Ninh Binh Lotus Homestay
(14, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(14, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong phòng để giữ không khí trong lành.'),
(14, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo an toàn.'),
(14, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để giữ không gian yên tĩnh.'),
(14, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để không làm phiền khách khác.'),
-- Homestay 15: Hue Heritage Homestay
(15, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(15, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để bảo vệ sức khỏe khách hàng.'),
(15, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(15, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện lớn trong homestay.'),
(15, N'Giữ vệ sinh chung', N'Vui lòng dọn rác và giữ sạch khu vực sinh hoạt chung.'),
-- Homestay 16:Da Nang Skyline Homestay
(16, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(16, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong khu vực phòng nghỉ.'),
(16, N'Không cho phép vật nuôi', N'Không cho phép mang theo vật nuôi để giữ vệ sinh.'),
(16, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để đảm bảo yên tĩnh cho khách.'),
(16, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để tôn trọng khách khác.'),
-- Homestay 17: Hoi An Riverside Homestay
(17, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(17, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để đảm bảo môi trường sạch.'),
(17, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(17, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện để giữ yên tĩnh.'),
(17, N'Giữ vệ sinh chung', N'Vui lòng giữ gìn vệ sinh khu vực sinh hoạt chung.'),
-- Homestay 18: Nha Trang Seaside Homestay
(18, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(18, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong phòng để giữ không khí trong lành.'),
(18, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo an toàn.'),
(18, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để giữ không gian yên tĩnh.'),
(18, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để không làm phiền khách khác.'),
-- Homestay 19:Da Lat Flower Homestay
(19, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(19, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để bảo vệ sức khỏe khách hàng.'),
(19, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(19, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện lớn trong homestay.'),
(19, N'Giữ vệ sinh chung', N'Vui lòng dọn rác và giữ sạch khu vực sinh hoạt chung.'),
-- Homestay 20: Saigon Central Homestay
(20, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(20, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong khu vực phòng nghỉ.'),
(20, N'Không cho phép vật nuôi', N'Không cho phép mang theo vật nuôi để giữ vệ sinh.'),
(20, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để đảm bảo yên tĩnh cho khách.'),
(20, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để tôn trọng khách khác.'),
-- Homestay 21: Phu Quoc Paradise Homestay
(21, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(21, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để đảm bảo môi trường sạch.'),
(21, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(21, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện để giữ yên tĩnh.'),
(21, N'Giữ vệ sinh chung', N'Vui lòng giữ gìn vệ sinh khu vực sinh hoạt chung.'),
-- Homestay 22: Can Tho Garden Homestay
(22, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(22, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong phòng để giữ không khí trong lành.'),
(22, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo an toàn.'),
(22, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để giữ không gian yên tĩnh.'),
(22, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để không làm phiền khách khác.'),
-- Homestay 23: Mai Chau Valley Homestay
(23, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(23, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để bảo vệ sức khỏe khách hàng.'),
(23, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(23, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện lớn trong homestay.'),
(23, N'Giữ vệ sinh chung', N'Vui lòng dọn rác và giữ sạch khu vực sinh hoạt chung.'),
-- Homestay 24: Cat Ba Green Homestay
(24, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(24, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong khu vực phòng nghỉ.'),
(24, N'Không cho phép vật nuôi', N'Không cho phép mang theo vật nuôi để giữ vệ sinh.'),
(24, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để đảm bảo yên tĩnh cho khách.'),
(24, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để tôn trọng khách khác.'),
-- Homestay 25: Phong Nha Lake Homestay
(25, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(25, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để đảm bảo môi trường sạch.'),
(25, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(25, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện để giữ yên tĩnh.'),
(25, N'Giữ vệ sinh chung', N'Vui lòng giữ gìn vệ sinh khu vực sinh hoạt chung.'),
-- Homestay 26: Con Dao Serenity Homestay
(26, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(26, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong phòng để giữ không khí trong lành.'),
(26, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo an toàn.'),
(26, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để giữ không gian yên tĩnh.'),
(26, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để không làm phiền khách khác.'),
-- Homestay 27: Vung Tau Horizon Homestay
(27, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(27, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để bảo vệ sức khỏe khách hàng.'),
(27, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(27, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện lớn trong homestay.'),
(27, N'Giữ vệ sinh chung', N'Vui lòng dọn rác và giữ sạch khu vực sinh hoạt chung.'),
-- Homestay 28: Mui Ne Ocean Homestay
(28, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(28, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong khu vực phòng nghỉ.'),
(28, N'Không cho phép vật nuôi', N'Không cho phép mang theo vật nuôi để giữ vệ sinh.'),
(28, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để đảm bảo yên tĩnh cho khách.'),
(28, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để tôn trọng khách khác.'),
-- Homestay 29: Ha Giang Cloud Homestay
(29, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(29, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để đảm bảo môi trường sạch.'),
(29, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(29, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện để giữ yên tĩnh.'),
(29, N'Giữ vệ sinh chung', N'Vui lòng giữ gìn vệ sinh khu vực sinh hoạt chung.'),
-- Homestay 30:Ba Be Eco Homestay
(30, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(30, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong phòng để giữ không khí trong lành.'),
(30, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo an toàn.'),
(30, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để giữ không gian yên tĩnh.'),
(30, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để không làm phiền khách khác.'),
-- Homestay 31: Lang Son Mountain Homestay
(31, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(31, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để bảo vệ sức khỏe khách hàng.'),
(31, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(31, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện lớn trong homestay.'),
(31, N'Giữ vệ sinh chung', N'Vui lòng dọn rác và giữ sạch khu vực sinh hoạt chung.'),
-- Homestay 32:Quy Nhon Beach Homestay
(32, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(32, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong khu vực phòng nghỉ.'),
(32, N'Không cho phép vật nuôi', N'Không cho phép mang theo vật nuôi để giữ vệ sinh.'),
(32, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để đảm bảo yên tĩnh cho khách.'),
(32, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để tôn trọng khách khác.'),
-- Homestay 33: Phan Rang Desert Homestay
(33, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(33, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để đảm bảo môi trường sạch.'),
(33, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(33, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện để giữ yên tĩnh.'),
(33, N'Giữ vệ sinh chung', N'Vui lòng giữ gìn vệ sinh khu vực sinh hoạt chung.'),
-- Homestay 34: Ca Mau Mangrove Homestay
(34, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(34, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong phòng để giữ không khí trong lành.'),
(34, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo an toàn.'),
(34, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để giữ không gian yên tĩnh.'),
(34, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để không làm phiền khách khác.'),
-- Homestay 35: Hoa Binh Lake Homestay
(35, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(35, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để bảo vệ sức khỏe khách hàng.'),
(35, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(35, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện lớn trong homestay.'),
(35, N'Giữ vệ sinh chung', N'Vui lòng dọn rác và giữ sạch khu vực sinh hoạt chung.'),
-- Homestay 36: Ben Tre Coconut Homestay
(36, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(36, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong khu vực phòng nghỉ.'),
(36, N'Không cho phép vật nuôi', N'Không cho phép mang theo vật nuôi để giữ vệ sinh.'),
(36, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để đảm bảo yên tĩnh cho khách.'),
(36, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để tôn trọng khách khác.'),
-- Homestay 37: Vinh Long River Homestay
(37, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(37, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để đảm bảo môi trường sạch.'),
(37, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(37, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện để giữ yên tĩnh.'),
(37, N'Giữ vệ sinh chung', N'Vui lòng giữ gìn vệ sinh khu vực sinh hoạt chung.'),
-- Homestay 38: Lao Cai Highland Homestay
(38, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(38, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong phòng để giữ không khí trong lành.'),
(38, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo an toàn.'),
(38, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để giữ không gian yên tĩnh.'),
(38, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để không làm phiền khách khác.'),
-- Homestay 39: Tay Ninh Ba Den Homestay
(39, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(39, N'Cấm hút thuốc', N'Không hút thuốc trong phòng để bảo vệ sức khỏe khách hàng.'),
(39, N'Không cho phép vật nuôi', N'Vật nuôi không được phép để đảm bảo vệ sinh.'),
(39, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc hoặc sự kiện lớn trong homestay.'),
(39, N'Giữ vệ sinh chung', N'Vui lòng dọn rác và giữ sạch khu vực sinh hoạt chung.'),
-- Homestay 40: Nam Dinh Coastal Homestay
(40, N'Giờ check-in-check-out', N'Check-in từ 14:00, check-out trước 12:00.'),
(40, N'Cấm hút thuốc', N'Hút thuốc bị cấm trong khu vực phòng nghỉ.'),
(40, N'Không cho phép vật nuôi', N'Không cho phép mang theo vật nuôi để giữ vệ sinh.'),
(40, N'Cấm tổ chức tiệc tùng', N'Không tổ chức tiệc để đảm bảo yên tĩnh cho khách.'),
(40, N'Giữ yên tĩnh', N'Vui lòng giữ yên tĩnh sau 22:00 để tôn trọng khách khác.');
go
CREATE TABLE AmenityType (
    type_id INT PRIMARY KEY IDENTITY(1,1),
    typeName NVARCHAR(100),
);
GO
-- Insert  amenity types
INSERT INTO AmenityType (typeName)
VALUES 
(N'Máy sấy tóc'),
(N'Sản phẩm vệ sinh'),
(N'Dầu gội đầu'),
(N'Xà phòng tắm'),
(N'Nước nóng'),
(N'Sữa tắm'),
(N'Phòng ngủ và giặt ủi'),
(N'Máy giặt phí Miễn phí – Trong tòa nhà'),
(N'Móc treo quần áo'),
(N'Bàn là'),
(N'Giá phơi quần áo'),
(N'Nơi để quần áo'),
(N'Giải trí'),
(N'Kết nối Ethernet'),
(N'Hệ thống sưởi và làm mát'),
(N'Điều hòa nhiệt độ'),
(N'An toàn nhà ở'),
(N'Bình chữa cháy'),
(N'Internet và văn phòng'),
(N'Wi-fi'),
(N'Đồ dùng nấu bếp và ăn uống'),
(N'Tủ lạnh'),
(N'Cà phê')

GO

-- Create the Amenities table 
CREATE TABLE Amenities (
    amenity_id INT IDENTITY(1,1) PRIMARY KEY,
    homestay_id INT NOT NULL,
    type_id INT NOT NULL,
	status bit default 1
    FOREIGN KEY (type_id) REFERENCES AmenityType(type_id),
    FOREIGN KEY (homestay_id) REFERENCES Homestays(homestay_id)
);
GO
-- Insert amenities for 40 homestays 
INSERT INTO Amenities (homestay_id, type_id)
VALUES
-- Homestay 1: Da Lat Dreamy Homestay (15 amenities)
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), 
(1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
(1, 16), (1, 17), (1, 18), (1, 20), (1, 22),
-- Homestay 2: Pine Hill Homestay (14 amenities)
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5),
(2, 6), (2, 7), (2, 9), (2, 10), (2, 12),
(2, 16), (2, 18), (2, 20), (2, 22),
-- Homestay 3: Da Lat Blossom Homestay (15 amenities)
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5),
(3, 6), (3, 7), (3, 8), (3, 9), (3, 10),
(3, 11), (3, 16), (3, 17), (3, 20), (3, 23),
-- Homestay 4: Misty Valley Homestay (13 amenities)
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5),
(4, 6), (4, 7), (4, 9), (4, 11), (4, 16),
(4, 18), (4, 20), (4, 22),
-- Homestay 5: Flower Garden Homestay (15 amenities)
(5, 1), (5, 2), (5, 3), (5, 4), (5, 5),
(5, 6), (5, 7), (5, 8), (5, 9), (5, 10),
(5, 12), (5, 16), (5, 18), (5, 20), (5, 22),
-- Homestay 6: Da Lat Cozy Homestay (12 amenities)
(6, 1), (6, 2), (6, 3), (6, 4), (6, 5),
(6, 6), (6, 9), (6, 10), (6, 16), (6, 18),
(6, 20), (6, 22),
-- Homestay 7: Starlight Homestay (15 amenities)
(7, 1), (7, 2), (7, 3), (7, 4), (7, 5),
(7, 6), (7, 7), (7, 8), (7, 9), (7, 10),
(7, 13), (7, 16), (7, 20), (7, 22), (7, 23),
-- Homestay 8: Da Nang Ocean Homestay (14 amenities)
(8, 1), (8, 2), (8, 3), (8, 4), (8, 5),
(8, 6), (8, 7), (8, 9), (8, 10), (8, 12),
(8, 16), (8, 18), (8, 20), (8, 22),
-- Homestay 9: Han River Homestay (15 amenities)
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5),
(9, 6), (9, 7), (9, 8), (9, 9), (9, 10),
(9, 11), (9, 16), (9, 18), (9, 20), (9, 22),
-- Homestay 10: My Khe Beach Homestay (13 amenities)
(10, 1), (10, 2), (10, 3), (10, 4), (10, 5),
(10, 6), (10, 7), (10, 8), (10, 9), (10, 16),
(10, 18), (10, 20), (10, 22),
-- Homestay 11: Da Nang Sky Homestay (15 amenities)
(11, 1), (11, 2), (11, 3), (11, 4), (11, 5),
(11, 6), (11, 7), (11, 8), (11, 9), (11, 10),
(11, 11), (11, 16), (11, 18), (11, 20), (11, 22),
-- Homestay 12: Sunset Bridge Homestay (12 amenities)
(12, 1), (12, 2), (12, 3), (12, 4), (12, 5),
(12, 6), (12, 7), (12, 9), (12, 12), (12, 16),
(12, 20), (12, 22),
-- Homestay 13: Coral Reef Homestay (15 amenities)
(13, 1), (13, 2), (13, 3), (13, 4), (13, 5),
(13, 6), (13, 7), (13, 8), (13, 9), (13, 10),
(13, 11), (13, 16), (13, 18), (13, 20), (13, 22),
-- Homestay 14: Da Nang Green Homestay (14 amenities)
(14, 1), (14, 2), (14, 3), (14, 4), (14, 5),
(14, 6), (14, 7), (14, 9), (14, 10), (14, 12),
(14, 16), (14, 18), (14, 20), (14, 22),
-- Homestay 15: Hanoi Charm Homestay (15 amenities)
(15, 1), (15, 2), (15, 3), (15, 4), (15, 5),
(15, 6), (15, 7), (15, 8), (15, 9), (15, 10),
(15, 11), (15, 16), (15, 18), (15, 20), (15, 22),
-- Homestay 16: Old Gate Homestay (13 amenities)
(16, 1), (16, 2), (16, 3), (16, 4), (16, 5),
(16, 6), (16, 7), (16, 8), (16, 9), (16, 10),
(16, 16), (16, 20), (16, 22),
-- Homestay 17: Hoan Kiem Lake Homestay (15 amenities)
(17, 1), (17, 2), (17, 3), (17, 4), (17, 5),
(17, 6), (17, 7), (17, 8), (17, 9), (17, 10),
(17, 11), (17, 16), (17, 18), (17, 20), (17, 22),
-- Homestay 18: Hanoi Lotus Homestay (14 amenities)
(18, 1), (18, 2), (18, 3), (18, 4), (18, 5),
(18, 6), (18, 7), (18, 9), (18, 10), (18, 12),
(18, 16), (18, 18), (18, 20), (18, 22),
-- Homestay 19: Tran Quoc Pagoda Homestay (15 amenities)
(19, 1), (19, 2), (19, 3), (19, 4), (19, 5),
(19, 6), (19, 7), (19, 8), (19, 9), (19, 10),
(19, 11), (19, 16), (19, 18), (19, 20), (19, 22),
-- Homestay 20: Hanoi Vintage Homestay (12 amenities)
(20, 1), (20, 2), (20, 3), (20, 4), (20, 5),
(20, 6), (20, 7), (20, 9), (20, 10), (20, 16),
(20, 20), (20, 22),
-- Homestay 21: Phu Quoc Paradise Homestay (15 amenities)
(21, 1), (21, 2), (21, 3), (21, 4), (21, 5),
(21, 6), (21, 7), (21, 8), (21, 9), (21, 10),
(21, 11), (21, 16), (21, 18), (21, 20), (21, 22),
-- Homestay 22: Can Tho Garden Homestay (14 amenities)
(22, 1), (22, 2), (22, 3), (22, 4), (22, 5),
(22, 6), (22, 7), (22, 9), (22, 10), (22, 12),
(22, 16), (22, 18), (22, 20), (22, 22),
-- Homestay 23: Mai Chau Valley Homestay (15 amenities)
(23, 1), (23, 2), (23, 3), (23, 4), (23, 5),
(23, 6), (23, 7), (23, 8), (23, 9), (23, 10),
(23, 11), (23, 16), (23, 18), (23, 20), (23, 22),
-- Homestay 24: Cat Ba Green Homestay (13 amenities)
(24, 1), (24, 2), (24, 3), (24, 4), (24, 5),
(24, 6), (24, 7), (24, 8), (24, 9), (24, 10),
(24, 16), (24, 20), (24, 22),
-- Homestay 25: Phong Nha Lake Homestay (15 amenities)
(25, 1), (25, 2), (25, 3), (25, 4), (25, 5),
(25, 6), (25, 7), (25, 8), (25, 9), (25, 10),
(25, 11), (25, 16), (25, 18), (25, 20), (25, 22),
-- Homestay 26: Con Dao Serenity Homestay (14 amenities)
(26, 1), (26, 2), (26, 3), (26, 4), (26, 5),
(26, 6), (26, 7), (26, 9), (26, 10), (26, 12),
(26, 16), (26, 18), (26, 20), (26, 22),
-- Homestay 27: Vung Tau Horizon Homestay (15 amenities)
(27, 1), (27, 2), (27, 3), (27, 4), (27, 5),
(27, 6), (27, 7), (27, 8), (27, 9), (27, 10),
(27, 11), (27, 16), (27, 18), (27, 20), (27, 22),
-- Homestay 28: Mui Ne Ocean Homestay (12 amenities)
(28, 1), (28, 2), (28, 3), (28, 4), (28, 5),
(28, 6), (28, 7), (28, 8), (28, 9), (28, 16),
(28, 20), (28, 22),
-- Homestay 29: Ha Giang Cloud Homestay (15 amenities)
(29, 1), (29, 2), (29, 3), (29, 4), (29, 5),
(29, 6), (29, 7), (29, 8), (29, 9), (29, 10),
(29, 11), (29, 16), (29, 18), (29, 20), (29, 22),
-- Homestay 30: Ba Be Eco Homestay (14 amenities)
(30, 1), (30, 2), (30, 3), (30, 4), (30, 5),
(30, 6), (30, 7), (30, 9), (30, 10), (30, 12),
(30, 16), (30, 18), (30, 20), (30, 22),
-- Homestay 31: Lang Son Mountain Homestay (15 amenities)
(31, 1), (31, 2), (31, 3), (31, 4), (31, 5),
(31, 6), (31, 7), (31, 8), (31, 9), (31, 10),
(31, 11), (31, 16), (31, 18), (31, 20), (31, 22),
-- Homestay 32: Quy Nhon Beach Homestay (13 amenities)
(32, 1), (32, 2), (32, 3), (32, 4), (32, 5),
(32, 6), (32, 7), (32, 8), (32, 9), (32, 10),
(32, 16), (32, 20), (32, 22),
-- Homestay 33: Phan Rang Desert Homestay (15 amenities)
(33, 1), (33, 2), (33, 3), (33, 4), (33, 5),
(33, 6), (33, 7), (33, 8), (33, 9), (33, 10),
(33, 11), (33, 16), (33, 18), (33, 20), (33, 22),
-- Homestay 34: Ca Mau Mangrove Homestay (14 amenities)
(34, 1), (34, 2), (34, 3), (34, 4), (34, 5),
(34, 6), (34, 7), (34, 9), (34, 10), (34, 12),
(34, 16), (34, 18), (34, 20), (34, 22),
-- Homestay 35: Hoa Binh Lake Homestay (15 amenities)
(35, 1), (35, 2), (35, 3), (35, 4), (35, 5),
(35, 6), (35, 7), (35, 8), (35, 9), (35, 10),
(35, 11), (35, 16), (35, 18), (35, 20), (35, 22),
-- Homestay 36: Ben Tre Coconut Homestay (12 amenities)
(36, 1), (36, 2), (36, 3), (36, 4), (36, 5),
(36, 6), (36, 7), (36, 8), (36, 9), (36, 16),
(36, 20), (36, 22),
-- Homestay 37: Vinh Long River Homestay (15 amenities)
(37, 1), (37, 2), (37, 3), (37, 4), (37, 5),
(37, 6), (37, 7), (37, 8), (37, 9), (37, 10),
(37, 11), (37, 16), (37, 18), (37, 20), (37, 22),
-- Homestay 38: Lao Cai Highland Homestay (14 amenities)
(38, 1), (38, 2), (38, 3), (38, 4), (38, 5),
(38, 6), (38, 7), (38, 9), (38, 10), (38, 12),
(38, 16), (38, 18), (38, 20), (38, 22),
-- Homestay 39: Tay Ninh Ba Den Homestay (15 amenities)
(39, 1), (39, 2), (39, 3), (39, 4), (39, 5),
(39, 6), (39, 7), (39, 8), (39, 9), (39, 10),
(39, 11), (39, 16), (39, 18), (39, 20), (39, 22),
-- Homestay 40: Nam Dinh Coastal Homestay (13 amenities)
(40, 1), (40, 2), (40, 3), (40, 4), (40, 5),
(40, 6), (40, 7), (40, 8), (40, 9), (40, 10),
(40, 16), (40, 20), (40, 22);
GO
-- Create table for amenity icons
CREATE TABLE AmenityIcon (
    type_id INT PRIMARY KEY,
    icon_class NVARCHAR(100),
    FOREIGN KEY (type_id) REFERENCES AmenityType(type_id)
);
GO

-- Insert amenity icons
INSERT INTO AmenityIcon (type_id, icon_class)
VALUES
(1, 'fas fa-wind'),                -- Máy sấy tóc
(2, 'fas fa-pump-soap'),           -- Sản phẩm vệ sinh
(3, 'fas fa-pump-medical'),        -- Dầu gội đầu
(4, 'fas fa-soap'),                -- Xà phòng tắm
(5, 'fas fa-temperature-high'),    -- Nước nóng
(6, 'fas fa-bath'),                -- Sữa tắm
(7, 'fas fa-bed'),                 -- Phòng ngủ và giặt ủi
(8, 'fas fa-washing-machine'),     -- Máy giặt phí Miễn phí
(9, 'fas fa-tshirt'),              -- Móc treo quần áo
(10, 'fas fa-iron'),               -- Bàn là
(11, 'fas fa-hanger'),             -- Giá phơi quần áo
(12, 'fas fa-warehouse'),          -- Nơi để quần áo
(13, 'fas fa-tv'),                 -- Giải trí
(14, 'fas fa-network-wired'),      -- Kết nối Ethernet
(15, 'fas fa-thermometer-half'),   -- Hệ thống sưởi và làm mát
(16, 'fas fa-snowflake'),          -- Điều hòa nhiệt độ
(17, 'fas fa-shield-alt'),         -- An toàn nhà ở
(18, 'fas fa-fire-extinguisher'),  -- Bình chữa cháy
(19, 'fas fa-laptop'),             -- Internet và văn phòng
(20, 'fas fa-wifi'),               -- Wi-fi
(21, 'fas fa-utensils'),           -- Đồ dùng nấu bếp và ăn uống
(22, 'fas fa-refrigerator'),       -- Tủ lạnh
(23, 'fas fa-coffee');             -- Cà phê
GO
create table ServiceType(
    type_id int primary key identity(1,1),
	service_name NVARCHAR(100) ,
	description NVARCHAR(500),
	icon_class NVARCHAR(100)

);
INSERT INTO ServiceType (service_name, description, icon_class)
VALUES
(N'Chụp ảnh', N'Dịch vụ chụp ảnh chuyên nghiệp tại homestay', 'fas fa-camera'),
(N'Đầu bếp', N'Đầu bếp riêng phục vụ tại homestay',  'fas fa-utensils'),
(N'Đồ ăn chuẩn bị sẵn', N'Suất ăn được chuẩn bị sẵn theo yêu cầu', 'fas fa-box-open'),
(N'Massage', N'Dịch vụ massage thư giãn tại phòng',  'fas fa-spa'),
(N'Đào tạo', N'Các khóa đào tạo ngắn hạn theo yêu cầu',  'fas fa-chalkboard-teacher'),
(N'Trang điểm', N'Dịch vụ làm đẹp và trang điểm chuyên nghiệp',  'fas fa-paint-brush'),
(N'Làm tóc', N'Dịch vụ làm tóc và tạo kiểu',  'fas fa-cut'),
(N'Chăm sóc spa', N'Gói chăm sóc spa toàn diện',  'fas fa-hot-tub'),
(N'Dịch vụ ăn uống', N'Dịch vụ phục vụ ăn uống tại phòng', 'fas fa-concierge-bell'),
(N'Làm móng', N'Dịch vụ làm móng chuyên nghiệp',  'fas fa-hand-sparkles');
GO
CREATE TABLE Service (
    service_id INT PRIMARY KEY IDENTITY(1,1),
    homestay_id INT NOT NULL,
	type_id int,
    price DECIMAL(10,2),
    status BIT DEFAULT 1,
    special_notes NVARCHAR(500),
    FOREIGN KEY (homestay_id) REFERENCES Homestays(homestay_id),
    FOREIGN KEY (type_id) REFERENCES ServiceType(type_id),
    CONSTRAINT UQ_HomestayService UNIQUE (homestay_id, service_id)
);
GO
INSERT INTO Service (homestay_id, type_id, price, special_notes) VALUES
-- Homestay 1: Da Lat Dreamy Homestay
(1, 1, 500000.00, N'Chụp ảnh ngoại cảnh tại đồi thông và hồ Xuân Hương.'),
(1, 4, 300000.00, N'Massage thư giãn với tinh dầu thiên nhiên.'),
(1, 9, 200000.00, N'Phục vụ bữa sáng và tối tại phòng theo yêu cầu.'),
(1, 10, 150000.00, N'Làm móng với thiết kế độc đáo.'),
-- Homestay 2: Pine Hill Homestay
(2, 2, 1000000.00, N'Đầu bếp chuẩn bị món ăn địa phương theo yêu cầu.'),
(2, 3, 150000.00, N'Bữa ăn sáng với thực đơn đa dạng.'),
(2, 8, 400000.00, N'Gói chăm sóc spa toàn thân.'),
-- Homestay 3: Da Lat Blossom Homestay
(3, 1, 600000.00, N'Chụp ảnh chuyên nghiệp với đạo cụ vintage.'),
(3, 5, 250000.00, N'Khóa học làm bánh Đà Lạt ngắn hạn.'),
(3, 6, 300000.00, N'Trang điểm phong cách tự nhiên.'),
(3, 7, 200000.00, N'Tạo kiểu tóc phù hợp với sự kiện.'),
-- Homestay 4: Misty Valley Homestay
(4, 4, 350000.00, N'Massage chân và toàn thân.'),
(4, 9, 250000.00, N'Phục vụ đồ uống và bữa nhẹ tại phòng.'),
(4, 10, 180000.00, N'Dịch vụ làm móng với màu sắc tùy chọn.'),
-- Homestay 5: Flower Garden Homestay
(5, 1, 550000.00, N'Chụp ảnh tại vườn hoa lavender.'),
(5, 3, 200000.00, N'Bữa ăn chuẩn bị sẵn với thực đơn healthy.'),
(5, 8, 450000.00, N'Spa với liệu pháp thảo dược.'),
(5, 9, 220000.00, N'Phục vụ bữa tối lãng mạn.'),
-- Homestay 6: Da Lat Cozy Homestay
(6, 2, 900000.00, N'Đầu bếp chuẩn bị món Âu theo yêu cầu.'),
(6, 4, 280000.00, N'Massage thư giãn với không gian yên tĩnh.'),
(6, 7, 250000.00, N'Làm tóc phong cách retro.'),
-- Homestay 7: Starlight Homestay
(7, 1, 580000.00, N'Chụp ảnh với view thành phố Đà Lạt.'),
(7, 5, 300000.00, N'Khóa học làm mứt Đà Lạt.'),
(7, 6, 320000.00, N'Trang điểm cho tiệc tối.'),
(7, 9, 230000.00, N'Phục vụ bữa sáng tại sân thượng.'),
-- Homestay 8: Da Nang Ocean Homestay
(8, 3, 180000.00, N'Bữa sáng với hải sản tươi sống.'),
(8, 4, 320000.00, N'Massage thư giãn với view biển.'),
(8, 8, 400000.00, N'Gói spa chăm sóc da mặt.'),
(8, 10, 160000.00, N'Làm móng với thiết kế biển.'),
-- Homestay 9: Han River Homestay
(9, 1, 650000.00, N'Chụp ảnh với cầu Rồng làm nền.'),
(9, 2, 950000.00, N'Đầu bếp chuẩn bị món Việt truyền thống.'),
(9, 9, 240000.00, N'Phục vụ bữa tối bên sông Hàn.'),
(9, 10, 170000.00, N'Làm móng với họa tiết hiện đại.'),
-- Homestay 10: My Khe Beach Homestay
(10, 3, 200000.00, N'Bữa ăn với thực đơn BBQ ngoài trời.'),
(10, 4, 300000.00, N'Massage thư giãn với âm nhạc nhẹ.'),
(10, 8, 420000.00, N'Spa với liệu pháp muối biển.'),
-- Homestay 11: Da Nang Sky Homestay
(11, 1, 620000.00, N'Chụp ảnh với view thành phố từ trên cao.'),
(11, 6, 310000.00, N'Trang điểm phong cách sang trọng.'),
(11, 7, 260000.00, N'Tạo kiểu tóc thời thượng.'),
(11, 9, 250000.00, N'Phục vụ bữa sáng với view cầu Tình Yêu.'),
-- Homestay 12: Sunset Bridge Homestay
(12, 2, 980000.00, N'Đầu bếp chuẩn bị món Á-Âu kết hợp.'),
(12, 3, 190000.00, N'Bữa ăn sáng với thực đơn đa dạng.'),
(12, 4, 310000.00, N'Massage với tinh dầu tự nhiên.'),
-- Homestay 13: Coral Reef Homestay
(13, 1, 600000.00, N'Chụp ảnh dưới nước khi lặn san hô.'),
(13, 8, 430000.00, N'Spa với liệu pháp biển.'),
(13, 9, 230000.00, N'Phục vụ BBQ trên bãi biển.'),
(13, 10, 180000.00, N'Làm móng với họa tiết san hô.'),
-- Homestay 14: Da Nang Green Homestay
(14, 3, 200000.00, N'Bữa ăn với thực đơn eco-friendly.'),
(14, 4, 300000.00, N'Massage thư giãn với không gian xanh.'),
(14, 8, 410000.00, N'Spa với liệu pháp thảo mộc.'),
(14, 9, 220000.00, N'Phục vụ bữa sáng tại công viên.'),
-- Homestay 15: Hanoi Charm Homestay
(15, 1, 590000.00, N'Chụp ảnh tại phố cổ Hà Nội.'),
(15, 5, 280000.00, N'Khóa học làm phở truyền thống.'),
(15, 6, 300000.00, N'Trang điểm phong cách cổ điển.'),
(15, 9, 240000.00, N'Phục vụ bữa sáng với bánh mì Hà Nội.'),
-- Homestay 16: Old Gate Homestay
(16, 3, 180000.00, N'Bữa sáng với thực đơn truyền thống.'),
(16, 4, 310000.00, N'Massage thư giãn tại phòng.'),
(16, 7, 250000.00, N'Tạo kiểu tóc phong cách phố cổ.'),
-- Homestay 17: Hoan Kiem Lake Homestay
(17, 1, 610000.00, N'Chụp ảnh với hồ Hoàn Kiếm làm nền.'),
(17, 2, 960000.00, N'Đầu bếp chuẩn bị món Hà Nội đặc trưng.'),
(17, 9, 250000.00, N'Phục vụ bữa sáng tại ban công.'),
(17, 10, 170000.00, N'Làm móng với thiết kế truyền thống.'),
-- Homestay 18: Hanoi Lotus Homestay
(18, 5, 290000.00, N'Khóa học làm gốm Bát Tràng.'),
(18, 6, 310000.00, N'Trang điểm phong cách thanh lịch.'),
(18, 8, 420000.00, N'Spa với liệu pháp hoa sen.'),
(18, 9, 230000.00, N'Phục vụ bữa sáng với view lăng Bác.'),
-- Homestay 19: Tran Quoc Pagoda Homestay
(19, 1, 600000.00, N'Chụp ảnh tại hồ Tây và chùa Trấn Quốc.'),
(19, 4, 300000.00, N'Massage thư giãn với không gian yên tĩnh.'),
(19, 7, 260000.00, N'Tạo kiểu tóc phong cách hiện đại.'),
(19, 10, 180000.00, N'Làm móng với họa tiết hoa sen.'),
-- Homestay 20: Hanoi Vintage Homestay
(20, 3, 190000.00, N'Bữa sáng với thực đơn cổ điển.'),
(20, 5, 270000.00, N'Khóa học làm tranh Đông Hồ.'),
(20, 6, 300000.00, N'Trang điểm phong cách vintage.'),
-- Homestay 21: Phu Quoc Paradise Homestay
(21, 1, 580000.00, N'Chụp ảnh tại bãi Sao.'),
(21, 3, 200000.00, N'Bữa ăn với hải sản tươi sống.'),
(21, 8, 430000.00, N'Spa với liệu pháp biển.'),
(21, 9, 240000.00, N'Phục vụ BBQ trên bãi biển.'),
-- Homestay 22: Can Tho Garden Homestay
(22, 2, 940000.00, N'Đầu bếp chuẩn bị món miền Tây.'),
(22, 3, 180000.00, N'Bữa sáng với bánh xèo và bún nước lèo.'),
(22, 4, 310000.00, N'Massage thư giãn tại vườn.'),
(22, 10, 170000.00, N'Làm móng với họa tiết miền Tây.'),
-- Homestay 23: Mai Chau Valley Homestay
(23, 5, 280000.00, N'Khóa học dệt thổ cẩm Thái.'),
(23, 6, 300000.00, N'Trang điểm phong cách dân tộc.'),
(23, 7, 250000.00, N'Tạo kiểu tóc truyền thống Thái.'),
(23, 9, 230000.00, N'Phục vụ bữa sáng với xôi nếp.'),
-- Homestay 24: Cat Ba Green Homestay
(24, 1, 590000.00, N'Chụp ảnh tại vịnh Lan Hạ.'),
(24, 4, 300000.00, N'Massage thư giãn với view rừng.'),
(24, 8, 420000.00, N'Spa với liệu pháp thiên nhiên.'),
-- Homestay 25: Phong Nha Lake Homestay
(25, 3, 190000.00, N'Bữa sáng với thực đơn địa phương.'),
(25, 4, 310000.00, N'Massage thư giãn bên hồ.'),
(25, 9, 240000.00, N'Phục vụ bữa tối với view núi.'),
(25, 10, 180000.00, N'Làm móng với thiết kế thiên nhiên.'),
-- Homestay 26: Con Dao Serenity Homestay
(26, 1, 610000.00, N'Chụp ảnh tại bãi Đầm Trầu.'),
(26, 3, 200000.00, N'Bữa ăn với hải sản tươi sống.'),
(26, 8, 430000.00, N'Spa với liệu pháp biển.'),
-- Homestay 27: Vung Tau Horizon Homestay
(27, 2, 950000.00, N'Đầu bếp chuẩn bị món hải sản.'),
(27, 3, 190000.00, N'Bữa sáng với thực đơn BBQ.'),
(27, 9, 230000.00, N'Phục vụ bữa tối với view biển.'),
(27, 10, 170000.00, N'Làm móng với họa tiết biển.'),
-- Homestay 28: Mui Ne Ocean Homestay
(28, 1, 580000.00, N'Chụp ảnh tại đồi cát Mũi Né.'),
(28, 4, 300000.00, N'Massage thư giãn với view biển.'),
(28, 8, 420000.00, N'Spa với liệu pháp cát nóng.'),
-- Homestay 29: Ha Giang Cloud Homestay
(29, 5, 290000.00, N'Khóa học làm rượu ngô truyền thống.'),
(29, 6, 310000.00, N'Trang điểm phong cách dân tộc.'),
(29, 7, 260000.00, N'Tạo kiểu tóc phong cách Hà Giang.'),
(29, 9, 240000.00, N'Phục vụ bữa sáng với view thung lũng.'),
-- Homestay 30: Ba Be Eco Homestay
(30, 3, 180000.00, N'Bữa sáng với thực đơn dân tộc Tày.'),
(30, 4, 310000.00, N'Massage thư giãn bên hồ Ba Bể.'),
(30, 5, 280000.00, N'Khóa học làm bánh cuốn Tày.'),
(30, 10, 170000.00, N'Làm móng với họa tiết thiên nhiên.'),
-- Homestay 31: Lang Son Mountain Homestay
(31, 1, 590000.00, N'Chụp ảnh tại chợ Kỳ Lừa.'),
(31, 6, 300000.00, N'Trang điểm phong cách dân tộc Nùng.'),
(31, 7, 250000.00, N'Tạo kiểu tóc truyền thống.'),
(31, 9, 230000.00, N'Phục vụ bữa sáng với vịt quay Lạng Sơn.'),
-- Homestay 32: Quy Nhon Beach Homestay
(32, 2, 960000.00, N'Đầu bếp chuẩn bị món hải sản Quy Nhơn.'),
(32, 3, 200000.00, N'Bữa sáng với bún chả cá.'),
(32, 4, 300000.00, N'Massage thư giãn với view biển.'),
-- Homestay 33: Phan Rang Desert Homestay
(33, 1, 580000.00, N'Chụp ảnh tại đồi cát Nam Cương.'),
(33, 8, 430000.00, N'Spa với liệu pháp thảo dược Chăm.'),
(33, 9, 240000.00, N'Phục vụ bữa sáng với bánh canh chả cá.'),
(33, 10, 180000.00, N'Làm móng với họa tiết Chăm.'),
-- Homestay 34: Ca Mau Mangrove Homestay
(34, 3, 190000.00, N'Bữa sáng với lẩu mắm miền Tây.'),
(34, 4, 310000.00, N'Massage thư giãn trong rừng đước.'),
(34, 5, 280000.00, N'Khóa học làm mắm truyền thống.'),
-- Homestay 35: Hoa Binh Lake Homestay
(35, 1, 590000.00, N'Chụp ảnh tại hồ Hòa Bình.'),
(35, 6, 300000.00, N'Trang điểm phong cách dân tộc Mường.'),
(35, 7, 250000.00, N'Tạo kiểu tóc truyền thống Mường.'),
(35, 9, 230000.00, N'Phục vụ bữa sáng với thịt lợn Mường.'),
-- Homestay 36: Ben Tre Coconut Homestay
(36, 2, 940000.00, N'Đầu bếp chuẩn bị món dừa đặc trưng.'),
(36, 3, 180000.00, N'Bữa sáng với bánh xèo dừa.'),
(36, 4, 300000.00, N'Massage thư giãn trong vườn dừa.'),
-- Homestay 37: Vinh Long River Homestay
(37, 3, 190000.00, N'Bữa sáng với hủ tiếu miền Tây.'),
(37, 5, 280000.00, N'Khóa học làm kẹo dừa truyền thống.'),
(37, 9, 240000.00, N'Phục vụ bữa tối bên sông Cổ Chiên.'),
(37, 10, 170000.00, N'Làm móng với họa tiết miền Tây.'),
-- Homestay 38: Lao Cai Highland Homestay
(38, 1, 600000.00, N'Chụp ảnh tại bản Cát Cát.'),
(38, 6, 310000.00, N'Trang điểm phong cách dân tộc H’Mông.'),
(38, 7, 260000.00, N'Tạo kiểu tóc truyền thống H’Mông.'),
-- Homestay 39: Tay Ninh Ba Den Homestay
(39, 3, 200000.00, N'Bữa sáng với bánh tráng phơi sương.'),
(39, 4, 300000.00, N'Massage thư giãn với view núi Bà Đen.'),
(39, 9, 230000.00, N'Phục vụ bữa tối với đặc sản Tây Ninh.'),
(39, 10, 180000.00, N'Làm móng với họa tiết Cao Đài.'),
-- Homestay 40: Nam Dinh Coastal Homestay
(40, 1, 590000.00, N'Chụp ảnh tại biển Quất Lâm.'),
(40, 3, 190000.00, N'Bữa sáng với cháo lươn Nam Định.'),
(40, 4, 310000.00, N'Massage thư giãn với view biển.'),
(40, 8, 420000.00, N'Spa với liệu pháp biển.');


GO
CREATE TABLE ServiceImage (
    image_id INT PRIMARY KEY IDENTITY(1,1),
    service_id INT NOT NULL,
    image_url NVARCHAR(255) NOT NULL,
    status BIT DEFAULT 1,  
);
GO
INSERT INTO ServiceImage (service_id, image_url, status) VALUES
-- Homestay 1: Da Lat Dreamy Homestay
(1, 'images/photography_0.jpg', 1), -- Chụp ảnh
(1, 'images/photography_1.jpg', 1),
(1, 'images/photography_2.jpg', 1),
(2, 'images/massage_0.jpg', 1), -- Massage
(2, 'images/massage_1.jpg', 1),
(2, 'images/massage_2.jpg', 1),
(3, 'images/dining_0.jpg', 1), -- Dịch vụ ăn uống
(3, 'images/dining_1.jpg', 1),
(3, 'images/dining_2.jpg', 1),
(4, 'images/nailcare_0.jpg', 1), -- Làm móng
(4, 'images/nailcare_1.jpg', 1),
(4, 'images/nailcare_2.jpg', 1),

-- Homestay 2: Pine Hill Homestay
(5, 'images/chef_0.jpg', 1), -- Đầu bếp
(5, 'images/chef_1.jpg', 1),
(5, 'images/chef_2.jpg', 1),
(6, 'images/prepared_food_0.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(6, 'images/prepared_food_1.jpg', 1),
(6, 'images/prepared_food_2.jpg', 1),
(7, 'images/spa_0.jpg', 1), -- Chăm sóc spa
(7, 'images/spa_1.jpg', 1),
(7, 'images/spa_2.jpg', 1),

-- Homestay 3: Da Lat Blossom Homestay
(8, 'images/photography_3.jpg', 1), -- Chụp ảnh
(8, 'images/photography_4.jpg', 1),
(8, 'images/photography_5.jpg', 1),
(9, 'images/training_0.jpg', 1), -- Đào tạo
(9, 'images/training_1.jpg', 1),
(9, 'images/training_2.jpg', 1),
(10, 'images/makeup_0.jpg', 1), -- Trang điểm
(10, 'images/makeup_1.jpg', 1),
(10, 'images/makeup_2.jpg', 1),
(11, 'images/hairstyling_0.jpg', 1), -- Làm tóc
(11, 'images/hairstyling_1.jpg', 1),
(11, 'images/hairstyling_2.jpg', 1),

-- Homestay 4: Misty Valley Homestay
(12, 'images/massage_3.jpg', 1), -- Massage
(12, 'images/massage_4.jpg', 1),
(12, 'images/massage_5.jpg', 1),
(13, 'images/dining_3.jpg', 1), -- Dịch vụ ăn uống
(13, 'images/dining_4.jpg', 1),
(13, 'images/dining_5.jpg', 1),
(14, 'images/nailcare_3.jpg', 1), -- Làm móng
(14, 'images/nailcare_4.jpg', 1),
(14, 'images/nailcare_5.jpg', 1),

-- Homestay 5: Flower Garden Homestay
(15, 'images/photography_6.jpg', 1), -- Chụp ảnh
(15, 'images/photography_7.jpg', 1),
(15, 'images/photography_8.jpg', 1),
(16, 'images/prepared_food_3.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(16, 'images/prepared_food_4.jpg', 1),
(16, 'images/prepared_food_5.jpg', 1),
(17, 'images/spa_3.jpg', 1), -- Chăm sóc spa
(17, 'images/spa_4.jpg', 1),
(17, 'images/spa_5.jpg', 1),
(18, 'images/dining_6.jpg', 1), -- Dịch vụ ăn uống
(18, 'images/dining_7.jpg', 1),
(18, 'images/dining_8.jpg', 1),

-- Homestay 6: Da Lat Cozy Homestay
(19, 'images/chef_3.jpg', 1), -- Đầu bếp
(19, 'images/chef_4.jpg', 1),
(19, 'images/chef_5.jpg', 1),
(20, 'images/massage_6.jpg', 1), -- Massage
(20, 'images/massage_7.jpg', 1),
(20, 'images/massage_8.jpg', 1),
(21, 'images/hairstyling_3.jpg', 1), -- Làm tóc
(21, 'images/hairstyling_4.jpg', 1),
(21, 'images/hairstyling_5.jpg', 1),

-- Homestay 7: Starlight Homestay
(22, 'images/photography_9.jpg', 1), -- Chụp ảnh
(22, 'images/photography_10.jpg', 1),
(22, 'images/photography_11.jpg', 1),
(23, 'images/training_3.jpg', 1), -- Đào tạo
(23, 'images/training_4.jpg', 1),
(23, 'images/training_5.jpg', 1),
(24, 'images/makeup_3.jpg', 1), -- Trang điểm
(24, 'images/makeup_4.jpg', 1),
(24, 'images/makeup_5.jpg', 1),
(25, 'images/dining_9.jpg', 1), -- Dịch vụ ăn uống
(25, 'images/dining_10.jpg', 1),
(25, 'images/dining_11.jpg', 1),

-- Homestay 8: Da Nang Ocean Homestay
(26, 'images/prepared_food_6.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(26, 'images/prepared_food_7.jpg', 1),
(26, 'images/prepared_food_8.jpg', 1),
(27, 'images/massage_9.jpg', 1), -- Massage
(27, 'images/massage_10.jpg', 1),
(27, 'images/massage_11.jpg', 1),
(28, 'images/spa_6.jpg', 1), -- Chăm sóc spa
(28, 'images/spa_7.jpg', 1),
(28, 'images/spa_8.jpg', 1),
(29, 'images/nailcare_6.jpg', 1), -- Làm móng
(29, 'images/nailcare_7.jpg', 1),
(29, 'images/nailcare_8.jpg', 1),

-- Homestay 9: Han River Homestay
(30, 'images/photography_12.jpg', 1), -- Chụp ảnh
(30, 'images/photography_13.jpg', 1),
(30, 'images/photography_14.jpg', 1),
(31, 'images/chef_6.jpg', 1), -- Đầu bếp
(31, 'images/chef_7.jpg', 1),
(31, 'images/chef_8.jpg', 1),
(32, 'images/dining_12.jpg', 1), -- Dịch vụ ăn uống
(32, 'images/dining_13.jpg', 1),
(32, 'images/dining_14.jpg', 1),
(33, 'images/nailcare_9.jpg', 1), -- Làm móng
(33, 'images/nailcare_10.jpg', 1),
(33, 'images/nailcare_11.jpg', 1),

-- Homestay 10: My Khe Beach Homestay
(34, 'images/prepared_food_9.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(34, 'images/prepared_food_10.jpg', 1),
(34, 'images/prepared_food_11.jpg', 1),
(35, 'images/massage_12.jpg', 1), -- Massage
(35, 'images/massage_13.jpg', 1),
(35, 'images/massage_14.jpg', 1),
(36, 'images/spa_9.jpg', 1), -- Chăm sóc spa
(36, 'images/spa_10.jpg', 1),
(36, 'images/spa_11.jpg', 1),

-- Homestay 11: Da Nang Sky Homestay
(37, 'images/photography_15.jpg', 1), -- Chụp ảnh
(37, 'images/photography_16.jpg', 1),
(37, 'images/photography_17.jpg', 1),
(38, 'images/makeup_6.jpg', 1), -- Trang điểm
(38, 'images/makeup_7.jpg', 1),
(38, 'images/makeup_8.jpg', 1),
(39, 'images/hairstyling_6.jpg', 1), -- Làm tóc
(39, 'images/hairstyling_7.jpg', 1),
(39, 'images/hairstyling_8.jpg', 1),
(40, 'images/dining_15.jpg', 1), -- Dịch vụ ăn uống
(40, 'images/dining_16.jpg', 1),
(40, 'images/dining_17.jpg', 1),

-- Homestay 12: Sunset Bridge Homestay
(41, 'images/chef_9.jpg', 1), -- Đầu bếp
(41, 'images/chef_10.jpg', 1),
(41, 'images/chef_11.jpg', 1),
(42, 'images/prepared_food_12.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(42, 'images/prepared_food_13.jpg', 1),
(42, 'images/prepared_food_14.jpg', 1),
(43, 'images/massage_15.jpg', 1), -- Massage
(43, 'images/massage_16.jpg', 1),
(43, 'images/massage_17.jpg', 1),

-- Homestay 13: Coral Reef Homestay
(44, 'images/photography_18.jpg', 1), -- Chụp ảnh
(44, 'images/photography_19.jpg', 1),
(44, 'images/photography_20.jpg', 1),
(45, 'images/spa_12.jpg', 1), -- Chăm sóc spa
(45, 'images/spa_13.jpg', 1),
(45, 'images/spa_14.jpg', 1),
(46, 'images/dining_18.jpg', 1), -- Dịch vụ ăn uống
(46, 'images/dining_19.jpg', 1),
(46, 'images/dining_20.jpg', 1),
(47, 'images/nailcare_12.jpg', 1), -- Làm móng
(47, 'images/nailcare_13.jpg', 1),
(47, 'images/nailcare_14.jpg', 1),

-- Homestay 14: Da Nang Green Homestay
(48, 'images/prepared_food_15.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(48, 'images/prepared_food_16.jpg', 1),
(48, 'images/prepared_food_17.jpg', 1),
(49, 'images/massage_18.jpg', 1), -- Massage
(49, 'images/massage_19.jpg', 1),
(49, 'images/massage_20.jpg', 1),
(50, 'images/spa_15.jpg', 1), -- Chăm sóc spa
(50, 'images/spa_16.jpg', 1),
(50, 'images/spa_17.jpg', 1),
(51, 'images/dining_21.jpg', 1), -- Dịch vụ ăn uống
(51, 'images/dining_22.jpg', 1),
(51, 'images/dining_23.jpg', 1),

-- Homestay 15: Hanoi Charm Homestay
(52, 'images/photography_21.jpg', 1), -- Chụp ảnh
(52, 'images/photography_22.jpg', 1),
(52, 'images/photography_23.jpg', 1),
(53, 'images/training_6.jpg', 1), -- Đào tạo
(53, 'images/training_7.jpg', 1),
(53, 'images/training_8.jpg', 1),
(54, 'images/makeup_9.jpg', 1), -- Trang điểm
(54, 'images/makeup_10.jpg', 1),
(54, 'images/makeup_11.jpg', 1),
(55, 'images/dining_24.jpg', 1), -- Dịch vụ ăn uống
(55, 'images/dining_25.jpg', 1),
(55, 'images/dining_26.jpg', 1),

-- Homestay 16: Old Gate Homestay
(56, 'images/prepared_food_18.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(56, 'images/prepared_food_19.jpg', 1),
(56, 'images/prepared_food_20.jpg', 1),
(57, 'images/massage_21.jpg', 1), -- Massage
(57, 'images/massage_22.jpg', 1),
(57, 'images/massage_23.jpg', 1),
(58, 'images/hairstyling_9.jpg', 1), -- Làm tóc
(58, 'images/hairstyling_10.jpg', 1),
(58, 'images/hairstyling_11.jpg', 1),

-- Homestay 17: Hoan Kiem Lake Homestay
(59, 'images/photography_24.jpg', 1), -- Chụp ảnh
(59, 'images/photography_25.jpg', 1),
(59, 'images/photography_26.jpg', 1),
(60, 'images/chef_12.jpg', 1), -- Đầu bếp
(60, 'images/chef_13.jpg', 1),
(60, 'images/chef_14.jpg', 1),
(61, 'images/dining_27.jpg', 1), -- Dịch vụ ăn uống
(61, 'images/dining_28.jpg', 1),
(61, 'images/dining_29.jpg', 1),
(62, 'images/nailcare_15.jpg', 1), -- Làm móng
(62, 'images/nailcare_16.jpg', 1),
(62, 'images/nailcare_17.jpg', 1),

-- Homestay 18: Hanoi Lotus Homestay
(63, 'images/training_9.jpg', 1), -- Đào tạo
(63, 'images/training_10.jpg', 1),
(63, 'images/training_11.jpg', 1),
(64, 'images/makeup_12.jpg', 1), -- Trang điểm
(64, 'images/makeup_13.jpg', 1),
(64, 'images/makeup_14.jpg', 1),
(65, 'images/spa_18.jpg', 1), -- Chăm sóc spa
(65, 'images/spa_19.jpg', 1),
(65, 'images/spa_20.jpg', 1),
(66, 'images/dining_30.jpg', 1), -- Dịch vụ ăn uống
(66, 'images/dining_31.jpg', 1),
(66, 'images/dining_32.jpg', 1),

-- Homestay 19: Tran Quoc Pagoda Homestay
(67, 'images/photography_27.jpg', 1), -- Chụp ảnh
(67, 'images/photography_28.jpg', 1),
(67, 'images/photography_29.jpg', 1),
(68, 'images/massage_24.jpg', 1), -- Massage
(68, 'images/massage_25.jpg', 1),
(68, 'images/massage_26.jpg', 1),
(69, 'images/hairstyling_12.jpg', 1), -- Làm tóc
(69, 'images/hairstyling_13.jpg', 1),
(69, 'images/hairstyling_14.jpg', 1),
(70, 'images/nailcare_18.jpg', 1), -- Làm móng
(70, 'images/nailcare_19.jpg', 1),
(70, 'images/nailcare_20.jpg', 1),

-- Homestay 20: Hanoi Vintage Homestay
(71, 'images/prepared_food_21.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(71, 'images/prepared_food_22.jpg', 1),
(71, 'images/prepared_food_23.jpg', 1),
(72, 'images/training_12.jpg', 1), -- Đào tạo
(72, 'images/training_13.jpg', 1),
(72, 'images/training_14.jpg', 1),
(73, 'images/makeup_15.jpg', 1), -- Trang điểm
(73, 'images/makeup_16.jpg', 1),
(73, 'images/makeup_17.jpg', 1),

-- Homestay 21: Phu Quoc Paradise Homestay
(74, 'images/photography_30.jpg', 1), -- Chụp ảnh
(74, 'images/photography_31.jpg', 1),
(74, 'images/photography_32.jpg', 1),
(75, 'images/prepared_food_24.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(75, 'images/prepared_food_25.jpg', 1),
(75, 'images/prepared_food_26.jpg', 1),
(76, 'images/spa_21.jpg', 1), -- Chăm sóc spa
(76, 'images/spa_22.jpg', 1),
(76, 'images/spa_23.jpg', 1),
(77, 'images/dining_33.jpg', 1), -- Dịch vụ ăn uống
(77, 'images/dining_34.jpg', 1),
(77, 'images/dining_35.jpg', 1),

-- Homestay 22: Can Tho Garden Homestay
(78, 'images/chef_15.jpg', 1), -- Đầu bếp
(78, 'images/chef_16.jpg', 1),
(78, 'images/chef_17.jpg', 1),
(79, 'images/prepared_food_27.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(79, 'images/prepared_food_28.jpg', 1),
(79, 'images/prepared_food_29.jpg', 1),
(80, 'images/massage_27.jpg', 1), -- Massage
(80, 'images/massage_28.jpg', 1),
(80, 'images/massage_29.jpg', 1),
(81, 'images/nailcare_21.jpg', 1), -- Làm móng
(81, 'images/nailcare_22.jpg', 1),
(81, 'images/nailcare_23.jpg', 1),

-- Homestay 23: Mai Chau Valley Homestay
(82, 'images/training_15.jpg', 1), -- Đào tạo
(82, 'images/training_16.jpg', 1),
(82, 'images/training_17.jpg', 1),
(83, 'images/makeup_18.jpg', 1), -- Trang điểm
(83, 'images/makeup_19.jpg', 1),
(83, 'images/makeup_20.jpg', 1),
(84, 'images/hairstyling_15.jpg', 1), -- Làm tóc
(84, 'images/hairstyling_16.jpg', 1),
(84, 'images/hairstyling_17.jpg', 1),
(85, 'images/dining_36.jpg', 1), -- Dịch vụ ăn uống
(85, 'images/dining_37.jpg', 1),
(85, 'images/dining_38.jpg', 1),

-- Homestay 24: Cat Ba Green Homestay
(86, 'images/photography_33.jpg', 1), -- Chụp ảnh
(86, 'images/photography_34.jpg', 1),
(86, 'images/photography_35.jpg', 1),
(87, 'images/massage_30.jpg', 1), -- Massage
(87, 'images/massage_31.jpg', 1),
(87, 'images/massage_32.jpg', 1),
(88, 'images/spa_24.jpg', 1), -- Chăm sóc spa
(88, 'images/spa_25.jpg', 1),
(88, 'images/spa_26.jpg', 1),

-- Homestay 25: Phong Nha Lake Homestay
(89, 'images/prepared_food_30.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(89, 'images/prepared_food_31.jpg', 1),
(89, 'images/prepared_food_32.jpg', 1),
(90, 'images/massage_33.jpg', 1), -- Massage
(90, 'images/massage_34.jpg', 1),
(90, 'images/massage_35.jpg', 1),
(91, 'images/dining_39.jpg', 1), -- Dịch vụ ăn uống
(91, 'images/dining_40.jpg', 1),
(91, 'images/dining_41.jpg', 1),
(92, 'images/nailcare_24.jpg', 1), -- Làm móng
(92, 'images/nailcare_25.jpg', 1),
(92, 'images/nailcare_26.jpg', 1),

-- Homestay 26: Con Dao Serenity Homestay
(93, 'images/photography_36.jpg', 1), -- Chụp ảnh
(93, 'images/photography_37.jpg', 1),
(93, 'images/photography_38.jpg', 1),
(94, 'images/prepared_food_33.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(94, 'images/prepared_food_34.jpg', 1),
(94, 'images/prepared_food_35.jpg', 1),
(95, 'images/spa_27.jpg', 1), -- Chăm sóc spa
(95, 'images/spa_28.jpg', 1),
(95, 'images/spa_29.jpg', 1),

-- Homestay 27: Vung Tau Horizon Homestay
(96, 'images/chef_18.jpg', 1), -- Đầu bếp
(96, 'images/chef_19.jpg', 1),
(96, 'images/chef_20.jpg', 1),
(97, 'images/prepared_food_36.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(97, 'images/prepared_food_37.jpg', 1),
(97, 'images/prepared_food_38.jpg', 1),
(98, 'images/dining_42.jpg', 1), -- Dịch vụ ăn uống
(98, 'images/dining_43.jpg', 1),
(98, 'images/dining_44.jpg', 1),
(99, 'images/nailcare_27.jpg', 1), -- Làm móng
(99, 'images/nailcare_28.jpg', 1),
(99, 'images/nailcare_29.jpg', 1),

-- Homestay 28: Mui Ne Ocean Homestay
(100, 'images/photography_39.jpg', 1), -- Chụp ảnh
(100, 'images/photography_40.jpg', 1),
(100, 'images/photography_41.jpg', 1),
(101, 'images/massage_36.jpg', 1), -- Massage
(101, 'images/massage_37.jpg', 1),
(101, 'images/massage_38.jpg', 1),
(102, 'images/spa_30.jpg', 1), -- Chăm sóc spa
(102, 'images/spa_31.jpg', 1),
(102, 'images/spa_32.jpg', 1),

-- Homestay 29: Ha Giang Cloud Homestay
(103, 'images/training_18.jpg', 1), -- Đào tạo
(103, 'images/training_19.jpg', 1),
(103, 'images/training_20.jpg', 1),
(104, 'images/makeup_21.jpg', 1), -- Trang điểm
(104, 'images/makeup_22.jpg', 1),
(104, 'images/makeup_23.jpg', 1),
(105, 'images/hairstyling_18.jpg', 1), -- Làm tóc
(105, 'images/hairstyling_19.jpg', 1),
(105, 'images/hairstyling_20.jpg', 1),
(106, 'images/dining_45.jpg', 1), -- Dịch vụ ăn uống
(106, 'images/dining_46.jpg', 1),
(106, 'images/dining_47.jpg', 1),

-- Homestay 30: Ba Be Eco Homestay
(107, 'images/prepared_food_39.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(107, 'images/prepared_food_40.jpg', 1),
(107, 'images/prepared_food_41.jpg', 1),
(108, 'images/massage_39.jpg', 1), -- Massage
(108, 'images/massage_40.jpg', 1),
(108, 'images/massage_41.jpg', 1),
(109, 'images/training_21.jpg', 1), -- Đào tạo
(109, 'images/training_22.jpg', 1),
(109, 'images/training_23.jpg', 1),
(110, 'images/nailcare_30.jpg', 1), -- Làm móng
(110, 'images/nailcare_31.jpg', 1),
(110, 'images/nailcare_32.jpg', 1),

-- Homestay 31: Lang Son Mountain Homestay
(111, 'images/photography_42.jpg', 1), -- Chụp ảnh
(111, 'images/photography_43.jpg', 1),
(111, 'images/photography_44.jpg', 1),
(112, 'images/makeup_24.jpg', 1), -- Trang điểm
(112, 'images/makeup_25.jpg', 1),
(112, 'images/makeup_26.jpg', 1),
(113, 'images/hairstyling_21.jpg', 1), -- Làm tóc
(113, 'images/hairstyling_22.jpg', 1),
(113, 'images/hairstyling_23.jpg', 1),
(114, 'images/dining_48.jpg', 1), -- Dịch vụ ăn uống
(114, 'images/dining_49.jpg', 1),
(114, 'images/dining_50.jpg', 1),

-- Homestay 32: Quy Nhon Beach Homestay
(115, 'images/chef_21.jpg', 1), -- Đầu bếp
(115, 'images/chef_22.jpg', 1),
(115, 'images/chef_23.jpg', 1),
(116, 'images/prepared_food_42.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(116, 'images/prepared_food_43.jpg', 1),
(116, 'images/prepared_food_44.jpg', 1),
(117, 'images/massage_42.jpg', 1), -- Massage
(117, 'images/massage_43.jpg', 1),
(117, 'images/massage_44.jpg', 1),

-- Homestay 33: Phan Rang Desert Homestay
(118, 'images/photography_45.jpg', 1), -- Chụp ảnh
(118, 'images/photography_46.jpg', 1),
(118, 'images/photography_47.jpg', 1),
(119, 'images/spa_33.jpg', 1), -- Chăm sóc spa
(119, 'images/spa_34.jpg', 1),
(119, 'images/spa_35.jpg', 1),
(120, 'images/dining_51.jpg', 1), -- Dịch vụ ăn uống
(120, 'images/dining_52.jpg', 1),
(120, 'images/dining_53.jpg', 1),
(121, 'images/nailcare_33.jpg', 1), -- Làm móng
(121, 'images/nailcare_34.jpg', 1),
(121, 'images/nailcare_35.jpg', 1),

-- Homestay 34: Ca Mau Mangrove Homestay
(122, 'images/prepared_food_45.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(122, 'images/prepared_food_46.jpg', 1),
(122, 'images/prepared_food_47.jpg', 1),
(123, 'images/massage_45.jpg', 1), -- Massage
(123, 'images/massage_46.jpg', 1),
(123, 'images/massage_47.jpg', 1),
(124, 'images/training_24.jpg', 1), -- Đào tạo
(124, 'images/training_25.jpg', 1),
(124, 'images/training_26.jpg', 1),

-- Homestay 35: Hoa Binh Lake Homestay
(125, 'images/photography_48.jpg', 1), -- Chụp ảnh
(125, 'images/photography_49.jpg', 1),
(125, 'images/photography_50.jpg', 1),
(126, 'images/makeup_27.jpg', 1), -- Trang điểm
(126, 'images/makeup_28.jpg', 1),
(126, 'images/makeup_29.jpg', 1),
(127, 'images/hairstyling_24.jpg', 1), -- Làm tóc
(127, 'images/hairstyling_25.jpg', 1),
(127, 'images/hairstyling_26.jpg', 1),
(128, 'images/dining_54.jpg', 1), -- Dịch vụ ăn uống
(128, 'images/dining_55.jpg', 1),
(128, 'images/dining_56.jpg', 1),

-- Homestay 36: Ben Tre Coconut Homestay
(129, 'images/chef_24.jpg', 1), -- Đầu bếp
(129, 'images/chef_25.jpg', 1),
(129, 'images/chef_26.jpg', 1),
(130, 'images/prepared_food_48.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(130, 'images/prepared_food_49.jpg', 1),
(130, 'images/prepared_food_50.jpg', 1),
(131, 'images/massage_48.jpg', 1), -- Massage
(131, 'images/massage_49.jpg', 1),
(131, 'images/massage_50.jpg', 1),

-- Homestay 37: Vinh Long River Homestay
(132, 'images/prepared_food_51.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(132, 'images/prepared_food_52.jpg', 1),
(132, 'images/prepared_food_53.jpg', 1),
(133, 'images/training_27.jpg', 1), -- Đào tạo
(133, 'images/training_28.jpg', 1),
(133, 'images/training_29.jpg', 1),
(134, 'images/dining_57.jpg', 1), -- Dịch vụ ăn uống
(134, 'images/dining_58.jpg', 1),
(134, 'images/dining_59.jpg', 1),
(135, 'images/nailcare_36.jpg', 1), -- Làm móng
(135, 'images/nailcare_37.jpg', 1),
(135, 'images/nailcare_38.jpg', 1),

-- Homestay 38: Lao Cai Highland Homestay
(136, 'images/photography_51.jpg', 1), -- Chụp ảnh
(136, 'images/photography_52.jpg', 1),
(136, 'images/photography_53.jpg', 1),
(137, 'images/makeup_30.jpg', 1), -- Trang điểm
(137, 'images/makeup_31.jpg', 1),
(137, 'images/makeup_32.jpg', 1),
(138, 'images/hairstyling_27.jpg', 1), -- Làm tóc
(138, 'images/hairstyling_28.jpg', 1),
(138, 'images/hairstyling_29.jpg', 1),

-- Homestay 39: Tay Ninh Ba Den Homestay
(139, 'images/prepared_food_54.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(139, 'images/prepared_food_55.jpg', 1),
(139, 'images/prepared_food_56.jpg', 1),
(140, 'images/massage_51.jpg', 1), -- Massage
(140, 'images/massage_52.jpg', 1),
(140, 'images/massage_53.jpg', 1),
(141, 'images/dining_60.jpg', 1), -- Dịch vụ ăn uống
(141, 'images/dining_61.jpg', 1),
(141, 'images/dining_62.jpg', 1),
(142, 'images/nailcare_39.jpg', 1), -- Làm móng
(142, 'images/nailcare_40.jpg', 1),
(142, 'images/nailcare_41.jpg', 1),

-- Homestay 40: Nam Dinh Coastal Homestay
(143, 'images/photography_54.jpg', 1), -- Chụp ảnh
(143, 'images/photography_55.jpg', 1),
(143, 'images/photography_56.jpg', 1),
(144, 'images/prepared_food_57.jpg', 1), -- Đồ ăn chuẩn bị sẵn
(144, 'images/prepared_food_58.jpg', 1),
(144, 'images/prepared_food_59.jpg', 1),
(145, 'images/massage_54.jpg', 1), -- Massage
(145, 'images/massage_55.jpg', 1),
(145, 'images/massage_56.jpg', 1),
(146, 'images/spa_36.jpg', 1), -- Chăm sóc spa
(146, 'images/spa_37.jpg', 1),
(146, 'images/spa_38.jpg', 1);











-- bảng bookings: quản lý đặt chỗ
create table Bookings (
    booking_id int primary key identity(1,1),
    user_id int,
	homestay_id int,
    room_number varchar(10),
    check_in_date date  null,
    check_out_date date  null,
	adults int default 0,
	children int default 0,
	total_people int default 0,
    total_amount decimal(10,2)  null check (total_amount >= 0),
    status varchar(20)  null check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at datetime default getdate(),
    foreign key (user_id) references Users(user_id),
	foreign key (homestay_id, room_number) references Rooms(homestay_id, room_number),
    constraint check_Booking_Dates check (check_out_date > check_in_date)
)
go

INSERT INTO Bookings (user_id, homestay_id, room_number, check_in_date, check_out_date, adults, children, total_people, total_amount, status, created_at)
VALUES

-- Homestay 1: Phu Quoc Sunset Homestay
(1, 11, 'R01', '2025-06-01', '2025-06-04', 2, 1, 3, 1545000.00, 'confirmed', '2025-05-31'), -- 3 nights * 500,000 + 45,000 (breakfast)
(2, 11, 'R02', '2025-07-10', '2025-07-12', 3, 0, 3, 1080000.00, 'pending', '2025-05-30'), -- 2 nights * 500,000 + 80,000 (motorbike)
-- Homestay 2: Can Tho Riverside Homestay
(3, 12, 'R01', '2025-06-15', '2025-06-18', 2, 0, 2, 1540000.00, 'completed', '2025-05-29'), -- 3 nights * 500,000 + 40,000 (bicycle)
(4, 12, 'R01', '2025-08-01', '2025-08-03', 1, 1, 2, 1000000.00, 'confirmed', '2025-05-31'), -- 2 nights * 500,000
-- Homestay 3: Mai Chau Eco Homestay
(5, 13, 'R01', '2025-06-20', '2025-06-23', 2, 2, 4, 1540000.00, 'confirmed', '2025-05-31'), -- 3 nights * 500,000 + 40,000 (bicycle)
(6, 13, 'R02', '2025-09-01', '2025-09-05', 3, 1, 4, 2180000.00, 'pending', '2025-05-30'), -- 4 nights * 500,000 + 180,000 (tour)
-- Homestay 4: Cat Ba Island Homestay
(7, 14, 'R01', '2025-07-05', '2025-07-07', 2, 0, 2, 1080000.00, 'cancelled', '2025-05-28'), -- 2 nights * 500,000 + 80,000 (motorbike)
(8, 14, 'R01', '2025-10-01', '2025-10-04', 4, 0, 4, 1680000.00, 'confirmed', '2025-05-31'), -- 3 nights * 500,000 + 180,000 (tour)
-- Homestay 5: Phong Nha Village Homestay
(9, 15, 'R01', '2025-06-10', '2025-06-12', 1, 0, 1, 1000000.00, 'completed', '2025-05-30'), -- 2 nights * 500,000
(10, 15, 'R02', '2025-11-01', '2025-11-03', 2, 1, 3, 1045000.00, 'pending', '2025-05-31'), -- 2 nights * 500,000 + 45,000 (breakfast)
-- Homestay 6: Con Dao Ocean Homestay
(11, 16, 'R01', '2025-06-25', '2025-06-28', 3, 0, 3, 1580000.00, 'confirmed', '2025-05-31'), -- 3 nights * 500,000 + 80,000 (motorbike)
(12, 16, 'R01', '2025-12-01', '2025-12-04', 2, 2, 4, 1500000.00, 'pending', '2025-05-30'), -- 3 nights * 500,000
-- Homestay 7: Vung Tau Coastal Homestay
(13, 17, 'R01', '2025-07-15', '2025-07-17', 2, 0, 2, 1180000.00, 'confirmed', '2025-05-31'), -- 2 nights * 500,000 + 180,000 (BBQ)
(14, 17, 'R02', '2025-08-10', '2025-08-12', 1, 1, 2, 1000000.00, 'cancelled', '2025-05-29'), -- 2 nights * 500,000
-- Homestay 8: Mui Ne Sandy Homestay
(15, 18, 'R01', '2025-06-05', '2025-06-08', 3, 1, 4, 1545000.00, 'confirmed', '2025-05-31'), -- 3 nights * 500,000 + 45,000 (breakfast)
(16, 18, 'R01', '2025-09-15', '2025-09-18', 2, 0, 2, 1680000.00, 'pending', '2025-05-30'), -- 3 nights * 500,000 + 180,000 (tour)
-- Homestay 9: Ha Giang Loop Homestay
(17, 19, 'R01', '2025-07-01', '2025-07-04', 2, 0, 2, 1080000.00, 'confirmed', '2025-05-31'), -- 3 nights * 500,000 + 80,000 (motorbike)
(18, 19, 'R02', '2025-10-10', '2025-10-12', 1, 0, 1, 1000000.00, 'completed', '2025-05-30'), -- 2 nights * 500,000
-- Homestay 10: Ba Be Lake Homestay
(19, 20, 'R01', '2025-06-15', '2025-06-18', 2, 1, 3, 1540000.00, 'confirmed', '2025-05-31'), -- 3 nights * 500,000 + 40,000 (bicycle)
(20, 20, 'R01', '2025-11-15', '2025-11-17', 3, 0, 3, 1000000.00, 'pending', '2025-05-31'), -- 2 nights * 500,000
-- Homestay 11: Hanoi Old Quarter Homestay
(21, 21, 'R01', '2025-06-01', '2025-06-03', 2, 0, 2, 1200000.00, 'confirmed', '2025-05-31'), -- 2 nights * 600,000
(22, 21, 'R02', '2025-07-10', '2025-07-13', 3, 1, 4, 1980000.00, 'pending', '2025-05-30'), -- 3 nights * 600,000 + 180,000 (tour)
-- Homestay 12: Sapa Valley Homestay
(23, 22, 'R01', '2025-08-01', '2025-08-04', 2, 2, 4, 1840000.00, 'confirmed', '2025-05-31'), -- 3 nights * 600,000 + 40,000 (bicycle)
(24, 22, 'R01', '2025-09-01', '2025-09-03', 1, 0, 1, 1200000.00, 'completed', '2025-05-30'), -- 2 nights * 600,000
-- Homestay 13: Ha Long Pearl Homestay
(25, 23, 'R01', '2025-06-20', '2025-06-23', 3, 0, 3, 1880000.00, 'confirmed', '2025-05-31'), -- 3 nights * 600,000 + 80,000 (motorbike)
(26, 23, 'R02', '2025-10-01', '2025-10-05', 2, 1, 3, 2580000.00, 'pending', '2025-05-31'), -- 4 nights * 600,000 + 180,000 (tour)
-- Homestay 14: Ninh Binh Lotus Homestay
(27, 24, 'R01', '2025-07-05', '2025-07-07', 2, 0, 2, 1240000.00, 'confirmed', '2025-05-31'), -- 2 nights * 600,000 + 40,000 (bicycle)
(28, 24, 'R01', '2025-11-01', '2025-11-04', 3, 1, 4, 1800000.00, 'cancelled', '2025-05-30'), -- 3 nights * 600,000
-- Homestay 15: Hue Heritage Homestay
(29, 25, 'R01', '2025-06-10', '2025-06-13', 2, 0, 2, 1840000.00, 'confirmed', '2025-05-31'), -- 3 nights * 600,000 + 40,000 (bicycle)
(30, 25, 'R02', '2025-12-01', '2025-12-03', 1, 1, 2, 1200000.00, 'pending', '2025-05-31'), -- 2 nights * 600,000
-- Homestay 16: Da Nang Skyline Homestay
(31, 26, 'R01', '2025-06-25', '2025-06-28', 3, 0, 3, 1880000.00, 'confirmed', '2025-05-31'), -- 3 nights * 600,000 + 80,000 (motorbike)
(32, 26, 'R01', '2025-08-10', '2025-08-12', 2, 1, 3, 1245000.00, 'pending', '2025-05-30'), -- 2 nights * 600,000 + 45,000 (breakfast)
-- Homestay 17: Hoi An Riverside Homestay
(33, 27, 'R01', '2025-06-05', '2025-06-08', 2, 0, 2, 1840000.00, 'confirmed', '2025-05-31'), -- 3 nights * 600,000 + 40,000 (bicycle)
(34, 27, 'R02', '2025-09-15', '2025-09-18', 3, 1, 4, 1980000.00, 'pending', '2025-05-31'), -- 3 nights * 600,000 + 180,000 (tour)
-- Homestay 18: Nha Trang Seaside Homestay
(35, 28, 'R01', '2025-07-01', '2025-07-04', 2, 0, 2, 1880000.00, 'confirmed', '2025-05-31'), -- 3 nights * 600,000 + 80,000 (motorbike)
(36, 28, 'R01', '2025-10-10', '2025-10-12', 1, 0, 1, 1200000.00, 'completed', '2025-05-30'), -- 2 nights * 600,000
-- Homestay 19: Da Lat Flower Homestay
(37, 29, 'R01', '2025-06-15', '2025-06-18', 2, 1, 3, 1840000.00, 'confirmed', '2025-05-31'), -- 3 nights * 600,000 + 40,000 (bicycle)
(38, 29, 'R02', '2025-11-15', '2025-11-17', 3, 0, 3, 1380000.00, 'pending', '2025-05-31'), -- 2 nights * 600,000 + 180,000 (BBQ)
-- Homestay 20: Saigon Central Homestay
(39, 30, 'R01', '2025-06-01', '2025-06-03', 2, 0, 2, 1200000.00, 'confirmed', '2025-05-31'), -- 2 nights * 600,000
(40, 30, 'R01', '2025-07-10', '2025-07-13', 3, 1, 4, 1800000.00, 'pending', '2025-05-30'), -- 3 nights * 600,000
-- Homestay 21: Phu Quoc Paradise Homestay
(41, 31, 'R01', '2025-06-20', '2025-06-23', 2, 0, 2, 1010000.00, 'confirmed', '2025-05-31'), -- 3 nights * 450,000 + 80,000 (motorbike)
(42, 31, 'R02', '2025-08-01', '2025-08-04', 1, 1, 2, 1395000.00, 'pending', '2025-05-31'), -- 3 nights * 450,000 + 45,000 (breakfast)
-- Homestay 22: Can Tho Garden Homestay
(43, 32, 'R01', '2025-06-10', '2025-06-12', 2, 0, 2, 940000.00, 'confirmed', '2025-05-31'), -- 2 nights * 450,000 + 40,000 (bicycle)
(44, 32, 'R01', '2025-09-01', '2025-09-04', 3, 0, 3, 1530000.00, 'pending', '2025-05-30'), -- 3 nights * 450,000 + 180,000 (tour)
-- Homestay 23: Mai Chau Valley Homestay
(45, 33, 'R01', '2025-07-05', '2025-07-07', 2, 1, 3, 940000.00, 'confirmed', '2025-05-31'), -- 2 nights * 450,000 + 40,000 (bicycle)
(46, 33, 'R02', '2025-10-01', '2025-10-03', 1, 0, 1, 900000.00, 'completed', '2025-05-30'), -- 2 nights * 450,000
-- Homestay 24: Cat Ba Green Homestay
(47, 34, 'R01', '2025-06-25', '2025-06-28', 2, 0, 2, 1130000.00, 'confirmed', '2025-05-31'), -- 3 nights * 450,000 + 80,000 (motorbike)
(48, 34, 'R01', '2025-11-01', '2025-11-04', 3, 1, 4, 1530000.00, 'pending', '2025-05-31'), -- 3 nights * 450,000 + 180,000 (BBQ)
-- Homestay 25: Phong Nha Lake Homestay
(49, 35, 'R01', '2025-06-05', '2025-06-08', 2, 0, 2, 1010000.00, 'confirmed', '2025-05-31'), -- 3 nights * 450,000 + 80,000 (motorbike)
(50, 35, 'R02', '2025-12-01', '2025-12-03', 1, 1, 2, 900000.00, 'pending', '2025-05-30'); -- 2 nights * 450,000
GO
-- bảng bookingservices: liên kết dịch vụ với đặt chỗ
CREATE TABLE BookingServices (
    booking_id INT NOT NULL,
    service_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (booking_id, service_id),
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id),
    FOREIGN KEY (service_id) REFERENCES Service(service_id)
);
go

INSERT INTO BookingServices (booking_id, service_id, quantity)
VALUES

-- Booking 1 (Homestay 1, Phu Quoc Sunset): Breakfast
(1, 1, 3), -- Bữa sáng Việt Nam, Tiêu chuẩn (45,000 VND * 3 people = 135,000 VND)
-- Booking 2 (Homestay 1): Motorbike
(2, 6, 1), -- Xe máy 110cc, Nửa ngày (80,000 VND)
-- Booking 3 (Homestay 2, Can Tho Riverside): Bicycle
(3, 12, 2), -- Xe đạp thành phố, Nửa ngày (40,000 VND * 2 = 80,000 VND)
-- Booking 4 (Homestay 2): Breakfast
(4, 3, 2), -- Bữa sáng kiểu Âu, Tiêu chuẩn (60,000 VND * 2 = 120,000 VND)
-- Booking 5 (Homestay 3, Mai Chau Eco): Bicycle + Tour
(5, 10, 2), -- Xe đạp địa hình, Nửa ngày (50,000 VND * 2 = 100,000 VND)
(5, 18, 1), -- Tour ẩm thực, Nửa ngày (180,000 VND)
-- Booking 6 (Homestay 3): Tour
(6, 14, 2), -- Tour khám phá văn hóa, Nửa ngày (200,000 VND * 2 = 400,000 VND)
-- Booking 7 (Homestay 4, Cat Ba Island): Motorbike
(7, 7, 1), -- Xe máy 110cc, Cả ngày (150,000 VND)
-- Booking 8 (Homestay 4): Tour + BBQ
(8, 16, 1), -- Tour khám phá thiên nhiên, Nửa ngày (250,000 VND)
(8, 34, 1), -- BBQ ngoài trời, Tiêu chuẩn (200,000 VND)
-- Booking 9 (Homestay 5, Phong Nha Village): Breakfast
(9, 5, 1), -- Bữa sáng chay, Tiêu chuẩn (45,000 VND)
-- Booking 10 (Homestay 5): Breakfast
(10, 1, 3), -- Bữa sáng Việt Nam, Tiêu chuẩn (45,000 VND * 3 = 135,000 VND)
-- Booking 11 (Homestay 6, Con Dao Ocean): Motorbike
(11, 8, 1), -- Xe máy 150cc, Nửa ngày (100,000 VND)
-- Booking 12 (Homestay 6): Breakfast
(12, 4, 4), -- Bữa sáng kiểu Âu, Cao cấp (90,000 VND * 4 = 360,000 VND)
-- Booking 13 (Homestay 7, Vung Tau Coastal): BBQ
(13, 36, 1), -- BBQ trong nhà, Tiêu chuẩn (180,000 VND)
-- Booking 14 (Homestay 7): Breakfast
(14, 2, 2), -- Bữa sáng Việt Nam, Cao cấp (80,000 VND * 2 = 160,000 VND)
-- Booking 15 (Homestay 8, Mui Ne Sandy): Breakfast
(15, 1, 4), -- Bữa sáng Việt Nam, Tiêu chuẩn (45,000 VND * 4 = 180,000 VND)
-- Booking 16 (Homestay 8): Tour
(16, 19, 1), -- Tour ẩm thực, Cả ngày (300,000 VND)
-- Booking 17 (Homestay 9, Ha Giang Loop): Motorbike
(17, 9, 1), -- Xe máy 150cc, Cả ngày (180,000 VND)
-- Booking 18 (Homestay 9): Tour
(18, 14, 1), -- Tour khám phá văn hóa, Nửa ngày (200,000 VND)
-- Booking 19 (Homestay 10, Ba Be Lake): Bicycle
(19, 11, 2), -- Xe đạp địa hình, Cả ngày (90,000 VND * 2 = 180,000 VND)
-- Booking 20 (Homestay 10): Breakfast
(20, 3, 3), -- Bữa sáng kiểu Âu, Tiêu chuẩn (60,000 VND * 3 = 180,000 VND)
-- Booking 21 (Homestay 11, Hanoi Old Quarter): Breakfast
(21, 5, 2), -- Bữa sáng chay, Tiêu chuẩn (45,000 VND * 2 = 90,000 VND)
-- Booking 22 (Homestay 11): Tour
(22, 18, 2), -- Tour ẩm thực, Nửa ngày (180,000 VND * 2 = 360,000 VND)
-- Booking 23 (Homestay 12, Sapa Valley): Bicycle
(23, 12, 2), -- Xe đạp thành phố, Nửa ngày (40,000 VND * 2 = 80,000 VND)
-- Booking 24 (Homestay 12): Breakfast
(24, 1, 1), -- Bữa sáng Việt Nam, Tiêu chuẩn (45,000 VND)
-- Booking 25 (Homestay 13, Ha Long Pearl): Motorbike
(25, 6, 1), -- Xe máy 110cc, Nửa ngày (80,000 VND)
-- Booking 26 (Homestay 13): Tour
(26, 16, 2), -- Tour khám phá thiên nhiên, Nửa ngày (250,000 VND * 2 = 500,000 VND)
-- Booking 27 (Homestay 14, Ninh Binh Lotus): Bicycle
(27, 10, 1), -- Xe đạp địa hình, Nửa ngày (50,000 VND)
-- Booking 28 (Homestay 14): Breakfast
(28, 3, 2), -- Bữa sáng kiểu Âu, Tiêu chuẩn (60,000 VND * 2 = 120,000 VND)
-- Booking 29 (Homestay 15, Hue Heritage): Bicycle
(29, 12, 2), -- Xe đạp thành phố, Nửa ngày (40,000 VND * 2 = 80,000 VND)
-- Booking 30 (Homestay 15): Breakfast
(30, 5, 2), -- Bữa sáng chay, Tiêu chuẩn (45,000 VND * 2 = 90,000 VND)
-- Booking 31 (Homestay 16, Da Nang Skyline): Motorbike
(31, 7, 1), -- Xe máy 110cc, Cả ngày (150,000 VND)
-- Booking 32 (Homestay 16): Breakfast
(32, 1, 3), -- Bữa sáng Việt Nam, Tiêu chuẩn (45,000 VND * 3 = 135,000 VND)
-- Booking 33 (Homestay 17, Hoi An Riverside): Bicycle
(33, 11, 2), -- Xe đạp địa hình, Cả ngày (90,000 VND * 2 = 180,000 VND)
-- Booking 34 (Homestay 17): Tour
(34, 18, 2), -- Tour ẩm thực, Nửa ngày (180,000 VND * 2 = 360,000 VND)
-- Booking 35 (Homestay 18, Nha Trang Seaside): Motorbike
(35, 8, 1), -- Xe máy 150cc, Nửa ngày (100,000 VND)
-- Booking 36 (Homestay 18): Breakfast
(36, 3, 1), -- Bữa sáng kiểu Âu, Tiêu chuẩn (60,000 VND)
-- Booking 37 (Homestay 19, Da Lat Flower): Bicycle
(37, 12, 2), -- Xe đạp thành phố, Nửa ngày (40,000 VND * 2 = 80,000 VND)
-- Booking 38 (Homestay 19): BBQ
(38, 34, 1), -- BBQ ngoài trời, Tiêu chuẩn (200,000 VND)
-- Booking 39 (Homestay 20, Saigon Central): Breakfast
(39, 5, 2), -- Bữa sáng chay, Tiêu chuẩn (45,000 VND * 2 = 90,000 VND)
-- Booking 40 (Homestay 20): Tour
(40, 14, 1), -- Tour khám phá văn hóa, Nửa ngày (200,000 VND)
-- Booking 41 (Homestay 21, Phu Quoc Paradise): Motorbike
(41, 6, 1), -- Xe máy 110cc, Nửa ngày (80,000 VND)
-- Booking 42 (Homestay 21): Breakfast
(42, 1, 2), -- Bữa sáng Việt Nam, Tiêu chuẩn (45,000 VND * 2 = 90,000 VND)
-- Booking 43 (Homestay 22, Can Tho Garden): Bicycle
(43, 10, 1), -- Xe đạp địa hình, Nửa ngày (50,000 VND)
-- Booking 44 (Homestay 22): Tour
(44, 18, 2), -- Tour ẩm thực, Nửa ngày (180,000 VND * 2 = 360,000 VND)
-- Booking 45 (Homestay 23, Mai Chau Valley): Bicycle
(45, 12, 2), -- Xe đạp thành phố, Nửa ngày (40,000 VND * 2 = 80,000 VND)
-- Booking 46 (Homestay 23): Breakfast
(46, 3, 1), -- Bữa sáng kiểu Âu, Tiêu chuẩn (60,000 VND)
-- Booking 47 (Homestay 24, Cat Ba Green): Motorbike
(47, 7, 1), -- Xe máy 110cc, Cả ngày (150,000 VND)
-- Booking 48 (Homestay 24): BBQ
(48, 36, 1), -- BBQ trong nhà, Tiêu chuẩn (180,000 VND)
-- Booking 49 (Homestay 25, Phong Nha Lake): Motorbike
(49, 8, 1), -- Xe máy 150cc, Nửa ngày (100,000 VND)
-- Booking 50 (Homestay 25): Breakfast
(50, 5, 2); -- Bữa sáng chay, Tiêu chuẩn (45,000 VND * 2 = 90,000 VND)
GO

-- bảng payments: quản lý thanh toán
create table Payments (
    payment_id int primary key identity(1,1),
    booking_id int  null,
    amount decimal(10,2)   null CHECK (amount >= 0),
    payment_method varchar(50) check (payment_method in('VNPay','PayOS')),
    payment_date datetime default getdate(),
    status varchar(20)  null check (status in ('pending', 'completed', 'failed')),
    foreign key (booking_id) references Bookings(booking_id)
)
go
INSERT INTO Payments (booking_id, amount, payment_method, status, payment_date)
VALUES

-- Booking 1: Full payment
(1, 1545000.00, 'VNPay', 'completed', '2025-05-31 23:00:00'),
-- Booking 2: Partial payment
(2, 540000.00, 'PayOS', 'pending', '2025-05-30 22:00:00'),
-- Booking 3: Full payment
(3, 1540000.00, 'VNPay', 'completed', '2025-05-29 20:00:00'),
-- Booking 4: Full payment
(4, 1000000.00, 'PayOS', 'completed', '2025-05-31 22:30:00'),
-- Booking 5: Two payments
(5, 1000000.00, 'VNPay', 'completed', '2025-05-31 21:00:00'),
(5, 540000.00, 'PayOS', 'pending', '2025-05-31 22:00:00'),
-- Booking 6: Full payment
(6, 2180000.00, 'VNPay', 'completed', '2025-05-30 23:00:00'),
-- Booking 7: Failed payment
(7, 1080000.00, 'PayOS', 'failed', '2025-05-28 18:00:00'),
-- Booking 8: Full payment
(8, 1680000.00, 'VNPay', 'completed', '2025-05-31 22:00:00'),
-- Booking 9: Full payment
(9, 1000000.00, 'PayOS', 'completed', '2025-05-30 19:00:00'),
-- Booking 10: Partial payment
(10, 522500.00, 'VNPay', 'pending', '2025-05-31 21:30:00'),
-- Booking 11: Full payment
(11, 1580000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 12: Full payment
(12, 1500000.00, 'VNPay', 'completed', '2025-05-30 20:00:00'),
-- Booking 13: Full payment
(13, 1180000.00, 'PayOS', 'completed', '2025-05-31 23:00:00'),
-- Booking 14: Failed payment
(14, 1000000.00, 'VNPay', 'failed', '2025-05-29 17:00:00'),
-- Booking 15: Full payment
(15, 1545000.00, 'PayOS', 'completed', '2025-05-31 22:30:00'),
-- Booking 16: Full payment
(16, 1680000.00, 'VNPay', 'completed', '2025-05-30 21:00:00'),
-- Booking 17: Full payment
(17, 1080000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 18: Full payment
(18, 1000000.00, 'VNPay', 'completed', '2025-05-30 19:00:00'),
-- Booking 19: Full payment
(19, 1540000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 20: Partial payment
(20, 500000.00, 'VNPay', 'pending', '2025-05-31 21:00:00'),
-- Booking 21: Full payment
(21, 1200000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 22: Full payment
(22, 1980000.00, 'VNPay', 'completed', '2025-05-30 20:00:00'),
-- Booking 23: Full payment
(23, 1840000.00, 'PayOS', 'completed', '2025-05-31 23:00:00'),
-- Booking 24: Full payment
(24, 1200000.00, 'VNPay', 'completed', '2025-05-30 18:00:00'),
-- Booking 25: Full payment
(25, 1880000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 26: Two payments
(26, 1500000.00, 'VNPay', 'completed', '2025-05-31 21:00:00'),
(26, 1080000.00, 'PayOS', 'pending', '2025-05-31 22:00:00'),
-- Booking 27: Full payment
(27, 1240000.00, 'PayOS', 'completed', '2025-05-31 22:30:00'),
-- Booking 28: Failed payment
(28, 1800000.00, 'VNPay', 'failed', '2025-05-30 17:00:00'),
-- Booking 29: Full payment
(29, 1840000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 30: Full payment
(30, 1200000.00, 'VNPay', 'completed', '2025-05-31 21:00:00'),
-- Booking 31: Full payment
(31, 1880000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 32: Full payment
(32, 1245000.00, 'VNPay', 'completed', '2025-05-30 20:00:00'),
-- Booking 33: Full payment
(33, 1840000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 34: Full payment
(34, 1980000.00, 'VNPay', 'completed', '2025-05-31 21:30:00'),
-- Booking 35: Full payment
(35, 1880000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 36: Full payment
(36, 1200000.00, 'VNPay', 'completed', '2025-05-30 19:00:00'),
-- Booking 37: Full payment
(37, 1840000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 38: Full payment
(38, 1380000.00, 'VNPay', 'completed', '2025-05-31 21:00:00'),
-- Booking 39: Full payment
(39, 1200000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 40: Full payment
(40, 1800000.00, 'VNPay', 'completed', '2025-05-30 20:00:00'),
-- Booking 41: Full payment
(41, 1010000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 42: Full payment
(42, 1395000.00, 'VNPay', 'completed', '2025-05-31 21:30:00'),
-- Booking 43: Full payment
(43, 940000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 44: Full payment
(44, 1530000.00, 'VNPay', 'completed', '2025-05-30 20:00:00'),
-- Booking 45: Full payment
(45, 940000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 46: Full payment
(46, 900000.00, 'VNPay', 'completed', '2025-05-30 19:00:00'),
-- Booking 47: Full payment
(47, 1130000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 48: Full payment
(48, 1530000.00, 'VNPay', 'completed', '2025-05-31 21:00:00'),
-- Booking 49: Full payment
(49, 1010000.00, 'PayOS', 'completed', '2025-05-31 22:00:00'),
-- Booking 50: Partial payment
(50, 450000.00, 'VNPay', 'pending', '2025-05-30 20:00:00');
GO

-- bảng notifications: quản lý thông báo
create table Notifications (
    notification_id int primary key identity(1,1),
    user_id int  null,
    message nvarchar(1000)  null,
    type varchar(50)  null,
    created_at datetime default getdate(),
    status bit default 0, 
    foreign key (user_id) references Users(user_id)
)
go
INSERT INTO Notifications (user_id, message, type, status, created_at)
VALUES

-- Booking-related notifications
(1, N'Đặt chỗ tại Phu Quoc Sunset Homestay đã được xác nhận.', 'booking-confirmation', 0, '2025-05-31 23:00:00'),
(2, N'Đặt chỗ tại Phu Quoc Sunset Homestay đang chờ xử lý.', 'booking-confirmation', 0, '2025-05-30 22:00:00'),
(3, N'Đặt chỗ tại Can Tho Riverside Homestay đã hoàn tất.', 'booking-confirmation', 1, '2025-05-29 20:00:00'),
(4, N'Đặt chỗ tại Can Tho Riverside Homestay đã được xác nhận.', 'booking-confirmation', 0, '2025-05-31 22:30:00'),
(5, N'Đặt chỗ tại Mai Chau Eco Homestay đã được xác nhận.', 'booking-confirmation', 0, '2025-05-31 21:00:00'),
-- Payment-related notifications
(1, N'Thanh toán 1,545,000 VND cho đặt chỗ #1 thành công.', 'payment-success', 0, '2025-05-31 23:05:00'),
(2, N'Thanh toán 540,000 VND cho đặt chỗ #2 đang chờ xử lý.', 'payment-pending', 0, '2025-05-30 22:05:00'),
(7, N'Thanh toán cho đặt chỗ #7 thất bại. Vui lòng thử lại.', 'payment-failed', 0, '2025-05-28 18:05:00'),
(9, N'Thanh toán 1,000,000 VND cho đặt chỗ #9 thành công.', 'payment-success', 1, '2025-05-30 19:05:00'),
(14, N'Thanh toán cho đặt chỗ #14 thất bại. Vui lòng thử lại.', 'payment-failed', 0, '2025-05-29 17:05:00'),
-- General notifications
(1, N'Ưu đãi mùa hè: Giảm 10% cho đặt chỗ trong tháng 6!', 'general', 0, '2025-05-31 10:00:00'),
(3, N'Cập nhật chính sách: Vui lòng kiểm tra quy định mới.', 'general', 0, '2025-05-30 09:00:00'),
(5, N'Ưu đãi mùa hè: Giảm 10% cho đặt chỗ trong tháng 6!', 'general', 0, '2025-05-31 10:00:00'),
-- Additional notifications for other bookings
(6, N'Đặt chỗ tại Mai Chau Eco Homestay đang chờ xử lý.', 'booking-confirmation', 0, '2025-05-30 23:00:00'),
(7, N'Đặt chỗ tại Cat Ba Island Homestay đã bị hủy.', 'booking-confirmation', 0, '2025-05-28 18:00:00'),
(8, N'Đặt chỗ tại Cat Ba Island Homestay đã được xác nhận.', 'booking-confirmation', 0, '2025-05-31 22:00:00'),
(9, N'Đặt chỗ tại Phong Nha Village Homestay đã hoàn tất.', 'booking-confirmation', 1, '2025-05-30 19:00:00'),
(10, N'Đặt chỗ tại Phong Nha Village Homestay đang chờ xử lý.', 'booking-confirmation', 0, '2025-05-31 21:30:00'),
(11, N'Thanh toán 1,580,000 VND cho đặt chỗ #11 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(12, N'Thanh toán 1,500,000 VND cho đặt chỗ #12 thành công.', 'payment-success', 0, '2025-05-30 20:05:00'),
(13, N'Thanh toán 1,180,000 VND cho đặt chỗ #13 thành công.', 'payment-success', 0, '2025-05-31 23:05:00'),
(15, N'Thanh toán 1,545,000 VND cho đặt chỗ #15 thành công.', 'payment-success', 0, '2025-05-31 22:35:00'),
(16, N'Thanh toán 1,680,000 VND cho đặt chỗ #16 thành công.', 'payment-success', 0, '2025-05-30 21:05:00'),
(17, N'Thanh toán 1,080,000 VND cho đặt chỗ #17 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(18, N'Thanh toán 1,000,000 VND cho đặt chỗ #18 thành công.', 'payment-success', 1, '2025-05-30 19:05:00'),
(19, N'Thanh toán 1,540,000 VND cho đặt chỗ #19 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(20, N'Thanh toán 500,000 VND cho đặt chỗ #20 đang chờ xử lý.', 'payment-pending', 0, '2025-05-31 21:05:00'),
(21, N'Thanh toán 1,200,000 VND cho đặt chỗ #21 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(22, N'Thanh toán 1,980,000 VND cho đặt chỗ #22 thành công.', 'payment-success', 0, '2025-05-30 20:05:00'),
(23, N'Thanh toán 1,840,000 VND cho đặt chỗ #23 thành công.', 'payment-success', 0, '2025-05-31 23:05:00'),
(24, N'Thanh toán 1,200,000 VND cho đặt chỗ #24 thành công.', 'payment-success', 1, '2025-05-30 18:05:00'),
(25, N'Thanh toán 1,880,000 VND cho đặt chỗ #25 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(26, N'Thanh toán 1,500,000 VND cho đặt chỗ #26 thành công.', 'payment-success', 0, '2025-05-31 21:05:00'),
(27, N'Thanh toán 1,240,000 VND cho đặt chỗ #27 thành công.', 'payment-success', 0, '2025-05-31 22:35:00'),
(28, N'Thanh toán cho đặt chỗ #28 thất bại. Vui lòng thử lại.', 'payment-failed', 0, '2025-05-30 17:05:00'),
(29, N'Thanh toán 1,840,000 VND cho đặt chỗ #29 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(30, N'Thanh toán 1,200,000 VND cho đặt chỗ #30 thành công.', 'payment-success', 0, '2025-05-31 21:05:00'),
(31, N'Thanh toán 1,880,000 VND cho đặt chỗ #31 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(32, N'Thanh toán 1,245,000 VND cho đặt chỗ #32 thành công.', 'payment-success', 0, '2025-05-30 20:05:00'),
(33, N'Thanh toán 1,840,000 VND cho đặt chỗ #33 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(34, N'Thanh toán 1,980,000 VND cho đặt chỗ #34 thành công.', 'payment-success', 0, '2025-05-31 21:35:00'),
(35, N'Thanh toán 1,880,000 VND cho đặt chỗ #35 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(36, N'Thanh toán 1,200,000 VND cho đặt chỗ #36 thành công.', 'payment-success', 1, '2025-05-30 19:05:00'),
(37, N'Thanh toán 1,840,000 VND cho đặt chỗ #37 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(38, N'Thanh toán 1,380,000 VND cho đặt chỗ #38 thành công.', 'payment-success', 0, '2025-05-31 21:05:00'),
(39, N'Thanh toán 1,200,000 VND cho đặt chỗ #39 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(40, N'Thanh toán 1,800,000 VND cho đặt chỗ #40 thành công.', 'payment-success', 0, '2025-05-30 20:05:00'),
(41, N'Thanh toán 1,010,000 VND cho đặt chỗ #41 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(42, N'Thanh toán 1,395,000 VND cho đặt chỗ #42 thành công.', 'payment-success', 0, '2025-05-31 21:35:00'),
(43, N'Thanh toán 940,000 VND cho đặt chỗ #43 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(44, N'Thanh toán 1,530,000 VND cho đặt chỗ #44 thành công.', 'payment-success', 0, '2025-05-30 20:05:00'),
(45, N'Thanh toán 940,000 VND cho đặt chỗ #45 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(46, N'Thanh toán 900,000 VND cho đặt chỗ #46 thành công.', 'payment-success', 1, '2025-05-30 19:05:00'),
(47, N'Thanh toán 1,130,000 VND cho đặt chỗ #47 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(48, N'Thanh toán 1,530,000 VND cho đặt chỗ #48 thành công.', 'payment-success', 0, '2025-05-31 21:05:00'),
(49, N'Thanh toán 1,010,000 VND cho đặt chỗ #49 thành công.', 'payment-success', 0, '2025-05-31 22:05:00'),
(50, N'Thanh toán 450,000 VND cho đặt chỗ #50 đang chờ xử lý.', 'payment-pending', 0, '2025-05-30 20:05:00');
GO


-- bảng revenue: doanh thu của  homestay
create table Revenue (
    revenue_id int primary key identity(1,1),
    homestay_id int null, --Thay vì doanh thu của chủ thì nên lấy của homestay
    period_type varchar(10)  null check (period_type in ('weekly', 'monthly', 'yearly')),
    year int  null,
    month int null check (month between 1 and 12 or month is null),
    week int null check (week between 1 and 53 or week is null),
    total_revenue decimal(15,2)  null check (total_revenue >= 0),
    created_at datetime default getdate(),
    foreign key (homestay_id) references Homestays(homestay_id),
    constraint check_Period_Consistency check (
        (period_type = 'yearly' and month is not null and week is null) or
        (period_type = 'monthly' and month is not null and week is null) or
        (period_type = 'weekly' and month is not null and week is not null)
    )
)
go

INSERT INTO Revenue (homestay_id, period_type, year, month, week, total_revenue, created_at)
VALUES

-- Homestay 1: June 2025
(1, 'monthly', 2025, 6, NULL, 3085000.00, '2025-05-31 23:00:00'), -- Bookings 1
-- Homestay 2: June 2025
(2, 'monthly', 2025, 6, NULL, 2540000.00, '2025-05-31 23:00:00'), -- Bookings 3, 4
-- Homestay 3: June 2025
(3, 'monthly', 2025, 6, NULL, 1540000.00, '2025-05-31 23:00:00'), -- Booking 5
-- Homestay 4: July 2025
(4, 'monthly', 2025, 7, NULL, 1680000.00, '2025-05-31 23:00:00'), -- Booking 8
-- Homestay 5: June 2025
(5, 'monthly', 2025, 6, NULL, 1000000.00, '2025-05-31 23:00:00'), -- Booking 9
-- Homestay 6: June 2025
(6, 'monthly', 2025, 6, NULL, 3080000.00, '2025-05-31 23:00:00'), -- Bookings 11, 12
-- Homestay 7: July 2025
(7, 'monthly', 2025, 7, NULL, 1180000.00, '2025-05-31 23:00:00'), -- Booking 13
-- Homestay 8: June 2025
(8, 'monthly', 2025, 6, NULL, 1545000.00, '2025-05-31 23:00:00'), -- Booking 15
-- Homestay 9: July 2025
(9, 'monthly', 2025, 7, NULL, 1080000.00, '2025-05-31 23:00:00'), -- Booking 17
-- Homestay 10: June 2025
(10, 'monthly', 2025, 6, NULL, 1540000.00, '2025-05-31 23:00:00'), -- Booking 19
-- Homestay 11: June 2025
(11, 'monthly', 2025, 6, NULL, 1200000.00, '2025-05-31 23:00:00'), -- Booking 21
-- Homestay 12: August 2025
(12, 'monthly', 2025, 8, NULL, 1840000.00, '2025-05-31 23:00:00'), -- Booking 23
-- Homestay 13: June 2025
(13, 'monthly', 2025, 6, NULL, 1880000.00, '2025-05-31 23:00:00'), -- Booking 25
-- Homestay 14: July 2025
(14, 'monthly', 2025, 7, NULL, 1240000.00, '2025-05-31 23:00:00'), -- Booking 27
-- Homestay 15: June 2025
(15, 'monthly', 2025, 6, NULL, 1840000.00, '2025-05-31 23:00:00'), -- Booking 29
-- Homestay 16: June 2025
(16, 'monthly', 2025, 6, NULL, 1880000.00, '2025-05-31 23:00:00'), -- Booking 31
-- Homestay 17: June 2025
(17, 'monthly', 2025, 6, NULL, 1840000.00, '2025-05-31 23:00:00'), -- Booking 33
-- Homestay 18: July 2025
(18, 'monthly', 2025, 7, NULL, 1880000.00, '2025-05-31 23:00:00'), -- Booking 35
-- Homestay 19: June 2025
(19, 'monthly', 2025, 6, NULL, 1840000.00, '2025-05-31 23:00:00'), -- Booking 37
-- Homestay 20: June 2025
(20, 'monthly', 2025, 6, NULL, 1200000.00, '2025-05-31 23:00:00'), -- Booking 39
-- Homestay 21: June 2025
(21, 'monthly', 2025, 6, NULL, 2405000.00, '2025-05-31 23:00:00'), -- Bookings 41, 42
-- Homestay 22: June 2025
(22, 'monthly', 2025, 6, NULL, 940000.00, '2025-05-31 23:00:00'), -- Booking 43
-- Homestay 23: July 2025
(23, 'monthly', 2025, 7, NULL, 940000.00, '2025-05-31 23:00:00'), -- Booking 45
-- Homestay 24: June 2025
(24, 'monthly', 2025, 6, NULL, 1130000.00, '2025-05-31 23:00:00'), -- Booking 47
-- Homestay 25: June 2025
(25, 'monthly', 2025, 6, NULL, 1010000.00, '2025-05-31 23:00:00'); -- Booking 49
GO




create table RevenueAdmin(
    revenueAdmin_id INT IDENTITY(1,1) PRIMARY KEY,
    revenue_id INT FOREIGN KEY REFERENCES Revenue(revenue_id),
	profitPercentage decimal (4,2), --Hoa hồng page ăn được trên từng revenue_id và homestay_id
	revenue decimal (15,2) null
--Cần chỉnh sửa thêm
)
go
INSERT INTO RevenueAdmin (revenue_id, profitPercentage, revenue)
VALUES

(1, 10.00, 308500.00), -- 10% of 3,085,000
(2, 8.00, 203200.00), -- 8% of 2,540,000
(3, 12.00, 184800.00), -- 12% of 1,540,000
(4, 10.00, 168000.00), -- 10% of 1,680,000
(5, 15.00, 150000.00), -- 15% of 1,000,000
(6, 10.00, 308000.00), -- 10% of 3,080,000
(7, 8.00, 94400.00), -- 8% of 1,180,000
(8, 12.00, 185400.00), -- 12% of 1,545,000
(9, 10.00, 108000.00), -- 10% of 1,080,000
(10, 8.00, 123200.00), -- 8% of 1,540,000
(11, 15.00, 180000.00), -- 15% of 1,200,000
(12, 10.00, 184000.00), -- 10% of 1,840,000
(13, 12.00, 225600.00), -- 12% of 1,880,000
(14, 8.00, 99200.00), -- 8% of 1,240,000
(15, 10.00, 184000.00), -- 10% of 1,840,000
(16, 12.00, 225600.00), -- 12% of 1,880,000
(17, 10.00, 184000.00), -- 10% of 1,840,000
(18, 8.00, 150400.00), -- 8% of 1,880,000
(19, 15.00, 276000.00), -- 15% of 1,840,000
(20, 10.00, 120000.00), -- 10% of 1,200,000
(21, 12.00, 288600.00), -- 12% of 2,405,000
(22, 8.00, 75200.00), -- 8% of 940,000
(23, 10.00, 94000.00), -- 10% of 940,000
(24, 12.00, 135600.00), -- 12% of 1,130,000
(25, 10.00, 101000.00); -- 10% of 1,010,000
GO



go
-- bảng reviews: quản lý đánh giá và nhận xét
create table Reviews (
    review_id int primary key identity(1,1),
    user_id int  null,
    rating int  null check (rating between 1 and 5),
    comment nvarchar(1000),
    created_at datetime default getdate(),
    foreign key (user_id)  references Users(user_id),  
);
go
INSERT INTO Reviews (user_id, rating, comment, created_at)
VALUES

(1, 5, N'Phu Quoc Sunset Homestay thật tuyệt vời, nhân viên thân thiện!', '2025-06-04 10:00:00'),
(3, 4, N'Can Tho Riverside có view đẹp, nhưng phòng hơi nhỏ.', '2025-06-18 09:00:00'),
(5, 5, N'Mai Chau Eco Homestay rất yên bình, đồ ăn ngon!', '2025-06-23 11:00:00'),
(8, 4, N'Cat Ba Island Homestay gần biển, dịch vụ tốt.', '2025-07-07 08:00:00'),
(9, 3, N'Phong Nha Village Homestay ổn, nhưng WiFi hơi yếu.', '2025-06-12 10:00:00'),
(11, 5, N'Con Dao Ocean Homestay có không gian tuyệt đẹp!', '2025-06-28 09:00:00'),
(13, 4, N'Vung Tau Coastal Homestay sạch sẽ, nhân viên nhiệt tình.', '2025-07-17 11:00:00'),
(15, 5, N'Mui Ne Sandy Homestay rất thoải mái, sẽ quay lại!', '2025-06-08 08:00:00'),
(17, 4, N'Ha Giang Loop Homestay có tour rất thú vị.', '2025-07-04 10:00:00'),
(19, 5, N'Ba Be Lake Homestay yên tĩnh, cảnh đẹp.', '2025-06-18 09:00:00'),
(21, 4, N'Hanoi Old Quarter Homestay vị trí trung tâm, tiện lợi.', '2025-06-03 11:00:00'),
(23, 5, N'Sapa Valley Homestay có không khí mát mẻ, dịch vụ tốt.', '2025-08-04 08:00:00'),
(25, 4, N'Ha Long Pearl Homestay gần vịnh, rất đẹp.', '2025-06-23 10:00:00'),
(27, 3, N'Ninh Binh Lotus Homestay ổn, nhưng cần cải thiện dịch vụ.', '2025-07-07 09:00:00'),
(29, 5, N'Hue Heritage Homestay rất truyền thống, tuyệt vời!', '2025-06-13 11:00:00'),
(31, 4, N'Da Nang Skyline Homestay hiện đại, sạch sẽ.', '2025-06-28 08:00:00'),
(33, 5, N'Hoi An Riverside Homestay có view sông đẹp, nhân viên tốt.', '2025-06-08 10:00:00'),
(35, 4, N'Nha Trang Seaside Homestay gần biển, thoải mái.', '2025-07-04 09:00:00'),
(37, 5, N'Da Lat Flower Homestay rất thơ mộng, dịch vụ tuyệt vời!', '2025-06-18 11:00:00'),
(39, 4, N'Saigon Central Homestay vị trí tốt, nhưng hơi ồn.', '2025-06-03 08:00:00'),
(41, 5, N'Phu Quoc Paradise Homestay có bãi biển đẹp, rất thư giãn.', '2025-06-23 10:00:00'),
(43, 4, N'Can Tho Garden Homestay yên bình, dịch vụ tốt.', '2025-06-12 09:00:00'),
(45, 5, N'Mai Chau Valley Homestay rất tuyệt, cảnh đẹp.', '2025-07-07 11:00:00'),
(47, 4, N'Cat Ba Green Homestay gần thiên nhiên, thoải mái.', '2025-06-28 08:00:00'),
(49, 5, N'Phong Nha Lake Homestay có không gian đẹp, nhân viên thân thiện.', '2025-06-08 10:00:00');
GO
-- thay bảng review homestays thành review từng room
CREATE TABLE ReviewRoom (
    reviewRoom_id INT PRIMARY KEY IDENTITY(1,1),
    review_id INT,
    homestay_id INT,
    room_number VARCHAR(10),
    rating INT NULL CHECK (rating BETWEEN 1 AND 5),
    comment NVARCHAR(MAX),
    FOREIGN KEY (review_id) REFERENCES Reviews(review_id),
    FOREIGN KEY (homestay_id, room_number) REFERENCES Rooms(homestay_id, room_number)
)
GO
INSERT INTO ReviewRoom (review_id, homestay_id, room_number, rating, comment)
VALUES


-- Review 1 (Booking 1, Homestay 1, Room 101)
(1, 1, 'R01', 5, N'Phòng 101 tại Phu Quoc Sunset Homestay rất sạch sẽ, view biển đẹp, giường thoải mái!'),
-- Review 2 (Booking 3, Homestay 2, Room 101)
(2, 2, 'R01', 4, N'Phòng 101 tại Can Tho Riverside có view sông tuyệt, nhưng hơi nhỏ so với kỳ vọng.'),
-- Review 3 (Booking 5, Homestay 3, Room 101)
(3, 3, 'R01', 5, N'Phòng 101 tại Mai Chau Eco Homestay thoáng mát, nội thất mộc mạc, rất dễ chịu!'),
-- Review 4 (Booking 8, Homestay 4, Room 201)
(4, 4, 'R01', 4, N'Phòng 201 tại Cat Ba Island Homestay gần biển, sạch sẽ, nhưng WiFi hơi chập chờn.'),
-- Review 5 (Booking 9, Homestay 5, Room 101)
(5, 5, 'R01', 3, N'Phòng 101 tại Phong Nha Village Homestay ổn, nhưng cần cải thiện tốc độ WiFi.'),
-- Review 6 (Booking 11, Homestay 6, Room 101)
(6, 6, 'R01', 5, N'Phòng 101 tại Con Dao Ocean Homestay rộng rãi, view biển tuyệt đẹp, rất đáng tiền!'),
-- Review 7 (Booking 13, Homestay 7, Room 101)
(7, 7, 'R01', 4, N'Phòng 101 tại Vung Tau Coastal Homestay sạch sẽ, giường êm, nhưng hơi ồn vào ban đêm.'),
-- Review 8 (Booking 15, Homestay 8, Room 101)
(8, 8, 'R01', 5, N'Phòng 101 tại Mui Ne Sandy Homestay thoải mái, không gian ấm cúng, rất thích!'),
-- Review 9 (Booking 17, Homestay 9, Room 101)
(9, 9, 'R01', 4, N'Phòng 101 tại Ha Giang Loop Homestay đơn giản nhưng sạch, view núi đẹp.'),
-- Review 10 (Booking 19, Homestay 10, Room 101)
(10, 10, 'R01', 5, N'Phòng 101 tại Ba Be Lake Homestay yên tĩnh, không gian thoáng, rất thư giãn.'),
-- Review 11 (Booking 21, Homestay 11, Room 101)
(11, 11, 'R01', 4, N'Phòng 101 tại Hanoi Old Quarter Homestay tiện nghi, vị trí trung tâm, nhưng hơi nhỏ.'),
-- Review 12 (Booking 23, Homestay 12, Room 101)
(12, 12, 'R01', 5, N'Phòng 101 tại Sapa Valley Homestay mát mẻ, sạch sẽ, view thung lũng đẹp.'),
-- Review 13 (Booking 25, Homestay 13, Room 101)
(13, 13, 'R01', 4, N'Phòng 101 tại Ha Long Pearl Homestay gần vịnh, không gian thoải mái.'),
-- Review 14 (Booking 27, Homestay 14, Room 101)
(14, 14, 'R01', 3, N'Phòng 101 tại Ninh Binh Lotus Homestay ổn, nhưng nội thất cần nâng cấp.'),
-- Review 15 (Booking 29, Homestay 15, Room 101)
(15, 15, 'R01', 5, N'Phòng 101 tại Hue Heritage Homestay truyền thống, sạch sẽ, rất ấn tượng!'),
-- Review 16 (Booking 31, Homestay 16, Room 101)
(16, 16, 'R01', 4, N'Phòng 101 tại Da Nang Skyline Homestay hiện đại, tiện nghi, rất sạch.'),
-- Review 17 (Booking 33, Homestay 17, Room 101)
(17, 17, 'R01', 5, N'Phòng 101 tại Hoi An Riverside Homestay có view sông đẹp, không gian ấm cúng.'),
-- Review 18 (Booking 35, Homestay 18, Room 101)
(18, 18, 'R01', 4, N'Phòng 101 tại Nha Trang Seaside Homestay gần biển, phòng sạch và thoải mái.'),
-- Review 19 (Booking 37, Homestay 19, Room 101)
(19, 19, 'R01', 5, N'Phòng 101 tại Da Lat Flower Homestay thơ mộng, giường êm, rất thích!'),
-- Review 20 (Booking 39, Homestay 20, Room 101)
(20, 20, 'R01', 4, N'Phòng 101 tại Saigon Central Homestay tiện lợi, nhưng hơi ồn do gần đường lớn.'),
-- Review 21 (Booking 41, Homestay 21, Room 101)
(21, 21, 'R01', 5, N'Phòng 101 tại Phu Quoc Paradise Homestay sạch sẽ, view biển tuyệt, rất thư giãn.'),
-- Review 22 (Booking 43, Homestay 22, Room 101)
(22, 22, 'R01', 4, N'Phòng 101 tại Can Tho Garden Homestay yên bình, sạch sẽ, nhưng hơi xa trung tâm.'),
-- Review 23 (Booking 45, Homestay 23, Room 101)
(23, 23, 'R01', 5, N'Phòng 101 tại Mai Chau Valley Homestay thoáng mát, view đẹp, rất đáng trải nghiệm.'),
-- Review 24 (Booking 47, Homestay 24, Room 101)
(24, 24, 'R01', 4, N'Phòng 101 tại Cat Ba Green Homestay gần thiên nhiên, phòng sạch và thoải mái.'),
-- Review 25 (Booking 49, Homestay 25, Room 101)
(25, 25, 'R01', 5, N'Phòng 101 tại Phong Nha Lake Homestay rộng rãi, view hồ đẹp, nhân viên thân thiện.');
GO
CREATE TABLE ReviewService (
    reviewService_id INT PRIMARY KEY IDENTITY(1,1),
    review_id INT,
    service_id INT,
    rating INT NULL CHECK (rating BETWEEN 1 AND 5),
    comment NVARCHAR(MAX),
    FOREIGN KEY (review_id) REFERENCES Reviews(review_id),
    FOREIGN KEY (service_id) REFERENCES Service(service_id)
)
GO

INSERT INTO ReviewService (review_id, service_id, rating, comment)
VALUES

-- Review 1 (Booking 1, Homestay 1): Breakfast
(1, 1, 5, N'Bữa sáng Việt Nam tại Phu Quoc Sunset Homestay rất ngon, phở tươi và đậm đà!'),
-- Review 2 (Booking 3, Homestay 2): Bicycle
(2, 12, 4, N'Xe đạp thành phố tại Can Tho Riverside dễ dùng, nhưng cần bảo trì bánh xe.'),
-- Review 3 (Booking 5, Homestay 3): Bicycle
(3, 10, 5, N'Xe đạp địa hình tại Mai Chau Eco Homestay rất tốt, đi khám phá thoải mái.'),
-- Review 3 (Booking 5): Tour
(3, 18, 4, N'Tour ẩm thực tại Mai Chau thú vị, nhưng thời gian hơi ngắn.'),
-- Review 4 (Booking 8, Homestay 4): Tour
(4, 16, 4, N'Tour khám phá thiên nhiên tại Cat Ba Island rất đẹp, hướng dẫn viên nhiệt tình.'),
-- Review 4 (Booking 8): BBQ
(4, 34, 5, N'BBQ ngoài trời tại Cat Ba Island ngon, không gian vui vẻ!'),
-- Review 5 (Booking 9, Homestay 5): Breakfast
(5, 5, 3, N'Bữa sáng chay tại Phong Nha Village ổn, nhưng ít lựa chọn món.'),
-- Review 6 (Booking 11, Homestay 6): Motorbike
(6, 8, 5, N'Xe máy 150cc tại Con Dao Ocean Homestay chạy êm, rất tiện để khám phá đảo.'),
-- Review 7 (Booking 13, Homestay 7): BBQ
(7, 36, 4, N'BBQ trong nhà tại Vung Tau Coastal ngon, nhưng cần thêm gia vị đa dạng.'),
-- Review 8 (Booking 15, Homestay 8): Breakfast
(8, 1, 5, N'Bữa sáng Việt Nam tại Mui Ne Sandy Homestay rất tuyệt, đặc biệt là bánh xèo!'),
-- Review 9 (Booking 17, Homestay 9): Motorbike
(9, 9, 4, N'Xe máy 150cc tại Ha Giang Loop Homestay mạnh mẽ, nhưng xăng hơi tốn.'),
-- Review 10 (Booking 19, Homestay 10): Bicycle
(10, 11, 5, N'Xe đạp địa hình tại Ba Be Lake Homestay chất lượng, đi quanh hồ rất thích.'),
-- Review 11 (Booking 21, Homestay 11): Breakfast
(11, 5, 4, N'Bữa sáng chay tại Hanoi Old Quarter Homestay ngon, nhưng phục vụ hơi chậm.'),
-- Review 12 (Booking 23, Homestay 12): Bicycle
(12, 12, 5, N'Xe đạp thành phố tại Sapa Valley Homestay nhẹ, dễ đạp, rất phù hợp để khám phá.'),
-- Review 13 (Booking 25, Homestay 13): Motorbike
(13, 6, 4, N'Xe máy 110cc tại Ha Long Pearl Homestay ổn, nhưng cần kiểm tra phanh kỹ hơn.'),
-- Review 14 (Booking 27, Homestay 14): Bicycle
(14, 10, 3, N'Xe đạp địa hình tại Ninh Binh Lotus Homestay dùng được, nhưng ghế ngồi hơi cứng.'),
-- Review 15 (Booking 29, Homestay 15): Bicycle
(15, 12, 5, N'Xe đạp thành phố tại Hue Heritage Homestay nhẹ nhàng, đi quanh thành phố rất tiện.'),
-- Review 16 (Booking 31, Homestay 16): Motorbike
(16, 7, 4, N'Xe máy 110cc tại Da Nang Skyline Homestay chạy tốt, nhưng cần thêm mũ bảo hiểm mới.'),
-- Review 17 (Booking 33, Homestay 17): Bicycle
(17, 11, 5, N'Xe đạp địa hình tại Hoi An Riverside Homestay rất tốt, đi dạo phố cổ thú vị.'),
-- Review 17 (Booking 33): Tour
(17, 18, 4, N'Tour ẩm thực tại Hoi An Riverside ngon, nhưng nên thêm thời gian trải nghiệm.'),
-- Review 18 (Booking 35, Homestay 18): Motorbike
(18, 8, 4, N'Xe máy 150cc tại Nha Trang Seaside Homestay mạnh, nhưng cần bảo dưỡng thường xuyên.'),
-- Review 19 (Booking 37, Homestay 19): Bicycle
(19, 12, 5, N'Xe đạp thành phố tại Da Lat Flower Homestay dễ dùng, đi ngắm hoa rất thích.'),
-- Review 19 (Booking 37): BBQ
(19, 34, 4, N'BBQ ngoài trời tại Da Lat Flower Homestay vui, nhưng cần thêm món ăn kèm.'),
-- Review 20 (Booking 39, Homestay 20): Breakfast
(20, 5, 4, N'Bữa sáng chay tại Saigon Central Homestay ngon, nhưng cần đa dạng thực đơn.'),
-- Review 21 (Booking 41, Homestay 21): Motorbike
(21, 6, 5, N'Xe máy 110cc tại Phu Quoc Paradise Homestay chạy êm, rất phù hợp để đi biển.'),
-- Review 22 (Booking 43, Homestay 22): Bicycle
(22, 10, 4, N'Xe đạp địa hình tại Can Tho Garden Homestay tốt, nhưng cần thêm đèn cho buổi tối.'),
-- Review 23 (Booking 45, Homestay 23): Bicycle
(23, 12, 5, N'Xe đạp thành phố tại Mai Chau Valley Homestay nhẹ, đi quanh làng rất thoải mái.'),
-- Review 24 (Booking 47, Homestay 24): Motorbike
(24, 7, 4, N'Xe máy 110cc tại Cat Ba Green Homestay ổn, nhưng cần kiểm tra lốp thường xuyên.'),
-- Review 24 (Booking 47): BBQ
(24, 36, 5, N'BBQ trong nhà tại Cat Ba Green Homestay ngon, không gian ấm cúng.'),
-- Review 25 (Booking 49, Homestay 25): Motorbike
(25, 8, 5, N'Xe máy 150cc tại Phong Nha Lake Homestay mạnh mẽ, đi khám phá hang động rất tiện.');
GO
-- bảng cancellationpolicies: quản lý chính sách hủy
create table CancellationPolicies (
    policy_id int primary key identity(1,1),
    homestay_id int  null,
    name varchar(50)  null,
    description nvarchar(1000)  null,
    refund_percentage decimal(5,2)  null check (refund_percentage between 0 and 100),
    days_before_checkin int  null check (days_before_checkin >= 0),
    foreign key (homestay_id) references homestays(homestay_id)
)
go
INSERT INTO CancellationPolicies (homestay_id, name, description, refund_percentage, days_before_checkin)
VALUES

-- Homestay 1: Phu Quoc Sunset Homestay
(1, 'Flexible', N'Hủy miễn phí nếu thông báo trước 7 ngày so với ngày nhận phòng. Hoàn tiền 100%.', 100.00, 7),
(1, 'Moderate', N'Hủy trước 3 ngày được hoàn 50%. Sau 3 ngày không được hoàn tiền.', 50.00, 3),
(1, 'Strict', N'Không hoàn tiền nếu hủy trong vòng 1 ngày trước nhận phòng.', 0.00, 1),
-- Homestay 2: Can Tho Riverside Homestay
(2, 'Flexible', N'Hủy trước 5 ngày được hoàn 100%.', 100.00, 5),
(2, 'Moderate', N'Hủy trước 2 ngày được hoàn 70%.', 70.00, 2),
-- Homestay 3: Mai Chau Eco Homestay
(3, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(3, 'Strict', N'Hủy trong vòng 3 ngày không được hoàn tiền.', 0.00, 3),
-- Homestay 4: Cat Ba Island Homestay
(4, 'Moderate', N'Hủy trước 5 ngày được hoàn 80%. Sau đó hoàn 30%.', 80.00, 5),
(4, 'Strict', N'Hủy trong vòng 1 ngày không hoàn tiền.', 0.00, 1),
-- Homestay 5: Phong Nha Village Homestay
(5, 'Flexible', N'Hủy trước 10 ngày được hoàn 100%.', 100.00, 10),
(5, 'Moderate', N'Hủy trước 3 ngày được hoàn 50%.', 50.00, 3),
-- Homestay 6: Con Dao Ocean Homestay
(6, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(6, 'Strict', N'Hủy trong vòng 2 ngày không được hoàn tiền.', 0.00, 2),
-- Homestay 7: Vung Tau Coastal Homestay
(7, 'Moderate', N'Hủy trước 5 ngày được hoàn 70%.', 70.00, 5),
(7, 'Strict', N'Hủy trong vòng 1 ngày không hoàn tiền.', 0.00, 1),
-- Homestay 8: Mui Ne Sandy Homestay
(8, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(8, 'Moderate', N'Hủy trước 3 ngày được hoàn 60%.', 60.00, 3),
-- Homestay 9: Ha Giang Loop Homestay
(9, 'Flexible', N'Hủy trước 10 ngày được hoàn 100%.', 100.00, 10),
(9, 'Strict', N'Hủy trong vòng 3 ngày không hoàn tiền.', 0.00, 3),
-- Homestay 10: Ba Be Lake Homestay
(10, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(10, 'Moderate', N'Hủy trước 2 ngày được hoàn 50%.', 50.00, 2),
-- Homestay 11: Hanoi Old Quarter Homestay
(11, 'Moderate', N'Hủy trước 5 ngày được hoàn 80%.', 80.00, 5),
(11, 'Strict', N'Hủy trong vòng 1 ngày không hoàn tiền.', 0.00, 1),
-- Homestay 12: Sapa Valley Homestay
(12, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(12, 'Moderate', N'Hủy trước 3 ngày được hoàn 50%.', 50.00, 3),
-- Homestay 13: Ha Long Pearl Homestay
(13, 'Flexible', N'Hủy trước 10 ngày được hoàn 100%.', 100.00, 10),
(13, 'Strict', N'Hủy trong vòng 2 ngày không hoàn tiền.', 0.00, 2),
-- Homestay 14: Ninh Binh Lotus Homestay
(14, 'Moderate', N'Hủy trước 5 ngày được hoàn 70%.', 70.00, 5),
(14, 'Strict', N'Hủy trong vòng', 1, 0.00),
-- Homestay 15: Hue Heritage Homestay
(15, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(15, 'Moderate', N'Hủy trước 3 ngày được hoàn 60%.', 60.00, 3),
-- Homestay 16: Da Nang Skyline Homestay
(16, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(16, 'Strict', N'Hủy trong vòng 1 ngày không hoàn tiền.', 0.00, 1),
-- Homestay 17: Hoi An Riverside Homestay
(17, 'Moderate', N'Hủy trước 5 ngày được hoàn 80%.', 80.00, 5),
(17, 'Strict', N'Hủy trong vòng 2 ngày không hoàn tiền.', 0.00, 2),
-- Homestay 18: Nha Trang Seaside Homestay
(18, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(18, 'Moderate', N'Hủy trước 3 ngày được hoàn 50%.', 50.00, 3),
-- Homestay 19: Da Lat Flower Homestay
(19, 'Flexible', N'Hủy trước 10 ngày được hoàn 100%.', 100.00, 10),
(19, 'Strict', N'Hủy trong vòng 3 ngày không hoàn tiền.', 0.00, 3),
-- Homestay 20: Saigon Central Homestay
(20, 'Moderate', N'Hủy trước 5 ngày được hoàn 70%.', 70.00, 5),
(20, 'Strict', N'Hủy trong vòng 1 ngày không hoàn tiền.', 0.00, 1),
-- Homestay 21: Phu Quoc Paradise Homestay
(21, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(21, 'Moderate', N'Hủy trước 3 ngày được hoàn 60%.', 60.00, 3),
-- Homestay 22: Can Tho Garden Homestay
(22, 'Flexible', N'Hủy trước 5 ngày được hoàn 100%.', 100.00, 5),
(22, 'Moderate', N'Hủy trước 2 ngày được hoàn 50%.', 50.00, 2),
-- Homestay 23: Mai Chau Valley Homestay
(23, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(23, 'Strict', N'Hủy trong vòng 3 ngày không hoàn tiền.', 0.00, 3),
-- Homestay 24: Cat Ba Green Homestay
(24, 'Moderate', N'Hủy trước 5 ngày được hoàn 80%.', 80.00, 5),
(24, 'Strict', N'Hủy trong vòng 1 ngày không hoàn tiền.', 0.00, 1),
-- Homestay 25: Phong Nha Lake Homestay
(25, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(25, 'Moderate', N'Hủy trước 3 ngày được hoàn 50%.', 50.00, 3),
-- Homestay 26: Lang Son Hill Homestay
(26, 'Flexible', N'Hủy trước 10 ngày được hoàn 100%.', 100.00, 10),
(26, 'Strict', N'Hủy trong vòng 3 ngày không hoàn tiền.', 0.00, 3),
-- Homestay 27: Nam Dinh Village Homestay
(27, 'Moderate', N'Hủy trước 5 ngày được hoàn 70%.', 70.00, 5),
(27, 'Strict', N'Hủy trong vòng 1 ngày không hoàn tiền.', 0.00, 1),
-- Homestay 28: Quang Ninh Bay Homestay
(28, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(28, 'Moderate', N'Hủy trước 3 ngày được hoàn 60%.', 60.00, 3),
-- Homestay 29: Thanh Hoa Coast Homestay
(29, 'Flexible', N'Hủy trước 5 ngày được hoàn 100%.', 100.00, 5),
(29, 'Moderate', N'Hủy trước 2 ngày được hoàn 50%.', 50.00, 2),
-- Homestay 30: Nghe An Heritage Homestay
(30, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(30, 'Strict', N'Hủy trong vòng 3 ngày không hoàn tiền.', 0.00, 3),
-- Homestay 31: Ha Tinh Rural Homestay
(31, 'Moderate', N'Hủy trước 5 ngày được hoàn 80%.', 80.00, 5),
(31, 'Strict', N'Hủy trong vòng 1 ngày không hoàn tiền.', 0.00, 1),
-- Homestay 32: Quang Binh Cave Homestay
(32, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(32, 'Moderate', N'Hủy trước 3 ngày được hoàn 50%.', 50.00, 3),
-- Homestay 33: Thua Thien Hue Homestay
(33, 'Flexible', N'Hủy trước 10 ngày được hoàn 100%.', 100.00, 10),
(33, 'Strict', N'Hủy trong vòng 3 ngày không hoàn tiền.', 0.00, 3),
-- Homestay 34: Quang Nam Village Homestay
(34, 'Moderate', N'Hủy trước 5 ngày được hoàn 70%.', 70.00, 5),
(34, 'Strict', N'Hủy trong vòng 1 ngày không hoàn tiền.', 0.00, 1),
-- Homestay 35: Binh Dinh Beach Homestay
(35, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(35, 'Moderate', N'Hủy trước 3 ngày được hoàn 60%.', 60.00, 3),
-- Homestay 36: Phu Yen Cliff Homestay
(36, 'Flexible', N'Hủy trước 5 ngày được hoàn 100%.', 100.00, 5),
(36, 'Moderate', N'Hủy trước 2 ngày được hoàn 50%.', 50.00, 2),
-- Homestay 37: Khanh Hoa Island Homestay
(37, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(37, 'Strict', N'Hủy trong vòng 3 ngày không hoàn tiền.', 0.00, 3),
-- Homestay 38: Ninh Thuan Desert Homestay
(38, 'Moderate', N'Hủy trước 5 ngày được hoàn 80%.', 80.00, 5),
(38, 'Strict', N'Hủy trong vòng 1 ngày không hoàn tiền.', 0.00, 1),
-- Homestay 39: Binh Thuan Dune Homestay
(39, 'Flexible', N'Hủy trước 7 ngày được hoàn 100%.', 100.00, 7),
(39, 'Moderate', N'Hủy trước 3 ngày được hoàn 50%.', 50.00, 3),
-- Homestay 40: Long An Mekong Homestay
(40, 'Flexible', N'Hủy trước 5 ngày được hoàn 100%.', 100.00, 5),
(40, 'Moderate', N'Hủy trước 2 ngày được hoàn 70%.', 70.00, 2);
GO
-- bảng homestayimages: quản lý ảnh của homestay
create table HomestayImages (
    homestayImage_id int primary key identity(1,1),
    homestay_id int  null,
    image_url varchar(255)  null,
    description varchar(100),
    created_at datetime default getdate(),
    foreign key (homestay_id) references homestays(homestay_id)
)
go
INSERT INTO HomestayImages (homestay_id, image_url, description)
VALUES
(1, 'images/image_homestay_0.jpg', 'View hoàng hôn tuyệt đẹp từ Phu Quoc Sunset Homestay'),
(2, 'images/image_homestay_1.jpg', 'Cảnh sông Hậu tại Can Tho Riverside Homestay'),
(3, 'images/image_homestay_2.jpg', 'Thung lũng Mai Châu từ Mai Chau Eco Homestay'),
(4, 'images/image_homestay_3.jpg', 'Vịnh Lan Hạ gần Cat Ba Island Homestay'),
(5, 'images/image_homestay_4.jpg', 'View núi non tại Phong Nha Village Homestay'),
(6, 'images/image_homestay_5.jpg', 'Bãi biển An Hải từ Con Dao Ocean Homestay'),
(7, 'images/image_homestay_6.jpg', 'Bãi Sau Vũng Tàu từ Vung Tau Coastal Homestay'),
(8, 'images/image_homestay_7.jpg', 'Đồi cát bay gần Mui Ne Sandy Homestay'),
(9, 'images/image_homestay_8.jpg', 'Cao nguyên đá từ Ha Giang Loop Homestay'),
(10, 'images/image_homestay_9.jpg', 'Hồ Ba Bể từ Ba Be Lake Homestay'),
(11, 'images/image_homestay_10.jpg', 'Phố cổ Hà Nội từ Hanoi Old Quarter Homestay'),
(12, 'images/image_homestay_11.jpg', 'Ruộng bậc thang Tả Van tại Sapa Valley Homestay'),
(13, 'images/image_homestay_12.jpg', 'Vịnh Hạ Long từ Ha Long Pearl Homestay'),
(14, 'images/image_homestay_13.jpg', 'Cảnh núi non Tràng An từ Ninh Binh Lotus Homestay'),
(15, 'images/image_homestay_14.jpg', 'Phong cách cổ điển tại Hue Heritage Homestay'),
(16, 'images/image_homestay_15.jpg', 'View thành phố từ sân thượng Da Nang Skyline Homestay'),
(17, 'images/image_homestay_16.jpg', 'Sông Thu Bồn từ Hoi An Riverside Homestay'),
(18, 'images/image_homestay_17.jpg', 'Bãi biển Nha Trang từ Nha Trang Seaside Homestay'),
(19, 'images/image_homestay_18.jpg', 'Vườn hoa tại Da Lat Flower Homestay'),
(20, 'images/image_homestay_19.jpg', 'Gần nhà thờ Đức Bà tại Saigon Central Homestay'),
(21, 'images/image_homestay_20.jpg', 'Bãi Sao từ Phu Quoc Paradise Homestay'),
(22, 'images/image_homestay_21.jpg', 'Khu vườn xanh mát tại Can Tho Garden Homestay'),
(23, 'images/image_homestay_22.jpg', 'Bản làng Thái từ Mai Chau Valley Homestay'),
(24, 'images/image_homestay_23.jpg', 'Rừng quốc gia Cát Bà từ Cat Ba Green Homestay'),
(25, 'images/image_homestay_24.jpg', 'Hồ và núi non tại Phong Nha Lake Homestay'),
(26, 'images/image_homestay_25.jpg', 'Bãi Đầm Trầu từ Con Dao Serenity Homestay'),
(27, 'images/image_homestay_26.jpg', 'Bãi Trước từ Vung Tau Horizon Homestay'),
(28, 'images/image_homestay_27.jpg', 'Bãi biển Mũi Né từ Mui Ne Ocean Homestay'),
(29, 'images/image_homestay_28.jpg', 'Thung lũng từ Ha Giang Cloud Homestay'),
(30, 'images/image_homestay_29.jpg', 'Hồ Ba Bể từ Ba Be Eco Homestay'),
(31, 'images/image_homestay_30.jpg', 'Núi rừng Đông Bắc từ Lang Son Mountain Homestay'),
(32, 'images/image_homestay_31.jpg', 'Bãi biển Quy Nhơn từ Quy Nhon Beach Homestay'),
(33, 'images/image_homestay_32.jpg', 'Đồi cát Nam Cương từ Phan Rang Desert Homestay'),
(34, 'images/image_homestay_33.jpg', 'Rừng đước Đất Mũi từ Ca Mau Mangrove Homestay'),
(35, 'images/image_homestay_34.jpg', 'Hồ Hòa Bình từ Hoa Binh Lake Homestay'),
(36, 'images/image_homestay_35.jpg', 'Vườn dừa tại Ben Tre Coconut Homestay'),
(37, 'images/image_homestay_36.jpg', 'Sông Cổ Chiên từ Vinh Long River Homestay'),
(38, 'images/image_homestay_37.jpg', 'Bản Cát Cát từ Lao Cai Highland Homestay'),
(39, 'images/image_homestay_38.jpg', 'Núi Bà Đen từ Tay Ninh Ba Den Homestay'),
(40, 'images/image_homestay_39.jpg', 'Biển Quất Lâm từ Nam Dinh Coastal Homestay');
GO
-- bảng roomimages: quản lý ảnh của phòng
create table RoomImages (
    roomImage_id int primary key identity(1,1),
    room_number varchar(10),
	homestay_id int,
    image_url varchar(255)  null,
    description varchar(100),
    created_at datetime default getdate(),
    foreign key (homestay_id,room_number)  references Rooms(homestay_id,room_number)
)
go
INSERT INTO RoomImages (homestay_id, room_number, image_url, description)
VALUES
-- Homestay 1: Phu Quoc Sunset Homestay
(1, 'R01', 'images/image_400.jpg', 'Phòng Standard với view biển tại Phu Quoc Sunset'),
(1, 'R02', 'images/image_0.jpg', 'Phòng Standard thoáng mát tại Phu Quoc Sunset'),
(1, 'R03', 'images/image_1.jpg', 'Phòng Deluxe sang trọng tại Phu Quoc Sunset'),
(1, 'R04', 'images/image_2.jpg', 'Phòng Deluxe với ban công tại Phu Quoc Sunset'),
(1, 'R05', 'images/image_3.jpg', 'Phòng Family rộng rãi tại Phu Quoc Sunset'),
(1, 'R06', 'images/image_4.jpg', 'Phòng Family tiện nghi tại Phu Quoc Sunset'),
(1, 'R07', 'images/image_5.jpg', 'Phòng Dormitory thoải mái tại Phu Quoc Sunset'),
(1, 'R08', 'images/image_6.jpg', 'Phòng Dormitory tiết kiệm tại Phu Quoc Sunset'),
(1, 'R09', 'images/image_7.jpg', 'Phòng Suite cao cấp tại Phu Quoc Sunset'),
(1, 'R10', 'images/image_8.jpg', 'Phòng Suite view hoàng hôn tại Phu Quoc Sunset'),
-- Homestay 2: Can Tho Riverside Homestay
(2, 'R01', 'images/image_9.jpg', 'Phòng Standard view sông tại Can Tho Riverside'),
(2, 'R02', 'images/image_11.jpg', 'Phòng Standard tiện nghi tại Can Tho Riverside'),
(2, 'R03', 'images/image_12.jpg', 'Phòng Deluxe sang trọng tại Can Tho Riverside'),
(2, 'R04', 'images/image_13.jpg', 'Phòng Deluxe với ban công tại Can Tho Riverside'),
(2, 'R05', 'images/image_14.jpg', 'Phòng Family rộng rãi tại Can Tho Riverside'),
(2, 'R06', 'images/image_15.jpg', 'Phòng Family thoáng mát tại Can Tho Riverside'),
(2, 'R07', 'images/image_16.jpg', 'Phòng Dormitory thoải mái tại Can Tho Riverside'),
(2, 'R08', 'images/image_17.jpg', 'Phòng Dormitory tiết kiệm tại Can Tho Riverside'),
(2, 'R09', 'images/image_18.jpg', 'Phòng Suite cao cấp tại Can Tho Riverside'),
(2, 'R10', 'images/image_19.jpg', 'Phòng Suite view sông Hậu tại Can Tho Riverside'),
-- Homestay 3: Mai Chau Eco Homestay
(3, 'R01', 'images/image_20.jpg', 'Phòng Standard view thung lũng tại Mai Chau Eco'),
(3, 'R02', 'images/image_21.jpg', 'Phòng Standard phong cách Thái tại Mai Chau Eco'),
(3, 'R03', 'images/image_22.jpg', 'Phòng Deluxe tiện nghi tại Mai Chau Eco'),
(3, 'R04', 'images/image_23.jpg', 'Phòng Deluxe view núi tại Mai Chau Eco'),
(3, 'R05', 'images/image_24.jpg', 'Phòng Family rộng rãi tại Mai Chau Eco'),
(3, 'R06', 'images/image_25.jpg', 'Phòng Family truyền thống tại Mai Chau Eco'),
(3, 'R07', 'images/image_26.jpg', 'Phòng Dormitory thoải mái tại Mai Chau Eco'),
(3, 'R08', 'images/image_27.jpg', 'Phòng Dormitory tiết kiệm tại Mai Chau Eco'),
(3, 'R09', 'images/image_28.jpg', 'Phòng Suite cao cấp tại Mai Chau Eco'),
(3, 'R10', 'images/image_29.jpg', 'Phòng Suite view thung lũng tại Mai Chau Eco'),
-- Homestay 4: Cat Ba Island Homestay
(4, 'R01', 'images/image_30.jpg', 'Phòng Standard view vịnh tại Cat Ba Island'),
(4, 'R02', 'images/image_31.jpg', 'Phòng Standard thoáng mát tại Cat Ba Island'),
(4, 'R03', 'images/image_32.jpg', 'Phòng Deluxe sang trọng tại Cat Ba Island'),
(4, 'R04', 'images/image_33.jpg', 'Phòng Deluxe với ban công tại Cat Ba Island'),
(4, 'R05', 'images/image_34.jpg', 'Phòng Family rộng rãi tại Cat Ba Island'),
(4, 'R06', 'images/image_35.jpg', 'Phòng Family tiện nghi tại Cat Ba Island'),
(4, 'R07', 'images/image_36.jpg', 'Phòng Dormitory thoải mái tại Cat Ba Island'),
(4, 'R08', 'images/image_37.jpg', 'Phòng Dormitory tiết kiệm tại Cat Ba Island'),
(4, 'R09', 'images/image_38.jpg', 'Phòng Suite cao cấp tại Cat Ba Island'),
(4, 'R10', 'images/image_39.jpg', 'Phòng Suite view vịnh Lan Hạ tại Cat Ba Island'),
-- Homestay 5: Phong Nha Village Homestay
(5, 'R01', 'images/image_40.jpg', 'Phòng Standard view núi tại Phong Nha Village'),
(5, 'R02', 'images/image_41.jpg', 'Phòng Standard thoáng mát tại Phong Nha Village'),
(5, 'R03', 'images/image_42.jpg', 'Phòng Deluxe sang trọng tại Phong Nha Village'),
(5, 'R04', 'images/image_43.jpg', 'Phòng Deluxe với ban công tại Phong Nha Village'),
(5, 'R05', 'images/image_44.jpg', 'Phòng Family rộng rãi tại Phong Nha Village'),
(5, 'R06', 'images/image_45.jpg', 'Phòng Family tiện nghi tại Phong Nha Village'),
(5, 'R07', 'images/image_46.jpg', 'Phòng Dormitory thoải mái tại Phong Nha Village'),
(5, 'R08', 'images/image_47.jpg', 'Phòng Dormitory tiết kiệm tại Phong Nha Village'),
(5, 'R09', 'images/image_48.jpg', 'Phòng Suite cao cấp tại Phong Nha Village'),
(5, 'R10', 'images/image_49.jpg', 'Phòng Suite view núi tại Phong Nha Village'),
-- Homestay 6: Con Dao Ocean Homestay
(6, 'R01', 'images/image_50.jpg', 'Phòng Standard view biển tại Con Dao Ocean'),
(6, 'R02', 'images/image_51.jpg', 'Phòng Standard thoáng mát tại Con Dao Ocean'),
(6, 'R03', 'images/image_52.jpg', 'Phòng Deluxe sang trọng tại Con Dao Ocean'),
(6, 'R04', 'images/image_53.jpg', 'Phòng Deluxe với ban công tại Con Dao Ocean'),
(6, 'R05', 'images/image_54.jpg', 'Phòng Family rộng rãi tại Con Dao Ocean'),
(6, 'R06', 'images/image_55.jpg', 'Phòng Family tiện nghi tại Con Dao Ocean'),
(6, 'R07', 'images/image_56.jpg', 'Phòng Dormitory thoải mái tại Con Dao Ocean'),
(6, 'R08', 'images/image_57.jpg', 'Phòng Dormitory tiết kiệm tại Con Dao Ocean'),
(6, 'R09', 'images/image_58.jpg', 'Phòng Suite cao cấp tại Con Dao Ocean'),
(6, 'R10', 'images/image_59.jpg', 'Phòng Suite view biển tại Con Dao Ocean'),
-- Homestay 7: Vung Tau Coastal Homestay
(7, 'R01', 'images/image_60.jpg', 'Phòng Standard view biển tại Vung Tau Coastal'),
(7, 'R02', 'images/image_61.jpg', 'Phòng Standard thoáng mát tại Vung Tau Coastal'),
(7, 'R03', 'images/image_62.jpg', 'Phòng Deluxe sang trọng tại Vung Tau Coastal'),
(7, 'R04', 'images/image_63.jpg', 'Phòng Deluxe với ban công tại Vung Tau Coastal'),
(7, 'R05', 'images/image_64.jpg', 'Phòng Family rộng rãi tại Vung Tau Coastal'),
(7, 'R06', 'images/image_65.jpg', 'Phòng Family tiện nghi tại Vung Tau Coastal'),
(7, 'R07', 'images/image_66.jpg', 'Phòng Dormitory thoải mái tại Vung Tau Coastal'),
(7, 'R08', 'images/image_67.jpg', 'Phòng Dormitory tiết kiệm tại Vung Tau Coastal'),
(7, 'R09', 'images/image_68.jpg', 'Phòng Suite cao cấp tại Vung Tau Coastal'),
(7, 'R10', 'images/image_69.jpg', 'Phòng Suite view biển tại Vung Tau Coastal'),
-- Homestay 8: Mui Ne Sandy Homestay
(8, 'R01', 'images/image_70.jpg', 'Phòng Standard view đồi cát tại Mui Ne Sandy'),
(8, 'R02', 'images/image_71.jpg', 'Phòng Standard thoáng mát tại Mui Ne Sandy'),
(8, 'R03', 'images/image_72.jpg', 'Phòng Deluxe sang trọng tại Mui Ne Sandy'),
(8, 'R04', 'images/image_73.jpg', 'Phòng Deluxe với ban công tại Mui Ne Sandy'),
(8, 'R05', 'images/image_74.jpg', 'Phòng Family rộng rãi tại Mui Ne Sandy'),
(8, 'R06', 'images/image_75.jpg', 'Phòng Family tiện nghi tại Mui Ne Sandy'),
(8, 'R07', 'images/image_76.jpg', 'Phòng Dormitory thoải mái tại Mui Ne Sandy'),
(8, 'R08', 'images/image_77.jpg', 'Phòng Dormitory tiết kiệm tại Mui Ne Sandy'),
(8, 'R09', 'images/image_78.jpg', 'Phòng Suite cao cấp tại Mui Ne Sandy'),
(8, 'R10', 'images/image_79.jpg', 'Phòng Suite view biển tại Mui Ne Sandy'),
-- Homestay 9: Ha Giang Loop Homestay
(9, 'R01', 'images/image_80.jpg', 'Phòng Standard view cao nguyên tại Ha Giang Loop'),
(9, 'R02', 'images/image_81.jpg', 'Phòng Standard thoáng mát tại Ha Giang Loop'),
(9, 'R03', 'images/image_82.jpg', 'Phòng Deluxe sang trọng tại Ha Giang Loop'),
(9, 'R04', 'images/image_83.jpg', 'Phòng Deluxe với ban công tại Ha Giang Loop'),
(9, 'R05', 'images/image_84.jpg', 'Phòng Family rộng rãi tại Ha Giang Loop'),
(9, 'R06', 'images/image_85.jpg', 'Phòng Family tiện nghi tại Ha Giang Loop'),
(9, 'R07', 'images/image_86.jpg', 'Phòng Dormitory thoải mái tại Ha Giang Loop'),
(9, 'R08', 'images/image_87.jpg', 'Phòng Dormitory tiết kiệm tại Ha Giang Loop'),
(9, 'R09', 'images/image_88.jpg', 'Phòng Suite cao cấp tại Ha Giang Loop'),
(9, 'R10', 'images/image_89.jpg', 'Phòng Suite view núi tại Ha Giang Loop'),
-- Homestay 10: Ba Be Lake Homestay
(10, 'R01', 'images/image_90.jpg', 'Phòng Standard view hồ tại Ba Be Lake'),
(10, 'R02', 'images/image_91.jpg', 'Phòng Standard thoáng mát tại Ba Be Lake'),
(10, 'R03', 'images/image_92.jpg', 'Phòng Deluxe sang trọng tại Ba Be Lake'),
(10, 'R04', 'images/image_93.jpg', 'Phòng Deluxe với ban công tại Ba Be Lake'),
(10, 'R05', 'images/image_94.jpg', 'Phòng Family rộng rãi tại Ba Be Lake'),
(10, 'R06', 'images/image_95.jpg', 'Phòng Family tiện nghi tại Ba Be Lake'),
(10, 'R07', 'images/image_96.jpg', 'Phòng Dormitory thoải mái tại Ba Be Lake'),
(10, 'R08', 'images/image_97.jpg', 'Phòng Dormitory tiết kiệm tại Ba Be Lake'),
(10, 'R09', 'images/image_98.jpg', 'Phòng Suite cao cấp tại Ba Be Lake'),
(10, 'R10', 'images/image_99.jpg', 'Phòng Suite view hồ tại Ba Be Lake'),
-- Homestay 11: Hanoi Old Quarter Homestay
(11, 'R01', 'images/image_100.jpg', 'Phòng Standard phố cổ tại Hanoi Old Quarter'),
(11, 'R02', 'images/image_101.jpg', 'Phòng Standard thoáng mát tại Hanoi Old Quarter'),
(11, 'R03', 'images/image_102.jpg', 'Phòng Deluxe sang trọng tại Hanoi Old Quarter'),
(11, 'R04', 'images/image_103.jpg', 'Phòng Deluxe với ban công tại Hanoi Old Quarter'),
(11, 'R05', 'images/image_104.jpg', 'Phòng Family rộng rãi tại Hanoi Old Quarter'),
(11, 'R06', 'images/image_105.jpg', 'Phòng Family tiện nghi tại Hanoi Old Quarter'),
(11, 'R07', 'images/image_106.jpg', 'Phòng Dormitory thoải mái tại Hanoi Old Quarter'),
(11, 'R08', 'images/image_107.jpg', 'Phòng Dormitory tiết kiệm tại Hanoi Old Quarter'),
(11, 'R09', 'images/image_108.jpg', 'Phòng Suite cao cấp tại Hanoi Old Quarter'),
(11, 'R10', 'images/image_109.jpg', 'Phòng Suite view phố cổ tại Hanoi Old Quarter'),
-- Homestay 12: Sapa Valley Homestay
(12, 'R01', 'images/image_110.jpg', 'Phòng Standard view ruộng bậc thang tại Sapa Valley'),
(12, 'R02', 'images/image_111.jpg', 'Phòng Standard thoáng mát tại Sapa Valley'),
(12, 'R03', 'images/image_112.jpg', 'Phòng Deluxe sang trọng tại Sapa Valley'),
(12, 'R04', 'images/image_113.jpg', 'Phòng Deluxe với ban công tại Sapa Valley'),
(12, 'R05', 'images/image_114.jpg', 'Phòng Family rộng rãi tại Sapa Valley'),
(12, 'R06', 'images/image_115.jpg', 'Phòng Family tiện nghi tại Sapa Valley'),
(12, 'R07', 'images/image_116.jpg', 'Phòng Dormitory thoải mái tại Sapa Valley'),
(12, 'R08', 'images/image_117.jpg', 'Phòng Dormitory tiết kiệm tại Sapa Valley'),
(12, 'R09', 'images/image_118.jpg', 'Phòng Suite cao cấp tại Sapa Valley'),
(12, 'R10', 'images/image_119.jpg', 'Phòng Suite view thung lũng tại Sapa Valley'),
-- Homestay 13: Ha Long Pearl Homestay
(13, 'R01', 'images/image_120.jpg', 'Phòng Standard view vịnh tại Ha Long Pearl'),
(13, 'R02', 'images/image_121.jpg', 'Phòng Standard thoáng mát tại Ha Long Pearl'),
(13, 'R03', 'images/image_122.jpg', 'Phòng Deluxe sang trọng tại Ha Long Pearl'),
(13, 'R04', 'images/image_123.jpg', 'Phòng Deluxe với ban công tại Ha Long Pearl'),
(13, 'R05', 'images/image_124.jpg', 'Phòng Family rộng rãi tại Ha Long Pearl'),
(13, 'R06', 'images/image_125.jpg', 'Phòng Family tiện nghi tại Ha Long Pearl'),
(13, 'R07', 'images/image_126.jpg', 'Phòng Dormitory thoải mái tại Ha Long Pearl'),
(13, 'R08', 'images/image_127.jpg', 'Phòng Dormitory tiết kiệm tại Ha Long Pearl'),
(13, 'R09', 'images/image_128.jpg', 'Phòng Suite cao cấp tại Ha Long Pearl'),
(13, 'R10', 'images/image_129.jpg', 'Phòng Suite view vịnh Hạ Long tại Ha Long Pearl'),
-- Homestay 14: Ninh Binh Lotus Homestay
(14, 'R01', 'images/image_130.jpg', 'Phòng Standard view núi tại Ninh Binh Lotus'),
(14, 'R02', 'images/image_131.jpg', 'Phòng Standard thoáng mát tại Ninh Binh Lotus'),
(14, 'R03', 'images/image_132.jpg', 'Phòng Deluxe sang trọng tại Ninh Binh Lotus'),
(14, 'R04', 'images/image_133.jpg', 'Phòng Deluxe với ban công tại Ninh Binh Lotus'),
(14, 'R05', 'images/image_134.jpg', 'Phòng Family rộng rãi tại Ninh Binh Lotus'),
(14, 'R06', 'images/image_135.jpg', 'Phòng Family tiện nghi tại Ninh Binh Lotus'),
(14, 'R07', 'images/image_136.jpg', 'Phòng Dormitory thoải mái tại Ninh Binh Lotus'),
(14, 'R08', 'images/image_137.jpg', 'Phòng Dormitory tiết kiệm tại Ninh Binh Lotus'),
(14, 'R09', 'images/image_138.jpg', 'Phòng Suite cao cấp tại Ninh Binh Lotus'),
(14, 'R10', 'images/image_139.jpg', 'Phòng Suite view Tràng An tại Ninh Binh Lotus'),
-- Homestay 15: Hue Heritage Homestay
(15, 'R01', 'images/image_140.jpg', 'Phòng Standard phong cách cổ tại Hue Heritage'),
(15, 'R02', 'images/image_141.jpg', 'Phòng Standard thoáng mát tại Hue Heritage'),
(15, 'R03', 'images/image_142.jpg', 'Phòng Deluxe sang trọng tại Hue Heritage'),
(15, 'R04', 'images/image_143.jpg', 'Phòng Deluxe với ban công tại Hue Heritage'),
(15, 'R05', 'images/image_144.jpg', 'Phòng Family rộng rãi tại Hue Heritage'),
(15, 'R06', 'images/image_145.jpg', 'Phòng Family tiện nghi tại Hue Heritage'),
(15, 'R07', 'images/image_146.jpg', 'Phòng Dormitory thoải mái tại Hue Heritage'),
(15, 'R08', 'images/image_147.jpg', 'Phòng Dormitory tiết kiệm tại Hue Heritage'),
(15, 'R09', 'images/image_148.jpg', 'Phòng Suite cao cấp tại Hue Heritage'),
(15, 'R10', 'images/image_149.jpg', 'Phòng Suite phong cách Huế tại Hue Heritage'),
-- Homestay 16: Da Nang Skyline Homestay
(16, 'R01', 'images/image_150.jpg', 'Phòng Standard view thành phố tại Da Nang Skyline'),
(16, 'R02', 'images/image_151.jpg', 'Phòng Standard thoáng mát tại Da Nang Skyline'),
(16, 'R03', 'images/image_152.jpg', 'Phòng Deluxe sang trọng tại Da Nang Skyline'),
(16, 'R04', 'images/image_153.jpg', 'Phòng Deluxe với ban công tại Da Nang Skyline'),
(16, 'R05', 'images/image_154.jpg', 'Phòng Family rộng rãi tại Da Nang Skyline'),
(16, 'R06', 'images/image_155.jpg', 'Phòng Family tiện nghi tại Da Nang Skyline'),
(16, 'R07', 'images/image_156.jpg', 'Phòng Dormitory thoải mái tại Da Nang Skyline'),
(16, 'R08', 'images/image_157.jpg', 'Phòng Dormitory tiết kiệm tại Da Nang Skyline'),
(16, 'R09', 'images/image_158.jpg', 'Phòng Suite cao cấp tại Da Nang Skyline'),
(16, 'R10', 'images/image_159.jpg', 'Phòng Suite view cầu Rồng tại Da Nang Skyline'),
-- Homestay 17: Hoi An Riverside Homestay
(17, 'R01', 'images/image_160.jpg', 'Phòng Standard view sông tại Hoi An Riverside'),
(17, 'R02', 'images/image_161.jpg', 'Phòng Standard thoáng mát tại Hoi An Riverside'),
(17, 'R03', 'images/image_162.jpg', 'Phòng Deluxe sang trọng tại Hoi An Riverside'),
(17, 'R04', 'images/image_163.jpg', 'Phòng Deluxe với ban công tại Hoi An Riverside'),
(17, 'R05', 'images/image_164.jpg', 'Phòng Family rộng rãi tại Hoi An Riverside'),
(17, 'R06', 'images/image_165.jpg', 'Phòng Family tiện nghi tại Hoi An Riverside'),
(17, 'R07', 'images/image_166.jpg', 'Phòng Dormitory thoải mái tại Hoi An Riverside'),
(17, 'R08', 'images/image_167.jpg', 'Phòng Dormitory tiết kiệm tại Hoi An Riverside'),
(17, 'R09', 'images/image_168.jpg', 'Phòng Suite cao cấp tại Hoi An Riverside'),
(17, 'R10', 'images/image_169.jpg', 'Phòng Suite view sông Thu Bồn tại Hoi An Riverside'),
-- Homestay 18: Nha Trang Seaside Homestay
(18, 'R01', 'images/image_170.jpg', 'Phòng Standard view biển tại Nha Trang Seaside'),
(18, 'R02', 'images/image_171.jpg', 'Phòng Standard thoáng mát tại Nha Trang Seaside'),
(18, 'R03', 'images/image_172.jpg', 'Phòng Deluxe sang trọng tại Nha Trang Seaside'),
(18, 'R04', 'images/image_173.jpg', 'Phòng Deluxe với ban công tại Nha Trang Seaside'),
(18, 'R05', 'images/image_174.jpg', 'Phòng Family rộng rãi tại Nha Trang Seaside'),
(18, 'R06', 'images/image_175.jpg', 'Phòng Family tiện nghi tại Nha Trang Seaside'),
(18, 'R07', 'images/image_176.jpg', 'Phòng Dormitory thoải mái tại Nha Trang Seaside'),
(18, 'R08', 'images/image_177.jpg', 'Phòng Dormitory tiết kiệm tại Nha Trang Seaside'),
(18, 'R09', 'images/image_178.jpg', 'Phòng Suite cao cấp tại Nha Trang Seaside'),
(18, 'R10', 'images/image_179.jpg', 'Phòng Suite view biển tại Nha Trang Seaside'),
-- Homestay 19: Da Lat Flower Homestay
(19, 'R01', 'images/image_180.jpg', 'Phòng Standard view vườn hoa tại Da Lat Flower'),
(19, 'R02', 'images/image_181.jpg', 'Phòng Standard thoáng mát tại Da Lat Flower'),
(19, 'R03', 'images/image_182.jpg', 'Phòng Deluxe sang trọng tại Da Lat Flower'),
(19, 'R04', 'images/image_183.jpg', 'Phòng Deluxe với ban công tại Da Lat Flower'),
(19, 'R05', 'images/image_184.jpg', 'Phòng Family rộng rãi tại Da Lat Flower'),
(19, 'R06', 'images/image_185.jpg', 'Phòng Family tiện nghi tại Da Lat Flower'),
(19, 'R07', 'images/image_186.jpg', 'Phòng Dormitory thoải mái tại Da Lat Flower'),
(19, 'R08', 'images/image_187.jpg', 'Phòng Dormitory tiết kiệm tại Da Lat Flower'),
(19, 'R09', 'images/image_188.jpg', 'Phòng Suite cao cấp tại Da Lat Flower'),
(19, 'R10', 'images/image_189.jpg', 'Phòng Suite view thung lũng tại Da Lat Flower'),
-- Homestay 20: Saigon Central Homestay
(20, 'R01', 'images/image_190.jpg', 'Phòng Standard trung tâm tại Saigon Central'),
(20, 'R02', 'images/image_191.jpg', 'Phòng Standard thoáng mát tại Saigon Central'),
(20, 'R03', 'images/image_192.jpg', 'Phòng Deluxe sang trọng tại Saigon Central'),
(20, 'R04', 'images/image_193.jpg', 'Phòng Deluxe với ban công tại Saigon Central'),
(20, 'R05', 'images/image_194.jpg', 'Phòng Family rộng rãi tại Saigon Central'),
(20, 'R06', 'images/image_195.jpg', 'Phòng Family tiện nghi tại Saigon Central'),
(20, 'R07', 'images/image_196.jpg', 'Phòng Dormitory thoải mái tại Saigon Central'),
(20, 'R08', 'images/image_197.jpg', 'Phòng Dormitory tiết kiệm tại Saigon Central'),
(20, 'R09', 'images/image_198.jpg', 'Phòng Suite cao cấp tại Saigon Central'),
(20, 'R10', 'images/image_199.jpg', 'Phòng Suite view thành phố tại Saigon Central'),
-- Homestay 21: Phu Quoc Paradise Homestay
(21, 'R01', 'images/image_200.jpg', 'Phòng Standard view biển tại Phu Quoc Paradise'),
(21, 'R02', 'images/image_201.jpg', 'Phòng Standard thoáng mát tại Phu Quoc Paradise'),
(21, 'R03', 'images/image_202.jpg', 'Phòng Deluxe sang trọng tại Phu Quoc Paradise'),
(21, 'R04', 'images/image_203.jpg', 'Phòng Deluxe với ban công tại Phu Quoc Paradise'),
(21, 'R05', 'images/image_204.jpg', 'Phòng Family rộng rãi tại Phu Quoc Paradise'),
(21, 'R06', 'images/image_205.jpg', 'Phòng Family tiện nghi tại Phu Quoc Paradise'),
(21, 'R07', 'images/image_206.jpg', 'Phòng Dormitory thoải mái tại Phu Quoc Paradise'),
(21, 'R08', 'images/image_207.jpg', 'Phòng Dormitory tiết kiệm tại Phu Quoc Paradise'),
(21, 'R09', 'images/image_208.jpg', 'Phòng Suite cao cấp tại Phu Quoc Paradise'),
(21, 'R10', 'images/image_209.jpg', 'Phòng Suite view bãi Sao tại Phu Quoc Paradise'),
-- Homestay 22: Can Tho Garden Homestay
(22, 'R01', 'images/image_210.jpg', 'Phòng Standard view vườn tại Can Tho Garden'),
(22, 'R02', 'images/image_211.jpg', 'Phòng Standard thoáng mát tại Can Tho Garden'),
(22, 'R03', 'images/image_212.jpg', 'Phòng Deluxe sang trọng tại Can Tho Garden'),
(22, 'R04', 'images/image_213.jpg', 'Phòng Deluxe với ban công tại Can Tho Garden'),
(22, 'R05', 'images/image_214.jpg', 'Phòng Family rộng rãi tại Can Tho Garden'),
(22, 'R06', 'images/image_215.jpg', 'Phòng Family tiện nghi tại Can Tho Garden'),
(22, 'R07', 'images/image_216.jpg', 'Phòng Dormitory thoải mái tại Can Tho Garden'),
(22, 'R08', 'images/image_217.jpg', 'Phòng Dormitory tiết kiệm tại Can Tho Garden'),
(22, 'R09', 'images/image_218.jpg', 'Phòng Suite cao cấp tại Can Tho Garden'),
(22, 'R10', 'images/image_219.jpg', 'Phòng Suite view vườn tại Can Tho Garden'),
-- Homestay 23: Mai Chau Valley Homestay
(23, 'R01', 'images/image_220.jpg', 'Phòng Standard view bản làng tại Mai Chau Valley'),
(23, 'R02', 'images/image_221.jpg', 'Phòng Standard thoáng mát tại Mai Chau Valley'),
(23, 'R03', 'images/image_222.jpg', 'Phòng Deluxe sang trọng tại Mai Chau Valley'),
(23, 'R04', 'images/image_223.jpg', 'Phòng Deluxe với ban công tại Mai Chau Valley'),
(23, 'R05', 'images/image_224.jpg', 'Phòng Family rộng rãi tại Mai Chau Valley'),
(23, 'R06', 'images/image_225.jpg', 'Phòng Family tiện nghi tại Mai Chau Valley'),
(23, 'R07', 'images/image_226.jpg', 'Phòng Dormitory thoải mái tại Mai Chau Valley'),
(23, 'R08', 'images/image_227.jpg', 'Phòng Dormitory tiết kiệm tại Mai Chau Valley'),
(23, 'R09', 'images/image_228.jpg', 'Phòng Suite cao cấp tại Mai Chau Valley'),
(23, 'R10', 'images/image_229.jpg', 'Phòng Suite view thung lũng tại Mai Chau Valley'),
-- Homestay 24: Cat Ba Green Homestay
(24, 'R01', 'images/image_230.jpg', 'Phòng Standard view rừng tại Cat Ba Green'),
(24, 'R02', 'images/image_231.jpg', 'Phòng Standard thoáng mát tại Cat Ba Green'),
(24, 'R03', 'images/image_232.jpg', 'Phòng Deluxe sang trọng tại Cat Ba Green'),
(24, 'R04', 'images/image_233.jpg', 'Phòng Deluxe với ban công tại Cat Ba Green'),
(24, 'R05', 'images/image_234.jpg', 'Phòng Family rộng rãi tại Cat Ba Green'),
(24, 'R06', 'images/image_235.jpg', 'Phòng Family tiện nghi tại Cat Ba Green'),
(24, 'R07', 'images/image_236.jpg', 'Phòng Dormitory thoải mái tại Cat Ba Green'),
(24, 'R08', 'images/image_237.jpg', 'Phòng Dormitory tiết kiệm tại Cat Ba Green'),
(24, 'R09', 'images/image_238.jpg', 'Phòng Suite cao cấp tại Cat Ba Green'),
(24, 'R10', 'images/image_239.jpg', 'Phòng Suite view vịnh tại Cat Ba Green'),
-- Homestay 25: Phong Nha Lake Homestay
(25, 'R01', 'images/image_240.jpg', 'Phòng Standard view hồ tại Phong Nha Lake'),
(25, 'R02', 'images/image_241.jpg', 'Phòng Standard thoáng mát tại Phong Nha Lake'),
(25, 'R03', 'images/image_242.jpg', 'Phòng Deluxe sang trọng tại Phong Nha Lake'),
(25, 'R04', 'images/image_243.jpg', 'Phòng Deluxe với ban công tại Phong Nha Lake'),
(25, 'R05', 'images/image_244.jpg', 'Phòng Family rộng rãi tại Phong Nha Lake'),
(25, 'R06', 'images/image_245.jpg', 'Phòng Family tiện nghi tại Phong Nha Lake'),
(25, 'R07', 'images/image_246.jpg', 'Phòng Dormitory thoải mái tại Phong Nha Lake'),
(25, 'R08', 'images/image_247.jpg', 'Phòng Dormitory tiết kiệm tại Phong Nha Lake'),
(25, 'R09', 'images/image_248.jpg', 'Phòng Suite cao cấp tại Phong Nha Lake'),
(25, 'R10', 'images/image_249.jpg', 'Phòng Suite view hồ tại Phong Nha Lake'),
-- Homestay 26: Con Dao Serenity Homestay
(26, 'R01', 'images/image_250.jpg', 'Phòng Standard view biển tại Con Dao Serenity'),
(26, 'R02', 'images/image_251.jpg', 'Phòng Standard thoáng mát tại Con Dao Serenity'),
(26, 'R03', 'images/image_252.jpg', 'Phòng Deluxe sang trọng tại Con Dao Serenity'),
(26, 'R04', 'images/image_253.jpg', 'Phòng Deluxe với ban công tại Con Dao Serenity'),
(26, 'R05', 'images/image_254.jpg', 'Phòng Family rộng rãi tại Con Dao Serenity'),
(26, 'R06', 'images/image_255.jpg', 'Phòng Family tiện nghi tại Con Dao Serenity'),
(26, 'R07', 'images/image_256.jpg', 'Phòng Dormitory thoải mái tại Con Dao Serenity'),
(26, 'R08', 'images/image_257.jpg', 'Phòng Dormitory tiết kiệm tại Con Dao Serenity'),
(26, 'R09', 'images/image_258.jpg', 'Phòng Suite cao cấp tại Con Dao Serenity'),
(26, 'R10', 'images/image_259.jpg', 'Phòng Suite view bãi Đầm Trầu tại Con Dao Serenity'),
-- Homestay 27: Vung Tau Horizon Homestay
(27, 'R01', 'images/image_260.jpg', 'Phòng Standard view biển tại Vung Tau Horizon'),
(27, 'R02', 'images/image_261.jpg', 'Phòng Standard thoáng mát tại Vung Tau Horizon'),
(27, 'R03', 'images/image_262.jpg', 'Phòng Deluxe sang trọng tại Vung Tau Horizon'),
(27, 'R04', 'images/image_263.jpg', 'Phòng Deluxe với ban công tại Vung Tau Horizon'),
(27, 'R05', 'images/image_264.jpg', 'Phòng Family rộng rãi tại Vung Tau Horizon'),
(27, 'R06', 'images/image_265.jpg', 'Phòng Family tiện nghi tại Vung Tau Horizon'),
(27, 'R07', 'images/image_266.jpg', 'Phòng Dormitory thoải mái tại Vung Tau Horizon'),
(27, 'R08', 'images/image_267.jpg', 'Phòng Dormitory tiết kiệm tại Vung Tau Horizon'),
(27, 'R09', 'images/image_268.jpg', 'Phòng Suite cao cấp tại Vung Tau Horizon'),
(27, 'R10', 'images/image_269.jpg', 'Phòng Suite view bãi Trước tại Vung Tau Horizon'),
-- Homestay 28: Mui Ne Ocean Homestay
(28, 'R01', 'images/image_270.jpg', 'Phòng Standard view biển tại Mui Ne Ocean'),
(28, 'R02', 'images/image_271.jpg', 'Phòng Standard thoáng mát tại Mui Ne Ocean'),
(28, 'R03', 'images/image_272.jpg', 'Phòng Deluxe sang trọng tại Mui Ne Ocean'),
(28, 'R04', 'images/image_273.jpg', 'Phòng Deluxe với ban công tại Mui Ne Ocean'),
(28, 'R05', 'images/image_274.jpg', 'Phòng Family rộng rãi tại Mui Ne Ocean'),
(28, 'R06', 'images/image_275.jpg', 'Phòng Family tiện nghi tại Mui Ne Ocean'),
(28, 'R07', 'images/image_276.jpg', 'Phòng Dormitory thoải mái tại Mui Ne Ocean'),
(28, 'R08', 'images/image_277.jpg', 'Phòng Dormitory tiết kiệm tại Mui Ne Ocean'),
(28, 'R09', 'images/image_278.jpg', 'Phòng Suite cao cấp tại Mui Ne Ocean'),
(28, 'R10', 'images/image_279.jpg', 'Phòng Suite view biển tại Mui Ne Ocean'),
-- Homestay 29: Ha Giang Cloud Homestay
(29, 'R01', 'images/image_280.jpg', 'Phòng Standard view núi tại Ha Giang Cloud'),
(29, 'R02', 'images/image_281.jpg', 'Phòng Standard thoáng mát tại Ha Giang Cloud'),
(29, 'R03', 'images/image_282.jpg', 'Phòng Deluxe sang trọng tại Ha Giang Cloud'),
(29, 'R04', 'images/image_283.jpg', 'Phòng Deluxe với ban công tại Ha Giang Cloud'),
(29, 'R05', 'images/image_284.jpg', 'Phòng Family rộng rãi tại Ha Giang Cloud'),
(29, 'R06', 'images/image_285.jpg', 'Phòng Family tiện nghi tại Ha Giang Cloud'),
(29, 'R07', 'images/image_286.jpg', 'Phòng Dormitory thoải mái tại Ha Giang Cloud'),
(29, 'R08', 'images/image_287.jpg', 'Phòng Dormitory tiết kiệm tại Ha Giang Cloud'),
(29, 'R09', 'images/image_288.jpg', 'Phòng Suite cao cấp tại Ha Giang Cloud'),
(29, 'R10', 'images/image_289.jpg', 'Phòng Suite view thung lũng tại Ha Giang Cloud'),
-- Homestay 30: Ba Be Eco Homestay
(30, 'R01', 'images/image_290.jpg', 'Phòng Standard view hồ tại Ba Be Eco'),
(30, 'R02', 'images/image_291.jpg', 'Phòng Standard thoáng mát tại Ba Be Eco'),
(30, 'R03', 'images/image_292.jpg', 'Phòng Deluxe sang trọng tại Ba Be Eco'),
(30, 'R04', 'images/image_293.jpg', 'Phòng Deluxe với ban công tại Ba Be Eco'),
(30, 'R05', 'images/image_294.jpg', 'Phòng Family rộng rãi tại Ba Be Eco'),
(30, 'R06', 'images/image_295.jpg', 'Phòng Family tiện nghi tại Ba Be Eco'),
(30, 'R07', 'images/image_296.jpg', 'Phòng Dormitory thoải mái tại Ba Be Eco'),
(30, 'R08', 'images/image_297.jpg', 'Phòng Dormitory tiết kiệm tại Ba Be Eco'),
(30, 'R09', 'images/image_298.jpg', 'Phòng Suite cao cấp tại Ba Be Eco'),
(30, 'R10', 'images/image_299.jpg', 'Phòng Suite view hồ tại Ba Be Eco'),
-- Homestay 31: Lang Son Mountain Homestay
(31, 'R01', 'images/image_300.jpg', 'Phòng Standard view núi tại Lang Son Mountain'),
(31, 'R02', 'images/image_301.jpg', 'Phòng Standard thoáng mát tại Lang Son Mountain'),
(31, 'R03', 'images/image_302.jpg', 'Phòng Deluxe sang trọng tại Lang Son Mountain'),
(31, 'R04', 'images/image_303.jpg', 'Phòng Deluxe với ban công tại Lang Son Mountain'),
(31, 'R05', 'images/image_304.jpg', 'Phòng Family rộng rãi tại Lang Son Mountain'),
(31, 'R06', 'images/image_305.jpg', 'Phòng Family tiện nghi tại Lang Son Mountain'),
(31, 'R07', 'images/image_306.jpg', 'Phòng Dormitory thoải mái tại Lang Son Mountain'),
(31, 'R08', 'images/image_307.jpg', 'Phòng Dormitory tiết kiệm tại Lang Son Mountain'),
(31, 'R09', 'images/image_308.jpg', 'Phòng Suite cao cấp tại Lang Son Mountain'),
(31, 'R10', 'images/image_309.jpg', 'Phòng Suite view núi tại Lang Son Mountain'),
-- Homestay 32: Quy Nhon Beach Homestay
(32, 'R01', 'images/image_310.jpg', 'Phòng Standard view biển tại Quy Nhon Beach'),
(32, 'R02', 'images/image_311.jpg', 'Phòng Standard thoáng mát tại Quy Nhon Beach'),
(32, 'R03', 'images/image_312.jpg', 'Phòng Deluxe sang trọng tại Quy Nhon Beach'),
(32, 'R04', 'images/image_313.jpg', 'Phòng Deluxe với ban công tại Quy Nhon Beach'),
(32, 'R05', 'images/image_314.jpg', 'Phòng Family rộng rãi tại Quy Nhon Beach'),
(32, 'R06', 'images/image_315.jpg', 'Phòng Family tiện nghi tại Quy Nhon Beach'),
(32, 'R07', 'images/image_316.jpg', 'Phòng Dormitory thoải mái tại Quy Nhon Beach'),
(32, 'R08', 'images/image_317.jpg', 'Phòng Dormitory tiết kiệm tại Quy Nhon Beach'),
(32, 'R09', 'images/image_318.jpg', 'Phòng Suite cao cấp tại Quy Nhon Beach'),
(32, 'R10', 'images/image_319.jpg', 'Phòng Suite view biển tại Quy Nhon Beach'),
-- Homestay 33: Phan Rang Desert Homestay
(33, 'R01', 'images/image_320.jpg', 'Phòng Standard view đồi cát tại Phan Rang Desert'),
(33, 'R02', 'images/image_321.jpg', 'Phòng Standard thoáng mát tại Phan Rang Desert'),
(33, 'R03', 'images/image_322.jpg', 'Phòng Deluxe sang trọng tại Phan Rang Desert'),
(33, 'R04', 'images/image_323.jpg', 'Phòng Deluxe với ban công tại Phan Rang Desert'),
(33, 'R05', 'images/image_324.jpg', 'Phòng Family rộng rãi tại Phan Rang Desert'),
(33, 'R06', 'images/image_325.jpg', 'Phòng Family tiện nghi tại Phan Rang Desert'),
(33, 'R07', 'images/image_326.jpg', 'Phòng Dormitory thoải mái tại Phan Rang Desert'),
(33, 'R08', 'images/image_327.jpg', 'Phòng Dormitory tiết kiệm tại Phan Rang Desert'),
(33, 'R09', 'images/image_328.jpg', 'Phòng Suite cao cấp tại Phan Rang Desert'),
(33, 'R10', 'images/image_329.jpg', 'Phòng Suite view đồi cát tại Phan Rang Desert'),
-- Homestay 34: Ca Mau Mangrove Homestay
(34, 'R01', 'images/image_330.jpg', 'Phòng Standard view rừng đước tại Ca Mau Mangrove'),
(34, 'R02', 'images/image_331.jpg', 'Phòng Standard thoáng mát tại Ca Mau Mangrove'),
(34, 'R03', 'images/image_332.jpg', 'Phòng Deluxe sang trọng tại Ca Mau Mangrove'),
(34, 'R04', 'images/image_333.jpg', 'Phòng Deluxe với ban công tại Ca Mau Mangrove'),
(34, 'R05', 'images/image_334.jpg', 'Phòng Family rộng rãi tại Ca Mau Mangrove'),
(34, 'R06', 'images/image_335.jpg', 'Phòng Family tiện nghi tại Ca Mau Mangrove'),
(34, 'R07', 'images/image_336.jpg', 'Phòng Dormitory thoải mái tại Ca Mau Mangrove'),
(34, 'R08', 'images/image_337.jpg', 'Phòng Dormitory tiết kiệm tại Ca Mau Mangrove'),
(34, 'R09', 'images/image_338.jpg', 'Phòng Suite cao cấp tại Ca Mau Mangrove'),
(34, 'R10', 'images/image_339.jpg', 'Phòng Suite view rừng đước tại Ca Mau Mangrove'),
-- Homestay 35: Hoa Binh Lake Homestay
(35, 'R01', 'images/image_340.jpg', 'Phòng Standard view hồ tại Hoa Binh Lake'),
(35, 'R02', 'images/image_341.jpg', 'Phòng Standard thoáng mát tại Hoa Binh Lake'),
(35, 'R03', 'images/image_342.jpg', 'Phòng Deluxe sang trọng tại Hoa Binh Lake'),
(35, 'R04', 'images/image_343.jpg', 'Phòng Deluxe với ban công tại Hoa Binh Lake'),
(35, 'R05', 'images/image_344.jpg', 'Phòng Family rộng rãi tại Hoa Binh Lake'),
(35, 'R06', 'images/image_345.jpg', 'Phòng Family tiện nghi tại Hoa Binh Lake'),
(35, 'R07', 'images/image_346.jpg', 'Phòng Dormitory thoải mái tại Hoa Binh Lake'),
(35, 'R08', 'images/image_347.jpg', 'Phòng Dormitory tiết kiệm tại Hoa Binh Lake'),
(35, 'R09', 'images/image_348.jpg', 'Phòng Suite cao cấp tại Hoa Binh Lake'),
(35, 'R10', 'images/image_349.jpg', 'Phòng Suite view hồ tại Hoa Binh Lake'),
-- Homestay 36: Ben Tre Coconut Homestay
(36, 'R01', 'images/image_350.jpg', 'Phòng Standard view vườn dừa tại Ben Tre Coconut'),
(36, 'R02', 'images/image_351.jpg', 'Phòng Standard thoáng mát tại Ben Tre Coconut'),
(36, 'R03', 'images/image_352.jpg', 'Phòng Deluxe sang trọng tại Ben Tre Coconut'),
(36, 'R04', 'images/image_353.jpg', 'Phòng Deluxe với ban công tại Ben Tre Coconut'),
(36, 'R05', 'images/image_354.jpg', 'Phòng Family rộng rãi tại Ben Tre Coconut'),
(36, 'R06', 'images/image_355.jpg', 'Phòng Family tiện nghi tại Ben Tre Coconut'),
(36, 'R07', 'images/image_356.jpg', 'Phòng Dormitory thoải mái tại Ben Tre Coconut'),
(36, 'R08', 'images/image_357.jpg', 'Phòng Dormitory tiết kiệm tại Ben Tre Coconut'),
(36, 'R09', 'images/image_358.jpg', 'Phòng Suite cao cấp tại Ben Tre Coconut'),
(36, 'R10', 'images/image_359.jpg', 'Phòng Suite view sông tại Ben Tre Coconut'),
-- Homestay 37: Vinh Long River Homestay
(37, 'R01', 'images/image_360.jpg', 'Phòng Standard view sông tại Vinh Long River'),
(37, 'R02', 'images/image_361.jpg', 'Phòng Standard thoáng mát tại Vinh Long River'),
(37, 'R03', 'images/image_362.jpg', 'Phòng Deluxe sang trọng tại Vinh Long River'),
(37, 'R04', 'images/image_363.jpg', 'Phòng Deluxe với ban công tại Vinh Long River'),
(37, 'R05', 'images/image_364.jpg', 'Phòng Family rộng rãi tại Vinh Long River'),
(37, 'R06', 'images/image_365.jpg', 'Phòng Family tiện nghi tại Vinh Long River'),
(37, 'R07', 'images/image_366.jpg', 'Phòng Dormitory thoải mái tại Vinh Long River'),
(37, 'R08', 'images/image_367.jpg', 'Phòng Dormitory tiết kiệm tại Vinh Long River'),
(37, 'R09', 'images/image_368.jpg', 'Phòng Suite cao cấp tại Vinh Long River'),
(37, 'R10', 'images/image_369.jpg', 'Phòng Suite view sông Cổ Chiên tại Vinh Long River'),
-- Homestay 38: Lao Cai Highland Homestay
(38, 'R01', 'images/image_370.jpg', 'Phòng Standard view ruộng bậc thang tại Lao Cai Highland'),
(38, 'R02', 'images/image_371.jpg', 'Phòng Standard thoáng mát tại Lao Cai Highland'),
(38, 'R03', 'images/image_372.jpg', 'Phòng Deluxe sang trọng tại Lao Cai Highland'),
(38, 'R04', 'images/image_373.jpg', 'Phòng Deluxe với ban công tại Lao Cai Highland'),
(38, 'R05', 'images/image_374.jpg', 'Phòng Family rộng rãi tại Lao Cai Highland'),
(38, 'R06', 'images/image_375.jpg', 'Phòng Family tiện nghi tại Lao Cai Highland'),
(38, 'R07', 'images/image_376.jpg', 'Phòng Dormitory thoải mái tại Lao Cai Highland'),
(38, 'R08', 'images/image_377.jpg', 'Phòng Dormitory tiết kiệm tại Lao Cai Highland'),
(38, 'R09', 'images/image_378.jpg', 'Phòng Suite cao cấp tại Lao Cai Highland'),
(38, 'R10', 'images/image_379.jpg', 'Phòng Suite view bản Cát Cát tại Lao Cai Highland'),
-- Homestay 39: Tay Ninh Ba Den Homestay
(39, 'R01', 'images/image_380.jpg', 'Phòng Standard view núi tại Tay Ninh Ba Den'),
(39, 'R02', 'images/image_381.jpg', 'Phòng Standard thoáng mát tại Tay Ninh Ba Den'),
(39, 'R03', 'images/image_382.jpg', 'Phòng Deluxe sang trọng tại Tay Ninh Ba Den'),
(39, 'R04', 'images/image_383.jpg', 'Phòng Deluxe với ban công tại Tay Ninh Ba Den'),
(39, 'R05', 'images/image_384.jpg', 'Phòng Family rộng rãi tại Tay Ninh Ba Den'),
(39, 'R06', 'images/image_385.jpg', 'Phòng Family tiện nghi tại Tay Ninh Ba Den'),
(39, 'R07', 'images/image_386.jpg', 'Phòng Dormitory thoải mái tại Tay Ninh Ba Den'),
(39, 'R08', 'images/image_387.jpg', 'Phòng Dormitory tiết kiệm tại Tay Ninh Ba Den'),
(39, 'R09', 'images/image_388.jpg', 'Phòng Suite cao cấp tại Tay Ninh Ba Den'),
(39, 'R10', 'images/image_389.jpg', 'Phòng Suite view núi Bà Đen tại Tay Ninh Ba Den'),
-- Homestay 40: Nam Dinh Coastal Homestay
(40, 'R01', 'images/image_390.jpg', 'Phòng Standard view biển tại Nam Dinh Coastal'),
(40, 'R02', 'images/image_391.jpg', 'Phòng Standard thoáng mát tại Nam Dinh Coastal'),
(40, 'R03', 'images/image_392.jpg', 'Phòng Deluxe sang trọng tại Nam Dinh Coastal'),
(40, 'R04', 'images/image_393.jpg', 'Phòng Deluxe với ban công tại Nam Dinh Coastal'),
(40, 'R05', 'images/image_394.jpg', 'Phòng Family rộng rãi tại Nam Dinh Coastal'),
(40, 'R06', 'images/image_395.jpg', 'Phòng Family tiện nghi tại Nam Dinh Coastal'),
(40, 'R07', 'images/image_396.jpg', 'Phòng Dormitory thoải mái tại Nam Dinh Coastal'),
(40, 'R08', 'images/image_397.jpg', 'Phòng Dormitory tiết kiệm tại Nam Dinh Coastal'),
(40, 'R09', 'images/image_398.jpg', 'Phòng Suite cao cấp tại Nam Dinh Coastal'),
(40, 'R10', 'images/image_399.jpg', 'Phòng Suite view biển tại Nam Dinh Coastal');
GO
go
/*
-- bảng serviceimages: quản lý ảnh của dịch vụ
create table serviceImages (
    serviceImage-id int primary key identity(1,1),
    service-id int  null,
	--room-id int  null,
	homestay-id int null,
    image-url varchar(255)  null,
    description varchar(100),
    created-at datetime default getdate()
    foreign key (service-id) references Services(service-id)
)
*/
go
create table Voucher(
	voucher_id int primary key identity(1,1),
	vourcher_name nvarchar(100),
	discount decimal(4,2),
	homestay_id int foreign key (homestay_id) references Homestays(homestay_id),
	condition nvarchar(max)
)
go
INSERT INTO Voucher (vourcher_name, discount, homestay_id, condition)
VALUES

(N'Ưu đãi hè 2025', 10.00, 1, N'Áp dụng cho đặt phòng từ 3 đêm trở lên'),
(N'Giảm giá lễ 2025', 15.00, 2, N'Áp dụng cho tất cả các loại phòng'),
(N'Voucher khách hàng thân thiết', 20.00, 3, N'Chỉ áp dụng cho khách đã đặt lần trước'),
(N'Mã giảm giá đặc biệt', 12.50, 4, N'Áp dụng cho booking từ thứ 2 đến thứ 5'),
(N'Ưu đãi cuối tuần', 8.00, 5, N'Áp dụng cho booking vào cuối tuần'),
(N'Mùa thấp điểm', 25.00, 6, N'Áp dụng cho đặt phòng trong tháng 9 và tháng 10'),
(N'Giảm giá nhóm', 18.00, 7, N'Áp dụng cho nhóm đặt từ 4 phòng trở lên'),
(N'Voucher sinh nhật', 30.00, 8, N'Áp dụng cho khách đặt phòng vào ngày sinh nhật'),
(N'Ưu đãi tháng 6', 10.00, 9, N'Áp dụng cho booking trước ngày 15/6'),
(N'Mã giảm giá combo', 22.00, 10, N'Áp dụng khi đặt phòng kèm dịch vụ ăn uống'),
(N'Khuyến mãi đặt sớm', 15.00, 1, N'Đặt trước 30 ngày được giảm giá'),
(N'Ưu đãi khách hàng mới', 20.00, 2, N'Chỉ áp dụng cho khách lần đầu đặt phòng'),
(N'Giảm giá ngày lễ', 12.00, 3, N'Áp dụng cho booking ngày lễ lớn trong năm'),
(N'Mã giảm giá online', 10.00, 4, N'Chỉ áp dụng khi đặt qua website'),
(N'Voucher cuối năm', 25.00, 5, N'Áp dụng cho đặt phòng từ 20/12 đến 31/12'),
(N'Khuyến mãi mùa thu', 15.00, 6, N'Áp dụng cho booking tháng 9 đến tháng 11'),
(N'Giảm giá đặc biệt', 18.00, 7, N'Áp dụng cho khách VIP'),
(N'Ưu đãi đặt 2 phòng', 10.00, 8, N'Giảm giá khi đặt từ 2 phòng trở lên'),
(N'Mã ưu đãi học sinh sinh viên', 20.00, 9, N'Chỉ áp dụng cho học sinh, sinh viên'),
(N'Khuyến mãi ngày hội du lịch', 30.00, 10, N'Áp dụng trong ngày hội du lịch hàng năm');

/*
go 
create table VoucherCondition(
	voucherCondition-id int primary key identity(1,1),
	voucher-id int foreign key (voucher-id) references Voucher(voucher-id),
	condition nvarchar(max)
)
*/

go
CREATE TABLE Reports (
    report_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,                         -- Người báo cáo
    receiver_id INT NULL,                         -- Người nhận (xử lý) báo cáo
    homestay_id INT NULL,
    room_number VARCHAR(10) NULL,
    service_id INT NULL,
    report_type VARCHAR(50) NOT NULL,
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX) NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'closed')),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES Users(user_id),
    FOREIGN KEY (homestay_id) REFERENCES Homestays(homestay_id),
    FOREIGN KEY (homestay_id,room_number) REFERENCES Rooms(homestay_id,room_number),
    FOREIGN KEY (service_id) REFERENCES Service(service_id)
);
go
INSERT INTO Reports (user_id, receiver_id, homestay_id, room_number, service_id, report_type, title, description, status) VALUES
(6, 1, 1, 'R01', NULL, 'Room Issue', N'Phòng có mùi khó chịu', N'Phòng R01 cần được vệ sinh kỹ hơn.', 'pending'),
(9, 2, 2, NULL, 1, 'Service Issue', N'Dịch vụ chụp ảnh không đúng lịch', N'Dịch vụ chụp ảnh không đúng thời gian cam kết.', 'pending'),
(12, 1, 3, 'R02', NULL, 'Room Issue', N'Điều hòa không mát', N'Điều hòa trong phòng R02 không hoạt động.', 'pending'),
(14, 2, 4, NULL, 3, 'Service Issue', N'Dịch vụ đồ ăn chậm', N'Dịch vụ đồ ăn đến muộn so với giờ đặt.', 'pending'),
(17, 1, 5, NULL, NULL, 'Homestay Issue', N'Internet yếu', N'Mạng wifi trong homestay rất yếu và thường xuyên mất kết nối.', 'pending');
CREATE TABLE ExperienceType (
    type_id INT PRIMARY KEY IDENTITY(1,1),
    experience_name NVARCHAR(100),
    description NVARCHAR(500),
    icon_class NVARCHAR(100)
);
GO
INSERT INTO ExperienceType (experience_name, description, icon_class) VALUES
(N'Tour săn mây', N'Trải nghiệm săn mây trên các đỉnh đồi vào sáng sớm.', 'fas fa-cloud'),
(N'Đạp xe khám phá', N'Tour đạp xe qua các cung đường làng quê hoặc danh lam thắng cảnh.', 'fas fa-bicycle'),
(N'Chèo thuyền kayak', N'Trải nghiệm chèo thuyền kayak trên sông, hồ hoặc biển.', 'fas fa-water'),
(N'Trekking', N'Hành trình đi bộ khám phá rừng, núi hoặc bản làng.', 'fas fa-hiking'),
(N'Lớp học nấu ăn', N'Học nấu các món ăn đặc sản địa phương cùng đầu bếp.', 'fas fa-utensils'),
(N'Tour văn hóa', N'Khám phá văn hóa địa phương qua các làng nghề, chợ hoặc lễ hội.', 'fas fa-landmark'),
(N'Lặn ngắm san hô', N'Trải nghiệm lặn biển ngắm san hô và hệ sinh thái dưới nước.', 'fas fa-fish'),
(N'Tour ẩm thực', N'Khám phá các món ăn đường phố hoặc đặc sản địa phương.', 'fas fa-hotdog'),
(N'Workshop thủ công', N'Tham gia làm gốm, dệt vải hoặc các sản phẩm thủ công truyền thống.', 'fas fa-paint-brush'),
(N'Tour nông trại', N'Trải nghiệm làm nông dân, hái trái cây hoặc chăm sóc cây trồng.', 'fas fa-leaf');
GO

CREATE TABLE Experiences (
    experience_id INT PRIMARY KEY IDENTITY(1,1),
    homestay_id INT NOT NULL,
    type_id INT NOT NULL,
    price DECIMAL(10,2),
    status BIT DEFAULT 1,
    special_notes NVARCHAR(500),
    FOREIGN KEY (homestay_id) REFERENCES Homestays(homestay_id),
    FOREIGN KEY (type_id) REFERENCES ExperienceType(type_id),
    CONSTRAINT UQ_HomestayExperience UNIQUE (homestay_id, experience_id)
);
GO
INSERT INTO Experiences (homestay_id, type_id, price, special_notes) VALUES
-- Homestay 1: Da Lat Dreamy Homestay
(1, 1, 400000.00, N'Săn mây tại đồi chè Cầu Đất vào sáng sớm.'),
(1, 2, 200000.00, N'Đạp xe qua các con đường hoa Đà Lạt.'),
(1, 5, 300000.00, N'Lớp học làm bánh mứt đặc sản Đà Lạt.'),
(1, 6, 350000.00, N'Tour khám phá làng Cù Lần và văn hóa Chơ Ro.'),
-- Homestay 2: Pine Hill Homestay
(2, 1, 450000.00, N'Săn mây tại đỉnh Lang Biang.'),
(2, 2, 250000.00, N'Đạp xe quanh rừng thông Đà Lạt.'),
(2, 9, 280000.00, N'Workshop làm đồ thủ công từ gỗ thông.'),
-- Homestay 3: Da Lat Blossom Homestay
(3, 1, 420000.00, N'Săn mây tại đồi chè Trại Mát.'),
(3, 5, 320000.00, N'Lớp học nấu món canh atiso Đà Lạt.'),
(3, 6, 360000.00, N'Tour khám phá nhà thờ Domain de Marie.'),
(3, 10, 250000.00, N'Trải nghiệm hái dâu tây tại vườn.'),
-- Homestay 4: Misty Valley Homestay
(4, 1, 430000.00, N'Săn mây tại đồi Đa Phú.'),
(4, 2, 230000.00, N'Đạp xe khám phá thung lũng Tình Yêu.'),
(4, 9, 270000.00, N'Workshop làm hoa giấy Đà Lạt.'),
-- Homestay 5: Flower Garden Homestay
(5, 1, 410000.00, N'Săn mây tại đồi chè xanh mướt.'),
(5, 2, 240000.00, N'Đạp xe qua vườn hoa lavender.'),
(5, 10, 260000.00, N'Trải nghiệm hái trái cây tại nông trại.'),
(5, 6, 340000.00, N'Tour khám phá văn hóa địa phương tại chợ Đà Lạt.'),
-- Homestay 6: Da Lat Cozy Homestay
(6, 2, 220000.00, N'Đạp xe quanh ga Đà Lạt cổ kính.'),
(6, 5, 310000.00, N'Lớp học làm mứt dâu tằm.'),
(6, 6, 330000.00, N'Tour khám phá dinh Bảo Đại.'),
-- Homestay 7: Starlight Homestay
(7, 1, 440000.00, N'Săn mây tại quảng trường Lâm Viên.'),
(7, 2, 250000.00, N'Đạp xe qua hồ Xuân Hương.'),
(7, 9, 290000.00, N'Workshop làm đồ thủ công vintage.'),
(7, 10, 270000.00, N'Trải nghiệm làm nông dân tại vườn rau sạch.'),
-- Homestay 8: Da Nang Ocean Homestay
(8, 3, 350000.00, N'Chèo kayak tại biển Mỹ Khê.'),
(8, 7, 500000.00, N'Lặn ngắm san hô tại bán đảo Sơn Trà.'),
(8, 8, 300000.00, N'Tour ẩm thực đường phố Đà Nẵng.'),
(8, 6, 320000.00, N'Tour khám phá văn hóa Chăm tại Ngũ Hành Sơn.'),
-- Homestay 9: Han River Homestay
(9, 3, 340000.00, N'Chèo kayak trên sông Hàn.'),
(9, 8, 310000.00, N'Tour thưởng thức mì Quảng và bánh tráng cuốn thịt heo.'),
(9, 6, 330000.00, N'Tour khám phá làng cổ Hội An.'),
(9, 2, 200000.00, N'Đạp xe quanh cầu Rồng.'),
-- Homestay 10: My Khe Beach Homestay
(10, 7, 520000.00, N'Lặn ngắm san hô tại biển Non Nước.'),
(10, 3, 360000.00, N'Chèo kayak tại bãi biển Phạm Văn Đồng.'),
(10, 8, 290000.00, N'Tour ẩm thực với bún chả cá Đà Nẵng.'),
-- Homestay 11: Da Nang Sky Homestay
(11, 6, 350000.00, N'Tour khám phá văn hóa tại bán đảo Sơn Trà.'),
(11, 8, 320000.00, N'Tour ẩm thực đường phố với bánh xèo.'),
(11, 2, 210000.00, N'Đạp xe quanh cầu Tình Yêu.'),
(11, 3, 370000.00, N'Chèo kayak trên sông Hàn.'),
-- Homestay 12: Sunset Bridge Homestay
(12, 3, 350000.00, N'Chèo kayak ngắm cầu quay sông Hàn.'),
(12, 8, 300000.00, N'Tour ẩm thực với đặc sản Đà Nẵng.'),
(12, 6, 340000.00, N'Tour khám phá văn hóa tại công viên Châu Á.'),
-- Homestay 13: Coral Reef Homestay
(13, 7, 510000.00, N'Lặn ngắm san hô tại biển Sơn Trà.'),
(13, 3, 360000.00, N'Chèo kayak tại bãi biển Mỹ Khê.'),
(13, 8, 310000.00, N'Tour ẩm thực với hải sản tươi sống.'),
(13, 2, 220000.00, N'Đạp xe quanh bãi biển.'),
-- Homestay 14: Da Nang Green Homestay
(14, 3, 340000.00, N'Chèo kayak tại Cù Lao Chàm.'),
(14, 6, 330000.00, N'Tour khám phá văn hóa tại làng bích họa Tam Thanh.'),
(14, 8, 300000.00, N'Tour ẩm thực với đặc sản miền Trung.'),
(14, 10, 250000.00, N'Trải nghiệm hái trái cây tại nông trại.'),
-- Homestay 15: Hanoi Charm Homestay
(15, 2, 200000.00, N'Đạp xe quanh phố cổ Hà Nội.'),
(15, 5, 300000.00, N'Lớp học nấu phở Hà Nội.'),
(15, 6, 320000.00, N'Tour khám phá Văn Miếu Quốc Tử Giám.'),
(15, 8, 290000.00, N'Tour ẩm thực với bún chả Hà Nội.'),
-- Homestay 16: Old Gate Homestay
(16, 2, 210000.00, N'Đạp xe qua chợ đêm Hà Nội.'),
(16, 6, 310000.00, N'Tour khám phá làng gốm Bát Tràng.'),
(16, 8, 300000.00, N'Tour thưởng thức bánh cuốn Thanh Trì.'),
-- Homestay 17: Hoan Kiem Lake Homestay
(17, 2, 220000.00, N'Đạp xe quanh hồ Hoàn Kiếm.'),
(17, 5, 310000.00, N'Lớp học nấu bún thang Hà Nội.'),
(17, 6, 330000.00, N'Tour khám phá nhà hát lớn Hà Nội.'),
(17, 8, 310000.00, N'Tour ẩm thực với phở và bánh mì.'),
-- Homestay 18: Hanoi Lotus Homestay
(18, 6, 320000.00, N'Tour khám phá lăng Bác và chùa Một Cột.'),
(18, 9, 280000.00, N'Workshop làm tranh Đông Hồ.'),
(18, 2, 200000.00, N'Đạp xe quanh khu vực Ba Đình.'),
(18, 5, 300000.00, N'Lớp học làm chả cá Lã Vọng.'),
-- Homestay 19: Tran Quoc Pagoda Homestay
(19, 2, 210000.00, N'Đạp xe quanh hồ Tây.'),
(19, 6, 330000.00, N'Tour khám phá chùa Trấn Quốc và làng hoa Nhật Tân.'),
(19, 8, 300000.00, N'Tour ẩm thực với bánh tôm hồ Tây.'),
(19, 9, 290000.00, N'Workshop làm nón lá truyền thống.'),
-- Homestay 20: Hanoi Vintage Homestay
(20, 2, 200000.00, N'Đạp xe quanh khu phố cổ.'),
(20, 5, 310000.00, N'Lớp học nấu món Hà Nội truyền thống.'),
(20, 6, 320000.00, N'Tour khám phá bảo tàng Dân tộc học.'),
-- Homestay 21: Phu Quoc Paradise Homestay
(21, 7, 500000.00, N'Lặn ngắm san hô tại bãi Sao.'),
(21, 3, 350000.00, N'Chèo kayak tại bãi biển Dương Tơ.'),
(21, 8, 300000.00, N'Tour ẩm thực với gỏi cá trích.'),
(21, 10, 250000.00, N'Trải nghiệm hái tiêu tại vườn.'),
-- Homestay 22: Can Tho Garden Homestay
(22, 3, 340000.00, N'Chèo thuyền khám phá chợ nổi Cái Răng.'),
(22, 8, 290000.00, N'Tour ẩm thực với bánh xèo miền Tây.'),
(22, 10, 260000.00, N'Trải nghiệm hái trái cây tại vườn.'),
(22, 5, 300000.00, N'Lớp học làm bánh tét lá cẩm.'),
-- Homestay 23: Mai Chau Valley Homestay
(23, 2, 200000.00, N'Đạp xe qua bản làng Thái.'),
(23, 4, 350000.00, N'Trekking qua các đồi chè Mai Châu.'),
(23, 6, 310000.00, N'Tour khám phá văn hóa dân tộc Thái.'),
(23, 9, 280000.00, N'Workshop dệt thổ cẩm Thái.'),
-- Homestay 24: Cat Ba Green Homestay
(24, 3, 360000.00, N'Chèo kayak tại vịnh Lan Hạ.'),
(24, 4, 370000.00, N'Trekking qua rừng quốc gia Cát Bà.'),
(24, 7, 510000.00, N'Lặn ngắm san hô tại vịnh Cát Bà.'),
-- Homestay 25: Phong Nha Lake Homestay
(25, 3, 340000.00, N'Chèo thuyền trên sông Son.'),
(25, 4, 360000.00, N'Trekking khám phá động Phong Nha.'),
(25, 6, 320000.00, N'Tour khám phá văn hóa địa phương Phong Nha.'),
(25, 2, 210000.00, N'Đạp xe quanh làng quê Phong Nha.'),
-- Homestay 26: Con Dao Serenity Homestay
(26, 7, 520000.00, N'Lặn ngắm san hô tại bãi Đầm Trầu.'),
(26, 3, 350000.00, N'Chèo kayak tại biển Côn Đảo.'),
(26, 6, 330000.00, N'Tour khám phá lịch sử nhà tù Côn Đảo.'),
-- Homestay 27: Vung Tau Horizon Homestay
(27, 7, 500000.00, N'Lặn ngắm san hô tại bãi Trước.'),
(27, 3, 340000.00, N'Chèo kayak tại bãi Sau.'),
(27, 8, 300000.00, N'Tour ẩm thực với bánh khọt Vũng Tàu.'),
(27, 2, 220000.00, N'Đạp xe quanh bãi biển Vũng Tàu.'),
-- Homestay 28: Mui Ne Ocean Homestay
(28, 3, 350000.00, N'Chèo kayak tại bãi biển Mũi Né.'),
(28, 4, 360000.00, N'Trekking qua đồi cát Mũi Né.'),
(28, 8, 310000.00, N'Tour ẩm thực với lẩu thả Mũi Né.'),
-- Homestay 29: Ha Giang Cloud Homestay
(29, 4, 370000.00, N'Trekking qua cao nguyên đá Đồng Văn.'),
(29, 2, 230000.00, N'Đạp xe khám phá thung lũng Quản Bạ.'),
(29, 6, 320000.00, N'Tour khám phá văn hóa dân tộc H’Mông.'),
(29, 9, 290000.00, N'Workshop làm khăn thổ cẩm H’Mông.'),
-- Homestay 30: Ba Be Eco Homestay
(30, 3, 340000.00, N'Chèo thuyền trên hồ Ba Bể.'),
(30, 4, 350000.00, N'Trekking qua rừng Ba Bể.'),
(30, 6, 310000.00, N'Tour khám phá văn hóa dân tộc Tày.'),
(30, 5, 300000.00, N'Lớp học làm bánh cuốn Tày.'),
-- Homestay 31: Lang Son Mountain Homestay
(31, 2, 210000.00, N'Đạp xe quanh chợ Kỳ Lừa.'),
(31, 4, 360000.00, N'Trekking khám phá hang động Tam Thanh.'),
(31, 6, 320000.00, N'Tour khám phá văn hóa dân tộc Nùng.'),
(31, 8, 300000.00, N'Tour ẩm thực với vịt quay Lạng Sơn.'),
-- Homestay 32: Quy Nhon Beach Homestay
(32, 7, 510000.00, N'Lặn ngắm san hô tại đảo Kỳ Co.'),
(32, 3, 350000.00, N'Chèo kayak tại bãi biển Quy Nhơn.'),
(32, 8, 310000.00, N'Tour ẩm thực với bún chả cá Quy Nhơn.'),
-- Homestay 33: Phan Rang Desert Homestay
(33, 4, 360000.00, N'Trekking qua đồi cát Nam Cương.'),
(33, 6, 320000.00, N'Tour khám phá văn hóa Chăm tại tháp Po Klong Garai.'),
(33, 9, 280000.00, N'Workshop làm gốm Bàu Trúc.'),
(33, 8, 300000.00, N'Tour ẩm thực với bánh canh chả cá.'),
-- Homestay 34: Ca Mau Mangrove Homestay
(34, 3, 340000.00, N'Chèo thuyền qua rừng đước Đất Mũi.'),
(34, 6, 310000.00, N'Tour khám phá hệ sinh thái mũi Cà Mau.'),
(34, 8, 290000.00, N'Tour ẩm thực với lẩu mắm miền Tây.'),
-- Homestay 35: Hoa Binh Lake Homestay
(35, 3, 350000.00, N'Chèo thuyền trên hồ Hòa Bình.'),
(35, 4, 360000.00, N'Trekking qua bản làng dân tộc Mường.'),
(35, 6, 320000.00, N'Tour khám phá văn hóa dân tộc Mường.'),
(35, 5, 300000.00, N'Lớp học nấu món cá nướng Mường.'),
-- Homestay 36: Ben Tre Coconut Homestay
(36, 3, 340000.00, N'Chèo thuyền qua kênh rạch Bến Tre.'),
(36, 10, 250000.00, N'Trải nghiệm hái dừa và làm kẹo dừa.'),
(36, 8, 300000.00, N'Tour ẩm thực với bánh xèo dừa.'),
-- Homestay 37: Vinh Long River Homestay
(37, 3, 340000.00, N'Chèo thuyền qua chợ nổi Trà Ôn.'),
(37, 10, 260000.00, N'Trải nghiệm hái trái cây tại vườn.'),
(37, 8, 290000.00, N'Tour ẩm thực với hủ tiếu miền Tây.'),
(37, 5, 300000.00, N'Lớp học làm kẹo dừa Vĩnh Long.'),
-- Homestay 38: Lao Cai Highland Homestay
(38, 4, 370000.00, N'Trekking qua ruộng bậc thang bản Cát Cát.'),
(38, 2, 220000.00, N'Đạp xe quanh bản làng Sa Pa.'),
(38, 6, 320000.00, N'Tour khám phá văn hóa dân tộc H’Mông.'),
-- Homestay 39: Tay Ninh Ba Den Homestay
(39, 4, 360000.00, N'Trekking lên núi Bà Đen.'),
(39, 6, 310000.00, N'Tour khám phá thánh thất Cao Đài.'),
(39, 8, 300000.00, N'Tour ẩm thực với bánh tráng phơi sương.'),
(39, 2, 210000.00, N'Đạp xe quanh khu vực Tây Ninh.'),
-- Homestay 40: Nam Dinh Coastal Homestay
(40, 3, 350000.00, N'Chèo thuyền tại vườn quốc gia Xuân Thủy.'),
(40, 6, 320000.00, N'Tour khám phá văn hóa làng chài Nam Định.'),
(40, 8, 300000.00, N'Tour ẩm thực với cháo lươn Nam Định.'),
(40, 10, 250000.00, N'Trải nghiệm làm muối tại làng nghề.');
GO
CREATE TABLE ExperienceImage (
    image_id INT PRIMARY KEY IDENTITY(1,1),
    experience_id INT NOT NULL,
    image_url NVARCHAR(255) NOT NULL,
    status BIT DEFAULT 1,
    FOREIGN KEY (experience_id) REFERENCES Experiences(experience_id)
);
GO
INSERT INTO ExperienceImage (experience_id, image_url, status) VALUES
-- Homestay 1: Da Lat Dreamy Homestay
(1, 'images/cloud_hunting_0.jpg', 1), -- Tour săn mây
(1, 'images/cloud_hunting_1.jpg', 1),
(1, 'images/cloud_hunting_2.jpg', 1),
(2, 'images/cycling_0.jpg', 1), -- Đạp xe khám phá
(2, 'images/cycling_1.jpg', 1),
(2, 'images/cycling_2.jpg', 1),
(3, 'images/cooking_class_0.jpg', 1), -- Lớp học nấu ăn
(3, 'images/cooking_class_1.jpg', 1),
(3, 'images/cooking_class_2.jpg', 1),
(4, 'images/cultural_tour_0.jpg', 1), -- Tour văn hóa
(4, 'images/cultural_tour_1.jpg', 1),
(4, 'images/cultural_tour_2.jpg', 1),

-- Homestay 2: Pine Hill Homestay
(5, 'images/cloud_hunting_3.jpg', 1), -- Tour săn mây
(5, 'images/cloud_hunting_4.jpg', 1),
(5, 'images/cloud_hunting_5.jpg', 1),
(6, 'images/cycling_3.jpg', 1), -- Đạp xe khám phá
(6, 'images/cycling_4.jpg', 1),
(6, 'images/cycling_5.jpg', 1),
(7, 'images/handicraft_workshop_0.jpg', 1), -- Workshop thủ công
(7, 'images/handicraft_workshop_1.jpg', 1),
(7, 'images/handicraft_workshop_2.jpg', 1),

-- Homestay 3: Da Lat Blossom Homestay
(8, 'images/cloud_hunting_6.jpg', 1), -- Tour săn mây
(8, 'images/cloud_hunting_7.jpg', 1),
(8, 'images/cloud_hunting_8.jpg', 1),
(9, 'images/cooking_class_3.jpg', 1), -- Lớp học nấu ăn
(9, 'images/cooking_class_4.jpg', 1),
(9, 'images/cooking_class_5.jpg', 1),
(10, 'images/cultural_tour_3.jpg', 1), -- Tour văn hóa
(10, 'images/cultural_tour_4.jpg', 1),
(10, 'images/cultural_tour_5.jpg', 1),
(11, 'images/farm_tour_0.jpg', 1), -- Tour nông trại
(11, 'images/farm_tour_1.jpg', 1),
(11, 'images/farm_tour_2.jpg', 1),

-- Homestay 4: Misty Valley Homestay
(12, 'images/cloud_hunting_9.jpg', 1), -- Tour săn mây
(12, 'images/cloud_hunting_10.jpg', 1),
(12, 'images/cloud_hunting_11.jpg', 1),
(13, 'images/cycling_6.jpg', 1), -- Đạp xe khám phá
(13, 'images/cycling_7.jpg', 1),
(13, 'images/cycling_8.jpg', 1),
(14, 'images/handicraft_workshop_3.jpg', 1), -- Workshop thủ công
(14, 'images/handicraft_workshop_4.jpg', 1),
(14, 'images/handicraft_workshop_5.jpg', 1),

-- Homestay 5: Flower Garden Homestay
(15, 'images/cloud_hunting_12.jpg', 1), -- Tour săn mây
(15, 'images/cloud_hunting_13.jpg', 1),
(15, 'images/cloud_hunting_14.jpg', 1),
(16, 'images/cycling_9.jpg', 1), -- Đạp xe khám phá
(16, 'images/cycling_10.jpg', 1),
(16, 'images/cycling_11.jpg', 1),
(17, 'images/farm_tour_3.jpg', 1), -- Tour nông trại
(17, 'images/farm_tour_4.jpg', 1),
(17, 'images/farm_tour_5.jpg', 1),
(18, 'images/cultural_tour_6.jpg', 1), -- Tour văn hóa
(18, 'images/cultural_tour_7.jpg', 1),
(18, 'images/cultural_tour_8.jpg', 1),

-- Homestay 6: Da Lat Cozy Homestay
(19, 'images/cycling_12.jpg', 1), -- Đạp xe khám phá
(19, 'images/cycling_13.jpg', 1),
(19, 'images/cycling_14.jpg', 1),
(20, 'images/cooking_class_6.jpg', 1), -- Lớp học nấu ăn
(20, 'images/cooking_class_7.jpg', 1),
(20, 'images/cooking_class_8.jpg', 1),
(21, 'images/cultural_tour_9.jpg', 1), -- Tour văn hóa
(21, 'images/cultural_tour_10.jpg', 1),
(21, 'images/cultural_tour_11.jpg', 1),

-- Homestay 7: Starlight Homestay
(22, 'images/cloud_hunting_15.jpg', 1), -- Tour săn mây
(22, 'images/cloud_hunting_16.jpg', 1),
(22, 'images/cloud_hunting_17.jpg', 1),
(23, 'images/cycling_15.jpg', 1), -- Đạp xe khám phá
(23, 'images/cycling_16.jpg', 1),
(23, 'images/cycling_17.jpg', 1),
(24, 'images/handicraft_workshop_6.jpg', 1), -- Workshop thủ công
(24, 'images/handicraft_workshop_7.jpg', 1),
(24, 'images/handicraft_workshop_8.jpg', 1),
(25, 'images/farm_tour_6.jpg', 1), -- Tour nông trại
(25, 'images/farm_tour_7.jpg', 1),
(25, 'images/farm_tour_8.jpg', 1),

-- Homestay 8: Da Nang Ocean Homestay
(26, 'images/kayaking_0.jpg', 1), -- Chèo thuyền kayak
(26, 'images/kayaking_1.jpg', 1),
(26, 'images/kayaking_2.jpg', 1),
(27, 'images/snorkeling_0.jpg', 1), -- Lặn ngắm san hô
(27, 'images/snorkeling_1.jpg', 1),
(27, 'images/snorkeling_2.jpg', 1),
(28, 'images/food_tour_0.jpg', 1), -- Tour ẩm thực
(28, 'images/food_tour_1.jpg', 1),
(28, 'images/food_tour_2.jpg', 1),
(29, 'images/cultural_tour_12.jpg', 1), -- Tour văn hóa
(29, 'images/cultural_tour_13.jpg', 1),
(29, 'images/cultural_tour_14.jpg', 1),

-- Homestay 9: Han River Homestay
(30, 'images/kayaking_3.jpg', 1), -- Chèo thuyền kayak
(30, 'images/kayaking_4.jpg', 1),
(30, 'images/kayaking_5.jpg', 1),
(31, 'images/food_tour_3.jpg', 1), -- Tour ẩm thực
(31, 'images/food_tour_4.jpg', 1),
(31, 'images/food_tour_5.jpg', 1),
(32, 'images/cultural_tour_15.jpg', 1), -- Tour văn hóa
(32, 'images/cultural_tour_16.jpg', 1),
(32, 'images/cultural_tour_17.jpg', 1),
(33, 'images/cycling_18.jpg', 1), -- Đạp xe khám phá
(33, 'images/cycling_19.jpg', 1),
(33, 'images/cycling_20.jpg', 1),

-- Homestay 10: My Khe Beach Homestay
(34, 'images/snorkeling_3.jpg', 1), -- Lặn ngắm san hô
(34, 'images/snorkeling_4.jpg', 1),
(34, 'images/snorkeling_5.jpg', 1),
(35, 'images/kayaking_6.jpg', 1), -- Chèo thuyền kayak
(35, 'images/kayaking_7.jpg', 1),
(35, 'images/kayaking_8.jpg', 1),
(36, 'images/food_tour_6.jpg', 1), -- Tour ẩm thực
(36, 'images/food_tour_7.jpg', 1),
(36, 'images/food_tour_8.jpg', 1),

-- Homestay 11: Da Nang Sky Homestay
(37, 'images/cultural_tour_18.jpg', 1), -- Tour văn hóa
(37, 'images/cultural_tour_19.jpg', 1),
(37, 'images/cultural_tour_20.jpg', 1),
(38, 'images/food_tour_9.jpg', 1), -- Tour ẩm thực
(38, 'images/food_tour_10.jpg', 1),
(38, 'images/food_tour_11.jpg', 1),
(39, 'images/cycling_21.jpg', 1), -- Đạp xe khám phá
(39, 'images/cycling_22.jpg', 1),
(39, 'images/cycling_23.jpg', 1),
(40, 'images/kayaking_9.jpg', 1), -- Chèo thuyền kayak
(40, 'images/kayaking_10.jpg', 1),
(40, 'images/kayaking_11.jpg', 1),

-- Homestay 12: Sunset Bridge Homestay
(41, 'images/kayaking_12.jpg', 1), -- Chèo thuyền kayak
(41, 'images/kayaking_13.jpg', 1),
(41, 'images/kayaking_14.jpg', 1),
(42, 'images/food_tour_12.jpg', 1), -- Tour ẩm thực
(42, 'images/food_tour_13.jpg', 1),
(42, 'images/food_tour_14.jpg', 1),
(43, 'images/cultural_tour_21.jpg', 1), -- Tour văn hóa
(43, 'images/cultural_tour_22.jpg', 1),
(43, 'images/cultural_tour_23.jpg', 1),

-- Homestay 13: Coral Reef Homestay
(44, 'images/snorkeling_6.jpg', 1), -- Lặn ngắm san hô
(44, 'images/snorkeling_7.jpg', 1),
(44, 'images/snorkeling_8.jpg', 1),
(45, 'images/kayaking_15.jpg', 1), -- Chèo thuyền kayak
(45, 'images/kayaking_16.jpg', 1),
(45, 'images/kayaking_17.jpg', 1),
(46, 'images/food_tour_15.jpg', 1), -- Tour ẩm thực
(46, 'images/food_tour_16.jpg', 1),
(46, 'images/food_tour_17.jpg', 1),
(47, 'images/cycling_24.jpg', 1), -- Đạp xe khám phá
(47, 'images/cycling_25.jpg', 1),
(47, 'images/cycling_26.jpg', 1),

-- Homestay 14: Da Nang Green Homestay
(48, 'images/kayaking_18.jpg', 1), -- Chèo thuyền kayak
(48, 'images/kayaking_19.jpg', 1),
(48, 'images/kayaking_20.jpg', 1),
(49, 'images/cultural_tour_24.jpg', 1), -- Tour văn hóa
(49, 'images/cultural_tour_25.jpg', 1),
(49, 'images/cultural_tour_26.jpg', 1),
(50, 'images/food_tour_18.jpg', 1), -- Tour ẩm thực
(50, 'images/food_tour_19.jpg', 1),
(50, 'images/food_tour_20.jpg', 1),
(51, 'images/farm_tour_9.jpg', 1), -- Tour nông trại
(51, 'images/farm_tour_10.jpg', 1),
(51, 'images/farm_tour_11.jpg', 1),

-- Homestay 15: Hanoi Charm Homestay
(52, 'images/cycling_27.jpg', 1), -- Đạp xe khám phá
(52, 'images/cycling_28.jpg', 1),
(52, 'images/cycling_29.jpg', 1),
(53, 'images/cooking_class_9.jpg', 1), -- Lớp học nấu ăn
(53, 'images/cooking_class_10.jpg', 1),
(53, 'images/cooking_class_11.jpg', 1),
(54, 'images/cultural_tour_27.jpg', 1), -- Tour văn hóa
(54, 'images/cultural_tour_28.jpg', 1),
(54, 'images/cultural_tour_29.jpg', 1),
(55, 'images/food_tour_21.jpg', 1), -- Tour ẩm thực
(55, 'images/food_tour_22.jpg', 1),
(55, 'images/food_tour_23.jpg', 1),

-- Homestay 16: Old Gate Homestay
(56, 'images/cycling_30.jpg', 1), -- Đạp xe khám phá
(56, 'images/cycling_31.jpg', 1),
(56, 'images/cycling_32.jpg', 1),
(57, 'images/cultural_tour_30.jpg', 1), -- Tour văn hóa
(57, 'images/cultural_tour_31.jpg', 1),
(57, 'images/cultural_tour_32.jpg', 1),
(58, 'images/food_tour_24.jpg', 1), -- Tour ẩm thực
(58, 'images/food_tour_25.jpg', 1),
(58, 'images/food_tour_26.jpg', 1),

-- Homestay 17: Hoan Kiem Lake Homestay
(59, 'images/cycling_33.jpg', 1), -- Đạp xe khám phá
(59, 'images/cycling_34.jpg', 1),
(59, 'images/cycling_35.jpg', 1),
(60, 'images/cooking_class_12.jpg', 1), -- Lớp học nấu ăn
(60, 'images/cooking_class_13.jpg', 1),
(60, 'images/cooking_class_14.jpg', 1),
(61, 'images/cultural_tour_33.jpg', 1), -- Tour văn hóa
(61, 'images/cultural_tour_34.jpg', 1),
(61, 'images/cultural_tour_35.jpg', 1),
(62, 'images/food_tour_27.jpg', 1), -- Tour ẩm thực
(62, 'images/food_tour_28.jpg', 1),
(62, 'images/food_tour_29.jpg', 1),

-- Homestay 18: Hanoi Lotus Homestay
(63, 'images/cultural_tour_36.jpg', 1), -- Tour văn hóa
(63, 'images/cultural_tour_37.jpg', 1),
(63, 'images/cultural_tour_38.jpg', 1),
(64, 'images/handicraft_workshop_9.jpg', 1), -- Workshop thủ công
(64, 'images/handicraft_workshop_10.jpg', 1),
(64, 'images/handicraft_workshop_11.jpg', 1),
(65, 'images/cycling_36.jpg', 1), -- Đạp xe khám phá
(65, 'images/cycling_37.jpg', 1),
(65, 'images/cycling_38.jpg', 1),
(66, 'images/cooking_class_15.jpg', 1), -- Lớp học nấu ăn
(66, 'images/cooking_class_16.jpg', 1),
(66, 'images/cooking_class_17.jpg', 1),

-- Homestay 19: Tran Quoc Pagoda Homestay
(67, 'images/cycling_39.jpg', 1), -- Đạp xe khám phá
(67, 'images/cycling_40.jpg', 1),
(67, 'images/cycling_41.jpg', 1),
(68, 'images/cultural_tour_39.jpg', 1), -- Tour văn hóa
(68, 'images/cultural_tour_40.jpg', 1),
(68, 'images/cultural_tour_41.jpg', 1),
(69, 'images/food_tour_30.jpg', 1), -- Tour ẩm thực
(69, 'images/food_tour_31.jpg', 1),
(69, 'images/food_tour_32.jpg', 1),
(70, 'images/handicraft_workshop_12.jpg', 1), -- Workshop thủ công
(70, 'images/handicraft_workshop_13.jpg', 1),
(70, 'images/handicraft_workshop_14.jpg', 1),

-- Homestay 20: Hanoi Vintage Homestay
(71, 'images/cycling_42.jpg', 1), -- Đạp xe khám phá
(71, 'images/cycling_43.jpg', 1),
(71, 'images/cycling_44.jpg', 1),
(72, 'images/cooking_class_18.jpg', 1), -- Lớp học nấu ăn
(72, 'images/cooking_class_19.jpg', 1),
(72, 'images/cooking_class_20.jpg', 1),
(73, 'images/cultural_tour_42.jpg', 1), -- Tour văn hóa
(73, 'images/cultural_tour_43.jpg', 1),
(73, 'images/cultural_tour_44.jpg', 1),

-- Homestay 21: Phu Quoc Paradise Homestay
(74, 'images/snorkeling_9.jpg', 1), -- Lặn ngắm san hô
(74, 'images/snorkeling_10.jpg', 1),
(74, 'images/snorkeling_11.jpg', 1),
(75, 'images/kayaking_21.jpg', 1), -- Chèo thuyền kayak
(75, 'images/kayaking_22.jpg', 1),
(75, 'images/kayaking_23.jpg', 1),
(76, 'images/food_tour_33.jpg', 1), -- Tour ẩm thực
(76, 'images/food_tour_34.jpg', 1),
(76, 'images/food_tour_35.jpg', 1),
(77, 'images/farm_tour_12.jpg', 1), -- Tour nông trại
(77, 'images/farm_tour_13.jpg', 1),
(77, 'images/farm_tour_14.jpg', 1),

-- Homestay 22: Can Tho Garden Homestay
(78, 'images/kayaking_24.jpg', 1), -- Chèo thuyền kayak
(78, 'images/kayaking_25.jpg', 1),
(78, 'images/kayaking_26.jpg', 1),
(79, 'images/food_tour_36.jpg', 1), -- Tour ẩm thực
(79, 'images/food_tour_37.jpg', 1),
(79, 'images/food_tour_38.jpg', 1),
(80, 'images/farm_tour_15.jpg', 1), -- Tour nông trại
(80, 'images/farm_tour_16.jpg', 1),
(80, 'images/farm_tour_17.jpg', 1),
(81, 'images/cooking_class_21.jpg', 1), -- Lớp học nấu ăn
(81, 'images/cooking_class_22.jpg', 1),
(81, 'images/cooking_class_23.jpg', 1),

-- Homestay 23: Mai Chau Valley Homestay
(82, 'images/cycling_45.jpg', 1), -- Đạp xe khám phá
(82, 'images/cycling_46.jpg', 1),
(82, 'images/cycling_47.jpg', 1),
(83, 'images/trekking_0.jpg', 1), -- Trekking
(83, 'images/trekking_1.jpg', 1),
(83, 'images/trekking_2.jpg', 1),
(84, 'images/cultural_tour_45.jpg', 1), -- Tour văn hóa
(84, 'images/cultural_tour_46.jpg', 1),
(84, 'images/cultural_tour_47.jpg', 1),
(85, 'images/handicraft_workshop_15.jpg', 1), -- Workshop thủ công
(85, 'images/handicraft_workshop_16.jpg', 1),
(85, 'images/handicraft_workshop_17.jpg', 1),

-- Homestay 24: Cat Ba Green Homestay
(86, 'images/kayaking_27.jpg', 1), -- Chèo thuyền kayak
(86, 'images/kayaking_28.jpg', 1),
(86, 'images/kayaking_29.jpg', 1),
(87, 'images/trekking_3.jpg', 1), -- Trekking
(87, 'images/trekking_4.jpg', 1),
(87, 'images/trekking_5.jpg', 1),
(88, 'images/snorkeling_12.jpg', 1), -- Lặn ngắm san hô
(88, 'images/snorkeling_13.jpg', 1),
(88, 'images/snorkeling_14.jpg', 1),

-- Homestay 25: Phong Nha Lake Homestay
(89, 'images/kayaking_30.jpg', 1), -- Chèo thuyền kayak
(89, 'images/kayaking_31.jpg', 1),
(89, 'images/kayaking_32.jpg', 1),
(90, 'images/trekking_6.jpg', 1), -- Trekking
(90, 'images/trekking_7.jpg', 1),
(90, 'images/trekking_8.jpg', 1),
(91, 'images/cultural_tour_48.jpg', 1), -- Tour văn hóa
(91, 'images/cultural_tour_49.jpg', 1),
(91, 'images/cultural_tour_50.jpg', 1),
(92, 'images/cycling_48.jpg', 1), -- Đạp xe khám phá
(92, 'images/cycling_49.jpg', 1),
(92, 'images/cycling_50.jpg', 1),

-- Homestay 26: Con Dao Serenity Homestay
(93, 'images/snorkeling_15.jpg', 1), -- Lặn ngắm san hô
(93, 'images/snorkeling_16.jpg', 1),
(93, 'images/snorkeling_17.jpg', 1),
(94, 'images/kayaking_33.jpg', 1), -- Chèo thuyền kayak
(94, 'images/kayaking_34.jpg', 1),
(94, 'images/kayaking_35.jpg', 1),
(95, 'images/cultural_tour_51.jpg', 1), -- Tour văn hóa
(95, 'images/cultural_tour_52.jpg', 1),
(95, 'images/cultural_tour_53.jpg', 1),

-- Homestay 27: Vung Tau Horizon Homestay
(96, 'images/snorkeling_18.jpg', 1), -- Lặn ngắm san hô
(96, 'images/snorkeling_19.jpg', 1),
(96, 'images/snorkeling_20.jpg', 1),
(97, 'images/kayaking_36.jpg', 1), -- Chèo thuyền kayak
(97, 'images/kayaking_37.jpg', 1),
(97, 'images/kayaking_38.jpg', 1),
(98, 'images/food_tour_39.jpg', 1), -- Tour ẩm thực
(98, 'images/food_tour_40.jpg', 1),
(98, 'images/food_tour_41.jpg', 1),
(99, 'images/cycling_51.jpg', 1), -- Đạp xe khám phá
(99, 'images/cycling_52.jpg', 1),
(99, 'images/cycling_53.jpg', 1),

-- Homestay 28: Mui Ne Ocean Homestay
(100, 'images/kayaking_39.jpg', 1), -- Chèo thuyền kayak
(100, 'images/kayaking_40.jpg', 1),
(100, 'images/kayaking_41.jpg', 1),
(101, 'images/trekking_9.jpg', 1), -- Trekking
(101, 'images/trekking_10.jpg', 1),
(101, 'images/trekking_11.jpg', 1),
(102, 'images/food_tour_42.jpg', 1), -- Tour ẩm thực
(102, 'images/food_tour_43.jpg', 1),
(102, 'images/food_tour_44.jpg', 1),

-- Homestay 29: Ha Giang Cloud Homestay
(103, 'images/trekking_12.jpg', 1), -- Trekking
(103, 'images/trekking_13.jpg', 1),
(103, 'images/trekking_14.jpg', 1),
(104, 'images/cycling_54.jpg', 1), -- Đạp xe khám phá
(104, 'images/cycling_55.jpg', 1),
(104, 'images/cycling_56.jpg', 1),
(105, 'images/cultural_tour_54.jpg', 1), -- Tour văn hóa
(105, 'images/cultural_tour_55.jpg', 1),
(105, 'images/cultural_tour_56.jpg', 1),
(106, 'images/handicraft_workshop_18.jpg', 1), -- Workshop thủ công
(106, 'images/handicraft_workshop_19.jpg', 1),
(106, 'images/handicraft_workshop_20.jpg', 1),

-- Homestay 30: Ba Be Eco Homestay
(107, 'images/kayaking_42.jpg', 1), -- Chèo thuyền kayak
(107, 'images/kayaking_43.jpg', 1),
(107, 'images/kayaking_44.jpg', 1),
(108, 'images/trekking_15.jpg', 1), -- Trekking
(108, 'images/trekking_16.jpg', 1),
(108, 'images/trekking_17.jpg', 1),
(109, 'images/cultural_tour_57.jpg', 1), -- Tour văn hóa
(109, 'images/cultural_tour_58.jpg', 1),
(109, 'images/cultural_tour_59.jpg', 1),
(110, 'images/cooking_class_24.jpg', 1), -- Lớp học nấu ăn
(110, 'images/cooking_class_25.jpg', 1),
(110, 'images/cooking_class_26.jpg', 1),

-- Homestay 31: Lang Son Mountain Homestay
(111, 'images/cycling_57.jpg', 1), -- Đạp xe khám phá
(111, 'images/cycling_58.jpg', 1),
(111, 'images/cycling_59.jpg', 1),
(112, 'images/trekking_18.jpg', 1), -- Trekking
(112, 'images/trekking_19.jpg', 1),
(112, 'images/trekking_20.jpg', 1),
(113, 'images/cultural_tour_60.jpg', 1), -- Tour văn hóa
(113, 'images/cultural_tour_61.jpg', 1),
(113, 'images/cultural_tour_62.jpg', 1),
(114, 'images/food_tour_45.jpg', 1), -- Tour ẩm thực
(114, 'images/food_tour_46.jpg', 1),
(114, 'images/food_tour_47.jpg', 1),

-- Homestay 32: Quy Nhon Beach Homestay
(115, 'images/snorkeling_21.jpg', 1), -- Lặn ngắm san hô
(115, 'images/snorkeling_22.jpg', 1),
(115, 'images/snorkeling_23.jpg', 1),
(116, 'images/kayaking_45.jpg', 1), -- Chèo thuyền kayak
(116, 'images/kayaking_46.jpg', 1),
(116, 'images/kayaking_47.jpg', 1),
(117, 'images/food_tour_48.jpg', 1), -- Tour ẩm thực
(117, 'images/food_tour_49.jpg', 1),
(117, 'images/food_tour_50.jpg', 1),

-- Homestay 33: Phan Rang Desert Homestay
(118, 'images/trekking_21.jpg', 1), -- Trekking
(118, 'images/trekking_22.jpg', 1),
(118, 'images/trekking_23.jpg', 1),
(119, 'images/cultural_tour_63.jpg', 1), -- Tour văn hóa
(119, 'images/cultural_tour_64.jpg', 1),
(119, 'images/cultural_tour_65.jpg', 1),
(120, 'images/handicraft_workshop_21.jpg', 1), -- Workshop thủ công
(120, 'images/handicraft_workshop_22.jpg', 1),
(120, 'images/handicraft_workshop_23.jpg', 1),
(121, 'images/food_tour_51.jpg', 1), -- Tour ẩm thực
(121, 'images/food_tour_52.jpg', 1),
(121, 'images/food_tour_53.jpg', 1),

-- Homestay 34: Ca Mau Mangrove Homestay
(122, 'images/kayaking_48.jpg', 1), -- Chèo thuyền kayak
(122, 'images/kayaking_49.jpg', 1),
(122, 'images/kayaking_50.jpg', 1),
(123, 'images/cultural_tour_66.jpg', 1), -- Tour văn hóa
(123, 'images/cultural_tour_67.jpg', 1),
(123, 'images/cultural_tour_68.jpg', 1),
(124, 'images/food_tour_54.jpg', 1), -- Tour ẩm thực
(124, 'images/food_tour_55.jpg', 1),
(124, 'images/food_tour_56.jpg', 1),

-- Homestay 35: Hoa Binh Lake Homestay
(125, 'images/kayaking_51.jpg', 1), -- Chèo thuyền kayak
(125, 'images/kayaking_52.jpg', 1),
(125, 'images/kayaking_53.jpg', 1),
(126, 'images/trekking_24.jpg', 1), -- Trekking
(126, 'images/trekking_25.jpg', 1),
(126, 'images/trekking_26.jpg', 1),
(127, 'images/cultural_tour_69.jpg', 1), -- Tour văn hóa
(127, 'images/cultural_tour_70.jpg', 1),
(127, 'images/cultural_tour_71.jpg', 1),
(128, 'images/cooking_class_27.jpg', 1), -- Lớp học nấu ăn
(128, 'images/cooking_class_28.jpg', 1),
(128, 'images/cooking_class_29.jpg', 1),

-- Homestay 36: Ben Tre Coconut Homestay
(129, 'images/kayaking_54.jpg', 1), -- Chèo thuyền kayak
(129, 'images/kayaking_55.jpg', 1),
(129, 'images/kayaking_56.jpg', 1),
(130, 'images/farm_tour_18.jpg', 1), -- Tour nông trại
(130, 'images/farm_tour_19.jpg', 1),
(130, 'images/farm_tour_20.jpg', 1),
(131, 'images/food_tour_57.jpg', 1), -- Tour ẩm thực
(131, 'images/food_tour_58.jpg', 1),
(131, 'images/food_tour_59.jpg', 1),

-- Homestay 37: Vinh Long River Homestay
(132, 'images/kayaking_57.jpg', 1), -- Chèo thuyền kayak
(132, 'images/kayaking_58.jpg', 1),
(132, 'images/kayaking_59.jpg', 1),
(133, 'images/farm_tour_21.jpg', 1), -- Tour nông trại
(133, 'images/farm_tour_22.jpg', 1),
(133, 'images/farm_tour_23.jpg', 1),
(134, 'images/food_tour_60.jpg', 1), -- Tour ẩm thực
(134, 'images/food_tour_61.jpg', 1),
(134, 'images/food_tour_62.jpg', 1),
(135, 'images/cooking_class_30.jpg', 1), -- Lớp học nấu ăn
(135, 'images/cooking_class_31.jpg', 1),
(135, 'images/cooking_class_32.jpg', 1),

-- Homestay 38: Lao Cai Highland Homestay
(136, 'images/trekking_27.jpg', 1), -- Trekking
(136, 'images/trekking_28.jpg', 1),
(136, 'images/trekking_29.jpg', 1),
(137, 'images/cycling_60.jpg', 1), -- Đạp xe khám phá
(137, 'images/cycling_61.jpg', 1),
(137, 'images/cycling_62.jpg', 1),
(138, 'images/cultural_tour_72.jpg', 1), -- Tour văn hóa
(138, 'images/cultural_tour_73.jpg', 1),
(138, 'images/cultural_tour_74.jpg', 1),

-- Homestay 39: Tay Ninh Ba Den Homestay
(139, 'images/trekking_30.jpg', 1), -- Trekking
(139, 'images/trekking_31.jpg', 1),
(139, 'images/trekking_32.jpg', 1),
(140, 'images/cultural_tour_75.jpg', 1), -- Tour văn hóa
(140, 'images/cultural_tour_76.jpg', 1),
(140, 'images/cultural_tour_77.jpg', 1),
(141, 'images/food_tour_63.jpg', 1), -- Tour ẩm thực
(141, 'images/food_tour_64.jpg', 1),
(141, 'images/food_tour_65.jpg', 1),
(142, 'images/cycling_63.jpg', 1), -- Đạp xe khám phá
(142, 'images/cycling_64.jpg', 1),
(142, 'images/cycling_65.jpg', 1),

-- Homestay 40: Nam Dinh Coastal Homestay
(143, 'images/kayaking_60.jpg', 1), -- Chèo thuyền kayak
(143, 'images/kayaking_61.jpg', 1),
(143, 'images/kayaking_62.jpg', 1),
(144, 'images/cultural_tour_78.jpg', 1), -- Tour văn hóa
(144, 'images/cultural_tour_79.jpg', 1),
(144, 'images/cultural_tour_80.jpg', 1),
(145, 'images/food_tour_66.jpg', 1), -- Tour ẩm thực
(145, 'images/food_tour_67.jpg', 1),
(145, 'images/food_tour_68.jpg', 1),
(146, 'images/farm_tour_24.jpg', 1), -- Tour nông trại
(146, 'images/farm_tour_25.jpg', 1),
(146, 'images/farm_tour_26.jpg', 1);
GO
CREATE TABLE Conversations (
    conversation_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT,
    host_id INT,
    homestay_id INT,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (host_id) REFERENCES Users(user_id),
    FOREIGN KEY (homestay_id) REFERENCES Homestays(homestay_id)
);
CREATE TABLE Messages (
    message_id INT PRIMARY KEY IDENTITY(1,1),
    conversation_id INT,
    sender_id INT,
    content nvarchar(1000),
    sent_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (conversation_id) REFERENCES Conversations(conversation_id),
    FOREIGN KEY (sender_id) REFERENCES Users(user_id)
);