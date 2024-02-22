package rw.irembo.TinyUrl.Pojos.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UrlResponse {
    private String longUrl;
    private String shortUrl;
    private String expiryDate;
}
