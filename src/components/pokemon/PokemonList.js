import React, { Component } from 'react'
import axios from 'axios';
import PokemonCard from './PokemonCard'
import InfiniteScroll from "react-infinite-scroll-component"
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

const GroupContainer = styled.div `
    display: flex;
    align-items: center;
    margin: 0 auto;
`;

export default class PokemonList extends Component {
    state = {
        pokemonUrl: 'https://pokeapi.co/api/v2/pokemon/',
        typesUrl: 'https://pokeapi.co/api/v2/type/',
        pokemon: null,
        initialPokemon: null,
        pokemonCount: null,
        nextUrl: null,
        hasMore: true,
        types: [],
        selectedType: null,
        typeUrl: null
    };

    async componentDidMount() {
        const pokemon = await axios.get(this.state.pokemonUrl);
        this.setState({
            pokemon: pokemon.data['results'],
            initialPokemon: pokemon.data['results'],
            nextUrl: pokemon.data.next,
            pokemonCount: pokemon.data['results'].length
        });
        
        const types = await axios.get(this.state.typesUrl);
        this.setState({
            types: types.data['results'],
        });
    }

    fetchMoreData = async () => {
        if (this.state.selectedType) {
            return
        } else {
            if (this.state.nextUrl === null) {
            this.setState({ hasMore: false });
            return;
            } else {
                const res = await axios.get(this.state.nextUrl);
                this.setState({
                    pokemon: this.state.pokemon.concat(res.data['results']),
                    initialPokemon: this.state.pokemon.concat(res.data['results']),
                    nextUrl: res.data.next,
                    pokemonCount: this.state.pokemonCount + res.data['results'].length
                });
            }
        }
    }

    handleChange = async (eventType) => {
        let filteredPokemon = [];
        let getTypeUrl = this.state.types.find(type => type.name === eventType)
        let pokeType = await axios.get(getTypeUrl.url);
        console.log(pokeType.data.pokemon)
        pokeType.data.pokemon.map(pokemon => (
            filteredPokemon.push(pokemon.pokemon)
        ))
        this.setState({
            pokemon: filteredPokemon,
            initialPokemon: filteredPokemon,
            pokemonCount: filteredPokemon.length,
            selectedType: eventType
        });
    }
    
    handleSearch = async (event) => {
        let searchList = this.state.initialPokemon;
        let searchText = event.target.value.toLowerCase();
        searchList = searchList.filter(item => {
            return item.name.toLowerCase().indexOf(searchText) !== -1
        });

        this.setState({pokemon: searchList});
    }

    render() {
        return (
            <React.Fragment>
            <InputGroup className="filters">
                <GroupContainer>
                    <Row>
                    <Form.Control className="searchbar" type="text" placeholder="Search Pokemon" onChange={this.handleSearch}/>
                    <Dropdown>
                        <Dropdown.Toggle className="dropdown">
                            {this.state.selectedType ? (this.state.selectedType) : ('Select Type')} 
                        </Dropdown.Toggle>
                        {this.state.types ? 
                            (<Dropdown.Menu>
                                {this.state.types.map(type => (
                                    <Dropdown.Item 
                                        key={type.name}
                                        value={type.name}
                                        eventKey={type.name}
                                        onSelect={this.handleChange}>
                                            {type.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>) : (null)}
                    </Dropdown>
                    </Row>
                </GroupContainer>
            </InputGroup>
            <InfiniteScroll
                dataLength={this.state.pokemonCount}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}>
                {this.state.pokemon ? 
                    (<div className="row cards-container">
                        {this.state.pokemon.map(pokemon => (
                            <PokemonCard 
                                key = {pokemon.name}
                                name = {pokemon.name}
                                url = {pokemon.url}
                            />
                        ))}
                    </div>) : (null)}
            </InfiniteScroll>
            </React.Fragment>
        )
    }
}
