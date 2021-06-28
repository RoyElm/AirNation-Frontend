import React, { useCallback, useState } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import AirNation from '../../../assets/images/AirNation.png';
import "./Header.css";
import NavLog from "../../Auth-area/NavLog/NavLog";
import { NavLink, useLocation } from "react-router-dom";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import { useEffect } from "react";
import defaultParallaxImage from '../../../assets/images/background-header.jpg';
import { getImageSourceBy_id } from "../../../Services/GlobalServices/GlobalHelpers";
import { AuthModel } from "../../Models/AuthModel";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";

const NAV_LINKS_VALUES = [
    { label: "Home", path: GlobalPaths.homeUrl },
    { label: "Flights", path: GlobalPaths.flightsUrl },
    { label: "Articles", path: GlobalPaths.articlesUrl },
]

function Header(): JSX.Element {
    const { pathname } = useLocation();

    const [parallaxBackgroundImage, setParallaxBackgroundImage] = useState<{ backgroundImage: string }>({
        backgroundImage: `url(${defaultParallaxImage})`,
    })

    const [auth, setAuth] = useState<AuthModel>();



    //check if pathname is at read article path; using React Hook useCallback to save the reference for future use;
    const READ_ARTICLE_PATH = useCallback((): boolean => {
        return pathname.includes(GlobalPaths.readArticleUrl);
    }, [pathname]);

    //handling set parallax background image; using React Hook useCallback to save the reference for future use;
    const SET_PARALLAX_BACKGROUND_IMAGE = useCallback((image: string): void => {
        setParallaxBackgroundImage({ backgroundImage: `url(${image})` })
    }, []);

    //handling switch parallax background image when user read article;
    useEffect(() => {
        if (READ_ARTICLE_PATH()) {
            const _id = pathname.split("/")[2];
            const _parallaxBackgroundImage = getImageSourceBy_id(_id);
            SET_PARALLAX_BACKGROUND_IMAGE(_parallaxBackgroundImage);

        } else {
            SET_PARALLAX_BACKGROUND_IMAGE(defaultParallaxImage);
        }
    }, [pathname, READ_ARTICLE_PATH, SET_PARALLAX_BACKGROUND_IMAGE]);

    useEffect(() => {
        const unSubscribe: Unsubscribe = store.subscribe(() => {
            const auth = store.getState().authState.auth;
            setAuth(auth);
        });
        return unSubscribe;
    }, [])

    return (
        <div className="Header">
            <AppBar position="relative" className="AppBar" >
                <Toolbar>
                    <img src={AirNation} alt="AirNation" />
                    <div className='grow' />
                    {NAV_LINKS_VALUES.map(navLink => (
                        <NavLink to={navLink.path} key={navLink.label} className='navLink'
                            activeClassName="activeNavLink"
                            isActive={(match, location) => {
                                return location.pathname === navLink.path;
                            }}
                        >
                            {navLink.label}</NavLink>
                    ))}
                    {READ_ARTICLE_PATH() && <NavLink to={pathname} className='navLink' activeClassName="activeNavLink">Read Article</NavLink>}
                    {auth && <NavLink to={GlobalPaths.orderedFlightsUrl} className='navLink' activeClassName="activeNavLink">Ordered Flights</NavLink>}
                    {auth?.role === 'Admin_Role' && <NavLink to={GlobalPaths.adminAreaUrl + "add-flight"} className='navLink' activeClassName="activeNavLink">Add Flight</NavLink>}
                    {auth?.role === 'Admin_Role' && <NavLink to={GlobalPaths.adminAreaUrl + "add-article"} className='navLink' activeClassName="activeNavLink">Add Article</NavLink>}
                    <div className='grow' />
                    <NavLog />
                </Toolbar>
                <div className="parallax" style={parallaxBackgroundImage}></div>
            </AppBar>
        </div>
    )
}

export default Header;
