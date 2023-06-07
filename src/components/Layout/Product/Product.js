import Card from "../../Ui/Card";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
function Product(props) {
  return (
    <Card>
      <div className={classes[`product-box`]} style={{ backgroundColor: props.backgroundColor }}>
        <div style={{color: props.textColor}}>
            <h2 className={classes.title}>{props.title}</h2>
            <p className={classes.desc}>{props.description}</p>
        </div>
        <span>
          <Link to="" className={classes.plus}>
            En savoir plus &#62;{" "}
          </Link>
        </span>
        <img src={props.src} />
      </div>
    </Card>
  );
}

export default Product;
