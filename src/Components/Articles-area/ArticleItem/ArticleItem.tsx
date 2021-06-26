import { GridListTileBar, IconButton } from "@material-ui/core";
import { Info } from "@material-ui/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import { Globals } from "../../../Services/GlobalServices/Globals";
import { articleListStyle } from "../../../Services/GlobalServices/GlobalStylingMaker";
import { ArticleModel } from "../../Models/ArticleModel";

interface ArticleItemInterface {
    article: ArticleModel,
    classes: ReturnType<typeof articleListStyle>;
}

function ArticleItem({ article, classes }: ArticleItemInterface): JSX.Element {

    return (
        <>
            <img src={`${Globals.articleApiUrl}articleImages/${article.imageName}`} alt={article.title} />
            <GridListTileBar
                title={article.title}
                titlePosition="top"
                actionPosition="left"
                className={classes.titleBar}
                actionIcon={
                    <IconButton aria-label={`info about ${article.title}`} className={classes.icon}>
                        <Info />
                    </IconButton>
                }
            />
            <NavLink to={GlobalPaths.readArticleUrl + article._id} className="read_more_button">
                <span>Read More</span>
            </NavLink>
        </>
    );
}

export default ArticleItem;
