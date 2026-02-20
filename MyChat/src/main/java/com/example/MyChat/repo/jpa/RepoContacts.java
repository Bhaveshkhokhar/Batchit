package com.example.MyChat.repo.jpa;

import com.example.MyChat.model.Contact;
import com.example.MyChat.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepoContacts extends JpaRepository<Contact,Long> {

    List<Contact> findByUserPhoneNumber(String phoneNumber);

    // Find the specific Contact record
    Optional<Contact> findByUserIdAndContactUserId(String ownerId, String contactUserId);

    // Check if a contact relationship exists (returns true/false)
    boolean existsByUserIdAndContactUserId(String ownerId, String contactUserId);

    // Get the User object of the contact directly
    @Query("SELECT c.contactUser FROM Contact c WHERE c.user.id = :ownerId AND c.contactUser.id = :contactId")
    Optional<User> findSpecificUserInContacts( String ownerId, String contactId);
}
