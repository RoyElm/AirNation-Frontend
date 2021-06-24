export class Globals {
    public static flightsApiUrl: string;
    public static authApiUrl: string;

    public static url() {
        if (process.env.NODE_ENV === "production") {
            Globals.flightsApiUrl = "";
            Globals.authApiUrl = "";
        } else {
            Globals.flightsApiUrl = "http://localhost:3001/api/flight/";
            Globals.authApiUrl = "http://localhost:3001/api/auth/";
        }
    }
}

Globals.url();