'use strict'
import {obterAlunosDeCursoDeterminado} from './api.js'

const conteudoMainAtual = document.getElementById('container-principal')
const templatePrincipal = document.getElementById('template-home')

export function renderizarTelaPrincipal() {
    const conteudo = templatePrincipal.content.cloneNode(true);
    conteudoMainAtual.replaceChildren(conteudo);
}


export async function renderizarTelaAlunos(id_curso){
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
    conteudoMainAtual.replaceChildren(listaAlunos)
}

export function renderizarInformacoesAluno(){

}