package matcha.project.be.controller;

import lombok.RequiredArgsConstructor;
import matcha.project.be.DTO.*;
import matcha.project.be.database.entity.UserEntity;
import matcha.project.be.mapper.UserMapper;
import matcha.project.be.service.AuthService;
import matcha.project.be.service.CodeVerifyService;
import matcha.project.be.service.EmailService;
import matcha.project.be.service.UserService;
import matcha.project.be.util.JwtUtil;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserService userService;
    private final UserMapper userMapper;
    private final CodeVerifyService codeVerifyService;
    private final EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<Object> createUser(@RequestBody RegisterDto registerDto) {
        Map<String, Object> responseBody = new HashMap<>();
        try {
            UserEntity userEntity = userService.createUser(registerDto);
            GetUserInfoDto getUserInfoDto = userMapper.entityToDto(userEntity);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{email}")
                    .buildAndExpand(registerDto.getEmail())
                    .toUri();

            return ResponseEntity.created(location).body(getUserInfoDto);
        } catch (IllegalArgumentException ie) {
            responseBody.put("error", ie.getMessage());
            return ResponseEntity.badRequest().body(responseBody);
        } catch (DuplicateKeyException de) {
            responseBody.put("error", de.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDto loginDto) {
        Map<String, Object> responseBody = new HashMap<>();
        try {
            LoginReponseBodyDto loginReponseBodyDto = authService.login(loginDto.getEmail(), loginDto.getPassword());
            return ResponseEntity.ok(loginReponseBodyDto);
        } catch (IllegalArgumentException ie) {
            responseBody.put("error", ie.getMessage());
            return ResponseEntity.badRequest().body(responseBody);
        } catch (EmptyResultDataAccessException ee) {
            responseBody.put("error", ee.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
        }
    }

    @PostMapping("/sendCode")
    public ResponseEntity<Object> sendCode(@RequestBody Map<String, String> email) {
        Map<String, Object> responseBody = new HashMap<>();
        try {
            String code = codeVerifyService.saveCode(email.get("email"));
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(email.get("email"));
            emailDetails.setSubject("Matcha Verification Code");
            emailDetails.setMsgBody("Your verification code is: " + code);
            String message = emailService.sendSimpleMail(emailDetails);
            responseBody.put("message", message);
            return ResponseEntity.ok(responseBody);
        } catch (IllegalArgumentException ie) {
            responseBody.put("error", ie.getMessage());
            return ResponseEntity.badRequest().body(responseBody);
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Object> changePassword(@RequestBody Map<String, String> email) {
        Map<String, Object> responseBody = new HashMap<>();
        try {
            authService.changePassword(email.get("email"));
            responseBody.put("message", "Password changed successfully");
            return ResponseEntity.ok(responseBody);
        } catch (IllegalArgumentException ie) {
            responseBody.put("error", ie.getMessage());
            return ResponseEntity.badRequest().body(responseBody);
        } catch (EmptyResultDataAccessException ee) {
            responseBody.put("error", ee.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
        }
    }
}
