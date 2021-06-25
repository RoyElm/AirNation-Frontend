import axios from "axios";
import { ArticleModel } from "../Components/Models/ArticleModel";
import { ArticlesDownloadedAction } from "../Redux/ArticleState";
import store from "../Redux/Store";
import { Globals } from "./Globals";

export async function getAllArticlesAsync() {
    if (!store.getState().articleState.articles.length) {
        const response = await axios.get<ArticleModel[]>(Globals.articleApiUrl);
        const articles = response.data;
        store.dispatch(ArticlesDownloadedAction(articles));
    }
    return store.getState().articleState.articles;
}