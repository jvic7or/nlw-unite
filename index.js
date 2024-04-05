let participantes = [
  {
    nome: "João Victor",
    email: "joaoV@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 19, 20),
    dataCheckIn: new Date(2024, 3, 2, 18, 00)
  },
  {
    nome: "Pedro Dedoni",
    email: "pedroD@gmail.com",
    dataInscricao: new Date(2024, 2, 19, 17, 25),
    dataCheckIn: null
  },
  {
    nome: "Keven Maximus",
    email: "kevenM@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 22, 05),
    dataCheckIn: new Date(2024, 2, 20, 15, 00)
  },
  {
    nome: "Fabio Barbosa",
    email: "fabioB@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 23, 48),
    dataCheckIn: null
  },
  {
    nome: "Luisa Aredes",
    email: "LuisaA@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 19, 20),
    dataCheckIn: new Date(2024, 3, 2, 19, 00)
  },
  {
    nome: "Gabriel Sena",
    email: "gabrielS@gmail.com",
    dataInscricao: new Date(2024, 2, 15, 09, 30),
    dataCheckIn: new Date(2024, 2, 20, 18, 00)
  },
  {
    nome: "Felipe Sadrak",
    email: "felipeS@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Pedro Coiado",
    email: "pedroC@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 21, 10),
    dataCheckIn: null
  },
  {
    nome: "Vitória Passos",
    email: "vitoriaP@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 10, 40),
    dataCheckIn: new Date(2024, 2, 2, 11, 50)
  },
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  //condicional
  if (participante.dataCheckIn == null){
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  //estrutura de repetição - loop
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }

  //substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
} //arrow Function

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('E-mail já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false){
    return
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}