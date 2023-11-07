namespace eCommerceAPI.Dtos;

public class BaseRequest
{
    /// <summary>
    /// Whether or not to return an ID and refresh token. Should always be true.
    /// </summary>
    public bool ReturnSecureToken { get; set; } = true;
}
