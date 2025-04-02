import {create} from "zustand/react";
import {produce} from "immer";
import {STATE_STORAGE, StorageAbs} from "@/store/storage";
import {createJSONStorage, persist} from "zustand/middleware";

export type Gender = '-' | 'Male' | 'Female';
export type PersonRelation = 'Other' | 'Me' | 'Family';

export type Person = {
    name: string;
    phone: string;
    gender: Gender;
    relation: PersonRelation;
} & StorageAbs;

export type Restaurant = {
    name: string
    cuisine: string;
    price: string;
    rating: string;
    phone: string;
    address?: string;
    webSite?: string;
    delivery: string;
    getHint: (key: keyof Restaurant) => string;
} & StorageAbs;


export function methodRestaurant(restaurant?: Restaurant): Restaurant {
    restaurant = restaurant ? Object.assign({}, restaurant) : {} as Restaurant;
    restaurant.getHint = (key: keyof Restaurant) => {
        switch (key) {
            case "price":
                return '$'.repeat(Number(restaurant.price || 0));
            case "rating":
                return '⭐️'.repeat(Number(restaurant.rating || 0));
            case "delivery":
                return restaurant.delivery?.toLocaleLowerCase() === 'Yes' ? 'DOES delivery' : 'NOT delivery';
            default:
                return restaurant[key]?.toLocaleString() || '';
        }
    };
    return restaurant;
}

export function newPerson(person?: Person): Person {
    return person ? Object.assign({}, person) : {} as Person;
}

export type Marker = {
    marker: boolean;
    resetMarker: (marker?: boolean) => void;
}

type ObjStore<T extends {}> = {
    v: T;
    update: (key: keyof T, v: any) => void;
    reset: (obj: T) => void;
    merge: (obj: any) => T,
}

const JSON_STORAGE = createJSONStorage(() => STATE_STORAGE)

export function newObjState<T extends {}>(t: T, name: StorageTyp) {
    return create<ObjStore<T> & Marker>()(persist(
        (set, get) => ({
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
            merge: (obj: any) => {
                set(produce(state => {
                    Object.assign(state.v, obj);
                }));
                return get().v;
            },
        }),
        {name, storage: JSON_STORAGE})
    );
}

type StorageMap<T> = {
    v: any;
    add: (key: string, t: T) => void;
    clear: () => void;
    delete: (...keys: string[]) => void;
}

export function newLocalState<T extends {}>(name: StorageTyp, t?: T) {
    return create<SimpleStore<T>>()(persist(
        (set) => ({
            v: t,
            reset: (obj: T) => set(_ => {
                return {v: obj};
            }),
        }),
        {name, storage: JSON_STORAGE})
    );
}


type SimpleStore<T> = {
    v?: T;
    reset: (obj: T) => void;
}

function newStorageState<T>(name: StorageTyp) {
    return create<StorageMap<T> & Marker>()(persist(
        (set) => ({
            v: {},
            marker: false,
            add: (key: string, t) => set(produce(state => {
                state.v[key] = t;
            })),
            clear: () => set(_ => {
                return {v: {}};
            }),
            delete: (...keys: string[]) => {
                if (keys.length > 0) {
                    set(produce(state => {
                        keys.filter((key: string) => delete state.v[key]);
                    }));
                }
            },
            resetMarker: (marker?: boolean) => set(produce(state => {
                state.marker = !!marker;
            })),
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
    CHOICE_RESTAURANT = 'cs',
}

export const statePerson = newObjState<Person>(newPerson(), StorageTyp.PERSON);
export const stateRestaurant = newObjState<Restaurant>(methodRestaurant(), StorageTyp.RESTAURANT);
export const stateChoiceRestaurant = newLocalState<Restaurant>(StorageTyp.CHOICE_RESTAURANT);

export const statePeople = newStorageState<Person>(StorageTyp.PEOPLE);
export const stateRestaurants = newStorageState<Restaurant>(StorageTyp.RESTAURANTS);
export const stateChoicesPeople = newStorageState<null>(StorageTyp.CHOICES);
