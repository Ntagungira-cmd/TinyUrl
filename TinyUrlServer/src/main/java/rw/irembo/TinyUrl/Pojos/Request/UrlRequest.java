package rw.irembo.TinyUrl.Pojos.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UrlRequest {
    @NotBlank
    private String longUrl;
    private String alias;
    @NotNull
    private Long userId;
    private String expiryDate;
}
