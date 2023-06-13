import './style/App.css';
import {Button, ButtonGroup, Container, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  let [pokemons, setPokemons] = useState([]);
  let [pagination, setPagination] = useState({page: 0});
  let getPokemons = () => {
    axios.get("http://localhost:8080/pokemon?page=" + pagination.page)
        .then(response => {
          setPokemons([...response.data.content]);
          setPagination({
            page: response.data.number,
            total: response.data.totalElements,
            pages: response.data.totalPages,
            first: response.data.first,
            last: response.data.last,
            start: response.data.number * response.data.size + 1,
            end: response.data.number * response.data.size + response.data.size,
          });
        })
        .catch(error => {
          console.log(error);
          //toast.error(error.message);
        });
  };
  let onFirst = () => {
    pagination.page = 0;
    getPokemons();
  };
  let onPrevious = () => {
    pagination.page--;
    getPokemons();
  };
  let onNext = () => {
    pagination.page++;
    getPokemons();
  };
  let onLast = () => {
    pagination.page = pagination.pages - 1;
    getPokemons();
  };

  useEffect(() => getPokemons(), []);

  return (
      <Container>
        <h2>Pokemons</h2>
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
        </Table>
        <div className="float-end">
          <ButtonGroup>
            <Button variant="outline-secondary" onClick={onFirst} disabled={pagination.first}>&#8810;</Button>
            <Button id="previous" variant="outline-secondary" onClick={onPrevious}
                    disabled={pagination.first}>&#60;</Button>
            <Button id="pagination" variant="outline-secondary">page {pagination.page+1} of {pagination.pages}</Button>
            <Button id="next" variant="outline-secondary" onClick={onNext} disabled={pagination.last}>&#62;</Button>
            <Button variant="outline-secondary" onClick={onLast} disabled={pagination.last}>&#8811;</Button>
          </ButtonGroup>
        </div>
      </Container>
  );
}

export default App;
