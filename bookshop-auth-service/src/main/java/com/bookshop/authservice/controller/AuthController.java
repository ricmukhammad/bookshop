package com.bookshop.authservice.controller;

import com.bookshop.authservice.dto.GoogleAuthParam;
import com.bookshop.authservice.dto.GoogleAuthResponse;
import com.bookshop.authservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/google")
    public GoogleAuthResponse loginWithGoogle(@RequestBody GoogleAuthParam param) {
        return authService.authUserWithGoogle(param);
    }
}
