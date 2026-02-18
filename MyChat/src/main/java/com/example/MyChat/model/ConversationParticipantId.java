package com.example.MyChat.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ConversationParticipantId implements Serializable {

    @Column(name = "conversation_id", length = 36)
    private String conversationId;

    @Column(name = "user_id", length = 36)
    private String userId;
}
