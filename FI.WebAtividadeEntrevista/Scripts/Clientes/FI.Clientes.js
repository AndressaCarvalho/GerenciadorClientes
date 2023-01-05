$(document).ready(function () {
    $("#btnSalvarCliente").attr("disabled", true);

    criarGridBeneficiarios();

    $('#formSalvarCliente').submit(function (e) {
        e.preventDefault();

        popularListaBeneficiarios();

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "Nome": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "CPF": $(this).find("#CPF").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "Beneficiarios": listaBeneficiarios
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro!", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro!", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("", r)
                    $("#formSalvarCliente")[0].reset();
                }
        });
    })
})


// Beneficiários
function criarGridBeneficiarios() {
    var thead = document.getElementById("headTabelaBeneficiarios");

    var tr = document.createElement("tr");

    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");

    th1.innerText = "CPF";
    th2.innerText = "Nome";

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);

    thead.appendChild(tr);
}


function incluirBeneficiario() {
    $("#btnIncluirBeneficiario").attr("disabled", true);

    var tableBody = document.getElementById("bodyTabelaBeneficiarios");

    var row = tableBody.insertRow(0);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = $("#CPFBeneficiario").val();
    cell2.innerHTML = $("#NomeBeneficiario").val();

    $("#CPFBeneficiario").val("");
    $("#NomeBeneficiario").val("");

    var btnAlterar = document.createElement("button");
    btnAlterar.innerHTML = "Alterar";
    btnAlterar.className = "btn btn-sm btn-primary";
    btnAlterar.style.margin = "0px 10px 0px 0px";
    cell3.appendChild(btnAlterar);
    btnAlterar.onclick = function () {
        $("#CPFBeneficiario").val(cell1.innerText);
        $("#NomeBeneficiario").val(cell2.innerText);

        $("#divCPFBeneficiario").removeClass("col-md-5");
        $("#divNomeBeneficiario").removeClass("col-md-5");
        $("#divBtnBeneficiario").removeClass("col-md-2");
        $("#divCPFBeneficiario").addClass("col-md-4");
        $("#divNomeBeneficiario").addClass("col-md-4");
        $("#divBtnBeneficiario").addClass("col-md-4");

        $("#btnIncluirBeneficiario").css("display", "none");
        $("#btnAlterarBeneficiario").css("display", "block");
        $("#btnCancelarAlterarBeneficiario").css("display", "block");

        $("#rowBeneficiarioAAlterar").val(row.rowIndex);

        return false;
    };

    var btnExcluir = document.createElement("button");
    btnExcluir.innerHTML = "Excluir";
    btnExcluir.className = "btn btn-sm btn-primary";
    cell3.appendChild(btnExcluir);
    btnExcluir.onclick = function () {
        document.getElementById('bodyTabelaBeneficiarios').deleteRow(row.rowIndex - 1);

        return false;
    };
}


function alterarBeneficiario() {
    var rowIndex = $("#rowBeneficiarioAAlterar").val();

    var row = document.getElementsByTagName("tr")[rowIndex];

    row.cells[0].innerHTML = $("#CPFBeneficiario").val();
    row.cells[1].innerHTML = $("#NomeBeneficiario").val();

    $("#CPFBeneficiario").val("");
    $("#NomeBeneficiario").val("");
    $("#rowBeneficiarioAAlterar").val("");

    $("#divCPFBeneficiario").addClass("col-md-5");
    $("#divNomeBeneficiario").addClass("col-md-5");
    $("#divBtnBeneficiario").addClass("col-md-2");
    $("#divCPFBeneficiario").removeClass("col-md-4");
    $("#divNomeBeneficiario").removeClass("col-md-4");
    $("#divBtnBeneficiario").removeClass("col-md-4");

    $("#btnIncluirBeneficiario").css("display", "block");
    $("#btnAlterarBeneficiario").css("display", "none");
    $("#btnCancelarAlterarBeneficiario").css("display", "none");
}


function cancelarAlterarBeneficiario() {
    $("#CPFBeneficiario").val("");
    $("#NomeBeneficiario").val("");
    $("#rowBeneficiarioAAlterar").val("");

    $("#divCPFBeneficiario").addClass("col-md-5");
    $("#divNomeBeneficiario").addClass("col-md-5");
    $("#divBtnBeneficiario").addClass("col-md-2");
    $("#divCPFBeneficiario").removeClass("col-md-4");
    $("#divNomeBeneficiario").removeClass("col-md-4");
    $("#divBtnBeneficiario").removeClass("col-md-4");

    $("#btnIncluirBeneficiario").css("display", "block");
    $("#btnAlterarBeneficiario").css("display", "none");
    $("#btnCancelarAlterarBeneficiario").css("display", "none");
}


function popularListaBeneficiarios() {
    var table = document.getElementById("tabelaBeneficiarios");

    for (var i = 1, row; row = table.rows[i]; i++) {
        var cpf = row.cells[0].innerText;
        var nome = row.cells[1].innerText;

        listaBeneficiarios.push({
            Id: 0,
            Nome: nome,
            CPF: cpf
        });
    }
}
