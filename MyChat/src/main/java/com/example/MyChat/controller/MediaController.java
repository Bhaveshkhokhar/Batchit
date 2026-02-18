package com.example.MyChat.controller;

import com.example.MyChat.DTO.PresignedUploadResponse;
import com.example.MyChat.io.PreSignedRequest;
import com.example.MyChat.model.MediaContext;
import com.example.MyChat.service.MediaValidationService;
import com.example.MyChat.service.PresignedUrlService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/media")
public class MediaController{

    private final PresignedUrlService presignedUrlService;
    private final MediaValidationService validationService;

    public MediaController(
            PresignedUrlService presignedUrlService,
            MediaValidationService validationService
    ) {
        this.presignedUrlService = presignedUrlService;
        this.validationService = validationService;
    }

    @PostMapping("/presigned-upload")
    public PresignedUploadResponse getUploadUrl(
        @RequestBody PreSignedRequest preSignedRequest,
            Authentication authentication
    ) {

        validationService.validate(preSignedRequest.getContentType(),preSignedRequest.getFileSize());

        String key = switch (preSignedRequest.getContext()) {
            case MESSAGE -> "chat-media/messages/" + preSignedRequest.getConversationId() + "/" + UUID.randomUUID();
            case STATUS  -> "chat-media/status/" + authentication.getName() + "/" + UUID.randomUUID();
            case PROFILE ->"chat-media/profile/" + authentication.getName() ;
        };

        return presignedUrlService.generateUploadUrl(key, preSignedRequest.getContentType());
    }

}
