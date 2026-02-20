package com.example.MyChat.repo.jpa;

import com.example.MyChat.model.ConversationParticipant;
import com.example.MyChat.model.ConversationParticipantId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepoConversationParticipant extends JpaRepository<ConversationParticipant, ConversationParticipantId> {
    List<ConversationParticipant> findByUserId(String userId);
    List<ConversationParticipant> findByConversationId(String conversationId);
    Optional<ConversationParticipant> findByConversationIdAndUserId(String conversationId, String userId);
    long countByConversationId(String conversationId);
    void deleteByConversationIdAndUserId(String conversationId, String userId);
}
