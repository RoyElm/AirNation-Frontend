import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getArticleBy_Id } from "../../../Services/GlobalServices/GlobalHelpers";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import { CIRCULAR_PROGRESS_STYLE } from "../../Shared-area/Global_CSS/Global_CSS";
import "./FullArticle.css";

function FullArticle(): JSX.Element {
    const _id = useParams<{ _id: string }>()._id;
    const history = useHistory();
    const article = getArticleBy_Id(_id);

    useEffect(() => {
        if (!article) {
            history.push(GlobalPaths.articlesUrl);
        }
    }, [history, article])

    return (
        <div className="FullArticle">
            {article ? <article>
                <h2>{article.title}</h2>
                <section>
                    <p className="articleDescription">
                        {article.description}
                    </p>
                </section>
                <h3>By: {article.author}</h3>
                <span>Publish date: {new Date(article.publishDate).toLocaleDateString("EN", { dateStyle: "medium" })}</span>
            </article>
                :
                <CircularProgress style={CIRCULAR_PROGRESS_STYLE} />
            }
        </div>
    );
}

export default FullArticle;
