import './style/App.css';
import {Button, ButtonGroup, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import Pokecard from "./components/Pokecard";

function App() {
  let [pokemons, setPokemons] = useState([]);
  let [pokemon, setPokemon] = useState(undefined);
  let [id, setId] = useState(undefined);
  let [pagination, setPagination] = useState({page: 0});
  let [search, setSearch] = useState("");

  let getPokemons = (search) => {
    axios.get("http://localhost:8080/pokemon?page=" + pagination.page + (search.length > 0 ? "&name=" + search : ""))
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
    getPokemons(search);
  };
  let onPrevious = () => {
    pagination.page--;
    getPokemons(search);
  };
  let onNext = () => {
    pagination.page++;
    getPokemons(search);
  };
  let onLast = () => {
    pagination.page = pagination.pages - 1;
    getPokemons(search);
  };

  let onSearch = () => {
    pagination.page = 0;
    getPokemons(search);
  }
  let onSelect = (pokemon) => {
    setPokemon(pokemon);
    setId(pokemon.id);
  }
  let onClose = () => {
    setId(undefined);
  }
  useEffect(() => getPokemons(search), []);

  return (
      <Container>
        {id?<Pokecard id={id} pokemon={pokemon} onClose={onClose}></Pokecard>:null}
        <Row>
          <Col>
            <h2 className="float-start my-3">Pokemons</h2>
          </Col>
          <Col>
            <div className="float-end my-3">
              <Form className="d-flex">
                <Form.Control id="search" type="search" placeholder="Search" className="me-2" aria-label="Search"
                              onChange={(event) => setSearch(event.target.value)}/>
                <Button onClick={onSearch}>Search</Button>
              </Form>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>Name</th>
                <th>Types</th>
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
                return <tr key={pokemon.id} onClick={()=>onSelect(pokemon)}>
                  <td><span id="name">{pokemon.name}</span></td>
                  <td>{pokemon.type.join(", ")}</td>
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
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonGroup>
              <Button variant="outline-secondary" onClick={onFirst} disabled={pagination.first}>&#8810;</Button>
              <Button id="previous" variant="outline-secondary" onClick={onPrevious}
                      disabled={pagination.first}>&#60;</Button>
              <Button id="pagination"
                      variant="outline-secondary">page {pagination.page + 1} of {pagination.pages}</Button>
              <Button id="next" variant="outline-secondary" onClick={onNext} disabled={pagination.last}>&#62;</Button>
              <Button variant="outline-secondary" onClick={onLast} disabled={pagination.last}>&#8811;</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
  );
}

export default App;
