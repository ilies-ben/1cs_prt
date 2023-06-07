import classes from './Authentication.module.css'
import logoImage from '../Assets/logo.png'
import { useState } from 'react';
import Login from '../components/Login/Login';
import SignUp from '../components/Signup/SignUp';
import Navigation from '../components/Layout/Navigation';
function Authentication({mode}){
    const [islogin,setIsLogin]=useState(true)
    const switchAuthModeHandler=()=>{
        setIsLogin((prevstate)=>!prevstate)
    }
    return(
        <div className={classes[`auth-section`]}>
            <Navigation/>
            <div className={classes[`auth-container`]}>
                <div className={classes[`form-container`]}>
                    <div className={classes[`form-content`]}>
                        <div className={classes.content} >
                            <h1> {islogin? 'Login':'Sign Up'} </h1>
                            <p> {islogin? 'Get started with your next purchase by signing in to your account':'Join our community and get access to exclusive deals and promotions'} </p>
                        </div>
                        <div>
                        {islogin? <Login/>: <SignUp/>}
                        </div>
                        <button
                            type='button'
                            className={classes.toggle}
                            onClick={switchAuthModeHandler}
                        >
                            {islogin ? 'Create new account' : 'Login with existing account'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Authentication;