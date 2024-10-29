package matcha.project.be.entity;

import jakarta.persistence.*;
import lombok.Data;
import matcha.project.be.common.entity.SystemField;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Data
@Table(name = "t_country")
public class CountryEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @Column(name = "telephone_code")
    private String telephoneCode;

    @Embedded
    private SystemField systemField;
}
