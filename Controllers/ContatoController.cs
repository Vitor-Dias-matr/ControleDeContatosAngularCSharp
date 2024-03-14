using ControleDeContatosAngularCSharp.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;

namespace ControleDeContatosAngularCSharp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContatoController : ControllerBase
    {
        string urlBase = "http://localhost:7126/api/";

        [HttpGet]
        [Route("BuscarTodos")]
        public IActionResult BuscarTodos()
        {
            try
            {
                RestClient client = new RestClient(urlBase);
                RestRequest request = new RestRequest($"Contato");
                IRestResponse response = client.Get(request);

                return Ok(response.Content);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet]
        [Route("BuscarTodosPorUsuario/{usuarioId}")]
        public IActionResult BuscarTodosPorUsuario(int usuarioId)
        {
            try
            {
                RestClient client = new RestClient(urlBase);
                RestRequest request = new RestRequest($"Contato/BuscarContatosDeUsuario/{usuarioId}");
                IRestResponse response = client.Get(request);

                return Ok(response.Content);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet]
        [Route("BuscarPorId/{id}")]
        public IActionResult BuscarPorId(int id)
        {
            try
            {
                RestClient client = new RestClient(urlBase);
                RestRequest request = new RestRequest($"Contato/{id}");
                IRestResponse response = client.Get(request);

                return Ok(response.Content);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Adicionar(ContatoModel contato)
        {
            try
            {
                RestClient client = new RestClient(urlBase);
                RestRequest request = new RestRequest($"Contato");
                var contatoJson = JsonConvert.SerializeObject(contato);
                request.AddParameter("application/json; charset=utf-8", contatoJson, ParameterType.RequestBody);
                IRestResponse response = client.Post(request);

                return Ok(response.Content);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Atualizar(ContatoModel contato)
        {
            try
            {
                RestClient client = new RestClient(urlBase);
                RestRequest request = new RestRequest($"Contato");
                var contatoJson = JsonConvert.SerializeObject(contato);
                request.AddParameter("application/json; charset=utf-8", contatoJson, ParameterType.RequestBody);
                IRestResponse response = client.Put(request);

                return Ok(response.Content);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete]
        [Route("Apagar/{id}")]
        public IActionResult Apagar(int id)
        {
            try
            {
                RestClient client = new RestClient(urlBase);
                RestRequest request = new RestRequest($"Contato/{id}");
                IRestResponse response = client.Delete(request);

                return Ok(response.Content);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
