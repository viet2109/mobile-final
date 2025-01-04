package matcha.project.be.database.dao;

import matcha.project.be.database.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserDao extends CrudRepository<UserEntity, Integer> {
    Optional<UserEntity> findByEmail(String email);
}
