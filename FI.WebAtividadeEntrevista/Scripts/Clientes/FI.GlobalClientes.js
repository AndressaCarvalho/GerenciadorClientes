$(document).ready(function () {
    $("#btnIncluirBeneficiario").attr("disabled", true);

    $("#btnAlterarBeneficiario").css("display", "none");
    $("#btnCancelarAlterarBeneficiario").css("display", "none");
})


var listaBeneficiarios = [];


function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}


// Máscaras
function aplicarMascara(objeto, mascara) {
    obj = objeto
    masc = mascara
    setTimeout("aplicarMascaraExecutar()", 1)
}

function aplicarMascaraExecutar() {
    obj.value = masc(obj.value)
}

function mascaraCPF(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}


// Validar o CPF
function ValidaCPF(cpf) {
    var soma, resto;

    soma = 0;

    if ((cpf = cpf.replace(/[^\d]/g, "")).length != 11) return false;

    if (cpf == "00000000000") return false;

    for (i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;

    if (resto != parseInt(cpf.substring(10, 11))) return false;

    return true;
}


function checarCPFClienteValido(cpf) {
    if (ValidaCPF(cpf)) {
        $("#btnSalvarCliente").attr("disabled", false);
    } else {
        ModalDialog("Ocorreu um erro", "O CPF é inválido.");

        $("#btnSalvarCliente").attr("disabled", true);
    }
}


function checarCPFBeneficiarioValido(cpf) {
    if (ValidaCPF(cpf)) {
        $("#btnIncluirBeneficiario").attr("disabled", false);
    } else {
        ModalDialog("Ocorreu um erro", "O CPF é inválido.");

        $("#btnIncluirBeneficiario").attr("disabled", true);
    }
}
