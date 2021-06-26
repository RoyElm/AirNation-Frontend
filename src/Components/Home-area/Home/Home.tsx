import React from "react";
import ArticlesRaw from "../ArticlesRaw/ArticlesRaw";
import BestSellers from "../BestSellers/BestSellers";
import "./Home.css";
import airNationSymbol from "../../../assets/images/AirNation.png";

function Home(): JSX.Element {
    return (
        <div className="Home">
            <h1>Welcome To <img src={airNationSymbol} alt="AirNationSymbol" /></h1>
            <BestSellers />
            <ArticlesRaw />
        </div>
    );
}

export default Home;
