package rw.irembo.TinyUrl.Services;

import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rw.irembo.TinyUrl.Models.Url;
import rw.irembo.TinyUrl.Pojos.Request.UrlRequest;
import rw.irembo.TinyUrl.Repositories.UrlRepository;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Logger;

import static com.google.common.base.Strings.isNullOrEmpty;

@Service
public class UrlService {
    @Autowired
    private UrlRepository urlRepository;


    private String shortenUrl(String longUrl){
        String shortUrl = "";
        LocalDateTime dateTime = LocalDateTime.now();
        // generate a unique short url by hashing the long url and the current date time
        shortUrl = Hashing.murmur3_32_fixed().hashString(longUrl.concat(dateTime.toString()), StandardCharsets.UTF_8)
                .toString();
        return shortUrl;
    }
    public Url generateShortUrl(UrlRequest urlRequest){
        String shortUrl = "";
        // if long url is provided, generate short url
        if (!isNullOrEmpty(urlRequest.getLongUrl())) {

            if (isNullOrEmpty(urlRequest.getAlias()) || isAliasUnavailable(urlRequest.getAlias())) {
                // No alias or alias already taken, generate a short URL
                shortUrl = shortenUrl(urlRequest.getLongUrl());
            } else {
                // Use the provided alias
                shortUrl = urlRequest.getAlias();
            }

            // Create and save the Url object
            LocalDateTime createdAt = LocalDateTime.now();
            Url url = new Url(
                    urlRequest.getLongUrl(),
                    shortUrl,
                    urlRequest.getUserId(),
                    createdAt,
                    generateExpirationDate(urlRequest.getExpiryDate(), createdAt)
            );
            return urlRepository.save(url);
        }
        return null;
    }

    private Boolean isAliasUnavailable(String alias){
        return findUrlByShortUrl(alias) != null;
    }
    private LocalDateTime generateExpirationDate(String expiryDate, LocalDateTime createdAt){
        // if expiry date is not provided, the url will expire after 1 hour
        if(isNullOrEmpty(expiryDate)){
            return createdAt.plusHours(1);
        }
        return LocalDateTime.parse(expiryDate);
    }

    public void deleteUrl(String shortUrl){
        Url url = urlRepository.findByShortUrl(shortUrl);
        urlRepository.delete(url);
    }

    public Url findUrlByShortUrl(String shortUrl){
        return urlRepository.findByShortUrl(shortUrl);
    }

    public List<Url> findUrlByUserId(Long userId){
        return urlRepository.findUrlByUserId(userId);
    }
    public void updateClickCount(String clickedShortUrl) {
        Url url = urlRepository.findByShortUrl(clickedShortUrl);
        if (url != null) {
            url.setClicks(url.getClicks() + 1);
            urlRepository.save(url);
        }
    }
}
