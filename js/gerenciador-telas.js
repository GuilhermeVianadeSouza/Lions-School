'use strict'
import {obterAlunosDeCursoDeterminado} from './api.js'

const conteudoMainAtual = document.getElementById('container-principal')
const templatePrincipal = document.getElementById('template-home')


export function renderizarTelaPrincipal() {
    conteudoMainAtual.classList = 'layout-home'
    const conteudo = templatePrincipal.content.cloneNode(true);
    conteudoMainAtual.replaceChildren(conteudo);

    atualizarBotaoNavegacaoHeader('Sair', () => {
        console.log("Usuário deslogado");
    })
    configuracaoBotoesHome()
}


export async function renderizarTelaAlunos(id_curso){

    const nomesCursos = {
        '1': 'Desenvolvimento de Sistemas',
        '2': 'Redes de Computadores',
    }

    conteudoMainAtual.replaceChildren()
    conteudoMainAtual.classList = 'layout-lista'

    const tituloCurso = document.createElement('h1');
    tituloCurso.classList.add('titulo-curso');
    tituloCurso.textContent = nomesCursos[id_curso] || 'Curso não encontrado';

    const alunos = await obterAlunosDeCursoDeterminado(id_curso)

    const listaAlunos = document.createElement('div')
    listaAlunos.classList.add('lista-alunos')

    alunos.forEach(aluno => {
        const cardAluno = document.createElement('div')
        cardAluno.classList.add('aluno-card')
        cardAluno.dataset.id_aluno = aluno.id_aluno

        const imagemAluno = document.createElement('img')
        imagemAluno.src = aluno.foto || '../img/boneco-exemplo.png'
    
        const nomeAluno = document.createElement('p')
        nomeAluno.textContent = aluno.nome || 'Não encontrado'

        cardAluno.append(imagemAluno, nomeAluno)

        cardAluno.addEventListener('click', () => {
            const idParaBusca = cardAluno.dataset.id_aluno
            renderizarInformacoesAluno(idParaBusca)
        })
        listaAlunos.appendChild(cardAluno)
    });
    atualizarBotaoNavegacaoHeader('Voltar', () => {
        renderizarTelaPrincipal()
    })
    conteudoMainAtual.replaceChildren(tituloCurso, listaAlunos)
}

export function renderizarInformacoesAluno(idParaBusca){

}

function configuracaoBotoesHome() {
    const botaoDS= document.getElementById('1')
    const botaoRedes = document.getElementById('2')

     if (botaoDS) botaoDS.onclick = () => renderizarTelaAlunos(botaoDS.id)
     if (botaoRedes) botaoRedes.onclick = () => renderizarTelaAlunos(botaoRedes.id)
}

function atualizarBotaoNavegacaoHeader(texto, acao) {
    const botaoNavegacao = document.getElementById('botao-header')
    const textoBotao = document.getElementById('texto-botao')

    if(botaoNavegacao && textoBotao) {
        textoBotao.textContent = texto
        botaoNavegacao.onclick = acao
    }
}