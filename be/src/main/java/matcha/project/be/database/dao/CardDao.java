package matcha.project.be.database.dao;

import matcha.project.be.database.entity.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardDao extends JpaRepository<CardEntity, Integer> {
}