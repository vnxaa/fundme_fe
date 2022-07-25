import '../styles/globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { SignerProvider } from "./state/useSigner";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ApolloClient,InMemoryCache, ApolloProvider } from '@apollo/client';

const GRAPH_URL = "https://api.studio.thegraph.com/query/31632/fundme/v0.0.1"
const client = new ApolloClient({cache: new InMemoryCache(),uri: GRAPH_URL})

function MyApp({ Component, pageProps }) {
  return (
    <div className="App">

        <ApolloProvider client={client}>
          <Header/> 
          <Component {...pageProps} />
        </ApolloProvider>

      {/* <Footer/> */}
    </div>
  )
  
}

export default MyApp
