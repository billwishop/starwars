import React, {useState} from 'react'

export const StarshipContext = React.createContext()

export const StarshipProvider = props => {
    const [starships, setStarships] = useState([])

    const getStarships = () => {
        return fetch("https://www.swapi.tech/api/starships?page=1&limit=36")
        .then(r => r.json())
        .then(setStarships)
    }

    return (
        <StarshipContext.Provider value={{getStarships, starships}}>
            {props.children}
        </StarshipContext.Provider>
    )
}