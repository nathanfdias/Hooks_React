import { useEffect, useState } from "react"

// Função assíncrona para buscar a lista de Pokémon
async function fetchPokemon() {
  // Faz uma requisição HTTP GET para a PokeAPI
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
  // Converte a resposta para JSON
  const data = await response.json()
  // Retorna apenas o array de resultados (nomes e URLs dos pokémon)
  return data.results
}

function App() {
  // State para armazenar a lista de pokémons
  const [pokemon, setPokemon] = useState([])
  // State para armazenar o pokémon atualmente exibido
  const [pokemonShown, setPokemonShown] = useState(null)

  // Hook useEffect para carregar a lista de pokémons ao iniciar o componente
  useEffect(() => {
    fetchPokemon().then(results => {
      console.log("state change")
      console.log(results)
      setPokemon(results) // Atualiza o state com a lista de pokémons
    })
  }, []) // Array vazio faz com que o efeito rode apenas uma vez ao montar o componente

  // Função para buscar os detalhes de um pokémon específico
  const showDetails = async (url) => {
    const data = await fetch(url).then(res => res.json())
    console.log(data)
    setPokemonShown(data) // Atualiza o state com os dados detalhados do pokémon
  }

  return (
    <div className="app">
      <div>
        <h2>Pokémon</h2>
        <ul className="pokemon">
          {/* Renderiza a lista de pokémons com botão para ver detalhes */}
          {pokemon.map(mon => (
            <li key={mon.name}>
              <span>{mon.name}</span>
              <button onClick={() => showDetails(mon.url)}>
                Ver detalhes
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Se um pokémon foi selecionado, mostra seus detalhes */}
      {pokemonShown && (
        <div>
          <h2>{pokemonShown.name}</h2>
          <img
            src={pokemonShown.sprites.front_default}
            alt=""
          />
          <div className="stat">
            <b>Tipo: </b>
            {pokemonShown.types.map(({ type }) => (
              <span key={type.name}>{type.name} </span>
            ))}
          </div>
          <div className="stat">
            <b>Altura: </b>{pokemonShown.height / 10} m
          </div>
          <div className="stat">
            <b>Peso: </b>{pokemonShown.weight / 10} Kg
          </div>
          <div className="stat">
            <b>Atributos</b>
            <ul>
              {pokemonShown.stats.map(({ base_stat, stat }) => (
                <li key={stat.name}>
                  {stat.name}: {base_stat}
                </li>
              ))}
            </ul>
          </div>
          <div className="stat">
            <b>Habilidades</b>
            <ul>
              {pokemonShown.abilities.map(({ ability, is_hidden }) => (
                <li key={ability.name}>
                  {ability.name}
                  {is_hidden && " (secreta)"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default App