import axios from 'axios';
import { ArticleModel } from '../../Components/Models/ArticleModel';
import { authLoggedOutAction } from '../../Redux/AuthState';
import store from '../../Redux/Store';
import { Globals } from './Globals';
import defaultParallaxImage from '../../assets/images/background-header.jpg';

//Global functions helper each component can reusable that functions.

//Handling logout user reseting vacation list, logging out user at redux, deleting token from header and disconnect from socket.io.
export function logoutUser() {
    store.dispatch(authLoggedOutAction());
    delete axios.defaults.headers["authorization"];
    return;
}

export function getImageSourceBy_id(_id: string): string {
    const article = getArticleBy_Id(_id);
    if(article){
        const imageSource = `${Globals.articleApiUrl}articleImages/${article.imageName}`;
        return imageSource;
    }
    return defaultParallaxImage;

}

export function getArticleBy_Id(_id: string): ArticleModel {
    const article = store.getState().articleState.articles.find(article => article._id === _id);
    return article;
}