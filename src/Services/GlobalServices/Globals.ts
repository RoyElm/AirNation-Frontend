export class Globals {
    public static flightsApiUrl: string;
    public static authApiUrl: string;
    public static articleApiUrl: string;
    public static adminApiUrl: string;
    public static orderFlightApiUrl: string;

    public static url() {
        if (process.env.NODE_ENV === "production") {
            Globals.flightsApiUrl = "";
            Globals.authApiUrl = "";
        } else {
            Globals.flightsApiUrl = "http://localhost:3001/api/flight/";
            Globals.authApiUrl = "http://localhost:3001/api/auth/";
            Globals.articleApiUrl = "http://localhost:3001/api/article/";
            Globals.orderFlightApiUrl = "http://localhost:3001/api/order-flight/";
            Globals.adminApiUrl = "http://localhost:3001/api/admin/";
        }
    }
}

Globals.url();