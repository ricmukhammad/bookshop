package com.bookshop.authservice.controller;

import com.bookshop.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserService userService;

    @GetMapping("/exists")
    public ResponseEntity<Void> userExists(@RequestParam String email) {
        return userService.findByEmail(email).isPresent()
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }
}
