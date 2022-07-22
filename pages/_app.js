import '../styles/globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import "react-responsive-carousel/lib/styles/carousel.min.css";
function MyApp({ Component, pageProps }) {
  return (
    <div className="App">
      <Header/> 
      <Component {...pageProps} />
      {/* <Footer/> */}
    </div>
  )
  
}

export default MyApp
