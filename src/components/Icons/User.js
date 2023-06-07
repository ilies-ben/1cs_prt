import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import classes from "./icon.module.css";
import user from "../../Assets/Connexion.png";

function Cart(props) {
  const [open, setOpen] = useState(false);
  const iconRef = useRef();
  const listRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track the user's login status

  useEffect(() => {
    // Check if the user is logged in (based on the token in local storage)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listRef.current && !listRef.current.contains(e.target) && iconRef.current && !iconRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setOpen(false);
  };

  return (
    <span>
      <Link ref={iconRef} onClick={() => setOpen(!open)}>
        <img src={user} className={classes.icon} />
      </Link>
      {open && (
        <div ref={listRef} className="p-4 w-40 shadow-lg absolute right-4 top-14 bg-[#eaeaea] text-black">
          <ul>
            {isLoggedIn ? (
              <>
                <li className="text-sm">
                  <Link onClick={() => setOpen(false)} to="/myProfile" className="hover:underline">
                    My Profile
                  </Link>
                </li>
                <li className="text-sm">
                  <Link onClick={handleLogout} to="/auth" className="hover:underline">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li className="text-sm">
                <Link onClick={() => setOpen(false)} to="/auth" className="hover:underline">
                  Login/SignUp
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </span>
  );
}

export default Cart;
