export interface CarData {
    CarUri: string;
    age: string;
    condition: string;
    mass: string;
    power: string;
    price: string;
    speedometer: string;
    trunk: string;
    worth: number;
}

export interface RawCarData {
    carUrls: Array<string>;
    htmls: any;
}
