import React, { useCallback, useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import AirNation from '../../../assets/images/AirNation.png';
import "./Header.css";
import NavLog from "../../Auth-area/NavLog/NavLog";
import { useHistory, useLocation } from "react-router-dom";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import { useEffect } from "react";
import defaultParallaxImage from '../../../assets/images/background-header.jpg';
import { getImageSource } from "../../../Services/GlobalServices/GlobalHelpers";

function Header(): JSX.Element {
    const { pathname } = useLocation();
    const history = useHistory();

    const [value, setValue] = useState<string>(pathname);
    const [parallaxBackgroundImage, setParallaxBackgroundImage] = useState<{ backgroundImage: string }>({
        backgroundImage: `url(${defaultParallaxImage})`,
    })

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
        history.push(newValue);
    };

    //check if pathname is at read article path; using React Hook useCallback to save the reference for future use;
    const READ_ARTICLE_PATH = useCallback((): boolean => {
        return pathname.includes(GlobalPaths.readArticleUrl);
    }, [pathname])

    //handling set parallax background image; using React Hook useCallback to save the reference for future use;
    const SET_PARALLAX_BACKGROUND_IMAGE = useCallback((image: string): void => {
        setParallaxBackgroundImage({ backgroundImage: `url(${image})` })
    }, [])

    //handling switch parallax background image when user read article;
    useEffect(() => {
        if (READ_ARTICLE_PATH()) {
            setValue(pathname);
            const _id = pathname.split("/")[2];
            const _parallaxBackgroundImage = getImageSource(_id);
            SET_PARALLAX_BACKGROUND_IMAGE(_parallaxBackgroundImage);

        } else {
            SET_PARALLAX_BACKGROUND_IMAGE(defaultParallaxImage);
        }
    }, [pathname, READ_ARTICLE_PATH, SET_PARALLAX_BACKGROUND_IMAGE])


    return (
        <div className="Header">
            <div className="nav-tabs">
                <img src={AirNation} alt="AirNation" />
                <Tabs className="tabs" value={value} onChange={handleChange}>
                    <Tab label="Home" value={GlobalPaths.homeUrl} />
                    <Tab label="Flights" value={GlobalPaths.flightsUrl} />
                    <Tab label="Articles" value={GlobalPaths.articlesUrl} />
                    {READ_ARTICLE_PATH() && <Tab label="Read Article" value={pathname} />}
                </Tabs>
                <div className="userDiv">
                    <NavLog />
                </div>
            </div>
            <div className="parallax" style={parallaxBackgroundImage}></div>
        </div>
    )
}

export default Header;
