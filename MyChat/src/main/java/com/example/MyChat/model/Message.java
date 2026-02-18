package com.example.MyChat.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CompoundIndexes({
        // db.messages.createIndex({ conversationId: 1, sequenceNumber: 1 })
        @CompoundIndex(
                name = "idx_conversation_sequence",
                def = "{ 'conversationId': 1, 'sequenceNumber': 1 }"
        ),
        // db.messages.createIndex({ conversationId: 1, createdAt: -1 })
        @CompoundIndex(
                name = "idx_conversation_created",
                def = "{ 'conversationId': 1, 'createdAt': -1 }"
        )
})
public class Message {

    @Id
    private String id; // Mongo ObjectId (auto)

    @Indexed(unique = true)
    private String messageId; // uuid-v7

    @Indexed
    private String conversationId; // MySQL UUID

    @Indexed
    private String senderId;

    private String receiverId; // null for group

    private MessageType messageType;

    private String content;
    private String mediaKey;
    private String thumbnailKey;

    private Delivery delivery;

    private boolean isDeleted;

    private List<String> deletedFor;

    private Long sequenceNumber;

    @Indexed
    private Instant createdAt;
}
