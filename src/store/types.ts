export default interface RootState {
}

export interface Facility {
    uId: string;
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
    longitude?: string;
    latitude?: string;
    www?: string;
    isVirtual?: boolean;
}

export interface ListItem {
    text: string;
    value: string;
}
