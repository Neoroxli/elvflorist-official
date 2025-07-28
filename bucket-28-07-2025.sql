/*
SQLyog Professional v12.5.1 (64 bit)
MySQL - 8.0.30 : Database - bucket
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`bucket` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `bucket`;

/*Table structure for table `buckets` */

DROP TABLE IF EXISTS `buckets`;

CREATE TABLE `buckets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `recomended` text COLLATE utf8mb4_unicode_ci,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `buckets` */

insert  into `buckets`(`id`,`slug`,`name`,`foto`,`harga`,`description`,`recomended`,`deleted_at`,`created_at`,`updated_at`) values 
(1,'bucket-bulan','Bucket Bulan','elv-florist--officer/MsKwAbVSgFe01HU0v0qDW3M2NubCJDvrKOQm30my.jpg','0300000','<ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>komposisi bunga yang terinspirasi oleh keindahan bulan di malam hari. Desain buket ini menggabungkan warna-warna lembut dan elegan, seperti putih, perak, dan nuansa pastel, untuk menciptakan kesan tenang dan romantis. Bunga-bunga yang digunakan dalam buket ini mungkin termasuk mawar putih, lili, baby breath, dan bunga-bunga berwarna cerah lainnya yang melambangkan cahaya dan keindahan bulan yang bersinar di langit malam.</li></ol><p><br></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Buket Bulan cocok untuk berbagai kesempatan istimewa, seperti perayaan ulang tahun, pernikahan, atau pemberian hadiah yang penuh makna. Dengan desainnya yang anggun dan bersahaja, buket ini menciptakan kesan yang menenangkan dan mempesona, membuat setiap momen terasa lebih istimewa, seolah-olah di bawah cahaya bulan yang lembut.</li></ol><p><br></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Kombinasi warna yang serasi dan pemilihan bunga yang cermat menjadikan Buket Bulan sebagai pilihan sempurna bagi mereka yang ingin memberikan sentuhan keindahan alami yang memikat hati.</li></ol>',NULL,NULL,'2025-01-25 13:54:29','2025-07-09 23:50:41'),
(2,'bucket-biasa','Bucket Biasa','elv-florist--officer/kuhMSvodVwTWL03vwnHJmpJCu5jXG03vp3scEqcw.jpg','200000',NULL,NULL,NULL,'2025-01-25 14:07:15','2025-02-05 18:04:36'),
(3,'bucket-melati','Bucket melati','elv-florist--officer/0Q8JS66PejromBKm0qcozcY9nQPKX3F6tvizWr4O.jpg','2323',NULL,NULL,NULL,'2025-01-25 14:22:33','2025-02-05 18:01:59'),
(16,'buket-matahari','Buket matahari','elv-florist--officer/JcIJcvzQxE4WkkcHF6CG6gqWdGta23NL1NTIv1RS.jpg','22322',NULL,NULL,NULL,'2025-01-27 11:40:43','2025-02-05 18:00:05'),
(17,'bucket-simple','Bucket simple','elv-florist--officer/UHg5WO4UZew6WQcyia5xJy9GvDjf1FXAo4C6Nxvb.jpg','400000',NULL,NULL,NULL,'2025-02-01 22:50:24','2025-02-05 18:02:40'),
(18,'bucket-mentari','Bucket mentari','elv-florist--officer/XhgW23R0kx4jhXGjBR2qSVpuzFgSSZ7R6wyFtHYq.png','23242','<p>sdkmskjdksd</p><p>lsmd</p><p>sdkmsd</p><p>sdmmnskdmksmdkskkdsd</p>',NULL,NULL,'2025-02-03 15:51:58','2025-02-05 21:52:46'),
(19,'bucket-bulan-2','Bucket Bulan 2','elv-florist--officer/MSZQ5x1zIsUYksXxpRRnDPd7LHfK5oKmuBrp4QuW.png','23423','<p>sdfjlksad</p><p>sdkm</p><p><br></p><p>smd</p><p><br></p><p>sdksdlksdksdmskdmksmdksmdkskdmksmdksmd</p>',NULL,NULL,'2025-02-03 15:54:59','2025-02-05 18:02:57'),
(20,'bucket-balon','Bucket balon','elv-florist--officer/92qxT6G6Qj9vuYkO8YTdInyydJJMGSz3PZ0WQy1u.jpg','234234',NULL,NULL,NULL,'2025-02-03 15:55:20','2025-02-05 18:03:55'),
(21,'bucket-bulan-3','Bucket Bulan 3','elv-florist--officer/IL0bEvDrL4iQ1O6q7NOOHkfqCK7v4JVDXFdc8bGk.jpg','32423',NULL,NULL,NULL,'2025-02-03 15:55:36','2025-02-05 18:03:05'),
(22,'bucket-buble','Bucket buble','elv-florist--officer/jrzyXgKw0oE7p2WnBVtq49SptTE2c4KOfJQiQHq5.png','23423',NULL,NULL,NULL,'2025-02-03 15:56:00','2025-02-05 18:03:20'),
(23,'buket-bulan-4','Buket Bulan 4','elv-florist--officer/DA4iTR5Gxw9uN4ROrk4H2fkcn2F486g45bcQgAJx.png','200000',NULL,NULL,NULL,'2025-02-05 14:59:19','2025-02-05 18:04:08'),
(24,'bucket-biasa-2','Bucket Biasa 2','elv-florist--officer/wfImjBww4FH5RVbeZpsh51MGg2PC5LKyRLdG0yUX.png','2343',NULL,NULL,NULL,'2025-02-05 18:06:01','2025-02-05 18:06:01'),
(25,'buket-mentari-2','Buket mentari 2','elv-florist--officer/z4q0cxL2zhrvFArUbwb1QyRQ9kkKTlDXW5DksFvx.jpg','200000',NULL,'Valentine, Yudisium, Wisuda, Anniversary',NULL,'2025-02-06 19:44:09','2025-02-06 21:13:23'),
(26,'buket-mentari-3','Buket Mentari 3','elv-florist--officer/9vtCWEwfawK8Xo1Ad354dQcwmb5Cs3KCK4jRsVuh.png','300000','<ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Rangkaian bunga yang dirancang dengan penuh perhatian untuk membawa keceriaan dan kehangatan, layaknya sinar mentari di pagi hari. Dengan perpaduan warna-warna cerah seperti kuning, oranye, dan merah, buket ini menciptakan suasana yang menyegarkan dan memancarkan energi positif.</li></ol><p><br></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Di dalam buket ini, bunga-bunga seperti mawar kuning yang melambangkan kebahagiaan, gerbera oranye yang penuh semangat, serta bunga matahari yang simbolis dengan kecerahan dan kehidupan, digabungkan dalam komposisi yang elegan namun ceria. Setiap bunga dipilih dengan cermat untuk memastikan bahwa keseluruhan buket ini memberikan nuansa cerah dan menyenangkan.</li></ol><p><br></p><ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Buket Mentari 3 sangat cocok diberikan sebagai hadiah untuk orang tersayang, sebagai ucapan selamat, atau untuk menghias ruangan dengan kesan yang menyegarkan. Dengan keindahan dan makna di balik setiap bunga, buket ini dapat membuat hari-hari menjadi lebih cerah, penuh harapan, dan penuh semangat.</li></ol>','Valentine, Yudisium, Wisuda, Anniversary',NULL,'2025-02-10 13:25:39','2025-02-10 15:25:50'),
(29,'tes-tes','tes tes','elv-florist--officer/PO7YWSxyu916qluyCLvD3nSIpfgzwMftLrHcBJQv.jpg','250000','<p>sdjsd</p>','Valentine, Yudisium, Wisuda, Anniversary','2025-03-22 22:57:48','2025-03-22 12:34:06','2025-03-22 22:57:48'),
(30,'buket-snack','Buket snack','elv-florist--officer/xEb2M9id9SiOI7SSCvpqggp3Ih3qMyyBIMKd5nQ0.jpg','150000',NULL,'Valentine, Yudisium, Wisuda, Anniversary',NULL,'2025-04-12 13:35:04','2025-04-12 13:35:22');

/*Table structure for table `chats` */

DROP TABLE IF EXISTS `chats`;

CREATE TABLE `chats` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `bucket_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chats_bucket_id_foreign` (`bucket_id`),
  KEY `chats_user_id_foreign` (`user_id`),
  CONSTRAINT `chats_bucket_id_foreign` FOREIGN KEY (`bucket_id`) REFERENCES `buckets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chats_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `chats` */

insert  into `chats`(`id`,`bucket_id`,`user_id`,`created_at`,`updated_at`) values 
(4,30,13,'2025-06-08 16:16:47','2025-06-08 16:16:47'),
(5,17,13,'2025-06-08 18:31:52','2025-06-08 18:31:52');

/*Table structure for table `customers` */

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `no_wa` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customers_user_id_foreign` (`user_id`),
  CONSTRAINT `customers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `customers` */

insert  into `customers`(`id`,`no_wa`,`address`,`user_id`,`created_at`,`updated_at`) values 
(4,'081234567819','Jl. Garuda Spadem',13,'2025-02-03 23:13:01','2025-06-29 15:45:59'),
(5,'082199195979','jl.kampung timur',16,'2025-04-12 13:38:55','2025-04-12 13:42:34');

/*Table structure for table `failed_jobs` */

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `failed_jobs` */

/*Table structure for table `items` */

DROP TABLE IF EXISTS `items`;

CREATE TABLE `items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `items` */

insert  into `items`(`id`,`name`,`price`,`deleted_at`,`created_at`,`updated_at`) values 
(1,'Beng beng','3000',NULL,'2025-06-15 23:19:25','2025-06-16 13:19:20'),
(2,'Silverqueen','5000',NULL,'2025-06-15 23:23:26','2025-06-16 10:29:52'),
(3,'Boneka Wisuda','100000',NULL,'2025-06-16 20:35:29','2025-06-16 20:35:29');

/*Table structure for table `messages` */

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `chat_id` bigint unsigned NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('admin','user') COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_chat_id_foreign` (`chat_id`),
  CONSTRAINT `messages_chat_id_foreign` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `messages` */

insert  into `messages`(`id`,`chat_id`,`message`,`status`,`read_at`,`created_at`,`updated_at`) values 
(6,4,'eyJpdiI6IlIvcU9TU2tJeEdEdXFlSUFxTUZIbHc9PSIsInZhbHVlIjoiRDR5V1k0azZiV3BzaVZvdURydnlkdz09IiwibWFjIjoiNDg3Y2QyZWRiNDcxOGU5NDAzNGM5OTcyOGUxMGQyNTYyOGEzMTUwZDM4N2JiMTJiNjk1YzRlNWExMTAzZTc2ZCIsInRhZyI6IiJ9','user','2025-06-09 22:42:56','2025-06-08 16:16:47','2025-06-09 22:42:56'),
(7,4,'eyJpdiI6Inh3dHVDTCtwUEdZY2FWcGxjNUpBdnc9PSIsInZhbHVlIjoicDdOVW5rNGErT0QrMWVWRWZsTkxaZz09IiwibWFjIjoiNjUyOGEzMDMyMDczZTFmM2ZhOWRmNjgyNTkxNWNlZjU5N2JmODRhYTMzNzUzYTFiMDQ1OGU4M2Y1OGQwODJjZiIsInRhZyI6IiJ9','user','2025-06-09 22:42:56','2025-06-08 18:06:36','2025-06-09 22:42:56'),
(8,5,'eyJpdiI6Iit5SFgzTC9ua2FHOHcrdEU2UitjOGc9PSIsInZhbHVlIjoiSEU3d3NHVFd6LzExTWNaV2drMDdTdz09IiwibWFjIjoiZjQ2ODIyMmI3ZTVlZTdkNmNmNmQ2NDRhMTQ2M2YzMTU4ZWEzZGM1ZmRiZGViODVlZDllYzQ3ZjcwY2NjMDIwMyIsInRhZyI6IiJ9','user',NULL,'2025-06-08 18:31:52','2025-06-10 01:17:02');

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values 
(1,'2014_10_12_000000_create_users_table',1),
(2,'2014_10_12_100000_create_password_reset_tokens_table',1),
(3,'2019_08_19_000000_create_failed_jobs_table',1),
(4,'2019_12_14_000001_create_personal_access_tokens_table',1),
(6,'2025_01_18_070143_create_permission_tables',3),
(7,'2025_01_25_065932_create_buckets_table',4),
(8,'2025_02_03_162248_create_customers_table',5),
(14,'2025_02_12_141931_create_orders_table',6),
(15,'2025_02_12_220458_create_order_progress_table',6),
(17,'2025_02_13_180152_create_transactions_table',7),
(18,'2025_02_19_193525_create_wishlists_table',8),
(22,'2025_03_21_223104_create_reviews_table',9),
(28,'2025_05_05_200140_create_notifications_table',10),
(36,'2025_06_04_111717_create_chats_table',11),
(37,'2025_06_08_103022_create_messages_table',11),
(38,'2025_06_15_221327_create_items_table',12),
(41,'2025_06_21_002912_create_order_items_table',13);

/*Table structure for table `model_has_permissions` */

DROP TABLE IF EXISTS `model_has_permissions`;

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `model_has_permissions` */

/*Table structure for table `model_has_roles` */

DROP TABLE IF EXISTS `model_has_roles`;

CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `model_has_roles` */

insert  into `model_has_roles`(`role_id`,`model_type`,`model_id`) values 
(1,'App\\Models\\User',1),
(2,'App\\Models\\User',2),
(4,'App\\Models\\User',7),
(1,'App\\Models\\User',8),
(3,'App\\Models\\User',13),
(4,'App\\Models\\User',14),
(4,'App\\Models\\User',15),
(3,'App\\Models\\User',16);

/*Table structure for table `notifications` */

DROP TABLE IF EXISTS `notifications`;

CREATE TABLE `notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('order','message') COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_id` bigint unsigned NOT NULL,
  `sender_id` bigint unsigned NOT NULL,
  `recipient_id` bigint unsigned NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_order_id_foreign` (`order_id`),
  KEY `notifications_sender_id_foreign` (`sender_id`),
  KEY `notifications_recipient_id_foreign` (`recipient_id`),
  CONSTRAINT `notifications_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notifications_recipient_id_foreign` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `notifications_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `notifications` */

insert  into `notifications`(`id`,`type`,`order_id`,`sender_id`,`recipient_id`,`data`,`read_at`,`deleted_at`,`created_at`,`updated_at`) values 
(4,'order',106,13,7,'Ada Pesanan Baru Bucket Biasa','2025-05-06 23:16:44',NULL,'2025-05-05 22:23:15','2025-05-06 23:16:44'),
(5,'order',106,13,14,'Ada Pesanan Baru Bucket Biasa',NULL,NULL,'2025-05-05 22:23:15','2025-05-06 01:30:51'),
(6,'order',106,13,15,'Ada Pesanan Baru Bucket Biasa',NULL,NULL,'2025-05-05 22:23:15','2025-05-05 22:23:15'),
(16,'order',110,13,7,'Ada Pesanan Baru Bucket buble',NULL,NULL,'2025-05-06 01:50:45','2025-05-06 01:50:45'),
(17,'order',110,13,14,'Ada Pesanan Baru Bucket buble',NULL,NULL,'2025-05-06 01:50:45','2025-05-06 01:50:45'),
(18,'order',110,13,15,'Ada Pesanan Baru Bucket buble',NULL,NULL,'2025-05-06 01:50:45','2025-05-06 01:50:45'),
(19,'order',111,13,7,'Ada Pesanan Baru Bucket buble',NULL,NULL,'2025-05-07 00:25:56','2025-05-07 00:25:56'),
(20,'order',111,13,14,'Ada Pesanan Baru Bucket buble',NULL,NULL,'2025-05-07 00:25:56','2025-05-07 00:25:56'),
(21,'order',111,13,15,'Ada Pesanan Baru Bucket buble',NULL,NULL,'2025-05-07 00:25:56','2025-05-07 00:25:56'),
(50,'message',106,7,2,'Progress Pembuatan Bucket Biasa (elv-2025-1696937362)','2025-05-12 01:51:26',NULL,'2025-05-12 01:41:19','2025-05-12 01:51:26'),
(51,'message',106,2,7,'Progress Pembuatan Bucket Biasa Ditolak, silahkan perbaiki dan kirim ulang progress Anda','2025-05-12 02:16:05',NULL,'2025-05-12 01:52:09','2025-05-12 02:16:05'),
(52,'message',106,7,2,'Progress Pembuatan Bucket Biasa (elv-2025-1696937362)','2025-05-12 21:48:17',NULL,'2025-05-12 02:16:37','2025-05-12 21:48:17'),
(54,'message',106,2,7,'Progress Pembuatan Bucket Biasa Ditolak, silahkan perbaiki dan kirim ulang progress Anda','2025-05-14 16:47:02',NULL,'2025-05-14 16:20:55','2025-05-14 16:47:02'),
(55,'message',106,7,2,'Progress Pembuatan Bucket Biasa (elv-2025-1696937362)','2025-05-14 16:56:39',NULL,'2025-05-14 16:55:46','2025-05-14 16:56:39'),
(57,'message',106,2,7,'Progress Pembuatan Bucket Biasa Diterima, silahkan lanjukkan ke tahap selanjutnya','2025-05-14 17:14:26',NULL,'2025-05-14 17:13:33','2025-05-14 17:14:26'),
(58,'message',106,7,2,'Progress Pembuatan Bucket Biasa (elv-2025-1696937362)','2025-05-14 17:15:52',NULL,'2025-05-14 17:15:27','2025-05-14 17:15:52'),
(59,'message',106,2,7,'Progress Pembuatan Bucket Biasa telah selesai','2025-05-14 17:18:46',NULL,'2025-05-14 17:15:59','2025-05-14 17:18:46'),
(96,'order',155,13,7,'Ada Pesanan Baru Buket snack','2025-06-26 02:45:41',NULL,'2025-06-26 02:22:25','2025-06-26 02:45:41'),
(97,'order',155,13,14,'Ada Pesanan Baru Buket snack',NULL,NULL,'2025-06-26 02:22:25','2025-06-26 02:22:25'),
(98,'order',155,13,15,'Ada Pesanan Baru Buket snack',NULL,NULL,'2025-06-26 02:22:25','2025-06-26 02:22:25'),
(99,'order',160,13,7,'Ada Pesanan Baru Bucket Bulan','2025-06-29 14:36:47',NULL,'2025-06-29 13:05:24','2025-06-29 14:36:47'),
(100,'order',160,13,14,'Ada Pesanan Baru Bucket Bulan',NULL,NULL,'2025-06-29 13:05:24','2025-06-29 13:05:24'),
(101,'order',160,13,15,'Ada Pesanan Baru Bucket Bulan',NULL,NULL,'2025-06-29 13:05:24','2025-06-29 13:05:24'),
(108,'order',165,13,7,'Ada Pesanan Baru Bucket Bulan 3',NULL,NULL,'2025-06-29 13:51:10','2025-06-29 13:51:10'),
(109,'order',165,13,14,'Ada Pesanan Baru Bucket Bulan 3',NULL,NULL,'2025-06-29 13:51:10','2025-06-29 13:51:10'),
(110,'order',165,13,15,'Ada Pesanan Baru Bucket Bulan 3',NULL,NULL,'2025-06-29 13:51:10','2025-06-29 13:51:10'),
(111,'order',170,13,7,'Ada Pesanan Baru Buket snack',NULL,NULL,'2025-07-25 22:59:04','2025-07-25 22:59:04'),
(112,'order',170,13,14,'Ada Pesanan Baru Buket snack',NULL,NULL,'2025-07-25 22:59:04','2025-07-25 22:59:04'),
(113,'order',170,13,15,'Ada Pesanan Baru Buket snack',NULL,NULL,'2025-07-25 22:59:04','2025-07-25 22:59:04'),
(114,'order',170,13,7,'Ada Pesanan Baru Buket snack',NULL,NULL,'2025-07-25 22:59:08','2025-07-25 22:59:08'),
(115,'order',170,13,14,'Ada Pesanan Baru Buket snack',NULL,NULL,'2025-07-25 22:59:08','2025-07-25 22:59:08'),
(116,'order',170,13,15,'Ada Pesanan Baru Buket snack',NULL,NULL,'2025-07-25 22:59:08','2025-07-25 22:59:08'),
(117,'message',106,2,7,'Progress Pembuatan Bucket Biasa telah selesai',NULL,NULL,'2025-07-28 18:01:07','2025-07-28 18:01:07'),
(118,'message',106,2,7,'Progress Pembuatan Bucket Biasa telah selesai',NULL,NULL,'2025-07-28 18:24:18','2025-07-28 18:24:18');

/*Table structure for table `order_items` */

DROP TABLE IF EXISTS `order_items`;

CREATE TABLE `order_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `item_id` bigint unsigned NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_item_id_foreign` (`item_id`),
  CONSTRAINT `order_items_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `order_items` */

insert  into `order_items`(`id`,`order_id`,`item_id`,`quantity`,`created_at`,`updated_at`) values 
(11,137,1,1,'2025-06-24 22:33:13','2025-06-24 22:33:13'),
(45,155,1,1,'2025-06-26 02:22:06','2025-06-26 02:22:06'),
(49,160,1,1,'2025-06-29 13:04:57','2025-06-29 13:04:57'),
(50,160,2,2,'2025-06-29 13:04:57','2025-06-29 13:04:57');

/*Table structure for table `order_progress` */

DROP TABLE IF EXISTS `order_progress`;

CREATE TABLE `order_progress` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `foto` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` enum('accepted','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_progress_order_id_foreign` (`order_id`),
  CONSTRAINT `order_progress_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `order_progress` */

insert  into `order_progress`(`id`,`order_id`,`foto`,`message`,`status`,`created_at`,`updated_at`) values 
(19,14,'employee/qqpd5KVoOdWHhUnb0j8USMv5Ot7GboINLI7PNXFe.png','<p>skdj</p>','rejected','2025-03-02 22:21:04','2025-03-12 00:18:26'),
(20,14,'employee/Wepx4F0qSmaan9gJcgkj7Qh86ABLffyRB6bseNfi.jpg',NULL,'accepted','2025-03-12 18:46:55','2025-03-14 17:59:55'),
(21,14,'employee/h301EOFfiZXX8og7UvzpS7kkb59sFQXnxFv7T1YH.png',NULL,'accepted','2025-03-14 18:28:56','2025-03-14 23:42:54'),
(34,16,'employee/jAtvfWaVdEoSkWLcXbyMbELSjjxvwiU9STB7C5RU.png','<p>mohon untuk di periksa lagi</p>','rejected','2025-05-04 21:58:21','2025-05-05 00:09:04'),
(35,16,'employee/29XTR0utdzavRnXDr15DwsumaWXpJX7feRBXqa6s.jpg',NULL,'accepted','2025-05-05 00:10:54','2025-05-05 00:12:15'),
(36,16,'employee/DAJIPnq859YrrF7vmPO9UW8XefnVAQqapSs2FfIy.jpg',NULL,'accepted','2025-05-05 00:15:28','2025-05-05 00:16:31'),
(37,16,'employee/9b6j2pVbRtMCpnqyWB8jOPW8HtMg5tu2dnPFSC9Z.jpg',NULL,NULL,'2025-05-05 00:35:25','2025-05-05 02:32:10'),
(101,106,'employee/Iba5OOgej9avewm8McfOUndJCPKUp0hiXQFWrm68.jpg','<p>tes</p>','rejected','2025-05-12 01:41:19','2025-05-12 01:52:09'),
(102,106,'employee/xoCBETfnBtiF6g0CkwF6t1hqUqZaqhWvNvNoCqgs.jpg','<p>coba perbaiki lagi yaa</p>','rejected','2025-05-12 02:16:37','2025-05-14 16:20:55'),
(103,106,'employee/yI9rpRSRo4IRZkqtLV1xWdNhpYkARfzdCiqiiyva.jpg',NULL,'accepted','2025-05-14 16:55:46','2025-05-14 17:13:33'),
(104,106,'employee/0VFj7PPKaiZKXZL1ugpWP22MNXYifSiUH6THEgfI.jpg',NULL,'accepted','2025-05-14 17:15:27','2025-07-28 18:24:13');

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` bigint unsigned NOT NULL,
  `bucket_id` bigint unsigned DEFAULT NULL,
  `no_faktur` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price_bucket` decimal(20,2) DEFAULT NULL,
  `total_price` decimal(20,2) NOT NULL,
  `custome_order` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `order_status` enum('capture','process','success') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'capture',
  `user_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `no_faktur` (`no_faktur`),
  KEY `orders_customer_id_foreign` (`customer_id`),
  KEY `orders_user_id_foreign` (`user_id`),
  KEY `bucket_id` (`bucket_id`),
  CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`bucket_id`) REFERENCES `buckets` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `orders` */

insert  into `orders`(`id`,`customer_id`,`bucket_id`,`no_faktur`,`price_bucket`,`total_price`,`custome_order`,`order_status`,`user_id`,`created_at`,`updated_at`) values 
(14,4,21,'elv-2025-43938277',32423.00,33423.00,'<p>smd djs sjnd sdnsd sjndks djsndjknsd sjdns djsdnskd sdkmskd sdk</p><p><strong>ksdm</strong></p>','success',7,'2025-02-16 23:00:53','2025-03-14 23:42:54'),
(16,4,23,'elv-2025-495508937',200000.00,201000.00,NULL,'success',7,'2025-02-16 23:16:19','2025-05-05 02:32:10'),
(17,4,24,'elv-2025-810610746',2343.00,3343.00,NULL,'capture',NULL,'2025-02-17 02:13:08','2025-05-04 01:48:56'),
(49,4,24,'elv-2025-603259310',2343.00,3343.00,NULL,'capture',NULL,'2025-03-27 23:51:59','2025-05-02 03:06:59'),
(53,4,17,'elv-2025-281581568',400000.00,401000.00,NULL,'capture',NULL,'2025-03-28 00:24:42','2025-05-02 03:08:23'),
(56,4,26,'elv-2025-94840114',300000.00,301000.00,NULL,'capture',NULL,'2025-03-28 00:29:38','2025-03-28 00:29:38'),
(106,4,2,'elv-2025-1696937362',200000.00,201000.00,NULL,'success',7,'2025-05-05 22:23:15','2025-07-28 18:24:13'),
(110,4,22,'elv-2025-1692766844',23423.00,24423.00,NULL,'capture',NULL,'2025-05-06 01:50:44','2025-05-06 01:50:44'),
(111,4,22,'elv-2025-426209467',23423.00,24423.00,NULL,'capture',NULL,'2025-05-07 00:25:56','2025-05-07 00:25:56'),
(137,4,21,'elv-2025-312666783',32423.00,36423.00,NULL,'capture',NULL,'2025-06-24 22:33:13','2025-06-24 22:33:13'),
(155,4,30,'elv-2025-23234046',150000.00,154000.00,NULL,'process',7,'2025-06-26 02:22:06','2025-06-26 02:45:00'),
(160,4,1,'elv-2025-1196553465',300000.00,314000.00,NULL,'process',7,'2025-06-29 13:04:57','2025-06-29 14:36:30'),
(165,4,21,'elv-2025-292392734',32423.00,33423.00,NULL,'capture',NULL,'2025-06-29 13:50:00','2025-06-29 13:51:10'),
(170,4,30,'elv-2025-1421762997',150000.00,151000.00,NULL,'capture',NULL,'2025-07-25 22:58:19','2025-07-25 22:59:08');

/*Table structure for table `password_reset_tokens` */

DROP TABLE IF EXISTS `password_reset_tokens`;

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `password_reset_tokens` */

insert  into `password_reset_tokens`(`email`,`token`,`created_at`) values 
('unmusmbkm@gmail.com','$2y$12$z/r22pllwGsI/6l0WW8xhuW6Y7KiHmPRGqVuGin3tR15gF7GBlXXO','2025-01-30 00:06:01');

/*Table structure for table `permissions` */

DROP TABLE IF EXISTS `permissions`;

CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `permissions` */

/*Table structure for table `personal_access_tokens` */

DROP TABLE IF EXISTS `personal_access_tokens`;

CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `personal_access_tokens` */

insert  into `personal_access_tokens`(`id`,`tokenable_type`,`tokenable_id`,`name`,`token`,`abilities`,`last_used_at`,`expires_at`,`created_at`,`updated_at`) values 
(127,'App\\Models\\User',7,'Adam','0947df4b732a1d083d82222445e3aa01ca3f1cdc4980c19c75111f59da9b0ac7','[\"*\"]','2025-06-11 00:18:48','2025-06-13 16:13:26','2025-05-14 16:13:26','2025-06-11 00:18:48'),
(143,'App\\Models\\User',13,'Bulan','91b2946655a81be8146a42524ce714bb041b0ee6dfabdec6aa70fb178dcef604','[\"*\"]','2025-07-12 00:03:38','2025-07-24 18:08:59','2025-06-24 18:09:00','2025-07-12 00:03:38'),
(148,'App\\Models\\User',13,'Bulan','dad6ecb28758d7228ba4451681182a71ae5123636d883abcad09af46d4ab1d72','[\"*\"]','2025-06-29 13:50:41','2025-07-29 12:53:02','2025-06-29 12:53:02','2025-06-29 13:50:41'),
(151,'App\\Models\\User',7,'Adam','c0d31e08576bbbed888faa68a28817008b8f01ae3f35db962412a77354532174','[\"*\"]','2025-07-28 17:38:13','2025-07-29 16:24:55','2025-06-29 16:24:55','2025-07-28 17:38:13'),
(153,'App\\Models\\User',13,'Bulan','2849fefb3b04151f8b16569b757b4661a48268e1c26060327b831fdeeb0812c5','[\"*\"]','2025-07-28 18:07:23','2025-08-27 18:07:14','2025-07-28 18:07:14','2025-07-28 18:07:23');

/*Table structure for table `reviews` */

DROP TABLE IF EXISTS `reviews`;

CREATE TABLE `reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `bucket_id` bigint unsigned NOT NULL,
  `rating` double(8,1) NOT NULL,
  `review` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_order_id_foreign` (`order_id`),
  KEY `reviews_user_id_foreign` (`user_id`),
  KEY `reviews_bucket_id_foreign` (`bucket_id`),
  CONSTRAINT `reviews_bucket_id_foreign` FOREIGN KEY (`bucket_id`) REFERENCES `buckets` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `reviews_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `reviews` */

insert  into `reviews`(`id`,`order_id`,`user_id`,`bucket_id`,`rating`,`review`,`deleted_at`,`created_at`,`updated_at`) values 
(1,14,13,21,1.5,'Produk ini bagus banget....',NULL,'2025-03-22 16:27:49','2025-03-22 16:27:49'),
(7,106,13,2,5.0,'Pengerjaannya cepat dan tepat,, serta tahapan pembuatannya juga diperlihatkan\nAyoo Pesan Sekarang..',NULL,'2025-05-14 17:21:27','2025-05-14 17:21:27');

/*Table structure for table `role_has_permissions` */

DROP TABLE IF EXISTS `role_has_permissions`;

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `role_has_permissions` */

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `roles` */

insert  into `roles`(`id`,`name`,`guard_name`,`created_at`,`updated_at`) values 
(1,'admin','web','2025-01-19 21:11:41','2025-01-19 21:11:41'),
(2,'pemilik','web','2025-01-19 21:11:41','2025-01-19 21:11:41'),
(3,'pelanggan','web','2025-01-19 21:11:41','2025-01-19 21:11:41'),
(4,'pekerja','web','2025-01-19 21:11:41','2025-01-19 21:11:41');

/*Table structure for table `transactions` */

DROP TABLE IF EXISTS `transactions`;

CREATE TABLE `transactions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `token_pay` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transaction_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pdf_url` text COLLATE utf8mb4_unicode_ci,
  `payment_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transaction_status` enum('pending','settlement','failed','expired','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `transaction_time` timestamp NULL DEFAULT NULL,
  `settlement_time` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_pay` (`token_pay`),
  KEY `transactions_order_id_foreign` (`order_id`),
  CONSTRAINT `transactions_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `transactions` */

insert  into `transactions`(`id`,`order_id`,`token_pay`,`transaction_id`,`pdf_url`,`payment_type`,`transaction_status`,`transaction_time`,`settlement_time`,`created_at`,`updated_at`) values 
(18,14,NULL,'4dd61284-51e2-4c1a-b7bc-c7b74c58ea48',NULL,'bank_transfer','settlement','2025-02-16 21:00:52','2025-02-16 21:01:35','2025-02-16 23:00:53','2025-02-16 23:01:36'),
(20,16,NULL,'101b007d-d33a-437d-aa01-e4cacbe04efd',NULL,'bank_transfer','settlement','2025-02-16 21:16:19','2025-02-16 21:20:31','2025-02-16 23:16:19','2025-02-16 23:20:35'),
(21,17,NULL,'32b21c7c-0e7f-4427-80eb-185838ceffdd',NULL,'bank_transfer','settlement','2025-02-17 00:13:07','2025-02-17 00:13:36','2025-02-17 02:13:08','2025-02-17 02:13:37'),
(55,49,'0a58b39e-45c9-48f0-b986-68b7d10a8bfb','fb481f08-4e0d-4f24-b83c-d26fb27eb1dd','https://app.sandbox.midtrans.com/snap/v1/transactions/0a58b39e-45c9-48f0-b986-68b7d10a8bfb/pdf','bank_transfer','settlement','2025-03-27 21:51:45','2025-03-27 23:51:59','2025-03-27 23:51:59','2025-03-27 23:51:59'),
(59,53,'17aecbcf-9d68-4433-bad1-a682ad60246f','363aaf0a-6f2f-4737-8762-82ff89e09da0','https://app.sandbox.midtrans.com/snap/v1/transactions/17aecbcf-9d68-4433-bad1-a682ad60246f/pdf','bank_transfer','settlement','2025-03-27 22:24:40','2025-03-28 00:25:13','2025-03-28 00:24:42','2025-03-28 00:25:13'),
(62,56,'92e16c3a-81d8-40ff-b2ef-e1bfcaaffa06','82c6e7f5-4846-4d69-a99a-a543af7061fe','https://app.sandbox.midtrans.com/snap/v1/transactions/92e16c3a-81d8-40ff-b2ef-e1bfcaaffa06/pdf','bank_transfer','pending','2025-03-27 22:29:35',NULL,'2025-03-28 00:29:38','2025-06-25 23:24:36'),
(111,106,'a95bcee4-a37d-4228-a025-8ae48dcc7eb7','3a107756-f5c0-4fcb-9d2c-84e94826903a','https://app.sandbox.midtrans.com/snap/v1/transactions/a95bcee4-a37d-4228-a025-8ae48dcc7eb7/pdf','bank_transfer','settlement','2025-05-05 22:22:47','2025-05-05 22:23:15','2025-05-05 22:23:15','2025-05-05 22:23:15'),
(115,110,'843237c1-dd47-460f-a8c9-18a7fa5c125e','bceff0aa-d77b-4b29-b7a2-f703f4a601b8','https://app.sandbox.midtrans.com/snap/v1/transactions/843237c1-dd47-460f-a8c9-18a7fa5c125e/pdf','bank_transfer','settlement','2025-05-06 01:50:33','2025-05-06 01:50:44','2025-05-06 01:50:44','2025-05-06 01:50:44'),
(116,111,'39437439-e364-4bb8-8a6a-8289f1075cbf','67a6af45-8ba8-4d86-9592-4e71509c032b','https://app.sandbox.midtrans.com/snap/v1/transactions/39437439-e364-4bb8-8a6a-8289f1075cbf/pdf','bank_transfer','settlement','2025-05-07 00:25:41','2025-05-07 00:25:56','2025-05-07 00:25:56','2025-05-07 00:25:56'),
(144,137,'897c8c8f-053f-4ef9-9757-e15ecb44c963','9686f986-de8e-4abe-b0c1-e337fe7950c9','https://app.sandbox.midtrans.com/snap/v1/transactions/897c8c8f-053f-4ef9-9757-e15ecb44c963/pdf','bank_transfer','settlement','2025-06-24 22:33:00','2025-06-24 22:33:08','2025-06-24 22:33:13','2025-06-25 23:28:28'),
(165,155,'604d18c8-7574-4fc3-aed5-96c5bd35e917','15d32032-5fdd-4643-be90-8152be93e337','https://app.sandbox.midtrans.com/snap/v1/transactions/604d18c8-7574-4fc3-aed5-96c5bd35e917/pdf','bank_transfer','settlement','2025-06-26 02:22:08','2025-06-26 02:22:25','2025-06-26 02:22:06','2025-06-26 02:22:25'),
(170,160,'4bb4ef3a-ebfa-4d0b-823e-be0e7342b1df','6f2c1533-70cb-4d53-8b0c-bf2ea8b08a97','https://app.sandbox.midtrans.com/snap/v1/transactions/4bb4ef3a-ebfa-4d0b-823e-be0e7342b1df/pdf','bank_transfer','settlement','2025-06-29 13:05:02','2025-06-29 13:05:24','2025-06-29 13:04:57','2025-06-29 13:05:24'),
(175,165,'9d90407a-7479-4864-b2ce-5e1f94150a1a','60fea71d-12ad-4700-a5df-96b71c6f467d','https://app.sandbox.midtrans.com/snap/v1/transactions/9d90407a-7479-4864-b2ce-5e1f94150a1a/pdf','bank_transfer','settlement','2025-06-29 15:50:02','2025-06-29 13:51:10','2025-06-29 13:50:00','2025-06-29 13:51:10'),
(180,170,'5aaa1339-b9ac-400b-ba61-4fa74ed8bc6c','8a32f3e4-17e1-47d4-af16-aa107f1a7391',NULL,'qris','settlement','2025-07-25 22:58:21','2025-07-25 22:59:08','2025-07-25 22:58:19','2025-07-25 22:59:08');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` bigint unsigned NOT NULL,
  `status_akun` enum('aktif','non_aktif') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`email_verified_at`,`password`,`remember_token`,`role_id`,`status_akun`,`created_at`,`updated_at`) values 
(1,'tes','admin@admin.com',NULL,'$2y$12$0f8hmMnXz1jR11S9IqoWgOXqU5OROPzByZEWXqhulNOh5kkv6kU9W',NULL,1,'aktif','2025-01-12 15:10:21','2025-04-12 13:32:36'),
(2,'CEO','ceo@gmail.com',NULL,'$2y$12$0f8hmMnXz1jR11S9IqoWgOXqU5OROPzByZEWXqhulNOh5kkv6kU9W',NULL,2,'aktif','2025-01-28 12:13:36','2025-01-28 12:13:36'),
(7,'Adam','test@example.com',NULL,'$2y$12$o5eGcAQmnN1GlyRobTwd1eIk7NFfcfhilBR0FPVWDfTrOlvBfsKEa',NULL,4,'aktif','2025-01-29 11:20:09','2025-06-29 16:24:35'),
(8,'Tugas 2','text@example.com',NULL,'$2y$12$n0GyyEn0zLjyX1bJi/nA/.t8/eCvGLP/JSz0h4VTZLbcOYtLTMYp2',NULL,1,'non_aktif','2025-01-29 14:26:09','2025-01-30 12:33:35'),
(13,'Bulan','thenext010822@gmail.com',NULL,'$2y$12$kCLyjEln/6qd1iSf4No1wuoJaC94A4xH4DfXMwWRBNLF0.vmFKwLG',NULL,3,'aktif','2025-02-03 23:13:01','2025-05-26 14:11:28'),
(14,'Tasya','tasya@gmail.com',NULL,'$2y$12$KmEOgDSDfMX3lF5xb.mUbOTZwHvShekp64h16FZSceutlGkKj50Am',NULL,4,'aktif','2025-03-26 17:39:59','2025-03-26 17:39:59'),
(15,'yuni','kakapace25@gmail.com',NULL,'$2y$12$LjDSNcM1O8aJvdFL8BXsh.ehE9NYeJ5KR/.Y3eMirgM9kzxh9DWke',NULL,4,'aktif','2025-04-12 13:31:17','2025-05-01 23:24:40'),
(16,'risma','nurreskhy620@gmail.com',NULL,'$2y$12$MizQoScYWlaGQT7beVA8cetQ8kHFNgmhCLBRlBhqhC8ONR5r2IkXK',NULL,3,'aktif','2025-04-12 13:38:55','2025-04-12 13:38:55');

/*Table structure for table `wishlists` */

DROP TABLE IF EXISTS `wishlists`;

CREATE TABLE `wishlists` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `bucket_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wishlists_bucket_id_foreign` (`bucket_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `wishlists_bucket_id_foreign` FOREIGN KEY (`bucket_id`) REFERENCES `buckets` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `wishlists` */

insert  into `wishlists`(`id`,`user_id`,`bucket_id`,`created_at`,`updated_at`) values 
(56,13,16,'2025-03-17 23:24:43','2025-03-17 23:24:43'),
(57,13,26,'2025-03-20 01:03:32','2025-03-20 01:03:32'),
(60,13,1,'2025-03-24 14:28:02','2025-03-24 14:28:02'),
(62,16,30,'2025-04-12 13:39:17','2025-04-12 13:39:17');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
