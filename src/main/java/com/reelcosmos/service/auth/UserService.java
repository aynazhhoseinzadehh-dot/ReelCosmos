package com.reelcosmos.service.auth;

import com.reelcosmos.dto.request.UserUpdateRequest;
import com.reelcosmos.dto.response.UserResponse;
import com.reelcosmos.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface UserService {


    UserResponse getCurrentUser();


    UserResponse getUserById(Long id);

    Page<UserResponse> getUsers(
            String search,
            Pageable pageable
    );

    UserResponse updateCurrentUser(
            UserUpdateRequest request
    );


    void deleteCurrentUser();



    // ================= ADMIN =================


    UserResponse updateUser(
            Long id,
            UserUpdateRequest request
    );


    void deleteUser(
            Long id
    );


    UserResponse changeUserRole(
            Long id,
            Role role
    );

}