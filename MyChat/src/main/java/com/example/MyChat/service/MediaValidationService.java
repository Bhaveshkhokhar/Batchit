package com.example.MyChat.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class MediaValidationService {

    @Value("${chat.media.max-size}")
    private long maxSize;

    @Value("${chat.media.allowed-types}")
    private String allowedTypes;

    public void validate(String contentType, long fileSize) {

        if (fileSize > maxSize) {
            throw new IllegalArgumentException("File exceeds max size limit");
        }

        List<String> allowed =
                Arrays.asList(allowedTypes.split(","));

        if (!allowed.contains(contentType)) {
            throw new IllegalArgumentException("Invalid file type");
        }
    }
}
