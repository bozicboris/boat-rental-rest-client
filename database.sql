-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: boat_rental_db
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `boat`
--

DROP TABLE IF EXISTS `boat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boat` (
  `boat_id` int unsigned NOT NULL AUTO_INCREMENT,
  `boat_name` varchar(255) NOT NULL,
  `type` enum('MONOHULL','CATAMARAN','TRIMARAN','DAYSAILER','DINGHY','MOTORSAILER','MOTOR_YACHT','SAILING_YACHT','JET _SKI') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `year` varchar(45) NOT NULL,
  `capacity` int NOT NULL DEFAULT (0),
  `price` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`boat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boat`
--

LOCK TABLES `boat` WRITE;
/*!40000 ALTER TABLE `boat` DISABLE KEYS */;
INSERT INTO `boat` VALUES (1,'SunLight','TRIMARAN','2018',50,400,'2024-06-02 14:41:45',NULL,NULL),(2,'WaveBreaker','TRIMARAN','2007',15,200,'2024-06-02 18:04:45',NULL,NULL),(3,'Luxury','MOTOR_YACHT','2012',40,1000,'2024-06-02 20:47:34',NULL,NULL),(4,'Pipsquick','DINGHY','1999',10,20,'2024-06-02 20:48:41',NULL,'2024-06-02 21:56:15'),(5,'Katara','MOTORSAILER','2002',17,62,'2024-06-03 13:41:12',NULL,NULL),(6,'Lifeboat','DINGHY','2020',4,40,'2024-06-03 13:43:03',NULL,NULL),(7,'Opulence','SAILING_YACHT','1992',40,900,'2024-06-03 14:38:36',NULL,NULL),(8,'WindSeaker','MONOHULL','2006',14,70,'2024-06-03 14:39:20',NULL,'2024-06-03 16:28:53'),(9,'SilverSurfer','DAYSAILER','2000',7,110,'2024-06-03 18:16:14',NULL,NULL),(10,'BlueOceanSailer','CATAMARAN','2013',15,300,'2024-06-03 18:49:30',NULL,NULL);
/*!40000 ALTER TABLE `boat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rental`
--

DROP TABLE IF EXISTS `rental`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rental` (
  `rental_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL DEFAULT (0),
  `boat_id` int unsigned NOT NULL DEFAULT (0),
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `total_cost` int DEFAULT NULL,
  `rental_status` enum('WAITING FOR APPROVAL','APPROVED','CANCELED') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`rental_id`),
  KEY `fk_rental_boat_id` (`boat_id`),
  KEY `fk_rental_user_id` (`user_id`),
  CONSTRAINT `fk_rental_boat_id` FOREIGN KEY (`boat_id`) REFERENCES `boat` (`boat_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rental_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rental`
--

LOCK TABLES `rental` WRITE;
/*!40000 ALTER TABLE `rental` DISABLE KEYS */;
INSERT INTO `rental` VALUES (1,1,1,'2024-06-02','2024-06-05',500,'APPROVED','2024-06-02 14:43:57',NULL);
/*!40000 ALTER TABLE `rental` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `is_admin` tinyint NOT NULL DEFAULT (0),
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`),
  UNIQUE KEY `uq_user_username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'boris@gmail.com','root','Boris',1,'2024-06-02 14:43:15',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-05 23:38:38
