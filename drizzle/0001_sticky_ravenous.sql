CREATE TABLE `contactInquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`businessName` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`serviceType` varchar(80) NOT NULL,
	`message` text NOT NULL,
	`status` enum('new','reviewing','responded','closed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contactInquiries_id` PRIMARY KEY(`id`)
);
