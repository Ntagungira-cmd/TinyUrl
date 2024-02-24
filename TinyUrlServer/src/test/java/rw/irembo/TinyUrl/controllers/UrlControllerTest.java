package rw.irembo.TinyUrl.controllers;

import org.junit.jupiter.api.Test;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import rw.irembo.TinyUrl.Models.Url;
import rw.irembo.TinyUrl.Pojos.Request.UrlRequest;
import rw.irembo.TinyUrl.Repositories.UrlRepository;
import rw.irembo.TinyUrl.Services.UrlService;
import java.time.LocalDateTime;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UrlControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UrlRepository urlRepository;

    @Autowired
    private UrlService urlService;

    @Test
    @Transactional
    void generateUrl_shouldReturnGeneratedUrlResponse() throws Exception {
        UrlRequest request = new UrlRequest("http://example.com", "alias", 1L, "2022-12-31T00:00:00");

        // Act & Assert
        mockMvc.perform(post("/generate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.longUrl").value("http://example.com"))
                .andExpect(jsonPath("$.shortUrl").value("alias"))
                .andExpect(jsonPath("$.expiresAt").value("2022-12-31T00:00:00"))
                .andExpect(jsonPath("$.clicks").value(0));
    }

    @Test
    @Transactional
    void redirectToLongUrl_withValidShortUrl_shouldRedirect() throws Exception {
        String shortUrl = "validShortUrl";
        Url url = new Url("http://example.com", shortUrl, 1L, LocalDateTime.now(), LocalDateTime.now().plusHours(1));
        urlRepository.save(url);

        // Act & Assert
        mockMvc.perform(get("/" + shortUrl))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("http://example.com"));
    }

    @Test
    @Transactional
    void findUrlByUserId_withValidUserId_shouldReturnUrlResponses() throws Exception {
        Long userId = 1L;
        Url url = new Url("http://example.com", "shortUrl", userId, LocalDateTime.now(), LocalDateTime.now().plusHours(1));
        urlRepository.save(url);

        // Act & Assert
        mockMvc.perform(get("/urls/" + userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].longUrl").value("http://example.com"))
                .andExpect(jsonPath("$[0].shortUrl").value("shortUrl"))
                .andExpect(jsonPath("$[0].expiresAt").doesNotExist()) // Assuming the expiry date is null
                .andExpect(jsonPath("$[0].clicks").value(0));
    }
}