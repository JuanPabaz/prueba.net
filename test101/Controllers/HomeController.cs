using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using test101.Models;

namespace test101.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly ExternalApiService _externalApiService;

    public HomeController(ILogger<HomeController> logger, ExternalApiService externalApiService)
    {
        _logger = logger;
        _externalApiService = externalApiService;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }


}
