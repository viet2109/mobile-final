package matcha.project.be.service;

import lombok.RequiredArgsConstructor;
import matcha.project.be.DTO.LoginReponseBodyDto;
import matcha.project.be.database.dao.UserDao;
import matcha.project.be.database.entity.UserEntity;
import matcha.project.be.mapper.UserMapper;
import matcha.project.be.util.JwtUtil;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserDao userDao;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

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
            loginReponseBodyDto.setUser(userMapper.entityToDto(userEntity));
            return loginReponseBodyDto;
        } else {
            throw new IllegalArgumentException("Invalid password");
        }
    }
}
