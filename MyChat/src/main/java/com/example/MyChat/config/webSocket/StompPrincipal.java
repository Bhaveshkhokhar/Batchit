package com.example.MyChat.config.webSocket;

import java.security.Principal;

public class StompPrincipal implements Principal {

    private final String userid;

    public StompPrincipal(String userid) {
        this.userid = userid;
    }

    @Override
    public String getName() {
        return userid;
    }
}
