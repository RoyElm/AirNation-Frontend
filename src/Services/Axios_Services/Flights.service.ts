import axios from 'axios';
import { FlightModel, Order } from '../../Components/Models/FlightModel';
import { FlightDownloadedAction } from '../../Redux/FlightsState';
import store from '../../Redux/Store';
import { Globals } from '../GlobalServices/Globals';


export async function getAllFlightsAsync() {
    if (!store.getState().flightsState.flights.length) {
        const response = await axios.get<FlightModel[]>(Globals.flightsApiUrl);
        const flights = response.data;
        store.dispatch(FlightDownloadedAction(flights));
    }
    return store.getState().flightsState.flights;
}

export function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string }
    ) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
