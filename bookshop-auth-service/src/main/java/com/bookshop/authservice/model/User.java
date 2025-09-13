package com.bookshop.authservice.model;

import java.time.Instant;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String id;
    private String email;
    private String name;
    private String picture;
    private String providerSub; // Google sub
    private List<String> roles;
    private Instant createdAt;
    private AuthProvider authProvider;
    private String password;
}
