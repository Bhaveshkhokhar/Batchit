package com.example.MyChat.service;

import com.example.MyChat.Util.JwtUtil;
import com.example.MyChat.Util.Token;
import com.example.MyChat.io.ApiResponse;
import com.example.MyChat.io.ProfileSavedRequest;
import com.example.MyChat.io.ProfileSavedResponse;
import com.example.MyChat.io.UserDetailsResponse;
import com.example.MyChat.model.User;
import com.example.MyChat.repo.RepoUser;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    RepoUser repoUser;
    @Autowired
    Token tokenobj;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    private  PresignedUrlService presignedUrlService;

    public ResponseEntity<ApiResponse<UserDetailsResponse>> addOrUpdateName(String name, String phoneNumber){
        UserDetailsResponse userDetailsResponse=new UserDetailsResponse();
        if (name == null || name.trim().isEmpty()) {
            userDetailsResponse.setMessage("Name is required");
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(
                            userDetailsResponse,
                            "Failed"
                    ));
        }
        User user = repoUser.findByPhoneNumber(phoneNumber);

        if (user == null) {
            userDetailsResponse.setMessage("User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(
                            userDetailsResponse,
                            "Failed"
                    ));
        }
        user.setName(name.trim());
        repoUser.save(user);
        userDetailsResponse.setMessage("Name is Updated");
        userDetailsResponse.setName(user.getName());
        userDetailsResponse.setPhoneNumber(user.getPhoneNumber());
        userDetailsResponse.setAbout(user.getAbout());
        if(user.getProfilePictureKey().equals("default")){
            userDetailsResponse.setProfilePicturePreSignedURL(user.getProfilePictureKey());
        }else{
            userDetailsResponse.setProfilePicturePreSignedURL(presignedUrlService.generateDownloadUrl(user.getProfilePictureKey(),5));
        }
        return ResponseEntity.ok(
                new ApiResponse<>(
                        userDetailsResponse,
                        "Success"
                )
        );

    }

    public ResponseEntity<ApiResponse<ProfileSavedResponse>> updateProfilePic( String phoneNumber,ProfileSavedRequest profileSavedRequest){
        User user=repoUser.findByPhoneNumber(phoneNumber);

            if (user == null) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(new ProfileSavedResponse("User not found",null),"Failed"));
            }
        user.setProfilePictureKey(profileSavedRequest.getMediaKey());
        repoUser.save(user);

        return ResponseEntity.ok(
                new ApiResponse(
                        new ProfileSavedResponse("Profile picture updated successfully", presignedUrlService.generateDownloadUrl(user.getProfilePictureKey(),5)),"Success"
                )
        );
    }

    public ResponseEntity<ApiResponse<UserDetailsResponse>> getUser(String phoneNumber) {
        User user=repoUser.findByPhoneNumber(phoneNumber);
        UserDetailsResponse userDetailsResponse=new UserDetailsResponse();
        if(user==null){
            userDetailsResponse.setMessage("User Not Found");
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(userDetailsResponse,"Failed"));
        }
        userDetailsResponse.setMessage("User Found");
        userDetailsResponse.setName(user.getName());
        userDetailsResponse.setPhoneNumber(user.getPhoneNumber());
        userDetailsResponse.setAbout(user.getAbout());
        if(user.getProfilePictureKey().equals("default")){
            userDetailsResponse.setProfilePicturePreSignedURL(user.getProfilePictureKey());
        }else{
            userDetailsResponse.setProfilePicturePreSignedURL(presignedUrlService.generateDownloadUrl(user.getProfilePictureKey(),5));
        }
        return ResponseEntity.ok(new ApiResponse<>(userDetailsResponse,"success"));
    }

    public ResponseEntity<ApiResponse<UserDetailsResponse>> updateAbout(String about, String phoneNumber) {
        User user=repoUser.findByPhoneNumber(phoneNumber);
        UserDetailsResponse userDetailsResponse=new UserDetailsResponse();
        if(user==null){
            userDetailsResponse.setMessage("User Not Found");
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(userDetailsResponse,"Failed"));
        }
        user.setAbout(about.trim());
        repoUser.save(user);
        userDetailsResponse.setMessage("About is Updated");
        userDetailsResponse.setName(user.getName());
        userDetailsResponse.setPhoneNumber(user.getPhoneNumber());
        userDetailsResponse.setAbout(user.getAbout());
        if(user.getProfilePictureKey().equals("default")){
            userDetailsResponse.setProfilePicturePreSignedURL(user.getProfilePictureKey());
        }else{
            userDetailsResponse.setProfilePicturePreSignedURL(presignedUrlService.generateDownloadUrl(user.getProfilePictureKey(),5));
        }
        return ResponseEntity.ok(new ApiResponse<>(userDetailsResponse,"success"));

    }
}
