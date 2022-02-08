
import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonThumbnail from './pokemonthumbnail'; 
import Search from './search';


function App() {
  const [pokemon,setPokemon] = useState([]);
  const [loadMore,setLoadMore] = useState('');
  

  const fetchPokemon = async () =>{

    const fetchNewPokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    const jsonResults = await fetchNewPokemon.json();
    setPokemon(jsonResults.results);
    setLoadMore(jsonResults.next);
  
  } 

  const fetchMore = async() => {
    const fetchMorePokemon = await fetch(loadMore);
    const jsonResults = await fetchMorePokemon.json();
    const updatedPokemonArr = jsonResults.results;

    setLoadMore(jsonResults.next);

    for (let i =0 ; i<updatedPokemonArr.length; i++){
      setPokemon((pokemon) => [...pokemon,updatedPokemonArr[i]]);
    }

  }
  
  
useEffect(()=>{

  fetchPokemon();
  
},[]);

// console.log(pokemon);
// console.log('loadMore', loadMore);

 
  return (
    <>
    <header className = 'header'>
      <h1>Pokedex</h1>
     <Search/>
    </header>
     <body className ='pokemon_section' >
    {
      pokemon.length && pokemon.map((element,index)=> {
       return  <PokemonThumbnail  key = {index} pokemon = {element} />
      })
    }
    </body>
    <section className = 'button_section'>
  <button className = 'button' onClick = {fetchMore}>Load More</button>
  </section>
    </>

  );
}

export default App;
