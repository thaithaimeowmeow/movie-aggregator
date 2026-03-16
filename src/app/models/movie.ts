//Model for both movies and series, since they have the same properties
export interface Movie {
    id?: number;
    imdb_id?: string;
    title?: string;
    adult?: boolean;
    backdrop_path?: string;
    budget?: number;
    genres?: Genre[];
    homepage?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: string;
    first_air_date?: string; //series only
    original_name?: string; //series only
    revenue?: number;
    runtime?: number;
    status?: string;
    tagline?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    belongs_to_collection?: Collection;
    origin_country?: string[];
    spoken_languages?: SpokenLanguage[];
    production_companies?: ProductionCompany[];
    production_countries?: ProductionCountry[];
}

export interface Collection {
    id?: number;
    name?: string;
    poster_path?: string;
    backdrop_path?: string;
}

export interface Genre {
    id?: number;
    name?: string;
}

export interface ProductionCompany {
    id?: number;
    logo_path?: string | null;
    name?: string;
    origin_country?: string;
}

export interface ProductionCountry {
    iso_3166_1?: string;
    name?: string;
}

export interface SpokenLanguage {
    english_name?: string;
    iso_639_1?: string;
    name?: string;
}