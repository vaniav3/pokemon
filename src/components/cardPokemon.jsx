import React from 'react'
import '../css/styles.css'

export default function CardPokemon(props){
    return (
        <>
            <div className='container'>
                {props.pokemons.map(pokemon => {
                    return (
                        <div className='card' key={pokemon.id}>
                            <img className='card-img' src={pokemon.image} alt={pokemon.name} />
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