import { create } from "zustand/react";
import { STATE_STORAGE, StorageAbs } from "@/store/storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { StateCreator } from "zustand";

const JSON_STORAGE = createJSONStorage(() => STATE_STORAGE);

export type Gender = '-' | 'Male' | 'Female';
export type PersonRelation = 'Other' | 'Me' | 'Family';

export type Person = {
    name: string;
    phone: string;
    gender: Gender;
    relation: PersonRelation;
} & StorageAbs;

export type Restaurant = {
    name: string;
    cuisine: string;
    price: string;
    rating: string;
    phone: string;
    address?: string;
    website?: string;
    delivery: string;
    getHint: (key: keyof Restaurant) => string;
} & StorageAbs;

export enum StorageTyp {
    RESTAURANTS = 'rs',
    PEOPLE = 'ps',
    CHOICES = 'cs',
    RESTAURANT = 'rp',
    PERSON = 'pp',
    CHOICE_RESTAURANT = 'cs',
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


export type RecordMap<T> = {
    record: Record<string, T>;
    addRecord: (key: string, t: T) => void;
    clearRecord: () => void;
    deleteRecord: (...keys: string[]) => void;
}

type SimpleStore<T> = {
    v?: T;
    reset: (obj: T) => void;
}

export function newRestaurant(restaurant?: Restaurant): Restaurant {
    return wrapperRestaurant(restaurant ? { ...restaurant } : {} as Restaurant);
}

export function wrapperRestaurant(restaurant: Restaurant) {
    const getHint = (key: keyof Restaurant): string => {
        switch (key) {
            case "price": return '$'.repeat(Number(restaurant.price) || 0);
            case "rating": return '⭐️'.repeat(Number(restaurant.rating) || 0);
            case "delivery": return restaurant.delivery?.toLowerCase() === 'yes' ? 'DOES delivery' : 'NOT delivery';
            default: return String(restaurant[key] || '');
        }
    };
    restaurant.getHint = getHint;
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

export function newRecordState<T>(name?: StorageTyp) {
    const createFun: StateCreator<RecordMap<T>> = (set) => ({
        record: {},
        addRecord: (key: string, t: T) => set((state) => ({
            record: { ...state.record, [key]: t },
        })),
        clearRecord: () => set(() => ({ record: {} })),
        deleteRecord: (...keys: string[]) => set((state) => {
            const record = { ...state.record };
            if (keys.filter((key) => delete record[key]).length > 0) {
                return { record };
            }
            return state;
        }),
    });
    if (!name) {
        return create<RecordMap<T>>()(createFun);
    }
    return create<RecordMap<T>>()(persist(createFun, { name, storage: JSON_STORAGE }));
}

export const statePerson = newObjState<Person>(newPerson(), StorageTyp.PERSON);
export const stateRestaurant = newObjState<Restaurant>(newRestaurant(), StorageTyp.RESTAURANT);
export const stateChoiceRestaurant = newLocalState<Restaurant>(StorageTyp.CHOICE_RESTAURANT);

export const statePeople = newRecordState<Person>(StorageTyp.PEOPLE);
export const stateRestaurants = newRecordState<Restaurant>(StorageTyp.RESTAURANTS);
export const stateChoicesPeople = newRecordState<null>(StorageTyp.CHOICES);

export function checkPhone(v?: string) {
    if (!v || v.length < 1) {
        return false;
    }
    const cleanPhone = v.replaceAll('-', '');
    if (/^[\d+]\d{4,16}$/.test(cleanPhone)) {
        return false;
    }
    return 'Phone numbers format should be 5-16 digits';
}

export function checkWebsite(website?: string) {
    if (website && website.includes('.') && !['http://', 'https://'].some(prefix => website.startsWith(prefix))) {
        return 'Website format error';
    }
    return website ? false : false;
}

export function checkName(v?: string) {
    if (v && v.trim().length >= 4) {
        return false;
    }
    return 'Name should be 4-30 characters';
}