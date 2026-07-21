package com.reelcosmos.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtResponse {

    private String accessToken;

    private String refreshToken;

    @Builder.Default
    private String tokenType = "Bearer";

    /*
        مدت اعتبار Access Token بر حسب ثانیه
     */
    private Long expiresIn;
}