import type { Genre } from "./genre";
import type { Actor } from "./actor";


export type MovieStatus =
    | "RELEASED"
    | "UPCOMING"
    | "CANCELED";



export interface MovieActor {

    id:number;

    actor:Actor;

    characterName:string;

    castOrder:number;

}




export interface Movie {


    id:number;


    tmdbId:number;


    title:string;


    originalTitle:string;


    overview:string;


    releaseDate:string;


    runtime:number;


    language:string;


    country:string;


    posterUrl:string;


    backdropUrl:string;


    trailerUrl:string;


    averageRating:number;


    voteCount:number;


    popularity:number;


    status:MovieStatus;



    genres:Genre[];



    cast:MovieActor[];


}




export interface MoviePage {


    content:Movie[];


    totalPages:number;


    totalElements:number;


    size:number;


    number:number;


    first:boolean;


    last:boolean;


    empty:boolean;


}




export interface MovieRequest {


    tmdbId:number;


    title:string;


    originalTitle?:string;


    overview?:string;


    releaseDate?:string;


    runtime?:number;


    language?:string;


    country?:string;


    posterUrl?:string;


    backdropUrl?:string;


    trailerUrl?:string;


    status:MovieStatus;


    genreIds?:number[];


    actorIds?:number[];


}