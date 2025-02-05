//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'jogo secreto';

//let pararagrafo = document.querySelector('p');
//pararagrafo.innerHTML = 'escolha um numero de 1 a 10';

let listaDeNumerosSorteados = [ ];
let numeroLimite = 100;
let numerosecreto = gerarNumeroAleatorio();

let tentativas = 1;

function exibirTextoNaTela(tag, texto){   //parametros
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela(`h1`, 'jogo secreto');
    exibirTextoNaTela(`p`, 'escolha um numero de 1 a 100');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector(`input`).value;
    if (chute == numerosecreto) {
        exibirTextoNaTela('h1', 'acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `descobriu com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if(chute > numerosecreto){
            exibirTextoNaTela('p', `o numero secreto é menor que ${chute}`);
        }
        else{
            exibirTextoNaTela('p', `o numero secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}


function gerarNumeroAleatorio() {
   let  numeroEscolhido = parseInt(Math.random()*numeroLimite+1);
   let quantDeElementosNaLista = listaDeNumerosSorteados.length;
   //verificação
   if (quantDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = []
   } 
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // verifica se o elemento ta na lista ... include
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido) //inserir elementos na lita
        return numeroEscolhido
    }
}  //ele vai retornar algo nessa pagina



function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numerosecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}