import React, {useState,useEffect} from 'react';

function SearchedPokemon(props){
    //console.log('pokemon details',props.pokemon);


    

        //const style =  pokemonUnit.types[0].type.name + " pokemon_thumbnails";
        
    return(
        <>
        <body className = 'pokemon_section'>
        <div className = {props.pokemon.types && `${props.pokemon.types[0].type.name} pokemon_thumbnails`}>
            {props.pokemon.id >=100 && <h2>#{props.pokemon.id}</h2>}
            {props.pokemon.id < 10 && <h2>#00{props.pokemon.id}</h2> }  
            {props.pokemon.id >= 10 && props.pokemon.id <100 && <h2>#0{props.pokemon.id}</h2>}  
        
            <h2>{props.pokemon.name.slice(0,1).toUpperCase().concat(props.pokemon.name.slice(1,props.pokemon.name.length))}</h2>
            {props.pokemon.sprites &&<img className = "pokemon_img" src= {props.pokemon.sprites.other["official-artwork"].front_default} alt = {props.pokemon.name} />}
            {props.pokemon.types && <h2>type: {props.pokemon.types[0].type.name}</h2>}
        </div>
        </body>
        </>
    );
}

export default SearchedPokemon;