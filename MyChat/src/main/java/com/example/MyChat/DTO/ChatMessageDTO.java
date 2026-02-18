package com.example.MyChat.DTO;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDTO {

    private String conversationId;
    private String receiverId;
    private String messageType;
    private String content;
    private String mediaKey;    // S3 key
    private String thumbnailKey;
}
