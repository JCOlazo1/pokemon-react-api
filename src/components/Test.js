import React, { useState } from 'react'
import { produce } from 'immer'
import { generate } from 'shortid'

const Test = () => {
    const [pokemon, setPokemon] = useState([{ id: "1", name: "Pikachu" }]);
    const [count, setCount] = useState(0);

    const nextPokemon = () => {
        setPokemon(currentMon => [
            ...currentMon,
            {
                id: generate(),
                name: ""
            }
        ])
        setCount(() => count + 1);
    }

    return (
        <div style={{ textAlign: "center" }}>
            
            <button onClick={nextPokemon}>Add Pokemon</button> 
            {pokemon.map((p, index) => {
                return (
                    <div key={p.id}>
                        <input onChange={(e) => {
                            /* USING IMMER */
                            const localName = e.target.value;
                            setPokemon((currentMon) => 
                                produce(currentMon, (value) => {
                                    value[index].name = localName;
                                })
                            );
                        }} 
                        value={p.name} 
                        placeholder="name of pokemon"
                    />
                    <button onClick={() => {
                        setPokemon(currentMon => currentMon.filter(x => x.id !== p.id)) // HOW TO DELETE A SINGLE ROW
                    }} >x</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Test
