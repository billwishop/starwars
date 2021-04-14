import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { FilmContext } from '../../components/FilmDataProvider'
import { StarshipContext } from '../../components/ShipDataProvider'
import { SpeciesContext } from '../../components/SpeciesDataProvider'
import { getAllCharacterIds, getCharacterData } from '../../lib/characters'

export default function CharacterDetails({ characterData }) {
    console.log({characterData})
    const {getFilms, films} = useContext(FilmContext)
    const {getStarships, starships} = useContext(StarshipContext)
    const {getSpecies, species} = useContext(SpeciesContext)

    const [characterFilms, setCharacterFilms] = useState([])

    useEffect(() => {
        getFilms()
        .then(getStarships)
        .then(getSpecies)
    }, [])
    
    console.log({starships})
    // console.log({species})

    // responsible for finding what films the character was in 
    // and setting the state variable
    useEffect(() => {
        if (films.result) {
        const myFilms = films.result.filter(film => {
            return film.properties.characters.includes(characterData.result.properties.url)
        })
        setCharacterFilms(myFilms)}
    }, [films])




    return (
        <>
            <h1>{characterData.result.properties.name}</h1>
            <h3>About me:</h3>
            <ul>
                <li>Height: {characterData.result.properties.height}</li>
                <li>Mass: {characterData.result.properties.mass}</li>
                <li>Birth Year: {characterData.result.properties.birth_year}</li>

               <li>*******Species: filter and find species*********</li> 
            </ul>

            <h3>Films I Appeared In:</h3>
            <ul>
                {characterFilms.length > 0 
                && 
                    characterFilms.map(film => {
                        return <li>{film.properties.title}</li>
                    })
                }
            </ul>


            <small>
            <Link href="/">
                <a>Back to home &rarr;</a>
            </Link>
            </small>
        </>
    )
}

export async function getStaticPaths() {
    const paths = await getAllCharacterIds()
        return {
            paths,
            fallback: true
        }
    
}

export async function getStaticProps({ params }) {
    const characterData = await getCharacterData(params.id)
    return {
        props: {
            characterData
        }
    }
}