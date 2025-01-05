package matcha.project.be.database.dao;

import matcha.project.be.database.entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileDao extends JpaRepository<ProfileEntity, Integer> {
    Optional<ProfileEntity> findByEmail(String email);
}
