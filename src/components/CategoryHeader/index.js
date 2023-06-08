import React from 'react';
import classes from "./style.module.css"
function CatHeader(props){
    return(
       <div className={classes.productHeader}>
           <h1>{props.text}</h1>
       </div>
    )
   }
   
   export default CatHeader; 