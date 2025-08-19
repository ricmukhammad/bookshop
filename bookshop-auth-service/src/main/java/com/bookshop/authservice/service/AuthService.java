package com.bookshop.authservice.service;

import com.bookshop.authservice.dto.GoogleAuthParam;
import com.bookshop.authservice.dto.GoogleAuthResponse;

public interface AuthService {
    GoogleAuthResponse authUserWithGoogle(GoogleAuthParam param);
}
