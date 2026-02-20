package com.example.MyChat.repo;

import com.example.MyChat.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoMessage extends MongoRepository<Message,String> {

}
