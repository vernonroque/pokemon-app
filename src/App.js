
import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonThumbnail from './pokemonthumbnail'; 
//import Search from './search';
import SearchedPokemon from './searchedPokemon';


function App() {
  const [pokemon,setPokemon] = useState([]);
  const [loadMore,setLoadMore] = useState('');
  const [isEntry,setIsEntry] = useState(false);
  const [entry,setEntry] = useState('');
  const [specificPokemon,setSpecificPokemon] = useState([]);
  

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

  const fetchSpecific = async() => {

    if(entry)
      {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+entry);

          if(response.ok){
            const jsonResponse = await response.json();
      
          setSpecificPokemon(jsonResponse);
          //console.log('jsonResponse',jsonResponse);
          }
      }

    // if(isEntry){
       
    //     // setIsEntry(false);
    //   }
    
  }

  fetchPokemon();
  fetchSpecific();

  //console.log('specific pokemon', specificPokemon);
  
},[entry, isEntry, specificPokemon]);

function onHandleEntry(event){
    setEntry(event.target.value);
}

function handleSubmit(e){

    e.preventDefault();
    setIsEntry(true);
    setEntry('');

    
        // console.log('entry',entry);
        // console.log('specificPokemon',specificPokemon);
        // if(!specificPokemon){
        //   console.log('no specific pokemon');
        // }
}
   


// console.log(pokemon);
// console.log('loadMore', loadMore);

  return (
    <>
    <header className = 'header'>
      <h1>Pokedex</h1>
      <form onSubmit={handleSubmit}>
            <input className ='search' type='text' value={entry} onChange={onHandleEntry} placeholder="Search..."/>
        </form>
    </header>
     <div className ='pokemon_section' >
    { isEntry ? <SearchedPokemon pokemon = {specificPokemon}/> :
      pokemon.length && pokemon.map((element,index)=> {
       return  <PokemonThumbnail  key = {index} pokemon = {element} />
      })
    }
    </div>
    {isEntry ? '' :
    <section className = 'button_section'>
  <button className = 'button' onClick = {fetchMore}>Load More</button>
  </section>
    }
    </>

  );
}

export default App;
// isEntry? <PokemonThumbnail pokemon={specificPokemon}/> :