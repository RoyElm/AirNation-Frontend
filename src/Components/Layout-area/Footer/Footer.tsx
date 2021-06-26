import React from "react";
import "./Footer.css";
import AirNation from '../../../assets/images/AirNation.png';
import { Email, GitHub, LinkedIn } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";

function Footer(): JSX.Element {

    return (
        <div className="Footer">
            <div className="site-data">
                <div className="about">
                    <img src={AirNation} alt="AirNation" />
                    <p>
                        My name is Roy Elmakies Full Stack Developer,
                        Welcome to my AirNation site.
                    </p>
                    <a href="https://www.linkedin.com/in/royelmakies/"><LinkedIn fontSize="large" /></a>
                    <a href="https://github.com/RoyElm"><GitHub fontSize="large" /></a>
                    <a href="mailto:roye456@gmail.com"><Email fontSize="large" /></a>
                </div>
                <div className="site">
                    <h4>PAGES</h4>
                    <ul>
                        <li>
                            <NavLink to={GlobalPaths.homeUrl}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={GlobalPaths.flightsUrl}>Flights</NavLink>
                        </li>
                        <li>
                            <NavLink to={GlobalPaths.articlesUrl}>Articles</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="community">
                    <h4>COMMUNITY</h4>

                    <ul>
                        <li>
                            <NavLink to={GlobalPaths.homeUrl}>Diversity & Belonging</NavLink>
                        </li>
                        <li>
                            <NavLink to={GlobalPaths.homeUrl}>Against Discrimination</NavLink>
                        </li>
                        <li>
                            <NavLink to={GlobalPaths.homeUrl}>Accessibility</NavLink>
                        </li>
                        <li>
                            <NavLink to={GlobalPaths.homeUrl}>Frontline Stays</NavLink>
                        </li>
                        <li>
                            <NavLink to={GlobalPaths.homeUrl}>Guest Referrals</NavLink>
                        </li>
                        <li>
                            <NavLink to={GlobalPaths.homeUrl}>Gift cards</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="support">
                    <h4>SUPPORT</h4>
                    <ul>
                        <li>
                            <NavLink to={GlobalPaths.homeUrl}>Our COVID-19 Response</NavLink>
                        </li>
                        <li>
                            <NavLink to={GlobalPaths.homeUrl}>Help Center</NavLink>
                        </li>
                        <li>
                            <NavLink to={GlobalPaths.homeUrl}>Cancellation options</NavLink>
                        </li>
                        <li>
                            <NavLink to={GlobalPaths.homeUrl}>Cancellation options</NavLink>
                        </li>
                        <li>
                            <NavLink to={GlobalPaths.homeUrl}>Neighborhood Support</NavLink>
                        </li>
                        <li>
                            <NavLink to={GlobalPaths.homeUrl}>Trust & Safety</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="copyrights">
                <p>
                    All rights reserved to Roy Elmakies &copy;{new Date().getFullYear()}
                </p>
            </div>
        </div >
    );
}

export default Footer;
