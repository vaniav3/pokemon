import {useEffect, useState} from 'react';
import '../css/styles.css'
import CardPokemon from './cardPokemon';

export default function GetPokemonEvolution () {

    const [pokemon, setPokemon] = useState([]);

    async function fetchData (){  
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain?limit=470`)
            const data = await response.json()
            const urlEvolution = data.results.map(data => data.url)
            let list = []
            const listPokemonName = await Promise.all(
                urlEvolution.map(async url => {
                    const response = await fetch(url)
                    const data = await response.json()
                    data.chain.evolves_to.length > 0 ? 
                        data.chain.evolves_to.map(data => {
                            data.evolves_to.length > 0 ? 
                                data.evolves_to.map(data => {
                                    list.push(data.species.name)
                                })
                            :
                            list.push(data.species.name)
                        })
                        
                    :
                    list.push(data.chain.species.name)
                    
                })
            )

            const listPokemon = await Promise.all(
                list.map(async name => {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                    const data = await response.json()
                    const newPokemon = {
                        id: data.id,
                        name : data.name,
                        image: data.sprites.other.home.front_default,
                        weight: data.weight,
                        type: data.types.map(data => data.type.name)
                    }
                    setPokemon( prev => [...prev, newPokemon])
                })  
            );
        } 
        catch (e) {
            console.error(e)
        }   
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className="header">
                <h1 className='title'>Pokédex </h1>  
                <h3> Pokemons sin evolución</h3>
            </div>
            {
                pokemon.length > 0 ?
                        <CardPokemon pokemons={pokemon} />
                :
                <h1>Loading...</h1>
            }
        </>
        
    )
}

