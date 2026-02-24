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

    //const
}

export function renderizarInformacoesAluno(){

}