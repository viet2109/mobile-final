package matcha.project.be.database.dao;

import matcha.project.be.database.entity.CountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CountryDao extends JpaRepository<CountryEntity, Integer> {

}
