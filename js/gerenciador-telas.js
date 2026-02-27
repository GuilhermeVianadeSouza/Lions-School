'use strict'
import {obterAlunosDeCursoDeterminado, obterInformacaoAlunoEspecifico} from './api.js'

const conteudoMainAtual = document.getElementById('container-principal')
const templatePrincipal = document.getElementById('template-home')


export function renderizarTelaPrincipal() {
    conteudoMainAtual.classList = 'layout-home'
    const conteudo = templatePrincipal.content.cloneNode(true);
    conteudoMainAtual.replaceChildren(conteudo);

    atualizarBotaoNavegacaoHeader('Sair', () => {
        
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
        cardAluno.dataset.id = aluno.id

        const imagemAluno = document.createElement('img')
        imagemAluno.src = aluno.foto || '../img/boneco-exemplo.png'
    
        const nomeAluno = document.createElement('p')
        nomeAluno.textContent = aluno.nome || 'Não encontrado'

        cardAluno.append(imagemAluno, nomeAluno)

        cardAluno.addEventListener('click', () => {
            const idParaBusca = cardAluno.dataset.id
            renderizarInformacoesAluno(idParaBusca)
        })
        listaAlunos.appendChild(cardAluno)
    });
    atualizarBotaoNavegacaoHeader('Voltar', () => {
        renderizarTelaPrincipal()
    })
    conteudoMainAtual.replaceChildren(tituloCurso, listaAlunos)
}

export async function renderizarInformacoesAluno(idParaBusca){
    
    conteudoMainAtual.replaceChildren(); 
    conteudoMainAtual.className = 'layout-detalhes';

    const dadosAluno = await obterInformacaoAlunoEspecifico(idParaBusca);

    if (!dadosAluno || !dadosAluno.desempenho) {
        console.error("Erro: Dados do aluno ou desempenho não encontrados");
        return;
    }
    const containerPerfil = document.createElement('aside');
    containerPerfil.classList.add('perfil-aluno-container');
    
    const foto = document.createElement('img');
    foto.src = dadosAluno.foto || '../img/boneco-exemplo.png';
    
    const nome = document.createElement('h2');
    nome.textContent = dadosAluno.nome;

    containerPerfil.append(foto, nome);


const containerGrafico = document.createElement('section');
containerGrafico.classList.add('grafico-container');

dadosAluno.desempenho.forEach(item => {
  
    const torre = document.createElement('div');
    torre.classList.add('grafico-torre');

    
    const barra = document.createElement('div');
    barra.classList.add('barra-valor');
    
 
    const nota = item.valor;
    barra.style.height = `${nota}%`;

  
    if (nota > 90) {
        barra.style.backgroundColor = '#3347B0'; 
    } else if (nota >= 75) {
        barra.style.backgroundColor = '#FFC107'; 
    } else {
        barra.style.backgroundColor = '#E91E63'; 
    }


    const sigla = document.createElement('span');
    sigla.classList.add('sigla-materia');
    sigla.textContent = item.categoria;


    torre.append(barra, sigla);
    containerGrafico.appendChild(torre);
});
    conteudoMainAtual.append(containerPerfil, containerGrafico);
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