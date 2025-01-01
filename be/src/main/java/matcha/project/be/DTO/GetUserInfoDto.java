package matcha.project.be.DTO;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class GetUserInfoDto implements Serializable {
    /** UID */
    @Serial
    private static final long serialVersionUID = 1L;

    private Integer id;

    /** Name of user */
    private String name;

    /** Email of user */
    private String email;

    /** Created at */
    private LocalDateTime created;

    /** Updated at */
    private LocalDateTime updated;

    private String avatar;
}
