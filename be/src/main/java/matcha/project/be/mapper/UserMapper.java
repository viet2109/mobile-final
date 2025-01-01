package matcha.project.be.mapper;

import matcha.project.be.DTO.GetUserInfoDto;
import matcha.project.be.database.entity.UserEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    GetUserInfoDto entityToDto(UserEntity userEntity);

    UserEntity dtoToEntity(GetUserInfoDto getUserInfoDto);
}
