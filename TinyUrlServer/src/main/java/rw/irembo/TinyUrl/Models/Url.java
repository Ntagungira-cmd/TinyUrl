package rw.irembo.TinyUrl.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Url {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String longUrl;
    @Column(unique = true)
    private String shortUrl;
    private Long userId;
    @Column(columnDefinition = "integer default 0")
    private Integer clicks;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    public Url(String longUrl, String shortUrl, Long userId, LocalDateTime createdAt,LocalDateTime expiresAt) {
        this.longUrl = longUrl;
        this.shortUrl = shortUrl;
        this.userId = userId;
        this.clicks = 0;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }
}
