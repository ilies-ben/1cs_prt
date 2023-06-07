import classes from "./PanieriItem.module.css"

function PanierItem(props){
    return(
        <div className={classes[`cart-container`]}>
            <div className={classes.content}>
                <div className={classes[`img-container`]} >
                </div>
                <div className={classes[`product-info`]}>
                    <h3>{props.prod}</h3>
                    <span>{props.proddesc}</span>
                </div>
            </div>
            <div>{props.price}</div>
            <div className={classes[`cart-item-quantity`]}>
                <button className="cart-item-reduce">-</button>
                <input className="cart-item-quantity-input" type="number" value="1" />
                <button className="cart-item-plus">+</button>
            </div>
            <div>{props.total}</div>
            <button>x</button>
        </div>
    )
}
export default PanierItem;