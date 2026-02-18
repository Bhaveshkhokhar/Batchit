package com.example.MyChat.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "status_views",
        indexes = {
                @Index(name = "idx_status", columnList = "status_id"),
                @Index(name = "idx_viewer", columnList = "viewer_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatusView {

    @EmbeddedId
    private StatusViewId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("statusId")
    @JoinColumn(
            name = "status_id",
            foreignKey = @ForeignKey(name = "fk_status_view_status")
    )
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("viewerId")
    @JoinColumn(
            name = "viewer_id",
            foreignKey = @ForeignKey(name = "fk_status_view_user")
    )
    private User viewer;

    @CreationTimestamp
    @Column(name = "viewed_at", updatable = false)
    private LocalDateTime viewedAt;
}

