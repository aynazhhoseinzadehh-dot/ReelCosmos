import api from "../api/axios";

import type {
    Actor,
    ActorPage,
} from "../types/actor";

const ACTORS_URL = "/api/actors";

export interface GetActorsParams {

    page?: number;

    size?: number;

    name?: string;

}

// ================================
// Get actors (Pagination + Search)
// ================================

export const getActors = async (
    params: GetActorsParams = {}
): Promise<ActorPage> => {

    const response =
        await api.get<ActorPage>(
            ACTORS_URL,
            {
                params,
            }
        );

    return response.data;

};

// ================================
// Get actor by id
// ================================

export const getActorById = async (
    id: number
): Promise<Actor> => {

    const response =
        await api.get<Actor>(
            `${ACTORS_URL}/${id}`
        );

    return response.data;

};

// ================================
// Create actor
// ================================

export const createActor = async (
    data: Omit<Actor, "id">
): Promise<Actor> => {

    const response =
        await api.post<Actor>(
            ACTORS_URL,
            data
        );

    return response.data;

};

// ================================
// Update actor
// ================================

export const updateActor = async (
    id: number,
    data: Omit<Actor, "id">
): Promise<Actor> => {

    const response =
        await api.put<Actor>(
            `${ACTORS_URL}/${id}`,
            data
        );

    return response.data;

};

// ================================
// Delete actor
// ================================

export const deleteActor = async (
    id: number
): Promise<void> => {

    await api.delete(
        `${ACTORS_URL}/${id}`
    );

};