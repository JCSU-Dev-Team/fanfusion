import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from "firebase/auth"; 
import '../styles/Header.css';

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for changes in the authentication state
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Sign-out successful.");
        }).catch((error) => {
            // An error happened.
            console.error("An error happened: ", error);
        });
    };

    const handleClick = () => {
        if (user) {
            // User is signed in, sign them out
            handleSignOut();
        } else {
            // User is signed out, redirect them to the login page
            navigate("/login");
        }
    };

    const homeClick = () => {
        navigate("/");
    };

    return (
        <div className='header'>
            <img onClick={homeClick} className='header-logo' src='PreHealthx-logos_white.png' alt=''/>
            <div className='header-nav'>
                <div className='header-nav-1'><Link to= '/' className='header-link'><span>Home</span></Link></div>
                <div className='header-nav-1'>
                    {user ? (<Link to= '/social' className='header-link'><span>Social</span></Link>) :
                    (<span>Social</span>)}
                </div>
                <div className="header-nav-1">
                    {user ? (
                        // User is signed in, display Logout button
                        <span onClick={handleClick} className="header-link">
                            Logout
                        </span>
                    ) : (
                        // User is signed out, display Login button
                        <Link to="/login" className="header-link">
                            <span>Login</span>
                        </Link>
                    )}
                </div>
                <div className='header-nav-1'><Link to='/profile' className='header-link'><span>Profile</span></Link></div>
                <div className='header-nav-account'>
                    <div className='header-nav-1 header-nav-account-btn'>
                        <span>Account</span>
                        <div className='header-nav-account-dropdown'>
                            <Link to='/settings' className='header-link'><span>Settings</span></Link>
                            {user ? (
                                // User is signed in, display Logout button
                                <span onClick={handleClick} className="header-link">
                                    Logout
                                </span>
                            ) : (
                                // User is signed out, display Login button
                                <Link to="/login" className="header-link">
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>              
            </div>
        </div>
    );
}

export default Header;
