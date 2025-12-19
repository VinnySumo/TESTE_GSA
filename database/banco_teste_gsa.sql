CREATE DATABASE  IF NOT EXISTS `banco_gsa_teste` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `banco_gsa_teste`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: banco_gsa_teste
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `alunos_sala_a`
--

DROP TABLE IF EXISTS `alunos_sala_a`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos_sala_a` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_nascimento` date NOT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `data_inclusao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos_sala_a`
--

LOCK TABLES `alunos_sala_a` WRITE;
/*!40000 ALTER TABLE `alunos_sala_a` DISABLE KEYS */;
INSERT INTO `alunos_sala_a` VALUES (2,'Mariana Costa Souza','2014-08-20','Av. Brasil, 500','2025-12-19 11:07:06'),(3,'Pedro Alves Santos','2010-02-10','Rua da Mata, 45','2025-12-19 11:07:06'),(4,'Ana Beatriz Rocha','2015-11-05','Travessa Sul, 12','2025-12-19 11:07:06'),(5,'João Victor Alves','2009-07-22','Rua 1, Bairro Alto','2025-12-19 11:07:06'),(6,'Fernanda Lima Dias','2013-09-30','Av. Central, 100','2025-12-19 11:07:06'),(7,'Gabriel Alves Ferreira','2016-01-12','Rua Nova, 88','2025-12-19 11:07:06'),(8,'Amanda Oliveira Souza','2011-04-18','Rua das Pedras, 30','2025-12-19 11:07:06'),(9,'Bruno Alves Pereira','2008-12-25','Av. Norte, 202','2025-12-19 11:07:06'),(10,'Larissa Martins Gomes','2017-06-15','Rua do Sol, 55','2025-12-19 11:07:06'),(11,'Rafael Alves Ribeiro','2012-10-08','Vila Esperança, 9','2025-12-19 11:07:06'),(12,'Camila Santos Andrade','2014-03-03','Rua das Flores, 77','2025-12-19 11:07:06'),(13,'Gustavo Alves Lima','2010-09-17','Av. Paulista, 900','2025-12-19 11:07:06'),(14,'Juliana Costa Alves','2015-05-21','Rua Augusta, 33','2025-12-19 11:07:06'),(15,'Felipe Barbosa Silva','2011-01-30','Beco Diagonal, 4','2025-12-19 11:07:06'),(16,'Beatriz Alves Castro','2009-11-11','Rua Sete, 101','2025-12-19 11:07:06'),(17,'Thiago Mendes Rocha','2016-08-09','Av. Atlântica, 50','2025-12-19 11:07:06'),(18,'Letícia Alves Nogueira','2012-03-27','Rua do Porto, 20','2025-12-19 11:07:06'),(19,'Rodrigo Pinto Souza','2014-12-01','Alameda Santos, 15','2025-12-19 11:07:06'),(20,'Marcos Alves Vieira','2007-06-14','Rua Bela Vista, 8','2025-12-19 11:07:06'),(21,'Sofia Alves Diniz','2013-02-14','Rua X, 100','2025-12-19 11:07:06'),(22,'Enzo Gabriel Alves','2015-09-09','Rua Y, 200','2025-12-19 11:07:06'),(23,'Valentina Alves','2016-12-25','Rua Z, 300','2025-12-19 11:07:06'),(24,'Arthur Alves Neto','2011-07-07','Av. do Estado, 44','2025-12-19 11:07:06'),(25,'Heloisa Alves','2014-10-10','Rua da Paz, 55','2025-12-19 11:07:06'),(26,'Lucas Alves Silva','2012-05-14','Rua das Acácias, 10','2025-12-19 11:41:36'),(27,'Diogo Alves Sousa','2010-06-14','Rua Brasil, 510','2025-12-19 11:52:15');
/*!40000 ALTER TABLE `alunos_sala_a` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alunos_sala_b`
--

DROP TABLE IF EXISTS `alunos_sala_b`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos_sala_b` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_nascimento` date NOT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `data_inclusao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos_sala_b`
--

LOCK TABLES `alunos_sala_b` WRITE;
/*!40000 ALTER TABLE `alunos_sala_b` DISABLE KEYS */;
INSERT INTO `alunos_sala_b` VALUES (1,'Roberto Alves Junior','2012-01-10','Rua B, 10','2025-12-19 11:07:24'),(2,'Claudia Leitte Alves','2014-05-15','Rua B, 20','2025-12-19 11:07:24'),(3,'Ricardo Alves Silva','2010-08-22','Rua B, 30','2025-12-19 11:07:24'),(4,'Patricia Abravanel','2015-11-30','Rua B, 40','2025-12-19 11:07:24'),(5,'Eduardo Alves Costa','2009-04-12','Rua B, 50','2025-12-19 11:07:24'),(6,'Fabiana Alves','2013-02-28','Rua B, 60','2025-12-19 11:07:24'),(7,'Geraldo Alves','2016-07-07','Rua B, 70','2025-12-19 11:07:24'),(8,'Helena Ranaldi','2011-09-19','Rua B, 80','2025-12-19 11:07:24'),(9,'Igor Alves Pereira','2008-12-01','Rua B, 90','2025-12-19 11:07:24'),(10,'Jessica Alba Alves','2017-03-14','Rua B, 100','2025-12-19 11:07:24'),(11,'Kleber Alves Bambam','2012-06-25','Rua B, 110','2025-12-19 11:07:24'),(12,'Luana Piovani','2014-10-05','Rua B, 120','2025-12-19 11:07:24'),(13,'Marcelo Alves','2010-01-20','Rua B, 130','2025-12-19 11:07:24'),(14,'Nair Alves Bello','2015-08-15','Rua B, 140','2025-12-19 11:07:24'),(15,'Otavio Mesquita','2011-12-12','Rua B, 150','2025-12-19 11:07:24'),(16,'Paula Alves','2009-05-05','Rua B, 160','2025-12-19 11:07:24'),(17,'Quezia Alves','2016-11-22','Rua B, 170','2025-12-19 11:07:24'),(18,'Renata Alves','2012-04-18','Rua B, 180','2025-12-19 11:07:24'),(19,'Sergio Mallandro','2014-09-09','Rua B, 190','2025-12-19 11:07:24'),(20,'Tatiana Alves','2007-03-30','Rua B, 200','2025-12-19 11:07:24'),(21,'Ubirajara Alves','2013-07-25','Rua B, 210','2025-12-19 11:07:24'),(22,'Viviane Alves Araujo','2015-02-14','Rua B, 220','2025-12-19 11:07:24'),(23,'Wesley Safadão Alves','2016-06-01','Rua B, 230','2025-12-19 11:07:24'),(24,'Xuxa Alves','2011-10-10','Rua B, 240','2025-12-19 11:07:24'),(25,'Yudi Tamashiro Alves','2014-01-01','Rua B, 250','2025-12-19 11:07:24');
/*!40000 ALTER TABLE `alunos_sala_b` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alunos_sala_c`
--

DROP TABLE IF EXISTS `alunos_sala_c`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos_sala_c` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_nascimento` date NOT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `data_inclusao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos_sala_c`
--

LOCK TABLES `alunos_sala_c` WRITE;
/*!40000 ALTER TABLE `alunos_sala_c` DISABLE KEYS */;
INSERT INTO `alunos_sala_c` VALUES (1,'Andre Alves Dias','2012-08-08','Rua C, 11','2025-12-19 11:07:33'),(2,'Bianca Alves Bin','2014-02-02','Rua C, 22','2025-12-19 11:07:33'),(3,'Carlos Alves Alberto','2010-11-11','Rua C, 33','2025-12-19 11:07:33'),(4,'Debora Secco','2015-04-04','Rua C, 44','2025-12-19 11:07:33'),(5,'Eliana Alves','2009-06-06','Rua C, 55','2025-12-19 11:07:33'),(6,'Fabio Junior Alves','2013-09-09','Rua C, 66','2025-12-19 11:07:33'),(7,'Giovanna Antonelli','2016-12-12','Rua C, 77','2025-12-19 11:07:33'),(8,'Humberto Alves','2011-03-03','Rua C, 88','2025-12-19 11:07:33'),(9,'Ivete Alves Sangalo','2008-05-05','Rua C, 99','2025-12-19 11:07:33'),(10,'Jau Peri Alves','2017-07-07','Rua C, 101','2025-12-19 11:07:33'),(11,'Katiuscia Alves','2012-01-30','Rua C, 111','2025-12-19 11:07:33'),(12,'Luan Santana Alves','2014-10-20','Rua C, 121','2025-12-19 11:07:33'),(13,'Michel Telo Alves','2010-02-25','Rua C, 131','2025-12-19 11:07:33'),(14,'Neymar Alves Junior','2015-12-30','Rua C, 141','2025-12-19 11:07:33'),(15,'Orlando Bloom Alves','2011-04-15','Rua C, 151','2025-12-19 11:07:33'),(16,'Pitty Alves','2009-09-10','Rua C, 161','2025-12-19 11:07:33'),(17,'Quinzinho Alves','2016-05-05','Rua C, 171','2025-12-19 11:07:33'),(18,'Ronaldo Fenomeno Alves','2012-08-20','Rua C, 181','2025-12-19 11:07:33'),(19,'Sandy Leah Alves','2014-11-25','Rua C, 191','2025-12-19 11:07:33'),(20,'Tiririca Alves','2007-01-15','Rua C, 201','2025-12-19 11:07:33'),(21,'Uilian Bonner Alves','2013-06-18','Rua C, 211','2025-12-19 11:07:33'),(22,'Vera Fischer Alves','2015-03-22','Rua C, 221','2025-12-19 11:07:33'),(23,'Wagner Moura Alves','2016-10-08','Rua C, 231','2025-12-19 11:07:33'),(24,'Xanddy Alves','2011-02-14','Rua C, 241','2025-12-19 11:07:33'),(25,'Zezé Di Camargo Alves','2014-07-01','Rua C, 251','2025-12-19 11:07:33');
/*!40000 ALTER TABLE `alunos_sala_c` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-19 11:53:28
