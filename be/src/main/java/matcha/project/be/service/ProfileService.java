package matcha.project.be.service;

import lombok.RequiredArgsConstructor;
import matcha.project.be.database.dao.ProfileDao;
import matcha.project.be.database.entity.ProfileEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileDao profileDao;

    public ProfileEntity getProfileByEmail(String email) {
        return profileDao.findByEmail(email).orElseThrow(
                () -> new IllegalArgumentException("Profile not found")
        );
    }

}
