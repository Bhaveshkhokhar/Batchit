package com.example.MyChat.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "contacts",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_user_contact",
                        columnNames = {"user_id", "contact_user_id"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Owner of the contact
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_contacts_user")
    )
    private User user;

    // The saved contact (another user)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "contact_user_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_contacts_contact_user")
    )
    private User contactUser;

    @Column(name = "saved_name", length = 100)
    private String savedName;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
