using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using System.Text;

namespace CameraPanTiltAngular.Controllers
{
  public class Cell
  {
    public int X { get; set; }
    public int Y { get; set; }
  }
  [Route("api/[controller]")]
  public class CameraController : Controller
  {
    [HttpPost]
    public HttpResponseMessage Post([FromBody] Cell obj)
    {
      HttpResponseMessage result;
      try
      {
        using (var httpClient = new HttpClient())
        {
          httpClient.BaseAddress = new Uri("http://leewinter.ddns.net:1880/test");
          StringContent content = new System.Net.Http.StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
          result = httpClient.PostAsync("http://leewinter.ddns.net:1880/test", content).Result;
        }
      }
      catch (Exception ex)
      {
        result = new HttpResponseMessage(System.Net.HttpStatusCode.InternalServerError);
      }      

      return result;
    }
  }
}
