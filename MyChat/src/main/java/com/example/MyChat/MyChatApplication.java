package com.example.MyChat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableMongoRepositories(basePackages = "com.example.MyChat.repo.mongo")
@EnableJpaRepositories(basePackages = "com.example.MyChat.repo.jpa")
public class MyChatApplication {
	public static void main(String[] args) {
        SpringApplication.run(MyChatApplication.class, args);
	}
}
