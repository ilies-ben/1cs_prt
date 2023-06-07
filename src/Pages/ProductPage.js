import Categories from '../components/Categories';
import Products from '../modules/Products/Products';
import classes from './ProductPage.module.css'
function ProductPage(){
 return(
    <div className={classes[`shop-section`]}>
            <Categories/>
            <Products/>
    </div>
 )
}

export default ProductPage;