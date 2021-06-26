import React, { useEffect, useState } from "react";
import "./ArticlesRaw.css";
import { GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import { ArticleModel } from "../../Models/ArticleModel";
import { getAllArticlesAsync } from "../../../Services/Axios_Services/Article.service";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { getImageSourceBy_id } from "../../../Services/GlobalServices/GlobalHelpers";
import { Info } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import { articleRawHomeStyle } from "../../../Services/GlobalServices/GlobalStylingMaker";


function ArticlesRaw(): JSX.Element {
    const classes = articleRawHomeStyle();

    const [articles, setArticles] = useState<ArticleModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const articles = await getAllArticlesAsync();
                setArticles(articles);
            } catch (error) {
                console.log(errorsService.getError(error));
            }
        })();
    }, [])


    return (
        <div className={classes.root + " ArticlesRaw"}>
            <h3 >Our Articles</h3>
            <GridList cellHeight={200} className={classes.gridList + " gridListArticles"} cols={2}>
                {articles.map((article) => (
                    <GridListTile key={article.imageName} cols={article.featured ? 2 : 1}>
                        <img src={getImageSourceBy_id(article._id)} alt={article.title} />
                        <GridListTileBar
                            title={article.title}
                            subtitle={<span>by: {article.author}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${article.title}`} className={classes.icon}>
                                    <NavLink to={GlobalPaths.readArticleUrl + article._id}> <Info className={classes.icon} /></NavLink>
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default ArticlesRaw;
