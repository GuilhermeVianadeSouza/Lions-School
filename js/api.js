'use strict'

export async function obterAlunosDeCursoDeterminado(id_curso) {
    const url = `https://lion-school-phbo.onrender.com/alunos?curso_id=${id_curso}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export async function obterInformacaoAlunoEspecifico(id_aluno){
    const url = `https://lion-school-phbo.onrender.com/alunos/${id_aluno}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}