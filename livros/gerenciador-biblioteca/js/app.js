const form = document.getElementById('formLivro');
let livros = JSON.parse(localStorage.getItem('livros')) || [];

// Adiciona evento de submit ao formulário
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const novoLivro = getFormValues();
    
    if (form.dataset.editIndex) {
        livros[form.dataset.editIndex] = novoLivro;
        delete form.dataset.editIndex;
        showMessage("Livro atualizado com sucesso!");
    } else {
        livros.push(novoLivro);
        showMessage("Livro cadastrado com sucesso!");
    }
    
    updateLocalStorage();
    form.reset();
    listarLivros();
});

// Valida se todos os campos obrigatórios estão preenchidos
function validateForm() {
    return Array.from(form.elements).every(input => input.required ? input.value.trim() !== '' : true);
}

// Captura os valores do formulário
function getFormValues() {
    return {
        titulo: form[0].value,
        autor: form[1].value,
        isbn: form[2].value,
        genero: form[3].value,
        ano: form[4].value,
        editora: form[5].value,
        paginas: form[6].value,
        sinopse: form[7].value,
        preco: form[8].value,
        capa: form[9].value
    };
}

// Atualiza o localStorage
function updateLocalStorage() {
    localStorage.setItem('livros', JSON.stringify(livros));
}

// Função para listar livros
function listarLivros() {
    const lista = document.getElementById('listaLivros');
    lista.innerHTML = '';
    
    livros.forEach((livro, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h2>${livro.titulo}</h2>
            <img src="${livro.capa}" alt="${livro.titulo}">
            <button onclick="editarLivro(${index})">Editar</button>
            <button onclick="excluirLivro(${index})">Excluir</button>
        `;
        lista.appendChild(div);
    });
}

// Função para excluir livro
function excluirLivro(index) {
    livros.splice(index, 1);
    updateLocalStorage();
    listarLivros();
}

// Função para editar livro
function editarLivro(index) {
    const livro = livros[index];
    form[0].value = livro.titulo;
    form[1].value = livro.autor;
    form[2].value = livro.isbn;
    form[3].value = livro.genero;
    form[4].value = livro.ano;
    form[5].value = livro.editora;
    form[6].value = livro.paginas;
    form[7].value = livro.sinopse;
    form[8].value = livro.preco;
    form[9].value = livro.capa;

    form.dataset.editIndex = index;
}

// Função para mostrar mensagens
function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.className = 'message';
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000); // Remove a mensagem após 3 segundos
}

// Inicializa a listagem ao carregar a página
window.onload = listarLivros;
