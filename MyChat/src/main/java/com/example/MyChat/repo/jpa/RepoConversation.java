package com.example.MyChat.repo.jpa;

import com.example.MyChat.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepoConversation extends JpaRepository<Conversation,String> {
    Optional<Conversation> findById(String id);
}
