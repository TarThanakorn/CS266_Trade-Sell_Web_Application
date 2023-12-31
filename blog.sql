-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2023 at 07:16 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `desc` varchar(1000) NOT NULL,
  `img` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL,
  `uid` int(11) NOT NULL,
  `cat` varchar(45) DEFAULT NULL,
  `price` varchar(10) NOT NULL,
  `contact` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `desc`, `img`, `date`, `uid`, `cat`, `price`, `contact`) VALUES
(69, 'กีต้าร์และแอมป์ขยายเสียง', '<p>กีต้าร์เด็กแนวร็อคพร้อมแอมป์ขยายเสียง ตู้เป็นกระดาษ ใช้ได้จริง</p>', '1701792357848_16805.png', '2023-12-05 23:05:57', 15, 'music', '450', '084-545-6464'),
(70, 'กลองไฟฟ้า Roland', '<p>Roland TD-4 (กลองพับได้) ใส่กระเดื่องคู่ได้ สภาพ 90%</p>', '1701792971221_98303.png', '2023-12-05 23:16:11', 15, 'music', '5000', '084-545-6464'),
(71, 'Huawei matebook 16s มือสอง', '<p>Huawei matebook 16S ประกันถึง 11/05/2025</p>', '1701793109235_48150.png', '2023-12-05 23:18:29', 15, 'electronic', '35000', '084-545-6464'),
(73, 'LED Acer ED322Q 32นิ้ว สภาพดีใช้น้อย ราคาถูกๆครับ', '<p>ใช้งานได้ปรกติ ไม่มีเดท ไบร์ท ใช้ทำงาน เรียนมีลำโพงในตัว</p>', '1701793866596_107006.png', '2023-12-05 23:31:06', 15, 'electronic', '4200', '084-545-6464'),
(77, 'เครื่องสำอางมือ2!!!!', '<p>เครื่องสำอางมือ2 ลิป</p>', '1701795457676_70620.png', '2023-12-05 23:57:37', 15, 'health', '30', '084-545-6464'),
(78, 'โซฟาเดี่ยวไม้แท้ทรงเรโทร', '<p>สภาพสวยสมบูรณ์แทบไม่ได้ใช้ ไม่มีรอยขาดหรือคราบ เอาไปไม่ต้องทำอะไร บ้านไม่เลี้ยงสัตว์หรือสูบบุหรี่ กว่า 70cm </p>', '1701795886420_37041.png', '2023-12-06 00:04:46', 15, 'furniture', '2500', '084-545-6464'),
(79, 'เสื้อ lacoste', '<p>เสื้อ lacoste แขนยาว สีขาว สวยเหมือนใหม่ ไม่เหลือง ไม่มีคาบใดๆ ผ้าสบาย คุ้มค่า วัดรอบอก 45-46นิ้ว ยาว 29นิ้ว</p>', '1701796521192_44570.png', '2023-12-06 00:15:21', 15, 'clothing', '500', '084-545-6464'),
(80, 'เครื่องฟอกอากาศแอมเวย์ ของใช้งานเอง ขายราคาถูกครับ', '<p>เครื่องฟอกอากาศ ของแอมเวย์ ใช้งานน้อยสภาพใหม่</p>', '1701797044815_14968.png', '2023-12-06 00:24:04', 15, 'health', '8500', '084-545-6464'),
(81, 'ฟิกเกอร์อนิเมะQS posket ชิโนบุ ดาบพิฆาตอสูร งานBanbresto ญปแท้', '<p>ฟิกเกอร์QS posket ชิโนบุ ดาบพิฆาตอสูร งานBanbresto ญปแท้ ไม่มีกล่อง น้องอยู่ในตู้โชว์ตลอดตั้งแต่ซื้อมา ต้องการโละๆ</p>', '1701797309923_25254.png', '2023-12-06 00:28:29', 15, 'other', '340', '084-545-6464'),
(83, 'โซฟา index', '<p>Sofa index living mall ไม่ได้ใช้งาน มีรอยแมวเล็กน้อย</p>', '1701800006773_10484.png', '2023-12-06 01:13:26', 15, 'furniture', '5000', '084-545-6464');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `img`, `fname`, `lname`, `phone`, `birthday`, `status`) VALUES
(14, 'admin', 'admin@gmail.com', '$2a$10$rkbjLz/5TRrgmIEpmAzjhOPi72BAw2OJkyuZqEI6kaoZVQTOncp2m', NULL, NULL, NULL, NULL, NULL, 0),
(15, 'test', 'tester@gmail.com', '$2a$10$kuPoR/LHwTiWaqh2KIDkO.OhWz51pjAm3Fj5AkzWTjD5iZ6QoKP.a', NULL, 'test', 'tester', '0845456464', '2002-07-15', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
