package matcha.project.be.common.date;

import matcha.project.be.common.entity.SystemField;

import java.time.LocalDateTime;

public class SystemFieldHelper {
    public static SystemField setSystemFieldForInsert() {
        SystemField systemField = new SystemField();
        LocalDateTime now = LocalDateTime.now();
        systemField.setCreatedAt(now);
        systemField.setUpdatedAt(now);
        return systemField;
    }
}
