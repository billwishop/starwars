import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Ample - Will Bishop</title>
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
            </main>

        </div>
    )
}