import {create} from "zustand/react";
import {produce} from "immer";
import {STATE_STORAGE, StorageAbs} from "@/store/storage";
import {createJSONStorage, persist} from "zustand/middleware";

export type Gender = '-' | 'Male' | 'Female';
export type PersonRelation = 'Other' | 'Me' | 'Family';

export class Person extends StorageAbs {
    name!: string;
    phone!: string;
    gender: Gender = '-';
    relation: PersonRelation = 'Other';
}

export class Restaurant extends StorageAbs {
    name!: string
    cuisine!: string;
    price!: string;
    rating!: string;
    phone!: string;
    address?: string;
    webSite?: string;
    delivery!: string;
}


export type Marker = {
    marker: boolean;
    resetMarker: (marker?: boolean) => void;
}

type ObjStore<T extends {}> = {
    v: T;
    update: (key: keyof T, v: any) => void;
    reset: (obj: T) => void;
}

const JSON_STORAGE = createJSONStorage(() => STATE_STORAGE)

export function newObjState<T extends {}>(t: T, name: StorageTyp) {
    return create<ObjStore<T> & Marker>()(persist(
        (set) => ({
            v: t,
            marker: false,
            update: (key: keyof T, v: any) => set(produce(state => {
                state.v[key] = v;
            })),
            resetMarker: (marker?: boolean) => set(produce(state => {
                state.marker = !!marker;
            })),
            reset: (obj: T) => set(_ => {
                return {v: obj, marker: false};
            }),
        }),
        {name, storage: JSON_STORAGE})
    );
}

type StorageMap<T> = {
    v: any;
    add: (key: string, t: T) => void;
    clear: () => void;
    delete: (...keys: string[]) => void;
    values: () => T[],
    keys: () => string[],
}

function newStorageState<T>(name: StorageTyp) {
    return create<StorageMap<T> & Marker>()(persist(
        (set, get) => ({
            v: {},
            marker: false,
            add: (key: string, t) => set(produce(state => {
                state.v[key] = t;
            })),
            clear: () => set(_ => {
                return {v: {}};
            }),
            delete: (...keys: string[]) => {
                if (keys.length > 1) {
                    set(produce(state => keys.filter((key: string) => delete state.v[key])));
                }
            },
            resetMarker: (marker?: boolean) => set(produce(state => {
                state.marker = !!marker;
            })),
            values: () => Object.values(get().v),
            keys: () => Object.keys(get().v),
        }),
        {name, storage: JSON_STORAGE})
    );
}

export enum StorageTyp {
    RESTAURANTS = 'rs',
    PEOPLE = 'ps',
    CHOICES = 'cs',
    RESTAURANT = 'rp',
    PERSON = 'pp',
}

export const statePerson = newObjState<Person>(new Person(), StorageTyp.PERSON);
export const stateRestaurant = newObjState<Restaurant>(new Restaurant(), StorageTyp.RESTAURANT);

export const statePeople = newStorageState<Person>(StorageTyp.PEOPLE);
export const stateRestaurants = newStorageState<Restaurant>(StorageTyp.RESTAURANTS);
export const stateChoicesPeople = newStorageState<null>(StorageTyp.CHOICES);
