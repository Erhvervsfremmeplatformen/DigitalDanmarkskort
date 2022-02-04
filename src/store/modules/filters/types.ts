import {Facility, ListItem} from "@/store/types";

export default interface FilterState {
    facilities: Facility[];
    filteredFacilities: Facility[];
    searchString: string;
    providerTypes: ListItem[],
    categories: ListItem[],
    areaTypes: ListItem[],
    serviceTypes: ListItem[]
}
