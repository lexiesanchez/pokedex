import React, { Component } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

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
            <Image 
                src={props.image}  
                width={200}
                height={200}
                rounded />
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
            types: res.data.types.map(type => type.type.name)
        });
    }

    render() {
        return (
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
        )
    }
}
