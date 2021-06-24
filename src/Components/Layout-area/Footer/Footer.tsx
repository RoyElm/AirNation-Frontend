import React from "react";
import "./Footer.css";
import AirNation from '../../../assets/images/AirNation.png';
import { Email, GitHub, LinkedIn } from "@material-ui/icons";

function Footer(): JSX.Element {

    return (
        <div className="Footer">
            <div className="site-data">
                <div className="about">
                    <img src={AirNation} alt="AirNation" />
                    <p>
                        My name is Roy Elmakies Full Stack Developer,
                        Welcome to my AirNation Landing Page.
                    </p>
                    <a href="https://www.linkedin.com/in/royelmakies/"><LinkedIn fontSize="large" /></a>
                    <a href="https://github.com/RoyElm"><GitHub fontSize="large" /></a>
                    <a href="mailto:roye456@gmail.com"><Email fontSize="large" /></a>
                </div>
                <div className="site">
                    <h4>PAGES</h4>
                    <ul>
                        <li>
                            <a href="!#">Home</a>
                        </li>
                        <li>
                            <a href="!#">Best Sellers</a>
                        </li>
                        <li>
                            <a href="!#">Articles</a>
                        </li>
                    </ul>
                </div>
                <div className="community">
                    <h4>COMMUNITY</h4>

                    <ul>
                        <li>
                            <a href="!#">Diversity & Belonging</a>
                        </li>
                        <li>
                            <a href="!#">Against Discrimination</a>
                        </li>
                        <li>
                            <a href="!#">Accessibility</a>
                        </li>
                        <li>
                            <a href="!#">Frontline Stays</a>
                        </li>
                        <li>
                            <a href="!#">Guest Referrals</a>
                        </li>
                        <li>
                            <a href="!#">Gift cards</a>
                        </li>
                    </ul>
                </div>
                <div className="support">
                    <h4>SUPPORT</h4>
                    <ul>
                        <li>
                            <a href="!#">Our COVID-19 Response</a>
                        </li>
                        <li>
                            <a href="!#">Help Center</a>
                        </li>
                        <li>
                            <a href="!#">Cancellation options</a>
                        </li>
                        <li>
                            <a href="!#">Cancellation options</a>
                        </li>
                        <li>
                            <a href="!#">Neighborhood Support</a>
                        </li>
                        <li>
                            <a href="!#">Trust & Safety</a>
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
