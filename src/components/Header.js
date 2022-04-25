import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search'
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import LoginModal from './LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/user';
import { auth } from '../firebase';
import JoinNowModal from './JoinNowModal';
import logo from '../images/wurklo-logo-e0e1dd.svg'

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

function Header() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();

    const signOut = () => {
        auth.signOut()
            .then(() => {
                dispatch(setUser(null))
            })
            .catch((error) => {
                console.log(error.message)
            });
    };

    return (
        <div className={'header mb-3 ' + (location.pathname === "/" ? "" : "header__notHome py-2 py-sm-0")} id="header">
            {location.pathname === "/" ?
                <div></div>
                :
                <>
                    <a href="/">
                        <div className='header__left'>
                            <img src={logo} className="navbar-coin" alt="Wurklo logo" />
                            <p className='header__logoText pt-3 fs-3'>Wurklo</p>
                        </div>
                    </a>
                    {/* <div className='header__searchContainer me-0 me-md-5 pe-md-5'>
                        <FilterSearchResults />
                        <Search />
                    </div> */}
                </>

            }
            <div className={'header__right ' + (location.pathname === "/" ? "mt-3" : "")}>
                {
                    user
                        ?
                        <>
                            {user?.photoURL
                                ?
                                <img src={user?.photoURL} alt="Profile Pic" onClick={() => openNav()} />
                                :
                                <p onClick={() => openNav()}>{user?.displayName?.slice(0, 1)}</p>
                            }
                        </>
                        :
                        <>
                            <JoinNowModal />
                            <LoginModal />
                        </>
                }
            </div>
            <div id="mySidebar" className="sidebar shadow">
                <button className="closebtn" onClick={() => closeNav()}>×</button>
                <Link to="/my-account/">My Account</Link>
                <Link to="/messages">Messages</Link>
                <Link to="/contacts">Contacts</Link>
                {user ? <a href="/" onClick={signOut}>Sign out</a> : <a href="/">Sign in</a>}
            </div>
        </div>
    );
};

export default Header;