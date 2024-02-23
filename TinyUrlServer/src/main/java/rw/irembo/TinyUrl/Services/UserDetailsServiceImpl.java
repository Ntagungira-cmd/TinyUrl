package rw.irembo.TinyUrl.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import rw.irembo.TinyUrl.Models.User;
import rw.irembo.TinyUrl.Repositories.UserRepository;
import rw.irembo.TinyUrl.Security.UserDetailsImpl;
import javax.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User with email "+email+" not found"));
        return UserDetailsImpl.build(user);
    }
}
