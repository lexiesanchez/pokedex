import React, { Component } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ProgressBar from 'react-bootstrap/ProgressBar'

const TYPE_COLORS = {
  Normal: 'A8A77A',
  fire: 'EE8130',
  water: '6390F0',
  electric: 'F7D02C',
  grass: '7AC74C',
  ice: '96D9D6',
  fighting: 'C22E28',
  poison: 'A33EA1',
  ground: 'E2BF65',
  flying: 'A98FF3',
  psychic: 'F95587',
  bug: 'A6B91A',
  rock: 'B6A136',
  ghost: '735797',
  dragon: '6F35FC',
  dark: '705746',
  steel: 'B7B7CE',
  fairy: 'D685AD',
};

function PokeProfileModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          #{props.pokeindex} {props.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <Image 
                  src={props.image}  
                  width={200}
                  height={200}
                  rounded />
            </Col>
            {/* <Col xs={6} md={4}>
              {props.stats ? props.stats.map(stat =>(               
                <ProgressBar now={stat.base_stat} label={`${stat.stat.name}%`} />
              )) : null}
            </Col> */}
            <Col xs={6} md={4}>
              <code>.col-xs-6 .col-md-4</code>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={6} md={4}>
              {props.types ? props.types.map(type =>( 
                <Badge pill 
                  key={type}
                  style={{backgroundColor: `#${TYPE_COLORS[type]}`,
                    padding: '8px 8px',
                    color: 'white'}}>
                    {type}
                </Badge>
              )) : null}
            </Col>
            <Col xs={6} md={4}>
              <code>.col-xs-6 .col-md-4</code>
            </Col>
            <Col xs={6} md={4}>
              <code>.col-xs-6 .col-md-4</code>
            </Col>
          </Row>
        </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default class PokemonCard extends Component {
    state = {
      url: this.props.url,
      name: this.props.name,
      pokeData: '',
      image: '',
      pokeIndex: '',
      height: '',
      weight: '',
      abilities: '',
      types: [],
      description: '',
      stats: {},
      showModal: false
    }

    async componentDidMount() {
        const res = await axios.get(this.state.url);
        this.setState({
            //pokeData: res.data,
            image: res.data.sprites.front_default,
            pokeIndex: res.data.id,
            height: res.data.height,
            weight: res.data.weight,
            stats: res.data.stats,
            types: res.data.types.map(type => type.type.name),
            abilities: res.data.abilities.map(ability => ability.ability.name)
        });
        console.log(this.state.stats)
    }

    render() {
        return (
          <React.Fragment>
            <div className="col-md-3 col-sm-6 mb-5">
                  <CardDeck>
                      <Card className="text-center" onClick={() => this.setState({ showModal: true })}>
                          <Card.Img variant="top" src={this.state.image} />
                          <Card.Header>{this.state.name}</Card.Header>
                      </Card>
                  </CardDeck>

                <PokeProfileModal
                    show = {this.state.showModal}
                    onHide = {() => this.setState({ showModal: false })}
                    image = {this.state.image}
                    pokeindex = {this.state.pokeIndex}
                    name = {this.state.name}
                    types = {this.state.types}
                    stats = {this.state.stats}
                />
            </div>
          </React.Fragment>
        )
    }
}
