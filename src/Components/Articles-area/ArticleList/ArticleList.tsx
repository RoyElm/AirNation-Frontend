import React, { useEffect, useState } from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { articleListStyle } from "../../../Services/GlobalStylingMaker";
import { CircularProgress, GridListTileBar, IconButton } from "@material-ui/core";
import { ArticleModel } from "../../Models/ArticleModel";
import { errorsService } from "../../../Services/GlobalErrorsService";
import { getAllArticlesAsync } from "../../../Services/Article.service";
import { Globals } from "../../../Services/Globals";
import { Info } from "@material-ui/icons";
import './ArticleList.css';

function ArticleList(): JSX.Element {

    const classes = articleListStyle();
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
        <div className={classes.root + " articleList"}>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Articles</ListSubheader>
                </GridListTile>
                {articles.length ? articles.map((article) => (
                    <GridListTile key={article.imageName} cols={article.featured ? 2 : 1} rows={article.featured ? 2 : 1}>
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
                        <button className="buttonTry">Read More</button>
                    </GridListTile >
                ))
                    :
                    <CircularProgress className="circularProgress" style={{ height: "5rem", width: "5rem", margin: "2rem" }} />}
            </GridList>
        </div >
    );
}

export default ArticleList;

