package com.example.MyChat.service;

import com.example.MyChat.DTO.PresignedUploadResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;

@Service
public class PresignedUrlService {

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    private final S3Presigner presigner;

    public PresignedUrlService(S3Presigner presigner) {
        this.presigner = presigner;
    }

    /* 🔐 UPLOAD (PUT) */
    public PresignedUploadResponse generateUploadUrl(
            String key,
            String contentType
    ) {

        PutObjectRequest putRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(contentType)
                .build();

        PutObjectPresignRequest presignRequest =
                PutObjectPresignRequest.builder()
                        .signatureDuration(Duration.ofMinutes(5))
                        .putObjectRequest(putRequest)
                        .build();

        PresignedPutObjectRequest presigned =
                presigner.presignPutObject(presignRequest);

        return new PresignedUploadResponse(
                presigned.url().toString(),
                key
        );
    }

    /* 🔐 DOWNLOAD (GET) */
    public String generateDownloadUrl(String key,Integer time) {

        GetObjectRequest getRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        GetObjectPresignRequest presignRequest =
                GetObjectPresignRequest.builder()
                        .signatureDuration(Duration.ofMinutes(time))
                        .getObjectRequest(getRequest)
                        .build();

        return presigner
                .presignGetObject(presignRequest)
                .url()
                .toString();
    }
}

