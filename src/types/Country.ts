export interface Country {
    name: string;
    full_name: string;
    capital: string;
    iso2: string;
    iso3: string;
    covid19: {
        total_case: string;
        total_deaths: string;
        last_updated: string;
    };
    current_president: {
        name: string;
        gender: string;
        appointment_start_date: string;
        appointment_end_date: string | null;
        href: {
            self: string;
            country: string;
            picture: string;
        };
    } | null;
    currency: string;
    phone_code: string;
    continent: string;
    description: string;
    size: string;
    independence_date: string;
    population: string;
    href: {
        self: string;
        states: string;
        presidents: string;
        flag: string;
    };
}
