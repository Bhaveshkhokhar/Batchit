package com.example.MyChat.io;

import com.example.MyChat.model.ConversationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConversationResponse {
  String groupDpPresignedUrl;
  LocalDateTime lastMessageAt;
  ConversationType type;
  String name;
  String converationID;
  String lastMessage;
  String lastUserName;
  long unreadMessage;

}
