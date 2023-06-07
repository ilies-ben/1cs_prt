import Header from "../components/Layout/Header";
import { Fragment } from "react";
import Products from "../components/Layout/Products"
function HomePage(){
    return (
        <Fragment>
            <Header/>
            <Products/>
            
        </Fragment>
        
    )
}

export default HomePage;