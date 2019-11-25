import React, { Component } from 'react'
import axios from 'axios';
import PokemonCard from './PokemonCard'
import InfiniteScroll from "react-infinite-scroll-component"

export default class PokemonList extends Component {
    state = {
        url: 'https://pokeapi.co/api/v2/pokemon/',
        pokemon: null,
        pokemonCount: null,
        nextUrl: null,
        hasMore: true
    };

    async componentDidMount() {
        const res = await axios.get(this.state.url);
        this.setState({
            pokemon: res.data['results'],
            nextUrl: res.data.next,
            pokemonCount: res.data['results'].length
        });
    }

    fetchMoreData = async () => {
        if (this.state.pokemonCount === 964) {
          this.setState({ hasMore: false });
          return;
        } else {
            const res = await axios.get(this.state.nextUrl);
            this.setState({
                pokemon: this.state.pokemon.concat(res.data['results']),
                nextUrl: res.data.next,
                pokemonCount: this.state.pokemonCount + res.data['results'].length
            });
        }
    }

    render() {
        return (
            <React.Fragment>
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
