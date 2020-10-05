import React, { useState } from 'react'
import './App.css'
import { ReactComponent as Robot } from '../src/images/robot.svg'
import GifCarregando from '../src/images/carregando.gif'

function App() {
  const [carregando, setCarregando] = useState(false)//obrigatório o set
  const [pessoas, setPessoas] = useState([])
  const [etnia, setEtnia] = useState('')
  const [idade, setIdade] = useState('')

  async function obterFotos() {
    setCarregando(true)
    let apiKey = process.env.REACT_APP_API_KEY

    const filtraEtnia = etnia.length > 0 ? `&ethnicity=${etnia}` : ''
    const filtraIdade = idade.length > 0 ? `&age=${idade}` : ''

    let url = `https://api.generated.photos/api/v1/faces?api_key=${apiKey}${filtraEtnia}${filtraIdade}&order by=random`
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setPessoas(data.faces)
        console.log(data)
      })
      .catch(function (error) {
        console.error(`Houve um erro: ${error.message}`)
      })
    setCarregando(false)
  }

  function ListaPessoas(props) {
    const dados = props.dados
    const listagemPessoas = dados.map((pessoa) => <img key={pessoa.id} src={pessoa.urls[4][512]} title={pessoa.meta.age[0]} />)
    return (
      <ul>{listagemPessoas}</ul>
    )
  }
  return (
    <div className="principal">
      <h1>Gerador de Fotos com IA</h1>
      <h2>Larisse Loureiro</h2>
      {pessoas.length > 0
        ? <ListaPessoas dados={pessoas} />
        : <Robot />
      }

      {carregando &&
        <img src={GifCarregando} title="Carregando..." alt="Aguarde, carregando dados" />
      }
      <div className="opcoes">
        <label>Etnia:</label>
        <select onChange={event => setEtnia(event.target.value)}>
          <option value="">Todas</option>
          <option value="white">Branco</option>
          <option value="latino">Latina</option>
          <option value="asian">Asiática</option>
          <option value="black">Negra</option>
        </select>

        <label>Faixa Etária:</label>
        <select onChange={event => setIdade(event.target.value)}>
          <option value="">Todas</option>
          <option value="infant">Bebê</option>
          <option value="child">Criança</option>
          <option value="young-adult">Adolescente</option>
          <option value="adult">Adulto</option>
          <option value="elderly">Idoso</option>
        </select>

      </div>

      <button type="button" onClick={obterFotos}>
        Obter Imagens
      </button>
      {pessoas.length > 0 &&
        < button type="button" onClick={() => setPessoas([])}>
          Limpar Resultados
      </ button>
      }
    </div >
  )
}

export default App