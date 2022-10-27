-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2022 at 01:40 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restapi_nodejs_express`
--

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `id` tinyint(2) NOT NULL,
  `user` varchar(20) NOT NULL,
  `pass` varchar(30) NOT NULL,
  `leftMinutes` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`id`, `user`, `pass`, `leftMinutes`) VALUES
(4, 'pepito', 'pepito123', '7299'),
(5, 'pepitos', 'pepito123', '210'),
(7, 'aa', 'aaa', '80'),
(8, 'Jhon', '123', '120'),
(9, 'Alan', 'asd', '0');

-- --------------------------------------------------------

--
-- Table structure for table `empleados`
--

CREATE TABLE `empleados` (
  `id` tinyint(2) NOT NULL,
  `user` varchar(30) NOT NULL,
  `role` varchar(15) NOT NULL,
  `pass` varchar(30) NOT NULL,
  `horasVendidas` tinyint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `empleados`
--

INSERT INTO `empleados` (`id`, `user`, `role`, `pass`, `horasVendidas`) VALUES
(1, 'Juanito', 'administrador', 'Lalala', 0);

-- --------------------------------------------------------

--
-- Table structure for table `maquinas`
--

CREATE TABLE `maquinas` (
  `id` tinyint(3) NOT NULL,
  `isActive` float NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `minutes_bought` tinyint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `sessionId` int(11) NOT NULL,
  `startTime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tvs`
--

CREATE TABLE `tvs` (
  `tvNumber` varchar(2) NOT NULL,
  `currentUser` varchar(30) NOT NULL,
  `isActive` varchar(20) NOT NULL,
  `minutesBrough` varchar(10) NOT NULL,
  `startTime` varchar(40) NOT NULL,
  `endTime` varchar(40) NOT NULL,
  `endTimeMinusFiveMin` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tvs`
--

INSERT INTO `tvs` (`tvNumber`, `currentUser`, `isActive`, `minutesBrough`, `startTime`, `endTime`, `endTimeMinusFiveMin`) VALUES
('1', 'noUserDueTvInactivity', 'inactive', '0', 'null', 'null', 'null'),
('10', 'noUserDueTvInactivity', 'inactive', '0', 'null', 'null', 'null'),
('2', 'noUserDueTvInactivity', 'inactive', '0', 'null', 'null', 'null'),
('3', 'noUserDueTvInactivity', 'inactive', '0', 'null', 'null', 'null'),
('4', 'noUserDueTvInactivity', 'inactive', '0', 'null', 'null', 'null'),
('5', 'noUserDueTvInactivity', 'inactive', '0', 'null', 'null', 'null'),
('6', 'noUserDueTvInactivity', 'inactive', '0', 'null', 'null', 'null'),
('7', 'noUserDueTvInactivity', 'inactive', '0', 'null', 'null', 'null'),
('8', 'noUserDueInactivity', 'inactive', '0', 'null', 'null', 'null'),
('9', 'noUserDueTvInactivity', 'inactive', '0', 'null', 'null', 'null');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `maquinas`
--
ALTER TABLE `maquinas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tvs`
--
ALTER TABLE `tvs`
  ADD PRIMARY KEY (`tvNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `maquinas`
--
ALTER TABLE `maquinas`
  MODIFY `id` tinyint(3) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
