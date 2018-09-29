export interface CarData {
	CarUri: string;
	prod_date: string;
	power: string;
	price: string;
	speedometer: string;
	worth: number;
	linkName?: string;
}

export interface RawCarData {
	carUrls: Array<string>;
	htmls: any;
}
