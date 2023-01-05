using System.Collections.Generic;
using System.Data;
using System.Linq;
using FI.AtividadeEntrevista.DML;

namespace FI.AtividadeEntrevista.DAL
{
    /// <summary>
    /// Classe de acesso a dados de Cliente
    /// </summary>
    internal class DaoCliente : AcessoDados
    {
        /// <summary>
        /// Inclui um novo cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        internal long Incluir(DML.Cliente cliente)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();
            
            parametros.Add(new System.Data.SqlClient.SqlParameter("NOME", cliente.Nome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("SOBRENOME", cliente.Sobrenome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", cliente.CPF));
            parametros.Add(new System.Data.SqlClient.SqlParameter("NACIONALIDADE", cliente.Nacionalidade));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CEP", cliente.CEP));
            parametros.Add(new System.Data.SqlClient.SqlParameter("ESTADO", cliente.Estado));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CIDADE", cliente.Cidade));
            parametros.Add(new System.Data.SqlClient.SqlParameter("LOGRADOURO", cliente.Logradouro));
            parametros.Add(new System.Data.SqlClient.SqlParameter("EMAIL", cliente.Email));
            parametros.Add(new System.Data.SqlClient.SqlParameter("TELEFONE", cliente.Telefone));

            DataSet ds = base.Consultar("FI_SP_IncCliente", parametros);
            long ret = 0;
            if (ds.Tables[0].Rows.Count > 0)
                long.TryParse(ds.Tables[0].Rows[0][0].ToString(), out ret);
            return ret;
        }

        /// <summary>
        /// Consulta o cliente pelo ID
        /// </summary>
        /// <param name="id">ID do cliente</param>
        internal DML.Cliente Consultar(long id)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("ID", id));

            DataSet ds = base.Consultar("FI_SP_ConsCliente", parametros);
            List<DML.Cliente> cli = Converter(ds);

            return cli.FirstOrDefault();
        }

        /// <summary>
        /// Verifica a existência de um cliente com o CPF informado
        /// </summary>
        /// <param name="CPF">CPF do cliente</param>
        internal bool VerificarExistencia(string CPF)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", CPF));

            DataSet ds = base.Consultar("FI_SP_VerificaCliente", parametros);

            return ds.Tables[0].Rows.Count > 0;
        }

        /// <summary>
        /// Verifica a existência de um cliente com o ID e o CPF informados
        /// </summary>
        /// <param name="id">ID do cliente</param>
        /// <param name="CPF">CPF do cliente</param>
        internal bool VerificarExistencia(long id, string CPF)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("ID", id));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", CPF));

            DataSet ds = base.Consultar("FI_SP_VerificaClienteComID", parametros);

            return ds.Tables[0].Rows.Count > 0;
        }

        /// <summary>
        /// Lista todos os clientes utilizando filtros
        /// </summary>
        internal List<Cliente> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("iniciarEm", iniciarEm));
            parametros.Add(new System.Data.SqlClient.SqlParameter("quantidade", quantidade));
            parametros.Add(new System.Data.SqlClient.SqlParameter("campoOrdenacao", campoOrdenacao));
            parametros.Add(new System.Data.SqlClient.SqlParameter("crescente", crescente));

            DataSet ds = base.Consultar("FI_SP_PesqCliente", parametros);
            List<DML.Cliente> cli = Converter(ds);

            int iQtd = 0;

            if (ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
                int.TryParse(ds.Tables[1].Rows[0][0].ToString(), out iQtd);

            qtd = iQtd;

            return cli;
        }

        /// <summary>
        /// Lista todos os clientes
        /// </summary>
        internal List<DML.Cliente> Listar()
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("ID", 0));

            DataSet ds = base.Consultar("FI_SP_ConsCliente", parametros);
            List<DML.Cliente> cli = Converter(ds);

            return cli;
        }

        /// <summary>
        /// Altera um cliente
        /// </summary>
        /// <param name="cliente">Objeto de cliente</param>
        internal void Alterar(DML.Cliente cliente)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("NOME", cliente.Nome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("SOBRENOME", cliente.Sobrenome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", cliente.CPF));
            parametros.Add(new System.Data.SqlClient.SqlParameter("NACIONALIDADE", cliente.Nacionalidade));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CEP", cliente.CEP));
            parametros.Add(new System.Data.SqlClient.SqlParameter("ESTADO", cliente.Estado));
            parametros.Add(new System.Data.SqlClient.SqlParameter("CIDADE", cliente.Cidade));
            parametros.Add(new System.Data.SqlClient.SqlParameter("LOGRADOURO", cliente.Logradouro));
            parametros.Add(new System.Data.SqlClient.SqlParameter("EMAIL", cliente.Email));
            parametros.Add(new System.Data.SqlClient.SqlParameter("TELEFONE", cliente.Telefone));
            parametros.Add(new System.Data.SqlClient.SqlParameter("ID", cliente.Id));

            base.Executar("FI_SP_AltCliente", parametros);
        }


        /// <summary>
        /// Exclui o cliente pelo ID
        /// </summary>
        /// <param name="id">ID do cliente</param>
        internal void Excluir(long id)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("ID", id));

            base.Executar("FI_SP_DelCliente", parametros);
        }

        private List<DML.Cliente> Converter(DataSet ds)
        {
            List<DML.Cliente> lista = new List<DML.Cliente>();
            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    DML.Cliente cliente = new DML.Cliente();
                    cliente.Id = row.Field<long>("ID");
                    cliente.CEP = row.Field<string>("CEP");
                    cliente.Cidade = row.Field<string>("CIDADE");
                    cliente.Email = row.Field<string>("EMAIL");
                    cliente.Estado = row.Field<string>("ESTADO");
                    cliente.Logradouro = row.Field<string>("LOGRADOURO");
                    cliente.Nacionalidade = row.Field<string>("NACIONALIDADE");
                    cliente.Nome = row.Field<string>("NOME");
                    cliente.Sobrenome = row.Field<string>("SOBRENOME");
                    cliente.CPF = row.Field<string>("CPF");
                    cliente.Telefone = row.Field<string>("TELEFONE");
                    lista.Add(cliente);
                }
            }

            return lista;
        }
    }
}
