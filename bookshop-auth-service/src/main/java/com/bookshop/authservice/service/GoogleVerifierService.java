package com.bookshop.authservice.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.json.gson.GsonFactory;

import com.google.api.client.http.javanet.NetHttpTransport;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GoogleVerifierService {
    private final GoogleIdTokenVerifier verifier;

    public GoogleVerifierService(@Value("${google.clientId}") String clientId) {
        this.verifier = new GoogleIdTokenVerifier
                .Builder(new NetHttpTransport(), GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    public GoogleIdToken.Payload verify(String idToken) throws Exception {
        GoogleIdToken token = verifier.verify(idToken);
        if (token == null) throw new IllegalArgumentException("Invalid ID token");
        return token.getPayload();
    }
}
