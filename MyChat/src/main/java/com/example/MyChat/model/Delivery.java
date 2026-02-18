package com.example.MyChat.model;

import lombok.*;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Delivery {

    private Instant sentAt;
    private List<String> deliveredTo;
    private List<String> readBy;
}
