package matcha.project.be.service;

import lombok.RequiredArgsConstructor;
import matcha.project.be.DTO.RegisterDto;
import matcha.project.be.common.entity.SystemField;
import matcha.project.be.database.dao.UserDao;
import matcha.project.be.database.entity.UserEntity;
import matcha.project.be.util.JwtUtil;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final CodeVerifyService codeVerifyService;

    public UserEntity createUser(RegisterDto registerDto) {
        if (!codeVerifyService.verifyCode(registerDto.getEmail(), registerDto.getCode())) {
            throw new IllegalArgumentException("Code is invalid");
        }

        String error = inputCheck(registerDto);

        // check if there is any error
        if (!error.isEmpty()) {
            throw new IllegalArgumentException(error);
        }

        if (userDao.findByEmail(registerDto.getEmail()).isPresent()) {
            throw new DuplicateKeyException("Email already exists");
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(registerDto.getEmail());
        userEntity.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        SystemField systemField = new SystemField();
        LocalDateTime now = LocalDateTime.now();
        systemField.setCreatedAt(now);
        systemField.setUpdatedAt(now);
        userEntity.setSystemField(systemField);
        return userDao.save(userEntity);
    }

    public UserEntity getUserByEmail(String email) {
        return userDao.findByEmail(email).orElse(null);
    }

    public UserEntity getUserById(Integer id) {
        return userDao.findById(id).orElseThrow(() -> new EmptyResultDataAccessException("User not found", 1));
    }

    public String getEmailfromToken(String token) {
        return jwtUtil.getEmailFromJwt(token);
    }

    private String inputCheck(RegisterDto registerDto) {
        StringBuilder error = new StringBuilder();
        if (registerDto.getPassword() == null || registerDto.getPassword().isEmpty()) {
            error.append("Password is required");
        } else if (registerDto.getEmail() == null || registerDto.getEmail().isEmpty()) {
            error.append("Email is required");
        }
        return error.toString();
    }

    public void updatePassword(String email, String newPassword) {
        UserEntity user = userDao.findByEmail(email).orElse(null);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userDao.save(user);
        }
    }

    public void updateUser(String email, String newName, String avatar, Integer id) {
        UserEntity user = userDao.findById(id).orElse(null);
        if (user != null) {
            user.setEmail(email);
            userDao.save(user);
        }
    }
}
