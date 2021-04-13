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
  console.log(characters)
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

        <div className={styles.grid}>
          {characters.results.map(character => {
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
