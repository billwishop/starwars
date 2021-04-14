import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { FilmContext } from '../../components/FilmDataProvider'
// import { StarshipContext } from '../../components/ShipDataProvider'
// import { SpeciesContext } from '../../components/SpeciesDataProvider'
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import { getAllCharacterIds, getCharacterData } from '../../lib/characters'
import styles from '../../styles/Home.module.css'

export default function CharacterDetails({ characterData }) {
    const {getFilms, films} = useContext(FilmContext)

    // state variable for the current character's films
    const [characterFilms, setCharacterFilms] = useState([])

    useEffect(() => {
        getFilms()
    }, [])
    
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
        <Card className={styles.details}>
            <h1>{characterData.result.properties.name}</h1>
            <Divider className={styles.divider}/>
            <h3>About Me:</h3>
            <ul>
                <li>Height: {characterData.result.properties.height}</li>
                <li>Mass: {characterData.result.properties.mass}</li>
                <li>Birth Year: {characterData.result.properties.birth_year}</li>
            </ul>

            <h3>Films:</h3>
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
                <a className={styles.home}>Back to home &rarr;</a>
            </Link>
            </small>
        </Card>
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