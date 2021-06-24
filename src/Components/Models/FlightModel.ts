export class FlightModel {
    public _id: string;
    public fromLocation: string;
    public toLocation: string;
    public description: string;
    public duration: string;
    public date: string;
    public price: number;
    public imageName: string;
    public featured: boolean;
}

export type Order = "asc" | "desc";
