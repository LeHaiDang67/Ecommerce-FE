﻿using eCommerceAPI.App_Codes.Constraint;
using eCommerceAPI.Helpers;
using System.Text.Json.Serialization;

namespace eCommerceAPI.Dtos;

public class FirebaseAuthErrorResponseWrapper
{
    public FirebaseAuthErrorResponse Error { get; set; }
}

public class FirebaseAuthErrorResponse
{
    public int Code { get; set; }
    public string Message { get; set; }
    public IEnumerable<FirebaseAuthError> Errors { get; set; }


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
