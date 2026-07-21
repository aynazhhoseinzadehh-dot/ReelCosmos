package com.reelcosmos.dto.response;

import com.reelcosmos.entity.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {

    private Long id;

    private String username;

    private String email;

    private String firstName;

    private String lastName;

    private String bio;

    private String profileImageUrl;

    private Role role;
}
