document.addEventListener("DOMContentLoaded", function () {
  loadTechsList();
  document
    .getElementById("formAdicionarTech")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      adicionarTech();
    });
});
function adicionarTech() {
  const id = document.getElementById("id").value;
  const titulo = document.getElementById("tituloTech").value;
  const exemplo = document.getElementById("exemploTech").value;
  const autor = document.getElementById("autorTech").value;
  const descricao = document.getElementById("descricaoTech").value;
  if (!id || !titulo || !exemplo || !autor || !descricao) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  fetch("http://localhost:3000/techs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      titulo: titulo,
      exemplo: exemplo,
      autor: autor,
      descricao: descricao,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao adicionar tech");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      loadTechsList();
    })
    .catch((error) => {
      alert("ID Repetido, tente outro.");
    });
}
function loadTechsList() {
  fetch("http://localhost:3000/techs")
    .then((response) => response.json())
    .then((data) => displayTechsList(data))
    .catch((error) => console.error("Error:", error));
}
function displayTechsList(data) {
  const listaTechs = document.getElementById("listaTechs");
  listaTechs.innerHTML = "";
  data.forEach((tech) => {
    const listItem = document.createElement("div");
    listItem.classList = `tech`;
    listItem.innerHTML = `
          <img src="${tech.exemplo}" id="iconeTech">
          <h3 id="texto">${tech.titulo}
          <h4 id="texto2">${tech.descricao}
      `;
    listItem.addEventListener("click", function () {
      ver(tech.id);
    });
    listaTechs.appendChild(listItem);
  });
  function ver(id) {
    const tech = data.find((tech) => tech.id === id);
    if (tech) {
      const modalM = document.getElementById("dialogTech");
      modalM.showModal();
      const vish = document.getElementById("quadrado-preto");
      vish.innerHTML = `
          <h4 onclick="sairModal2()">Voltar</h4>
          <h2>Tech:</h2>
          <div id="dentro">
              <a href="https://www.youtube.com/results?search_query=celeste ${tech.titulo}"><img src="${tech.exemplo}" id="iconeTech"></a>
              <br>
              <h3>ID: ${id}</p>
              <p>Título: ${tech.titulo}</p>
              <p>Autor do exemplo: ${tech.autor}</p>
              <p>Descrição: ${tech.descricao}</p>
          </div>
          <div id="botoes">
              <button type="button" onClick="deletarTech(${tech.id})" class="botao">Deletar</button>
              <button type="button" onClick="alterarTechs(${tech.id}, '${tech.titulo}', '${tech.exemplo}', '${tech.autor}', '${tech.descricao}')" class="botao" id="botaoAlt">Alterar</button>
          </div>
          `;
    }
  }
}
function alterarTechs(id, titulo, exemplo, autor, descricao) {
  const modalA = document.getElementById("dialogAlt");
  modalA.showModal();
  document.getElementById("idAlt").value = id;
  document.getElementById("tituloTechAlt").value = titulo;
  document.getElementById("exemploTechAlt").value = exemplo;
  document.getElementById("autorTechAlt").value = autor;
  document.getElementById("descricaoTechAlt").value = descricao;
  document.getElementById("idAlt").readOnly = true;
}
function alterarTech() {
  const id = parseInt(document.getElementById("idAlt").value);
  const titulo = document.getElementById("tituloTechAlt").value;
  const exemplo = document.getElementById("exemploTechAlt").value;
  const autor = document.getElementById("autorTechAlt").value;
  const descricao = document.getElementById("descricaoTechAlt").value;
  fetch(`http://localhost:3000/techs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      titulo: titulo,
      exemplo: exemplo,
      autor: autor,
      descricao: descricao,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao adicionar tech");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      loadTechsList();
    })
    .catch((error) => {
      alert("Erro ao adicionar tech.");
    });
}
function deletarTech(id) {
  fetch(`http://localhost:3000/techs/${id}`, {
    method: "DELETE",
  });
}
function sairModal() {
  const modal = document.getElementById("dialogAdd");
  modal.close();
}
function sairModal2() {
  const modalM = document.getElementById("dialogTech");
  modalM.close();
}
function sairModal3() {
  const modalA = document.getElementById("dialogAlt");
  modalA.close();
}
function adicionarModal() {
  const modal = document.getElementById("dialogAdd");
  modal.showModal();
}