export interface City {
    id: number,
    province_id: number;
    name: string,
    popularity: number;
};

export type CityWithProvinceName = City & { provinceName: string };