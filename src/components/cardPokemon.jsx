import React from 'react'

export default function CardPokemon(props){
    return (
        <>
            <div className='container'>
                {props.pokemons.map(pokemon => {
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