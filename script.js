/* ==========================================================================
    BASE DE DADOS DOS LIVROS 
   ========================================================================== */
const livros = [
  {
    id: 1,
    titulo: "Amor em Paris",
    autor: "Ana Silva",
    categoria: "Romance",
    preco: 49.9,
    avaliacao: 5,
    paginas: 320,
    editora: "Editora Amor",
    ano: 2023,
    sinopse:
      "Uma emocionante história de paixão e encontros inesperados nas ruas de Paris.",
    imagem: "imagens/amor_em_paris.jpg",
  },
  {
    id: 2,
    titulo: "Corações Conectados",
    autor: "Carlos Souza",
    categoria: "Romance",
    preco: 39.9,
    avaliacao: 4,
    paginas: 280,
    editora: "Luz Literária",
    ano: 2021,
    sinopse: "Dois desconhecidos se conectam através de cartas misteriosas.",
    imagem: "imagens/coracoes_conectados.jpg",
  },
  {
    id: 3,
    titulo: "Promessa Eternizada",
    autor: "Mariana Costa",
    categoria: "Romance",
    preco: 45.0,
    avaliacao: 4,
    paginas: 350,
    editora: "Editora Amor",
    ano: 2022,
    sinopse: "Um pacto de infância que resiste ao tempo e às distâncias.",
    imagem: "imagens/promessa_eternizada.jpg",
  },
  {
    id: 4,
    titulo: "O Reino Sombrio",
    autor: "J. R. Mello",
    categoria: "Fantasia",
    preco: 59.9,
    avaliacao: 5,
    paginas: 512,
    editora: "Mundo Mágico",
    ano: 2024,
    sinopse:
      "Uma jornada épica para derrotar as forças das sombras em Eldoria.",
    imagem: "imagens/reino_sombrio.jpg",
  },
  {
    id: 5,
    titulo: "A Espada de Cristal",
    autor: "Beatriz Lima",
    categoria: "Fantasia",
    preco: 65.0,
    avaliacao: 5,
    paginas: 430,
    editora: "Mundo Mágico",
    ano: 2023,
    sinopse:
      "Apenas o escolhido poderá empunhar a relíquia capaz de salvar a humanidade.",
    imagem: "imagens/espada_cristal.jpg",
  },
  {
    id: 6,
    titulo: "Crônicas de Eldoria",
    autor: "Lucas Mendes",
    categoria: "Fantasia",
    preco: 52.5,
    avaliacao: 4,
    paginas: 390,
    editora: "Fantasia Books",
    ano: 2020,
    sinopse: "Segredos ancestralmente guardados retornam para ameaçar a paz.",
    imagem: "imagens/cronicas_eldoria.jpg",
  },
  {
    id: 7,
    titulo: "JavaScript Definitivo",
    autor: "David Flanagan",
    categoria: "Técnicos",
    preco: 120.0,
    avaliacao: 5,
    paginas: 700,
    editora: "Tech Press",
    ano: 2021,
    sinopse:
      "O guia completo para dominar a linguagem de programação mais popular da web.",
    imagem: "imagens/javascript_definitivo.jpg",
  },
  {
    id: 8,
    titulo: "Engenharia de Software",
    autor: "Ian Sommerville",
    categoria: "Técnicos",
    preco: 140.0,
    avaliacao: 5,
    paginas: 850,
    editora: "Pearson",
    ano: 2019,
    sinopse:
      "Conceitos fundamentais de arquitetura, padrões e desenvolvimento de software.",
    imagem: "imagens/engenharia_software.jpg",
  },
  {
    id: 9,
    titulo: "Estruturas de Dados",
    autor: "Paulo Feofiloff",
    categoria: "Técnicos",
    preco: 95.0,
    avaliacao: 4,
    paginas: 410,
    editora: "Campus",
    ano: 2022,
    sinopse:
      "Aprenda algoritmos essenciais e otimização de código de forma clara.",
    imagem: "imagens/estrutura_dados.jpg",
  },
  {
    id: 10,
    titulo: "O Pequeno Astronauta",
    autor: "Carla Dias",
    categoria: "Infantil",
    preco: 29.9,
    avaliacao: 5,
    paginas: 48,
    editora: "Kids Edições",
    ano: 2023,
    sinopse:
      "Uma aventura espacial cheia de ilustrações coloridas para os pequenos leitores.",
    imagem: "imagens/pequeno_astronauta.jpg",
  },
  {
    id: 11,
    titulo: "Aventuras na Floresta",
    autor: "Roberto Alves",
    categoria: "Infantil",
    preco: 34.9,
    avaliacao: 4,
    paginas: 60,
    editora: "Kids Edições",
    ano: 2022,
    sinopse:
      "Animais falantes ensinam valiosas lições de amizade e preservação.",
    imagem: "imagens/aventuras_floresta.jpg",
  },
  {
    id: 12,
    titulo: "Contos de Fadas Modernos",
    autor: "Fernanda Rocha",
    categoria: "Infantil",
    preco: 32.0,
    avaliacao: 4,
    paginas: 80,
    editora: "Brinque Book",
    ano: 2021,
    sinopse:
      "Releituras divertidas e inclusivas das histórias clássicas de encantar.",
    imagem: "imagens/conto_fadas.jpg",
  },
];

/* ==========================================================================
    ESTADO DO CARRINHO (PERSISTÊNCIA VIA LOCALSTORAGE)
   ========================================================================== */
let carrinho = JSON.parse(localStorage.getItem("carrinho_livros")) || [];
let categoriaAtual = "todos";
let termoBusca = "";

function salvarCarrinho() {
  localStorage.setItem("carrinho_livros", JSON.stringify(carrinho));
}

/* ==========================================================================
   RENDERIZAÇÃO DA HOME E CATÁLOGO DINÂMICO
   ========================================================================== */
function renderizarVitrine() {
  const container = document.getElementById("vitrineDestaques");
  if (!container) return;

  const destaques = livros.slice(0, 4);
  container.innerHTML = destaques.map((l) => criarCardHTML(l)).join("");
}

function renderizarCatalogo() {
  const container = document.getElementById("listaProdutos");
  if (!container) return;

  const livrosFiltrados = livros.filter((livro) => {
    const matchCat =
      categoriaAtual === "todos" || livro.categoria === categoriaAtual;
    const matchBusca =
      livro.titulo.toLowerCase().includes(termoBusca) ||
      livro.autor.toLowerCase().includes(termoBusca);
    return matchCat && matchBusca;
  });

  if (livrosFiltrados.length === 0) {
    container.innerHTML = "<p>Nenhum livro encontrado.</p>";
    return;
  }

  container.innerHTML = livrosFiltrados.map((l) => criarCardHTML(l)).join("");
}

function criarCardHTML(l) {
  return `
    <div class="prod-item">
      <img src="${l.imagem}" alt="Capa do livro ${l.titulo}" onclick="abrirModal(${l.id})">
      <h4>${l.titulo}</h4>
      <p>Autor: ${l.autor}</p>
      <p><strong>R$ ${l.preco.toFixed(2)}</strong></p>
      <button onclick="abrirModal(${l.id})" class="btn-secundario">Ver Detalhes</button>
      <button onclick="adicionarAoCarrinho(${l.id})">Adicionar ao carrinho</button>
    </div>
  `;
}

/* ==========================================================================
    DETALHES DO LIVRO 
   ========================================================================== */
function abrirModal(id) {
  const livro = livros.find((l) => l.id === id);
  const modal = document.getElementById("modalDetalhes");
  const conteudo = document.getElementById("conteudoModal");
  if (!livro || !modal) return;

  const estrelasHTML =
    "★".repeat(livro.avaliacao) + "☆".repeat(5 - livro.avaliacao);

  conteudo.innerHTML = `
    <div class="detalhes-grid">
      <img src="${livro.imagem}" alt="Capa de ${livro.titulo}">
      <div>
        <h3>${livro.titulo}</h3>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Categoria:</strong> ${livro.categoria}</p>
        <p><strong>Editora:</strong> ${livro.editora} (${livro.ano})</p>
        <p><strong>Páginas:</strong> ${livro.paginas}</p>
        <div class="estrelas">Avaliação: ${estrelasHTML} (${livro.avaliacao}/5)</div>
        <p class="sinopse"><em>"${livro.sinopse}"</em></p>
        <p><strong>Preço: R$ ${livro.preco.toFixed(2)}</strong></p>
        <br>
        <button onclick="adicionarAoCarrinho(${livro.id}); fecharModal();">Adicionar ao Carrinho</button>
      </div>
    </div>
  `;
  modal.classList.remove("hidden");
}

function fecharModal() {
  const modal = document.getElementById("modalDetalhes");
  if (modal) modal.classList.add("hidden");
}

/* ==========================================================================
    CARRINHO FUNCIONAL 
   ========================================================================== */
function renderizarCarrinho() {
  const container = document.getElementById("itensCarrinho");
  const contador = document.getElementById("contadorCarrinho");
  const totalEl = document.getElementById("total");

  const qtdTotalItens = carrinho.reduce((acc, i) => acc + i.quantidade, 0);
  if (contador) contador.innerText = qtdTotalItens;

  if (!container) return;

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    if (totalEl) totalEl.innerText = "0.00";
    return;
  }

  container.innerHTML = carrinho
    .map(
      (i) => `
    <div class="cart-item">
      <div>
        <strong>${i.livro.titulo}</strong><br>
        R$ ${i.livro.preco.toFixed(2)} x ${i.quantidade} = <strong>R$ ${(i.livro.preco * i.quantidade).toFixed(2)}</strong>
      </div>
      <div>
        <button onclick="alterarQtd(${i.livro.id}, 1)">+</button>
        <button onclick="alterarQtd(${i.livro.id}, -1)">-</button>
        <button class="danger" onclick="removerItem(${i.livro.id})">Remover</button>
      </div>
    </div>
  `,
    )
    .join("");

  const valorTotal = carrinho.reduce(
    (acc, i) => acc + i.livro.preco * i.quantidade,
    0,
  );
  if (totalEl) totalEl.innerText = valorTotal.toFixed(2);
}

function adicionarAoCarrinho(id) {
  const livro = livros.find((l) => l.id === id);
  const itemExistente = carrinho.find((i) => i.livro.id === id);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ livro, quantidade: 1 });
  }

  salvarCarrinho();
  renderizarCarrinho();
}

function alterarQtd(id, delta) {
  const item = carrinho.find((i) => i.livro.id === id);
  if (item) {
    item.quantidade += delta;
    if (item.quantidade <= 0) {
      removerItem(id);
      return;
    }
  }
  salvarCarrinho();
  renderizarCarrinho();
}

function removerItem(id) {
  carrinho = carrinho.filter((i) => i.livro.id !== id);
  salvarCarrinho();
  renderizarCarrinho();
}

const btnLimpar = document.getElementById("btnLimparCarrinho");
if (btnLimpar) {
  btnLimpar.addEventListener("click", () => {
    carrinho = [];
    salvarCarrinho();
    renderizarCarrinho();
  });
}

/* ==========================================================================
    BUSCA E FILTRO POR CATEGORIA
   ========================================================================== */
const inputBusca = document.getElementById("inputBusca");
if (inputBusca) {
  inputBusca.addEventListener("input", (e) => {
    termoBusca = e.target.value.toLowerCase().trim();
    renderizarCatalogo();
  });
}

const botoesCat = document.querySelectorAll(".cat-btn");
botoesCat.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    botoesCat.forEach((b) => b.classList.remove("ativo"));
    e.target.classList.add("ativo");
    categoriaAtual = e.target.getAttribute("data-cat");
    renderizarCatalogo();
  });
});

/* ==========================================================================
    VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   ========================================================================== */
const formContato = document.getElementById("formContato");
if (formContato) {
  formContato.addEventListener("submit", (e) => {
    e.preventDefault();
    const feedback = document.getElementById("feedbackContato");
    const email = document.getElementById("email").value;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      feedback.style.color = "var(--danger)";
      feedback.innerText = "Por favor, insira um e-mail válido.";
      return;
    }

    feedback.style.color = "var(--price)";
    feedback.innerText = "Mensagem enviada com sucesso! Entraremos em contato.";
    formContato.reset();
  });
}

/* ==========================================================================
    FINALIZAÇÃO DE COMPRA
   ========================================================================== */
const formCheckout = document.getElementById("formCheckout");
if (formCheckout) {
  formCheckout.addEventListener("submit", (e) => {
    e.preventDefault();
    const feedback = document.getElementById("feedbackCheckout");

    if (carrinho.length === 0) {
      feedback.style.color = "var(--danger)";
      feedback.innerText = "Seu carrinho está vazio!";
      return;
    }

    const nome = document.getElementById("nomeComprador").value;
    feedback.style.color = "var(--price)";
    feedback.innerText = `Parabéns, ${nome}! Pedido finalizado com sucesso.`;

    carrinho = [];
    salvarCarrinho();
    renderizarCarrinho();
    formCheckout.reset();
  });
}

/* ==========================================================================
   MODO CLARO / ESCURO 
   ========================================================================== */
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
  const savedTheme = localStorage.getItem("theme_livraria") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeBtn.innerText = savedTheme === "dark" ? "☀️ Claro" : "🌙 Escuro";

  themeBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme_livraria", newTheme);
    themeBtn.innerText = newTheme === "dark" ? "☀️ Claro" : "🌙 Escuro";
  });
}

/* ==========================================================================
    INICIALIZAÇÃO
   ========================================================================== */
renderizarVitrine();
renderizarCatalogo();
renderizarCarrinho();
