package com.example.MyChat.controller;

import com.example.MyChat.io.*;
import com.example.MyChat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;
    @PostMapping("/userName")
    public ResponseEntity<ApiResponse<UserDetails>> addOrUpdateName(@RequestBody NameUpdateRequest nameUpdateRequest, Authentication authentication){
        return  userService.addOrUpdateName(nameUpdateRequest.getName(),authentication.getName());
    }
    @PostMapping("/saveprofilepic")
    public ResponseEntity<ApiResponse<ProfileSavedResponse>> savedProfilePic(@RequestBody ProfileSavedRequest profileSavedRequest, Authentication authentication){
        return userService.updateProfilePic(authentication.getName(),profileSavedRequest);
    }
    @GetMapping("/getuser")
    public ResponseEntity<ApiResponse<UserDetailsResponse>> getUser(Authentication authentication){
        return userService.getUser(authentication.getName());
    }
    @PutMapping("/update-about")
    public ResponseEntity<ApiResponse<UserDetails>> updateAbout(@RequestBody AboutUpdateRequest aboutUpdateRequest, Authentication authentication){
       return  userService.updateAbout(aboutUpdateRequest.getAbout(),authentication.getName());
    }
    @GetMapping("/contacts")
    public ResponseEntity<ApiResponse<ContactResponse>> getContacts(Authentication authentication){
        return userService.getContacts(authentication.getName());
    }
    @PostMapping("contacts")
    public ResponseEntity<ApiResponse<AddContactResponse>> addContact(Authentication authentication, @RequestBody AddContactRequest addContactRequest){
        return  userService.addContact(authentication.getName(),addContactRequest.getName(),addContactRequest.getPhoneNumber());
    }
}
