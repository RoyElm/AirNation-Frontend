import axios from "axios";
import { ArticleModel } from "../../Components/Models/ArticleModel";
import { FlightModel } from "../../Components/Models/FlightModel";
import { ArticleAddedAction } from "../../Redux/ArticleState";
import { FlightAddedAction } from "../../Redux/FlightsState";
import store from "../../Redux/Store";
import { Globals } from "../GlobalServices/Globals";

export async function submitArticleFormAsync(article: ArticleModel): Promise<ArticleModel> {
    const response = await axios.post<ArticleModel>(Globals.adminApiUrl + "add-article", article);
    const addedArticle = response.data;
    store.dispatch(ArticleAddedAction(addedArticle));
    return addedArticle;
}

export async function submitFlightFormAsync(flight: FlightModel): Promise<FlightModel> {
    const response = await axios.post<FlightModel>(Globals.adminApiUrl + "add-article", flight);
    const addedFlight = response.data;
    store.dispatch(FlightAddedAction(addedFlight));
    return addedFlight;
}