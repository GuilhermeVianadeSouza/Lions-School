/**************************************************************
 * Data: 27/02/2026
 * Autor Test: Guilherme Viana de Souza
 * Autor Dev: Guilherme Viana de Souza
 * Versão: 1.0
 ***********************************************************/
import { jest } from '@jest/globals' //Utilizando-se da ferramente Jest, declarando que utilizará ela dentro do arquivo
import { obterAlunosDeCursoDeterminado } from '../js/api.js' //importo uma das funções a ser testada do arquivo em questão
import listaDeAlunos from './alunos.json' with { type: 'json' } //importo o array de recebimento que quero da requisição

global.fetch = jest.fn(); //Declarando o substituto de um fetch real, ele simula um fetch como um "duble", não causando  


describe('Testes da API - Lion School', () => {

    beforeEach(() => { //Aqui foi utilizado o beforeEach para limpar o resultado após o teste ser realizado: O que implica que o teste não deve influenciar outro teste. Uma limpeza de cache pratica.
        fetch.mockClear();
    });

    test('Deve validar a estrutura da lista real de alunos', async () => { //Valida se o Json recebido segue o Json armazenado no listaDeAlunos do Json simulado na mesma pasta.
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => listaDeAlunos
        }); //o ok serve como um confimador se há internet ou não, pois algumas aplicações devem funcionar recursos sem ela.

        const resultado = await obterAlunosDeCursoDeterminado(1); //aqui ele fez a execução do comando em especifico para o resultado

        expect(resultado).toEqual(listaDeAlunos) //o resultado esperado inicial foi o JSON de alunos que eu salvei nesse import
        expect(resultado[0].nome).toBe("Mariana Silva Santos") //e para uma confirmação maior, trouxe esse teste para ver se o primeiro nome da lista volta o da mariana
    });

    test('Deve verificar se a URL chamada contém o curso_id correto', async () => { //teste focado em realiza a tratativa de mesmo sem receber o json correto, ele retorne o [] confirmando que ele realizou a requisição e espero o conteudo para montar
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => []
        });

        const idCurso = 'DS'; //aqui declaro o idCurso que mando para a função que irei testar
        await obterAlunosDeCursoDeterminado(idCurso); //esperamos a realização da função

        expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`curso_id=${idCurso}`)); //esse teste faz a seguinte chamada: ele espera que nosso fetch duble tenha em sua escrita em qualquer área do seu link de rquest o argumento curso_id${idCurso} sendo uma validação que recorremos para a verificação mais simplificada da request em questão. 
    });
});