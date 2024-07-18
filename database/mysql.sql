use api;

-- bang DanhMuc
create table `categories`
(
	`id` int not null auto_increment primary key,
	`name` varchar(255) default null,
	`description` longtext default null,
	`image` longtext default null,
    `created_at` datetime,
	`updated_at` datetime
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;

-- bang ThuongHieu
create table `brands`
(
	`id` int not null auto_increment primary key,
	`name` varchar(255) default null,
	`description` longtext default null,
	`image` longtext default null,
    `created_at` datetime,
	`updated_at` datetime
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;

-- bang SanPham
create table `products`
(
	`id` int not null auto_increment primary key,
	`catid` int default null,
	`brandid` int default null,
	`name` varchar(255) default null,
	`description` longtext default null,
	`price` float default null,
    `discount` float default null,
	`status` bit(1) not null,
    `created_at` datetime,
	`updated_at` datetime,
	foreign key (`catid`) references `categories`(`id`) on delete cascade on update cascade,
	foreign key (`brandid`) references `brands`(`id`) on delete cascade on update cascade
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;

-- bang Anh
create table `images`
(
	`id` int not null auto_increment primary key,
	`proid` int not null,
	`image` longtext default null,
	foreign key (`proid`) references `products`(`id`) on delete cascade on update cascade
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;

-- bang DanhGia
create table `reviews`
(
	`id` int not null auto_increment primary key,
	`proid` int not null,
	`userid` bigint unsigned not null,
	`review` float default null,
	`comment` varchar(255) default null,
	`status` bit(1) not null,
    `created_at` datetime,
	`updated_at` datetime,
	foreign key (`proid`) references `products`(`id`) on delete cascade on update cascade,
	foreign key (`userid`) references `users`(`id`) on delete cascade on update cascade
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;

-- bang SanPhamYeuThich
create table `love_lists`
(
	`id` int not null auto_increment primary key,
	`userid` bigint unsigned not null,
	foreign key (`userid`) references `users`(`id`) on delete cascade on update cascade
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;

-- bang ChiTietSanPhamYeuThich
create table `love_list_details`
(
	`id` int not null auto_increment primary key,
	`loveid` int not null,
    `proid` int not null,
	`price` float default null,
    `discount` float default null,
	`status` bit(1) not null,
    `created_at` datetime,
	`updated_at` datetime,
	foreign key (`loveid`) references `love_lists`(`id`) on delete cascade on update cascade,
	foreign key (`proid`) references `products`(`id`) on delete cascade on update cascade
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;

-- bang GioHang
create table `carts`
(
	`id` int not null auto_increment primary key,
	`userid` bigint unsigned not null,
    `proid` int not null,
	`price` float default null,
    `total` float default null,
    `quantity` int not null,
	`status` bit(1) not null,
    `created_at` datetime,
	`updated_at` datetime,
	foreign key (`userid`) references `users`(`id`) on delete cascade on update cascade,
	foreign key (`proid`) references `products`(`id`) on delete cascade on update cascade
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;


-- bang HoaDonBan
create table `sale_bills`
(
	`id` int not null auto_increment primary key,
	`userid` bigint unsigned not null,
    `fullname` varchar(255) default null,
	`address` longtext default null,
	`email` varchar(100) default null,
	`phone` varchar(11) default null,
    `province` varchar(100) default null,
	`district` varchar(100) default null,
    `ward` varchar(100) default null,
    `street` varchar(100) default null,
    `zip` int,
    `moneytotal` float not null,
	`pay` float not null,
	`status` int,
	`created_at` datetime,
	`updated_at` datetime,
	foreign key (`userid`) references `users`(`id`)
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;

-- bang ChiTietHoaDonBan
create table `sale_bill_details`
(
	`id` int not null auto_increment primary key,
	`saleid` int not null,
	`name_product` varchar(255) default null,
	`size` varchar(20) default null,
	`color` varchar(20) default null,
	`quantity` int default null,
    `price` float default null,
    `discount` float default null,
	`total` float default null,
	`created_at` datetime,
	`updated_at` datetime,
	foreign key (`saleid`) references `sale_bills`(`id`) on delete cascade on update cascade
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;

-- bang NhaCungCap
create table `providers`
(
	`id` int not null auto_increment primary key,
	`name` varchar(250) default null,
    `adress` longtext default null,
    `email` varchar(250) default null,
    `phone` varchar(11) default null,
	`status` bit(1) not null,
    `created_at` datetime,
	`updated_at` datetime
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;

-- bang HoaDonNhap
create table `import_bills`
(
	`id` int not null auto_increment primary key,
	`provid` int not null,
	`userid` bigint unsigned not null,
    `moneytotal` float not null,
	`created_at` datetime,
	`updated_at` datetime,
	foreign key (`provid`) references `providers`(`id`) on delete cascade on update cascade,
	foreign key (`userid`) references `users`(`id`) on delete cascade on update cascade
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;

-- bang ChiTietHoaDonNhap
create table `import_bill_details`
(
	`id` int not null auto_increment primary key,
	`impid` int not null,
	`proid` int not null,
	`quantity` int not null,
    `price` float not null,
    `moneytotal` float default null,
    `discount` float default null,
	`created_at` datetime,
	`updated_at` datetime,
	foreign key (`impid`) references `import_bills`(`id`) on delete cascade on update cascade,
	foreign key (`proid`) references `products`(`id`) on delete cascade on update cascade
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;


create table `slides`
(
	`id` int not null auto_increment primary key,
	`title` varchar(100) default null,
	`description` longtext default null,
	`image` longtext default null,
	`created_at` datetime,
	`updated_at` datetime
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table `blogs`
(
	`id` int not null auto_increment primary key,
	`title` varchar(100) default null,
	`description` longtext default null,
	`image` longtext default null,
	`created_at` datetime,
	`updated_at` datetime
)engine=InnoDB default charset=utf8 collate=utf8_general_ci;