package com.bookshop.authservice.service;

import java.util.Arrays;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FacebookVerifierService {

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> verify(String accessToken) {
        // Call Facebook Graph API to get user info
        String url = "https://graph.facebook.com/me?fields=id,name,email,picture&access_token=" + accessToken;

        Map<String, Object> profile = restTemplate.getForObject(url, Map.class);
        if (profile == null || !profile.containsKey("id")) {
            throw new IllegalArgumentException("Invalid Facebook token");
        }
        System.out.println(Arrays.toString(profile.keySet().toArray()));
        System.out.println(Arrays.toString(profile.values().toArray()));
        return profile;
    }

}
