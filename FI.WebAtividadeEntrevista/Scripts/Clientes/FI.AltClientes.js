$(document).ready(function () {
    if (obj) {
        $('#formSalvarCliente #Nome').val(obj.Nome);
        $('#formSalvarCliente #CEP').val(obj.CEP);
        $('#formSalvarCliente #Email').val(obj.Email);
        $('#formSalvarCliente #Sobrenome').val(obj.Sobrenome);
        $('#formSalvarCliente #CPF').val(obj.CPF);
        $('#formSalvarCliente #Nacionalidade').val(obj.Nacionalidade);
        $('#formSalvarCliente #Estado').val(obj.Estado);
        $('#formSalvarCliente #Cidade').val(obj.Cidade);
        $('#formSalvarCliente #Logradouro').val(obj.Logradouro);
        $('#formSalvarCliente #Telefone').val(obj.Telefone);

        criarGridBeneficiarios();

        if (obj.Beneficiarios.length > 0) {
            adicionarGridBeneficiarios(obj.Beneficiarios);
        }
    }

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
    var th4 = document.createElement("th");
    var th5 = document.createElement("th");
    var th6 = document.createElement("th");

    th1.style.display = "none";
    th2.innerText = "CPF";
    th3.innerText = "Nome";
    th4.style.display = "none";
    th5.style.display = "none";

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);

    thead.appendChild(tr);
}


function adicionarGridBeneficiarios(objBeneficiarios) {
    var table = document.getElementById("bodyTabelaBeneficiarios");

    for (var i = 0; i < objBeneficiarios.length; i++) {
        var row = table.insertRow(0);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = objBeneficiarios[i].Id;
        cell1.style.display = "none";
        cell2.innerHTML = objBeneficiarios[i].CPF;
        cell3.innerHTML = objBeneficiarios[i].Nome;
        cell4.innerHTML = "";
        cell4.style.display = "none";
        cell5.innerHTML = "";
        cell5.style.display = "none";

        var btnAlterar = document.createElement("button");
        btnAlterar.innerHTML = "Alterar";
        btnAlterar.className = "btn btn-sm btn-primary";
        btnAlterar.style.margin = "0px 10px 0px 0px";
        cell6.appendChild(btnAlterar);
        btnAlterar.onclick = function () {
            var rowIndex = $(this).parent("td").parent("tr").index() + 1;
            var rowAtual = document.getElementsByTagName("tr")[rowIndex];

            $("#idBeneficiarioAAlterar").val(rowAtual.cells[0].innerText);
            $("#CPFBeneficiario").val(rowAtual.cells[1].innerText);
            $("#NomeBeneficiario").val(rowAtual.cells[2].innerText);

            $("#divCPFBeneficiario").removeClass("col-md-5");
            $("#divNomeBeneficiario").removeClass("col-md-5");
            $("#divBtnBeneficiario").removeClass("col-md-2");
            $("#divCPFBeneficiario").addClass("col-md-4");
            $("#divNomeBeneficiario").addClass("col-md-4");
            $("#divBtnBeneficiario").addClass("col-md-4");

            $("#btnIncluirBeneficiario").css("display", "none");
            $("#btnAlterarBeneficiario").css("display", "block");
            $("#btnCancelarAlterarBeneficiario").css("display", "block");

            $("#rowBeneficiarioAAlterar").val(rowIndex);

            return false;
        };


        var btnExcluir = document.createElement("button");
        btnExcluir.innerHTML = "Excluir";
        btnExcluir.className = "btn btn-sm btn-primary";
        cell6.appendChild(btnExcluir);
        btnExcluir.onclick = function () {
            var rowIndex = $(this).parent("td").parent("tr").index() + 1;
            deletarLinhaBeneficiario(rowIndex);

            return false;
        };
    }
}


function incluirBeneficiario() {
    $("#btnIncluirBeneficiario").attr("disabled", true);

    var tableBody = document.getElementById("bodyTabelaBeneficiarios");

    var row = tableBody.insertRow(0);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    cell1.innerHTML = "";
    cell1.style.display = "none";
    cell2.innerHTML = $("#CPFBeneficiario").val();
    cell3.innerHTML = $("#NomeBeneficiario").val();
    cell4.innerHTML = "";
    cell4.style.display = "none";
    cell5.innerHTML = "";
    cell5.style.display = "none";

    $("#CPFBeneficiario").val("");
    $("#NomeBeneficiario").val("");

    var btnAlterar = document.createElement("button");
    btnAlterar.innerHTML = "Alterar";
    btnAlterar.className = "btn btn-sm btn-primary";
    btnAlterar.style.margin = "0px 10px 0px 0px";
    cell6.appendChild(btnAlterar);
    btnAlterar.onclick = function () {
        var rowIndex = $(this).parent("td").parent("tr").index() + 1;
        var rowAtual = document.getElementsByTagName("tr")[rowIndex];

        $("#idBeneficiarioAAlterar").val(rowAtual.cells[0].innerText);
        $("#CPFBeneficiario").val(rowAtual.cells[1].innerText);
        $("#NomeBeneficiario").val(rowAtual.cells[2].innerText);

        $("#divCPFBeneficiario").removeClass("col-md-5");
        $("#divNomeBeneficiario").removeClass("col-md-5");
        $("#divBtnBeneficiario").removeClass("col-md-2");
        $("#divCPFBeneficiario").addClass("col-md-4");
        $("#divNomeBeneficiario").addClass("col-md-4");
        $("#divBtnBeneficiario").addClass("col-md-4");

        $("#btnIncluirBeneficiario").css("display", "none");
        $("#btnAlterarBeneficiario").css("display", "block");
        $("#btnCancelarAlterarBeneficiario").css("display", "block");

        $("#rowBeneficiarioAAlterar").val(rowIndex);

        return false;
    };


    var btnExcluir = document.createElement("button");
    btnExcluir.innerHTML = "Excluir";
    btnExcluir.className = "btn btn-sm btn-primary";
    cell6.appendChild(btnExcluir);
    btnExcluir.onclick = function () {
        var rowIndex = $(this).parent("td").parent("tr").index() + 1;
        deletarLinhaBeneficiario(rowIndex);

        return false;
    };
}


function deletarLinhaBeneficiario(rowIndex) {
    var row = document.getElementsByTagName("tr")[rowIndex];

    if (row.cells[0].innerHTML == "") {
        document.getElementById('bodyTabelaBeneficiarios').deleteRow(rowIndex);
    } else {
        row.cells[4].innerHTML = "isDeleted";
        row.cells[4].style.display = "none";
        row.style.display = "none";
    }
}


function alterarBeneficiario() {
    var rowIndex = $("#rowBeneficiarioAAlterar").val();

    var row = document.getElementsByTagName("tr")[rowIndex];

    row.cells[0].innerHTML = $("#idBeneficiarioAAlterar").val();
    row.cells[1].innerHTML = $("#CPFBeneficiario").val();
    row.cells[2].innerHTML = $("#NomeBeneficiario").val();
    row.cells[3].innerHTML = "isUpdated";
    row.cells[3].style.display = "none";

    $("#idBeneficiarioAAlterar").val("");
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
    $("#idBeneficiarioAAlterar").val("");
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
        var id = row.cells[0].innerText != "" ? row.cells[0].innerText : 0;
        var cpf = row.cells[1].innerText;
        var nome = row.cells[2].innerText;
        var isUpdated = row.cells[3].innerText == "isUpdated";
        var isDeleted = row.cells[4].innerText == "isDeleted";

        listaBeneficiarios.push({
            Id: id,
            Nome: nome,
            CPF: cpf,
            IsUpdated: isUpdated,
            IsDeleted: isDeleted
        });
    }
}
