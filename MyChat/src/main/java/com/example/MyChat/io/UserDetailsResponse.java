package com.example.MyChat.io;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class UserDetailsResponse {
    String phoneNumber;
    String name;
    String about;
    String profilePicturePreSignedURL;
    String message;
}
