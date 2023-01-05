using System.ComponentModel.DataAnnotations;

namespace WebAtividadeEntrevista.Models
{
    /// <summary>
    /// Classe de modelo de beneficiário
    /// </summary>
    public class BeneficiarioModel
    {
        /// <summary>
        /// Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string Nome { get; set; }

        /// <summary>
        /// CPF
        /// </summary>
        [Required]
        public string CPF { get; set; }

        /// <summary>
        /// IdCliente
        /// </summary>
        public long IdCliente { get; set; }

        /// <summary>
        /// IsUpdated
        /// </summary>
        public bool IsUpdated { get; set; }

        /// <summary>
        /// IsDeleted
        /// </summary>
        public bool IsDeleted { get; set; }

    }    
}