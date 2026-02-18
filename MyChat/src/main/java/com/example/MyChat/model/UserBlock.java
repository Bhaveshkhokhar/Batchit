package com.example.MyChat.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "user_blocks",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_block",
                        columnNames = {"blocker_id", "blocked_id"}
                )
        },
        indexes = {
                @Index(name = "idx_blocker", columnList = "blocker_id"),
                @Index(name = "idx_blocked", columnList = "blocked_id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserBlock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "blocker_id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "fk_block_blocker",
                    foreignKeyDefinition =
                            "FOREIGN KEY (blocker_id) REFERENCES users(id) ON DELETE CASCADE"
            )
    )
    private User blocker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "blocked_id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "fk_block_blocked",
                    foreignKeyDefinition =
                            "FOREIGN KEY (blocked_id) REFERENCES users(id) ON DELETE CASCADE"
            )
    )
    private User blocked;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
