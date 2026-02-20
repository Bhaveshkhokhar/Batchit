package com.example.MyChat.service;

import com.example.MyChat.repo.mongo.RepoMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    @Autowired
    RepoMessage repoMessage;
    public void saveMessage(){

    }
}
