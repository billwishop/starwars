import Link from 'next/link'
import { getAllCharacterIds, getCharacterData } from '../../lib/characters'

export default function CharacterDetails({ characterData }) {
    console.log(characterData)
    return (
        <>
            <h1>{characterData.result.properties.name}</h1>
            <h2>
            <Link href="/">
                <a>Back to home</a>
            </Link>
            </h2>
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