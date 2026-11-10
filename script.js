
const perguntas = [
  {
    texto: "😂 Eu queria dormir, MAS tinha prova!",
    opcoes: ["Adição", "Oposição", "Conclusão", "Explicação"],
    correta: 1,
    explicacao: "'Mas' indica oposição, ou seja, ideias contrárias."
  },
  {
    texto: "📚 Estudei E fiz todos os exercícios!",
    opcoes: ["Adição", "Alternância", "Conclusão", "Causa"],
    correta: 0,
    explicacao: "'E' acrescenta uma informação."
  },
  {
    texto: "😭 Não estudei, PORTANTO fui mal na prova!",
    opcoes: ["Oposição", "Conclusão", "Alternância", "Adição"],
    correta: 1,
    explicacao: "'Portanto' indica uma conclusão."
  },
  {
    texto: "😎 Vou estudar PORQUE quero tirar dez!",
    opcoes: ["Explicação", "Oposição", "Adição", "Alternância"],
    correta: 0,
    explicacao: "'Porque' apresenta uma explicação."
  },
  {
    texto: "🎮 OU eu jogo videogame OU faço a tarefa!",
    opcoes: ["Conclusão", "Adição", "Alternância", "Oposição"],
    correta: 2,
    explicacao: "'Ou... ou' indica uma escolha entre alternativas."
  },
  {
    texto: "🥱 EMBORA estivesse com sono, terminei o trabalho!",
    opcoes: ["Concessão", "Adição", "Conclusão", "Finalidade"],
    correta: 0,
    explicacao: "'Embora' indica concessão, algo que não impediu a ação."
  }
];

let atual = 0;
let pontos = 0;

function iniciar() {
  atual = 0;
  pontos = 0;

  document.getElementById("inicio").hidden = true;
  document.getElementById("resultado").hidden = true;
  document.getElementById("quiz").hidden = false;

  mostrarPergunta();
}

function mostrarPergunta() {
  const pergunta = perguntas[atual];

  document.getElementById("progresso").textContent =
    `Pergunta ${atual + 1} de ${perguntas.length}`;

  document.getElementById("pergunta").textContent = pergunta.texto;
  document.getElementById("pontos").textContent =
    `Pontuação: ${pontos}`;

  document.getElementById("feedback").textContent = "";
  document.getElementById("proxima").hidden = true;

  const area = document.getElementById("alternativas");
  area.innerHTML = "";

  pergunta.opcoes.forEach((opcao, indice) => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.onclick = () => responder(indice);
    area.appendChild(botao);
  });
}

function responder(escolha) {
  const pergunta = perguntas[atual];
  const botoes = document.querySelectorAll("#alternativas button");

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

  document.getElementById("feedback").textContent =
    (acertou ? "✅ Acertou! " : "❌ Errou! ") +
    pergunta.explicacao;

  document.getElementById("pontos").textContent =
    `Pontuação: ${pontos}`;

  document.getElementById("proxima").hidden = false;
}

function proxima() {
  atual++;

  if (atual < perguntas.length) {
    mostrarPergunta();
  } else {
    document.getElementById("quiz").hidden = true;
    document.getElementById("resultado").hidden = false;

    document.getElementById("pontuacao-final").textContent =
      `Você fez ${pontos} de ${perguntas.length * 10} pontos!`;
  }
}
