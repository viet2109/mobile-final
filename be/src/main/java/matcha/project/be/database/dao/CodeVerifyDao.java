package matcha.project.be.database.dao;

import matcha.project.be.database.entity.CodeVerifyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodeVerifyDao extends JpaRepository<CodeVerifyEntity, Integer> {
    CodeVerifyEntity findByEmailAndCode(String email, String code);
}
