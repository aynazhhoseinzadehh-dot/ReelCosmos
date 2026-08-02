export interface Actor {

    id: number;

    tmdbId: number;

    name: string;

    biography: string;

    birthday: string;

    placeOfBirth: string;

    profileImageUrl: string;
}
export interface ActorPage {

    content: Actor[];

    totalPages: number;

    totalElements: number;

    size: number;

    number: number;

}
