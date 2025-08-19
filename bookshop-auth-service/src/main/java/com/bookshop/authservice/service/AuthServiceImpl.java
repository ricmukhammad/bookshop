package com.bookshop.authservice.service;

import com.bookshop.authservice.dto.GoogleAuthParam;
import com.bookshop.authservice.dto.GoogleAuthResponse;
import com.bookshop.authservice.model.User;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import java.time.Instant;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final GoogleVerifierService googleVerifierService;
    private final UserService userService;
    private final JwtService jwtService;

    @Override
    public GoogleAuthResponse authUserWithGoogle(GoogleAuthParam param)  {
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
        return GoogleAuthResponse.builder().accessToken(accessToken).expiresIn(3600).user(User.builder().email(
                user.getEmail()).name(
                user.getName()).picture(user.getPicture()).build()).build();
    }
}
