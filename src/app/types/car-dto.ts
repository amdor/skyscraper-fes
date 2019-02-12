export interface CarData {
	CarUri: string;
	prod_date: string;
	power: string;
	price: string;
	currency: string;
	speedometer: string;
	worth: number;
	linkName?: string;
	id?: string;
	carGroup?: number;
}

export interface RawCarData {
	carUrls: Array<string>;
	htmls: any;
}
