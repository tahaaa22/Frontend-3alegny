using FastEndpoints;
namespace _3alegny.Features;

public class testingEndPoints: Endpoint<UserRequest, UserRespond>
{
    public override void Configure()
    {
        Get("/api/users");
        AllowAnonymous(); // until adding users, for verification
    }

    public override async Task<UserRespond> ExecuteAsync(UserRequest req, CancellationToken ct)
    {
        return new UserRespond { Email = req.Email };
    }

}


public record UserRequest
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}

public record UserRespond
{
    public string Email { get; set; } = "testing.com";
}