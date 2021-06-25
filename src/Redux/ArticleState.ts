import { ArticleModel } from "../Components/Models/ArticleModel";

// Article State: 
export class ArticleState {
    public articles: ArticleModel[] = [];
}

// Article Action Types: 
export enum ArticleActionType {
    ArticlesDownloaded = "ArticlesDownloaded",
    ArticleAdded = "ArticleAdded",
    ArticleEdited = "ArticleEdited",
    ArticleDeleted = "ArticleDeleted",
}

// Article Action: 
export interface ArticleAction {
    type: ArticleActionType;
    payload?: any;
}

//Article Action Creators 
export function ArticlesDownloadedAction(articles: ArticleModel[]): ArticleAction {
    return { type: ArticleActionType.ArticlesDownloaded, payload: articles };
}

export function ArticleAddedAction(article: ArticleModel): ArticleAction {
    return { type: ArticleActionType.ArticleAdded, payload: article };
}

export function ArticleEditedAction(article: ArticleModel): ArticleAction {
    return { type: ArticleActionType.ArticleEdited, payload: article };
}

export function ArticleDeletedAction(_id: string): ArticleAction {
    return { type: ArticleActionType.ArticleDeleted, payload: _id };
}

// Article Reducer: 
export function ArticleReducer(
    currentState: ArticleState = new ArticleState(),
    action: ArticleAction): ArticleState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case ArticleActionType.ArticlesDownloaded: {
            newState.articles = action.payload;
            break;
        }
        case ArticleActionType.ArticleAdded: {
            newState.articles.push(action.payload);
            break;
        }
        case ArticleActionType.ArticleEdited: {
            const articleIndex = newState.articles.findIndex(action.payload._id)
            newState.articles[articleIndex] = action.payload;
            break;
        }
        case ArticleActionType.ArticleDeleted: {
            const articleIndex = newState.articles.findIndex(article => article._id === action.payload);
            newState.articles.splice(articleIndex, 0);
            break;
        }
    }

    return newState; // Return the newState.
}
