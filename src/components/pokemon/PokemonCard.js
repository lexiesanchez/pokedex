import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Figure from 'react-bootstrap/Figure'
import FigureImage from 'react-bootstrap/FigureImage'
import FigureCaption from 'react-bootstrap/FigureCaption'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ProgressBar from 'react-bootstrap/ProgressBar'
import ListGroup from 'react-bootstrap/ListGroup'

const Bar = styled.div `
    padding-top: 0.5rem;
`;

const TYPE_COLORS = {
  normal: 'A8A77A',
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
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          #{props.pokeindex} {props.name}
          </Modal.Title>
            <div className="float-right">
              {props.types ? props.types.map(type =>( 
                <Badge pill 
                  key={type}
                  style={{backgroundColor: `#${TYPE_COLORS[type]}`,
                    padding: '10px 10px',
                    color: 'white'}}>
                    {type}
                </Badge>
              )) : null}
            </div>
        </Modal.Header>
        <Modal.Body>
        <Container>
          <Row className="justify-content-center">
            <Col lg={true}>
              <Image fluid
                  src={props.image}  
                  width={200}
                  height={200}
                  rounded />
            </Col>
            <Col lg={true}>                
                <Bar><ProgressBar striped now={props.stats.hp} label={`HP ${props.stats.hp}%`}/></Bar>
                <Bar><ProgressBar striped now={props.stats.attack} label={`ATTACK ${props.stats.attack}%`}/></Bar>
                <Bar><ProgressBar striped now={props.stats.defense} label={`DEFENSE ${props.stats.defense}%`}/></Bar>
                <Bar><ProgressBar striped now={props.stats.speed} label={`SPEED ${props.stats.speed}%`}/></Bar>
                <Bar><ProgressBar striped now={props.stats.specialAttack} label={`SPECIAL ATK ${props.stats.specialAttack}%`}/></Bar>
                <Bar><ProgressBar striped now={props.stats.specialDefense} label={`SPECIAL DEF ${props.stats.specialDefense}%`}/></Bar>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col lg={true} className="mt-5">   
              <ListGroup>
                <ListGroup.Item>height: {props.height}</ListGroup.Item>
                <ListGroup.Item>weight: {props.weight}</ListGroup.Item>
                <ListGroup.Item>base exp: {props.base_exp}</ListGroup.Item>
                <ListGroup.Item>base happiness: {props.base_happiness}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col lg={true} className="mt-5">   
              <ListGroup>
                <ListGroup.Item>capture rate: {props.capture_rate}</ListGroup.Item>
                <ListGroup.Item>habitat: {props.habitat}</ListGroup.Item>
                <ListGroup.Item>abilities: {props.abilities}  </ListGroup.Item>
                <ListGroup.Item>egg groups: {props.egg_groups}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
        <div>          
          <h5 className="mt-5 mx-auto">Evolution Chain</h5>
        </div>
        {props.second_evo_image ? (
          <Container>
          <Row className="justify-content-center">
            <Col lg={true}>
            <Figure>
              <Figure.Image
                  src={props.first_evo_image}  
                  width={200}
                  height={200}
              />
              <Figure.Caption className="text-center">
                {props.first_evo_name} 
              </Figure.Caption>
            </Figure>
            </Col>
            <Col lg={true}>
            <Figure>
              <Figure.Image
                  src={props.second_evo_image}  
                  width={200}
                  height={200}
              />
              <Figure.Caption className="text-center">
                {props.second_evo_name} 
              </Figure.Caption>
            </Figure>
            </Col>
            {props.third_evo_image ? (
              <Col lg={true}>
              <Figure>
                <Figure.Image
                    src={props.third_evo_image}  
                    width={200}
                    height={200}
                />
                <Figure.Caption className="text-center">
                  {props.third_evo_name} 
                </Figure.Caption>
              </Figure>
            </Col>
            ) : (null)}              
          </Row>
          </Container>
        ) : ('NO EVOLUTION')}          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default class PokemonCard extends Component {
    state = {
      showModal: false,
      url: this.props.url,
      name: this.props.name,
      speciesUrl: '',
      evolutionUrl: '',
      image: '',
      pokeIndex: '',
      height: '',
      weight: '',
      base_exp: '',
      abilities: '',
      types: [],
      stats: {
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        specialAttack: '',
        specialDefense: '',
      },
      base_happiness: '',
      capture_rate: '',
      egg_groups: '',
      habitat: '',
      first_evo: '',
      first_evo_name: '',
      first_evo_image: '',
      second_evo: '',
      second_evo_name: '',
      second_evo_image: '',
      third_evo: '',
      third_evo_name: '',
      third_evo_image: '',
    }

    async componentDidMount() {
        // fetch basic profile
        const res = await axios.get(this.state.url);

        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';
    
        res.data.stats.map(stat => {
          switch (stat.stat.name) {
            case 'hp':
              hp = stat['base_stat'];
              break;
            case 'attack':
              attack = stat['base_stat'];
              break;
            case 'defense':
              defense = stat['base_stat'];
              break;
            case 'speed':
              speed = stat['base_stat'];
              break;
            case 'special-attack':
              specialAttack = stat['base_stat'];
              break;
            case 'special-defense':
              specialDefense = stat['base_stat'];
              break;
            default:
              break;
          }
        });

        this.setState({
            image: res.data.sprites.front_default,
            pokeIndex: res.data.id,
            height: res.data.height,
            weight: res.data.weight,
            base_exp: res.data.base_experience,
            stats: {
              hp,
              attack,
              defense,
              speed,
              specialAttack,
              specialDefense
            },
            types: res.data.types.map(type => type.type.name),
            abilities: res.data.abilities.map(ability => ability.ability.name),
            speciesUrl: res.data.species.url
        });

        // clean object
        if (this.state.abilities.length > 1) {
          this.setState({
            abilities: this.state.abilities.join(', ')
          })
        }

        // get species
        const species_res = await axios.get(this.state.speciesUrl);

        this.setState({
          base_happiness: species_res.data.base_happiness,
          capture_rate: species_res.data.capture_rate,
          egg_groups: species_res.data.egg_groups.map(egg => egg.name),
          habitat: species_res.data.habitat ? species_res.data.habitat.name : null,
          evolutionUrl: species_res.data.evolution_chain.url
        });

        // clean object
        if (this.state.egg_groups.length > 1) {
          this.setState({
            egg_groups: this.state.egg_groups.join(', ')
          })
        }
        
        // get evolution chain
        if (this.state.evolutionUrl) {
          const evolution_res = await axios.get(this.state.evolutionUrl);
          console.log(evolution_res)

          this.setState({
            first_evo: evolution_res.data.chain.species ? evolution_res.data.chain.species : null,
            second_evo: evolution_res.data.chain.evolves_to[0] ? evolution_res.data.chain.evolves_to[0].species : null,
            third_evo: (evolution_res.data.chain.evolves_to[0] && evolution_res.data.chain.evolves_to[0].evolves_to[0]) ? evolution_res.data.chain.evolves_to[0].evolves_to[0].species : null,
          });

          if (this.state.first_evo) {
            const first_evo_res = await axios.get(this.state.first_evo.url);
            let first_evo_id = first_evo_res.data.id
            // get pokemon evolution
            let first_evo_url = `https://pokeapi.co/api/v2/pokemon/${first_evo_id}`
            const first_evo_profile = await axios.get(first_evo_url);
            this.setState({
              first_evo_name: first_evo_profile.data.name,
              first_evo_image: first_evo_profile.data.sprites.front_default
            })
          }

          if (this.state.second_evo) {
            const second_evo_res = await axios.get(this.state.second_evo.url);
            let second_evo_id = second_evo_res.data.id
            // get pokemon evolution
            let second_evo_url = `https://pokeapi.co/api/v2/pokemon/${second_evo_id}`
            const second_evo_profile = await axios.get(second_evo_url);
            this.setState({
              second_evo_name: second_evo_profile.data.name,
              second_evo_image: second_evo_profile.data.sprites.front_default
            })
          }

          if (this.state.third_evo) {
            const third_evo_res = await axios.get(this.state.third_evo.url);
            let third_evo_id = third_evo_res.data.id
            // get pokemon evolution
            let third_evo_url = `https://pokeapi.co/api/v2/pokemon/${third_evo_id}`
            const third_evo_profile = await axios.get(third_evo_url);
            this.setState({
              third_evo_name: third_evo_profile.data.name,
              third_evo_image: third_evo_profile.data.sprites.front_default
            })
          }

        }
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
                    pokeindex = {this.state.pokeIndex}
                    name = {this.state.name}
                    image = {this.state.image}
                    height = {this.state.height}
                    weight = {this.state.weight}
                    types = {this.state.types}
                    stats = {this.state.stats}
                    abilities = {this.state.abilities}
                    base_exp = {this.state.base_exp}
                    base_happiness = {this.state.base_happiness}
                    capture_rate = {this.state.capture_rate}
                    egg_groups = {this.state.egg_groups}
                    habitat = {this.state.habitat}
                    first_evo_name = {this.state.first_evo_name}
                    first_evo_image = {this.state.first_evo_image}
                    second_evo_name = {this.state.second_evo_name}
                    second_evo_image = {this.state.second_evo_image}
                    third_evo_name = {this.state.third_evo_name}
                    third_evo_image = {this.state.third_evo_image}
                />
            </div>
          </React.Fragment>
        )
    }
}
