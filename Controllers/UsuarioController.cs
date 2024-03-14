using ControleDeContatosAngularCSharp.Helper;
using ControleDeContatosAngularCSharp.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;

namespace ControleDeContatosAngularCSharp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        string urlBase = "http://localhost:7126/api/";

        [HttpGet]
        [Route("BuscarTodos")]
        public IActionResult BuscarTodos()
        {
            try
            {
                RestClient client = new RestClient(urlBase);
                RestRequest request = new RestRequest($"Usuario");
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
                RestRequest request = new RestRequest($"Usuario/{id}");
                IRestResponse response = client.Get(request);

                return Ok(response.Content);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet]
        [Route("BuscarPorEmailELogin/{email}&{login}")]
        public IActionResult BuscarPorEmailELogin(string email, string login)
        {
            try
            {
                RestClient client = new RestClient(urlBase);
                RestRequest request = new RestRequest($"Usuario/BuscarPorEmailELogin/{email}&{login}");
                IRestResponse response = client.Get(request);

                return Ok(response.Content);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [HttpPost]
        public IActionResult Adicionar(UsuarioModel usuario)
        {
            try
            {
                usuario.Senha = usuario.Senha.GerarHash();
                usuario.DataCadastro = DateTime.Now;
                RestClient client = new RestClient(urlBase);
                RestRequest request = new RestRequest($"Usuario");
                var usuarioJson = JsonConvert.SerializeObject(usuario);
                request.AddParameter("application/json; charset=utf-8", usuarioJson, ParameterType.RequestBody);
                IRestResponse response = client.Post(request);

                return Ok(response.Content);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Atualizar(UsuarioSemSenhaModel usuario)
        {
            try
            {
                RestClient client = new RestClient(urlBase);
                RestRequest request = new RestRequest($"Usuario");
                var usuarioJson = JsonConvert.SerializeObject(usuario);
                request.AddParameter("application/json; charset=utf-8", usuarioJson, ParameterType.RequestBody);
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
                RestRequest request = new RestRequest($"Usuario/{id}");
                IRestResponse response = client.Delete(request);

                return Ok(response.Content);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPut]
        [Route("AlterarSenhaUsuario")]
        public IActionResult AlterarSenha(AlterarSenhaModel alterarSenha)
        {
            try
            {
                alterarSenha.SenhaAtual = alterarSenha.SenhaAtual.GerarHash();
                alterarSenha.NovaSenha = alterarSenha.NovaSenha.GerarHash();
                alterarSenha.ConfirmarNovaSenha = alterarSenha.ConfirmarNovaSenha.GerarHash();
                RestClient client = new RestClient(urlBase);
                RestRequest request = new RestRequest($"Usuario/AlterarSenhaUsuario");
                var alterarSenhaJson = JsonConvert.SerializeObject(alterarSenha);
                request.AddParameter("application/json; charset=utf-8", alterarSenhaJson, ParameterType.RequestBody);
                IRestResponse response = client.Put(request);

                return Ok(response.Content);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}