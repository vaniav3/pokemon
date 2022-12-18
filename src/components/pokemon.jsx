import {useEffect, useState} from 'react';
import '../style.css';

export default function GetPokemonEvolution () {

    const [pokemon, setPokemon] = useState([]);

    async function fetchData (){  
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain?limit=468`)
            const data = await response.json()
            const urlEvolution = data.results.map(data => data.url)
            const list = await Promise.all(
                urlEvolution.map(async url => {
                    const response = await fetch(url)
                    const data = await response.json()
                    if(data.chain.evolves_to.length == 0){
                        const response_list = await fetch('https://pokeapi.co/api/v2/pokemon/' + data.chain.species.name)
                        const data_list = await response_list.json()
                        const newPokemon = {
                            id: data_list.id,
                            name : data_list.name,
                            image: data_list.sprites.other.home.front_default,
                            weight: data_list.weight
                        }
                        setPokemon( prev => [...prev, newPokemon]) 
                    }
                })
            )
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
            <h1 className='title'>Pokédex </h1>   
            <h3>Pokemons sin evolución</h3>
            <div className='container'>
                {pokemon && pokemon.map(pokemon => {
                    console.log(pokemon.id)
                    return (
                        <div className='card' key={pokemon.id}>
                            <img className='img' src={pokemon.image} alt={pokemon.name} />
                            <div className='card-text'>
                                <h2 >{pokemon.name}</h2>
                                <p>Weight: {pokemon.weight}</p>
                            </div>
                        </div>
                    )
                })}
            </div> 
            
        </>

    )
}

