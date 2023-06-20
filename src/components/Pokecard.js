import {Button, Col, Container, Form, Image, Modal, Row, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

function Pokecard(props) {
  let [loading, setLoading] = useState(true);
  let [pokemon, setPokemon] = useState(props.pokemon);

  let getPokemon = (id) => {
    axios.get("https://pokeapi.co/api/v2/pokemon/" + props.id)
        .then(response => {
          setPokemon({...pokemon, ...response.data});
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          //toast.error(error.message);
        });
  };

  let onClose = () => {
    props.onClose();
  }

  useEffect(() => getPokemon(props.id), []);

  return <Modal show={typeof pokemon !== 'undefined'} size="lg">
    <Modal.Header>
      <Modal.Title>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Container>
        <Row className="align-items-center">
          <Col>
            {loading?<Spinner/>:<Image src={pokemon.sprites.other["official-artwork"].front_default} style={{maxWidth: "500px" ,maxHeight: "500px"}}></Image>}
          </Col>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" className="me-2" aria-label="Name" readOnly
                              value={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Types</Form.Label>
                <Form.Control type="text" placeholder="Name" className="me-2" aria-label="Types" readOnly
                              value={pokemon.type.join(", ")}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>HP</Form.Label>
                <Form.Control type="text" placeholder="Name" className="me-2" aria-label="Name" readOnly
                              value={pokemon.base.hp}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Attack</Form.Label>
                <Form.Control type="text" placeholder="Name" className="me-2" aria-label="Name" readOnly
                              value={pokemon.base.attack}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Defense</Form.Label>
                <Form.Control type="text" placeholder="Name" className="me-2" aria-label="Name" readOnly
                              value={pokemon.base.defense}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Speed</Form.Label>
                <Form.Control type="text" placeholder="Name" className="me-2" aria-label="Name" readOnly
                              value={pokemon.base.speed}/>
              </Form.Group>

            </Form>
          </Col>
        </Row>
      </Container>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>Close</Button>
    </Modal.Footer>
  </Modal>;
}

export default Pokecard;