package com.reelcosmos.service.impl;

import com.reelcosmos.dto.request.UserUpdateRequest;
import com.reelcosmos.dto.response.UserResponse;
import com.reelcosmos.entity.Role;
import com.reelcosmos.entity.User;
import com.reelcosmos.exception.ResourceNotFoundException;
import com.reelcosmos.exception.UnauthorizedException;
import com.reelcosmos.mapper.UserMapper;
import com.reelcosmos.repository.UserRepository;
import com.reelcosmos.security.SecurityUtils;
import com.reelcosmos.service.auth.RefreshTokenService;
import com.reelcosmos.service.auth.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final RefreshTokenService refreshTokenService;





    private User findUser(Long id) {


        return userRepository.findById(id)

                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found."
                        )
                );

    }







    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser() {


        Long userId =
                SecurityUtils.getCurrentUserId();



        if(userId == null){

            throw new UnauthorizedException(
                    "User is not authenticated."
            );

        }



        return userMapper.toResponse(
                findUser(userId)
        );

    }









    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {


        return userMapper.toResponse(
                findUser(id)
        );

    }





    @Override
    @Transactional(readOnly = true)
    public Page<UserResponse> getUsers(
            String search,
            Pageable pageable
    ) {

        Page<User> users;

        if (search == null || search.isBlank()) {

            users = userRepository.findAll(pageable);

        } else {

            users = userRepository
                    .findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                            search,
                            search,
                            pageable
                    );

        }

        return users.map(userMapper::toResponse);

    }











    @Override
    public UserResponse updateCurrentUser(
            UserUpdateRequest request
    ) {


        Long userId =
                SecurityUtils.getCurrentUserId();



        if(userId == null){

            throw new UnauthorizedException(
                    "User is not authenticated."
            );

        }



        User user =
                findUser(userId);



        userMapper.updateEntity(
                request,
                user
        );



        return userMapper.toResponse(user);

    }









    @Override
    public void deleteCurrentUser() {


        Long userId =
                SecurityUtils.getCurrentUserId();



        if(userId == null){

            throw new UnauthorizedException(
                    "User is not authenticated."
            );

        }



        User user =
                findUser(userId);



        refreshTokenService
                .revokeAllUserTokens(user);



        userRepository.delete(user);


    }










    // ================= ADMIN =================





    @Override
    public UserResponse updateUser(
            Long id,
            UserUpdateRequest request
    ) {


        User user =
                findUser(id);



        userMapper.updateEntity(
                request,
                user
        );



        return userMapper.toResponse(user);

    }








    @Override
    public void deleteUser(Long id) {


        User user =
                findUser(id);



        refreshTokenService
                .revokeAllUserTokens(user);



        userRepository.delete(user);


    }








    @Override
    public UserResponse changeUserRole(
            Long id,
            Role role
    ) {


        User user =
                findUser(id);



        user.setRole(role);



        return userMapper.toResponse(user);

    }


}