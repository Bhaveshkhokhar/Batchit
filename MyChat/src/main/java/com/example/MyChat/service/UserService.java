package com.example.MyChat.service;

import com.example.MyChat.Util.JwtUtil;
import com.example.MyChat.Util.Token;
import com.example.MyChat.io.*;
import com.example.MyChat.model.*;
import com.example.MyChat.repo.jpa.RepoContacts;
import com.example.MyChat.repo.jpa.RepoConversationParticipant;
import com.example.MyChat.repo.jpa.RepoUser;
import com.example.MyChat.repo.mongo.RepoMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    RepoUser repoUser;
    @Autowired
    RepoConversationParticipant repoConversationParticipant;
    @Autowired
    RepoMessage repoMessage;
    @Autowired
    RepoContacts repoContacts;
    @Autowired
    Token tokenobj;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    private  PresignedUrlService presignedUrlService;

    public ResponseEntity<ApiResponse<UserDetails>> addOrUpdateName(String name, String phoneNumber){
        UserDetails userDetails=new UserDetails();
        if (name == null || name.trim().isEmpty()) {
            userDetails.setMessage("Name is required");
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(
                            userDetails,
                            "Failed"
                    ));
        }
        User user = repoUser.findByPhoneNumber(phoneNumber);

        if (user == null) {
            userDetails.setMessage("User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(
                            userDetails,
                            "Failed"
                    ));
        }
        user.setName(name.trim());
        repoUser.save(user);
        userDetails.setMessage("Name is Updated");
        userDetails.setName(user.getName());
        userDetails.setPhoneNumber(user.getPhoneNumber());
        userDetails.setAbout(user.getAbout());
        if(user.getProfilePictureKey().equals("default")){
            userDetails.setProfilePicturePreSignedURL(user.getProfilePictureKey());
        }else{
            userDetails.setProfilePicturePreSignedURL(presignedUrlService.generateDownloadUrl(user.getProfilePictureKey(),5));
        }
        return ResponseEntity.ok(
                new ApiResponse<>(
                        userDetails,
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
        UserDetails userDetails=new UserDetails();
        if(user==null){
            userDetails.setMessage("User Not Found");
            userDetailsResponse.setUser(userDetails);
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(userDetailsResponse,"Failed"));
        }
        userDetails.setMessage("User Found");
        userDetails.setName(user.getName());
        userDetails.setPhoneNumber(user.getPhoneNumber());
        userDetails.setAbout(user.getAbout());
        userDetailsResponse.setUser(userDetails);

        String userId= user.getId();
        List<ConversationParticipant> conversationParticipants=repoConversationParticipant.findByUserId(userId);
        List<ConversationResponse> chats=new ArrayList<>();
        for(ConversationParticipant con:conversationParticipants){
            Conversation conversation = con.getConversation();
            ConversationResponse conversationResponse=new ConversationResponse();
            if(conversation.getGroupDpMediaKey().equals("default")){
                conversationResponse.setGroupDpPresignedUrl(conversation.getGroupDpMediaKey());
            }else{
                conversationResponse.setGroupDpPresignedUrl(presignedUrlService.generateDownloadUrl(conversation.getGroupDpMediaKey(),10));
            }
            conversationResponse.setType(conversation.getType());
            conversationResponse.setLastMessageAt(conversation.getLastMessageAt());
            Optional<Message> lastMessage=repoMessage.findFirstByConversationIdOrderByCreatedAtDesc(conversation.getId());
            if (lastMessage.isPresent()) {
                Message msg = lastMessage.get();
                String lastMsgText = (msg.getMessageType() == MessageType.TEXT)
                        ? msg.getContent()
                        : msg.getMessageType().name();

                conversationResponse.setLastMessage(lastMsgText);
            }
            if(conversation.getName().equals("one_to_one")){
                List<ConversationParticipant> oneToOne=repoConversationParticipant.findByConversationId(conversation.getId());
                for(ConversationParticipant onetoone:oneToOne){
                    User tempUser=onetoone.getUser();
                    if(!user.getId().equals(tempUser.getId())){
                        Optional<Contact> contact=repoContacts.findByUserIdAndContactUserId(userId, tempUser.getId());
                        if(contact.isPresent()){
                            conversationResponse.setName(contact.get().getSavedName());
                        }else{
                            conversationResponse.setName(tempUser.getName());
                        }

                    }
                }
                conversationResponse.setLastUserName("one_to_one");
            }else{
                conversationResponse.setName(conversation.getName());
                if (lastMessage.isPresent()) {
                    Message msg = lastMessage.get();
                    String senderUserId= msg.getSenderId();
                    Optional<Contact> contact=repoContacts.findByUserIdAndContactUserId(userId, senderUserId);
                    String lastusername;
                    if(contact.isPresent()){
                        lastusername=contact.get().getSavedName();
                    }else{
                        lastusername=repoUser.findById(senderUserId).get().getName();
                    }
                    conversationResponse.setLastUserName(lastusername);
                }

            }
            conversationResponse.setConverationID(conversation.getId());
            conversationResponse.setUnreadMessage(repoMessage.countUnreadMessages(conversation.getId(),userId));
            chats.add(conversationResponse);
        }
        userDetailsResponse.setChats(chats);
        if(user.getProfilePictureKey().equals("default")){
            userDetails.setProfilePicturePreSignedURL(user.getProfilePictureKey());
        }else{
            userDetails.setProfilePicturePreSignedURL(presignedUrlService.generateDownloadUrl(user.getProfilePictureKey(),5));
        }
        return ResponseEntity.ok(new ApiResponse<>(userDetailsResponse,"success"));
    }

    public ResponseEntity<ApiResponse<UserDetails>> updateAbout(String about, String phoneNumber) {
        User user=repoUser.findByPhoneNumber(phoneNumber);
        UserDetails userDetails=new UserDetails();
        if(user==null){
            userDetails.setMessage("User Not Found");
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(userDetails,"Failed"));
        }
        user.setAbout(about.trim());
        repoUser.save(user);
        userDetails.setMessage("About is Updated");
        userDetails.setName(user.getName());
        userDetails.setPhoneNumber(user.getPhoneNumber());
        userDetails.setAbout(user.getAbout());
        if(user.getProfilePictureKey().equals("default")){
            userDetails.setProfilePicturePreSignedURL(user.getProfilePictureKey());
        }else{
            userDetails.setProfilePicturePreSignedURL(presignedUrlService.generateDownloadUrl(user.getProfilePictureKey(),5));
        }
        return ResponseEntity.ok(new ApiResponse<>(userDetails,"success"));

    }

    public ResponseEntity<ApiResponse<ContactResponse>> getContacts(String phoneNumber) {
        User user=repoUser.findByPhoneNumber(phoneNumber);
        ContactResponse contactResponse=new ContactResponse();
        if(user==null){
            contactResponse.setMessage("User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(
                            contactResponse,
                            "Failed"
                    ));
        }
        List<Contact> contacts=repoContacts.findByUserPhoneNumber(phoneNumber);
        List<ContactBody> contactBodyList=new ArrayList<>();
        for(Contact contact:contacts){
            ContactBody contactBody=new ContactBody();
            contactBody.setName(contact.getSavedName());
            User contactUseruser =contact.getContactUser();
            contactBody.setAbout(contactUseruser.getAbout());
            if(contactUseruser.getProfilePictureKey().equals("default")){
                contactBody.setDpPresignedUrl(contactUseruser.getProfilePictureKey());
            }else{
                contactBody.setDpPresignedUrl(presignedUrlService.generateDownloadUrl(contactUseruser.getProfilePictureKey(), 5));
            }
            contactBodyList.add(contactBody);
        }

        contactResponse.setContacts(contactBodyList);
        contactResponse.setMessage("user saved Contacts");
        return ResponseEntity.ok(new ApiResponse<>(
                        contactResponse,
                        "Success"
                ));

    }

    public ResponseEntity<ApiResponse<AddContactResponse>> addContact(String phoneNumber, String name, String phoneNumberAdd) {
        User user1=repoUser.findByPhoneNumber(phoneNumber);
        AddContactResponse addContactResponse=new AddContactResponse();
        if(user1==null){
            addContactResponse.setMessage("User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(
                            addContactResponse,
                            "Failed"
                    ));
        }
        User user2=repoUser.findByPhoneNumber(phoneNumberAdd);
        if(user2==null){
            addContactResponse.setMessage(phoneNumberAdd+" is not register to BhatChit yet");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(
                            addContactResponse,
                            "Failed"
                    ));
        }
        Contact contact=new Contact();
        contact.setContactUser(user2);
        contact.setUser(user1);
        contact.setSavedName(name);
        repoContacts.save(contact);
        ContactBody contactBody=new ContactBody();
        contactBody.setName(name);
        contactBody.setAbout(user2.getAbout());
        if(user2.getProfilePictureKey().equals("default")){
            contactBody.setDpPresignedUrl(user2.getProfilePictureKey());
        }else{
            contactBody.setDpPresignedUrl(presignedUrlService.generateDownloadUrl(user2.getProfilePictureKey(), 5));
        }
        addContactResponse.setMessage("Contact Saved");
        return ResponseEntity.ok(new ApiResponse<>(
                addContactResponse,
                "Success"
        ));
    }
}
