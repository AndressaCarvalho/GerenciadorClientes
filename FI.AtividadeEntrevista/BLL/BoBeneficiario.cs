using System.Collections.Generic;
namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo beneficiário
        /// </summary>
        /// <param name="benef">Objeto de beneficiário</param>
        public long Incluir(DML.Beneficiario benef)
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            return b.Incluir(benef);
        }

        /// <summary>
        /// Altera um beneficiário
        /// </summary>
        /// <param name="benef">Objeto de beneficiário</param>
        public void Alterar(DML.Beneficiario benef)
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            b.Alterar(benef);
        }

        /// <summary>
        /// Consulta o beneficiário pelo ID
        /// </summary>
        /// <param name="id">ID do beneficiário</param>
        public DML.Beneficiario Consultar(long id)
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            return b.Consultar(id);
        }

        /// <summary>
        /// Consulta os beneficiários pelo ID do cliente
        /// </summary>
        /// <param name="idCliente">ID do cliente relacionado aos beneficiários</param>
        public List<DML.Beneficiario> ConsultarPorIdCliente(long idCliente)
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            return b.ConsultarPorIdCliente(idCliente);
        }

        /// <summary>
        /// Excluir o beneficiário pelo ID
        /// </summary>
        /// <param name="id">ID do beneficiário</param>
        public void Excluir(long id)
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            b.Excluir(id);
        }

        /// <summary>
        /// Lista todos os beneficiários
        /// </summary>
        public List<DML.Beneficiario> Listar()
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            return b.Listar();
        }

        /// <summary>
        /// Lista todos os beneficiários utilizando filtros
        /// </summary>
        public List<DML.Beneficiario> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd)
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            return b.Pesquisa(iniciarEm,  quantidade, campoOrdenacao, crescente, out qtd);
        }

        /// <summary>
        /// Verifica a existência de um beneficiário com o CPF informado
        /// </summary>
        /// <param name="CPF">CPF do beneficiário</param>
        public bool VerificarExistencia(string CPF)
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            return b.VerificarExistencia(CPF);
        }

        /// <summary>
        /// Verifica a existência de um beneficiário com o ID e o CPF informados
        /// </summary>
        /// <param name="id">ID do beneficiário</param>
        /// <param name="CPF">CPF do beneficiário</param>
        public bool VerificarExistencia(long id, string CPF)
        {
            DAL.DaoBeneficiario b = new DAL.DaoBeneficiario();
            return b.VerificarExistencia(id, CPF);
        }
    }
}
