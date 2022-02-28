import {Facility, ListItem} from "../../types";

export default interface FilterState {
    facilities: Facility[];
    filteredFacilities: Facility[];
    showFilter: boolean;
    loading: string;
    searchString: string;
    providerTypes: ListItem[],
    categories: ListItem[],
    areaTypes: ListItem[],
    serviceTypes: ListItem[]
    error: string
}
