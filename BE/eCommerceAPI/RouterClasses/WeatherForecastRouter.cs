using eCommerceAPI.Components;
using eCommerceAPI.EntityClasses;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Firebase.Auth;

namespace eCommerceAPI.RouterClasses;

public class WeatherForecastRouter : RouterBase
{
    private FirebaseAuthProvider _firebaseAuthProvider;
    private FirebaseAuthLink _currentFirebaseAuthLink;


    public WeatherForecastRouter(ILogger<WeatherForecastRouter> logger)
    {
        Logger = logger;
        _firebaseAuthProvider = new FirebaseAuthProvider(new FirebaseConfig("AIzaSyAq2rqCX-NKlU2_uBdVL2C63tg1vz9hVcQ"));

    }

    [Authorize]
    protected virtual IResult Authentication(ClaimsPrincipal principal)
    {
        return  Results.Ok("Firebase is cool.");
    }

    protected virtual async Task<IResult> SignIn(string user, string password)
    {
        try
        {
            _currentFirebaseAuthLink = await _firebaseAuthProvider.SignInWithEmailAndPasswordAsync(user, password);
        }
        catch (Exception ex)
        {
            return Results.Text(ex.Message);
        }

        return Results.Ok();
    }

    protected virtual async Task<IResult> verifyEmail()
    {
        try
        {
            await GetFreshAuthAsync();

            await _firebaseAuthProvider.SendEmailVerificationAsync(_currentFirebaseAuthLink.FirebaseToken);
        }
        catch (Exception ex)
        {
            return Results.Text(ex.Message);
        }

        return Results.Ok();
    }

    protected virtual async Task<IResult> SignUp(string user, string password, string confirmPassword)
    {
        if (password != confirmPassword)
        {
            return Results.Text("Password and confirm password must match.");
        }

        try
        {
            await _firebaseAuthProvider.CreateUserWithEmailAndPasswordAsync(
                user,
                password,
                confirmPassword,
                true);

        }
        catch (Exception ex)
        {
            return Results.Text(ex.Message);
        }
        return Results.Ok();
    }

    public async Task<FirebaseAuthLink> GetFreshAuthAsync()
    {
        if (_currentFirebaseAuthLink == null)
        {
            return null;
        }

        _currentFirebaseAuthLink = await _currentFirebaseAuthLink.GetFreshAuthAsync();
        return _currentFirebaseAuthLink;
    }

    /// <summary>
    /// The AddRoutes() method calls the app.MapGet() method using the WebApplication app variable passed in from the Program.cs file.
    ///  The first parameter to the MapGet() method is  the route name the user sends the request to, such as http://
    /// localhost:nnnn/product or http://localhost:nnnn/customer
    //</summary>
    /// <param name="app">A WebApplication object</param>
    public override void AddRoutes(WebApplication app)
    {
        app.MapPost($"/signUp", (string user, string passWord, string confirmPassword) => SignUp(user, passWord, confirmPassword));
        app.MapPost($"/login", (string user, string passWord) => SignIn(user, passWord));
        app.MapGet($"/verifyEmail", () => verifyEmail());

        // app.MapGet($"/{UrlFragment}/{{id:int}}",
        // (int id) => Get(id));

        // app.MapGet($"/{UrlFragment}/{{name}}",
        //(string name) => GetByFirstName(name));

        // app.MapPost($"/{UrlFragment}",
        // (Customer entity) => Post(entity));

        // app.MapPut($"/{UrlFragment}/{{id:int}}",
        // (int id, Customer entity) => Put(id, entity));

        // app.MapDelete($"/{UrlFragment}/{{id:int}}",
        // (int id) => Delete(id));
    }
}
