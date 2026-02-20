package com.example.MyChat.repo.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.MyChat.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoUser extends JpaRepository<User, String> {
    User findByPhoneNumber(String phonenumber);
}
