import styles from '../styles/Home.module.css'
import Link from 'next/link'

export const CharacterCard = (character) => {
    return (
    <Link href={`/characters/${character.uid}`}>          
        <a className={styles.card}>
            <h3>{character.name} </h3>
            <small>Learn more &rarr;</small>
        </a>
    </Link>
    )
}
