const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const sNome = document.querySelector("#m-nome");
const sFuncao = document.querySelector("#m-funcao");
const sSalario = document.querySelector("#m-salario");
const btnSalvar = document.querySelector("#btnSalvar");

// ARMAZENA OS ITENS DO BANCO
let itens;

// ARMAZENA O INDEX, PARA FAZER A AÇÃO DE EDIÇÃO
let id;

// ESSAS FUNNÇÕES IRÃO PEGAR OS ITENS DO BANCO
// CASO NÃO TENHA NADA ELE VAI RETORNAR UM ARRAY VAZIO
const getItensBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];
const setItensBD = () => localStorage.setItem("dbfunc", JSON.stringify(itens));

// ESSA FUNÇÃO É EXECUTADA ASSIM QUE A TELA É CARREGADA
function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = "";
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

loadItens();

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.funcao}</td>
      <td>R$ ${item.salario}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `;
  tbody.appendChild(tr);
}

// FUNÇÃO DE EDIÇÃO
function editItem(index) {
  openModal(true, index);
}

// FUNÇÃO DE DELEÇÃO
function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

// FUNÇÃO QUE ABRE A NOSSA MODAL
function openModal(edit = false, index = 0) {
  modal.classList.add("active");

  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (edit) {
    sNome.value = itens[index].nome;
    sFuncao.value = itens[index].funcao;
    sSalario.value = itens[index].salario;
    id = index;
  } else {
    sNome.value = "";
    sFuncao.value = "";
    sSalario.value = "";
  }
}

btnSalvar.onclick = (e) => {
  // VÁLIDA SE TODOS OS CAMPOS ESTÃO PREENCHIDOS, SENÃO ELE NÃO SALVA
  if (sNome.value == "" || sFuncao.value == "" || sSalario.value == "") {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value;
    itens[id].funcao = sFuncao.value;
    itens[id].salario = sSalario.value;
  } else {
    itens.push({
      nome: sNome.value,
      funcao: sFuncao.value,
      salario: sSalario.value,
    });
  }

  setItensBD();

  modal.classList.remove("active");
  loadItens();
  id = undefined;
};
