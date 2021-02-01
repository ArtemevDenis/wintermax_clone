-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: wintermax
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `ID` mediumint NOT NULL AUTO_INCREMENT,
  `ownerID` mediumint NOT NULL,
  `productsList` mediumtext NOT NULL,
  `promoCode` varchar(100) NOT NULL DEFAULT '',
  `totalPrice` varchar(100) NOT NULL DEFAULT '',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,4,'15,1,9','','87925.35',1),(2,1,'1,1','wintermax5','8861.4',1),(3,3,'1,1,1,1','','18707.4',1),(4,1,'2,2,2','','122374.5',1),(5,1,'9','','26866',1),(6,1,'3','','13120',1),(7,3,'15,3,6,7,11,13,16','','124674.2',1),(8,4,'8,5,11,9,16','wintermax10','132019.45',1),(9,3,'10,10','wintermax10','27302',1),(10,3,'4,12,14','','',0);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `ID` mediumint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` varchar(11) NOT NULL,
  `text` mediumtext NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'Выставка проекта Surf Siberia в Peak','01.01.2021','С 4 по 22 февраля в магазине уличной и аутдор-одежды Peak состоится выставка проекта Surf Siberia и презентация коллекции кастомных досок для серфинга.\nПроект Surf Siberia — о самобытном российском серфинге, который мог сформироваться только в пределах нашей колоритной страны. Ребята из команды стараются показать и доказать своим примером: серфинг может быть там, где его не ищут, и крутые волны можно поймать, не выезжая за пределы страны.\nSurf Siberia серфят в местах, где обывателю не придет в голову даже искупаться — на зимнем Сахалине или в холодных волнах Баренцева моря. Основатель проекта и режиссер Константин Кокорев описывает свое увлечение романтично: «Путешествия по России — как черно-белая фотография: большинством забытая, многим не понятая. Но есть четкие грани света и тени, которые и разделяют людей на тех, кто против, и кто живет в предвкушении грядущей поездки».\nНа мероприятии Surf Siberia покажут фильм «Прибой»: о долгом и сложном путешествии серферов от Калининграда до Камчатки и от Ледовитого океана до Каспийского моря. Гостей ждет захватывающая фотовыставка работ из путешествий, а также презентация коллекции кастомных досок.\nКонстантин Кокорев разрабатывает шейпы серфбордов и придумывает уникальные рисунки, а Андрей Рибок в ответе за качество материалов и финальный результат.\nДоски Custom Surf Production сделаны из дерева, и этому есть множество причин. Древесина — экологичный и возобновляемый материал, эстетически приятный и многогранный. С деревом приятно работать и интересно наблюдать за процессом — на мероприятии гости смогут увидеть все этапы производства в действии. У серфов, кстати, есть и городское прошлое: в элементах досок использовались обломки от старых скейтбордов.\nВыставка продлится две недели — с 4 по 22 февраля на втором этаже магазина Peak по адресу Петровский бульвар 8/1. В день открытия гостей ждет знакомство с ребятами Surf Siberia, а напитки предоставит команда BrewDog.\nУвидимся в PEAK!'),(2,'ПРОКАТ СНОУБОРДОВ И ГОРНЫХ ЛЫЖ','02.01.2021','В прокат предоставляются сноуборды и горные лыжи, прошедшие суровую подготовку к сезону в мастерской. Представлены бренды: SALOMON, BURTON, HEAD. Cноуборды малой жесткости и с классическим прогибом. Тарифы буднего дня действуют с понедельника по четверг, с 10:00 до 22:00, исключая праздничные дни.\nСтоимость проката указана за единицу экипировки\n\nПримечания:\nСрок проката от 1 суток, т.е. от 24 часов.\nВозможно бронирование по телефону\n\nУсловия проката:\nЧтобы взять сноуборд напрокат нужно:\n— предъявить документ;\n— оставить залог;\n— оплатить полную стоимость проката сноуборда.\n\nВсе доски и горные лыжи в нашем прокате - качественные снаряды известных мировых брендов Salomon и Head. Большинство сноубордов - мягкие, с классическим прогибом, отлично подойдут для новичков.\nДля продвинутых райдеров у нас есть специальные жесткие экземпляры с карбоновыми вставками.\nБотинки безопасны для здоровья - проходят антибактериальную обработку!'),(3,'Ликвидация зимних коллекций прошлых лет!','04.01.2021','С 21 октября 2020 г. в сети Триал-Спорт ликвидация зимних коллекций прошлых лет со скидками от 40 до 80% на: горные и беговые лыжи, сноуборды, ледовые коньки и хоккейную экипировку, товары для туризма и скалолазания, одежду и обувь!\n\n\nСкидка по дисконтной карте на уцененный товар не распространяется.\n\nСкидки действительны пока товар участвующий в акции есть в наличии в магазинах.'),(4,'Предзаказ на лыжи Rossignol (спортцех) на сезон Зима 2021-2022','10.01.2021','Дорогие друзья!\nКомпания WinterMax, от имени официального дистрибьютора французских беговых лыж Rossignol, объявляет прием предзаказов на коньковые и классические беговые лыжи спортцех Rossignol.\nВ предзаказе доступны лыжи производства Франции. Именно на этих лыжах выступают чемпионы и призеры этапов Кубка Мира.\nЭти лыжи уникальны в своем роде, т.к. изготавливаются почти в ручном режиме.\nТакже доступны лыжи из Испании, которые тщательно подбираются и дополнительно промеряются, о чем свидетельствует дополнительный стикер с данными о замерах.\nВы можете выбрать: 1) нужную модель; 2) нужную структуру; 3) точный необходимый вес.\nЛыжи будут изготовлены строго под Ваш вес, маркировка на паре будет содержать Ваши параметры и фамилию.\nВ розницу данные лыжи продаваться не будут.\nОбращаем Ваше внимание, что с сезона 17-18, компания Rossignol перешла на новый стандарт платформ для креплений IFP и креплений Turnamic ®, которые поддерживают стандарт ботинок NNN, но не совместимы с остальными типами креплений и платформ.\nВ связи с чем, при заказе лыж спортцех Rossignol необходимо заказать крепления для них.\nДля лыж данного уровня производитель рекомендует крепления PRO или RACE соответственно, как для конькового, так и классического хода.\nПри заказе лыж, на крепления распространяется спец. цена. Цену Вы можете уточнить в магазине.\nДля предварительного выбора структуры для французских лыж можно скачать файл.\nДля того, чтобы поучаствовать в предзаказе, обращайтесь в магазины сети WinterMax вашего города.\nЗаказы принимаются до 15 марта 2021 года включительно.');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `ID` mediumint NOT NULL AUTO_INCREMENT,
  `ownerID` mediumint NOT NULL,
  `productsList` mediumtext NOT NULL,
  `addressDelivery` varchar(1000) NOT NULL,
  `dateDelivery` date NOT NULL,
  `date` date NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `totalPrice` int unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,4,'15,1,9','Улица Ленина','2021-01-30','2021-01-29',4,87925),(2,1,'1,1','wrgegwe','2021-02-07','2021-01-29',3,8861),(3,3,'1,1,1,1','fwefwefwef','2021-02-06','2021-01-29',2,18707),(4,1,'2,2,2','wfwefwef','2021-02-07','2021-01-30',4,122375),(5,1,'9','erfwefw','2021-02-18','2021-02-01',4,26866),(6,3,'15,3,6,7,11,13,16','Город, улица, дом','2021-02-03','2021-02-01',4,124674),(7,4,'8,5,11,9,16','Город2, улица 2, дом2','2021-02-05','2021-02-01',4,132019),(8,1,'3','Москва, Пискарёвское шоссе, 15','2021-02-02','2021-02-01',4,13120),(9,3,'10,10','Тула, Кирова-10','2021-02-07','2021-02-01',4,27302);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `ID` mediumint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `cost` int unsigned NOT NULL,
  `type` varchar(100) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `popular` int unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'CCM Tyke Exp YTH',4923,'skates','Коньки прогулочные CCM Tyke. Легкие маневренные и удобные ледовые коньки. Литой корпус PVC, состоит из двух частей. Изготовлены из морозостойкого пластика. Мягкий, съемный ботинок для удобства и тепла, легко вынимается для просушки. Фиксация при помощи бакли, которой можно отрегулировать оптимальную посадку на ноге.',200),(2,'Bauer Vapor 2X BTH19 SR',47990,'skates','Коньки BAUER VAPOR 2X, профессиональная модель линейки VAPOR 2019 года. При создании коньков использовалась система ACCELFLEX SYSTEM, эта система обеспечивает высокую эффективность и дополнительную гибкость коньков. Ботинок выполнен из композитного материала 3D LASTED CURV, который обладает очень легким весом и хорошими защитными функциями. Данная модель имеет ассиметричный носок, что придает коньку максимальное удобство. Язычок RECOIL TONGUE из войлока плотностью 48 унций усилен защитной вставкой в области плюсневой кости. Внутренняя подкладка выполнена из нового материала AERO FOAM+, которая обладает улучшенными свойствами во время формовки. Так же для максимального комфорта в области лодыжки используется подкладка COMFORT EDGE',150),(3,'CCM Ribcor 74K JR',13120,'skates','Каркас из синтетического композита, прочный ботинок с элитной структурной жесткостью. Подкладка: Материал из микроволокна с защитными зонами DuraZone, не подверженными истиранию, для комфорта и долговечности.\nЯзычок: Войлочный язычок 7-мм с армирующими слоями обеспечивает комфорт и защиту.\nПодошва: Жесткий профиль увеличивает энергию, передаваемую ботинку.\nСтелька: Обеспечивает хорошую посадку и комфорт.\nСтойка: SpeedBlade 4.0 с лучшим углом атаки, делает больше шаг и улучшает повороты.\nЛезвие: SpeedBlade долго не изнашивается, что позволяет дольше сохранить прекрасную функциональность.',300),(4,'Graf PeakSpeed PK 1900 Cobra 2000 JR',8490,'skates','Graf PK1900 Cobra 2000 - хоккейные коньки начального / среднего уровня.\n- Лезвие Cobra SS из нержавеющей стали с радиусом 10 футов.\n- Прочный стакан Cobra 2000.\n- Асимметричный язычок, который менее подвержен смещению в стороны.\n- Носок с защитой от ударов.\n- Войлочнавя подкладка.',160),(5,'Edea Motivo JR',20787,'skates','Фигурные коньки Edea Motivo JR',90),(6,'GRAF Montana Blk JR',6300,'skates','Фигурные коньки GRAF Montana Blk JR самый популярный любительский фигурный конек в России!\nИзготовлены из синтетической кожи на основе классической колодки GRAF,обеспечивающей идеальную посадку ноги и удобство при катании.\nВлагоотводящая внутренняя отделка ботинка.\nПластиковая подошва.\nКлассическое фигурное лезвие.',130),(7,'Jackson Softec ST1900 Classic SR',1606,'skates','Фитнес коньки Jackson Softec ST1900 Classic SR',233),(8,'Head Kore 99',62590,'skiing','Всепогодный истребитель на все случаи жизни. Многие тестеры отметили высокие характеристики модели KORE 99 именно как универсальной горной лыжи экспертного уровня для катания по трассе/вне трассы в режиме 50/50. При достаточно широкой талии имеет способность чисто и технично карвить по трассе - это главное и отличительное преимущество этой модели. Заметно шире и жестче, чем KORE 93 (и жестче, чем KORE 105), что сильно повышает ее скоростной лимит и способность держать нагрузку на жестком, что очень важно отметить. Горные лыжи хорошо прижаты к снегу, не нервничают на скорости, легко рулятся, перекантовка идет ровно и быстро, держат дугу под нагрузкой неожиданно хорошо. К фантастической легкости и маневренности этой райдовой модели добавлена многоцелевая универсальность, благодаря которой на KORE 99 можно отлично зажечь по трассе в поисках нераскатанного участка, и, найдя его, в полной мере насладиться фрирайдовым катанием в нетронутом снегу - это настоящий вездеход, а не паркетник. Понравятся экспертам и хорошо катающимся лыжникам, которым нужен универсал высокого уровня. В сезоне 2020 в конструкцию добавили ударопрочности в виде металлического бампера пятки.\nОСОБЕННОСТИ:\nКонструкция: Graphene-KOROYD-Carbon Sandwich Cap;\nСердечник: легкое дерево KARUBA;\nУсиление карбоном и графеном;\nТехнология Topless;\nРаспределение веса Light Weight;\nUHM C база со структурой;\nИнтерфейс: отсутствует (flat)',533),(9,'Head Supershape i.Titan SW MFPR',28280,'skiing','Конструкция: Graphene Worldcup Sandwich Cap;\nСердечник: дерево;\nУсиление: 2 слоя титанала по 0,6 мм, графен;\nUHM C база со структурой Race;\nИнтерфейс: Платформа MultiFlex Base PowerRAIL',50),(10,'HEAD WC Rebels i.Shape Pro AB PR',16060,'skiing','Новая модель для совершенствующихся - если вы не эксперт, то все равно можете прогрессировать к более высокому уровню на лыжах со спортивным дизайном. Эта модель для горнолыжников, катающихся на средних и небольших скоростях - она приятно вас удивит неутомимостью и легкостью. i.Shape Pro поможет вам прогрессировать в вашем катании весь день и каждый день без напряжения - радиус 13,4 метров универсален и лоялен. Легкая, но очень прочная конструкция с титаналом и сайдволами дадут вам хорошую поддержку и необходимую, но не чрезмерную упругость. Хорошо стоит на кантах в средних дугах - торсионная жесткость лыж на достаточно хорошем уровне. Также на лыжах установлена практичная металлическая защита мыска. Для подготовленной трассы.\nСкорость     Средняя скорость\nМастерство     Совершенствующийся\nТрасса/Вне трассы     Трасса 100%\nДлина     149, 156, 163, 170, 177\nРадиус бокового выреза     13,4/170',400),(11,'Head WC Rebels iGS RD Pro SW RP',29910,'skiing','Лыжи олимпийских чемпионов! Цеховые гигантские модели с радиусами менее 30 метров - для соревнований класса Masters и национальных. Супер стабильны, позволяют точно и очень четко контролировать самые высокие хода, но свою длину компенсируют высокой маневренностью и лояльностью. Что характерно для гигантов HEAD: лыжи хоть и длиннорадиусные, но достаточно мягкие и эластичные. Дают ощущение идеального скоростного скольжения, влипают в склон на скорости, четко ведут траекторию. Спустившись вниз и переведя дух, невольно спрашиваешь себя, как настолько послушные лыжи могут держать высокую скорость? Секрет в распределении жесткости и балансировке. Понравится экспертам и спортсменам, ищущим идеальную скорость.',155),(12,'Snow Moto MINION Despicable ME yellow',7050,'sleigh','НОВИНКА 2017! Облегченная стальная рама- снегокат стал легче. Очень длинное ровное сиденье, на котором уместятся двое: и ребенок, и взрослый. Карвинговые лыжи Twin Tip- скольжение и торможение легкое и безопасное. Благодаря аэродинамичным линиям и формам, они способны развивать нужную скорость, но в тоже время отвечая безопасности легко и быстро тормозят. Снегокаты SNOW MOTO помогут быстрому развитию общей моторики, приобретению навыков координации и равновесия ребенка. Миньоны- забавные и веселые человечки. И вот один из представителей уже здесь! Самый яркий, самый необыкновенный и несомненно самый веселый. Нагрузка до 68 кг.\nСделайте подарок ребенку- и он обретет друга.',101),(13,'YAMAHA Apex SNOW BIKE Titanium',7200,'sleigh','Новая модель зимы 2016-2017 г!\nYM13001 Снегокат YAMAHA Apex SNOW BIKE Titanium black/red - единственная лицензионная модель снегокатов Ямаха в России!',110),(14,'Снегокат Тимка Спорт 1',2650,'sleigh','Снегокат Тимка Спорт 1 создан для детей от 7 до 12 лет. Имеет сварную конструкцию из стальных труб, пластмассовые лыжи и мягкое сиденье, обтянутое искусственной кожей с рисунком. Усиленный тормоз эффективен на обледенелой поверхности.',210),(15,'BURTON CUSTOM FLYING V',59350,'snowboard','В индустрии не так уж много легендарных досок. На память приходит несколько моделей, которые производятся уже не годами - десятилетиями, и которые обладают статусом проверенной временем гарантии стабильности. Burton Custom наверняка будет первым вариантом, который Вы вспомните, ведь эта модель производится уже более 20 лет, и на ней успели покататься почти все райдеры команды, которые и сформировали сноубординг в том виде, в котором он известен нам сейчас. Не ждите того, что эта модель вдруг исчезнет из коллекции Burton, легенды так просто не сдаются!',1000),(16,'BURTON THE THROWBACK',13750,'snowboard','Наверняка Вы никогда не держали в руках модель компании Burton - Backhill, выпущенную в 1981 году. Но даже по прошествии стольких лет можно прикоснуться к классике с этим серфбордом The Throwback, который внешне точно такой же как Backhill, но содержит внутри самую современную начинку (с поправкой на модель доски, конечно). Симметричная геометрия Twin, прогиб V-Rocker, сердечник FSC™ Certified Ply и стекловолокно Biax для универсальной гибкости и торсионной жесткости. Настоящая классика в современной обработке!',400);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productsimg`
--

DROP TABLE IF EXISTS `productsimg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productsimg` (
  `ID` mediumint NOT NULL AUTO_INCREMENT,
  `productID` mediumint NOT NULL,
  `img` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `productID` (`productID`),
  CONSTRAINT `productsimg_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productsimg`
--

LOCK TABLES `productsimg` WRITE;
/*!40000 ALTER TABLE `productsimg` DISABLE KEYS */;
INSERT INTO `productsimg` VALUES (1,1,'Коньки CCM Tyke Exp YTH.jpg'),(2,2,'Коньки хоккейные Bauer Vapor 2X BTH19 SR.png'),(4,3,'Коньки хоккейные CCM Ribcor 74K JR_2.jpeg'),(5,3,'Коньки хоккейные CCM Ribcor 74K JR_3.jpeg'),(8,5,'Фигурные коньки Edea Motivo JR.png'),(9,6,'Фигурные коньки GRAF Montana Blk JR.jpeg'),(10,7,'Фитнес коньки Jackson Softec ST1900 Classic SR.jpeg'),(11,8,'Горные лыжи Head Kore 99 + крепления ATTACK2 13 AT Demo Brake 110.jpg'),(12,9,'Горные лыжи Head Supershape i Titan SW MFPR.jpg'),(13,10,'Горные лыжи HEAD WC Rebels i.Shape Pro AB PR.jpg'),(14,11,'Горные лыжи Head WC Rebels iGS RD Pro SW RP WCR 14 Masters.jpg'),(15,12,'37018 Снегокат Snow Moto MINION Despicable ME yellow_1.jpg'),(16,12,'37018 Снегокат Snow Moto MINION Despicable ME yellow_2.jpg'),(17,12,'37018 Снегокат Snow Moto MINION Despicable ME yellow_3.jpg'),(18,13,'Снегокат YAMAHA Apex SNOW BIKE Titanium_1.jpg'),(19,13,'Снегокат YAMAHA Apex SNOW BIKE Titanium_2.jpg'),(20,14,'Снегокат Тимка Спорт 1_1.jpg'),(21,14,'Снегокат Тимка Спорт 1_2.jpg'),(22,14,'Снегокат Тимка Спорт 1_3.jpg'),(23,14,'Снегокат Тимка Спорт 1_4.jpg'),(24,14,'Снегокат Тимка Спорт 1_5.jpg'),(25,15,'Сноуборд BURTON CUSTOM FLYING V.jpg'),(26,16,'Сноуборд BURTON THE THROWBACK.jpg'),(27,4,'1611948971364_Коньки хоккейные Graf PeakSpeed PK 1900 Cobra 2000 JR _1.jpg'),(28,4,'1611948971368_Коньки хоккейные Graf PeakSpeed PK 1900 Cobra 2000 JR _2.jpg');
/*!40000 ALTER TABLE `productsimg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promocodes`
--

DROP TABLE IF EXISTS `promocodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promocodes` (
  `ID` mediumint NOT NULL AUTO_INCREMENT,
  `secret` varchar(100) NOT NULL,
  `sale` tinyint unsigned DEFAULT '5',
  `isDelete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promocodes`
--

LOCK TABLES `promocodes` WRITE;
/*!40000 ALTER TABLE `promocodes` DISABLE KEYS */;
INSERT INTO `promocodes` VALUES (1,'wintermax5',5,0),(2,'wintermax10',10,0);
/*!40000 ALTER TABLE `promocodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `ID` mediumint NOT NULL AUTO_INCREMENT,
  `productID` mediumint NOT NULL,
  `authorID` mediumint NOT NULL,
  `text` varchar(1000) NOT NULL,
  `date` varchar(11) NOT NULL,
  `rating` tinyint DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,2,1,'Хорошие коньки.','2021-02-01',4),(2,15,4,'Не очнь понравились. Не советую','2021-02-01',2),(3,1,4,'На четвёрку, не дотягивает до 5.','2021-02-01',3),(4,9,4,'Вау! Суппер','2021-02-01',5),(5,9,1,'Вообще не понравилось','2021-02-01',1),(6,3,1,'Ужасно','2021-02-01',0),(7,2,1,'Неплохо, можно использовать','2021-02-01',3),(8,15,3,'А мне понравилось! Супер лыжи','2021-02-01',5),(9,3,3,'Ну так себе, не очень. Коньки тупые','2021-02-01',1),(10,6,3,'Цвет топовый! ','2021-02-01',4),(11,7,3,'Для детей самое то, во дворе играть, но не больше','2021-02-01',3),(12,11,3,'','2021-02-01',3),(13,13,3,'','2021-02-01',4),(14,16,3,'','2021-02-01',5),(15,8,4,'Класс!','2021-02-01',4),(16,5,4,'','2021-02-01',3),(17,11,4,'','2021-02-01',1),(18,16,4,'Мощный сноуборд!','2021-02-01',5),(19,10,3,'','2021-02-01',5),(20,10,3,'','2021-02-01',4);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slider`
--

DROP TABLE IF EXISTS `slider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slider` (
  `ID` mediumint NOT NULL AUTO_INCREMENT,
  `img` varchar(100) NOT NULL,
  `link` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slider`
--

LOCK TABLES `slider` WRITE;
/*!40000 ALTER TABLE `slider` DISABLE KEYS */;
INSERT INTO `slider` VALUES (6,'1612208146658_1611949156995_1611948619226_сноуборд.png','news/4'),(7,'1612208347694_Снегокат Тимка Спорт 1_1.jpg','catalog/14'),(8,'1612208394126_Горные лыжи HEAD WC Rebels i.Shape Pro AB PR.jpg','catalog/10');
/*!40000 ALTER TABLE `slider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` mediumint NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('user','admin') NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'wintermaxadmin@mail.com','adminadmin','admin'),(2,'user@mail.com','user','user'),(3,'anna@mail.com','anna','user'),(4,'masha@mail.com','masha','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userssubscribe`
--

DROP TABLE IF EXISTS `userssubscribe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userssubscribe` (
  `ID` mediumint NOT NULL AUTO_INCREMENT,
  `userID` mediumint NOT NULL,
  `isSubscribe` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `userID` (`userID`),
  CONSTRAINT `userssubscribe_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userssubscribe`
--

LOCK TABLES `userssubscribe` WRITE;
/*!40000 ALTER TABLE `userssubscribe` DISABLE KEYS */;
INSERT INTO `userssubscribe` VALUES (1,1,0),(2,2,0),(3,3,1),(4,4,1);
/*!40000 ALTER TABLE `userssubscribe` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-01 23:15:42
