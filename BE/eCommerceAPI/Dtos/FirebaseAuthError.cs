using eCommerceAPI.App_Codes.Constraint;
using eCommerceAPI.Helpers;
using System.Text.Json.Serialization;

namespace eCommerceAPI.Dtos;

public class FirebaseAuthError
{
    public string Domain { get; set; }
    public string Reason { get; set; }
    public string Message { get; set; }

    private FirebaseAuthMessageType _messageType;

    [JsonIgnore]
    public FirebaseAuthMessageType MessageType
    {
        get
        {
            if (_messageType == FirebaseAuthMessageType.Unknown)
            {
                _messageType = EnumHelper.GetValueIfStringStartsWith<FirebaseAuthMessageType>(Message);
            }

            return _messageType;
        }
    }
}
