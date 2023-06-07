import { Link } from "react-router-dom";

function SlidingNav(props){
    return(
        <div>
            <Link to={props.link} />
        </div>
    )
}

export default SlidingNav;