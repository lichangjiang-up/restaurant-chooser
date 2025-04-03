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
    website?: string;
    delivery: string;
    getHint: (key: keyof Restaurant) => string;
} & StorageAbs;


export function newRestaurant(restaurant?: Restaurant): Restaurant {
    restaurant = restaurant ? Object.assign({}, restaurant) : {} as Restaurant;
    return wrapperRestaurant(restaurant);
}

export function wrapperRestaurant(restaurant: Restaurant) {
    restaurant.getHint = (key: keyof Restaurant) => {
        switch (key) {
            case "price":
                return '$'.repeat(Number(restaurant.price || 0));
            case "rating":
                return '⭐️'.repeat(Number(restaurant.rating || 0));
            case "delivery":
                return restaurant.delivery?.toLowerCase() === 'yes' ? 'DOES delivery' : 'NOT delivery';
            default:
                return restaurant[key]?.toString() || '';
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

const JSON_STORAGE = createJSONStorage(() => STATE_STORAGE);

export function createMarkerStore() {
    return create<Marker>()((set) => ({
        marker: false,
        resetMarker: (marker?: boolean) => set(state => {
            return {marker: !!marker};
        }),
    }))
}

export function newObjState<T extends {}>(t: T, name: StorageTyp) {
    return create<ObjStore<T>>()(persist(
        (set, get) => ({
            v: t,
            update: (key: keyof T, v: any) => set(produce(state => {
                state.v[key] = v;
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
    return create<StorageMap<T>>()(persist(
        (set) => ({
            v: {},
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
export const stateRestaurant = newObjState<Restaurant>(newRestaurant(), StorageTyp.RESTAURANT);
export const stateChoiceRestaurant = newLocalState<Restaurant>(StorageTyp.CHOICE_RESTAURANT);

export const statePeople = newStorageState<Person>(StorageTyp.PEOPLE);
export const stateRestaurants = newStorageState<Restaurant>(StorageTyp.RESTAURANTS);
export const stateChoicesPeople = newStorageState<null>(StorageTyp.CHOICES);

export type Record<K extends keyof any, T> = {
    [P in K]: T;
};

export function checkPhone(v?: string) {
    if ((v?.length || 0) < 1) {
        return false;
    }
    v = v?.replaceAll('-', '') || '';
    if (/^[\d\\+]\d{4,16}$/.test(v)) {
        return false;
    }
    return 'Phone numbers format should be 5-16 digits';
}

export function checkWebsite(website?: string) {
    if (website && website.indexOf('.') !== -1 && ['http://', 'https://'].every(website.startsWith)) {
        return false;
    }
    return website ? 'Website format error' : false;
}

export function checkName(v?: string) {
    if ((v?.trim().length || 0) >= 4) {
        return false;
    }
    return 'Name should be 4-30 characters';
}