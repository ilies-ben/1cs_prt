import ProfileInput from "../components/ProfileItems/inputItem";
import classes from './Profile.module.css'
import { Link } from "react-router-dom";
import Button from '../components/CheckoutItems/ActionButton'
function Profile(){
 return(
    <section className={classes.profileSection}>
        <div className={classes.content}>
        <div className="flex justify-end items-center mb-12">
            <h1 className="font-semibold">Welocome<span className="text-yellow-400 ml-2 ">Mohammed</span></h1>
        </div>
        <div className="flex justify-between items-start">
            <div>
                <Link to="" className="font-semibold">My History</Link>
            </div>
            <from className={classes.formContainer}>
                <h1 className="text-yellow-400 text-xl font-normal mb-4">Edit Your Profile</h1>
                <div className="flex items-center gap-4 w-full ">
                    <div className="w-1/2">
                        <ProfileInput label="First Name" type="text" name="First Name" />
                    </div>
                    <div className="w-1/2">
                        <ProfileInput label="Last Name" type="text" name="Last Name" />
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full ">
                    <div className="w-1/2">
                        <ProfileInput label="Email" type="email" name="Email" />
                    </div>
                    <div className="w-1/2">
                        <ProfileInput label="Address" type="text" name="Address" />
                    </div>
                </div>
                <ProfileInput label="Password Changes" placeholder="Current Password" type="password" />
                <ProfileInput  type="password" placeholder="New Password" />
                <ProfileInput  type="password" placeholder="Confirm New Password" />
                <div className="flex justify-end mt-10">
                    <Button text="Save Changes"/>
                </div>
            </from>
        </div>
        </div>
        
    </section>
 )
}

export default Profile;