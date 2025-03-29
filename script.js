let currentQuestionIndex = 0;
let score = 0;
let countdown;

// Referências aos elementos da interface
const questionElement = document.getElementById('question');
const trueButton = document.getElementById('true-button');
const falseButton = document.getElementById('false-button');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');

// Elementos para as animações (bola estourando)
const bola = document.getElementById('bola');

// Sons de feedback (acerto e erro)
const correctSound = new Audio('https://www.soundjay.com/button/beep-07.wav');
const wrongSound = new Audio('https://www.soundjay.com/button/beep-08b.wav');

// Lista de perguntas e respostas
const questions = [
    { question: "A internet é uma ferramenta útil para comunicação?", answer: true },
    { question: "A internet pode ser prejudicial à saúde mental?", answer: true },
    { question: "As redes sociais sempre promovem boas interações?", answer: false },
    { question: "A navegação anônima na internet é completamente segura?", answer: false },
    { question: "O uso excessivo da internet pode causar dependência?", answer: true },
    { question: "O armazenamento em nuvem é uma forma de salvar dados na internet?", answer: true },
    { question: "A internet das coisas (IoT) não tem impacto na vida cotidiana?", answer: false },
    { question: "O 5G oferece uma conexão de internet mais rápida que o 4G?", answer: true },
    { question: "A principal diferença entre as redes 5G e 2.4 GHz é que a 5G oferece maior velocidade e menor latência?", answer: true },
    { question: "A internet pode ser usada para educação a distância?", answer: true },
    { question: "É seguro compartilhar informações pessoais nas redes sociais?", answer: false },
    { question: "A internet das coisas é uma tecnologia em crescimento?", answer: true },
    { question: "A privacidade online é totalmente garantida pelos sites?", answer: false },
    { question: "A internet tem impacto positivo no acesso à informação?", answer: true },
    { question: "O uso de VPNs garante total anonimato na internet?", answer: false },
    { question: "As atualizações de segurança são essenciais para navegar na internet?", answer: true },
    { question: "5G pode ser prejudicial à saúde devido a radiações?", answer: false },  // Mito
    { question: "Redes Wi-Fi de 2.4 GHz são mais rápidas que as de 5 GHz?", answer: false }, // Mito
    { question: "É possível acessar qualquer conteúdo na internet sem restrições, independentemente das leis locais?", answer: false }, // Mito
    { question: "A privacidade na internet é garantida apenas com o uso de senhas fortes?", answer: false }, // Mito
    { question: "A internet pode ser considerada 100% segura?", answer: false }, // Mito
    { question: "Usar apenas a rede Wi-Fi pública é seguro para fazer compras online?", answer: false } // Mito
];

// Função para carregar a próxima pergunta
function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionElement.textContent = questions[currentQuestionIndex].question;
        feedbackElement.textContent = '';
        bola.style.display = 'none'; // Ocultar a bola
        resetCountdown(); // Reiniciar o contador
        startCountdown(); // Iniciar contagem regressiva
    } else {
        questionElement.textContent = 'Fim do jogo!';
        feedbackElement.textContent = `Sua pontuação final é: ${score} de ${questions.length}`;
        trueButton.disabled = true;
        falseButton.disabled = true;
        // Adicionar opção para reiniciar o jogo
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Reiniciar Jogo';
        restartButton.style.marginTop = '20px';
        restartButton.addEventListener('click', restartGame);
        document.querySelector('.game-container').appendChild(restartButton);
    }
}

// Função para verificar a resposta
function checkAnswer(isTrue) {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.answer === isTrue) {
        feedbackElement.textContent = 'Resposta correta!';
        feedbackElement.style.color = 'green';
        score++;
        correctSound.play(); // Reproduzir som de acerto
        bola.style.display = 'block'; // Exibir a bola
        bola.classList.add('acerto'); // Acionar a animação de estourar
    } else {
        feedbackElement.textContent = 'Resposta errada!';
        feedbackElement.style.color = 'red';
        wrongSound.play(); // Reproduzir som de erro
        bola.style.display = 'block'; // Exibir a bola
        bola.classList.add('erro'); // Acionar a animação de estourar
    }

    scoreElement.textContent = `Pontuação: ${score}`;
    showNextButton(); // Exibir o botão para a próxima pergunta
}

// Função para iniciar a contagem regressiva
function startCountdown() {
    const countdownElement = document.createElement('div');
    countdownElement.id = 'countdown';
    document.querySelector('.game-container').appendChild(countdownElement);

    let timeLeft = 15; // Tempo limite para cada pergunta (15 segundos)
    countdownElement.textContent = `Tempo: ${timeLeft}s`;

    countdown = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = `Tempo: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(countdown);
            feedbackElement.style.color = 'orange';
            showNextButton(); // Exibir o botão para a próxima pergunta após o tempo
        }
    }, 1000);
}

// Função para resetar o contador a cada nova pergunta
function resetCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.remove();
    }
}

// Função para exibir o botão de próxima pergunta
function showNextButton() {
    // Cria o botão de próxima pergunta, se ainda não existir
    if (!document.getElementById('next-button')) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Próxima Pergunta';
        nextButton.id = 'next-button';
        nextButton.addEventListener('click', nextQuestion);
        document.querySelector('.game-container').appendChild(nextButton);
    }
}

// Função para avançar para a próxima pergunta
function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('next-button').remove(); // Remover o botão "Próxima Pergunta"
    loadQuestion();
}

// Função para reiniciar o jogo
function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    trueButton.disabled = false;
    falseButton.disabled = false;
    loadQuestion();
}

// Configurando os eventos dos botões
trueButton.addEventListener('click', () => checkAnswer(true));
falseButton.addEventListener('click', () => checkAnswer(false));

// Iniciar o jogo carregando a primeira pergunta
loadQuestion();
