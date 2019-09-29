const listas = document.querySelectorAll('ul')
const selectListas = document.querySelector('select')
const icone = document.querySelector('header img')
const inputNome = document.querySelector('#nome')
const inputNota = document.querySelector('#nota')
const adicionarBt = document.querySelector('section.campo button')

const placeholderListas = [
    'Qual o nome do filme ?',
    'Qual o nome da série ?',
    'Qual o nome do game ?',
    'Qual o nome do anime ?'
]
const criarItem = (descricao, nota, lista) => {

    const li = document.createElement('li')
    const heart = document.createElement('img')
    const buttonImg = document.createElement('img')
    const button = document.createElement('button')
    const pDescricao = document.createElement('p')
    const pNota = document.createElement('p')


    nota > 5 ?
        heart.setAttribute('src', './assets/imgs/heart.svg') :
        heart.setAttribute('src', './assets/imgs/broken.svg')

    buttonImg.setAttribute('src', './assets/imgs/close.svg')

    button.appendChild(buttonImg)

    let notaFormatada = `${parseFloat(inputNota.value).toFixed(2)}/10.00`

    pDescricao.textContent = descricao

    pDescricao.classList.add('descricao')

    pNota.textContent = notaFormatada

    li.append(heart, pDescricao, pNota, button)

    lista.appendChild(li)

    // < li >
    // <img src="./assets/imgs/heart.svg">
    //     <p class="descricao">Interstelar</p>
    //     <p>10.00/10.00</p><button><img src="./assets/imgs/close.svg"></button>
    //     </li>
}
const adicionarLista = () => {

    if (inputNome.value && inputNota.value && inputNota.value > 0 && inputNota.value <= 10) {
        let listaSelecionada = Array.from(listas)
            .find(elemento => {
                return elemento.classList.contains('hidden') == false
            })


        criarItem(inputNome.value, inputNota.value, listaSelecionada)

        inputNome.value = ''
        inputNota.value = ''

    } else {
        alert('Coloca o nome do filme e a nota ae ! De 0 a 10')
    }

}

const transicaoLista = nomeLista => {

    listas.forEach(lista => lista.classList.add('hidden'))

    let listaSelecionada = document.querySelector(`#${nomeLista}`)

    listaSelecionada.classList.remove('hidden')

    let indicePlaceholder = Array.from(listas)
        .findIndex(elemento => {
            return elemento.classList.contains('hidden') == false
        })


    inputNome.setAttribute('placeholder', placeholderListas[indicePlaceholder])

    icone.setAttribute('src', `./assets/imgs/${nomeLista}.svg`)

}

adicionarBt.onclick = adicionarLista

selectListas.onchange = () => transicaoLista(selectListas.value)