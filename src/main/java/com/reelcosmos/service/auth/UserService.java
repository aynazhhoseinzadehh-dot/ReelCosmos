package com.reelcosmos.service.auth;

import com.reelcosmos.dto.request.UserUpdateRequest;
import com.reelcosmos.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse getCurrentUser();

    UserResponse getUserById(Long id);

    List<UserResponse> getAllUsers();

    UserResponse updateCurrentUser(UserUpdateRequest request);

    void deleteCurrentUser();

}