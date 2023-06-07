import classes from "./Headers.module.css";

function Headers(props) {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.span}>
        <span>{props.spanText}</span>
      </div>
    </div>
  );
}

export default Headers;