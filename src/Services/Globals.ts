export class Globals {
    public static vacationUrl: string;
    public static authUrl: string;
    public static socketUrl:string;

    public static url() {
        if (process.env.NODE_ENV === "production") {
            Globals.vacationUrl = "";
            Globals.authUrl = "";
            Globals.socketUrl = "";
        } else {
            Globals.vacationUrl = "http://localhost:3001/api/vacations/";
            Globals.authUrl = "http://localhost:3001/api/auth/";
            Globals.socketUrl = "http://localhost:3001/";
        }
    }
}

Globals.url();