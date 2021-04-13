import {useState, useEffect} from 'react'
import Head from 'next/head'
import { CharacterCard } from '../components/CharacterCard';
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
    
  const res = await fetch('https://www.swapi.tech/api/people?page=1&limit=82');
  const data = await res.json();

  return {
    props: {
      characters: data
    }
  }
}

export default function Home({ characters }) {

  // state variable to hold search terms
  const [searchTerms, setTerms] = useState("")

  //state variable to hold filtered characters
  const [filteredCharacters, setFilteredCharacters] = useState([])

  // if the search bar is empty all characters will be listed
  // if the search bar isn't empty, the list will be filtered
  useEffect(() => {
    if (searchTerms !== "") {
      const subset = characters.results.filter(character => character.name.toLowerCase().includes(searchTerms))
      setFilteredCharacters(subset)
    } else {
      setFilteredCharacters(characters.results)
    }
  }, [searchTerms])
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://www.amplecloud.io/">Ample</a> Code Challenge
        </h1>

        <p className={styles.description}>
          With help from our friends at{' '}
          <a href="https://www.swapi.tech/">swapi.tech!</a>
        </p>

        <p className={styles.description}>
        <>
        <input type="text"
            className="search"
            onKeyUp={event => setTerms(event.target.value)}
            placeholder="Search for a character..." />
        </>
        </p>

        <div className={styles.grid}>
          {filteredCharacters.map(character => {
            return CharacterCard(character)
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Submitted by{' '} 
          <a href="https://www.linkedin.com/in/will-bishop-dev/">Will Bishop</a>
        </p>
      </footer>
    </div>
  )
}
