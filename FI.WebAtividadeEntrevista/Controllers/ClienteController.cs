using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;

namespace WebAtividadeEntrevista.Controllers
{
    public class ClienteController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Incluir()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Incluir(ClienteModel model)
        {
            BoCliente bo = new BoCliente();
            
            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (!bo.VerificarExistencia(model.CPF))
                {
                    model.Id = bo.Incluir(new Cliente()
                    {
                        CEP = model.CEP,
                        Cidade = model.Cidade,
                        Email = model.Email,
                        Estado = model.Estado,
                        Logradouro = model.Logradouro,
                        Nacionalidade = model.Nacionalidade,
                        Nome = model.Nome,
                        Sobrenome = model.Sobrenome,
                        CPF = model.CPF,
                        Telefone = model.Telefone
                    });

                    if (model.Beneficiarios.Count > 0)
                    {
                        List<string> errosBeneficiarios = IncluirBeneficiarios(model.Id, model.Beneficiarios);

                        if (errosBeneficiarios.Count > 0)
                        {
                            return Json(errosBeneficiarios);
                        }
                        else
                        {
                            return Json("O cliente foi cadastrado com sucesso.");
                        }
                    } 
                    else
                    {
                        return Json("O cliente foi cadastrado com sucesso.");
                    }
                } else
                {
                    return Json("Ocorreu um erro! O CPF " + model.CPF + " já pertence a um cliente.");
                }
            }
        }

        [HttpPost]
        public JsonResult Alterar(ClienteModel model)
        {
            BoCliente bo = new BoCliente();
       
            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (!bo.VerificarExistencia(model.Id, model.CPF))
                {
                    bo.Alterar(new Cliente()
                    {
                        Id = model.Id,
                        CEP = model.CEP,
                        Cidade = model.Cidade,
                        Email = model.Email,
                        Estado = model.Estado,
                        Logradouro = model.Logradouro,
                        Nacionalidade = model.Nacionalidade,
                        Nome = model.Nome,
                        Sobrenome = model.Sobrenome,
                        CPF = model.CPF,
                        Telefone = model.Telefone
                    });

                    if (model.Beneficiarios.Count > 0)
                    {
                        List<string> errosBeneficiarios = IncluirBeneficiarios(model.Id, model.Beneficiarios);

                        if (errosBeneficiarios.Count > 0)
                        {
                            return Json(errosBeneficiarios);
                        }
                        else
                        {
                            return Json("O cliente foi alterado com sucesso.");
                        }
                    }
                    else
                    {
                        return Json("O cliente foi alterado com sucesso.");
                    }

                }
                else
                {
                    return Json("Ocorreu um erro! O CPF " + model.CPF + " já pertence a um cliente.");
                }
            }
        }

        private List<string> IncluirBeneficiarios(long idCliente, List<BeneficiarioModel> beneficiarios)
        {
            List<string> erros = new List<string>();

            BoBeneficiario bo = new BoBeneficiario();

            foreach (var beneficiario in beneficiarios)
            {
                if (beneficiario.Id == 0)
                {
                    if (!bo.VerificarExistencia(beneficiario.CPF))
                    {
                        bo.Incluir(new Beneficiario()
                        {
                            Nome = beneficiario.Nome,
                            CPF = beneficiario.CPF,
                            IdCliente = idCliente
                        });
                    }
                    else
                    {
                        erros.Add("Erro! O CPF " + beneficiario.CPF + " já pertence a um beneficiário.");
                    }
                }
                else
                {
                    if (beneficiario.IsDeleted)
                    {
                        bo.Excluir(beneficiario.Id);
                    }
                    else
                    {
                        if (beneficiario.IsUpdated)
                        {
                            if (!bo.VerificarExistencia(beneficiario.Id, beneficiario.CPF))
                            {
                                bo.Alterar(new Beneficiario()
                                {
                                    Id = beneficiario.Id,
                                    Nome = beneficiario.Nome,
                                    CPF = beneficiario.CPF
                                });
                            }
                            else
                            {
                                erros.Add("Erro! O CPF " + beneficiario.CPF + " já pertence a um beneficiário.");
                            }
                        }
                    }
                }
            }

            return erros;
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoCliente bo = new BoCliente();
            Cliente cliente = bo.Consultar(id);

            BoBeneficiario boBenef = new BoBeneficiario();
            List<Beneficiario> beneficiarios = boBenef.ConsultarPorIdCliente(id);

            Models.ClienteModel model = null;

            if (cliente != null)
            {
                model = new ClienteModel()
                {
                    Id = cliente.Id,
                    CEP = cliente.CEP,
                    Cidade = cliente.Cidade,
                    Email = cliente.Email,
                    Estado = cliente.Estado,
                    Logradouro = cliente.Logradouro,
                    Nacionalidade = cliente.Nacionalidade,
                    Nome = cliente.Nome,
                    Sobrenome = cliente.Sobrenome,
                    CPF = cliente.CPF,
                    Telefone = cliente.Telefone,
                    Beneficiarios = new List<BeneficiarioModel>()
                };

                if (beneficiarios != null)
                {
                    foreach (var beneficiario in beneficiarios)
                    {
                        model.Beneficiarios.Add(
                            new BeneficiarioModel()
                            {
                                Id = beneficiario.Id,
                                Nome = beneficiario.Nome,
                                CPF = beneficiario.CPF,
                                IdCliente = beneficiario.IdCliente
                            });
                    }
                }
            }

            return View(model);
        }

        [HttpPost]
        public JsonResult ClienteList(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Cliente> clientes = new BoCliente().Pesquisa(jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd);

                return Json(new { Result = "OK", Records = clientes, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}