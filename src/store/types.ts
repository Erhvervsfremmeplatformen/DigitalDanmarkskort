import FilterState from "@/store/modules/filters/types";
export default interface RootState {
    Filters: FilterState
}

export interface Facility {
    uId: string;
    name: string;
    organisation: string;
    address: string;
    zip: string;
    city: string;
    description?: string;
    providerTypes: ListItem[];
    categories: ListItem[];
    areaTypes: ListItem[];
    serviceTypes: ListItem[];
    longitude?: string;
    latitude?: string;
    website: string;
    isVirtual?: boolean;
    paymentType:Number
}

export interface ListItem {
    text: string;
    value: string;
}

export interface TypeDictionary {
    [value: number]: string;
}

export const ProviderTypes: TypeDictionary = {
    1: 'Universitet eller andet vidensinstitut',
    2: 'Privat virksomhed',
    4: 'Forsyningsvirksomhed',
    8: 'GTS-institut',
    16: 'Hospital',
    32: 'Kommune',
    64: 'Viden- og erhvervsklynge',
    128: 'Andet, beskriv'
};

export const Categories: TypeDictionary = {
    1: 'Laboratorie',
    2: 'Konstrueret miljø herunder simulering(facilitet som skaber et kunstigt miljø fx en vindtunnel)',
    4: 'Real world miljø (et virkeligt miljø, som bruges til at teste, demonstere eller udvikle, fx et living lab eller et rensningsanlæg, hvor en del af spildevandet afledes til forsøg',
    8: 'Datamiljø herunder computerkapacitet og databaser (fx serverkapacitet eller biobanker',
    16: 'Certificering og dokumentation (facilitet der bruges til at certificere eller dokumentere det testede produkt',
    32: 'Andet, beskriv',
};

export const AreaTypes: TypeDictionary = {
    1: 'Animation, spil, film og reality teknologi',
    2: 'Byggeri og anlæg',
    4: 'Design, mode og møbler',
    8: 'Digitale teknologier',
    16: 'Energi',
    32: 'Finans og fintech',
    64: 'Forsvar, rum og sikkerhed',
    128: 'Fødevarer og bioressourcer',
    256: 'Health Science',
    512: 'Industriproduktion',
    1024: 'Life Science og velfærdsteknologi',
    2048: 'Lydteknologi',
    4096: 'Maritime erhverv og logistik',
    8192: 'Miljø',
    16384: 'Robotteknologi',
    32768: 'Turisme',
    65536: 'Vand',
    131072: 'Andet, beskriv'
};

export const ServiceTypes: TypeDictionary = {
    1: 'Selvbetjening af faciliteten',
    2: 'Teknisk support eller hjælp til at anvende faciliteten',
    4: 'Komplet service, herunder gennemførelse af fx forskning, test, demonstration eller udvikling uden brugeren',
    8: 'sel (ikke teknisk support til faciliteten)',
    16: 'Akkrediteret måling og/eller udførelse af certificering',
    32: 'Andet, beskriv',
};