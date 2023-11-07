using eCommerceAPI.Dtos;
namespace eCommerceAPI.Interfaces;

public interface IFirebaseAuthService
{
    /// <summary>
    /// Creates a new user in Firebase.
    /// </summary>
    Task<SignUpNewUserResponse> SignUpNewUser(SignUpNewUserRequest request);

    /// <summary>
    /// Verifies the password for a given user. This is equivalent to signing the user in
    /// with an email and password.
    /// </summary>
    Task<VerifyPasswordResponse> VerifyPassword(VerifyPasswordRequest request);

    /// <summary>
    /// Verifies the user via refresh token.
    /// </summary>
    Task<VerifyRefreshTokenResponse> VerifyRefreshToken(VerifyRefreshTokenRequest request);
}
