using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace eCommerceAPI.App_Codes.Constraint;

[JsonConverter(typeof(StringEnumConverter))]
public enum FirebaseAuthMessageType
{
    Unknown,
    [EnumMember(Value = "OPERATION_NOT_ALLOWED")]
    OperationNotAllowed,
    [EnumMember(Value = "EMAIL_EXISTS")]
    EmailExists,
    [EnumMember(Value = "WEAK_PASSWORD")]
    WeakPassword,
    [EnumMember(Value = "MISSING_PASSWORD")]
    MissingPassword,
    [EnumMember(Value = "INVALID_PASSWORD")]
    InvalidPassword,
    [EnumMember(Value = "INVALID_EMAIL")]
    InvalidEmail,
    [EnumMember(Value = "MISSING_EMAIL")]
    MissingEmail,
    [EnumMember(Value = "EMAIL_NOT_FOUND")]
    EmailNotFound,
    [EnumMember(Value = "USER_DISABLED")]
    UserDisabled
}
