import './style/App.css';
import {Container, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  let [pokemons, setPokemons] = useState([]);
  let [pagination, setPagination] = useState({});
  let getPokemons = function () {
    axios.get("http://localhost:8080/pokemon")
        .then(response => {
          setPokemons([...response.data.content]);
          setPagination({
            page: response.data.number,
            total: response.data.totalElements,
            pages: response.data.totalPages,
            first: response.data.first,
            last: response.data.last
          });
        })
        .catch(error => {
          console.log(error);
          //toast.error(error.message);
        });
  };

  useEffect(() => getPokemons(), []);

  return (
      <Container>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>HP</th>
            <th>Attack</th>
            <th>Defense</th>
            <th>Sp. attack</th>
            <th>Sp. defense</th>
            <th>Speed</th>
          </tr>
          </thead>
          <tbody>
          {pokemons.map(pokemon => {
            return <tr key={pokemon.id}>
              <td>{pokemon.name}</td>
              <td>{pokemon.type}</td>
              <td>{pokemon.base.hp}</td>
              <td>{pokemon.base.attack}</td>
              <td>{pokemon.base.defense}</td>
              <td>{pokemon.base.spAttack}</td>
              <td>{pokemon.base.spDefense}</td>
              <td>{pokemon.base.speed}</td>
            </tr>
          })}
          </tbody>
          <tfoot>

          </tfoot>
        </Table>
      </Container>
  );
}

export default App;
