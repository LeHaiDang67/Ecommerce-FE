using eCommerceAPI.Components;
using eCommerceAPI.RouterClasses;
using FirebaseAdmin;
using FirebaseAdminAuthentication.DependencyInjection.Extensions;
using Google.Apis.Auth.OAuth2;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

// Add "Router" classes as a service
builder.Services.AddScoped<RouterBase, WeatherForecastRouter>();


//Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", @"<PATH_TO_CREDENTIALS_FILE");
//builder.Services.AddSingleton(FirebaseApp.Create());

// Authentication setup
builder.Services.AddSingleton(FirebaseApp.Create(new AppOptions() 
{
    Credential = GoogleCredential.FromJson(builder.Configuration.GetValue<string>("FIREBASE_CONFIG"))
}));

builder.Services.AddFirebaseAuthentication();
builder.Services.AddAuthorization();

var app = builder.Build();

//Use Cors need NuGet Package for it.
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
.WithOrigins("https://localhost:5296", "http://localhost:64714", "", "http://localhost:3000"));

app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
//app.UseAuthorization();


//*************************************
// Add Routes from all "Router Classes" folder 
//*************************************
using (var scope = app.Services.CreateScope())
{
    // Instance of services where you build all RouterBase classes
    var services = scope.ServiceProvider.GetServices<RouterBase>();

    // Loop through each RouterBase class
    foreach (var item in services)
    {
        // Invoke the AddRoutes() method for each RouterBase class
        item.AddRoutes(app);
    }

    // Make sure this is called within the application scope
    app.Run();
}