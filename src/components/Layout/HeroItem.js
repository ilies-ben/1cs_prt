import Button from "../Auth-Items/Button";
import classes from './HeroItem.module.css'
function HeroItem(props){
return(
    <div className={classes[`hero-container`]}>
        <div className={classes.content} >
            <h1>{props.header}</h1>
            <span>{props.subHeader}</span>
            <p>{props.desc}</p>
            <Button backgroundColor={props.backgroundColor} action={props.action}/>
        </div>
        <div className={classes.heroImg}>
            <img src={props.src} className={classes.hrimg} style={{ width: props.width, height: props.height }}/>
        </div>
    </div>
)
}
export default HeroItem;