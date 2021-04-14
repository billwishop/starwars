import React, {useState} from 'react'

export const FilmContext = React.createContext()

export const FilmProvider = props => {
    const [films, setFilms] = useState([])

    const getFilms = () => {
        return fetch("https://www.swapi.tech/api/films")
        .then(r => r.json())
        .then(setFilms)
    }

    return (
        <FilmContext.Provider value={{getFilms, films}}>
            {props.children}
        </FilmContext.Provider>
    )
}