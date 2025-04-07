import {create} from "zustand/react";
import {STATE_STORAGE, StorageAbs} from "@/store/storage";
import {createJSONStorage, persist} from "zustand/middleware";
import {StateCreator} from "zustand";

const JSON_STORAGE = createJSONStorage(() => STATE_STORAGE);

export const GENDERS = ['-', 'Male', 'Female'] as const;
export type Gender = typeof GENDERS[number];

export const PERSON_RELATIONS = ['Other', 'Me', 'Family'] as const;
export type PersonRelation = typeof PERSON_RELATIONS[number];

export const LEVELS = ['1', '2', '3', '4', '5'] as const;
export type Level = typeof LEVELS[number];

export const YES_OR_NO = ['Yes', 'No'] as const;
export type YesOrNo = typeof YES_OR_NO[number];

export const CUISINES = ['Algerian', 'American', 'BBQ', 'Chinese', 'Other'] as const;
export type Cuisine = typeof CUISINES[number];

export type Person = {
    name: string;
    phone: string;
    gender: Gender;
    relation: PersonRelation;
} & StorageAbs;

export type Restaurant = {
    name: string;
    cuisine: Cuisine;
    price: Level;
    rating: Level;
    phone: string;
    address?: string;
    website?: string;
    delivery: YesOrNo;
    getHint: (key: keyof Restaurant) => string;
} & StorageAbs;

export type PreFilter = {
    cuisines: Cuisine[];
    price: Level[];
    rating: Level[];
    delivery: YesOrNo[];
}

export enum StorageTyp {
    RESTAURANTS = 'restaurants',
    PEOPLE = 'people',
    CHOICES_PEOPLE = 'choices_people',
    CHOICES_RESTAURANTS = 'choices_restaurants',
    RESTAURANT = 'restaurant',
    PERSON = 'person',
    CHOICE_RESTAURANT = 'choice_restaurant',
    PRE_FILTER = 'pre_filter',
}

export type Marker = {
    marker: boolean;
    resetMarker: (marker?: boolean) => void;
}

export type ObjStore<T> = {
    obj: T;
    objUpdate: (key: keyof T, v: any) => void;
    objReset: (obj: T) => void;
    objMerge: (obj: any) => T;
}


export type RecordMap<K extends string, T> = {
    record: Record<K, T>;
    addRecord: (key: K, t: T) => void;
    clearRecord: () => void;
    deleteRecord: (...keys: K[]) => void;
    resetRecord: (record: Record<K, T>) => void;
}

export function newRestaurant(restaurant?: Restaurant): Restaurant {
    return wrapperRestaurant(restaurant ? {...restaurant} : {} as Restaurant);
}

export function wrapperRestaurant(restaurant: Restaurant) {
    restaurant.getHint = (key: keyof Restaurant): string => {
        switch (key) {
            case "price":
                return '$'.repeat(Number(restaurant.price) || 0);
            case "rating":
                return '⭐️'.repeat(Number(restaurant.rating) || 0);
            case "delivery":
                return restaurant.delivery === 'Yes' ? 'DOES delivery' : 'NOT delivery';
            default:
                return String(restaurant[key] || '');
        }
    };
    return restaurant;
}

export function newPerson(person?: Person): Person {
    return person ? Object.assign({}, person) : {} as Person;
}

export function newMarkerStore() {
    return create<Marker>()((set) => ({
        marker: false,
        resetMarker: (marker = false) => set(() => ({marker})),
    }));
}

export function newObjStore<T>(t: T, name?: StorageTyp) {
    const createFun: StateCreator<ObjStore<T>> = (set, get) => ({
        obj: t,
        objUpdate: (key: keyof T, v: any) => set((state) => (state.obj[key] === v ? state : {
            obj: {
                ...state.obj,
                [key]: v
            }
        })),
        objReset: (record: T) => set(() => ({obj: record})),
        objMerge: (obj: any) => {
            set((state) => ({obj: {...state.obj, ...obj}}));
            return get().obj;
        },
    });
    if (!name) {
        return create<ObjStore<T>>()(createFun);
    }
    return create<ObjStore<T>>()(persist(createFun, {name, storage: JSON_STORAGE}));
}

export function newRecordStore<K extends string, T>(name?: StorageTyp) {
    const createFun: StateCreator<RecordMap<K, T>> = (set) => ({
        record: {} as Record<K, T>,
        addRecord: (key: K, t: T) => set((state) => state.record[key] === t ? state : {
            record: {
                ...state.record,
                [key]: t
            }
        }),
        clearRecord: () => set(() => ({record: {} as Record<K, T>})),
        deleteRecord: (...keys: K[]) => set((state) => {
            if (keys.some(key => state.record.hasOwnProperty(key))) {
                const record = {...state.record};
                keys.forEach((key) => delete record[key])
                return {record};
            }
            return state;
        }),
        resetRecord: (record: Record<K, T>) => set(() => ({record})),
    });
    if (!name) {
        return create<RecordMap<K, T>>()(createFun);
    }
    return create<RecordMap<K, T>>()(persist(createFun, {name, storage: JSON_STORAGE}));
}

export const statePerson = newObjStore<Person>(newPerson(), StorageTyp.PERSON);
export const stateRestaurant = newObjStore<Restaurant>(newRestaurant(), StorageTyp.RESTAURANT);
export const stateChoiceRestaurant = newObjStore<Restaurant>(newRestaurant(), StorageTyp.CHOICE_RESTAURANT);
export const statePreFilter = newObjStore<PreFilter>({} as PreFilter, StorageTyp.PRE_FILTER);

export const statePeople = newRecordStore<string, Person>(StorageTyp.PEOPLE);
export const stateRestaurants = newRecordStore<string, Restaurant>(StorageTyp.RESTAURANTS);
export const stateChoicesPeople = newRecordStore<string, null>(StorageTyp.CHOICES_PEOPLE);
export const stateChoicesRestaurants = newRecordStore<string, null>(StorageTyp.CHOICES_RESTAURANTS);