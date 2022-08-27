import React, {useState,useEffect} from 'react';

function PokemonThumbnail({pokemon}) {
    const [pokemonUnit, setPokemonUnit] = useState([]);


    const pokemonDetails = async()=> {

        const fetchDetails = await fetch(`${pokemon.url}`);
        const jsonResults = await fetchDetails.json();
        setPokemonUnit(jsonResults);
    }

    useEffect(() => {
        pokemonDetails();
    },[]);

    //console.log(pokemonUnit);


        //const style =  pokemonUnit.types[0].type.name + " pokemon_thumbnails";
        
    return(
        <>
        <body className = 'pokemon_section'>
        <div className = {pokemonUnit.types && `${pokemonUnit.types[0].type.name} pokemon_thumbnails`}>
            {pokemonUnit.id >=100 && <h2>#{pokemonUnit.id}</h2>}
            {pokemonUnit.id < 10 && <h2>#00{pokemonUnit.id}</h2> }  
            {pokemonUnit.id >= 10 && pokemonUnit.id <100 && <h2>#0{pokemonUnit.id}</h2>}  
        
            <h2>{pokemon.name.slice(0,1).toUpperCase().concat(pokemon.name.slice(1,pokemon.name.length))}</h2>
            {pokemonUnit.sprites &&<img className = "pokemon_img" src= {pokemonUnit.sprites.other["official-artwork"].front_default} alt = {pokemon.name} />}
            {pokemonUnit.types && <h2>type: {pokemonUnit.types[0].type.name}</h2>}
        </div>
        </body>
        </>
    );
}

export default PokemonThumbnail;