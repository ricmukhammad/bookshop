package com.bookshop.authservice.service;

import com.bookshop.authservice.dto.LoginParam;
import com.bookshop.authservice.dto.RegisterParam;
import com.bookshop.authservice.dto.GoogleAuthParam;
import com.bookshop.authservice.dto.AuthResponse;

public interface AuthService {
    AuthResponse authUserWithGoogle(GoogleAuthParam param);
    AuthResponse registerUser(RegisterParam param);
    AuthResponse loginUser(LoginParam param);
}
