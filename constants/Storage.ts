import {MMKV} from 'react-native-mmkv'

enum StorageTyp {
    RESTAURANT = 'r',
    PEOPLE = 'p',
}

abstract class StorageAbs {
    key!: string
    lastModified!: number

    initLastModifiedAndRet() {
        this.lastModified = new Date().getTime();
        return this.lastModified;
    }
}

export function descSortStorage<T extends StorageAbs>(lst: Iterable<T>): T[] {
    return Array.from(lst).sort((a, b) => b.lastModified - a.lastModified)
}

export const RESTAURANT_STORAGE = new MMKV({
    id: StorageTyp.RESTAURANT,
});

export const PEOPLE_STORAGE = new MMKV({
    id: StorageTyp.PEOPLE,
});

export function storageListByTyp(storage: MMKV, key: string, v: StorageAbs) {
    storage.set(key, JSON.stringify(v));
}

export function getListByTyp<T extends StorageAbs>(storage: MMKV): Map<string, T> {
    const keys = storage.getAllKeys();
    const res = new Map<string, T>()
    if (!keys) {
        return res;
    }
    return storage.getAllKeys().reduce((res, key) => {
        const v = storage.getString(key);
        if (v) {
            res.set(key, JSON.parse(v));
        }
        return res;
    }, res);
}

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