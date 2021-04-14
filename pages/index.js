import {useState, useEffect} from 'react'
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
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
      <main className={styles.main}>
        <>
        <Input type="text"
            className="search"
            onKeyUp={event => setTerms(event.target.value)}
            startAdornment={
              <SearchIcon className="searchIcon icon"/> 
            }
            autoFocus={true}
            placeholder="Search for a character" />
        </>

        <div className={styles.grid}>
          {filteredCharacters.map(character => {
            return CharacterCard(character)
          })}
        </div>
      </main>


    </div>
  )
}
