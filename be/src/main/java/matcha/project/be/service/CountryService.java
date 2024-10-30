package matcha.project.be.service;

import lombok.RequiredArgsConstructor;
import matcha.project.be.database.dao.CountryDao;
import matcha.project.be.database.entity.CountryEntity;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryService {

    private final CountryDao countryDao;
    public List<CountryEntity> getPullDownList() {
        return countryDao.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }
}
