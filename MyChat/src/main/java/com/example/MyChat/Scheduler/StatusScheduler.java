package com.example.MyChat.Scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class StatusScheduler {
    @Scheduled(cron = "${chat.status.cleanup.cron}")
    public void statusCleanUp(){};
}
