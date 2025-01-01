package matcha.project.be.DTO;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TransactionDTO {
    private String username;
    private BigDecimal amount;

    private String type;
    private String transactionDate;
    private String status;

    // Constructor
    public TransactionDTO(String username, BigDecimal amount,String type,Timestamp transactionDate,String status) {
        this.username = username;
        this.amount = amount;
        this.transactionDate = formatTimestamp(transactionDate);
        this.type = type;
        this.status = status;
    }


    private String formatTimestamp(Timestamp timestamp) {
        if (timestamp == null) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("dd MMM yyyy 'at' hh:mm a");
        return sdf.format(new Date(timestamp.getTime()));
    }

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }



    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }



    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public String getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(String transactionDate) {
        this.transactionDate = transactionDate;
    }
}