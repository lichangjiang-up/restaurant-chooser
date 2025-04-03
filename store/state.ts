import { create } from "zustand/react";
import { STATE_STORAGE, StorageAbs } from "@/store/storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { StateCreator } from "zustand";

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

export enum StorageTyp {
    RESTAURANTS = 'restaurants',
    PEOPLE = 'people',
    CHOICES_PEOPLE = 'choices_people',
    RESTAURANT = 'restaurant',
    PERSON = 'person',
    CHOICE_RESTAURANT = 'choice_restaurant',
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

type SimpleStore<T> = {
    v?: T;
    reset: (obj: T) => void;
}

export function newRestaurant(restaurant?: Restaurant): Restaurant {
    return wrapperRestaurant(restaurant ? { ...restaurant } : {} as Restaurant);
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
        resetMarker: (marker = false) => set(() => ({ marker })),
    }));
}

export function newObjState<T>(t: T, name?: StorageTyp) {
    const createFun: StateCreator<ObjStore<T>> = (set, get) => ({
        obj: t,
        objUpdate: (key: keyof T, v: any) => set((state) => ({
            obj: { ...state.obj, [key]: v },
        })),
        objReset: (record: T) => set(() => ({ obj: record })),
        objMerge: (obj: any) => {
            set((state) => ({
                obj: { ...state.obj, ...obj },
            }));
            return get().obj;
        },
    });
    if (!name) {
        return create<ObjStore<T>>()(createFun);
    }
    return create<ObjStore<T>>()(persist(createFun, { name, storage: JSON_STORAGE }));
}

export function newLocalState<T>(name?: StorageTyp, t?: T) {
    const createFun: StateCreator<SimpleStore<T>> = (set) => ({
        v: t,
        reset: (obj: T) => set(() => ({ v: obj })),
    });
    if (!name) {
        return create<SimpleStore<T>>()(createFun);
    }
    return create<SimpleStore<T>>()(persist(createFun, { name, storage: JSON_STORAGE }));
}

export function newRecordState<K extends string, T>(name?: StorageTyp) {
    const createFun: StateCreator<RecordMap<K, T>> = (set) => ({
        record: {} as Record<K, T>,
        addRecord: (key: K, t: T) => set((state) => ({
            record: { ...state.record, [key]: t },
        })),
        clearRecord: () => set(() => ({ record: {} as Record<K, T> })),
        deleteRecord: (...keys: K[]) => set((state) => {
            const record = { ...state.record };
            if (keys.filter((key) => delete record[key]).length > 0) {
                return { record };
            }
            return state;
        }),
        resetRecord: (record: Record<K, T>) => set(() => ({ record })),
    });
    if (!name) {
        return create<RecordMap<K, T>>()(createFun);
    }
    return create<RecordMap<K, T>>()(persist(createFun, { name, storage: JSON_STORAGE }));
}

export const statePerson = newObjState<Person>(newPerson(), StorageTyp.PERSON);
export const stateRestaurant = newObjState<Restaurant>(newRestaurant(), StorageTyp.RESTAURANT);
export const stateChoiceRestaurant = newLocalState<Restaurant>(StorageTyp.CHOICE_RESTAURANT);

export const statePeople = newRecordState<string, Person>(StorageTyp.PEOPLE);
export const stateRestaurants = newRecordState<string, Restaurant>(StorageTyp.RESTAURANTS);
export const stateChoicesPeople = newRecordState<string, null>(StorageTyp.CHOICES_PEOPLE);