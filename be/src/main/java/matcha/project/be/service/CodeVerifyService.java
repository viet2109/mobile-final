package matcha.project.be.service;

import lombok.RequiredArgsConstructor;
import matcha.project.be.common.entity.SystemField;
import matcha.project.be.database.dao.CodeVerifyDao;
import matcha.project.be.database.entity.CodeVerifyEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CodeVerifyService {
    private final CodeVerifyDao codeVerifyDao;

    public String saveCode(String email) {
        String code = generateCode();

        CodeVerifyEntity codeVerifyEntity = new CodeVerifyEntity();
        codeVerifyEntity.setEmail(email);
        codeVerifyEntity.setCode(code);

        SystemField systemField = new SystemField();

        LocalDateTime now = LocalDateTime.now();

        systemField.setCreatedAt(now);
        systemField.setUpdatedAt(now);

        codeVerifyEntity.setSystemField(systemField);

        codeVerifyDao.save(codeVerifyEntity);
        return code;
    }

    public boolean verifyCode(String email, String code) {
        CodeVerifyEntity codeVerifyEntity = codeVerifyDao.findByEmailAndCode(email, code);

        if (codeVerifyEntity == null) {
            return false;
        }

        if (codeVerifyEntity.getSystemField().getCreatedAt().plusSeconds(120).isBefore(LocalDateTime.now())) {
            return false;
        }

        codeVerifyDao.delete(codeVerifyEntity);

        return true;
    }

    private String generateCode() {
        int code = (int) (Math.random() * 900000) + 100000;
        return String.valueOf(code);
    }

}
