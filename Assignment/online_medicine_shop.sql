-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2020 at 06:51 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_medicine_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminpi`
--

CREATE TABLE `adminpi` (
  `id` int(5) NOT NULL,
  `firstName` varchar(10) NOT NULL,
  `lastName` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `contact` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `adminpi`
--

INSERT INTO `adminpi` (`id`, `firstName`, `lastName`, `email`, `password`, `contact`) VALUES
(1, 'admin', 'admin', 'admin@gmail.com', 'admin', '01997403922'),
(6, 'admin1', 'admin1', 'admin1@gmail.com', 'admin1', 'undefined'),
(7, 'admin2', 'admin2', 'admin2@gmail.com', 'admin2', '01997403922'),
(8, 'admin3', 'admin3', 'admin3@gamil.com', 'admin3', '21412421');

-- --------------------------------------------------------

--
-- Table structure for table `catagory`
--

CREATE TABLE `catagory` (
  `catagory_id` int(5) NOT NULL,
  `catagoryName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `catagory`
--

INSERT INTO `catagory` (`catagory_id`, `catagoryName`) VALUES
(1, 'entivetic');

-- --------------------------------------------------------

--
-- Table structure for table `customerpi`
--

CREATE TABLE `customerpi` (
  `id` int(5) NOT NULL,
  `customerName` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL,
  `address` varchar(30) NOT NULL,
  `contact` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customerpi`
--

INSERT INTO `customerpi` (`id`, `customerName`, `email`, `password`, `address`, `contact`) VALUES
(1, 'customer ', 'customer1@gmail.com', 'customer', 'dhaka', '01997403922'),
(2, 'customer2', 'customer2@gmail.com', 'customer2', 'dhaka', '01997403922');

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `medicine_id` int(5) NOT NULL,
  `mName` varchar(20) NOT NULL,
  `price` int(10) NOT NULL,
  `quantity` int(10) NOT NULL,
  `pic` varchar(50) NOT NULL,
  `catagory_id` int(5) NOT NULL,
  `vendorName` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`medicine_id`, `mName`, `price`, `quantity`, `pic`, `catagory_id`, `vendorName`) VALUES
(7, 'Cetyl Pure', 2000, 100, '', 1, 'vendor 1'),
(9, 'Sap3', 100, 60, 'null', 1, 'pial'),
(10, 'Alemtuzumab', 200, 500, 'null', 1, 'rafi');

-- --------------------------------------------------------

--
-- Table structure for table `orderlist`
--

CREATE TABLE `orderlist` (
  `order_id` int(5) NOT NULL,
  `medicineName` varchar(10) NOT NULL,
  `quantity` int(10) NOT NULL,
  `price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderlist`
--

INSERT INTO `orderlist` (`order_id`, `medicineName`, `quantity`, `price`) VALUES
(2, '1', 2, 40);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(5) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(10) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `type`) VALUES
(1, 'admin@gmail.com', 'admin', 'admin'),
(7, 'admin1@gmail.com', 'admin1', 'admin'),
(8, 'admin2@gmail.com', 'admin2', 'admin'),
(9, 'customer1@gmail.com', 'customer', 'customer'),
(11, 'admin3@gamil.com', 'admin3', 'admin'),
(12, 'customer2@gmail.com', 'customer2', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminpi`
--
ALTER TABLE `adminpi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `catagory`
--
ALTER TABLE `catagory`
  ADD PRIMARY KEY (`catagory_id`);

--
-- Indexes for table `customerpi`
--
ALTER TABLE `customerpi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`medicine_id`),
  ADD KEY `catagory_id` (`catagory_id`);

--
-- Indexes for table `orderlist`
--
ALTER TABLE `orderlist`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `test` (`medicineName`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminpi`
--
ALTER TABLE `adminpi`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `catagory`
--
ALTER TABLE `catagory`
  MODIFY `catagory_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customerpi`
--
ALTER TABLE `customerpi`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `medicine_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orderlist`
--
ALTER TABLE `orderlist`
  MODIFY `order_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `medicine`
--
ALTER TABLE `medicine`
  ADD CONSTRAINT `medicine_ibfk_1` FOREIGN KEY (`catagory_id`) REFERENCES `catagory` (`catagory_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
