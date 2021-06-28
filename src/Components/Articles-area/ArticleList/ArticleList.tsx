import React, { useEffect, useState } from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { articleListStyle } from "../../../Services/GlobalServices/GlobalStylingMaker";
import { CircularProgress } from "@material-ui/core";
import { ArticleModel } from "../../Models/ArticleModel";
import { getAllArticlesAsync } from "../../../Services/Axios_Services/Article.service";
import './ArticleList.css';
import ArticleItem from "../ArticleItem/ArticleItem";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { CIRCULAR_PROGRESS_STYLE } from "../../Shared-area/Global_CSS/Global_CSS";


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
            <GridList cellHeight={250} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="h3">Articles</ListSubheader>
                </GridListTile>
                {articles.length ? articles.map((article) => (
                    <GridListTile
                        key={article.imageName}
                        cols={article.featured ? 2 : 1} rows={article.featured ? 2 : 1}>
                        <ArticleItem article={article} classes={classes} />
                    </GridListTile >
                ))
                    :
                    <CircularProgress style={CIRCULAR_PROGRESS_STYLE} />
                }
            </GridList>
        </div >
    );
}

export default ArticleList;

