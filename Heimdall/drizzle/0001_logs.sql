CREATE TABLE `logs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`timestamp` integer NOT NULL,
	`action` text NOT NULL,
	`details` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
