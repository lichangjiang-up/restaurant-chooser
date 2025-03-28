import {MMKV} from 'react-native-mmkv'

enum StorageTyp {
    RESTAURANT = 'r',
    PEOPLE = 'p',
}

export const RESTAURANT_STORAGE = new MMKV({
    id: StorageTyp.RESTAURANT,
})

export function storageListByTyp(storage: MMKV, key: string, v: Restaurant | Person) {
    storage.set(key, JSON.stringify(v));
}

export function getListByTyp<T>(storage: MMKV): Map<string, T> {
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

export class Person {

}

export class Restaurant {
    key!: string;
    name!: string
    cuisine!: string;
    price!: string;
    rating!: string;
    phone!: string;
    address?: string;
    webSite?: string;
    delivery!: string;
}