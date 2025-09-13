package com.bookshop.authservice.service;

import com.bookshop.authservice.dto.RegisterParam;
import com.bookshop.authservice.dto.GoogleAuthParam;
import com.bookshop.authservice.dto.AuthResponse;
import com.bookshop.authservice.model.User;
import com.bookshop.authservice.dto.LoginParam;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import java.time.Instant;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final GoogleVerifierService googleVerifierService;
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthResponse authUserWithGoogle(GoogleAuthParam param)  {
        GoogleIdToken.Payload payload;
        try {
            payload = googleVerifierService.verify(param.getIdToken());
        } catch (Exception e) {
            throw new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not authenticate with Google");
        }
        String email = payload.getEmail();
        User user = userService.findByEmail(email).orElseGet(() -> {
            User u = User.builder()
                         .email(email)
                         .name((String) payload.get("name"))
                         .picture((String) payload.get("picture"))
                         .providerSub(payload.getSubject())
                         .roles(List.of("USER"))
                         .createdAt(Instant.now())
                         .build();
            return userService.save(u);
        });
        String accessToken = jwtService.generateToken(user);
        return AuthResponse.builder().accessToken(accessToken).expiresIn(3600).user(User.builder().email(
                user.getEmail()).name(
                user.getName()).picture(user.getPicture()).build()).build();
    }


    public AuthResponse registerUser(RegisterParam param) {
        if (userService.findByEmail(param.getEmail()).isPresent()) {
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "User already exists");
        }
        User user = User.builder()
                        .email(param.getEmail())
                        .name(param.getName())
                .picture("https://avatar.iran.liara.run/username?" +
                                 "username=" + param.getName())
                        .password(passwordEncoder.encode(param.getPassword()))
                        .roles(List.of("USER"))
                        .createdAt(Instant.now())
                        .build();
        user = userService.save(user);
        String accessToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                           .accessToken(accessToken)
                           .expiresIn(3600)
                           .user(User.builder()
                                           .email(user.getEmail())
                                           .name(user.getName())
                                           .picture(user.getPicture())
                                           .build())
                           .build();
    }

    public AuthResponse loginUser(LoginParam param) {
        User user = userService.findByEmail(param.getEmail())
                               .orElseThrow(() -> new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        if (user.getPassword() == null || !passwordEncoder.matches(param.getPassword(), user.getPassword())) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        String accessToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                           .accessToken(accessToken)
                           .expiresIn(3600)
                           .user(User.builder()
                                           .email(user.getEmail())
                                           .name(user.getName())
                                           .picture(user.getPicture())
                                           .build())
                           .build();
    }
}
