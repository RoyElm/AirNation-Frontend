import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import store from "../../../Redux/Store";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import { CIRCULAR_PROGRESS_STYLE } from "../../Shared-area/Global_CSS/Global_CSS";
import "./FullArticle.css";

function FullArticle(): JSX.Element {
    const _id = useParams<{ _id: string }>()._id;
    const history = useHistory();
    const article = store.getState().articleState.articles.find(article => article._id === _id);
    useEffect(() => {
        if (!article) {
            history.push(GlobalPaths.articlesUrl);
        }
    }, [history, article])

    return (
        <div className="FullArticle">
            {article ?
                <h2>{article.author}</h2>
                :
                <CircularProgress style={CIRCULAR_PROGRESS_STYLE} />
            }
        </div>
    );
}

export default FullArticle;
