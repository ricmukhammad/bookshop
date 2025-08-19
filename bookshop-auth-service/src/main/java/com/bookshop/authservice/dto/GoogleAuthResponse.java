package com.bookshop.authservice.dto;

import com.bookshop.authservice.model.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Google auth response with user details")
public class GoogleAuthResponse {
    private String accessToken;
    private Integer expiresIn;
    private User user;
}
