package matcha.project.be.service;

import lombok.RequiredArgsConstructor;
import matcha.project.be.DTO.EmailDetails;
import matcha.project.be.DTO.GetUserInfoDto;
import matcha.project.be.DTO.LoginReponseBodyDto;
import matcha.project.be.database.dao.UserDao;
import matcha.project.be.database.entity.UserEntity;
import matcha.project.be.mapper.UserMapper;
import matcha.project.be.util.JwtUtil;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserDao userDao;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public LoginReponseBodyDto login(String email, String password) {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        } else if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }

        UserEntity userEntity = userDao.findByEmail(email).orElseThrow(
                () -> new EmptyResultDataAccessException("User not found", 1)
        );

        if (passwordEncoder.matches(password, userEntity.getPassword())) {
            LoginReponseBodyDto loginReponseBodyDto = new LoginReponseBodyDto();
            loginReponseBodyDto.setToken(jwtUtil.generateToken(userEntity));
            GetUserInfoDto getUserInfoDto = userMapper.entityToDto(userEntity);
            loginReponseBodyDto.setUser(getUserInfoDto);
            return loginReponseBodyDto;
        } else {
            throw new IllegalArgumentException("Invalid password");
        }
    }

    public void changePassword(String email) {
        UserEntity userEntity = userDao.findByEmail(email).orElseThrow(
                () -> new EmptyResultDataAccessException("User not found", 1)
        );
        String newPassword = genaratePassword();
        userEntity.setPassword(passwordEncoder.encode(newPassword));
        userDao.save(userEntity);
        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setSubject("Change password");
        emailDetails.setRecipient(email);
        emailDetails.setMsgBody("Your new password is: " + newPassword);
        emailService.sendSimpleMail(emailDetails);
    }

    private String genaratePassword() {
        StringBuilder password = new StringBuilder();
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        int length = 8;
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            password.append(characters.charAt(random.nextInt(characters.length())));
        }
        return password.toString();
    }
}
