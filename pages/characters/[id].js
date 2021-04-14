import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { FilmContext } from '../../components/FilmDataProvider'
import { StarshipContext } from '../../components/ShipDataProvider'
import { SpeciesContext } from '../../components/SpeciesDataProvider'
import { getAllCharacterIds, getCharacterData } from '../../lib/characters'

export default function CharacterDetails({ characterData }) {
    console.log(characterData)
    const {getFilms, films} = useContext(FilmContext)
    const {getStarships, starships} = useContext(StarshipContext)
    const {getSpecies, species} = useContext(SpeciesContext)

    useEffect(() => {
        getFilms()
        .then(getStarships)
        .then(getSpecies)
    }, [])
    console.log(films)
    console.log(starships)
    console.log(species)
    return (
        <>
            <h1>{characterData.result.properties.name}</h1>
            <h3>About me:</h3>
            <ul>
                <li>Height: {characterData.result.properties.height}</li>
            </ul>
            <ul>
                <li>Mass: {characterData.result.properties.mass}</li>
            </ul>
            <ul>
                <li>Birth Year: {characterData.result.properties.birth_year}</li>
            </ul>
            <ul>
                <li>Birth Year: {characterData.result.properties.birth_year}</li>
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