package matcha.project.be.DTO;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class LoginReponseBodyDto implements Serializable {
    /** UID */
    @Serial
    private static final long serialVersionUID = 1L;

    private String token;
    private GetUserInfoDto user;
}
