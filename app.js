let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarRandomNumber();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Web Speech API não suportada neste navegador.');
    }
}

mensagemInicial();

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um Número entre 1 e 10');
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? ' tentativas!' : ' tentativa!';
        let mensagemTentativas = 'Você descobriu o Número Secreto com ' + tentativas + palavraTentativa;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O Número Secreto é Menor que: ' + chute);
        } else {
            exibirTextoNaTela('p', 'O Número Secreto é Maior que: ' + chute);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarRandomNumber() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qntdElementosLista = listaNumerosSorteados.length;

    if (qntdElementosLista == numeroLimite) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarRandomNumber();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo() {
    numeroSecreto = gerarRandomNumber();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}