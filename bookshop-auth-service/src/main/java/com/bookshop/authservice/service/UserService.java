package com.bookshop.authservice.service;

import com.bookshop.authservice.model.User;
import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);
    User save(User user);
}
