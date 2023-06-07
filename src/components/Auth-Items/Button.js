import classes from './Button.module.css'
function Button(props){
    return <button style={{ backgroundColor: props.backgroundColor }} className={classes.action}>{props.action}</button>
}

export default Button;