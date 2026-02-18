package com.example.MyChat.io;

import com.example.MyChat.model.MediaContext;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PreSignedRequest {
    String contentType;
    long fileSize;
    MediaContext context;
    String conversationId;
}
