export default interface RootState {
}

export interface Facility {
    uid: string;
    name: string;
    organisation: string;
    address: string;
    zip: string;
    city: string;
    description: string;
    providerTypes: ListItem[];
    categories: ListItem[];
    areaTypes: ListItem[];
    serviceTypes: ListItem[];
}

export interface ListItem {
    text: string;
    value: string;
}
