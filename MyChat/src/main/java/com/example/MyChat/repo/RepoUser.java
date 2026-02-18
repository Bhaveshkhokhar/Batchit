package com.example.MyChat.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.MyChat.model.User;

public interface RepoUser extends JpaRepository<User, String> {
    User findByPhoneNumber(String phonenumber);
}
