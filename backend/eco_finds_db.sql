-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2025 at 10:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eco_finds_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `image`, `created_at`) VALUES
(1, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:10:19'),
(2, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:10:19'),
(3, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:10:19'),
(4, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:10:19'),
(5, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:10:19'),
(6, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:10:19'),
(7, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:10:19'),
(8, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:10:19'),
(9, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:12:26'),
(10, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:12:26'),
(11, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:12:26'),
(12, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:12:26'),
(13, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:12:26'),
(14, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:12:26'),
(15, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:12:26'),
(16, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:12:26'),
(17, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:15:31'),
(18, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:15:31'),
(19, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:15:31'),
(20, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:15:31'),
(21, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:15:31'),
(22, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:15:31'),
(23, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:15:31'),
(24, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:15:31'),
(25, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:15:37'),
(26, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:15:37'),
(27, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:15:37'),
(28, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:15:37'),
(29, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:15:37'),
(30, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:15:37'),
(31, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:15:37'),
(32, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:15:37'),
(33, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:17:16'),
(34, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:17:16'),
(35, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:17:16'),
(36, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:17:16'),
(37, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:17:16'),
(38, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:17:16'),
(39, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:17:16'),
(40, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:17:16'),
(41, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:23:45'),
(42, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:23:45'),
(43, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:23:45'),
(44, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:23:45'),
(45, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:23:45'),
(46, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:23:45'),
(47, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:23:45'),
(48, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:23:45'),
(49, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:25:16'),
(50, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:25:16'),
(51, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:25:16'),
(52, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:25:16'),
(53, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:25:16'),
(54, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:25:16'),
(55, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:25:16'),
(56, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:25:16'),
(57, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:25:17'),
(58, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:25:17'),
(59, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:25:17'),
(60, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:25:17'),
(61, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:25:17'),
(62, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:25:17'),
(63, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:25:17'),
(64, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:25:17'),
(65, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:34:23'),
(66, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:34:23'),
(67, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:34:23'),
(68, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:34:23'),
(69, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:34:23'),
(70, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:34:23'),
(71, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:34:23'),
(72, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:34:23'),
(73, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:37:17'),
(74, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:37:18'),
(75, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:37:18'),
(76, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:37:18'),
(77, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:37:18'),
(78, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:37:18'),
(79, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:37:18'),
(80, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:37:18'),
(81, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:37:29'),
(82, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:37:29'),
(83, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:37:29'),
(84, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:37:29'),
(85, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:37:29'),
(86, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:37:29'),
(87, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:37:29'),
(88, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:37:29'),
(89, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:41:21'),
(90, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:41:21'),
(91, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:41:21'),
(92, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:41:21'),
(93, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:41:21'),
(94, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:41:21'),
(95, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:41:21'),
(96, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:41:21'),
(97, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:50:32'),
(98, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:50:32'),
(99, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:50:32'),
(100, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:50:32'),
(101, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:50:32'),
(102, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:50:32'),
(103, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:50:32'),
(104, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:50:32'),
(105, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:53:17'),
(106, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:53:17'),
(107, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:53:17'),
(108, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:53:17'),
(109, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:53:17'),
(110, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:53:17'),
(111, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:53:17'),
(112, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:53:17'),
(113, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:54:06'),
(114, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:54:06'),
(115, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:54:06'),
(116, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:54:06'),
(117, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:54:06'),
(118, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:54:06'),
(119, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:54:06'),
(120, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:54:06'),
(121, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:54:30'),
(122, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:54:30'),
(123, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:54:30'),
(124, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:54:30'),
(125, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:54:30'),
(126, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:54:30'),
(127, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:54:30'),
(128, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:54:30'),
(129, 'Electronics', 'Electronic devices and accessories', NULL, '2025-09-06 08:56:38'),
(130, 'Furniture', 'Home and office furniture', NULL, '2025-09-06 08:56:38'),
(131, 'Clothing', 'Fashion and apparel', NULL, '2025-09-06 08:56:38'),
(132, 'Books', 'Books and educational materials', NULL, '2025-09-06 08:56:38'),
(133, 'Sports', 'Sports equipment and gear', NULL, '2025-09-06 08:56:38'),
(134, 'Home & Garden', 'Home improvement and gardening', NULL, '2025-09-06 08:56:38'),
(135, 'Toys & Games', 'Children toys and games', NULL, '2025-09-06 08:56:38'),
(136, 'Automotive', 'Car parts and accessories', NULL, '2025-09-06 08:56:38');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `product_id`, `created_at`) VALUES
(1, 1, 2, '2025-09-06 08:16:01'),
(2, 1, 4, '2025-09-06 08:16:01'),
(3, 2, 1, '2025-09-06 08:16:01'),
(4, 2, 5, '2025-09-06 08:16:01'),
(5, 3, 1, '2025-09-06 08:16:01'),
(6, 4, 2, '2025-09-06 08:16:01');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `product_id`, `message`, `is_read`, `created_at`) VALUES
(1, 2, 1, 1, 'Hi! I\'m interested in the bookshelf. Is it still available?', 0, '2025-09-06 08:16:01'),
(2, 1, 2, 1, 'Yes, it\'s still available! Would you like to come see it?', 0, '2025-09-06 08:16:01'),
(3, 3, 2, 2, 'Hello! I saw your MacBook listing. What\'s the battery life like?', 0, '2025-09-06 08:16:01'),
(4, 4, 1, 5, 'Hi! Is the basketball still available? I\'m interested in buying it.', 0, '2025-09-06 08:16:01'),
(5, 2, 1, 1, 'Hi! I\'m interested in the bookshelf. Is it still available?', 0, '2025-09-06 08:41:17'),
(6, 1, 2, 1, 'Yes, it\'s still available! Would you like to come see it?', 0, '2025-09-06 08:41:17'),
(7, 3, 2, 2, 'Hello! I saw your MacBook listing. What\'s the battery life like?', 0, '2025-09-06 08:41:17'),
(8, 4, 1, 5, 'Hi! Is the basketball still available? I\'m interested in buying it.', 0, '2025-09-06 08:41:17');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `seller_id` int(11) NOT NULL,
  `condition_type` enum('excellent','good','fair','poor') DEFAULT 'good',
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `location` varchar(100) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `is_featured` tinyint(1) DEFAULT 0,
  `views_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `category_id`, `seller_id`, `condition_type`, `images`, `location`, `is_available`, `is_featured`, `views_count`, `created_at`, `updated_at`) VALUES
(1, 'Vintage Wooden Bookshelf', 'Beautiful vintage wooden bookshelf in excellent condition. Perfect for any home office or living room. Made from solid oak wood with 5 shelves. Some minor wear consistent with age but structurally sound.', 150.00, 2, 1, 'excellent', '[\"bookshelf1.jpg\",\"bookshelf2.jpg\"]', 'New York, NY', 1, 0, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(2, 'MacBook Pro 2019 - 13 inch', 'MacBook Pro 13-inch 2019 model in good working condition. 8GB RAM, 256GB SSD, Intel i5 processor. Battery health at 85%. Comes with original charger. Perfect for students or professionals.', 800.00, 1, 2, 'good', '[\"macbook1.jpg\",\"macbook2.jpg\"]', 'Los Angeles, CA', 1, 0, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(3, 'Nike Air Max 270 - Size 10', 'Nike Air Max 270 sneakers in great condition. Worn only a few times, no visible wear. Size 10 US. Original box included. Perfect for running or casual wear.', 80.00, 3, 3, 'excellent', '[\"nike1.jpg\",\"nike2.jpg\"]', 'Chicago, IL', 1, 0, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(4, 'Harry Potter Complete Book Set', 'Complete set of all 7 Harry Potter books in hardcover. Books are in good condition with minor shelf wear. Perfect for collectors or new readers. All books included from Philosopher\'s Stone to Deathly Hallows.', 120.00, 4, 4, 'good', '[\"harrypotter1.jpg\",\"harrypotter2.jpg\"]', 'Houston, TX', 1, 0, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(5, 'Basketball - Spalding Official', 'Official Spalding basketball in excellent condition. Used for indoor games only. Properly inflated and ready to play. Great for basketball enthusiasts or gym use.', 25.00, 5, 1, 'excellent', '[\"basketball1.jpg\"]', 'New York, NY', 1, 0, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(6, 'Garden Tools Set', 'Complete set of garden tools including shovel, rake, hoe, and pruning shears. All tools are in good working condition. Perfect for home gardening projects.', 45.00, 6, 2, 'good', '[\"gardentools1.jpg\",\"gardentools2.jpg\"]', 'Los Angeles, CA', 1, 0, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(7, 'LEGO Creator Set - 3-in-1', 'LEGO Creator 3-in-1 building set. Can build 3 different models. All pieces included, instructions included. Great for kids or adult collectors. Box shows some wear but contents are complete.', 35.00, 7, 3, 'good', '[\"lego1.jpg\",\"lego2.jpg\"]', 'Chicago, IL', 1, 0, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(8, 'Car Phone Mount - Universal', 'Universal car phone mount with magnetic attachment. Works with all phone sizes. Adjustable angle and secure grip. Barely used, in excellent condition.', 15.00, 8, 4, 'excellent', '[\"phonemount1.jpg\"]', 'Houston, TX', 1, 0, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(9, 'Coffee Table - Modern Design', 'Modern glass-top coffee table with metal legs. Perfect for contemporary living spaces. Glass is clean with no scratches. Table is sturdy and well-built.', 200.00, 2, 5, 'excellent', '[\"coffeetable1.jpg\",\"coffeetable2.jpg\"]', 'San Francisco, CA', 1, 0, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(10, 'Wireless Bluetooth Headphones', 'High-quality wireless Bluetooth headphones with noise cancellation. Battery lasts 20+ hours. Comes with charging cable and carrying case. Sound quality is excellent.', 75.00, 1, 1, 'good', '[\"headphones1.jpg\",\"headphones2.jpg\"]', 'New York, NY', 1, 0, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(11, 'Vintage Wooden Bookshelf', 'Beautiful vintage wooden bookshelf in excellent condition. Perfect for any home office or living room. Made from solid oak wood with 5 shelves. Some minor wear consistent with age but structurally sound.', 150.00, 2, 1, 'excellent', '[\"bookshelf1.jpg\",\"bookshelf2.jpg\"]', 'New York, NY', 1, 0, 0, '2025-09-06 08:41:17', '2025-09-06 08:41:17'),
(12, 'MacBook Pro 2019 - 13 inch', 'MacBook Pro 13-inch 2019 model in good working condition. 8GB RAM, 256GB SSD, Intel i5 processor. Battery health at 85%. Comes with original charger. Perfect for students or professionals.', 800.00, 1, 2, 'good', '[\"macbook1.jpg\",\"macbook2.jpg\"]', 'Los Angeles, CA', 1, 0, 0, '2025-09-06 08:41:17', '2025-09-06 08:41:17'),
(13, 'Nike Air Max 270 - Size 10', 'Nike Air Max 270 sneakers in great condition. Worn only a few times, no visible wear. Size 10 US. Original box included. Perfect for running or casual wear.', 80.00, 3, 3, 'excellent', '[\"nike1.jpg\",\"nike2.jpg\"]', 'Chicago, IL', 1, 0, 0, '2025-09-06 08:41:17', '2025-09-06 08:41:17'),
(14, 'Harry Potter Complete Book Set', 'Complete set of all 7 Harry Potter books in hardcover. Books are in good condition with minor shelf wear. Perfect for collectors or new readers. All books included from Philosopher\'s Stone to Deathly Hallows.', 120.00, 4, 4, 'good', '[\"harrypotter1.jpg\",\"harrypotter2.jpg\"]', 'Houston, TX', 1, 0, 0, '2025-09-06 08:41:17', '2025-09-06 08:41:17'),
(15, 'Basketball - Spalding Official', 'Official Spalding basketball in excellent condition. Used for indoor games only. Properly inflated and ready to play. Great for basketball enthusiasts or gym use.', 25.00, 5, 1, 'excellent', '[\"basketball1.jpg\"]', 'New York, NY', 1, 0, 0, '2025-09-06 08:41:17', '2025-09-06 08:41:17'),
(16, 'Garden Tools Set', 'Complete set of garden tools including shovel, rake, hoe, and pruning shears. All tools are in good working condition. Perfect for home gardening projects.', 45.00, 6, 2, 'good', '[\"gardentools1.jpg\",\"gardentools2.jpg\"]', 'Los Angeles, CA', 1, 0, 0, '2025-09-06 08:41:17', '2025-09-06 08:41:17'),
(17, 'LEGO Creator Set - 3-in-1', 'LEGO Creator 3-in-1 building set. Can build 3 different models. All pieces included, instructions included. Great for kids or adult collectors. Box shows some wear but contents are complete.', 35.00, 7, 3, 'good', '[\"lego1.jpg\",\"lego2.jpg\"]', 'Chicago, IL', 1, 0, 0, '2025-09-06 08:41:17', '2025-09-06 08:41:17'),
(18, 'Car Phone Mount - Universal', 'Universal car phone mount with magnetic attachment. Works with all phone sizes. Adjustable angle and secure grip. Barely used, in excellent condition.', 15.00, 8, 4, 'excellent', '[\"phonemount1.jpg\"]', 'Houston, TX', 1, 0, 0, '2025-09-06 08:41:17', '2025-09-06 08:41:17'),
(19, 'Coffee Table - Modern Design', 'Modern glass-top coffee table with metal legs. Perfect for contemporary living spaces. Glass is clean with no scratches. Table is sturdy and well-built.', 200.00, 2, 5, 'excellent', '[\"coffeetable1.jpg\",\"coffeetable2.jpg\"]', 'San Francisco, CA', 1, 0, 0, '2025-09-06 08:41:17', '2025-09-06 08:41:17'),
(20, 'Wireless Bluetooth Headphones', 'High-quality wireless Bluetooth headphones with noise cancellation. Battery lasts 20+ hours. Comes with charging cable and carrying case. Sound quality is excellent.', 75.00, 1, 1, 'good', '[\"headphones1.jpg\",\"headphones2.jpg\"]', 'New York, NY', 1, 0, 0, '2025-09-06 08:41:17', '2025-09-06 08:41:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `full_name`, `phone`, `address`, `profile_image`, `is_verified`, `created_at`, `updated_at`) VALUES
(1, 'john_doe', 'john@example.com', '$2a$12$nbyFxQAx524cV7c/og8heOvu.z2ISk7hplRU8qFtPFfqR/9nx3Iwm', 'John Doe', '+1234567890', '123 Main St, New York, NY 10001', NULL, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(2, 'jane_smith', 'jane@example.com', '$2a$12$nbyFxQAx524cV7c/og8heOvu.z2ISk7hplRU8qFtPFfqR/9nx3Iwm', 'Jane Smith', '+1234567891', '456 Oak Ave, Los Angeles, CA 90210', NULL, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(3, 'mike_wilson', 'mike@example.com', '$2a$12$nbyFxQAx524cV7c/og8heOvu.z2ISk7hplRU8qFtPFfqR/9nx3Iwm', 'Mike Wilson', '+1234567892', '789 Pine Rd, Chicago, IL 60601', NULL, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(4, 'sarah_jones', 'sarah@example.com', '$2a$12$nbyFxQAx524cV7c/og8heOvu.z2ISk7hplRU8qFtPFfqR/9nx3Iwm', 'Sarah Jones', '+1234567893', '321 Elm St, Houston, TX 77001', NULL, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01'),
(5, 'admin_user', 'admin@ecofinds.com', '$2a$12$nbyFxQAx524cV7c/og8heOvu.z2ISk7hplRU8qFtPFfqR/9nx3Iwm', 'Admin User', '+1234567894', '555 Admin Blvd, San Francisco, CA 94101', NULL, 0, '2025-09-06 08:16:01', '2025-09-06 08:16:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_favorite` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
