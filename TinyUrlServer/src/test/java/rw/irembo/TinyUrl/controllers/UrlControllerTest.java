package rw.irembo.TinyUrl.controllers;

import org.junit.jupiter.api.Test;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
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
    @WithMockUser(username = "user", password = "qwertyu", roles = "USER")
    @Transactional
    void generateUrl_shouldReturnGeneratedUrlResponse() throws Exception {
        UrlRequest request = new UrlRequest("http://example.com", "alias", 1L, "2022-12-31T00:00:00");

        mockMvc.perform(post("/generate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.longUrl").value("http://example.com"))
                .andExpect(jsonPath("$.shortUrl").value("alias"))
                .andExpect(jsonPath("$.expiryDate").value("2022-12-31T00:00"))
                .andExpect(jsonPath("$.clickCount").value(0));
    }

    @Test
    @Transactional
    void redirectToLongUrl_withValidShortUrl_shouldRedirect() throws Exception {
        String shortUrl = "validShortUrl";
        Url url = new Url("http://example.com", shortUrl, 1L, LocalDateTime.now(), LocalDateTime.now().plusHours(1));
        urlRepository.save(url);

        mockMvc.perform(get("/" + shortUrl))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("http://example.com"));
    }

    @Test
    @WithMockUser(username = "user", password = "qwertyu", roles = "USER")
    @Transactional
    void findUrlByUserId_withValidUserId_shouldReturnUrlResponses() throws Exception {
        Long userId = 1L;
//        LocalDateTime now = LocalDateTime.now();
//        LocalDateTime expiryDate = now.plusHours(1);
//        Url url = new Url("http://example.com", "shortUrl", userId, now, expiryDate);
//        urlRepository.save(url);

        mockMvc.perform(get("/urls/" + userId))
                .andExpect(status().isOk()).andExpectAll();
    }
}