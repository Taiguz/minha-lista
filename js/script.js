const headerSelect = document.querySelector('header select')
const headerIcone = document.querySelector('header img')
const botaoAdicionar = document.querySelector('section.campo button')
const nomeInput = document.querySelector('#nome')
const notaInput = document.querySelector('#nota')
const listaFilmes = document.querySelector('#filmes')
const listaSeries = document.querySelector('#series')
const listaGames = document.querySelector('#games')
const listaAnimes = document.querySelector('#animes')
const loader = document.querySelector('div.loader')
const listas = [{
    nome: 'filmes',
    elementoHtml: listaFilmes,
    mensagem: 'Qual o nome do filme ?'
}, {
    nome: 'series',
    elementoHtml: listaSeries,
    mensagem: 'Qual o nome da série ?'

}, {
    nome: 'games',
    elementoHtml: listaGames,
    mensagem: 'Qual o nome do game ?'

}, {
    nome: 'animes',
    elementoHtml: listaAnimes,
    mensagem: 'Fala tu o nome do anime'

}]

const salvar = () => {
    let itensDaLista = listas
        .map(lista => Array.from(lista.elementoHtml.children)
            .map(child => ({ descricao: child.nome, nota: child.nota })))
    localStorage.setItem('listas', JSON.stringify(itensDaLista));
}
const carregar = () => {
    return new Promise((resolve, reject) => {
        let itensDaLista = JSON.parse(localStorage.getItem('listas'))
        if (itensDaLista) {
            itensDaLista.forEach((itensLista, indice) => {
                itensLista.forEach(item => {
                    adicionarNaLista({
                        descricao: item.descricao,
                        nota: item.nota,
                        lista: listas[indice]
                    })
                })
            })
            resolve()
        }

    })
}
const trocarDeLista = nome => {
    let listaAberta = listas.find(lista => lista.elementoHtml.classList.contains('hidden') == false)
    listaAberta.elementoHtml.classList.add('hidden')
    let lista = listas.find(lista => lista.nome == nome)
    lista.elementoHtml.classList.remove('hidden')
    nomeInput.setAttribute('placeholder', lista.mensagem)
    headerIcone.setAttribute('src', `./assets/imgs/${lista.nome}.svg`)
}
const adicionarNaLista = load => {
    if (load) {
        const { descricao, nota, lista } = load
        let item = criarItem(descricao, nota, lista)
        lista.elementoHtml.appendChild(item)
        return
    }
    let nome = nomeInput.value
    let nota = notaInput.value
    if (nome) {
        if (nota && nota >= 0 && nota <= 10) {
            let listaAberta = listas.find(lista => lista.elementoHtml.classList.contains('hidden') == false)
            let item = criarItem(nome, nota, listaAberta)
            listaAberta.elementoHtml.appendChild(item)
            nomeInput.value = ''
            notaInput.value = ''
            salvar()

        } else {
            alert('É de zero a dez a nota mano')
        }
    } else {
        alert('Calma ae ! Falta a descrição !')
    }
}
const excluirItem = (item, lista) => {
    let animacao = item.animate([{
        transform: 'scale(1)',
        opacity: '1'
    }, {
        transform: 'scale(0.8)',
        opacity: '0'
    }], 100)
    animacao.onfinish = () => {
        lista.elementoHtml.removeChild(item)
        salvar()
    }
}
const criarItem = (nome, nota, listaAberta) => {
    let li = document.createElement('li')
    let heart = document.createElement('img')
    let nomeElemento = document.createElement('p')
    let notaElemento = document.createElement('p')
    let botaoFechar = document.createElement('button')
    let imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', './assets/imgs/close.svg')
    botaoFechar.appendChild(imagemBotao)
    li.nota = nota
    li.nome = nome
    li.append(heart, nomeElemento, notaElemento, botaoFechar)
    botaoFechar.onclick = () => excluirItem(li, listaAberta)
    nomeElemento.textContent = nome
    notaElemento.textContent = `${parseInt(nota).toFixed(2)}/10.00`
    nota > 5 ? heart.setAttribute('src', './assets/imgs/heart.svg') : heart.setAttribute('src', './assets/imgs/broken.svg')
    return li
}
const adicionarNoEnter = evento => {
    if (evento.keyCode == 13) {
        adicionarNaLista()
    }
}
headerSelect.onchange = () => {
    trocarDeLista(headerSelect.value)
}
botaoAdicionar.onclick = () => adicionarNaLista()

nomeInput.onkeydown = evento => adicionarNoEnter(evento)
notaInput.onkeydown = evento => adicionarNoEnter(evento)


carregar()
    .then(() => {
        loader.classList.add('hidden')
        listas[0].elementoHtml.classList.remove('hidden')
    })