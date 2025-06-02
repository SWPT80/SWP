
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
-- bảng homestays: quản lý thông tin homestay
create table Homestays(
	homestay_id int primary key identity(1,1),
	host_id int,
	homestaysName nvarchar(100)  null,
	address nvarchar(255)  null,
	description text,
	status bit default 1
)
go
-- Chèn dữ liệu cho 40 homestays
INSERT INTO Homestays (host_id, homestaysName, address, description)
VALUES 
(11, N'Phu Quoc Sunset Homestay', N'123 Trần Hưng Đạo, Dương Đông, Phú Quốc, Kiên Giang', N'Homestay gần bãi biển Dài, view hoàng hôn tuyệt đẹp. Có dịch vụ lặn ngắm san hô và tour khám phá đảo.'),
(12, N'Can Tho Riverside Homestay', N'45 Ninh Kiều, Cái Khế, Cần Thơ', N'Homestay bên bờ sông Hậu, gần chợ nổi Cái Răng. Cung cấp tour du thuyền và xe đạp miễn phí.'),
(13, N'Mai Chau Eco Homestay', N'Bản Lác, Mai Châu, Hòa Bình', N'Homestay giữa thung lũng Mai Châu, trải nghiệm văn hóa dân tộc Thái. Có sân hiên và dịch vụ múa sạp truyền thống.'),
(14, N'Cat Ba Island Homestay', N'180 Núi Ngọc, Cát Bà, Hải Phòng', N'Homestay gần vịnh Lan Hạ, cung cấp tour kayak và leo núi. Có khu vực sinh hoạt chung và WiFi miễn phí.'),
(15, N'Phong Nha Village Homestay', N'Thôn Hà Lời, Phong Nha, Quảng Bình', N'Homestay gần Vườn Quốc gia Phong Nha, view núi. Hỗ trợ tour khám phá hang động và xe đạp miễn phí.'),
(16, N'Con Dao Ocean Homestay', N'12 Nguyễn Huệ, Côn Đảo, Bà Rịa - Vũng Tàu', N'Homestay gần bãi biển An Hải, cung cấp dịch vụ lặn ngắm san hô và tour khám phá rừng nguyên sinh.'),
(17, N'Vung Tau Coastal Homestay', N'150 Hạ Long, Phường 2, Vũng Tàu', N'Homestay gần bãi Sau, view biển. Cung cấp khu vực BBQ và dịch vụ thuê xe máy.'),
(18, N'Mui Ne Sandy Homestay', N'45 Nguyễn Đình Chiểu, Mũi Né, Phan Thiết, Bình Thuận', N'Homestay gần đồi cát bay, cung cấp dịch vụ lướt ván diều và tour jeep khám phá.'),
(19, N'Ha Giang Loop Homestay', N'Thôn Tha, Hà Giang', N'Homestay trên cung đường đèo Hà Giang, view cao nguyên đá. Hỗ trợ tour xe máy và trải nghiệm văn hóa dân tộc.'),
(20, N'Ba Be Lake Homestay', N'Bản Pác Ngòi, Bắc Kạn', N'Homestay bên hồ Ba Bể, cung cấp tour chèo thuyền và khám phá văn hóa dân tộc Tày.'),
(21, N'Hanoi Old Quarter Homestay', N'55 Hàng Bông, Hoàn Kiếm, Hà Nội', N'Homestay tại trung tâm phố cổ, gần chợ đêm. Cung cấp bữa sáng miễn phí và tour ẩm thực đường phố.'),
(22, N'Sapa Valley Homestay', N'Tả Van, Sa Pa, Lào Cai', N'Homestay giữa thung lũng Tả Van, view ruộng bậc thang. Có tour trekking và lớp học nấu ăn dân tộc.'),
(23, N'Ha Long Pearl Homestay', N'88 Hạ Long, Bãi Cháy, Quảng Ninh', N'Homestay gần bến tàu du lịch vịnh Hạ Long. Cung cấp dịch vụ thuê thuyền và WiFi miễn phí.'),
(24, N'Ninh Binh Lotus Homestay', N'Thôn Văn Lâm, Ninh Hải, Ninh Bình', N'Homestay gần Tràng An, view núi non hùng vĩ. Có xe đạp miễn phí và tour đò sông.'),
(25, N'Hue Heritage Homestay', N'10 Lê Lợi, TP Huế, Thừa Thiên Huế', N'Homestay gần kinh thành Huế, phong cách cổ điển. Cung cấp tour làng nghề và dịch vụ thuê xe đạp.'),
(26, N'Da Nang Skyline Homestay', N'45 Nguyễn Văn Linh, Hải Châu, Đà Nẵng', N'Homestay gần cầu Rồng, có sân thượng view thành phố. Hỗ trợ tour Hội An và Ngũ Hành Sơn.'),
(27, N'Hoi An Riverside Homestay', N'20 Nguyễn Hoàng, Hội An, Quảng Nam', N'Homestay bên sông Thu Bồn, gần chợ đêm. Cung cấp xe đạp miễn phí và lớp học làm đèn lồng.'),
(28, N'Nha Trang Seaside Homestay', N'12 Trần Quang Khải, Nha Trang, Khánh Hòa', N'Homestay gần bãi biển, cung cấp dịch vụ lặn biển và tour Vinpearl Land.'),
(29, N'Da Lat Flower Homestay', N'15 Nguyễn Trãi, TP Đà Lạt, Lâm Đồng', N'Homestay giữa vườn hoa, gần thung lũng Tình Yêu. Cung cấp tour săn mây và khu vực BBQ.'),
(30, N'Saigon Central Homestay', N'123 Lê Lợi, Quận 1, TP Hồ Chí Minh', N'Homestay gần nhà thờ Đức Bà, cung cấp tour khám phá địa đạo Củ Chi và WiFi miễn phí.'),
(31, N'Phu Quoc Paradise Homestay', N'45 Cửa Lấp, Dương Tơ, Phú Quốc, Kiên Giang', N'Homestay gần bãi Sao, cung cấp tour lặn ngắm san hô và dịch vụ thuê xe máy.'),
(32, N'Can Tho Garden Homestay', N'12 Bùi Hữu Nghĩa, Ninh Kiều, Cần Thơ', N'Homestay gần bến Ninh Kiều, có khu vườn xanh mát. Cung cấp tour chợ nổi và xe đạp miễn phí.'),
(33, N'Mai Chau Valley Homestay', N'Bản Pom Coọng, Mai Châu, Hòa Bình', N'Homestay giữa bản làng Thái, cung cấp trải nghiệm văn hóa và tour đạp xe khám phá.'),
(34, N'Cat Ba Green Homestay', N'45 Tùng Dinh, Cát Bà, Hải Phòng', N'Homestay gần rừng quốc gia Cát Bà, cung cấp tour kayak và leo núi.'),
(35, N'Phong Nha Lake Homestay', N'Thôn Cù Lạc, Phong Nha, Quảng Bình', N'Homestay gần hồ, view núi. Hỗ trợ tour động Phong Nha và dịch vụ thuê xe máy.'),
(36, N'Con Dao Serenity Homestay', N'8 Lê Văn Lương, Côn Đảo, Bà Rịa - Vũng Tàu', N'Homestay gần bãi Đầm Trầu, cung cấp tour khám phá đảo và lặn ngắm san hô.'),
(37, N'Vung Tau Horizon Homestay', N'88 Thùy Vân, Phường 2, Vũng Tàu', N'Homestay gần bãi Trước, view biển. Cung cấp khu vực BBQ và WiFi miễn phí.'),
(38, N'Mui Ne Ocean Homestay', N'78 Huỳnh Thúc Kháng, Mũi Né, Phan Thiết, Bình Thuận', N'Homestay gần bãi biển, cung cấp tour đồi cát và lướt ván.'),
(39, N'Ha Giang Cloud Homestay', N'Thôn Lùng Tám, Quản Bạ, Hà Giang', N'Homestay giữa núi non, view thung lũng. Hỗ trợ tour xe máy khám phá cao nguyên đá.'),
(40, N'Ba Be Eco Homestay', N'Bản Bó Lù, Ba Bể, Bắc Kạn', N'Homestay bên hồ Ba Bể, cung cấp tour chèo thuyền và trải nghiệm văn hóa dân tộc Tày.'),
(41, N'Lang Son Mountain Homestay', N'Thôn Khuổi Ky, Đồng Đăng, Lạng Sơn', N'Homestay giữa núi rừng Đông Bắc, gần chợ Kỳ Lừa. Hỗ trợ tour khám phá hang động và văn hóa dân tộc Nùng.'),
(42, N'Quy Nhon Beach Homestay', N'45 Nguyễn Huệ, TP Quy Nhơn, Bình Định', N'Homestay gần bãi biển Quy Nhơn, view biển. Cung cấp tour đảo Kỳ Co và dịch vụ thuê xe máy.'),
(43, N'Phan Rang Desert Homestay', N'Thôn Mỹ Nghiệp, Ninh Hải, Ninh Thuận', N'Homestay gần làng gốm Bàu Trúc và đồi cát Nam Cương. Hỗ trợ tour khám phá văn hóa Chăm.'),
(44, N'Ca Mau Mangrove Homestay', N'Thôn Tân Thuận, Đất Mũi, Cà Mau', N'Homestay giữa rừng đước Đất Mũi, gần mũi Cà Mau. Cung cấp tour chèo xuồng và khám phá hệ sinh thái.'),
(45, N'Hoa Binh Lake Homestay', N'Thôn Ngòi Hoa, Tân Lạc, Hòa Bình', N'Homestay bên hồ Hòa Bình, view núi non. Có tour chèo thuyền và trải nghiệm văn hóa dân tộc Mường.'),
(46, N'Ben Tre Coconut Homestay', N'Xã Tân Thạch, Châu Thành, Bến Tre', N'Homestay giữa vườn dừa, gần sông Mekong. Cung cấp tour chèo thuyền khám phá kênh rạch và làm bánh dân gian.'),
(47, N'Vinh Long River Homestay', N'45 An Bình, TP Vĩnh Long, Vĩnh Long', N'Homestay bên sông Cổ Chiên, gần chợ nổi Trà Ôn. Hỗ trợ tour khám phá miền Tây và xe đạp miễn phí.'),
(48, N'Lao Cai Highland Homestay', N'Bản Cát Cát, Sa Pa, Lào Cai', N'Homestay giữa bản Cát Cát, view ruộng bậc thang. Có tour trekking và trải nghiệm văn hóa dân tộc H’Mông.'),
(49, N'Tay Ninh Ba Den Homestay', N'Thôn Ninh Trung, TP Tây Ninh', N'Homestay gần núi Bà Đen, cung cấp tour cáp treo và khám phá thánh thất Cao Đài.'),
(50, N'Nam Dinh Coastal Homestay', N'Thị trấn Quất Lâm, Giao Thủy, Nam Định', N'Homestay gần biển Quất Lâm, cung cấp tour khám phá vườn quốc gia Xuân Thủy và văn hóa địa phương.');
go

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
create table ServiceType(
    type_id int primary key identity(1,1),
    typeName nvarchar(100)
);
go
INSERT INTO ServiceType (typeName)
VALUES 
(N'Bữa sáng miễn phí'),
(N'Cho thuê xe máy'),
(N'Cho thuê xe đạp'),
(N'Tour du lịch địa phương'),
(N'Đưa đón sân bay'),
(N'Dịch vụ giặt ủi'),
(N'Nhà hàng tại chỗ'),
(N'WiFi miễn phí'),
(N'Khu vực BBQ'),
(N'Dịch vụ dọn phòng hàng ngày');
GO

-- bảng services: dịch vụ đi kèm của homestay
CREATE TABLE Services(
    service_id INT IDENTITY(1,1) PRIMARY KEY,
    homestay_id INT NOT NULL,
    type_id INT NOT NULL,
    priceTotal DECIMAL(10,2) DEFAULT 0 NULL,
    FOREIGN KEY (type_id) REFERENCES ServiceType(type_id),
    FOREIGN KEY (homestay_id) REFERENCES Homestays(homestay_id)
);
GO
INSERT INTO Services (homestay_id, type_id, priceTotal)
VALUES

-- Homestay 1: Phu Quoc Sunset Homestay
(1, 1, 45000.00), -- Bữa sáng miễn phí
(1, 2, 80000.00), -- Cho thuê xe máy
(1, 4, 180000.00), -- Tour du lịch địa phương
(1, 8, 0.00), -- WiFi miễn phí
(1, 9, 180000.00), -- Khu vực BBQ
-- Homestay 2: Can Tho Riverside Homestay
(2, 1, 45000.00), -- Bữa sáng miễn phí
(2, 3, 40000.00), -- Cho thuê xe đạp
(2, 4, 180000.00), -- Tour du lịch địa phương
(2, 8, 0.00), -- WiFi miễn phí
-- Homestay 3: Mai Chau Eco Homestay
(3, 1, 45000.00), -- Bữa sáng miễn phí
(3, 3, 40000.00), -- Cho thuê xe đạp
(3, 4, 180000.00), -- Tour du lịch địa phương
(3, 8, 0.00), -- WiFi miễn phí
(3, 10, 0.00), -- Dọn phòng hàng ngày
-- Homestay 4: Cat Ba Island Homestay
(4, 2, 80000.00), -- Cho thuê xe máy
(4, 4, 180000.00), -- Tour du lịch địa phương
(4, 8, 0.00), -- WiFi miễn phí
(4, 9, 180000.00), -- Khu vực BBQ
-- Homestay 5: Phong Nha Village Homestay
(5, 1, 45000.00), -- Bữa sáng miễn phí
(5, 3, 40000.00), -- Cho thuê xe đạp
(5, 4, 180000.00), -- Tour du lịch địa phương
(5, 8, 0.00), -- WiFi miễn phí
-- Homestay 6: Con Dao Ocean Homestay
(6, 1, 45000.00), -- Bữa sáng miễn phí
(6, 2, 80000.00), -- Cho thuê xe máy
(6, 4, 180000.00), -- Tour du lịch địa phương
(6, 8, 0.00), -- WiFi miễn phí
-- Homestay 7: Vung Tau Coastal Homestay
(7, 1, 45000.00), -- Bữa sáng miễn phí
(7, 2, 80000.00), -- Cho thuê xe máy
(7, 8, 0.00), -- WiFi miễn phí
(7, 9, 180000.00), -- Khu vực BBQ
-- Homestay 8: Mui Ne Sandy Homestay
(8, 1, 45000.00), -- Bữa sáng miễn phí
(8, 2, 80000.00), -- Cho thuê xe máy
(8, 4, 180000.00), -- Tour du lịch địa phương
(8, 8, 0.00), -- WiFi miễn phí
-- Homestay 9: Ha Giang Loop Homestay
(9, 2, 80000.00), -- Cho thuê xe máy
(9, 4, 180000.00), -- Tour du lịch địa phương
(9, 8, 0.00), -- WiFi miễn phí
(9, 10, 0.00), -- Dọn phòng hàng ngày
-- Homestay 10: Ba Be Lake Homestay
(10, 1, 45000.00), -- Bữa sáng miễn phí
(10, 3, 40000.00), -- Cho thuê xe đạp
(10, 4, 180000.00), -- Tour du lịch địa phương
(10, 8, 0.00), -- WiFi miễn phí
-- Homestay 11: Hanoi Old Quarter Homestay
(11, 1, 45000.00), -- Bữa sáng miễn phí
(11, 4, 180000.00), -- Tour du lịch địa phương
(11, 8, 0.00), -- WiFi miễn phí
(11, 10, 0.00), -- Dọn phòng hàng ngày
-- Homestay 12: Sapa Valley Homestay
(12, 1, 45000.00), -- Bữa sáng miễn phí
(12, 3, 40000.00), -- Cho thuê xe đạp
(12, 4, 180000.00), -- Tour du lịch địa phương
(12, 8, 0.00), -- WiFi miễn phí
-- Homestay 13: Ha Long Pearl Homestay
(13, 1, 45000.00), -- Bữa sáng miễn phí
(13, 2, 80000.00), -- Cho thuê xe máy
(13, 4, 180000.00), -- Tour du lịch địa phương
(13, 8, 0.00), -- WiFi miễn phí
-- Homestay 14: Ninh Binh Lotus Homestay
(14, 1, 45000.00), -- Bữa sáng miễn phí
(14, 3, 40000.00), -- Cho thuê xe đạp
(14, 4, 180000.00), -- Tour du lịch địa phương
(14, 8, 0.00), -- WiFi miễn phí
-- Homestay 15: Hue Heritage Homestay
(15, 1, 45000.00), -- Bữa sáng miễn phí
(15, 3, 40000.00), -- Cho thuê xe đạp
(15, 4, 180000.00), -- Tour du lịch địa phương
(15, 8, 0.00), -- WiFi miễn phí
-- Homestay 16: Da Nang Skyline Homestay
(16, 1, 45000.00), -- Bữa sáng miễn phí
(16, 2, 80000.00), -- Cho thuê xe máy
(16, 4, 180000.00), -- Tour du lịch địa phương
(16, 8, 0.00), -- WiFi miễn phí
-- Homestay 17: Hoi An Riverside Homestay
(17, 1, 45000.00), -- Bữa sáng miễn phí
(17, 3, 40000.00), -- Cho thuê xe đạp
(17, 4, 180000.00), -- Tour du lịch địa phương
(17, 8, 0.00), -- WiFi miễn phí
-- Homestay 18: Nha Trang Seaside Homestay
(18, 1, 45000.00), -- Bữa sáng miễn phí
(18, 2, 80000.00), -- Cho thuê xe máy
(18, 4, 180000.00), -- Tour du lịch địa phương
(18, 8, 0.00), -- WiFi miễn phí
-- Homestay 19: Da Lat Flower Homestay
(19, 1, 45000.00), -- Bữa sáng miễn phí
(19, 3, 40000.00), -- Cho thuê xe đạp
(19, 4, 180000.00), -- Tour du lịch địa phương
(19, 8, 0.00), -- WiFi miễn phí
(19, 9, 180000.00), -- Khu vực BBQ
-- Homestay 20: Saigon Central Homestay
(20, 1, 45000.00), -- Bữa sáng miễn phí
(20, 4, 180000.00), -- Tour du lịch địa phương
(20, 8, 0.00), -- WiFi miễn phí
(20, 10, 0.00), -- Dọn phòng hàng ngày
-- Homestay 21: Phu Quoc Paradise Homestay
(21, 1, 45000.00), -- Bữa sáng miễn phí
(21, 2, 80000.00), -- Cho thuê xe máy
(21, 4, 180000.00), -- Tour du lịch địa phương
(21, 8, 0.00), -- WiFi miễn phí
-- Homestay 22: Can Tho Garden Homestay
(22, 1, 45000.00), -- Bữa sáng miễn phí
(22, 3, 40000.00), -- Cho thuê xe đạp
(22, 4, 180000.00), -- Tour du lịch địa phương
(22, 8, 0.00), -- WiFi miễn phí
-- Homestay 23: Mai Chau Valley Homestay
(23, 1, 45000.00), -- Bữa sáng miễn phí
(23, 3, 40000.00), -- Cho thuê xe đạp
(23, 4, 180000.00), -- Tour du lịch địa phương
(23, 8, 0.00), -- WiFi miễn phí
-- Homestay 24: Cat Ba Green Homestay
(24, 2, 80000.00), -- Cho thuê xe máy
(24, 4, 180000.00), -- Tour du lịch địa phương
(24, 8, 0.00), -- WiFi miễn phí
(24, 9, 180000.00), -- Khu vực BBQ
-- Homestay 25: Phong Nha Lake Homestay
(25, 1, 45000.00), -- Bữa sáng miễn phí
(25, 2, 80000.00), -- Cho thuê xe máy
(25, 4, 180000.00), -- Tour du lịch địa phương
(25, 8, 0.00), -- WiFi miễn phí
-- Homestay 26: Con Dao Serenity Homestay
(26, 1, 45000.00), -- Bữa sáng miễn phí
(26, 2, 80000.00), -- Cho thuê xe máy
(26, 4, 180000.00), -- Tour du lịch địa phương
(26, 8, 0.00), -- WiFi miễn phí
-- Homestay 27: Vung Tau Horizon Homestay
(27, 1, 45000.00), -- Bữa sáng miễn phí
(27, 2, 80000.00), -- Cho thuê xe máy
(27, 8, 0.00), -- WiFi miễn phí
(27, 9, 180000.00), -- Khu vực BBQ
-- Homestay 28: Mui Ne Ocean Homestay
(28, 1, 45000.00), -- Bữa sáng miễn phí
(28, 2, 80000.00), -- Cho thuê xe máy
(28, 4, 180000.00), -- Tour du lịch địa phương
(28, 8, 0.00), -- WiFi miễn phí
-- Homestay 29: Ha Giang Cloud Homestay
(29, 2, 80000.00), -- Cho thuê xe máy
(29, 4, 180000.00), -- Tour du lịch địa phương
(29, 8, 0.00), -- WiFi miễn phí
(29, 10, 0.00), -- Dọn phòng hàng ngày
-- Homestay 30: Ba Be Eco Homestay
(30, 1, 45000.00), -- Bữa sáng miễn phí
(30, 3, 40000.00), -- Cho thuê xe đạp
(30, 4, 180000.00), -- Tour du lịch địa phương
(30, 8, 0.00), -- WiFi miễn phí
-- Homestay 31: Lang Son Mountain Homestay
(31, 1, 45000.00), -- Bữa sáng miễn phí
(31, 4, 180000.00), -- Tour du lịch địa phương
(31, 8, 0.00), -- WiFi miễn phí
(31, 10, 0.00), -- Dọn phòng hàng ngày
-- Homestay 32: Quy Nhon Beach Homestay
(32, 1, 45000.00), -- Bữa sáng miễn phí
(32, 2, 80000.00), -- Cho thuê xe máy
(32, 4, 180000.00), -- Tour du lịch địa phương
(32, 8, 0.00), -- WiFi miễn phí
-- Homestay 33: Phan Rang Desert Homestay
(33, 1, 45000.00), -- Bữa sáng miễn phí
(33, 4, 180000.00), -- Tour du lịch địa phương
(33, 8, 0.00), -- WiFi miễn phí
(33, 10, 0.00), -- Dọn phòng hàng ngày
-- Homestay 34: Ca Mau Mangrove Homestay
(34, 1, 45000.00), -- Bữa sáng miễn phí
(34, 3, 40000.00), -- Cho thuê xe đạp
(34, 4, 180000.00), -- Tour du lịch địa phương
(34, 8, 0.00), -- WiFi miễn phí
-- Homestay 35: Hoa Binh Lake Homestay
(35, 1, 45000.00), -- Bữa sáng miễn phí
(35, 3, 40000.00), -- Cho thuê xe đạp
(35, 4, 180000.00), -- Tour du lịch địa phương
(35, 8, 0.00), -- WiFi miễn phí
-- Homestay 36: Ben Tre Coconut Homestay
(36, 1, 45000.00), -- Bữa sáng miễn phí
(36, 3, 40000.00), -- Cho thuê xe đạp
(36, 4, 180000.00), -- Tour du lịch địa phương
(36, 8, 0.00), -- WiFi miễn phí
-- Homestay 37: Vinh Long River Homestay
(37, 1, 45000.00), -- Bữa sáng miễn phí
(37, 3, 40000.00), -- Cho thuê xe đạp
(37, 4, 180000.00), -- Tour du lịch địa phương
(37, 8, 0.00), -- WiFi miễn phí
-- Homestay 38: Lao Cai Highland Homestay
(38, 1, 45000.00), -- Bữa sáng miễn phí
(38, 3, 40000.00), -- Cho thuê xe đạp
(38, 4, 180000.00), -- Tour du lịch địa phương
(38, 8, 0.00), -- WiFi miễn phí
-- Homestay 39: Tay Ninh Ba Den Homestay
(39, 1, 45000.00), -- Bữa sáng miễn phí
(39, 4, 180000.00), -- Tour du lịch địa phương
(39, 8, 0.00), -- WiFi miễn phí
(39, 10, 0.00), -- Dọn phòng hàng ngày
-- Homestay 40: Nam Dinh Coastal Homestay
(40, 1, 45000.00), -- Bữa sáng miễn phí
(40, 2, 80000.00), -- Cho thuê xe máy
(40, 4, 180000.00), -- Tour du lịch địa phương
(40, 8, 0.00); -- WiFi miễn phí
GO


create table ServiceDetail(
	serviceDetail_id int primary key identity(1,1),
	type_id int foreign key (type_id) references ServiceType(type_id),
	serviceName nvarchar(100)  null,
	-- options nvarchar(255), --Tùy từng loại để có option riêng (vd: tàu: vip, thường ; đồ ăn: suất lớn,nhỏ)
	status bit default 1,
)
go
INSERT INTO ServiceDetail (type_id, serviceName, status)
VALUES
-- Type 1: Bữa sáng miễn phí
(1, N'Bữa sáng Việt Nam', 1),
(1, N'Bữa sáng kiểu Âu', 1),
(1, N'Bữa sáng chay', 1),
-- Type 2: Cho thuê xe máy
(2, N'Xe máy 110cc', 1),
(2, N'Xe máy 150cc', 1),
-- Type 3: Cho thuê xe đạp
(3, N'Xe đạp địa hình', 1),
(3, N'Xe đạp thành phố', 1),
-- Type 4: Tour du lịch địa phương
(4, N'Tour khám phá văn hóa', 1),
(4, N'Tour khám phá thiên nhiên', 1),
(4, N'Tour ẩm thực', 1),
-- Type 5: Đưa đón sân bay
(5, N'Đưa đón bằng xe 4 chỗ', 1),
(5, N'Đưa đón bằng xe 7 chỗ', 1),
-- Type 6: Dịch vụ giặt ủi
(6, N'Giặt ủi nhanh', 1),
(6, N'Giặt ủi tiêu chuẩn', 1),
-- Type 7: Nhà hàng tại chỗ
(7, N'Ẩm thực miền Trung', 1),
(7, N'Ẩm thực miền Bắc', 1),
(7, N'Ẩm thực miền Nam', 1),
-- Type 8: WiFi miễn phí
(8, N'WiFi tốc độ cao', 1),
(8, N'WiFi tiêu chuẩn', 1),
-- Type 9: Khu vực BBQ
(9, N'BBQ ngoài trời', 1),
(9, N'BBQ trong nhà', 1),
-- Type 10: Dịch vụ dọn phòng hàng ngày
(10, N'Dọn phòng tiêu chuẩn', 1),
(10, N'Dọn phòng cao cấp', 1);
GO

CREATE TABLE ServiceOption (
    option_id INT PRIMARY KEY IDENTITY(1,1),
    serviceDetail_id INT FOREIGN KEY REFERENCES ServiceDetail(serviceDetail_id),
    optionName NVARCHAR(100),
    price DECIMAL(10,2) null, --CHECK (price >= 0),
	service_imageURL varchar(max),
    status BIT DEFAULT 1
);
go

-- bảng này kiếm ảnh rồi chèn vào sau
INSERT INTO ServiceOption (serviceDetail_id, optionName, price, service_imageURL, status)
VALUES

-- ServiceDetail 1: Bữa sáng Việt Nam
(1, N'Tiêu chuẩn', 50000.00, 'https:--example.com-images/breakfast-vn-standard.jpg', 1),
(1, N'Cao cấp', 80000.00, 'https:--example.com-images/breakfast-vn-premium.jpg', 1),
-- ServiceDetail 2: Bữa sáng kiểu Âu
(2, N'Tiêu chuẩn', 60000.00, 'https:--example.com-images/breakfast-eu-standard.jpg', 1),
(2, N'Cao cấp', 90000.00, 'https:--example.com-images/breakfast-eu-premium.jpg', 1),
-- ServiceDetail 3: Bữa sáng chay
(3, N'Tiêu chuẩn', 45000.00, 'https:--example.com-images/breakfast-vegan-standard.jpg', 1),
-- ServiceDetail 4: Xe máy 110cc
(4, N'Nửa ngày', 80000.00, 'https:--example.com-images/motorbike-110cc-halfday.jpg', 1),
(4, N'Cả ngày', 150000.00, 'https:--example.com-images/motorbike-110cc-fullday.jpg', 1),
-- ServiceDetail 5: Xe máy 150cc
(5, N'Nửa ngày', 100000.00, 'https:--example.com-images/motorbike-150cc-halfday.jpg', 1),
(5, N'Cả ngày', 180000.00, 'https:--example.com-images/motorbike-150cc-fullday.jpg', 1),
-- ServiceDetail 6: Xe đạp địa hình
(6, N'Nửa ngày', 50000.00, 'https:--example.com-images/bicycle-mountain-halfday.jpg', 1),
(6, N'Cả ngày', 90000.00, 'https:--example.com-images/bicycle-mountain-fullday.jpg', 1),
-- ServiceDetail 7: Xe đạp thành phố
(7, N'Nửa ngày', 40000.00, 'https:--example.com-images/bicycle-city-halfday.jpg', 1),
(7, N'Cả ngày', 70000.00, 'https:--example.com-images/bicycle-city-fullday.jpg', 1),
-- ServiceDetail 8: Tour khám phá văn hóa
(8, N'Nửa ngày', 200000.00, 'https:--example.com-images/tour-culture-halfday.jpg', 1),
(8, N'Cả ngày', 350000.00, 'https:--example.com-images/tour-culture-fullday.jpg', 1),
-- ServiceDetail 9: Tour khám phá thiên nhiên
(9, N'Nửa ngày', 250000.00, 'https:--example.com-images/tour-nature-halfday.jpg', 1),
(9, N'Cả ngày', 400000.00, 'https:--example.com-images/tour-nature-fullday.jpg', 1),
-- ServiceDetail 10: Tour ẩm thực
(10, N'Nửa ngày', 180000.00, 'https:--example.com-images/tour-food-halfday.jpg', 1),
(10, N'Cả ngày', 300000.00, 'https:--example.com-images/tour-food-fullday.jpg', 1),
-- ServiceDetail 11: Đưa đón bằng xe 4 chỗ
(11, N'Một chiều', 300000.00, 'https:--example.com-images/shuttle-4seater-oneway.jpg', 1),
(11, N'Khứ hồi', 550000.00, 'https:--example.com-images/shuttle-4seater-roundtrip.jpg', 1),
-- ServiceDetail 12: Đưa đón bằng xe 7 chỗ
(12, N'Một chiều', 400000.00, 'https:--example.com-images/shuttle-7seater-oneway.jpg', 1),
(12, N'Khứ hồi', 700000.00, 'https:--example.com-images/shuttle-7seater-roundtrip.jpg', 1),
-- ServiceDetail 13: Giặt ủi nhanh
(13, N'1kg', 30000.00, 'https:--example.com-images/laundry-quick-1kg.jpg', 1),
(13, N'3kg', 80000.00, 'https:--example.com-images/laundry-quick-3kg.jpg', 1),
-- ServiceDetail 14: Giặt ủi tiêu chuẩn
(14, N'1kg', 20000.00, 'https:--example.com-images/laundry-standard-1kg.jpg', 1),
(14, N'3kg', 50000.00, 'https:--example.com-images/laundry-standard-3kg.jpg', 1),
-- ServiceDetail 15: Ẩm thực miền Trung
(15, N'Suất ăn', 100000.00, 'https:--example.com-images/food-central-meal.jpg', 1),
(15, N'Tiệc buffet', 250000.00, 'https:--example.com-images/food-central-buffet.jpg', 1),
-- ServiceDetail 16: Ẩm thực miền Bắc
(16, N'Suất ăn', 90000.00, 'https:--example.com-images/food-north-meal.jpg', 1),
(16, N'Tiệc buffet', 230000.00, 'https:--example.com-images/food-north-buffet.jpg', 1),
-- ServiceDetail 17: Ẩm thực miền Nam
(17, N'Suất ăn', 95000.00, 'https:--example.com-images/food-south-meal.jpg', 1),
(17, N'Tiệc buffet', 240000.00, 'https:--example.com-images/food-south-buffet.jpg', 1),
-- ServiceDetail 18: WiFi tốc độ cao
(18, N'1 ngày', 0.00, 'https:--example.com-images/wifi-highspeed-1day.jpg', 1),
-- ServiceDetail 19: WiFi tiêu chuẩn
(19, N'1 ngày', 0.00, 'https:--example.com-images/wifi-standard-1day.jpg', 1),
-- ServiceDetail 20: BBQ ngoài trời
(20, N'Tiêu chuẩn', 200000.00, 'https:--example.com-images/bbq-outdoor-standard.jpg', 1),
(20, N'Cao cấp', 350000.00, 'https:--example.com-images/bbq-outdoor-premium.jpg', 1),
-- ServiceDetail 21: BBQ trong nhà
(21, N'Tiêu chuẩn', 180000.00, 'https:--example.com-images/bbq-indoor-standard.jpg', 1),
(21, N'Cao cấp', 320000.00, 'https:--example.com-images/bbq-indoor-premium.jpg', 1),
-- ServiceDetail 22: Dọn phòng tiêu chuẩn
(22, N'1 lần-ngày', 0.00, 'https:--example.com-images/cleaning-standard.jpg', 1),
-- ServiceDetail 23: Dọn phòng cao cấp
(23, N'2 lần-ngày', 50000.00, 'https:--example.com-images/cleaning-premium.jpg', 1);
GO
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
create table BookingServices (
    booking_id int not null,
    option_id int not null,
    quantity int not null check (quantity > 0),
    primary key (booking_id, option_id),
    foreign key (booking_id) references Bookings(booking_id),
    foreign key (option_id) references ServiceOption(option_id)
)
go

INSERT INTO BookingServices (booking_id, option_id, quantity)
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
    message text  null,
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
    comment text,
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
    option_id INT,
    rating INT NULL CHECK (rating BETWEEN 1 AND 5),
    comment NVARCHAR(MAX),
    FOREIGN KEY (review_id) REFERENCES Reviews(review_id),
    FOREIGN KEY (option_id) REFERENCES ServiceOption(option_id)
)
GO

INSERT INTO ReviewService (review_id, option_id, rating, comment)
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
    description text  null,
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
(1, 'images/image_400.jpg', 'View hoàng hôn tuyệt đẹp từ Phu Quoc Sunset Homestay'),
(2, 'images/image_401.jpg', 'Cảnh sông Hậu tại Can Tho Riverside Homestay'),
(3, 'images/image_402.jpg', 'Thung lũng Mai Châu từ Mai Chau Eco Homestay'),
(4, 'images/image_403.jpg', 'Vịnh Lan Hạ gần Cat Ba Island Homestay'),
(5, 'images/image_404.jpg', 'View núi non tại Phong Nha Village Homestay'),
(6, 'images/image_405.jpg', 'Bãi biển An Hải từ Con Dao Ocean Homestay'),
(7, 'images/image_406.jpg', 'Bãi Sau Vũng Tàu từ Vung Tau Coastal Homestay'),
(8, 'images/image_407.jpg', 'Đồi cát bay gần Mui Ne Sandy Homestay'),
(9, 'images/image_408.jpg', 'Cao nguyên đá từ Ha Giang Loop Homestay'),
(10, 'images/image_409.jpg', 'Hồ Ba Bể từ Ba Be Lake Homestay'),
(11, 'images/image_410.jpg', 'Phố cổ Hà Nội từ Hanoi Old Quarter Homestay'),
(12, 'images/image_411.jpg', 'Ruộng bậc thang Tả Van tại Sapa Valley Homestay'),
(13, 'images/image_412.jpg', 'Vịnh Hạ Long từ Ha Long Pearl Homestay'),
(14, 'images/image_413.jpg', 'Cảnh núi non Tràng An từ Ninh Binh Lotus Homestay'),
(15, 'images/image_414.jpg', 'Phong cách cổ điển tại Hue Heritage Homestay'),
(16, 'images/image_415.jpg', 'View thành phố từ sân thượng Da Nang Skyline Homestay'),
(17, 'images/image_416.jpg', 'Sông Thu Bồn từ Hoi An Riverside Homestay'),
(18, 'images/image_417.jpg', 'Bãi biển Nha Trang từ Nha Trang Seaside Homestay'),
(19, 'images/image_418.jpg', 'Vườn hoa tại Da Lat Flower Homestay'),
(20, 'images/image_419.jpg', 'Gần nhà thờ Đức Bà tại Saigon Central Homestay'),
(21, 'images/image_420.jpg', 'Bãi Sao từ Phu Quoc Paradise Homestay'),
(22, 'images/image_421.jpg', 'Khu vườn xanh mát tại Can Tho Garden Homestay'),
(23, 'images/image_422.jpg', 'Bản làng Thái từ Mai Chau Valley Homestay'),
(24, 'images/image_423.jpg', 'Rừng quốc gia Cát Bà từ Cat Ba Green Homestay'),
(25, 'images/image_424.jpg', 'Hồ và núi non tại Phong Nha Lake Homestay'),
(26, 'images/image_425.jpg', 'Bãi Đầm Trầu từ Con Dao Serenity Homestay'),
(27, 'images/image_426.jpg', 'Bãi Trước từ Vung Tau Horizon Homestay'),
(28, 'images/image_427.jpg', 'Bãi biển Mũi Né từ Mui Ne Ocean Homestay'),
(29, 'images/image_428.jpg', 'Thung lũng từ Ha Giang Cloud Homestay'),
(30, 'images/image_429.jpg', 'Hồ Ba Bể từ Ba Be Eco Homestay'),
(31, 'images/image_430.jpg', 'Núi rừng Đông Bắc từ Lang Son Mountain Homestay'),
(32, 'images/image_431.jpg', 'Bãi biển Quy Nhơn từ Quy Nhon Beach Homestay'),
(33, 'images/image_432.jpg', 'Đồi cát Nam Cương từ Phan Rang Desert Homestay'),
(34, 'images/image_433.jpg', 'Rừng đước Đất Mũi từ Ca Mau Mangrove Homestay'),
(35, 'images/image_434.jpg', 'Hồ Hòa Bình từ Hoa Binh Lake Homestay'),
(36, 'images/image_435.jpg', 'Vườn dừa tại Ben Tre Coconut Homestay'),
(37, 'images/image_436.jpg', 'Sông Cổ Chiên từ Vinh Long River Homestay'),
(38, 'images/image_437.jpg', 'Bản Cát Cát từ Lao Cai Highland Homestay'),
(39, 'images/image_438.jpg', 'Núi Bà Đen từ Tay Ninh Ba Den Homestay'),
(40, 'images/image_439.jpg', 'Biển Quất Lâm từ Nam Dinh Coastal Homestay');
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
(1, 'R01', 'images/image_0.jpg', 'Phòng Standard với view biển tại Phu Quoc Sunset'),
(1, 'R02', 'images/image_1.jpg', 'Phòng Standard thoáng mát tại Phu Quoc Sunset'),
(1, 'R03', 'images/image_2.jpg', 'Phòng Deluxe sang trọng tại Phu Quoc Sunset'),
(1, 'R04', 'images/image_3.jpg', 'Phòng Deluxe với ban công tại Phu Quoc Sunset'),
(1, 'R05', 'images/image_4.jpg', 'Phòng Family rộng rãi tại Phu Quoc Sunset'),
(1, 'R06', 'images/image_5.jpg', 'Phòng Family tiện nghi tại Phu Quoc Sunset'),
(1, 'R07', 'images/image_6.jpg', 'Phòng Dormitory thoải mái tại Phu Quoc Sunset'),
(1, 'R08', 'images/image_7.jpg', 'Phòng Dormitory tiết kiệm tại Phu Quoc Sunset'),
(1, 'R09', 'images/image_8.jpg', 'Phòng Suite cao cấp tại Phu Quoc Sunset'),
(1, 'R10', 'images/image_9.jpg', 'Phòng Suite view hoàng hôn tại Phu Quoc Sunset'),
-- Homestay 2: Can Tho Riverside Homestay
(2, 'R01', 'images/image_10.jpg', 'Phòng Standard view sông tại Can Tho Riverside'),
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
    FOREIGN KEY (service_id) REFERENCES Services(service_id)
);
go
INSERT INTO Reports (user_id, receiver_id, homestay_id, room_number, service_id, report_type, title, description, status)
VALUES

-- 1
(6, 1, 1, 'R01', NULL, 'Room Issue', N'Phòng có mùi khó chịu', N'Phòng A100 cần được vệ sinh kỹ hơn.', 'pending'),
-- 2
(9, 2, 2, NULL, 1, 'Service Issue', N'Dịch vụ tour không đúng lịch', N'Tour du lịch đặt không đúng thời gian cam kết.', 'pending'),
-- 3
(12, 1, 3, 'R02', NULL, 'Room Issue', N'Điều hòa không mát', N'Điều hòa trong phòng C105 không hoạt động.', 'pending'),
-- 4
(14, 2, 4, NULL, 3, 'Service Issue', N'Dịch vụ đồ ăn chậm', N'Dịch vụ đồ ăn đến muộn so với giờ đặt.', 'pending'),
-- 5
(17, 1, 5, NULL, NULL, 'Homestay Issue', N'Internet yếu', N'Mạng wifi trong homestay rất yếu và thường xuyên mất kết nối.', 'pending'),
-- 6
(18, 2, 6, 'R01', NULL, 'Room Issue', N'Phòng bị ồn', N'Phòng F109 có tiếng ồn từ bên ngoài.', 'pending'),
-- 7
(7, 1, 7, NULL, 2, 'Service Issue', N'Dịch vụ đặt xe không đúng giờ', N'Tài xế đặt xe đến trễ.', 'pending'),
-- 8
(10, 2, 8, 'R02', NULL, 'Room Issue', N'Phòng có mùi ẩm mốc', N'Phòng H104 có mùi ẩm mốc cần xử lý.', 'pending'),
-- 9
(15, 1, 9, NULL, NULL, 'Homestay Issue', N'Khu vực hồ bơi bẩn', N'Hồ bơi không được vệ sinh thường xuyên.', 'pending'),
-- 10
(11, 2, 10, NULL, 3, 'Service Issue', N'Dịch vụ đồ ăn không ngon', N'Chất lượng đồ ăn không đạt yêu cầu.', 'pending'),

-- 11
(6, 1, 1, 'R01', NULL, 'Room Issue', N'Rèm cửa hỏng', N'Rèm cửa phòng A102 không thể kéo lên.', 'pending'),
-- 12
(9, 2, 2, NULL, 2, 'Service Issue', N'Taxi đặt không đến', N'Taxi đã đặt không đến đúng giờ.', 'pending'),
-- 13
(12, 1, 3, 'R01', NULL, 'Room Issue', N'Đèn phòng hỏng', N'Đèn phòng C106 không sáng.', 'pending'),
-- 14
(14, 2, 4, NULL, 1, 'Service Issue', N'Tour bị hủy đột ngột', N'Tour du lịch bị hủy mà không có thông báo trước.', 'pending'),
-- 15
(17, 1, 5, NULL, NULL, 'Homestay Issue', N'Chỗ đậu xe không đủ', N'Chỗ đậu xe trong homestay rất hạn chế.', 'pending'),
-- 16
(18, 2, 6, 'R02', NULL, 'Room Issue', N'Giường ngủ không thoải mái', N'Giường trong phòng F107 cần được thay mới.', 'pending'),
-- 17
(7, 1, 7, NULL, 3, 'Service Issue', N'Dịch vụ đồ ăn giao sai', N'Đồ ăn giao không đúng với đơn đã đặt.', 'pending'),
-- 18
(10, 2, 8, 'R01', NULL, 'Room Issue', N'Phòng bị hư thiết bị vệ sinh', N'Bồn cầu phòng H102 bị hỏng.', 'pending'),
-- 19
(15, 1, 9, NULL, NULL, 'Homestay Issue', N'Âm thanh quá lớn', N'Âm thanh ở homestay quá to làm ảnh hưởng đến giấc ngủ.', 'pending'),
-- 20
(11, 2, 10, 'R01', NULL, 'Room Issue', N'Khóa cửa hỏng', N'Khóa cửa phòng J102 không hoạt động.', 'pending');

