import {Facility} from "@/store/types";

export default interface FilterState {
    facilities: Facility[];
    filteredFacilities: Facility[];
    searchString: string;
}
