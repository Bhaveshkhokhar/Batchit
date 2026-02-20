package com.example.MyChat.repo.mongo;

import com.example.MyChat.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepoMessage extends MongoRepository<Message,String> {
    Optional<Message> findFirstByConversationIdOrderByCreatedAtDesc(String conversationId);
    @Query("{ 'conversationId': ?0, 'senderId': { $ne: ?1 }, 'delivery.readBy': { $ne: ?1 } }")
    long countUnreadMessages(String conversationId, String userId);
}
