package rw.irembo.TinyUrl.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import rw.irembo.TinyUrl.Models.Url;
import rw.irembo.TinyUrl.Pojos.Request.UrlRequest;
import rw.irembo.TinyUrl.Pojos.Response.MessageResponse;
import rw.irembo.TinyUrl.Pojos.Response.UrlResponse;
import rw.irembo.TinyUrl.Services.UrlService;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.google.common.base.Strings.isNullOrEmpty;

@RestController
@Controller
public class UrlController {

    @Autowired
    private UrlService urlService;
    @PostMapping("/generate")
    public ResponseEntity<?> generateUrl(@Valid @RequestBody UrlRequest req) {
        Url url = urlService.generateShortUrl(req);
        if(url != null)
            return ResponseEntity.ok().body(new UrlResponse(url.getLongUrl(), url.getShortUrl(),
                    url.getExpiresAt().toString(), url.getClicks()));
        return ResponseEntity.ok().body(new MessageResponse(HttpStatus.NOT_FOUND, "failed to generate link"));
    }

    @GetMapping("/{tinyUrl}")
    public ResponseEntity<?> redirectToLongUrl(@PathVariable String tinyUrl, HttpServletResponse response) throws IOException {

        if(!isNullOrEmpty(tinyUrl)){
            Url url = urlService.findUrlByShortUrl(tinyUrl);
            // if the link does not exist, return an error message
            if(url == null){
                return ResponseEntity.ok().body(new MessageResponse(HttpStatus.NOT_FOUND, "link not found"));
            }
            // if the link has expired, delete it and return a message
            if(url.getExpiresAt().isBefore(LocalDateTime.now())){
                urlService.deleteUrl(tinyUrl);
                return ResponseEntity.ok().body(new MessageResponse(HttpStatus.NOT_FOUND, "link expired"));
            }
            // if the link exists and has not expired, redirect to the long url
            urlService.updateClickCount(tinyUrl);
            response.sendRedirect(url.getLongUrl());
        }
        return ResponseEntity.ok().body(new MessageResponse(HttpStatus.NOT_FOUND, "There was an error redirecting"));
    }
    @GetMapping("/urls/{userId}")
    public ResponseEntity<?> findUrlByUserId(@PathVariable Long userId){
        List<Url> url = urlService.findUrlByUserId(userId);
        if(!url.isEmpty()){
            // if the user has links, return them
            List<UrlResponse> urls = new ArrayList<>();
            for (Url u : url) {
                urls.add(new UrlResponse(u.getLongUrl(), u.getShortUrl(), u.getExpiresAt().toString(), u.getClicks()));
            }
           return ResponseEntity.ok().body(urls);
        }
        return ResponseEntity.ok().body(new MessageResponse(HttpStatus.NOT_FOUND, "user has no links"));
    }
}
