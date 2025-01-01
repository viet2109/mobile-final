package matcha.project.be.DTO;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class LoginDto implements Serializable {
    /** UID */
    @Serial
    private static final long serialVersionUID = 1L;

    /** Email of user */
    private String email;

    /** Password of user */
    private String password;

}
