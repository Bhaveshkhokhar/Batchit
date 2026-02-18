package com.example.MyChat.controller;

import com.example.MyChat.DTO.ChatMessageDTO;
import com.example.MyChat.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;

    @MessageMapping("/send-message")
    public void sendMessage(ChatMessageDTO message,
                            Principal principal) {

        String senderId = principal.getName();

        // Save to Mongo
        messageService.saveMessage();

        // Send to receiver
        messagingTemplate.convertAndSendToUser(
                message.getReceiverId(),
                "/queue/messages",
                message
        );
    }
}
