const API_KEY = 'fd38441e414947980f6caa7de48cb86b';
const BASE_PATH = 'https://api.themoviedb.org/3';

interface IMovie {
    poster_path: string;
    overview: string;
    release_date: string;
    id: number;
    original_title?: string;
    title?: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    vote_average: number;
    original_name?: string;
    name?: string;
}

interface ISeries {
    id: number;
    backdrop_path: string;
    poster_path: string;
    name: string;
    overview: string;
}
export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export interface IGetSeriesResult {
    page: number;
    results: ISeries[];
    total_pages: number;
    total_results: number;
}

export interface ISearchMovie {
    backdrop_path: string;
    genres: [{ id: number; name: string }];
    id: number;
    string: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    tagline: string;
    title: string;
    vote_average: number;
    sucess: boolean;
}
export interface ISearchTv {
    backdrop_path: string;
    genres: [{ id: number; name: string }];
    id: number;
    string: string;
    original_name: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    number_of_episodes: number;
    number_of_seasons: number;
    sucess: boolean;
}

export interface IGetMoviesSearch {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

////////////////// movie api ///////////

// Movies - TopRated

export async function getMovieTopRated() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then((response) =>
        response.json()
    );
}

// Movies - NowPlaying

export async function getNowMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&page=1&language=ko-KO&region=KR`).then((response) =>
        response.json()
    );
}

// Movies - Popular
export async function getPopularMovies() {
    return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&page=1&language=ko-KO&region=KR`).then((response) =>
        response.json()
    );
}

// Movies - Upcoming
export async function getUpcomingMovies() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KO&region=KR`).then((response) =>
        response.json()
    );
}

// Movies - detail
export function getMovieDetail(id: string) {
    return fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=ko-KO&region=KR`).then((response) => {
        return response.json();
    });
}

/// Series api

// Now Series
export async function getSeriesOntheAir() {
    return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KO&region=KR`).then((response) =>
        response.json()
    );
}

// popular Series
export async function getSeriesPopular() {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KO&region=KR`).then((response) =>
        response.json()
    );
}

// toprate Series
export async function getSeriesTopRated() {
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KO&region=KR`).then((response) =>
        response.json()
    );
}

// detail series
export async function getSeriesDetail(id: string) {
    return fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}&language=ko-KO&region=KR`).then((response) =>
        response.json()
    );
}

/// SEARCH API

// movie search
export async function getMoviesSearch(name: string) {
    return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=1`).then((response) =>
        response.json()
    );
}

// tv search
export async function getTvsSearch(name: string) {
    return fetch(
        `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${name}&include_adult=false`
    ).then((response) => response.json());
}

export const TV_TYPE = ['nowPlaying', 'popularSeries', 'topRatedSeries'];
export const LIST_TYPE = ['nowPlaying', 'upcomingMovies', 'popularMovies', 'TopRated'];
