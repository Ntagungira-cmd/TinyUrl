package rw.irembo.TinyUrl.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rw.irembo.TinyUrl.Enums.ERole;
import rw.irembo.TinyUrl.Models.Role;
import rw.irembo.TinyUrl.Models.User;
import rw.irembo.TinyUrl.Pojos.Request.SignupRequest;
import rw.irembo.TinyUrl.Pojos.Response.MessageResponse;
import rw.irembo.TinyUrl.Repositories.RoleRepository;
import rw.irembo.TinyUrl.Repositories.UserRepository;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    RoleRepository roleRepository;

    public MessageResponse createUser(SignupRequest signUpRequest){
        Boolean emailExists = userRepository.existsByEmail(signUpRequest.getEmail());
        System.out.println(emailExists.getClass());
        if (emailExists) {
            System.out.println("test");
            return new MessageResponse(HttpStatus.ALREADY_REPORTED,"Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        //assign roles to users
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseGet(() -> {
                        Role role = new Role(ERole.ROLE_USER);
                        roleRepository.save(role);
                        return role;
                    });
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if ("admin".equals(role)) {
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                }else{
                    throw new RuntimeException("Error: Role is not found.");
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);
        return new MessageResponse(HttpStatus.CREATED,"User registered successfully!");
    }
}
