package rw.irembo.TinyUrl.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import rw.irembo.TinyUrl.Models.Url;

import java.util.List;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {
    Url findByShortUrl(String shortUrl);
    Boolean existsByByLongUrl(String longUrl);
    @Query("SELECT u FROM Url u WHERE u.userId = :userId")
    List<Url> findUrlByUserId(@Param("userId") Long userId);
}
