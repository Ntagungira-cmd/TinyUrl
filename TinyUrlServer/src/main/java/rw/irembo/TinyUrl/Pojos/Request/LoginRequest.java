package rw.irembo.TinyUrl.Pojos.Request;

import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginRequest {
    @NotNull
    private String username;
    @NotNull
    private String password;
}
