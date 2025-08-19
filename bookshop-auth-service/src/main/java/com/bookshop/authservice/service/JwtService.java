package com.bookshop.authservice.service;

import com.bookshop.authservice.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final Key key = Jwts.SIG.HS256.key().build();

    public String generateToken(User user) {
        return Jwts.builder().subject(user.getId())
                   .claim("email", user.getEmail())
                   .claim("roles", user.getRoles())
                   .expiration(Date.from(Instant.now().plusSeconds(3600)))
                   .signWith(key)
                   .compact();
    }

    public Jws<Claims> validate(String token) {
        return Jwts.parser().verifyWith((SecretKey) key).build().parseSignedClaims(token);
    }
}
