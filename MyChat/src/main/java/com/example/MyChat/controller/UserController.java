package com.example.MyChat.controller;

import com.example.MyChat.io.*;
import com.example.MyChat.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
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
    public ResponseEntity<ApiResponse<UserDetailsResponse>> addOrUpdateName(@RequestBody NameUpdateRequest nameUpdateRequest, Authentication authentication){
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
    public ResponseEntity<ApiResponse<UserDetailsResponse>> updateAbout(@RequestBody AboutUpdateRequest aboutUpdateRequest, Authentication authentication){
       return  userService.updateAbout(aboutUpdateRequest.getAbout(),authentication.getName());
    }
}
