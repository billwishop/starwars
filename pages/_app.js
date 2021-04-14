import { FilmProvider } from '../components/FilmDataProvider'
import { StarshipProvider } from '../components/ShipDataProvider'
import { SpeciesProvider } from '../components/SpeciesDataProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <FilmProvider>
      <StarshipProvider>
        <SpeciesProvider>
          <Component {...pageProps} />
        </SpeciesProvider>
      </StarshipProvider>
    </FilmProvider>

  )
}

export default MyApp
