import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import PokemonCard from './PokemonCard'
import InfiniteScroll from "react-infinite-scroll-component"
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const GroupContainer = styled.div `
    align-items: center;
    margin: 0 auto;
    margin-top: 1rem;
`;
  
export default class PokemonList extends Component {
    state = {
        pokemonUrl: 'https://pokeapi.co/api/v2/pokemon/',
        typesUrl: 'https://pokeapi.co/api/v2/type/',
        allPokemonsUrl: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=964',
        showModal: false,
        allPokemons: null,
        pokemon: null,
        initialPokemon: null,
        pokemonCount: null,
        nextUrl: null,
        hasMore: true,
        selectedType: null,
        typeUrl: null,
        types: [{
            name: 'All types',
            url: null
        }]
    };

    async componentDidMount() {
        // get custom pokemons in localStorage
        let key, value
        let tempArr = []
  
        for (let i=0; i<localStorage.length; i++) {
          key = localStorage.key(i);        
          value = localStorage.getItem(key);    
          tempArr.push(JSON.parse(value));   
          this.setState({ customPokemons: tempArr })
        }
        
        // fetch pokemons
        const pokemon = await axios.get(this.state.pokemonUrl);
        this.setState({
            pokemon: pokemon.data['results'],
            initialPokemon: pokemon.data['results'],
            nextUrl: pokemon.data.next,
            pokemonCount: pokemon.data['results'].length
        });
        //fetch types
        const types = await axios.get(this.state.typesUrl);
        this.setState({
            types: this.state.types.concat(types.data['results']),
        });
    }

    UNSAFE_componentWillMount() {        
        this.handleSearch.cancel();
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
        if (eventType === 'All types') {
            const pokemon = await axios.get(this.state.pokemonUrl);
            this.setState({
                pokemon: pokemon.data['results'],
                nextUrl: pokemon.data.next,
                pokemonCount: pokemon.data['results'].length,
                selectedType: null
            });            
        } else {
            let filteredPokemon = [];
            let getTypeUrl = this.state.types.find(type => type.name === eventType)
            let pokeType = await axios.get(getTypeUrl.url);
            pokeType.data.pokemon.map(pokemon => (
                filteredPokemon.push(pokemon.pokemon)
            ))
            this.setState({
                pokemon: filteredPokemon,
                pokemonCount: filteredPokemon.length,
                selectedType: eventType
            });
        }
    }

    handleSearch = debounce((text) => {
        if (text) {
            this.searchAllPokemon(text.toLowerCase())
        } else {            
            this.setState({pokemon: this.state.initialPokemon});
        }
    }, 500);

    searchAllPokemon = async (text) => {        
        const res = await axios.get(this.state.allPokemonsUrl);
        this.setState({
            allPokemons: res.data['results'],
            pokemonCount: res.data['results'].length
        });
        let searchList = this.state.allPokemons;
        
        searchList = searchList.filter(item => {
            return item.name.toLowerCase().indexOf(text) !== -1
        });

        this.setState({pokemon: searchList});
    }     

    render() {
        return (
            <React.Fragment>
            <InputGroup className="filters">
                <GroupContainer>
                    <Row>
                    <Form.Control className="searchbar" 
                        type="text" 
                        placeholder="Search Pokemon" 
                        onChange={e => this.handleSearch(e.target.value)}/>
                    <Dropdown className="dropdownDiv">
                        <Dropdown.Toggle className="dropdown">
                            {this.state.selectedType ? (this.state.selectedType) : ('All types')} 
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
                    <Link to="AddPokemon">
                        <Button variant="secondary" className="btnAdd">
                            Add Pokemon
                        </Button>
                    </Link>
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
