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
            {props.name}
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
            <Col xs={6} md={4}>
              <code>.col-xs-6 .col-md-4</code>
            </Col>
            <Col xs={6} md={4}>
              <code>.col-xs-6 .col-md-4</code>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={6} md={4}>
              <code>.col-xs-6 .col-md-4</code>
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
      types: [],
      showModal: false,
    }

    async componentDidMount() {
        const res = await axios.get(this.state.url);
        console.log(res.data)
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
                    name = {this.state.name}
                />
            </div>
          </React.Fragment>
        )
    }
}
