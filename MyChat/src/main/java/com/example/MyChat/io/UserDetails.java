package com.example.MyChat.io;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDetails {
    String phoneNumber;
    String name;
    String about;
    String profilePicturePreSignedURL;
    String message;
}
