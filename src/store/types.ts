import FilterState from "./modules/filters/types";
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
    description?: string;
}

export interface Item {
    text: string;
    description?: string;
}

export interface TypeDictionary {
    [value: number]: Item;
}

export const ProviderTypes: TypeDictionary = {
    1: { text: 'Universitet eller andet vidensinstitut', description: ''},
    2: { text: 'Privat virksomhed eller erhvervsdrivende forening', description: ''},
    4: { text: 'Forsyningsvirksomhed', description: ''},
    8: { text: 'GTS-institut', description: ''},
    16: { text: 'Hospital eller region', description: ''},
    32: { text: 'Kommuner eller kommunalt ejede selskaber', description: ''},
    64: { text: 'NGO eller forening', description: ''},
    128: { text: 'Andet', description: ''}
};

export const Categories: TypeDictionary = {
    1: { text:'Laboratorie', description: ''},
    2: { text:'Konstrueret miljø', description: 'Facilitet som skaber et kunstigt miljø fx en vindtunnel'},
    4: { text:'Real world miljø', description: 'Et virkeligt miljø, som bruges til at teste, demonstrere eller udvikle fx et living lab eller et rensningsanlæg, hvor en del af spildevandet afledes til forsøg.'},
    8: { text:'Datamiljø', description: 'Fx serverkapacitet eller biobanker'},
    16: { text:'Certificering og dokumentation', description: 'Facilitet der bruges til at certificere eller dokumentere det testede produkt.'},
    // 32: { text:'Andet, beskriv', description: ''},
};

export const AreaTypes: TypeDictionary = {
    1: { text:'Animation, spil, film og reality teknologi', description: ''},
    2: { text:'Byggeri og anlæg', description: ''},
    4: { text:'Design, mode og møbler', description: ''},
    8: { text:'Digitale teknologier', description: ''},
    16: { text:'Energi', description: ''},
    32: { text:'Finans og fintech', description: ''},
    64: { text:'Forsvar, rum og sikkerhed', description: ''},
    128: { text:'Fødevarer og bioressourcer', description: ''},
    256: { text:'Health Science', description: ''},
    512: { text:'Industriproduktion', description: ''},
    1024: { text:'Life Science og velfærdsteknologi', description: ''},
    2048: { text:'Lydteknologi', description: ''},
    4096: { text:'Maritime erhverv og logistik', description: ''},
    8192: { text:'Miljø', description: ''},
    16384: { text:'Robotteknologi', description: ''},
    32768: { text:'Turisme', description: ''},
    65536: { text:'Vand', description: ''},
    // 131072: { text:'Andet, beskriv', description: ''}
};

export const ServiceTypes: TypeDictionary = {
    1: { text:'Selvbetjening af faciliteten', description: ''},
    2: { text:'Teknisk support eller hjælp til at anvende faciliteten', description: ''},
    4: { text:'Komplet service', description: 'Herunder gennemførelse af fx forskning, test, demonstration eller udvikling uden brugerens involvering'},
    8: { text:'Anden rådgivning', description: '(Ikke teknisk support til faciliteten)'},
    16: { text:'Akkrediteret måling og/eller udførelse af certificering', description: ''},
    // 32: { text:'Andet, beskriv', description: ''},
};
