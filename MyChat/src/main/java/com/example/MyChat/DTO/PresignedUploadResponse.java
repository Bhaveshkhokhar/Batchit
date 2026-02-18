package com.example.MyChat.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PresignedUploadResponse {
    private String uploadUrl;
    private String key;
}

