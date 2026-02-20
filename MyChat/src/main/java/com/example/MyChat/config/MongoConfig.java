package com.example.MyChat.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MongoConfig {

    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(
                "mongodb+srv://root:root@chefbooking.rpuqc5d.mongodb.net/bhatchit?retryWrites=true&w=majority"
        );
    }
}