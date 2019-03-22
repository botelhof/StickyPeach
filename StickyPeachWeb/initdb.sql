-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 22-Mar-2019 às 00:08
-- Versão do servidor: 10.3.13-MariaDB
-- versão do PHP: 7.3.2

-- --------------------------------------------------------

--
-- Estrutura da tabela `Recipe`
--

DROP TABLE IF EXISTS `Recipe`;
CREATE TABLE IF NOT EXISTS `Recipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `time_preparation` int(5) NOT NULL,
  `time_cook` int(5) NOT NULL,
  `serves` int(4) NOT NULL,
  `vegan` tinyint(1) NOT NULL,
  `picture` blob DEFAULT NULL,
  `creation_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_fk` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `User`
--

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `creation_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `Recipe`
--
ALTER TABLE `Recipe`
  ADD CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;
