package rw.irembo.TinyUrl.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.irembo.TinyUrl.Models.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User>findByEmail(String email);
    Boolean existsByEmail(String email);
}
