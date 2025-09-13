package com.bookshop.authservice.controller;

import com.bookshop.authservice.dto.GoogleAuthParam;
import com.bookshop.authservice.dto.AuthResponse;
import com.bookshop.authservice.dto.RegisterParam;
import com.bookshop.authservice.service.AuthService;
import com.bookshop.authservice.dto.LoginParam;
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
    public AuthResponse loginWithGoogle(@RequestBody GoogleAuthParam param) {
        return authService.authUserWithGoogle(param);
    }


    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterParam param) {
        return authService.registerUser(param);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginParam param) {
        return authService.loginUser(param);
    }
}
