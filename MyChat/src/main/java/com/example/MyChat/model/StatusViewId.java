package com.example.MyChat.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StatusViewId {

    @Column(name = "status_id", length = 36)
    private String statusId;

    @Column(name = "viewer_id", length = 36)
    private String viewerId;
}

