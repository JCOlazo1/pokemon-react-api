import React, { useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import {produce} from 'immer'

const API = () => {
    const [pokemon, setPokemon] = useState(""); // changes the Pokemon's name
    const [pokeData, setPokeData] = useState([]); // holds JSON of Pokemon data
    const [party, setParty] = useState([]); // holds the user's party
    const [isClicked, setIsClicked] = useState(false); // workaround for 'add to party'
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

    const getData = async () => {
        const res = await axios.get(url);
        console.log(res.data)
        setPokeData(res.data);   
    };

    const submitNameNo = (event) => {
        event.preventDefault();

        if (pokemon === "") {
            alert("Type a Pokemon's name or Pokedex Number")
        } else {
            getData(); // API Call
            setIsClicked(true);
        }
       
    }

    const choosePokemon = (event) => {
        setPokemon(event.target.value.toLowerCase())
    }

    const capitalize = (word) => {
        if(typeof word !== 'string') {
            return '';
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    // isEmpty is used as a safety net. w/out isEmpty, the page will crash w/ an error.
    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    const getSprite = () => {
        return(
            <div>
                <img src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokeData.name}.gif`} alt="pokemon" />
            </div>
        );
    } 
    const lockSprite = (name) => {
        return(
            <div>
                <img src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${name}.gif`} alt="pokemon" />
            </div>
        )
    }

    const addToParty = () => {
        if (party.length >= 6) {
            alert("Your party is full!");
        } else {
            const team = party.concat({ name: pokeData.name, id: uuidv4() })
            console.log(team);
            setParty(team);
            setPokemon("");
            setIsClicked(false);
        }
    }

    const ClearAll = () => {
        setParty([]);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Pokémon Team Builder</h1>
            <input 
                type="text"
                placeholder="Name or Pokedex No."
                onChange={choosePokemon}
                value={pokemon}
            />
{/* USE party.length to count for party size */}
            <button onClick={submitNameNo}>View</button>
            { isClicked && <button onClick={addToParty}>Add to Party</button> }
            <hr />
            {!isEmpty(pokeData) && <ShowData 
                name={capitalize(pokeData.name)}
                types={pokeData.types.map(data => {
                    return(
                        <li>{capitalize(data.type.name)}</li>
                    )
                })}
                sprite={getSprite()}
            />
            }
            <br />
            <hr />

            {<DisplayTeam 
                className="party-card"
                party={party.map((item) => (
                    <p key={item.id}>
                        {capitalize(item.name)}
                        {lockSprite(item.name)}
                    </p>
                ))}
            />}
            {!isEmpty(party) && <button onClick={ClearAll}>Clear Party</button>}
        </div>
    )
}

const ShowData = ({name, types, sprite}) => {
    return (
        <>
        <p>Name: {name}</p>
        <p>Type(s): {types}</p>
        <p>{sprite}</p>
        </>
    );
}

const DisplayTeam = ({party, sprite}) => {
    return (
        <>
        Your Party: {party}
        {sprite}
        </>
    )
}

export default API

// https://pokeapi.co/api/v2/pokemon/{id or name}
// https://img.pokemondb.net/sprites/black-white/anim/normal/${pokeData.name}.gif
