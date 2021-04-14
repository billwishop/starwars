import React, {useState} from 'react'

export const SpeciesContext = React.createContext()

export const SpeciesProvider = props => {
    const [species, setSpecies] = useState([])

    const getSpecies = () => {
        return fetch("https://www.swapi.tech/api/species")
        .then(r => r.json())
        .then(setSpecies)
    }

    return (
        <SpeciesContext.Provider value={{getSpecies, species}}>
            {props.children}
        </SpeciesContext.Provider>
    )
}