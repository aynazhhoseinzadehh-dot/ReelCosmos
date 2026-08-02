package com.reelcosmos.controller;

import com.reelcosmos.dto.request.UserUpdateRequest;
import com.reelcosmos.dto.response.UserResponse;
import com.reelcosmos.entity.Role;
import com.reelcosmos.service.auth.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import java.util.List;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;



    // ================= CURRENT USER =================


    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {

        return ResponseEntity.ok(
                userService.getCurrentUser()
        );

    }



    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateCurrentUser(
            @Valid
            @RequestBody UserUpdateRequest request
    ) {


        return ResponseEntity.ok(
                userService.updateCurrentUser(request)
        );

    }



    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteCurrentUser() {


        userService.deleteCurrentUser();


        return ResponseEntity
                .noContent()
                .build();

    }




    // ================= ADMIN =================


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<Page<UserResponse>> getUsers(

            @RequestParam(required = false)
            String search,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size,

            @RequestParam(defaultValue = "username,asc")
            String sort

    ) {

        size = Math.min(size, 100);

        String[] sortParts = sort.split(",");

        String property = sortParts[0];

        Sort.Direction direction =
                sortParts.length > 1
                        ? Sort.Direction.fromString(sortParts[1])
                        : Sort.Direction.ASC;

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(direction, property)
                );

        return ResponseEntity.ok(

                userService.getUsers(
                        search,
                        pageable
                )

        );

    }






    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable Long id
    ) {


        return ResponseEntity.ok(
                userService.getUserById(id)
        );

    }






    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,

            @Valid
            @RequestBody UserUpdateRequest request
    ) {


        return ResponseEntity.ok(
                userService.updateUser(
                        id,
                        request
                )
        );

    }







    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Long id
    ) {


        userService.deleteUser(id);


        return ResponseEntity
                .noContent()
                .build();

    }








    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/role")
    public ResponseEntity<UserResponse> changeRole(
            @PathVariable Long id,

            @RequestParam Role role
    ) {


        return ResponseEntity.ok(
                userService.changeUserRole(
                        id,
                        role
                )
        );

    }


}