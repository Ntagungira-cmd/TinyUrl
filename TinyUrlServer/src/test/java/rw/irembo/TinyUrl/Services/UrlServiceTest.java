package rw.irembo.TinyUrl.Services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import rw.irembo.TinyUrl.Models.Url;
import rw.irembo.TinyUrl.Pojos.Request.UrlRequest;
import rw.irembo.TinyUrl.Repositories.UrlRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UrlServiceTest {
    @Mock
    private UrlRepository urlRepository;

    @InjectMocks
    private UrlService urlService;

    @Test
    void generateShortUrl_withAliasAndDateAvailable_shouldGenerateShortUrlAndSaveToRepository() {
        // Arrange
        UrlRequest urlRequest = new UrlRequest("http://example.com", "customAlias", 1L, "2021-12-31T23:59:59");

        // Mocking
        when(urlRepository.findByShortUrl("customAlias")).thenReturn(null);

        // Act
        urlService.generateShortUrl(urlRequest);

        // Assert
        verify(urlRepository, times(1)).save(any(Url.class));
    }

    @Test
    void generateShortUrl_withAliasAndDateUnavailable_shouldGenerateUniqueShortUrlAndSaveToRepository() {
        // Arrange
        UrlRequest urlRequest = new UrlRequest("http://example.com", null, 1L, null);

        // Act
        urlService.generateShortUrl(urlRequest);

        // Assert
        verify(urlRepository, times(1)).save(any(Url.class));
    }
    @Test
    void deleteUrl_shouldDeleteUrlFromRepository() {
        // Arrange
        String shortUrl = "someShortUrl";
        Url url = new Url("http://example.com", shortUrl, 1L, LocalDateTime.now(), null);

        // Mocking
        when(urlRepository.findByShortUrl(shortUrl)).thenReturn(url);

        // Act
        urlService.deleteUrl(shortUrl);

        // Assert
        verify(urlRepository, times(1)).delete(url);
    }

    @Test
    void findUrlByShortUrl_shouldReturnUrlFromRepository() {
        // Arrange
        String shortUrl = "someShortUrl";
        Url expectedUrl = new Url("http://example.com", shortUrl, 1L, LocalDateTime.now(), null);
        // Mocking
        when(urlRepository.findByShortUrl(shortUrl)).thenReturn(expectedUrl);
        // Act
        Url actualUrl = urlService.findUrlByShortUrl(shortUrl);
        // Assert
        assertEquals(expectedUrl, actualUrl);
    }

    @Test
    void findUrlByUserId_shouldReturnUrlsFromRepository() {
        // Arrange
        Long userId = 1L;
        List<Url> expectedUrls = Arrays.asList(
                new Url("http://example1.com", "shortUrl1", userId, LocalDateTime.now(), null),
                new Url("http://example2.com", "shortUrl2", userId, LocalDateTime.now(), null)
        );

        // Mocking
        when(urlRepository.findUrlByUserId(userId)).thenReturn(expectedUrls);

        // Act
        List<Url> actualUrls = urlService.findUrlByUserId(userId);

        // Assert
        assertEquals(expectedUrls, actualUrls);
    }

    @Test
    void updateClickCount_shouldIncrementClicksAndSaveToRepository() {
        // Arrange
        String shortUrl = "someShortUrl";
        Url url = new Url("http://example.com", shortUrl, 1L, LocalDateTime.now(), null);

        // Mocking
        when(urlRepository.findByShortUrl(shortUrl)).thenReturn(url);

        // Act
        urlService.updateClickCount(shortUrl);

        // Assert
        assertEquals(1, url.getClicks());
        verify(urlRepository, times(1)).save(url);
    }
}