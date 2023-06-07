import classes from './ProductItem.module.css'
function ProductItem(props) {
    return (
      <div className={classes.productItem}>
        <img src={props.src} className={classes.productImage}/>
        <div className={classes.productName}>{props.name}</div>
        <div className={classes.productPrice} >{props.price}</div>
      </div>
    );
  }
  
  export default ProductItem;