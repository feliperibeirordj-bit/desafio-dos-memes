
const perguntas = [
  {
    texto: "😂 Eu queria dormir, MAS tinha prova!",
    imagem: "images.jpg",
    opcoes: [
      "Adição",
      "Oposição",
      "Conclusão",
      "Explicação"
    ],
    correta: 1,
    explicacao: "'Mas' indica oposição entre duas ideias."
  },

  {
    texto: "📚 Estudei E fiz todos os exercícios!",
    imagem: "images (1).jpg",
    opcoes: [
      "Adição",
      "Alternância",
      "Conclusão",
      "Causa"
    ],
    correta: 0,
    explicacao: "'E' indica adição, acrescentando uma informação."
  },

  {
    texto: "😭 Não estudei, PORTANTO fui mal na prova!",
    imagem: "images (2).jpg",
    opcoes: [
      "Oposição",
      "Conclusão",
      "Alternância",
      "Adição"
    ],
    correta: 1,
    explicacao: "'Portanto' indica uma conclusão."
  },

  {
    texto: "😎 Vou estudar PORQUE quero tirar dez!",
    imagem: "images (3).jpg",
    opcoes: [
      "Causa",
      "Oposição",
      "Adição",
      "Alternância"
    ],
    correta: 0,
    explicacao: "'Porque' apresenta a causa ou motivo da ação."
  },

  {
    texto: "🎮 OU eu jogo videogame OU faço a tarefa!",
    imagem: "images (4).jpg",
    opcoes: [
      "Conclusão",
      "Adição",
      "Alternância",
      "Oposição"
    ],
    correta: 2,
    explicacao: "'Ou... ou' indica alternância entre escolhas."
  },

  {
    texto: "🥱 EMBORA estivesse com sono, terminei o trabalho!",
    imagem: "images (5).jpg",
    opcoes: [
      "Concessão",
      "Adição",
      "Conclusão",
      "Finalidade"
    ],
    correta: 0,
    explicacao: "'Embora' indica concessão: uma dificuldade que não impediu a ação."
  }
];

let atual = 0;
let pontos = 0;

// INICIAR O JOGO

function iniciar() {
  atual = 0;
  pontos = 0;

  document.getElementById("inicio").hidden = true;
  document.getElementById("resultado").hidden = true;
  document.getElementById("quiz").hidden = false;

  mostrarPergunta();
}

// MOSTRAR PERGUNTAS E IMAGENS

function mostrarPergunta() {
  const pergunta = perguntas[atual];

  document.getElementById("progresso").textContent =
    `Pergunta ${atual + 1} de ${perguntas.length}`;

  document.getElementById("pergunta").textContent =
    pergunta.texto;

  // CARREGAR IMAGEM DO MEME

  const imagem = document.getElementById("imagem-meme");

  imagem.hidden = false;

  imagem.alt = "Meme ilustrativo: " + pergunta.texto;

  imagem.onerror = function() {
    imagem.hidden = true;
    console.warn("Imagem não encontrada:", pergunta.imagem);
  };

  imagem.src = encodeURI(pergunta.imagem);

  // MOSTRAR PONTUAÇÃO

  document.getElementById("pontos").textContent =
    `⭐ Pontuação: ${pontos}`;

  document.getElementById("feedback").textContent = "";

  document.getElementById("proxima").hidden = true;

  // CRIAR ALTERNATIVAS

  const area = document.getElementById("alternativas");

  area.innerHTML = "";

  pergunta.opcoes.forEach((opcao, indice) => {
    const botao = document.createElement("button");

    botao.textContent = opcao;

    botao.classList.add("alternativa");

    botao.onclick = function() {
      responder(indice);
    };

    area.appendChild(botao);
  });
}

// VERIFICAR RESPOSTA

function responder(escolha) {
  const pergunta = perguntas[atual];

  const botoes = document.querySelectorAll(
    "#alternativas button"
  );

  botoes.forEach((botao, indice) => {
    botao.disabled = true;

    if (indice === pergunta.correta) {
      botao.classList.add("correta");
    }

    if (indice === escolha && escolha !== pergunta.correta) {
      botao.classList.add("errada");
    }
  });

  const acertou = escolha === pergunta.correta;

  if (acertou) {
    pontos += 10;
  }

  const feedback = document.getElementById("feedback");

  if (acertou) {
    feedback.textContent =
      "✅ Parabéns! Você acertou! " + pergunta.explicacao;
  } else {
    feedback.textContent =
      "❌ Não foi dessa vez! " + pergunta.explicacao;
  }

  document.getElementById("pontos").textContent =
    `⭐ Pontuação: ${pontos}`;

  const botaoProxima = document.getElementById("proxima");

  botaoProxima.hidden = false;

  if (atual === perguntas.length - 1) {
    botaoProxima.textContent = "Ver resultado 🏆";
  } else {
    botaoProxima.textContent = "Próxima pergunta ➜";
  }
}

// PRÓXIMA PERGUNTA

function proxima() {
  atual++;

  if (atual < perguntas.length) {
    mostrarPergunta();
  } else {
    finalizar();
  }
}

// RESULTADO FINAL

function finalizar() {
  document.getElementById("quiz").hidden = true;
  document.getElementById("resultado").hidden = false;

  const total = perguntas.length * 10;
  const porcentagem = (pontos / total) * 100;

  let mensagem = "";

  if (porcentagem === 100) {
    mensagem = "🏆 Incrível! Você é mestre das conjunções!";
  } else if (porcentagem >= 70) {
    mensagem = "🎉 Muito bem! Você conhece bastante sobre conjunções!";
  } else if (porcentagem >= 40) {
    mensagem = "👏 Bom trabalho! Continue praticando!";
  } else {
    mensagem = "📚 Continue estudando! Você consegue melhorar!";
  }

  document.getElementById("pontuacao-final").textContent =
    `Você conquistou ${pontos} de ${total} pontos! ${mensagem}`;
}
