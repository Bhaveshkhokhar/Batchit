package com.example.MyChat.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "call_participants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CallParticipant {

    @EmbeddedId
    private CallParticipantId id;

    /* ---------------- Relationships ---------------- */

    @MapsId("callId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "call_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_cp_call")
    )
    private Call call;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_cp_user")
    )
    private User user;

    /* ---------------- Timing ---------------- */

    @Column(name = "joined_at")
    private LocalDateTime joinedAt;

    @Column(name = "left_at")
    private LocalDateTime leftAt;

    @Column(name = "is_muted")
    private Boolean isMuted = false;
    @Column(name = "is_video_on")
    private Boolean isVideoOn = true;
    @Column(name = "is_active")
    private Boolean isActive = true;
}
