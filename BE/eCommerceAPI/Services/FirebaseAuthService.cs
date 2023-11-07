﻿using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Text;
using eCommerceAPI.Interfaces;
using eCommerceAPI.Dtos;

namespace eCommerceAPI.Services;

public class FirebaseAuthService: IFirebaseAuthService, IDisposable
{

    private FirebaseAuthOptions options;
    private readonly HttpClient client;
    private static readonly JsonSerializerSettings jsonSettings = new JsonSerializerSettings
    {
        ContractResolver = new CamelCasePropertyNamesContractResolver(),
        MissingMemberHandling = MissingMemberHandling.Ignore
    };

    /// <param name="options">Options to configure the service to communicate with Firebase REST API.</param>
    public FirebaseAuthService(FirebaseAuthOptions options)
    {
        this.options = options;
        this.client = new HttpClient();
    }

    private string RelyingPartyUrl(string endpoint)
    {
        return $"https://www.googleapis.com/identitytoolkit/v3/relyingparty/{endpoint}?key={options.WebApiKey}";
    }

    private string SecureTokenUrl()
    {
        return $"https://securetoken.googleapis.com/v1/token?key={options.WebApiKey}";
    }

    /// <summary>
    /// Creates a new user in Firebase.
    /// </summary>
    public async Task<SignUpNewUserResponse> SignUpNewUser(SignUpNewUserRequest request)
    {
        return await Post<SignUpNewUserResponse>(RelyingPartyUrl("signupNewUser"), request);
    }

    /// <summary>
    /// Verifies the password for a given user. This is equivalent to signing the user in
    /// with an email and password.
    /// </summary>
    public async Task<VerifyPasswordResponse> VerifyPassword(VerifyPasswordRequest request)
    {
        return await Post<VerifyPasswordResponse>(RelyingPartyUrl("verifyPassword"), request);
    }

    /// <summary>
    /// Verifies the user via refresh token.
    /// </summary>
    public async Task<VerifyRefreshTokenResponse> VerifyRefreshToken(VerifyRefreshTokenRequest request)
    {
        return await Post<VerifyRefreshTokenResponse>(SecureTokenUrl(), request);
    }

    private async Task<TResponse> Post<TResponse>(string endpoint, object request) where TResponse : class
    {
        string responseJson = "";

        try
        {
            var content = JsonConvert.SerializeObject(request, jsonSettings);
            var payload = new StringContent(content, Encoding.UTF8, "application/json");
            var response = await this.client.PostAsync(endpoint, payload);
            responseJson = await response.Content.ReadAsStringAsync();
            response.EnsureSuccessStatusCode();
            return JsonConvert.DeserializeObject<TResponse>(responseJson);
        }
        catch (Exception e)
        {
            try
            {
                var errorResponse = JsonConvert.DeserializeObject<FirebaseAuthErrorResponseWrapper>(responseJson, jsonSettings);
                throw new FirebaseAuthException($"Call to Firebase Auth API resulted in a bad request: {errorResponse.Error.Message}", e)
                {
                    Error = errorResponse.Error,
                    ResponseJson = responseJson
                };
            }
            catch (JsonSerializationException ex)
            {
                throw new FirebaseAuthException("Deserializing Firebase Auth API response failed", ex)
                {
                    OriginRequestException = e,
                    ResponseJson = responseJson
                };
            }
        }
    }

    /// <summary>
    /// Cleans up the web client after usage.
    /// </summary>
    public void Dispose()
    {
        client.Dispose();
    }
}
