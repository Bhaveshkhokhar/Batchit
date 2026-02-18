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
public class CallParticipantId implements Serializable {

    @Column(name = "call_id")
    private Long callId;

    @Column(name = "user_id", length = 36)
    private String userId;
}
