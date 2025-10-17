import '~/components/GlobalStyles'
import { Link, Outlet } from "react-router-dom"
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Slide from '~/components/Slide';


function LayoutDefault() {
    return ( 
        <>
        <header>
            <Header/>
        </header> 

        <main>
            
            <Outlet/>


        </main>

        <footer>
            <Footer/>
        </footer>
        </>
     );
}

export default LayoutDefault;