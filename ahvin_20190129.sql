-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.17 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.2.0.4947
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for ahvin
CREATE DATABASE IF NOT EXISTS `ahvin` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ahvin`;


-- Dumping structure for table ahvin.works
DROP TABLE IF EXISTS `works`;
CREATE TABLE IF NOT EXISTS `works` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(150) DEFAULT NULL,
  `display_order` int(11) DEFAULT NULL,
  `tech` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table ahvin.works: ~6 rows (approximately)
DELETE FROM `works`;
/*!40000 ALTER TABLE `works` DISABLE KEYS */;
INSERT INTO `works` (`id`, `name`, `description`, `image`, `url`, `display_order`, `tech`) VALUES
	(1, 'Sparky Animation', 'Sparky\'s main site, serving as the go to for anything related to the company. Following an in-house designer\'s mockup, I created the entire site.', 'img/portfolio/sparkyanim.jpg', 'http://sparkyanim.com/', 1, 'WordPress, PHP, MySql, Javascript'),
	(2, 'Dinosaur Train', 'The microsite is used to promote Sparky\'s animated title, Dinosaur Train. I was responsible for creating the entire site, including the mini games.', 'img/portfolio/dinosaurtrain.jpg', 'https://dinosaurtrain-asia.com/', 2, 'WordPress, PHP, MySql, Javascript'),
	(3, 'Spkpass', 'I was tasked to create a site to aid Sparky in its licensing business. Licensees would submit their concept to Sparky, who will then perform a simple back-and-forth review process thru the website.', 'img/portfolio/spkpass.jpg', NULL, 3, 'CakePHP, PHP, MySql, Javascript'),
	(4, 'Spkvault', 'I coded this website to serve as Sparky\'s styleguide repository.', 'img/portfolio/spkvault.jpg', NULL, 4, 'CakePHP, PHP, MySql, Javascript'),
	(5, 'Konbini Story', 'Gamenami\'s first mobile casual title. A simple match-3 game, Konbini Story has surpassed 1 million downloads worldwide. I was in charge of coding the entire game, from front end to back end.', 'img/portfolio/konbini.jpg', 'https://gamebatte.com/game/konbinistory', 5, 'Unity, C#, GoLang, MySql'),
	(6, 'Chrono Clash', 'Chrono Clash is a tactical rpg mobile game coded in Unity. Being the lead developer, I created the game core, including combat system, ui system and login system. I am also fully responsible for coding the entire backend.', 'img/portfolio/chronoclash.jpg', 'https://gamebatte.com/game/chronoclash', 6, 'Unity, C#, NodeJS, MySql'),
	(7, 'Popsical', 'Revamped client dashboard for Popsical to improve user experience.', 'img/portfolio/popsical.jpg', NULL, 7, 'Ruby on Rails, PostgreSQL, Javascript');
/*!40000 ALTER TABLE `works` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
